// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://pottok-clean.web.app',
  vite: {
    plugins: [tailwindcss()]
  },
  integrations: [sitemap()],
  redirects: {
    '/index-with-ga4.html': '/',
    '/blog.html': '/blog/',
    '/blog/trouver-demi-pension-cheval-guide-complet-2026.html': '/blog/trouver-demi-pension-cheval-guide-complet-2026/',
    '/blog/contrat-demi-pension-cheval-modele-gratuit.html': '/blog/contrat-demi-pension-cheval-modele-gratuit/',
    '/blog/demi-pension-cheval-debutant-guide-complet.html': '/blog/demi-pension-cheval-debutant-guide-complet/',
    '/blog/comment-mettre-son-cheval-en-demi-pension.html': '/blog/comment-mettre-son-cheval-en-demi-pension/',
    '/blog/comment-trouver-une-demi-pension-en-île-de-france.html': '/blog/comment-trouver-une-demi-pension-en-ile-de-france/',
    '/blog/quel-est-le-prix-d-une-demi-pension-cheval.html': '/blog/quel-est-le-prix-d-une-demi-pension-cheval/',
    '/blog/quel-galop-pour-une-demi-pension.html': '/blog/quel-galop-pour-une-demi-pension/',
    '/blog/quelle-assurance-pour-un-cheval-en-demi-pension.html': '/blog/quelle-assurance-pour-un-cheval-en-demi-pension/',
    '/blog/tiers-quart-et-demi-pension-quelle-formule-chosir.html': '/blog/tiers-quart-et-demi-pension-quelle-formule-choisir/',
    '/blog/trouver-une-demi-pension-avec-un-cheval-qui-match.html': '/blog/trouver-une-demi-pension-avec-un-cheval-qui-match/',
    '/blog/un-cheval-en-demi-pension-le-compromis-parfait.html': '/blog/un-cheval-en-demi-pension-le-compromis-parfait/',
    '/blog/devenir-demi-pensionnaire-ou-propriétaire-d-un-cheval.html': '/blog/devenir-demi-pensionnaire-ou-proprietaire-d-un-cheval/',
    '/blog/le-contrat-de-demi-pension-pour-une-bonne-entente-avec-le-propriétaire.html': '/blog/le-contrat-de-demi-pension-pour-une-bonne-entente-avec-le-proprietaire/',
  }
});