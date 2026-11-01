---
title: "NG-SOC : plateforme SOC augmentée par l’IA"
summary: "Un SOC de laboratoire qui centralise la surveillance avec Wazuh, automatise la réponse à incident et confie le tri des alertes à un LLM hébergé en local."
year: 2026
status: "Terminé"
role: "Projet académique TEK-UP, de janvier à juin 2026"
tags: ["Wazuh", "SIEM", "SOAR", "LLM local", "Détection"]
featured: true
order: 2
---

## Contexte

Un analyste SOC passe l’essentiel de son temps à trier des alertes. Ce projet réunit détection, automatisation de la réponse et assistance par un modèle de langage pour réduire ce travail.

## Ce que j’ai construit

- **Surveillance centralisée** avec Wazuh sur des postes Linux et Windows.
- **Règles de détection** écrites pour les attaques par force brute, l’élévation de privilèges et les attaques PowerShell.
- **Automatisation SOAR** avec TheHive, MISP, Cortex et n8n : création des cas, enrichissement des indicateurs, analyse.
- **Couche IA** : un LLM hébergé en local (Ollama) trie automatiquement les alertes et rédige des résumés d’incident destinés aux analystes. Le modèle tourne dans l’infrastructure : les alertes ne la quittent pas.

<!-- À compléter : schéma d’architecture (SVG dans public/diagrams/), scénarios d’attaque testés, correspondance MITRE ATT&CK, temps de détection, limites du tri par LLM. -->
