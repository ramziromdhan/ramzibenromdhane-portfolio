// Version anglaise du contenu éditable de src/data/site.ts.
// Les correspondances se font par le TEXTE français (nom de l’outil, du groupe, de la compétence) : si un libellé
// français change, mets à jour sa clé ici ; sans correspondance, le texte français est affiché.
export const siteEn = {
  title: "Ramzi Ben Romdhane, cybersecurity and DevSecOps engineer",
  description: "Cybersecurity engineering student at TEK-UP (Tunis). DevSecOps, Kubernetes and detection: projects, architectures and lessons learned.",
  headline: "I secure the delivery chain, from commit to runtime.",
};

export const heroEn = {
  monogram: "RB",
  availability: "Looking for a cybersecurity end-of-studies internship for 2027",
  role: "DevSecOps, Cloud-Native Security and SOC",
  bio: "Fifth-year cybersecurity and network engineering student at TEK-UP, in Tunis (graduating in 2027). I secure software delivery on Kubernetes and OpenShift, from the CI/CD pipeline to runtime, and I build detection systems for the SOC.",
};

export const gateToolsEn: Record<string, string> = {
  "Semgrep et Bandit": "Semgrep and Bandit",
};

export const gatesStopsEn: Record<string, string> = {
  Gitleaks: "secrets committed to the repository",
  "Semgrep et Bandit": "code flaws, right from static analysis",
  Hadolint: "badly built Dockerfiles",
  Trivy: "vulnerable dependencies and images",
  Cosign: "unsigned images",
  Kyverno: "non-compliant manifests, at admission",
  Falco: "suspicious behavior, at runtime",
};

export const skillGroupsEn: Record<string, string> = {
  "DevSecOps et CI/CD": "DevSecOps and CI/CD",
  "Cloud et infrastructure": "Cloud and infrastructure",
  "SOC et SIEM": "SOC and SIEM",
  "Détection et malware": "Detection and malware",
  Réseaux: "Networking",
  Développement: "Development",
};

export const skillItemsEn: Record<string, string> = {
  "Réponse à incident": "Incident response",
  "Règles de détection": "Detection rules",
  "Analyse de logs": "Log analysis",
  "Règles de corrélation": "Correlation rules",
  "Analyse de malware": "Malware analysis",
};

export const timelineEn = [
  {
    period: "June to August 2026",
    title: "DevSecOps Intern",
    org: "LinSoft",
    text: "Design and deployment of microservices on OpenShift, with a full CI/CD pipeline on GitHub Actions: static analysis, container scanning, image signing with Cosign, Kyverno policies and runtime detection with Falco. More than 2,500 security alerts centralized in DefectDojo. Deployed on OpenShift SNO, on a Proxmox infrastructure.",
  },
  {
    period: "2024 to 2027",
    title: "Engineering degree in Computer Systems and Network Security",
    org: "TEK-UP University, Ariana",
    text: "Preparatory cycle (MP) at IPEIEM, then a specialization in cybersecurity and network security.",
  },
];
