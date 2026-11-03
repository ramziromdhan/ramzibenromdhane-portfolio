---
title: "Reference DevSecOps pipeline, from commit to runtime"
summary: "A chain of security controls on GitHub Actions for microservices, deployed on OpenShift SNO over a Proxmox infrastructure."
year: 2026
status: "Ongoing"
role: "DevSecOps intern at LinSoft, June to August 2026"
tags: ["DevSecOps", "OpenShift", "Kubernetes", "Supply chain"]
featured: true
order: 1
---

## Context

During my internship at LinSoft, a Red Hat and AWS partner integrator, I designed a pipeline that protects a microservices application (API gateway, authentication, application, database) from source code to runtime.

The application first ran on k3s, then was migrated to OpenShift SNO (Single Node OpenShift), installed on a Proxmox infrastructure.

## Architecture

![Pipeline diagram: commit, Gitleaks, Hadolint, Trivy, Cosign, Kyverno and Falco](/diagrams/devsecops-pipeline-en.svg)

The pipeline follows the path of the code and places the cheapest controls first: an early failure costs less than a late one. It runs on GitHub Actions.

## Security decisions

| Control | Stage | What it blocks |
| --- | --- | --- |
| Static analysis (SAST) | Continuous integration | Flaws in the source code |
| Gitleaks | Git repository | Committed secrets |
| Hadolint | Build | Badly built Dockerfiles |
| Trivy | Build | Vulnerable dependencies and images |
| Cosign | Registry | Unsigned images |
| Kyverno | Cluster admission | Non-compliant manifests |
| Falco | Runtime | Suspicious behavior |

## Achievements

- Full CI/CD pipeline on GitHub Actions, from source code to runtime security.
- Static analysis, container scanning and image signing with Cosign.
- Kyverno (admission) and Falco (runtime) policies enforced.
- Pipeline deployed and operated on OpenShift SNO, on Proxmox.

<!-- To complete: pipeline duration, number of vulnerabilities blocked, false positives, video demo, lessons learned. -->
