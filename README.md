# ramzibenromdhane.me

Portfolio statique : Astro, CSS écrit à la main, aucune ressource tierce. Hébergé sur Cloudflare Pages.

## Démarrer

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # génère dist/
```

Astro 7 exige Node 22.23.4 ou plus récent (voir `.node-version`).

## Où modifier quoi

| Je veux changer | Fichier |
| --- | --- |
| Texte d’accueil, liens, compétences, parcours, certifications | `src/data/site.ts` |
| Une étude de cas | `src/content/projects/*.md` |
| Ajouter un projet | nouveau fichier `.md` dans `src/content/projects/` |
| Couleurs, typographie, espacements | `src/styles/global.css` (variables en haut) |
| En-têtes de sécurité | `public/_headers` |
| Schémas | exporte en SVG dans `public/diagrams/` |

## À faire avant la mise en ligne

- [ ] `src/data/site.ts` : renseigne `github` et `linkedin`.
- [ ] Dépose ton CV dans `public/Ramzi-Ben-Romdhane-CV.pdf` (le bouton apparaît tout seul).
- [ ] Complète les trois études de cas (les blocs « À compléter ») et supprime ce qui ne te sert pas.
- [ ] `src/content/projects/ce-site.md` : remplace l’URL du dépôt (`REMPLACER`).
- [ ] Fais valider par ton encadrant ce que tu publies sur le travail fait en entreprise.
- [ ] Ajoute tes certifications dans `src/data/site.ts`.
- [ ] Ajoute une image de partage `public/og.png` (1200×630) et la balise `og:image` dans `src/layouts/Base.astro`.
- [ ] Renouvelle `Expires` dans `public/.well-known/security.txt` chaque année.

## Cloudflare Pages

- Framework : Astro. Build : `npm run build`. Sortie : `dist`.
- Variable d’environnement `NODE_VERSION` = `22` (ou `24`) si le build se plaint de la version de Node.
- Si tu as déjà ajouté des en-têtes via des règles Cloudflare, supprime les doublons : des valeurs en double sont jointes et peuvent rendre la CSP incohérente.
- Après validation, passe HSTS à `max-age=31536000` dans `public/_headers`.

## Sécurité du dépôt

- La CI (`.github/workflows/ci.yml`) audite les dépendances, compile, cherche des secrets (Gitleaks) et analyse le code (Trivy). Les actions sont épinglées par empreinte de commit : laisse Dependabot les mettre à jour.
- Active la protection de la branche `main`, la 2FA GitHub et l’analyse des secrets (secret scanning) dans les paramètres du dépôt.
- Active DNSSEC dans Cloudflare puis ajoute l’enregistrement DS chez Namecheap.
- Teste les en-têtes avec `curl -I https://ramzibenromdhane.me`, securityheaders.com et Mozilla Observatory.

## Choix à connaître

- **Pas de coloration syntaxique** : Shiki injecte des attributs `style` en ligne, que la CSP bloque. Pour la réactiver, ajoute `style-src-attr 'unsafe-inline'` à la CSP et supprime `syntaxHighlight: false` dans `astro.config.mjs`.
- **Thème** : clair ou sombre selon le système, avec un bouton pour forcer l’un des deux (`public/theme.js`).
- **Une seule langue (français)** pour garder le squelette léger. Une version anglaise peut s’ajouter ensuite avec le routage i18n d’Astro.
