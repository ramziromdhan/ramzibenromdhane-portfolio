import type { IconName } from "./icons";

// Badges autour de la photo et outils de la barre technologique.
export const homeExtras = {
  fr: {
    badges: [
      { icon: "shield-check", label: "DevSecOps" },
      { icon: "radar", label: "SOC et SIEM" },
      { icon: "cloud", label: "Cloud-Native" },
    ] as { icon: IconName; label: string }[],
    techLabel: "Outils et technologies",
  },
  en: {
    badges: [
      { icon: "shield-check", label: "DevSecOps" },
      { icon: "radar", label: "SOC and SIEM" },
      { icon: "cloud", label: "Cloud-Native" },
    ] as { icon: IconName; label: string }[],
    techLabel: "Tools and technologies",
  },
};

export const techbar = [
  "Wazuh", "TheHive", "MISP", "Cortex", "Shuffle", "OPNsense", "T-Pot",
  "Kubernetes", "OpenShift", "GitHub Actions", "Trivy", "Cosign", "Kyverno", "Falco",
];
