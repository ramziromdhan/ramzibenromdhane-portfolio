---
title: "DevSecOps Microservices"
summary: "Plateforme DevSecOps composée de microservices authentifiés, de bases de données PostgreSQL, d'une passerelle NGINX et d'un pipeline de sécurité automatisé sur OpenShift."
year: 2026
status: "Terminé"
tags: ["OpenShift", "Kubernetes", "DevSecOps", "Go", "FastAPI", "Kyverno", "Falco"]
featured: true
---

# DevSecOps Microservices

Exemple de plateforme DevSecOps composée de microservices authentifiés, de bases de données PostgreSQL, d'une passerelle API NGINX, de manifestes de déploiement Kubernetes/Helm et d'un pipeline de sécurité automatisé.

Ce projet démontre la mise en œuvre des fonctionnalités suivantes :

- Authentification basée sur JWT et autorisation par utilisateur.
- Opérations CRUD pour la gestion des éléments de l'application.
- Téléversement sécurisé de fichiers et gestion du stockage objet.
- Analyse, signature des images de conteneurs et application de politiques d'admission.
- Politiques réseau Kubernetes et contrôle d'accès RBAC.
- Métriques Prometheus, tableaux de bord Grafana et alertes de sécurité.
- SAST, SCA, tests de sécurité, analyse IaC et génération de rapports avec DefectDojo.

## Architecture

![Architecture DevSecOps OpenShift SNO](/diagrams/OpenShift_DevSecOps_CICD_Pipeline.svg)

### Services

| Composant | Port local | Rôle dans Kubernetes |
|---|---:|---|
| `auth-service` | `8001` | Inscription des utilisateurs, authentification et validation JWT |
| `app-service` | `8002` | Opérations CRUD authentifiées sur les éléments |
| `file-service` (Python) | `8003` | Validation et stockage local des fichiers téléversés |
| `file-service-go` | `8003` | Téléversement multipart/presigné et intégration MinIO |
| `auth-db` | interne | Base de données PostgreSQL pour les utilisateurs |
| `app-db` | interne | Base de données PostgreSQL pour les éléments |
| `gateway` | `8080` | Routage NGINX, en-têtes HTTP et limitation du débit |
| MinIO | `9000`/`9001` | Stockage objet et interface d'administration dans Kubernetes |

L'environnement Docker Compose construit l'ancienne implémentation Python située dans `services/file-service`. Le pipeline GitHub Actions ainsi que le déploiement Helm/OpenShift construisent et déploient l'implémentation Go située dans `services/file-service-go` sous forme de workload `file-service`.

Il s'agit de deux profils de déploiement distincts et non de deux services de gestion de fichiers déployés simultanément.

## Prérequis

Pour le développement local :

- Docker Engine avec Compose.
- `curl`.
- Python 3.12 ou version ultérieure pour les outils de sécurité locaux.

Pour le déploiement Kubernetes :

- `kubectl` connecté à un cluster.
- Helm 3.
- Un registre de conteneurs et les identifiants nécessaires.
- Prometheus Operator si les ressources de supervision sont activées.
- Kyverno si l'application des politiques sur les images est activée.
- Falco si la détection des activités à l'exécution est activée.

Pour utiliser l'ensemble des fonctionnalités de sécurité, installer les outils utilisés par les scripts et le pipeline, notamment `bandit`, `semgrep`, `trivy`, `sqlmap`, `zaproxy`, `checkov`, `kubesec`, `gitleaks` et `cosign`.

## Démarrage rapide avec Docker Compose

1. Examiner les valeurs d'environnement dans `docker-compose.yml`. Remplacer les valeurs réservées au développement avant d'utiliser l'environnement en dehors d'un environnement local.

2. Démarrer les services :

   ```bash
   docker compose up --build
   ```

3. Vérifier la passerelle :

   ```bash
   curl http://localhost:8080/health
   ```

4. Arrêter l'environnement :

   ```bash
   docker compose down
   ```

Pour supprimer également les volumes locaux des bases de données et des fichiers téléversés :

```bash
docker compose down -v
```

## Utilisation de l'API

Les exemples ci-dessous utilisent la passerelle à l'adresse `http://localhost:8080`.

### Inscription et authentification

```bash
curl -X POST http://localhost:8080/auth/register \
  -H 'Content-Type: application/json' \
  -d '{"email":"user@example.com","password":"change-this-password"}'

TOKEN=$(curl -s -X POST http://localhost:8080/auth/token \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  -d 'username=user@example.com&password=change-this-password' \
  | python3 -c 'import json,sys; print(json.load(sys.stdin)["access_token"])')
```

### Utilisateur actuel

```bash
curl http://localhost:8080/auth/me \
  -H "Authorization: Bearer ${TOKEN}"
```

### Gestion des éléments

