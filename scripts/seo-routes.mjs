import { build } from "esbuild";

export const SITE_ORIGIN = "https://www.leylaayar.com";
export const ROBOTS = "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1";

export const HOME_METADATA = {
  path: "/",
  title: "Bahçeşehir Fizyoterapist | Klinik Pilates ve Rehabilitasyon — Leyla Ayar",
  description: "Bahçeşehir’de Uzman Fizyoterapist Leyla Ayar ile klinik pilates, fizyoterapi, ortopedik rehabilitasyon, omurga sağlığı ve taban analizi. Randevu: 0534 307 00 48.",
};

const STATIC_ROUTES = [
  {
    path: "/blog",
    title: "Blog | Fizyoterapi, Klinik Pilates, Ortez Protez & Rehabilitasyon — Uzman Fizyoterapist Leyla Ayar Bahçeşehir",
    description: "Bahçeşehir fizyoterapi ve klinik pilates yazıları; ortez, protez, FootBalance tabanlık ve SGK başvuru rehberleri.",
  },
  {
    path: "/kvkk",
    title: "KVKK Aydınlatma Metni | Leyla Ayar",
    description: "Leyla Ayar KVKK aydınlatma metni; kişisel verilerin işlenmesi, korunması ve veri sahibi hakları hakkında bilgiler.",
  },
  {
    path: "/gizlilik-politikasi",
    title: "Gizlilik Politikası | Leyla Ayar",
    description: "Leyla Ayar web sitesi gizlilik politikası; toplanan bilgiler, kullanım amaçları, veri güvenliği ve kullanıcı hakları.",
  },
  {
    path: "/cerez-politikasi",
    title: "Çerez Politikası | Leyla Ayar",
    description: "Leyla Ayar web sitesinde kullanılan çerezler, kullanım amaçları ve çerez tercihlerinizi yönetme seçenekleri.",
  },
  {
    path: "/kullanim-kosullari",
    title: "Kullanım Koşulları | Leyla Ayar",
    description: "Leyla Ayar web sitesi kullanım koşulları, içerik sorumluluğu, fikri mülkiyet ve hizmet kapsamı hakkında bilgiler.",
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
    title: `${post.title} | Uzman Fizyoterapist Leyla Ayar Bahçeşehir`,
    description: post.metaDescription,
    keywords: post.keywords,
    type: "article",
    post,
  }));

  return [HOME_METADATA, ...STATIC_ROUTES, ...blogRoutes].map((route) => ({
    ...route,
    canonical: canonicalFor(route.path),
    robots: ROBOTS,
  }));
}
