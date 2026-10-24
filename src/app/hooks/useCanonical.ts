import { useEffect } from "react";

const SITE_ORIGIN = "https://arikanortopedi.com";

function buildUrl(pathname: string): string {
  const normalized = pathname.endsWith("/") && pathname !== "/"
    ? pathname.replace(/\/$/, "")
    : pathname;
  return `${SITE_ORIGIN}${normalized}`;
}

function upsertMeta(selector: string, attr: string, create: () => HTMLMetaElement) {
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = create();
    document.head.appendChild(el);
  }
  el.setAttribute(attr, "");
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

    // canonical
    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = url;

    // og:url
    const ogUrl = upsertMeta('meta[property="og:url"]', "property", () => {
      const m = document.createElement("meta");
      m.setAttribute("property", "og:url");
      return m;
    });
    ogUrl.setAttribute("content", url);

    // twitter:url (optional but kept consistent)
    const twitterUrl = upsertMeta('meta[name="twitter:url"]', "name", () => {
      const m = document.createElement("meta");
      m.setAttribute("name", "twitter:url");
      return m;
    });
    twitterUrl.setAttribute("content", url);
  }, [explicitPath]);
}
