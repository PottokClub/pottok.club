# Chatbot Widget Redesign - POT-99

## 🎨 Design System Astro v2

Le chatbot widget a été entièrement redesigné pour matcher l'identité visuelle du site Astro v2.

### Palette de couleurs
- **Primary** : `oklch(0.48 0.20 10)` - Rose/rouge Pottok
- **Primary hover** : `oklch(0.42 0.22 10)` - Version plus foncée
- **Background** : `oklch(1.0 0 0)` - Blanc pur
- **Body** : `oklch(0.45 0.01 30)` - Gris foncé pour le texte
- **Muted** : `oklch(0.97 0.015 350)` - Gris très clair pour les backgrounds
- **Border** : `oklch(0.90 0.01 30)` - Bordures subtiles

### Typographie
- **Headings** : Bricolage Grotesque (700, 800)
- **Body** : Rethink Sans (400, 500, 600, 700)

### Radius & Shadows
- **Card radius** : 24px
- **Pill radius** : 9999px (cercle parfait)
- **Badge radius** : 10px
- **Shadow card** : `0 12px 24px oklch(0.35 0.08 350 / 0.15)`
- **Shadow small** : `0 4px 12px oklch(0.35 0.08 350 / 0.08)`

---

## 📦 Fichiers créés

### Frontend
1. **`public/chatbot-widget.css`** (7.6 KB)
   - Styles complets du widget
   - Animations fluides (pulse, bounce, slide-in)
   - Responsive mobile + desktop
   - Utilise les variables CSS du design system

2. **`public/chatbot-widget.js`** (8.9 KB)
   - Logique du chatbot
   - Gestion de l'état (ouvert/fermé, historique)
   - Communication avec le webhook n8n
   - Sauvegarde session dans sessionStorage

### Intégration
3. **`src/layouts/Layout.astro`** (modifié)
   - Ajout du widget avant `</body>`
   - Directive `is:inline` pour le script

---

## 🔧 Backend (inchangé)

Le backend reste le webhook n8n existant :
```
https://n8n-9z6l.onrender.com/webhook/3ee5f93c-8223-4d0a-b26b-ff121ee1497e
```

Le widget envoie des requêtes POST avec :
```json
{
  "message": "Message utilisateur",
  "sessionId": "session_...",
  "history": [...]
}
```

Et reçoit :
```json
{
  "response": "Réponse du bot",
  "message": "Alternative response field"
}
```

---

## ✨ Fonctionnalités

### Widget fermé (Bulle)
- ✅ Bulle flottante en bas à droite (64×64px)
- ✅ Couleur primaire avec dégradé
- ✅ Animation pulse douce (3s)
- ✅ Badge "💬" avec bounce subtil
- ✅ Hover : scale 1.05, shadow enhanced
- ✅ BounceIn au chargement

### Widget ouvert (Fenêtre)
- ✅ Fenêtre 400×620px (mobile: 100vw - 32px)
- ✅ Header avec avatar 🐴, titre, status
- ✅ Zone messages scrollable avec custom scrollbar
- ✅ Bulles de chat différenciées (bot vs user)
- ✅ Typing indicator avec animation dots
- ✅ Input avec focus ring primary
- ✅ Bouton send avec hover scale

### UX
- ✅ Historique persistant (sessionStorage)
- ✅ Auto-scroll vers le bas
- ✅ Liens cliquables dans les messages
- ✅ Message d'accueil par défaut
- ✅ Désactivation input pendant loading
- ✅ Enter pour envoyer
- ✅ Fermeture avec bouton ×

### Responsive
- ✅ Desktop : 400×620px
- ✅ Mobile : calc(100vw - 32px) max 400px
- ✅ Bulle réduite sur mobile (60×60px)

---

## 🚀 Déploiement

### Branche
```
feature/chatbot-redesign-pot-99
```

### Commits
1. `feat(chatbot): redesign widget to match Astro v2 design system (POT-99)`
2. `fix(chatbot): add is:inline directive to script tag`

### Build
✅ Build réussi avec Astro 5
✅ Fichiers copiés dans `dist/`
✅ Widget chargé et visible

### Tests locaux
✅ Widget visible en bas à droite
✅ Animations fonctionnelles
✅ Design cohérent avec le site

---

## 📸 Screenshots

### Widget fermé (Bulle)
- Visible en haut à droite du site
- Bulle rose avec icône chat
- Badge "💬" animé

### Widget ouvert (Fenêtre)
- Interface de conversation
- Header rose avec avatar 🐴
- Bulles de chat blanches/rose
- Input moderne avec bouton send

---

## 🔄 Prochaines étapes

### Pour validation
1. ✅ Push branche `feature/chatbot-redesign-pot-99`
2. ✅ Build et test locaux
3. ⏳ Créer PR GitHub
4. ⏳ Deploy staging Firebase (via branch deploy)
5. ⏳ Test fonctionnel avec n8n webhook
6. ⏳ Screenshots avant/après
7. ⏳ Validation Guillaume

### Améliorations possibles (futures)
- [ ] Animation typing indicator plus fluide
- [ ] Support markdown dans les messages
- [ ] Boutons quick-reply
- [ ] Feedback utilisateur (👍/👎)
- [ ] Analytics (GA4 events)
- [ ] A/B testing auto-open delay
- [ ] Avatar personnalisé par type de message

---

## 🐛 Debugging

### Widget n'apparaît pas
```javascript
// Dans la console browser
document.getElementById('pottok-chatbot')
// Doit retourner l'élément
```

### Erreur CORS
- Vérifier que le webhook n8n accepte les requêtes depuis pottok.club
- Vérifier headers `Access-Control-Allow-Origin`

### Messages ne s'envoient pas
```javascript
// Vérifier la console pour les erreurs fetch
// Tester le webhook manuellement
fetch('https://n8n-9z6l.onrender.com/webhook/3ee5f93c-8223-4d0a-b26b-ff121ee1497e', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ message: 'test', sessionId: 'test123' })
})
```

---

## 📞 Contact

Issue Linear : https://linear.app/studio-catapulte/issue/POT-99
Branche : `feature/chatbot-redesign-pot-99`
Agent : Pottok Dev Web
