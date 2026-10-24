import { useEffect } from "react";
import { BRAND } from "../brand";
import { BLOG_POSTS } from "../blog/blogData";

const SITE_ORIGIN = "https://www.leylaayar.com";

function buildUrl(pathname: string): string {
  const normalized = pathname.endsWith("/") && pathname !== "/"
    ? pathname.replace(/\/$/, "")
    : pathname;
  return `${SITE_ORIGIN}${normalized}`;
}

function upsertMeta(selector: string, create: () => HTMLMetaElement) {
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = create();
    document.head.appendChild(el);
  }
  // Preserve the identifying name/property attribute of the meta element.
  return el;
}

/**
 * Keeps <link rel="canonical">, og:url and twitter:url in sync with the
 * current route. Call once per page component with the optional explicit path
 * (e.g. blog post slug); omit to derive from window.location.pathname.
 */
export function useCanonical(explicitPath?: string) {
  useEffect(() => {
    const path = explicitPath ?? window.location.pathname;
    const url = buildUrl(path);
    const post = BLOG_POSTS.find(p => `/blog/${p.slug}` === path);
    const title = path === "/" ? BRAND.title : post ? `${post.title} | ${BRAND.name} Bahçeşehir` : undefined;
    const description = path === "/" ? BRAND.description : post?.metaDescription;
    if (title) document.title = title;
    const update = (selector: string, value: string | undefined) => {
      if (value) document.head.querySelector(selector)?.setAttribute("content", value);
    };
    update('meta[name="description"]', description);
    update('meta[property="og:title"]', title);
    update('meta[property="og:description"]', description);
    update('meta[name="twitter:title"]', title);
    update('meta[name="twitter:description"]', description);
    if (post) update('meta[name="keywords"]', post.keywords.join(", "));

    // canonical
    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = url;

    // og:url
    const ogUrl = upsertMeta('meta[property="og:url"]', () => {
      const m = document.createElement("meta");
      m.setAttribute("property", "og:url");
      return m;
    });
    ogUrl.setAttribute("content", url);

    // twitter:url (optional but kept consistent)
    const twitterUrl = upsertMeta('meta[name="twitter:url"]', () => {
      const m = document.createElement("meta");
      m.setAttribute("name", "twitter:url");
      return m;
    });
    twitterUrl.setAttribute("content", url);
  }, [explicitPath]);
}
