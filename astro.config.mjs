import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://ramzibenromdhane.me",
  integrations: [sitemap()],
  // Aucune feuille de style en ligne : permet une CSP avec style-src 'self' seul.
  build: { inlineStylesheets: "never" },
  // Pas de coloration syntaxique : Shiki injecte des attributs style en ligne, bloqués par la CSP.
  markdown: { syntaxHighlight: false },
  devToolbar: { enabled: false },
});
