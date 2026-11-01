import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const projects = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/projects" }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    year: z.number(),
    status: z.enum(["En cours", "Terminé"]),
    role: z.string().optional(),
    tags: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
    order: z.number().default(99),
    draft: z.boolean().default(false),
    repo: z.string().url().optional(),
    demo: z.string().url().optional(),
  }),
});

export const collections = { projects };
