export const site = {
  url: "https://ramzibenromdhane.me",
  name: "Ramzi Ben Romdhane",
  title: "Ramzi Ben Romdhane, ingénieur cybersécurité et DevSecOps",
  description:
    "Étudiant ingénieur en cybersécurité à TEK-UP (Tunis). DevSecOps, Kubernetes et détection : projets, architectures et retours d’expérience.",
  headline: "Je sécurise la chaîne de livraison, du commit au runtime.",
  intro:
    "Étudiant ingénieur en cybersécurité et sécurité des réseaux à TEK-UP, à Tunis, diplôme prévu en 2027. Je construis des pipelines DevSecOps sur Kubernetes et OpenShift, et des dispositifs de détection.",
  email: "contact@ramzibenromdhane.me",
  github: "https://github.com/ramziromdhan",
  linkedin: "https://www.linkedin.com/in/ramzi-benromdhan/",
  cv: "CV_Ramzi_Ben_romdhane.pdf",
};

export const about = [
  "Je suis étudiant ingénieur en sécurité des systèmes informatiques et réseaux à TEK-UP, diplôme prévu en 2027. Mon terrain : sécuriser la livraison des applications (DevSecOps) et détecter les attaques (SOC, SIEM, réponse à incident).",
  "Mes projets vont de la signature d’images et du contrôle d’admission sur OpenShift à l’automatisation SOAR avec un LLM local, en passant par l’analyse de malware et les réseaux MPLS.",
  "Je cherche un stage de fin d’études en cybersécurité pour 2027.",
];

export const gates = [
  { tool: "Gitleaks", stops: "les secrets commités dans le dépôt" },
  { tool: "Semgrep et Bandit", stops: "les failles de code, dès l’analyse statique" },
  { tool: "Hadolint", stops: "les Dockerfile mal construits" },
  { tool: "Trivy", stops: "les dépendances et images vulnérables" },
  { tool: "Cosign", stops: "les images non signées" },
  { tool: "Kyverno", stops: "les manifests non conformes, à l’admission" },
  { tool: "Falco", stops: "les comportements suspects, à l’exécution" },
];

export const skills = [
  {
    group: "DevSecOps et CI/CD",
    items: ["GitHub Actions", "GitLab", "DefectDojo", "Gitleaks", "Semgrep", "Bandit", "Trivy", "Hadolint", "Cosign", "Kyverno", "Falco"],
  },
  {
    group: "Cloud et infrastructure",
    items: ["OpenShift", "Kubernetes", "Docker", "Helm", "RBAC", "NetworkPolicies", "VMware", "Proxmox VE"],
  },
  {
    group: "SOC et SIEM",
    items: ["Wazuh", "TheHive", "MISP", "Cortex", "Shuffle", "n8n", "Réponse à incident"],
  },
  {
    group: "Détection et malware",
    items: ["MITRE ATT&CK", "Règles de détection", "Analyse de logs", "CAPEv2", "dnSpy", "Wireshark"],
  },
  {
    group: "Réseaux",
    items: ["MPLS", "OSPF", "BGP", "VRF", "ACL", "AAA", "HSRP", "VLAN"],
  },
  {
    group: "Développement",
    items: ["Python", "C", "Java", "SQL", "JavaScript", "React", "Node.js"],
  },
];

// Du plus récent au plus ancien.
export const timeline = [
  {
    period: "Juin à août 2026",
    title: "Stagiaire DevSecOps",
    org: "LinSoft",
    text: "Conception et déploiement de microservices sur OpenShift, avec un pipeline CI/CD complet sous GitHub Actions : analyse statique, scan des conteneurs, signature des images avec Cosign, politiques Kyverno et détection runtime avec Falco. Plus de 2 500 alertes de sécurité centralisées dans DefectDojo. Déploiement sur OpenShift SNO, sur une infrastructure Proxmox.",
  },
  {
    period: "2024 à 2027",
    title: "Diplôme d’ingénieur en sécurité des systèmes informatiques et réseaux",
    org: "TEK-UP University, Ariana",
    text: "Cycle préparatoire MP à l’IPEIEM, puis spécialisation en cybersécurité et sécurité des réseaux.",
  },
];

export const certifications: { name: string; issuer: string; year?: number; url?: string }[] = [
  {
    name: "Python Essentials 1",
    issuer: "Cisco Networking Academy",
    url: "https://www.credly.com/badges/3c6b226b-4616-4f30-a293-00146eac9d4e/public_url",
  },
  {
    name: "Python Essentials 2",
    issuer: "Cisco Networking Academy",
    url: "https://www.credly.com/badges/7c2b66eb-1081-46d3-83a8-d8223857d6ee/public_url",
  },
  {
    name: "Top 5 % mondial",
    issuer: "TryHackMe",
    url: "https://tryhackme.com/share/capability-score/ramzy.romdhan",
  },
];


// Java, C, PHP, etc. : une ligne par projet, avec le lien GitHub. Vide = section masquée.
export const otherProjects: { title: string; text: string; url?: string }[] = [];