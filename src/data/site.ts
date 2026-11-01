// Tout le contenu éditable du site est ici. Laisse une chaîne vide pour masquer un lien.
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
  cv: "/Ramzi_Ben_Romdhane_CV.pdf",
};

export const gates = [
  { tool: "Gitleaks", stops: "les secrets commités dans le dépôt" },
  { tool: "Hadolint", stops: "les Dockerfile mal construits" },
  { tool: "Trivy", stops: "les dépendances et images vulnérables" },
  { tool: "Cosign", stops: "les images non signées" },
  { tool: "Kyverno", stops: "les manifests non conformes, à l’admission" },
  { tool: "Falco", stops: "les comportements suspects, à l’exécution" },
];

export const skills = [
  { group: "Pipeline DevSecOps", items: ["Gitleaks", "Hadolint", "Trivy", "Cosign", "Kyverno", "Falco"] },
  { group: "Conteneurs et orchestration", items: ["Docker", "Kubernetes", "k3s", "OpenShift"] },
  { group: "Détection et SOC", items: ["Wazuh", "SIEM / SOAR", "Règles de corrélation", "Analyse de malware"] },
  { group: "Infrastructure et cloud", items: ["Proxmox VE", "AWS", "Cloudflare", "Tailscale"] },
];

// Du plus récent au plus ancien. Ajoute ici tes autres expériences.
export const timeline = [
  {
    period: "2027 (prévu)",
    title: "Diplôme d’ingénieur en cybersécurité et sécurité des réseaux",
    org: "TEK-UP University, Tunis",
    text: "Spécialisation SSIR. Projets académiques : SIEM Wazuh conforme ISO 27001, sécurité cloud sur AWS, renseignement sur les menaces.",
  },
  {
    period: "2026",
    title: "Stagiaire DevSecOps",
    org: "LinSoft, Tunis",
    text: "Hébergement d’applications sur clusters avec automatisation et Kubernetes. Pipeline DevSecOps de référence, migré de k3s vers OpenShift.",
  },
];

// Ajoute tes certifications : la section apparaît dès que la liste n’est pas vide.
export const certifications: { name: string; issuer: string; year: number; url?: string }[] = [];
