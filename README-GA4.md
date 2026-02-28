# 📊 Intégration Google Analytics 4 - pottok.club

> Guide complet d'installation et configuration de GA4 sur le site Pottok

---

## 🎯 Objectif

Tracker les conversions blog → app avec événements custom et dimensions personnalisées.

**Property GA4** : `353847055` (pottok-7b9ef)  
**Site** : https://pottok.club

---

## 📦 Fichiers livrés

- `ga4-tracking.js` — Script de tracking complet avec auto-binding
- `index-with-ga4.html` — Exemple d'intégration dans le HTML
- `README-GA4.md` — Ce guide

---

## ⚙️ Installation

### Étape 1 : Ajouter les scripts dans le `<head>`

Ouvrir votre fichier `index.html` (site statique) et ajouter **dans le `<head>`** :

```html
<!-- Google Analytics 4 -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-353847055"></script>
<script src="/ga4-tracking.js"></script>
```

**⚠️ Important** :
- Le script `gtag.js` doit être chargé en **premier** (avec `async`)
- Le script `ga4-tracking.js` doit être chargé **après**
- Placer ces scripts le plus **haut possible** dans le `<head>` pour capturer toutes les interactions

### Étape 2 : Uploader `ga4-tracking.js`

- Copier le fichier `ga4-tracking.js` à la racine de votre repo GitHub
- Ou l'ajouter au repo et référencer avec le bon chemin

### Étape 3 : Tagger vos éléments HTML

Le tracking est **automatique** pour les liens App Store/Play Store.  
Pour les autres éléments, ajouter les attributs `data-ga4-*` :

#### Boutons CTA "Télécharger l'app"

```html
<button 
  data-ga4-cta="hero"
  data-ga4-platform="apple"
>
  Télécharger sur iOS
</button>
```

**Attributs** :
- `data-ga4-cta` : localisation du CTA (`hero`, `footer`, `article`, etc.)
- `data-ga4-platform` (optionnel) : `apple` | `android` | `both`

#### Formulaires newsletter

```html
<form data-ga4-newsletter="footer">
  <input type="email" required>
  <button type="submit">S'inscrire</button>
</form>
```

#### Liens contact

```html
<a href="mailto:contact@pottok.club" data-ga4-contact="header">
  Contactez-nous
</a>
```

#### Liens sociaux

```html
<a href="https://instagram.com/pottokclub" data-ga4-social="instagram">
  Instagram
</a>
```

---

## 📊 Configuration GA4 (Admin)

### Étape 4 : Créer les Custom Dimensions

Se connecter à Google Analytics 4 → **Admin** → **Définitions personnalisées** → **Créer une dimension personnalisée**

| Nom de la dimension | Nom du paramètre | Portée | Description |
|---------------------|------------------|--------|-------------|
| CTA Location | `cta_location` | Événement | Position du CTA (hero, footer, etc.) |
| Platform | `platform` | Événement | iOS ou Android |
| Article Title | `article_title` | Événement | Titre de l'article (blog) |
| Time Spent | `time_spent` | Événement | Temps passé sur article (seuils) |
| Store | `store` | Événement | App Store ou Play Store |
| Location | `location` | Événement | Section du site (générique) |

