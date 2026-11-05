export const languages = { fr: "Français", en: "English" } as const;
export type Lang = keyof typeof languages;

export const routes = {
  fr: { home: "/", projects: "/projets", project: (slug: string) => `/projets/${slug}` },
  en: { home: "/en/", projects: "/en/projects", project: (slug: string) => `/en/projects/${slug}` },
};

export const ui = {
  fr: {
    htmlLang: "fr", ogLocale: "fr_FR", skip: "Aller au contenu", mainNav: "Principal", langLabel: "Langue",
    menu: "Menu", closeMenu: "Fermer le menu",
    nav: { projects: "Projets", skills: "Compétences", background: "Parcours", contact: "Contact" },
    theme: "Basculer entre thème clair et thème sombre",
    footer: "Site statique Astro, hébergé sur Cloudflare Pages.",
    howBuilt: "Comment ce site est construit",
    blocks: "Bloque",
    jobTitle: "Étudiant ingénieur en cybersécurité",
    home: {
      portraitAlt: (n: string) => `Portrait de ${n}`,
      viewProjects: "Voir les projets", contactMe: "Me contacter", downloadCv: "Télécharger le CV",
      readCase: "Lire l’étude de cas du pipeline", projects: "Projets", allProjects: "Tous les projets",
      skills: "Compétences", background: "Parcours", certifications: "Certifications", contact: "Contact",
      contactLead: "Un projet, une mission ou un stage de fin d’études à discuter ? Écris-moi.",
    },
    projects: {
      title: "Projets", other: "Autres projets",
      lead: "Les études de cas suivent le même plan : contexte, architecture, décisions de sécurité, résultats et leçons apprises.",
      description: "Études de cas DevSecOps, détection et sécurité : contexte, architecture, décisions et résultats.",
    },
    project: { back: "Tous les projets", year: "Année", status: "Statut", role: "Rôle", code: "Code", demo: "Démo", repo: "Dépôt GitHub", viewDemo: "Voir la démo", fallbackTitle: "Disponible en français" },
    status: { ongoing: "En cours", done: "Terminé" },
  },
  en: {
    htmlLang: "en", ogLocale: "en_US", skip: "Skip to content", mainNav: "Main", langLabel: "Language",
    menu: "Menu", closeMenu: "Close menu",
    nav: { projects: "Projects", skills: "Skills", background: "Background", contact: "Contact" },
    theme: "Switch between light and dark theme",
    footer: "Static Astro site hosted on Cloudflare Pages.",
    howBuilt: "How this site is built",
    blocks: "Blocks",
    jobTitle: "Cybersecurity engineering student",
    home: {
      portraitAlt: (n: string) => `Portrait of ${n}`,
      viewProjects: "View projects", contactMe: "Contact me", downloadCv: "Download CV",
      readCase: "Read the pipeline case study", projects: "Projects", allProjects: "All projects",
      skills: "Skills", background: "Background", certifications: "Certifications", contact: "Contact",
      contactLead: "A project, an assignment or an end-of-studies internship to discuss? Get in touch.",
    },
    projects: {
      title: "Projects", other: "Other projects",
      lead: "Case studies follow the same outline: context, architecture, security decisions, results and lessons learned.",
      description: "DevSecOps, detection and security case studies: context, architecture, decisions and results.",
    },
    project: { back: "All projects", year: "Year", status: "Status", role: "Role", code: "Code", demo: "Demo", repo: "GitHub repository", viewDemo: "View the demo", fallbackTitle: "Available in French" },
    status: { ongoing: "Ongoing", done: "Completed" },
  },
};

export function statusLabel(lang: Lang, value: string) {
  const v = value.toLowerCase();
  if (["en cours", "ongoing", "in progress"].includes(v)) return ui[lang].status.ongoing;
  if (["terminé", "termine", "done", "completed"].includes(v)) return ui[lang].status.done;
  return value;
}
