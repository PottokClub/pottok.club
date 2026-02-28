/**
 * Google Analytics 4 Tracking pour pottok.club
 * Property: 353847055 (pottok-7b9ef)
 * 
 * Ce script initialise GA4 et track les événements custom définis
 * dans le plan de tracking.
 */

// Configuration
const GA4_MEASUREMENT_ID = 'G-353847055';

// Initialisation GA4
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', GA4_MEASUREMENT_ID, {
  'send_page_view': true,
  'cookie_flags': 'SameSite=None;Secure'
});

/**
 * Utilitaires
 */
const GA4Tracker = {
  
  /**
   * Track un événement custom
   * @param {string} eventName - Nom de l'événement
   * @param {object} params - Paramètres custom
   */
  trackEvent(eventName, params = {}) {
    gtag('event', eventName, params);
    console.log('[GA4]', eventName, params);
  },

  /**
   * 1. CTA Download Click
   */
  trackCTADownload(ctaLocation, platform = null, ctaType = 'button') {
    this.trackEvent('cta_download_click', {
      cta_location: ctaLocation,
      platform: platform || 'both',
      cta_type: ctaType
    });
  },

  /**
   * 2. Store Link Click
   */
  trackStoreClick(store, location, linkType = 'badge') {
    this.trackEvent('store_link_click', {
      store: store, // 'app_store' | 'play_store'
      location: location,
      link_type: linkType
    });
  },

  /**
   * 3. QR Code View
   */
  trackQRCodeView(qrLocation) {
    this.trackEvent('qr_code_view', {
      qr_location: qrLocation
    });
  },

  /**
   * 4. Newsletter Signup
   */
  trackNewsletterSignup(location) {
    this.trackEvent('newsletter_signup', {
      location: location
    });
  },

  /**
   * 5. Contact Click
   */
  trackContactClick(location) {
    this.trackEvent('contact_click', {
      location: location
    });
  },

  /**
   * 6. Social Click
   */
  trackSocialClick(platform, location) {
    this.trackEvent('social_click', {
      platform: platform,
      location: location
    });
  },

  /**
   * 7. Scroll Depth Tracking
   * Configure automatiquement le tracking de scroll pour les articles
   */
  initScrollDepth() {
    const thresholds = [25, 50, 75, 100];
    const triggered = {};
    
    const articleTitle = document.querySelector('h1')?.textContent || document.title;
    const articleUrl = window.location.href;

    window.addEventListener('scroll', () => {
      const scrollPercent = Math.round(
        (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
      );

      thresholds.forEach(threshold => {
        if (scrollPercent >= threshold && !triggered[threshold]) {
          triggered[threshold] = true;
          this.trackEvent('scroll_depth', {
            percent: threshold,
            article_title: articleTitle,
            article_url: articleUrl
          });
        }
      });
    });
  },

  /**
   * 8. Article Engagement (temps passé)
   * Track les seuils : 30s, 60s, 120s, 300s
   */
  initArticleEngagement() {
    const thresholds = [30, 60, 120, 300]; // secondes
    const triggered = {};
    const startTime = Date.now();

    const articleTitle = document.querySelector('h1')?.textContent || document.title;
    const articleUrl = window.location.href;

    thresholds.forEach(threshold => {
      setTimeout(() => {
        if (!triggered[threshold] && document.hasFocus()) {
          triggered[threshold] = true;
          this.trackEvent('article_engagement', {
            time_spent: threshold,
            article_title: articleTitle,
            article_url: articleUrl
          });
        }
      }, threshold * 1000);
    });
  },

  /**
   * Auto-bind des liens App Store / Play Store
   * Cherche automatiquement les liens vers les stores et leur ajoute le tracking
   */
  bindStoreLinks() {
    // App Store
    document.querySelectorAll('a[href*="apps.apple.com"], a[href*="itunes.apple.com"]').forEach(link => {
      link.addEventListener('click', (e) => {
        const location = this.getElementLocation(link);
        this.trackStoreClick('app_store', location, 'badge');
      });
    });

    // Play Store
    document.querySelectorAll('a[href*="play.google.com"]').forEach(link => {
      link.addEventListener('click', (e) => {
        const location = this.getElementLocation(link);
        this.trackStoreClick('play_store', location, 'badge');
      });
    });
  },

  /**
   * Auto-bind des CTAs download
   * Cherche automatiquement les boutons/liens avec data-ga4-cta
   * Usage: <button data-ga4-cta="hero" data-ga4-platform="apple">Télécharger</button>
   */
  bindCTADownloads() {
    document.querySelectorAll('[data-ga4-cta]').forEach(element => {
      element.addEventListener('click', (e) => {
        const ctaLocation = element.getAttribute('data-ga4-cta');
        const platform = element.getAttribute('data-ga4-platform');
        const ctaType = element.tagName === 'BUTTON' ? 'button' : 'link';
        this.trackCTADownload(ctaLocation, platform, ctaType);
      });
    });
  },

  /**
   * Auto-bind newsletter forms
   * Usage: <form data-ga4-newsletter="footer">
   */
  bindNewsletterForms() {
    document.querySelectorAll('[data-ga4-newsletter]').forEach(form => {
      form.addEventListener('submit', (e) => {
        const location = form.getAttribute('data-ga4-newsletter');
        this.trackNewsletterSignup(location);
      });
    });
  },

  /**
   * Auto-bind contact links
   * Usage: <a data-ga4-contact="header" href="mailto:...">
   */
  bindContactLinks() {
    document.querySelectorAll('[data-ga4-contact]').forEach(link => {
      link.addEventListener('click', (e) => {
        const location = link.getAttribute('data-ga4-contact');
        this.trackContactClick(location);
      });
    });
  },

  /**
   * Auto-bind social links
   * Usage: <a data-ga4-social="facebook" href="...">
   */
  bindSocialLinks() {
    document.querySelectorAll('[data-ga4-social]').forEach(link => {
      link.addEventListener('click', (e) => {
        const platform = link.getAttribute('data-ga4-social');
        const location = this.getElementLocation(link);
        this.trackSocialClick(platform, location);
      });
    });
  },

  /**
   * Détermine la section/localisation d'un élément dans la page
   */
  getElementLocation(element) {
    // Essayer d'identifier par section parent
    const section = element.closest('section, header, footer, nav, article');
    if (section) {
      return section.id || section.className.split(' ')[0] || 'unknown';
    }
    
    // Sinon, regarder la position verticale
    const rect = element.getBoundingClientRect();
    const scrollY = window.scrollY + rect.top;
    const pageHeight = document.documentElement.scrollHeight;
    
    if (scrollY < pageHeight * 0.2) return 'hero';
    if (scrollY < pageHeight * 0.5) return 'middle';
    if (scrollY > pageHeight * 0.8) return 'footer';
    return 'body';
  },

  /**
   * Initialisation automatique au chargement de la page
   */
  init() {
    console.log('[GA4] Initialisation tracking pottok.club');
    
    // Auto-bind tous les éléments
    this.bindStoreLinks();
    this.bindCTADownloads();
    this.bindNewsletterForms();
    this.bindContactLinks();
    this.bindSocialLinks();
    
    // Init scroll & engagement pour les articles
    if (document.querySelector('article') || window.location.pathname.includes('/blog/')) {
      this.initScrollDepth();
      this.initArticleEngagement();
    }
  }
};

// Auto-init au chargement du DOM
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => GA4Tracker.init());
} else {
  GA4Tracker.init();
}

// Exposer globalement pour usage manuel
window.GA4Tracker = GA4Tracker;
