import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { getSeoRoutes } from "./seo-routes.mjs";

const DIST_DIR = "dist";

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function setTitle(html, title) {
  return html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeHtml(title)}</title>`);
}

function setNamedMeta(html, name, content) {
  const tag = `<meta name="${name}" content="${escapeHtml(content)}" />`;
  const pattern = new RegExp(`<meta\\s+name=["']${name}["'][^>]*>`, "i");
  return pattern.test(html) ? html.replace(pattern, tag) : html.replace("</head>", `    ${tag}\n  </head>`);
}

function setPropertyMeta(html, property, content) {
  const tag = `<meta property="${property}" content="${escapeHtml(content)}" />`;
  const pattern = new RegExp(`<meta\\s+property=["']${property}["'][^>]*>`, "i");
  return pattern.test(html) ? html.replace(pattern, tag) : html.replace("</head>", `    ${tag}\n  </head>`);
}

function setCanonical(html, canonical) {
  const tag = `<link rel="canonical" href="${escapeHtml(canonical)}" />`;
  const pattern = /<link\s+rel=["']canonical["'][^>]*>/i;
  return pattern.test(html) ? html.replace(pattern, tag) : html.replace("</head>", `    ${tag}\n  </head>`);
}

function renderMetadata(template, route) {
  let html = setTitle(template, route.title);
  html = setNamedMeta(html, "description", route.description);
  html = setNamedMeta(html, "robots", route.robots);
  html = setCanonical(html, route.canonical);
  html = setPropertyMeta(html, "og:type", route.type ?? "website");
  html = setPropertyMeta(html, "og:title", route.title);
  html = setPropertyMeta(html, "og:description", route.description);
  html = setPropertyMeta(html, "og:url", route.canonical);
  html = setNamedMeta(html, "twitter:title", route.title);
  html = setNamedMeta(html, "twitter:description", route.description);
  html = setNamedMeta(html, "twitter:url", route.canonical);
  return html;
}

function outputPath(routePath) {
  return routePath === "/"
    ? join(DIST_DIR, "index.html")
    : join(DIST_DIR, routePath.slice(1), "index.html");
}

const template = await readFile(join(DIST_DIR, "index.html"), "utf8");
const routes = await getSeoRoutes();

for (const route of routes) {
  const destination = outputPath(route.path);
  await mkdir(dirname(destination), { recursive: true });
  await writeFile(destination, renderMetadata(template, route), "utf8");
}

console.log(`Prerendered ${routes.length} route-specific HTML files.`);
