import { useEffect, useState, useRef } from "react";
import { Link, useParams, Navigate } from "react-router";
import { Clock, Tag, ChevronRight, Phone, MessageCircle, ArrowUp, Calendar, User } from "lucide-react";
import { getPostBySlug, getRelatedPosts } from "./blogData";
import { useCanonical } from "../hooks/useCanonical";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" });
}

function renderContent(text: string) {
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  const parts: (string | React.ReactNode)[] = [];
  let lastIndex = 0;
  let match;

  while ((match = linkRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    parts.push(
      <a
        key={match.index}
        href={match[2]}
        target={match[2].startsWith("http") ? "_blank" : undefined}
        rel={match[2].startsWith("http") ? "noopener noreferrer" : undefined}
        className="font-semibold hover:underline"
        style={{ color: "#0AADA8" }}
      >
        {match[1]}
      </a>
    );
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts.length > 0 ? parts : text;
}

function ReadingProgress() {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const scrolled = el.scrollTop;
      const total = el.scrollHeight - el.clientHeight;
      setPct(total > 0 ? Math.min(100, (scrolled / total) * 100) : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div className="fixed top-0 left-0 right-0 z-[100] h-1" style={{ background: "rgba(0,0,0,0.08)" }}>
      <div className="h-full transition-all duration-100" style={{ width: `${pct}%`, background: "linear-gradient(90deg,#123B6D,#0AADA8)" }} />
    </div>
  );
}

function TableOfContents({ sections, activeId, compact = false }: { sections: { id: string; heading: string; level: number }[]; activeId: string; compact?: boolean }) {
  const h2s = sections.filter((s) => s.level === 2);
  return (
    <nav aria-label="İçindekiler">
      <p className={`text-xs font-black uppercase tracking-widest text-muted-foreground ${compact ? "mb-2" : "mb-4"}`}>İçindekiler</p>
      <ol className={compact ? "space-y-0.5" : "space-y-1"}>
        {h2s.map((s, i) => (
          <li key={s.id}>
            <a
              href={`#${s.id}`}
              className={`flex items-start rounded-lg transition-all duration-150 ${compact ? "gap-1.5 px-1.5 py-0.5 text-xs leading-4" : "gap-2 px-2 py-1.5 text-sm"}`}
              style={
                activeId === s.id
                  ? { color: "#0AADA8", fontWeight: 700, background: "rgba(10,173,168,0.08)" }
                  : { color: "#555", fontWeight: 500 }
              }
            >
              <span className={`shrink-0 rounded-full flex items-center justify-center font-black mt-0.5 ${compact ? "w-4 h-4 text-[9px]" : "w-5 h-5 text-[10px]"}`}
                style={{ background: activeId === s.id ? "#0AADA8" : "#e5e7eb", color: activeId === s.id ? "#fff" : "#555" }}>
                {i + 1}
              </span>
              {s.heading}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getPostBySlug(slug) : undefined;
  const related = post ? getRelatedPosts(post) : [];

  const [activeId, setActiveId] = useState("");
  const [showBack, setShowBack] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useCanonical(post ? `/blog/${post.slug}` : undefined);

  useEffect(() => {
    if (!post) return;
    window.scrollTo(0, 0);
    document.title = `${post.title} | Arıkan Ortopedi - Ortez & Protez Kütahya`;
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute("content", post.metaDescription);

    // JSON-LD
    const schema = {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: post.title,
      description: post.metaDescription,
      author: { "@type": "Organization", name: post.author },
      publisher: {
        "@type": "LocalBusiness",
        name: "Arıkan Ortopedi - Ortez & Protez",
        telephone: ["+90-274-600-03-43", "+90-553-666-03-43", "+90-553-849-90-35"],
        address: {
          "@type": "PostalAddress",
          streetAddress: "Evliya Çelebi Mah. Eken Paşa Cd. No:13/E, Şehir Hastanesi Yanı",
          addressLocality: "Kütahya",
          addressRegion: "Kütahya",
          addressCountry: "TR",
        },
      },
      datePublished: post.publishedAt,
      dateModified: post.updatedAt || post.publishedAt,
      keywords: post.keywords.join(", "),
      inLanguage: "tr",
    };
    let schemaTag = document.getElementById("article-schema");
    if (!schemaTag) {
      schemaTag = document.createElement("script");
      schemaTag.id = "article-schema";
      (schemaTag as HTMLScriptElement).type = "application/ld+json";
      document.head.appendChild(schemaTag);
    }
    schemaTag.textContent = JSON.stringify(schema);

    return () => {
      document.getElementById("article-schema")?.remove();
    };
  }, [post]);

  // Intersection observer for TOC highlight
  useEffect(() => {
    if (!post) return;
    const ids = post.sections.filter((s) => s.level === 2).map((s) => s.id);
    observerRef.current?.disconnect();
    observerRef.current = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: 0 }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observerRef.current!.observe(el);
    });
    return () => observerRef.current?.disconnect();
  }, [post]);

  useEffect(() => {
    const onScroll = () => setShowBack(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!post) return <Navigate to="/blog" replace />;

  const tocItems = post.sections.map((s) => ({ id: s.id, heading: s.heading, level: s.level }));

  return (
    <div className="min-h-screen bg-background">
      <ReadingProgress />

      {/* Header */}
      <header className="sticky top-1 z-50 bg-white/95 border-b border-border backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <img src="/arikan-logo.png" alt="Arıkan Ortopedi - Ortez & Protez" className="h-14 w-auto object-contain" />
          </Link>
          <div className="hidden md:flex items-center gap-3 text-sm text-muted-foreground font-semibold">
            <Link to="/" className="hover:text-primary transition-colors">Ana Sayfa</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link to="/blog" className="hover:text-primary transition-colors">Blog</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-foreground truncate max-w-[200px]">{post.title}</span>
          </div>
          <a href="https://wa.me/905536660343" target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-2 text-white text-sm font-bold px-4 py-2 rounded-xl hover:-translate-y-0.5 transition-all"
            style={{ background: "#25D366" }}>
            <MessageCircle className="w-4 h-4" /> WhatsApp
          </a>
        </div>
      </header>

      {/* Article Hero */}
      <div className="relative py-12 text-white overflow-hidden" style={{ background: `linear-gradient(135deg, ${post.coverColor}f0 0%, ${post.coverColor}aa 100%)` }}>
        <img src={post.coverImage} alt={post.title} className="absolute inset-0 w-full h-full object-cover opacity-25" />
        <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${post.coverColor}f0 0%, ${post.coverColor}cc 100%)` }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb schema */}
          <nav aria-label="Breadcrumb" className="mb-5">
            <ol className="flex items-center gap-2 text-xs text-white/70 font-semibold flex-wrap">
              <li><Link to="/" className="hover:text-white transition-colors">Ana Sayfa</Link></li>
              <li><ChevronRight className="w-3 h-3" /></li>
              <li><Link to="/blog" className="hover:text-white transition-colors">Blog</Link></li>
              <li><ChevronRight className="w-3 h-3" /></li>
              <li className="text-white/90 truncate max-w-[220px]">{post.title}</li>
            </ol>
          </nav>

          <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-5 bg-white/20 text-white border border-white/25">
            <Tag className="w-3 h-3" /> {post.category}
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-[2.6rem] font-black leading-tight mb-5" style={{ fontFamily: "Manrope, sans-serif" }}>
            {post.title}
          </h1>
          <p className="text-lg mb-7 max-w-2xl" style={{ color: "rgba(255,255,255,0.82)" }}>
            {post.excerpt}
          </p>
          <div className="flex flex-wrap items-center gap-5 text-sm text-white/75">
            <span className="flex items-center gap-1.5"><User className="w-4 h-4" /> {post.author}</span>
            <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> {formatDate(post.publishedAt)}</span>
            <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> {post.readingTime} dk okuma</span>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="lg:grid lg:grid-cols-[1fr_300px] lg:gap-12 items-start">

          {/* Article body */}
          <article>
            {/* Mobile TOC */}
            <details className="lg:hidden mb-8 border border-border rounded-2xl overflow-hidden">
              <summary className="px-5 py-4 font-bold text-sm cursor-pointer select-none bg-muted/40">
                İçindekiler
              </summary>
              <div className="px-5 pb-5 pt-3">
                <TableOfContents sections={tocItems} activeId={activeId} />
              </div>
            </details>

            {/* Cover image */}
            <div className="mb-10 rounded-2xl overflow-hidden border border-border shadow-sm">
              <img src={post.coverImage} alt={post.title} className="w-full h-auto object-cover" />
            </div>

            {/* Sections */}
            {post.sections.map((section) => (
              <section key={section.id} id={section.id} className="mb-10 scroll-mt-24">
                {section.level === 2 ? (
                  <h2 className="text-2xl font-extrabold text-foreground mb-4 pb-2 border-b border-border" style={{ fontFamily: "Manrope, sans-serif" }}>
                    {section.heading}
                  </h2>
                ) : (
                  <h3 className="text-xl font-bold text-foreground mb-3" style={{ fontFamily: "Manrope, sans-serif" }}>
                    {section.heading}
                  </h3>
                )}
                {section.content.map((para, i) => (
                  <p key={i} className="text-base leading-[1.85] text-muted-foreground mb-4">
                    {renderContent(para)}
                  </p>
                ))}
              </section>
            ))}

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-8 mb-10">
              {post.tags.map((tag) => (
                <span key={tag} className="text-xs font-bold px-3 py-1.5 rounded-full"
                  style={{ background: "rgba(10,173,168,0.10)", color: "#087a76", border: "1px solid rgba(10,173,168,0.25)" }}>
                  #{tag}
                </span>
              ))}
            </div>

            {/* CTA inline */}
            <div className="rounded-2xl p-8 text-white mb-12" style={{ background: "linear-gradient(135deg, #123B6D 0%, #0AADA8 100%)" }}>
              <h3 className="text-xl font-extrabold mb-2" style={{ fontFamily: "Manrope, sans-serif" }}>
                Ücretsiz Ön Değerlendirme İçin Bize Ulaşın
              </h3>
              <p className="text-sm mb-5" style={{ color: "rgba(255,255,255,0.80)" }}>
                Kütahya merkezimizde uzmanlarımız sorularınızı yanıtlayarak size en uygun çözümü belirler.
              </p>
              <div className="flex flex-wrap gap-3">
                <a href="https://wa.me/905536660343" target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-white font-bold text-sm px-5 py-2.5 rounded-xl hover:-translate-y-0.5 transition-transform"
                  style={{ color: "#123B6D" }}>
                  <MessageCircle className="w-4 h-4" /> WhatsApp ile Randevu
                </a>
                <a href="tel:+902746000343"
                  className="flex items-center gap-2 bg-white/15 border border-white/30 text-white font-bold text-sm px-5 py-2.5 rounded-xl hover:-translate-y-0.5 transition-transform">
                  <Phone className="w-4 h-4" /> 0274 600 03 43
                </a>
              </div>
            </div>

            {/* Related posts */}
            {related.length > 0 && (
              <section>
                <h2 className="text-xl font-extrabold text-foreground mb-6" style={{ fontFamily: "Manrope, sans-serif" }}>
                  İlgili Yazılar
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {related.map((rp) => (
                    <Link key={rp.slug} to={`/blog/${rp.slug}`}
                      className="group bg-white border border-border rounded-2xl p-5 hover:-translate-y-1 hover:shadow-md transition-all duration-300">
                      <span className="text-xs font-bold uppercase tracking-wider block mb-2" style={{ color: "#0AADA8" }}>{rp.category}</span>
                      <h4 className="font-extrabold text-foreground text-sm leading-snug mb-2 group-hover:text-primary transition-colors" style={{ fontFamily: "Manrope, sans-serif" }}>
                        {rp.title}
                      </h4>
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {rp.readingTime} dk
                      </span>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </article>

          {/* Sticky sidebar TOC */}
          <aside className="hidden lg:block self-start sticky top-24">
            <div className="space-y-3">
              <div className="bg-white border border-border rounded-2xl p-4 shadow-sm">
                <TableOfContents sections={tocItems} activeId={activeId} compact />
              </div>

              {/* Sidebar CTA */}
              <div className="rounded-2xl p-4 text-white text-center" style={{ background: "linear-gradient(135deg, #123B6D 0%, #0AADA8 100%)" }}>
                <p className="font-extrabold text-base mb-1" style={{ fontFamily: "Manrope, sans-serif" }}>Ücretsiz Değerlendirme</p>
                <p className="text-xs mb-3" style={{ color: "rgba(255,255,255,0.78)" }}>Kütahya merkezimizde uzmanlarımızla görüşün.</p>
                <a href="https://wa.me/905536660343" target="_blank" rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-white font-bold text-sm px-4 py-2.5 rounded-xl hover:-translate-y-0.5 transition-transform mb-2 w-full"
                  style={{ color: "#123B6D" }}>
                  <MessageCircle className="w-4 h-4" /> WhatsApp
                </a>
                <a href="tel:+902746000343"
                  className="flex items-center justify-center gap-2 text-white/90 font-bold text-sm hover:text-white transition-colors">
                  <Phone className="w-4 h-4" /> 0274 600 03 43
                </a>
              </div>

              {/* Tags */}
              <div className="bg-white border border-border rounded-2xl p-4">
                <p className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-2">Etiketler</p>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span key={tag} className="text-xs font-bold px-2.5 py-1 rounded-full"
                      style={{ background: "rgba(10,173,168,0.10)", color: "#087a76", border: "1px solid rgba(10,173,168,0.20)" }}>
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* Back to top */}
      {showBack && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-6 z-50 w-11 h-11 rounded-full text-white flex items-center justify-center shadow-lg hover:-translate-y-0.5 transition-all"
          style={{ background: "#123B6D" }}
          aria-label="Başa dön">
          <ArrowUp className="w-5 h-5" />
        </button>
      )}

      {/* Footer */}
      <footer className="border-t border-border py-8 mt-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-4">
            <Link to="/blog" className="font-bold text-foreground hover:text-primary transition-colors">← Blog</Link>
            <Link to="/" className="hover:text-primary transition-colors">Ana Sayfa</Link>
          </div>
          <p>© {new Date().getFullYear()} Arıkan Ortopedi - Ortez & Protez — Kütahya</p>
        </div>
      </footer>
    </div>
  );
}
