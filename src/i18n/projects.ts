import { getCollection, type CollectionEntry } from "astro:content";
import type { Lang } from "./ui";

export type Project = CollectionEntry<"projects">;
// Les fichiers sous src/content/projects/en/ sont en anglais ; tous les autres sont en français.
export const slugOf = (p: Project) => p.id.replace(/^(fr|en)\//, "");
export const langOf = (p: Project): Lang => (p.id.startsWith("en/") ? "en" : "fr");

// Liste des projets dans une langue ; sans traduction, on retombe sur la version française (fallback = true).
export async function getProjects(lang: Lang, onlyFeatured = false) {
  const all = await getCollection("projects", ({ data }) => !data.draft && (!onlyFeatured || data.featured));
  const bySlug = new Map<string, Partial<Record<Lang, Project>>>();
  for (const p of all) bySlug.set(slugOf(p), { ...bySlug.get(slugOf(p)), [langOf(p)]: p });
  return [...bySlug.entries()]
    .map(([slug, v]) => {
      const entry = (v[lang] ?? v.fr ?? v.en) as Project;
      return { slug, entry, fallback: langOf(entry) !== lang };
    })
    .sort((a, b) => a.entry.data.order - b.entry.data.order);
}
