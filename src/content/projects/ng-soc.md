---
title: "NG-SOC : centre d’opérations de sécurité de nouvelle génération piloté par l’IA"
summary: "Un SOC de laboratoire qui automatise toute la chaîne de traitement d’un incident, de l’alerte Wazuh à la remédiation sur le pare-feu, avec un LLM local pour le tri et la synthèse."
year: 2026
status: "Terminé"
role: "Conception, intégration et automatisation, en binôme"
tags: ["Wazuh", "n8n", "TheHive", "MISP", "Ollama", "OPNsense"]
featured: true
order: 2
---

## Contexte et objectifs

Projet d’ingénierie réalisé en binôme avec Baha Eddine Ben Hassine.

Un SOC traditionnel repose sur des règles statiques et sur des analystes exposés à la fatigue d’alerte. NG-SOC automatise la chaîne complète de traitement des incidents (détection, enrichissement, tri, remédiation et rapport) et confie le tri et la synthèse à un modèle de langage hébergé en local.

## Architecture

L’infrastructure est virtualisée sous VirtualBox sur un poste haute performance (Intel Core i7-13700K, 32 Go de RAM, GPU NVIDIA RTX 3060 de 12 Go). Un poste distant, relié via Tailscale, complète le laboratoire.

Un pare-feu OPNsense, accompagné de Snort en mode IPS, segmente strictement le réseau en trois zones :

| Zone | Rôle |
| --- | --- |
| Attaquant | Machine Kali Linux qui simule les attaques |
| Production | Serveur Ubuntu cible, surveillé par un agent Wazuh |
| Supervision | Pile de détection, d’analyse et de réponse |

## Chaîne de traitement

![Schéma de la chaîne de traitement NG-SOC en neuf étapes](/diagrams/ng-soc-workflow-fr.svg)

1. Simulation d’une attaque par force brute SSH depuis Kali Linux.
2. La cible Ubuntu, équipée d’un agent Wazuh, remonte les événements.
3. Le SIEM Wazuh génère une alerte.
4. Un webhook déclenche le workflow n8n, qui orchestre la suite.
5. n8n crée le cas dans TheHive 5.
6. Les indicateurs sont enrichis et analysés avec MISP et Cortex.
7. Un LLM local (Ollama, Llama 3.1 8B exécuté sur le GPU) trie l’alerte et rédige une synthèse destinée à l’analyste.
8. Un playbook applique automatiquement la remédiation sur le pare-feu.
9. Un rapport d’incident est généré et envoyé par email.

## Stack technique

| Domaine | Outils |
| --- | --- |
| Virtualisation et réseau | VirtualBox, OPNsense, Snort IPS, Tailscale |
| Détection et réponse | Wazuh, n8n, TheHive 5, Cortex, MISP |
| Intelligence artificielle | Ollama, Llama 3.1 8B |
| Systèmes et outils | Ubuntu Server, Kali Linux, Docker, Git, Bash |

<!-- À compléter : temps de traitement mesuré de l’alerte au rapport, taux de réussite du tri par le LLM, limites observées, captures de TheHive et du rapport. -->
