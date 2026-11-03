---
title: "NG-SOC: Next-Generation AI-Driven Security Operations Center"
summary: "A lab SOC that automates the whole incident handling chain, from the Wazuh alert to remediation on the firewall, with a local LLM for triage and summaries."
year: 2026
status: "Completed"
role: "Design, integration and automation, as a pair"
tags: ["Wazuh", "n8n", "TheHive", "MISP", "Ollama", "OPNsense"]
featured: true
order: 2
---

## Context and objectives

Engineering project carried out as a pair with Baha Eddine Ben Hassine.

A traditional SOC relies on static rules and on analysts who suffer from alert fatigue. NG-SOC automates the complete incident handling chain (detection, enrichment, triage, remediation and reporting) and relies on a locally hosted language model for triage and summaries.

## Architecture

The infrastructure is virtualized with VirtualBox on a high-performance workstation (Intel Core i7-13700K, 32 GB of RAM, NVIDIA RTX 3060 12 GB GPU). A remote workstation, connected through Tailscale, extends the lab.

An OPNsense firewall, together with Snort in IPS mode, strictly segments the network into three zones:

| Zone | Role |
| --- | --- |
| Attacker | Kali Linux machine that simulates the attacks |
| Production | Target Ubuntu server, monitored by a Wazuh agent |
| Monitoring | Detection, analysis and response stack |

## Processing chain

![Diagram of the nine-step NG-SOC processing chain](/diagrams/ng-soc-workflow-en.svg)

1. An SSH brute-force attack is simulated from Kali Linux.
2. The Ubuntu target, equipped with a Wazuh agent, reports the events.
3. The Wazuh SIEM raises an alert.
4. A webhook triggers the n8n workflow, which orchestrates the rest.
5. n8n creates the case in TheHive 5.
6. Indicators are enriched and analyzed with MISP and Cortex.
7. A local LLM (Ollama, Llama 3.1 8B running on the GPU) triages the alert and writes a summary for the analyst.
8. A playbook automatically applies the remediation on the firewall.
9. An incident report is generated and sent by email.

## Technical stack

| Area | Tools |
| --- | --- |
| Virtualization and network | VirtualBox, OPNsense, Snort IPS, Tailscale |
| Detection and response | Wazuh, n8n, TheHive 5, Cortex, MISP |
| Artificial intelligence | Ollama, Llama 3.1 8B |
| Systems and tools | Ubuntu Server, Kali Linux, Docker, Git, Bash |

<!-- To complete: measured handling time from alert to report, LLM triage success rate, limits observed, screenshots of TheHive and of the report. -->
