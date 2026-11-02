---
title: "Ce site, construit comme un projet DevSecOps"
summary: "Un portfolio statique conçu comme un service en production : politique de sécurité de contenu stricte, chaîne CI qui scanne le code et les dépendances, dépendances sous surveillance."
year: 2026
status: "Terminé"
role: "Conception, développement et exploitation"
tags: ["Astro", "Cloudflare", "CSP", "CI/CD"]
featured: false
order: 9
repo: "https://github.com/ramziromdhan/ramzibenromdhane-portfolio"
---

Un portfolio de cybersécurité doit résister à un examen technique. Ce site est donc traité comme un service en production : une architecture réduite au minimum, un modèle de menaces et une chaîne de contrôles automatisés.

## Architecture

![Schéma de l’architecture : le développeur pousse le code sur GitHub, la chaîne CI le contrôle, et Cloudflare Pages construit et déploie le site vers les visiteurs](/diagrams/ce-site-architecture.svg)

Le site est généré par Astro et hébergé sur Cloudflare Pages. Il n’y a ni serveur applicatif, ni base de données, ni compte utilisateur : la surface d’attaque se réduit au domaine, au DNS, à l’hébergeur et à la chaîne de build.

À chaque push et pull request, GitHub Actions contrôle le code, pendant que Cloudflare Pages construit et déploie la branche principale. Le DNS est géré par Cloudflare, et l’adresse de contact est une redirection d’email vers ma boîte personnelle.

## Modèle de menaces et mesures

| Risque | Mesure |
| --- | --- |
| Injection de contenu (XSS) | Politique de sécurité de contenu stricte, sans `unsafe-inline`, et aucun script tiers dans le code |
| Intégration frauduleuse dans une autre page | `frame-ancestors 'none'` et `X-Frame-Options` |
| Interception du trafic | HTTPS partout et HSTS |
| Fuite de secrets | Gitleaks à chaque push et à chaque pull request |
| Dépendances vulnérables | `npm audit`, analyse Trivy et Dependabot, avec un délai d’attente avant d’adopter une version toute neuve |
| Compromission de la chaîne CI | Actions GitHub épinglées par empreinte de commit et permissions minimales |
| Signalement d’une faille | Fichier `security.txt` |

Les en-têtes de réponse sont définis dans un fichier `_headers` versionné avec le code. Les feuilles de style sont émises en fichiers séparés et le seul script du site est un fichier local, ce qui permet une politique sans styles ni scripts en ligne.

## Résultats

- Le site se construit en 2 à 4 secondes en local et génère des pages entièrement statiques.
- La sortie de build ne contient ni feuille de style ni script en ligne (hors données structurées JSON-LD), ce qui rend la politique stricte applicable.
- Aucune ressource tierce n’est chargée par le code du site : polices, scripts et images sont servis par le site lui-même.

## Évolutions prévues

- Mesurer et publier les notes de securityheaders.com et de Mozilla Observatory.
- Traiter explicitement le script de mesure d’audience que l’hébergeur peut ajouter : le désactiver, ou l’autoriser dans la politique.
- Activer DNSSEC et verrouiller le domaine.
- Publier SPF et DMARC pour l’adresse de contact.
- Protéger la branche principale, pour que la CI bloque réellement un déploiement en cas d’échec.

## Leçons apprises

Une politique stricte a un coût : les blocs de code ne sont pas colorés, car la coloration injecterait des styles en ligne. Les ajouts automatiques de l’hébergeur doivent aussi être traités explicitement, en les autorisant ou en les désactivant, car une politique stricte ne tolère pas les ajouts silencieux.