```bash
curl http://localhost:8080/items \
  -H "Authorization: Bearer ${TOKEN}"

curl -X POST http://localhost:8080/items \
  -H "Authorization: Bearer ${TOKEN}" \
  -H 'Content-Type: application/json' \
  -d '{"title":"First item","description":"Example item"}'
```

Les éléments sont filtrés en fonction de l'utilisateur authentifié. Un utilisateur ne peut ni consulter ni supprimer les éléments appartenant à un autre utilisateur.

### Téléversement de fichiers

Le service de gestion des fichiers Python accepte les fichiers PDF, PNG, JPEG, TXT et CSV, avec une taille maximale de 10 Mio :

```bash
curl -X POST http://localhost:8080/upload \
  -H "Authorization: Bearer ${TOKEN}" \
  -F 'file=@./example.txt'
```

Le service de gestion des fichiers Go fournit des points de terminaison supplémentaires pour les opérations de téléversement multipart et presignées :

```text
POST  /files/initiate
POST  /files/:id/presign-part
POST  /files/:id/complete
POST  /share
GET   /download/:token
PATCH /download/:token/verify
GET   /upload
POST  /upload
```

Tous les points de terminaison protégés nécessitent un jeton Bearer.

Les points de terminaison de vérification de l'état sont disponibles sur `/health`. Les métriques compatibles avec Prometheus sont exposées sur `/metrics` par les services applicatifs.

## Déploiement Kubernetes avec Helm

Les charts sont publiés indépendamment, mais les templates actuels utilisent le namespace `devsecops-prod` dans les métadonnées des ressources et la découverte des services.

Utiliser ce namespace, sauf si les charts sont préalablement modifiés pour être indépendants du namespace.

```bash
kubectl create namespace devsecops-prod

helm upgrade --install auth-db ./helm/auth-db -n devsecops-prod
helm upgrade --install app-db ./helm/app-db -n devsecops-prod
helm upgrade --install minio ./helm/minio -n devsecops-prod
helm upgrade --install auth-service ./helm/auth-service -n devsecops-prod
helm upgrade --install app-service ./helm/app-service -n devsecops-prod
helm upgrade --install file-service ./helm/file-service -n devsecops-prod
helm upgrade --install gateway ./helm/gateway -n devsecops-prod
helm upgrade --install network-policies ./helm/network-policies -n devsecops-prod
helm upgrade --install rbac ./helm/rbac -n devsecops-prod
```

Examiner les manifestes générés avant leur application :

```bash
helm template gateway ./helm/gateway -n devsecops-prod
helm lint ./helm/gateway
```

Le chart de la passerelle expose un NodePort configuré dans `helm/gateway/values.yaml` (valeur par défaut : `30080`).

Récupérer l'adresse d'un nœud et tester la passerelle avec :

```bash
NODE_IP=$(kubectl get nodes -o jsonpath='{.items[0].status.addresses[0].address}')
curl "http://${NODE_IP}:30080/health"
```

Pour OpenShift, le dépôt contient également des manifestes de routes dans `openshift/routes/`.

### Configuration des images

Mettre à jour les dépôts et les tags des images dans les fichiers de valeurs des charts des services avant le déploiement.

Le pipeline CI publie les images sur Quay et utilise des tags de commit immuables en complément du tag `latest`. Privilégier les tags immuables dans les environnements de production.

Ne jamais stocker les mots de passe du registre, les secrets JWT, les identifiants MinIO ou les clés privées de signature dans Git.

Les fournir via des Secrets Kubernetes, un gestionnaire externe de secrets ou le stockage sécurisé des secrets CI/CD.

## Contrôles de sécurité

Le dépôt intègre plusieurs mécanismes de sécurité en profondeur au niveau de l'application et du cluster :

- Hachage des mots de passe avec bcrypt et jetons d'accès JWT à courte durée de validité.
- Vérification des autorisations lors des opérations sur les éléments.
- Protection contre les téléversements excessifs, les extensions non autorisées, les types MIME incorrects et les attaques par traversée de répertoires (Path Traversal).
- En-têtes HTTP de sécurité dans les services et la passerelle.
- Limitation du débit des requêtes avec NGINX.
- Politiques Kyverno pour l'exécution sans privilèges root et les images vulnérables.
- Vérification des signatures des images avec Cosign.
- Politiques réseau Kubernetes et comptes de service.
- Règles personnalisées Falco pour la détection à l'exécution.
- Analyse des vulnérabilités avec Trivy et génération de SBOM au format CycloneDX.

Des valeurs par défaut destinées au développement sont volontairement présentes dans la configuration locale pour faciliter l'utilisation. Elles ne sont pas adaptées à un environnement de production.

Renouveler tous les identifiants et configurer une clé `JWT_SECRET_KEY` forte et unique avant le déploiement.

## Pipeline CI/CD

Le workflow défini dans `.github/workflows/pipeline.yml` s'exécute lors des push et des pull requests ciblant la branche `main`.

Ses principales étapes sont :

