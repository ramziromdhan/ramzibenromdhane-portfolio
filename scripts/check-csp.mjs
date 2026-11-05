// Vérifie que la sortie compilée (dist/) respecte la CSP définie dans public/_headers.
// Usage : npm run build && node scripts/check-csp.mjs      (aucune dépendance)
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, extname } from "node:path";

const DIST = "dist";
const files = [];
(function walk(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    statSync(p).isDirectory() ? walk(p) : files.push(p);
  }
})(DIST);

const problems = [];
const add = (file, msg) => problems.push(`${file} : ${msg}`);
const isExternal = (u) => /^(https?:)?\/\//i.test(u);

for (const f of files) {
  const ext = extname(f);
  if (ext === ".html") {
    const html = readFileSync(f, "utf8");
    if (/<style[\s>]/i.test(html)) add(f, "balise <style> en ligne (style-src)");
    if (/\sstyle\s*=\s*["']/i.test(html)) add(f, "attribut style en ligne (style-src)");
    if (/\son[a-z]+\s*=\s*["']/i.test(html)) add(f, "gestionnaire d’événement en ligne (script-src)");
    if (/(href|src|action)\s*=\s*["']\s*javascript:/i.test(html)) add(f, "URL javascript: (script-src)");
    for (const m of html.matchAll(/<script\b([^>]*)>/gi)) {
      const attrs = m[1];
      const type = /type\s*=\s*["']([^"']+)["']/i.exec(attrs)?.[1] ?? "";
      const src = /src\s*=\s*["']([^"']+)["']/i.exec(attrs)?.[1];
      if (src) { if (isExternal(src)) add(f, `script externe ${src} (script-src)`); }
      else if (!/json/i.test(type)) add(f, "script en ligne exécutable (script-src)");
    }
    for (const m of html.matchAll(/<(link|img|iframe|form|source|video|audio|embed|object)\b([^>]*)>/gi)) {
      const tag = m[1].toLowerCase(), attrs = m[2];
      const rel = /rel\s*=\s*["']([^"']+)["']/i.exec(attrs)?.[1] ?? "";
      if (tag === "link" && !/(stylesheet|preload|modulepreload|icon)/i.test(rel)) continue; // canonical, alternate, sitemap : pas des ressources
      const url = /(?:href|src|action)\s*=\s*["']([^"']+)["']/i.exec(attrs)?.[1];
      if (url && isExternal(url)) add(f, `ressource externe <${tag}> ${url}`);
      if (tag === "iframe" || tag === "embed" || tag === "object") add(f, `<${tag}> (frame-src / object-src)`);
    }
  } else if (ext === ".css") {
    const css = readFileSync(f, "utf8");
    if (/@import/i.test(css)) add(f, "@import (risque de ressource externe)");
    for (const m of css.matchAll(/url\(\s*["']?([^)"']+)["']?\s*\)/gi)) {
      const u = m[1];
      if (isExternal(u)) add(f, `url() externe ${u}`);
      if (/^data:(?!image\/)/i.test(u)) add(f, "url(data:) hors image (font-src / img-src)");
    }
  }
}

const headers = readFileSync("public/_headers", "utf8");
const csp = /Content-Security-Policy:\s*(.+)/i.exec(headers)?.[1] ?? "(absente)";
console.log(`CSP de public/_headers : ${csp}\n`);
console.log(`${files.length} fichiers analysés dans ${DIST}/`);
if (problems.length) {
  console.error(`\n${problems.length} violation(s) :`);
  for (const p of problems) console.error(` - ${p}`);
  process.exit(1);
}
console.log("OK : aucune violation de la CSP détectée.");
