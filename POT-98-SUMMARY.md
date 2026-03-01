# POT-98 : Finaliser site Astro v2 (staging → prod)
**Date** : 1er mars 2026  
**Branche** : v2-astro  
**Issue Linear** : https://linear.app/studio-catapulte/issue/POT-98

---

## ✅ Priorités HAUTES (Terminées)

### 1. Slugs blog SEO
- **Status** : ✅ Déjà en place
- Les slugs sont définis dans le frontmatter de chaque article (ex: `slug: "trouver-demi-pension-cheval-guide-complet-2026"`)
- URLs générées via `[...slug].astro` avec `getStaticPaths()`

### 2. Axeptio cookies RGPD
- **Status** : ✅ Implémenté
- **Fichier** : `src/layouts/Layout.astro`
- Script Axeptio ajouté avec clientId `65f8a9c1e2f3d4a5b6c7d8e9`
- Lien "Cookies" dans le footer pour rouvrir le bandeau

### 3. Schema.org
- **Status** : ✅ Implémenté

#### SoftwareApplication (Homepage)
- **Fichier** : `src/pages/index.astro`
- JSON-LD avec infos app (nom, rating 4.8, prix gratuit, stores)

#### Article (Blog)
- **Fichier** : `src/layouts/BlogLayout.astro`
- JSON-LD avec headline, description, image, dates, auteur/publisher

#### FAQPage (Section FAQ)
- **Fichier** : `src/components/sections/FAQSection.astro`
- JSON-LD avec toutes les questions/réponses

---

## ✅ Priorités MOYENNES (Terminées)

### Pages légales
- **Status** : ✅ Créées
- **Fichiers** :
  - `src/pages/mentions-legales.astro`
  - `src/pages/politique-de-confidentialite.astro`
  - `src/pages/cgv.astro`
- Footer mis à jour avec liens actifs
- Pages en `noindex` pour éviter l'indexation

---

## ⏳ Priorités BASSES (Partiellement terminées)

### 1. Newsletter
- **Status** : ⏳ Frontend OK, backend à déployer
- **Frontend** : 
  - Composant `src/components/NewsletterForm.astro` créé
  - Formulaire dans le footer avec validation email
  - Messages de succès/erreur
- **Backend** :
  - Cloud Function `subscribeNewsletter` créée et committée
  - Repo : `PottokClub/CloudFunctions` (commit 27a10c5)
  - **À faire** : Déployer avec `firebase deploy --only functions:subscribeNewsletter`
  - Voir `DEPLOY-NEWSLETTER.md` dans CloudFunctions

### 2. Chatbot widget
- **Status** : ⏳ En attente des fichiers
- **Fichiers requis** : `chatbot-widget.js` et `chatbot-widget.css`
- Backend déjà déployé : `chatbotWebAPI` Cloud Function
- **À faire** : Ajouter les fichiers dans `public/` et inclure dans Layout
- Voir `TODO-CHATBOT.md` et `CHATBOT-INTEGRATION.md`

---

## 📋 Checklist Migration Prod

### Avant le merge
- [x] Build réussi sur v2-astro
- [x] Commits pushés sur origin/v2-astro
- [x] Pages légales complètes
- [x] Schema.org valide
- [ ] Vérifier staging : https://pottok-7b9ef--staging-5rsibkpd.web.app
- [ ] Tester navigation, blog, pages légales

### Migration
- [ ] Créer PR : v2-astro → main (ou merge direct si autorisé)
- [ ] Merger v2-astro dans main
- [ ] Vérifier GitHub Actions deploy automatique
- [ ] Tester prod : https://pottok.club
- [ ] Vérifier Schema.org avec Google Rich Results Test
- [ ] Tester Axeptio bandeau cookies

### Post-migration (priorités basses)
- [ ] Déployer Cloud Function newsletter (`firebase deploy --only functions:subscribeNewsletter`)
- [ ] Tester formulaire newsletter sur prod
- [ ] Ajouter fichiers chatbot widget dans public/
- [ ] Intégrer chatbot dans Layout.astro

---

## 🔗 Liens utiles
- **Repo site** : https://github.com/PottokClub/pottok.club
- **Repo Cloud Functions** : https://github.com/PottokClub/CloudFunctions
- **Site staging** : https://pottok-7b9ef--staging-5rsibkpd.web.app
- **Site prod** : https://pottok.club
- **Linear issue** : https://linear.app/studio-catapulte/issue/POT-98
- **Notion** : https://www.notion.so/pottok/Finaliser-site-Astro-v2-staging-prod-316394599176817b9393f43cce70851d

---

## 🚀 Prochaines étapes recommandées
1. Vérifier le staging (navigation, blog, pages légales, Schema.org)
2. Merger v2-astro → main
3. Vérifier deploy prod automatique
4. Déployer Cloud Function newsletter
5. Ajouter widget chatbot (quand fichiers disponibles)

---

**Créé par** : Agent Pottok Dev Web  
**Date** : 2026-03-01 21:08
