import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { getSeoRoutes, SITE_ORIGIN } from "./seo-routes.mjs";

const DIST_DIR = "dist";

function outputPath(routePath) {
  return routePath === "/"
    ? join(DIST_DIR, "index.html")
    : join(DIST_DIR, routePath.slice(1), "index.html");
}

function decodeHtml(value) {
  return value
    .replaceAll("&quot;", '"')
    .replaceAll("&gt;", ">")
    .replaceAll("&lt;", "<")
    .replaceAll("&amp;", "&");
}

function extract(html, pattern, label, routePath) {
  const match = html.match(pattern);
  if (!match) throw new Error(`${routePath}: ${label} bulunamadı.`);
  return decodeHtml(match[1]);
}

const sitemap = await readFile(join(DIST_DIR, "sitemap.xml"), "utf8");
const sitemapPaths = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => {
  const url = new URL(match[1]);
  if (url.origin !== SITE_ORIGIN) throw new Error(`Sitemap farklı domain içeriyor: ${url.href}`);
  return url.pathname === "/" ? "/" : url.pathname.replace(/\/$/, "");
});

const routes = await getSeoRoutes();
const routeByPath = new Map(routes.map((route) => [route.path, route]));
const missingMetadata = sitemapPaths.filter((path) => !routeByPath.has(path));
if (missingMetadata.length) throw new Error(`Metadata tanımı eksik sitemap yolları: ${missingMetadata.join(", ")}`);

const blogTitles = new Set();
for (const path of sitemapPaths) {
  const route = routeByPath.get(path);
  const html = await readFile(outputPath(path), "utf8");
  const title = extract(html, /<title>([\s\S]*?)<\/title>/i, "title", path);
  const description = extract(html, /<meta\s+name="description"\s+content="([^"]*)"\s*\/?\s*>/i, "description", path);
  const canonical = extract(html, /<link\s+rel="canonical"\s+href="([^"]+)"\s*\/?\s*>/i, "canonical", path);
  const robots = extract(html, /<meta\s+name="robots"\s+content="([^"]*)"\s*\/?\s*>/i, "robots", path);
  const ogTitle = extract(html, /<meta\s+property="og:title"\s+content="([^"]*)"\s*\/?\s*>/i, "og:title", path);
  const ogDescription = extract(html, /<meta\s+property="og:description"\s+content="([^"]*)"\s*\/?\s*>/i, "og:description", path);
  const ogUrl = extract(html, /<meta\s+property="og:url"\s+content="([^"]*)"\s*\/?\s*>/i, "og:url", path);
  const twitterTitle = extract(html, /<meta\s+name="twitter:title"\s+content="([^"]*)"\s*\/?\s*>/i, "twitter:title", path);
  const twitterDescription = extract(html, /<meta\s+name="twitter:description"\s+content="([^"]*)"\s*\/?\s*>/i, "twitter:description", path);

  if (title !== route.title) throw new Error(`${path}: title metadata ile eşleşmiyor.`);
  if (description !== route.description) throw new Error(`${path}: meta description kaynak veriyle eşleşmiyor.`);
  if (canonical !== route.canonical) throw new Error(`${path}: canonical hatalı: ${canonical}`);
  if (robots !== route.robots) throw new Error(`${path}: robots metadata hatalı.`);
  if (ogTitle !== route.title || twitterTitle !== route.title) throw new Error(`${path}: sosyal medya title metadata hatalı.`);
  if (ogDescription !== route.description || twitterDescription !== route.description) throw new Error(`${path}: sosyal medya description metadata hatalı.`);
  if (ogUrl !== route.canonical) throw new Error(`${path}: og:url canonical ile eşleşmiyor.`);
  if (canonical.includes("arikan.ugurdogan.net")) throw new Error(`${path}: canonical eski domain içeriyor.`);
  if (path.startsWith("/blog/")) {
    if (blogTitles.has(title)) throw new Error(`${path}: blog title benzersiz değil.`);
    blogTitles.add(title);
  }
}

if (sitemapPaths.length !== routes.length) {
  throw new Error(`Sitemap (${sitemapPaths.length}) ile prerender route sayısı (${routes.length}) eşleşmiyor.`);
}

console.log(`SEO verification passed: ${sitemapPaths.length} sitemap route, ${blogTitles.size} unique blog titles.`);

// Brand migration checks cover the deployed HTML, including content without JavaScript.
const home = await readFile(join(DIST_DIR, "index.html"), "utf8");
for (const service of ["Taban Analizi", "Omurga Sağlığı", "Kayroprakti", "Klinik Pilates", "Pilates", "Hamilelik Pilatesi", "Ortopedik Rehabilitasyon", "Diyetisyen"]) {
  if (!home.includes(`>${service}</h3>`)) throw new Error(`Ana sayfada hizmet eksik: ${service}`);
}
for (const keyword of ["ortez protez Bahçeşehir", "SGK anlaşmalı ortez protez", "FootBalance Bahçeşehir", "ortopedik tabanlık Bahçeşehir", "kişiye özel tabanlık", "alt ekstremite protezi", "üst ekstremite protezi", "diz protezi", "biyonik kol"]) {
  if (!home.includes(keyword)) throw new Error(`Korunan SEO kelimesi eksik: ${keyword}`);
}
const knownPaths = new Set(routes.map(r => r.path));
for (const route of routes) {
  const html = await readFile(outputPath(route.path), "utf8");
  if ((html.match(/<h1(?:\s|>)/g) ?? []).length !== 1) throw new Error(`${route.path}: tek bir görünür H1 olmalı.`);
  if (/Arıkan|arikanortopedi\.com|Kütahya|0274 600|0553 666/.test(html)) throw new Error(`${route.path}: eski marka bilgisi kaldı.`);
  if (!html.includes('id="root"><div')) throw new Error(`${route.path}: sayfa içeriği önceden render edilmemiş.`);
  for (const match of html.matchAll(/href="(\/[^"?#]*)(?:[?#][^"]*)?"/g)) {
    if (match[1].startsWith("//") || /\.[a-z0-9]+$/i.test(match[1])) continue;
    const path = match[1].replace(/\/$/, "") || "/";
    if (!knownPaths.has(path)) throw new Error(`${route.path}: kırık iç bağlantı ${match[1]}`);
  }
  for (const match of html.matchAll(/<img[^>]+src="(\/[^"?]+)"/g)) {
    await readFile(join(DIST_DIR, match[1]));
  }
}
console.log("Brand verification passed: 8 services, preserved SEO terms, rendered content, internal links and local images.");
