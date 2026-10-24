import { mkdir, readFile, writeFile, rm } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { build } from "esbuild";
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
  return html.replace(
    /<title>[\s\S]*?<\/title>/i,
    `<title>${escapeHtml(title)}</title>`,
  );
}

function setNamedMeta(html, name, content) {
  const tag = `<meta name="${name}" content="${escapeHtml(content)}" />`;
  const pattern = new RegExp(`<meta\\s+name=["']${name}["'][^>]*>`, "i");
  return pattern.test(html)
    ? html.replace(pattern, tag)
    : html.replace("</head>", `    ${tag}\n  </head>`);
}

function setPropertyMeta(html, property, content) {
  const tag = `<meta property="${property}" content="${escapeHtml(content)}" />`;
  const pattern = new RegExp(
    `<meta\\s+property=["']${property}["'][^>]*>`,
    "i",
  );
  return pattern.test(html)
    ? html.replace(pattern, tag)
    : html.replace("</head>", `    ${tag}\n  </head>`);
}

function setCanonical(html, canonical) {
  const tag = `<link rel="canonical" href="${escapeHtml(canonical)}" />`;
  const pattern = /<link\s+rel=["']canonical["'][^>]*>/i;
  return pattern.test(html)
    ? html.replace(pattern, tag)
    : html.replace("</head>", `    ${tag}\n  </head>`);
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
  if (route.keywords)
    html = setNamedMeta(html, "keywords", route.keywords.join(", "));
  if (route.post) {
    const schema = {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: route.post.title,
      description: route.description,
      author: { "@type": "Organization", name: route.post.author },
      publisher: {
        "@type": "Organization",
        name: "Uzman Fizyoterapist Leyla Ayar",
        url: "https://www.leylaayar.com",
      },
      datePublished: route.post.publishedAt,
      dateModified: route.post.updatedAt ?? route.post.publishedAt,
      mainEntityOfPage: route.canonical,
      inLanguage: "tr",
      keywords: route.post.keywords.join(", "),
    };
    html = html.replace(
      "</head>",
      `<script id="article-schema" type="application/ld+json">${JSON.stringify(schema).replaceAll("<", "\\u003c")}</script></head>`,
    );
  }
  return html;
}

function outputPath(routePath) {
  return routePath === "/"
    ? join(DIST_DIR, "index.html")
    : join(DIST_DIR, routePath.slice(1), "index.html");
}

const template = await readFile(join(DIST_DIR, "index.html"), "utf8");
const routes = await getSeoRoutes();

const ssrPath = resolve("node_modules/.cache/leyla-prerender.mjs");
await build({
  entryPoints: ["scripts/render-pages.tsx"],
  outfile: ssrPath,
  bundle: true,
  platform: "node",
  format: "esm",
  packages: "external",
  jsx: "automatic",
  logLevel: "silent",
});
const { renderPage } = await import(pathToFileURL(ssrPath).href);

for (const route of routes) {
  const destination = outputPath(route.path);
  await mkdir(dirname(destination), { recursive: true });
  const html = renderMetadata(template, route).replace(
    '<div id="root"></div>',
    `<div id="root">${renderPage(route.path)}</div>`,
  );
  await writeFile(destination, html, "utf8");
}

console.log(`Prerendered ${routes.length} route-specific HTML files.`);

await rm(ssrPath);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${routes.map((r) => `  <url><loc>${escapeHtml(r.canonical)}</loc></url>`).join("\n")}\n</urlset>\n`;
await writeFile(join(DIST_DIR, "sitemap.xml"), sitemap);
await writeFile("public/sitemap.xml", sitemap);
