/**
 * Pottok Chatbot Widget - Astro v2 Design
 * Modern floating chat bubble for pottok.club
 * Backend: n8n webhook
 * 
 * Usage:
 * 1. Include CSS: <link rel="stylesheet" href="/chatbot-widget.css">
 * 2. Include this file: <script src="/chatbot-widget.js"></script>
 * 3. Widget auto-inits on page load
 */

(function() {
  'use strict';

  // Configuration
  const CONFIG = {
    apiUrl: 'https://europe-west1-pottok-7b9ef.cloudfunctions.net/chatbotWebAPI',
    autoOpenDelay: 0, // 0 = disabled (user must click)
    storageKey: 'pottok_chat_history',
    sessionKey: 'pottok_chat_session',
    maxHistoryLength: 20,
  };

  // State
  let sessionId = sessionStorage.getItem(CONFIG.sessionKey) || null;
  let history = JSON.parse(sessionStorage.getItem(CONFIG.storageKey) || '[]');
  let isOpen = false;
  let isLoading = false;

  // DOM Elements
  let chatBubble, chatWindow, chatMessages, chatInput, chatSendBtn, chatClose;

  /**
   * Initialize the widget
   */
  function init() {
    createWidget();
    attachEventListeners();
    restoreHistory();
    
    // Auto-open if configured
    if (CONFIG.autoOpenDelay > 0 && history.length === 0) {
      setTimeout(() => {
        if (!isOpen) toggleChat();
      }, CONFIG.autoOpenDelay);
    }
  }

  /**
   * Create widget HTML
   */
  function createWidget() {
    const container = document.createElement('div');
    container.id = 'pottok-chatbot';
    container.innerHTML = `
      <div id="pottok-chat-bubble" class="pottok-chat-bubble">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 2H4C2.9 2 2.01 2.9 2.01 4L2 22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2ZM20 16H5.17L4.58 16.59L4 17.17V4H20V16ZM7 9H9V11H7V9ZM11 9H13V11H11V9ZM15 9H17V11H15V9Z" fill="white"/>
        </svg>
        <span class="pottok-chat-badge">💬</span>
      </div>

      <div id="pottok-chat-window" class="pottok-chat-window" style="display: none;">
        <div class="pottok-chat-header">
          <div class="pottok-chat-header-content">
            <div class="pottok-chat-avatar">🐴</div>
            <div>
              <div class="pottok-chat-title">Assistant Pottok</div>
              <div class="pottok-chat-status">En ligne</div>
            </div>
          </div>
          <button id="pottok-chat-close" class="pottok-chat-close" aria-label="Fermer le chat">×</button>
        </div>

        <div id="pottok-chat-messages" class="pottok-chat-messages">
          <div class="pottok-message pottok-message-bot">
            <div class="pottok-message-avatar">🐴</div>
            <div class="pottok-message-content">
              Salut ! Je suis l'assistant Pottok 🐴<br><br>
              Je peux t'aider à trouver une demi-pension qui te correspond !<br><br>
              Tu cherches où ? 📍
            </div>
          </div>
        </div>

        <div class="pottok-chat-input-container">
          <input 
            type="text" 
            id="pottok-chat-input" 
            class="pottok-chat-input" 
            placeholder="Écris ton message..."
            autocomplete="off"
            aria-label="Message"
          />
          <button id="pottok-chat-send" class="pottok-chat-send" aria-label="Envoyer">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2.01 21L23 12L2.01 3L2 10L17 12L2 14L2.01 21Z" fill="currentColor"/>
            </svg>
          </button>
        </div>
      </div>
    `;
    document.body.appendChild(container);

    // Cache DOM elements
    chatBubble = document.getElementById('pottok-chat-bubble');
    chatWindow = document.getElementById('pottok-chat-window');
    chatMessages = document.getElementById('pottok-chat-messages');
    chatInput = document.getElementById('pottok-chat-input');
    chatSendBtn = document.getElementById('pottok-chat-send');
    chatClose = document.getElementById('pottok-chat-close');
  }

  /**
   * Attach event listeners
   */
  function attachEventListeners() {
    chatBubble.addEventListener('click', toggleChat);
    chatClose.addEventListener('click', toggleChat);
    chatSendBtn.addEventListener('click', sendMessage);
    chatInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
      }
    });
  }

  /**
   * Toggle chat window
   */
  function toggleChat() {
    isOpen = !isOpen;
    if (isOpen) {
      chatWindow.style.display = 'flex';
      chatBubble.style.display = 'none';
      chatInput.focus();
      scrollToBottom();
    } else {
      chatWindow.style.display = 'none';
      chatBubble.style.display = 'flex';
    }
  }

  /**
   * Send message
   */
  async function sendMessage() {
    const message = chatInput.value.trim();
    if (!message || isLoading) return;

    // Add user message to UI
    addMessage('user', message);
    chatInput.value = '';
    setLoading(true);

    // Generate session ID if needed
    if (!sessionId) {
      sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
      sessionStorage.setItem(CONFIG.sessionKey, sessionId);
    }

    // Save to history
    history.push({ role: 'user', content: message });
    saveHistory();

    try {
      const response = await fetch(CONFIG.apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message,
          sessionId,
          history: history.slice(-CONFIG.maxHistoryLength),
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const data = await response.json();
      
      // Add bot response
      const botMessage = data.response || data.message || 'Désolé, je n\'ai pas compris 😔';
      addMessage('bot', botMessage);

      // Save to history
      history.push({ role: 'assistant', content: botMessage });
      saveHistory();

    } catch (error) {
      console.error('Chatbot error:', error);
      addMessage('bot', 'Oups, une erreur est survenue 😔<br>Réessaie dans quelques instants !');
    } finally {
      setLoading(false);
    }
  }

  /**
   * Add message to chat
   */
  function addMessage(role, content) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `pottok-message pottok-message-${role}`;
    
    const avatar = document.createElement('div');
    avatar.className = 'pottok-message-avatar';
    avatar.textContent = role === 'bot' ? '🐴' : '👤';
    
    const contentDiv = document.createElement('div');
    contentDiv.className = 'pottok-message-content';
    
    // Convert line breaks and links
    const formattedContent = formatMessage(content);
    contentDiv.innerHTML = formattedContent;
    
    messageDiv.appendChild(avatar);
    messageDiv.appendChild(contentDiv);
    chatMessages.appendChild(messageDiv);
    
    scrollToBottom();
  }

  /**
   * Format message (line breaks, links)
   */
  function formatMessage(text) {
    return text
      .replace(/\n/g, '<br>')
      .replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank" rel="noopener noreferrer">Voir l\'annonce →</a>');
  }

  /**
   * Set loading state
   */
  function setLoading(loading) {
    isLoading = loading;
    chatSendBtn.disabled = loading;
    chatInput.disabled = loading;
    
    if (loading) {
      // Add typing indicator
      const typingDiv = document.createElement('div');
      typingDiv.id = 'pottok-typing';
      typingDiv.className = 'pottok-message pottok-message-bot';
      typingDiv.innerHTML = `
        <div class="pottok-message-avatar">🐴</div>
        <div class="pottok-message-content">
          <div class="pottok-typing-indicator">
            <span></span><span></span><span></span>
          </div>
        </div>
      `;
      chatMessages.appendChild(typingDiv);
      scrollToBottom();
    } else {
      // Remove typing indicator
      const typing = document.getElementById('pottok-typing');
      if (typing) typing.remove();
    }
  }

  /**
   * Scroll to bottom
   */
  function scrollToBottom() {
    setTimeout(() => {
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }, 100);
  }

  /**
   * Save history to sessionStorage
   */
  function saveHistory() {
    // Keep only recent messages
    if (history.length > CONFIG.maxHistoryLength) {
      history = history.slice(-CONFIG.maxHistoryLength);
    }
    sessionStorage.setItem(CONFIG.storageKey, JSON.stringify(history));
  }

  /**
   * Restore history from sessionStorage
   */
  function restoreHistory() {
    history.forEach(msg => {
      if (msg.role === 'user') {
        addMessage('user', msg.content);
      } else if (msg.role === 'assistant') {
        addMessage('bot', msg.content);
      }
    });
  }

  // Auto-init when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
