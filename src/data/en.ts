// Version anglaise du contenu éditable de src/data/site.ts (les listes sont alignées par position).
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

export const gatesStopsEn = [
  "secrets committed to the repository",
  "badly built Dockerfiles",
  "vulnerable dependencies and images",
  "unsigned images",
  "non-compliant manifests, at admission",
  "suspicious behavior, at runtime",
];

export const skillGroupsEn = ["DevSecOps and CI/CD", "Cloud and infrastructure", "SOC and SIEM", "Detection and malware", "Networking", "Development"];
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
    text: "Full CI/CD pipeline on GitHub Actions for microservices on OpenShift: static analysis, container scanning, image signing with Cosign, and Kyverno and Falco policies. Deployed on OpenShift SNO over a Proxmox infrastructure.",
  },
  {
    period: "2024 to 2027",
    title: "Engineering degree in Computer Systems and Network Security",
    org: "TEK-UP University, Ariana",
    text: "Preparatory cycle (MP) at IPEIEM, then a specialization in cybersecurity and network security.",
  },
];
