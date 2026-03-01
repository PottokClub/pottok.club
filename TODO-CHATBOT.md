# TODO: Intégration Chatbot Widget

## Status
⏳ **Priorité basse** - En attente des fichiers chatbot-widget.js et chatbot-widget.css

## Fichiers requis
Les fichiers suivants doivent être ajoutés au dossier `public/` :
- `chatbot-widget.js` — Widget JavaScript (voir CHATBOT-INTEGRATION.md)
- `chatbot-widget.css` — Styles du widget

## Intégration dans Layout.astro
Une fois les fichiers disponibles, ajouter avant `</body>` dans `src/layouts/Layout.astro` :

```html
<!-- Pottok Chatbot Widget -->
<link rel="stylesheet" href="/chatbot-widget.css">
<script src="/chatbot-widget.js"></script>
```

## Backend
Le backend Cloud Function est déjà déployé :
- Endpoint: `https://europe-west1-pottok-7b9ef.cloudfunctions.net/chatbotWebAPI`
- Configuration dans le widget (ligne ~15 de chatbot-widget.js)

## Documentation complète
Voir `CHATBOT-INTEGRATION.md` pour les détails complets d'intégration.

## Ref
Issue POT-98 - Priorité basse
