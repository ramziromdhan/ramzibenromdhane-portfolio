import { site, gates, skills, timeline, certifications, otherProjects } from "../data/site";
import { hero as heroFr } from "../data/hero";
import { siteEn, heroEn, gatesStopsEn, skillGroupsEn, skillItemsEn, timelineEn } from "../data/en";
import type { Lang } from "./ui";

export function content(lang: Lang) {
  if (lang === "fr") return { site, hero: heroFr, gates, skills, timeline, certifications, otherProjects };
  return {
    site: { ...site, ...siteEn },
    hero: heroEn,
    gates: gates.map((g, i) => ({ ...g, stops: gatesStopsEn[i] ?? g.stops })),
    skills: skills.map((s, i) => ({
      group: skillGroupsEn[i] ?? s.group,
      items: s.items.map((item) => skillItemsEn[item] ?? item),
    })),
    timeline: timelineEn,
    certifications,
    otherProjects,
  };
}