**⚠️ Important** : Les dimensions doivent être créées **avant** de collecter les données (peuvent prendre jusqu'à 24h pour être actives).

### Étape 5 : Marquer les conversions

Dans GA4 : **Admin** → **Événements** → Cocher "Marquer comme conversion" pour :

- ✅ `cta_download_click`
- ✅ `store_link_click`
- ✅ `newsletter_signup`

Ces événements apparaîtront ensuite dans les rapports **Conversions**.

---

## 🧪 Tests

### Étape 6 : Activer le mode debug (optionnel)

Pour tester en local, ajouter ce paramètre à l'URL :

```
https://pottok.club?debug_mode=true
```

Ou modifier temporairement `ga4-tracking.js` ligne 12 :

```javascript
gtag('config', GA4_MEASUREMENT_ID, {
  'send_page_view': true,
  'cookie_flags': 'SameSite=None;Secure',
  'debug_mode': true  // ← Ajouter cette ligne
});
```

### Étape 7 : Vérifier dans DebugView

1. Aller sur GA4 : **Configure** → **DebugView**
2. Naviguer sur le site avec `?debug_mode=true`
3. Vérifier que les événements remontent en temps réel :
   - `page_view`
   - `cta_download_click`
   - `scroll_depth`
   - `article_engagement`
   - etc.

**⚠️ Ne pas oublier de retirer `debug_mode: true` avant le déploiement en prod.**

### Étape 8 : Tests manuels

Checklist de test :

- [ ] Clic sur bouton CTA → `cta_download_click` avec `cta_location` et `platform`
- [ ] Clic sur badge App Store → `store_link_click` avec `store: app_store`
- [ ] Clic sur badge Play Store → `store_link_click` avec `store: play_store`
- [ ] Scroll d'un article → `scroll_depth` à 25%, 50%, 75%, 100%
- [ ] Rester 30s sur un article → `article_engagement` avec `time_spent: 30`
- [ ] Rester 60s sur un article → `article_engagement` avec `time_spent: 60`
- [ ] Soumettre formulaire newsletter → `newsletter_signup`
- [ ] Clic lien contact → `contact_click`
- [ ] Clic lien Instagram → `social_click` avec `platform: instagram`

---

## 📈 Événements trackés

| Événement | Paramètres | Déclencheur |
|-----------|-----------|-------------|
| `cta_download_click` | `cta_location`, `platform`, `cta_type` | Clic sur bouton "Télécharger l'app" |
| `store_link_click` | `store`, `location`, `link_type` | Clic sur lien App Store / Play Store |
| `scroll_depth` | `percent`, `article_title`, `article_url` | Scroll à 25%, 50%, 75%, 100% |
| `article_engagement` | `time_spent`, `article_title`, `article_url` | Temps passé : 30s, 60s, 120s, 300s |
| `newsletter_signup` | `location` | Soumission formulaire newsletter |
| `contact_click` | `location` | Clic sur lien contact |
| `social_click` | `platform`, `location` | Clic sur lien réseau social |
| `qr_code_view` | `qr_location` | (optionnel) Interaction QR code |

---

## 🚀 Déploiement

### Checklist pré-déploiement

- [ ] Fichiers ajoutés au repo GitHub + déployés
- [ ] Scripts ajoutés dans le `<head>`
- [ ] Custom dimensions créées dans GA4
- [ ] Conversions marquées dans GA4
- [ ] Tests DebugView OK
- [ ] `debug_mode` désactivé
- [ ] Vérifier que GA4 collecte bien les données (Realtime report)

### Timeline de collecte

- **Temps réel** : DebugView et Realtime reports (instantané)
- **Événements** : Rapports Events (≈ 4h de délai)
- **Conversions** : Rapports Conversions (≈ 24-48h)
- **Custom dimensions** : Rapports Exploration (≈ 24h)

---

## 📊 Rapports à créer dans GA4

### Rapport "Blog → App"

**Exploration** → **Analyse d'entonnoir** :

1. **Étape 1** : Visite d'une page `/blog/`
2. **Étape 2** : `scroll_depth` (50% ou plus)
3. **Étape 3** : `cta_download_click` OU `store_link_click`

**Métrique de succès** : Taux de conversion étape 1 → étape 3

### Rapport "Top Articles"

**Exploration** → **Analyse à variables libres** :

- **Dimension** : Article Title
- **Métriques** : 
  - Nombre d'événements `cta_download_click`
  - Nombre d'événements `store_link_click`
  - Moyenne `time_spent`
- **Filtres** : Event name = `cta_download_click` ou `store_link_click`

### Rapport "iOS vs Android"

**Exploration** → **Graphique circulaire** :

- **Dimension** : Platform
- **Métrique** : Nombre d'événements
- **Filtre** : Event name = `cta_download_click`

---

## 🔧 Tracking manuel (avancé)

Si vous avez besoin de tracker des événements custom dans du JavaScript :

```javascript
// CTA download
GA4Tracker.trackCTADownload('popup', 'apple', 'button');

// Store click
GA4Tracker.trackStoreClick('app_store', 'footer', 'badge');

// Newsletter signup
GA4Tracker.trackNewsletterSignup('popup');

// Contact click
GA4Tracker.trackContactClick('header');

// Social click
GA4Tracker.trackSocialClick('instagram', 'footer');

// QR Code view
GA4Tracker.trackQRCodeView('hero');

// Événement générique
GA4Tracker.trackEvent('custom_event', {
  custom_param1: 'value',
  custom_param2: 123
});
```

---

## ⚠️ Notes importantes

### RGPD / Cookies

**Le site n'a actuellement PAS de bannière cookies.**

Google Analytics 4 dépose des cookies (`_ga`, `_ga_*`) qui nécessitent **le consentement de l'utilisateur** (RGPD).

**Action requise** :
1. Ajouter une bannière de consentement (ex: [Tarteaucitron](https://tarteaucitron.io/), [Cookiebot](https://www.cookiebot.com/))
2. Implémenter le **Consent Mode v2** de Google (obligatoire depuis mars 2024)

**Exemple avec Consent Mode** :

```javascript
// AVANT gtag('config')
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}

gtag('consent', 'default', {
  'analytics_storage': 'denied',  // Refus par défaut
  'ad_storage': 'denied'
});

// Puis quand l'utilisateur accepte :
gtag('consent', 'update', {
  'analytics_storage': 'granted'
});

// PUIS gtag('config', ...)
```

### Privacy & Data Retention

- **IP Anonymization** : Activée par défaut dans GA4 ✅
- **Data Retention** : Vérifier dans **Admin** → **Paramètres de conservation des données** (recommandé : 14 mois)

---

## 🐛 Troubleshooting

### Les événements ne remontent pas dans GA4

1. Vérifier que `ga4-tracking.js` est bien chargé (ouvrir la console : `GA4Tracker` doit exister)
2. Vérifier la console pour les messages `[GA4] ...`
3. Vérifier que l'ID de mesure est bien `G-353847055` (dans le script gtag.js)
4. Vérifier DebugView avec `?debug_mode=true`

### Les custom dimensions n'apparaissent pas

1. Attendre 24-48h après création
2. Vérifier que les noms de paramètres correspondent exactement (`cta_location`, pas `ctaLocation`)
3. Vérifier que les événements remontent bien (Reports → Events)

### Le scroll depth ne fonctionne pas

1. Vérifier que la page a assez de contenu pour scroller
2. Ouvrir la console, scroller, chercher les logs `[GA4] scroll_depth`

---

## 📞 Support

- **Documentation GA4** : https://support.google.com/analytics/answer/10089681
- **Consent Mode v2** : https://support.google.com/analytics/answer/9976101
- **DebugView** : https://support.google.com/analytics/answer/7201382

---

## ✅ Checklist finale

### Installation
- [ ] Script gtag.js ajouté dans `<head>`
- [ ] Script ga4-tracking.js ajouté dans `<head>` (après gtag.js)
- [ ] Fichier ga4-tracking.js uploadé sur le serveur

### Configuration GA4
- [ ] Custom dimensions créées (6 dimensions)
- [ ] Événements marqués comme conversions (3 événements)
- [ ] Data retention configurée (14 mois)

### Tagging HTML
- [ ] Boutons CTA taguès avec `data-ga4-cta`
- [ ] Formulaires newsletter tagués avec `data-ga4-newsletter`
- [ ] Liens contact tagués avec `data-ga4-contact`
- [ ] Liens sociaux tagués avec `data-ga4-social`

### Tests
- [ ] DebugView : événements visibles en temps réel
- [ ] Realtime report : utilisateurs actifs visibles
- [ ] Tests manuels : tous les événements déclenchés

### RGPD
- [ ] Bannière de consentement ajoutée
- [ ] Consent Mode v2 implémenté
- [ ] Politique de confidentialité mise à jour

---

**Installation estimée : 30 minutes**  
**Temps avant collecte complète : 24-48h**

Bon tracking ! 🚀