1. **SAST** — Analyse statique de sécurité avec Bandit, Semgrep et Gitleaks.
2. **Build** — Construction des images des services d'authentification, applicatif et de gestion des fichiers en Go.
3. **Push** — Publication des images sur Quay.
4. **SCA** — Analyse avec Hadolint, détection des vulnérabilités avec Trivy et génération de SBOM.
5. **Signature** — Signature et vérification des images avec Cosign.
6. **Validation IaC** — Vérification avec Checkov et analyse des manifestes Kubernetes.
7. **Déploiement et vérification** — Déploiement dans l'environnement OpenShift SNO configuré et vérification de l'état opérationnel des workloads.
8. **Validation à l'exécution et reporting** — Vérification de la détection Falco et importation facultative des rapports dans DefectDojo.

Le DAST n'est actuellement pas intégré comme une étape autonome dans le workflow GitHub Actions.

Le dépôt fournit des scripts de tests de sécurité ainsi qu'un mécanisme d'authentification ZAP pour les tests autorisés. Ces vérifications doivent être exécutées séparément sur un environnement déployé ou ajoutées au pipeline comme étape de validation de sécurité.

Configurer les secrets GitHub Actions nécessaires dans les paramètres du dépôt, notamment les identifiants du registre, les éléments de signature Cosign et les identifiants d'accès au cluster et de déploiement.

Ne jamais inclure de clés privées dans les fichiers de workflow ou les commits Git.

## Tests de sécurité

La suite complète de tests de sécurité nécessite un déploiement Kubernetes opérationnel, un fichier `.env.test` correctement configuré et les outils de sécurité requis :

```bash
./tests/security/run-full-security-suite.sh
```

La suite prévue couvre :

- Les identifiants invalides et l'application des contrôles JWT.
- L'isolation des données entre utilisateurs.
- Les en-têtes HTTP de sécurité.
- Les vérifications de sécurité des téléversements de fichiers.
- Les tests d'injection SQL avec SQLMap.
- La limitation du débit au niveau de la passerelle.

Les rapports sont générés dans `tests/security/results/` et sont volontairement exclus du suivi Git.

Le dépôt actuel ne contient pas le script auxiliaire `tests/security/test-upload-security.sh`, appelé par `run-full-security-suite.sh`. Le script complet nécessite donc la restauration de ce fichier auxiliaire ou la désactivation de la phase de test des téléversements avant de pouvoir s'exécuter correctement.

Le test SSRF autonome disponible est `tests/security/test-ssrf.sh`.

Exécuter tous les tests actifs uniquement sur des systèmes dont vous êtes propriétaire ou pour lesquels vous disposez d'une autorisation explicite d'évaluation.

## Supervision et reporting

Les services exposent des métriques compatibles avec Prometheus.

Les ressources de supervision Kubernetes se trouvent dans `monitoring/prometheus/` :

- `servicemonitor-microservices.yaml` permet la découverte des services à superviser.
- `alert-rules.yaml` définit les alertes liées aux échecs d'authentification, aux boucles de redémarrage des conteneurs (CrashLoop) et à l'indisponibilité des services.

Les scripts d'intégration DefectDojo se trouvent dans `monitoring/defectdojo/`.

Configurer les paramètres locaux de DefectDojo en dehors de Git, puis importer les rapports générés par Bandit, Semgrep, Trivy et ZAP :

```bash
./monitoring/defectdojo/import-reports.sh
```

## Structure du dépôt

```text
.
├── .github/workflows/       Pipeline CI/CD
├── docker-compose.yml       Environnement local multi-conteneurs
├── gateway/                 Configuration NGINX
├── helm/                    Charts Helm Kubernetes
├── kyverno/                 Politiques de sécurité des images et des workloads
├── monitoring/              Intégration Prometheus, Grafana et DefectDojo
├── openshift/               Manifestes spécifiques à OpenShift
├── services/
│   ├── auth-service/        Service d'authentification FastAPI
│   ├── app-service/         Service applicatif FastAPI
│   ├── file-service/        Service de téléversement FastAPI
│   └── file-service-go/     Service de gestion des fichiers Go/Gin avec MinIO
├── tests/security/          Scripts de tests de sécurité et rapports générés
└── falco/                   Règles de sécurité à l'exécution
```

## Directives de développement

- Ne jamais commiter de fichiers `.env`, d'identifiants, de clés privées de signature, de certificats ou de rapports de sécurité générés.
- Conserver les dépendances spécifiques à chaque service dans son répertoire correspondant.
- Valider les modifications Helm avec `helm lint` et `helm template`.
- Exécuter les contrôles de sécurité appropriés après toute modification de l'authentification, des autorisations, de la gestion des fichiers, des règles de la passerelle ou des politiques de déploiement.
- Utiliser des tags d'images immuables et une gestion externe des secrets pour les déploiements en production.

## Licence

Aucun fichier de licence n'est actuellement inclus dans ce dépôt.Ajouter une licence avant de distribuer le projet.