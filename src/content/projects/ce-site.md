---
title: "Ce site, construit comme un projet DevSecOps"
summary: "Un portfolio statique avec une politique de sécurité de contenu stricte, une intégration continue qui scanne le code et des dépendances sous surveillance."
year: 2026
status: "Terminé"
role: "Conception, développement et exploitation"
tags: ["Astro", "Cloudflare", "CSP", "CI/CD"]
featured: true
repo: "https://github.com/REMPLACER/ramzibenromdhane.me"
---

Un portfolio de cybersécurité doit résister à un examen technique. Ce site est donc traité comme n’importe quel service en production.

## Architecture

Un site statique généré par Astro, hébergé sur Cloudflare Pages. Pas de serveur applicatif, pas de base de données : la surface d’attaque se réduit au domaine, au DNS et à la chaîne de build.

## Décisions de sécurité

- **CSP sans `unsafe-inline`.** Les feuilles de style sont émises en fichiers séparés et le seul script est un fichier local. Les blocs de code ne sont donc pas colorés, car la coloration injecterait des styles en ligne.
- **En-têtes de réponse** servis par un fichier `_headers` versionné : HSTS, `nosniff`, `frame-ancestors 'none'`, politique de référent et de permissions.
- **Pas de ressource tierce.** Les polices sont hébergées avec le site, il n’y a ni traqueur ni CDN externe.
- **Intégration continue** : audit des dépendances, recherche de secrets avec Gitleaks, analyse Trivy, et actions GitHub épinglées par empreinte de commit.
- **Dépendances sous surveillance** avec Dependabot, avec un délai d’attente avant d’adopter une version toute neuve.
- **Divulgation responsable** : un fichier `security.txt` indique comment signaler un problème.
- **Email du domaine** par redirection, avec SPF et DMARC.

## Leçons apprises

> À compléter : ce que tu as mesuré (note sur securityheaders.com, temps de build) et ce que tu améliorerais.
