import { build } from "esbuild";

export const SITE_ORIGIN = "https://arikanortopedi.com";
export const ROBOTS = "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1";

export const HOME_METADATA = {
  path: "/",
  title: "Arıkan Ortopedi - Ortez & Protez | Kütahya SGK Anlaşmalı Ortez Protez Merkezi",
  description: "Kütahya Arıkan Ortopedi - Ortez & Protez ile SGK anlaşmalı ortez, protez ve ayak sağlığı çözümleri. Kişiye özel hizmetler ve ücretsiz ön değerlendirme. 0274 600 03 43",
};

const STATIC_ROUTES = [
  {
    path: "/blog",
    title: "Blog | Ortez Protez & Rehabilitasyon — Arıkan Ortopedi - Ortez & Protez Kütahya",
    description: "Ortez, protez, FootBalance tabanlık, SGK kapsamı ve rehabilitasyon hakkında uzman blog yazıları. Kütahya Arıkan Ortopedi - Ortez & Protez Merkezi.",
  },
  {
    path: "/kvkk",
    title: "KVKK Aydınlatma Metni | Arıkan Ortopedi",
    description: "Arıkan Ortopedi KVKK aydınlatma metni; kişisel verilerin işlenmesi, korunması ve veri sahibi hakları hakkında bilgiler.",
  },
  {
    path: "/gizlilik-politikasi",
    title: "Gizlilik Politikası | Arıkan Ortopedi",
    description: "Arıkan Ortopedi web sitesi gizlilik politikası; toplanan bilgiler, kullanım amaçları, veri güvenliği ve kullanıcı hakları.",
  },
  {
    path: "/cerez-politikasi",
    title: "Çerez Politikası | Arıkan Ortopedi",
    description: "Arıkan Ortopedi web sitesinde kullanılan çerezler, kullanım amaçları ve çerez tercihlerinizi yönetme seçenekleri.",
  },
  {
    path: "/kullanim-kosullari",
    title: "Kullanım Koşulları | Arıkan Ortopedi",
    description: "Arıkan Ortopedi web sitesi kullanım koşulları, içerik sorumluluğu, fikri mülkiyet ve hizmet kapsamı hakkında bilgiler.",
  },
];

export function canonicalFor(path) {
  if (path === "/") return `${SITE_ORIGIN}/`;
  return `${SITE_ORIGIN}${path.replace(/\/$/, "")}`;
}

export async function loadBlogPosts() {
  const result = await build({
    entryPoints: ["src/app/blog/blogData.ts"],
    bundle: true,
    format: "esm",
    platform: "node",
    write: false,
    logLevel: "silent",
  });
  const source = result.outputFiles[0].text;
  const moduleUrl = `data:text/javascript;base64,${Buffer.from(source).toString("base64")}`;
  const { BLOG_POSTS } = await import(moduleUrl);
  return BLOG_POSTS;
}

export async function getSeoRoutes() {
  const posts = await loadBlogPosts();
  const blogRoutes = posts.map((post) => ({
    path: `/blog/${post.slug}`,
    title: `${post.title} | Arıkan Ortopedi - Ortez & Protez Kütahya`,
    description: post.metaDescription,
    type: "article",
    post,
  }));

  return [HOME_METADATA, ...STATIC_ROUTES, ...blogRoutes].map((route) => ({
    ...route,
    canonical: canonicalFor(route.path),
    robots: ROBOTS,
  }));
}
