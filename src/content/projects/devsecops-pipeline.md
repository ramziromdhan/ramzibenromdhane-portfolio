---
title: "Pipeline DevSecOps de référence, du commit au runtime"
summary: "Une chaîne de six contrôles de sécurité pour des microservices, déployée d’abord sur k3s puis migrée vers OpenShift."
year: 2026
status: "En cours"
role: "Conception et mise en œuvre"
tags: ["DevSecOps", "Kubernetes", "OpenShift", "Supply chain"]
featured: true
---

> À compléter : remplace chaque bloc de ce type par ton contenu réel, puis supprime-le. Fais valider ce que tu publies par ton encadrant.

## Contexte et problème

Décris en deux ou trois phrases le besoin : sécuriser la livraison d’une application en microservices (API Gateway, authentification, application, base de données) sans ralentir les équipes.

## Architecture

![Schéma du pipeline : commit, Gitleaks, Hadolint, Trivy, Cosign, Kyverno et Falco](/diagrams/devsecops-pipeline.svg)

Le pipeline suit le chemin du code. Les contrôles les plus bon marché passent en premier, pour échouer vite.

## Décisions de sécurité

| Contrôle | Ce qu’il bloque | Pourquoi ce choix |
| --- | --- | --- |
| Gitleaks | Secrets dans l’historique Git | À compléter |
| Hadolint | Dockerfile non conformes | À compléter |
| Trivy | Dépendances et images vulnérables | À compléter |
| Cosign | Images non signées | À compléter |
| Kyverno | Manifests non conformes | À compléter |
| Falco | Comportements suspects à l’exécution | À compléter |

## Résultats

> À compléter avec des chiffres : durée du pipeline, nombre de vulnérabilités bloquées, taux de faux positifs.

## Démo

> À compléter : vidéo de 60 à 90 secondes ou enregistrement de terminal.

## Leçons apprises

> À compléter : ce qui a surpris, ce que tu referais autrement, les limites de l’approche.
