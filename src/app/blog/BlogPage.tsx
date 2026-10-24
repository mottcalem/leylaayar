import { useState, useEffect } from "react";
import { Link } from "react-router";
import { Clock, Tag, ChevronRight, Search, Phone, MessageCircle } from "lucide-react";
import { BLOG_POSTS, BLOG_CATEGORIES } from "./blogData";
import { useCanonical } from "../hooks/useCanonical";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" });
}

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("Tümü");
  const [query, setQuery] = useState("");

  useCanonical();

  useEffect(() => {
    document.title = "Blog | Ortez Protez & Rehabilitasyon — Arıkan Ortopedi - Ortez & Protez Kütahya";
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute("content", "Ortez, protez, FootBalance tabanlık, SGK kapsamı ve rehabilitasyon hakkında uzman blog yazıları. Kütahya Arıkan Ortopedi - Ortez & Protez Merkezi.");
  }, []);

  const filtered = BLOG_POSTS.filter((p) => {
    const matchCat = activeCategory === "Tümü" || p.category === activeCategory;
    const matchQ = query === "" || p.title.toLowerCase().includes(query.toLowerCase()) || p.excerpt.toLowerCase().includes(query.toLowerCase());
    return matchCat && matchQ;
  });

  const featured = BLOG_POSTS.filter((p) => p.featured);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 border-b border-border backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <img src="/arikan-logo.png" alt="Arıkan Ortopedi - Ortez & Protez" className="h-14 w-auto object-contain" />
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm font-semibold text-muted-foreground">
            <Link to="/#hizmetler" className="hover:text-primary transition-colors">Hizmetlerimiz</Link>
            <Link to="/#footbalance" className="hover:text-primary transition-colors">FootBalance®</Link>
            <Link to="/#iletisim" className="hover:text-primary transition-colors">İletişim</Link>
          </nav>
          <div className="flex items-center gap-3">
            <a href="tel:+902746000343" className="hidden sm:flex items-center gap-1.5 text-sm font-bold text-foreground hover:text-primary transition-colors">
              <Phone className="w-4 h-4" /> 0274 600 03 43
            </a>
            <a href="https://wa.me/905536660343" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 text-white text-sm font-bold px-4 py-2 rounded-xl transition-all hover:-translate-y-0.5"
              style={{ background: "#25D366" }}>
              <MessageCircle className="w-4 h-4" /> WhatsApp
            </a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="py-16 text-white" style={{ background: "linear-gradient(135deg, #123B6D 0%, #0AADA8 100%)" }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <span className="inline-flex items-center text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-5 bg-white/15 border border-white/25">
            Uzman Blog
          </span>
          <h1 className="text-4xl sm:text-5xl font-black mb-4" style={{ fontFamily: "Manrope, sans-serif" }}>
            Ortez, Protez & Rehabilitasyon
          </h1>
          <p className="text-lg mb-8" style={{ color: "rgba(255,255,255,0.78)" }}>
            Kütahya Arıkan Ortopedi - Ortez & Protez Merkezi uzman ekibinden güncel bilgiler, tedavi rehberleri ve SGK mevzuatı.
          </p>
          {/* Arama */}
          <div className="relative max-w-lg mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/60" />
            <input
              type="text"
              placeholder="Blog yazısı ara…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3.5 rounded-2xl text-sm font-medium outline-none text-foreground"
              style={{ background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.25)", color: "white" }}
            />
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">

        {/* Featured — sadece filtre yokken göster */}
        {activeCategory === "Tümü" && query === "" && (
          <section className="mb-14">
            <h2 className="text-xl font-extrabold text-foreground mb-6" style={{ fontFamily: "Manrope, sans-serif" }}>
              Öne Çıkan Yazılar
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {featured.map((post) => (
                <Link key={post.slug} to={`/blog/${post.slug}`}
                  className="group relative rounded-3xl overflow-hidden flex flex-col justify-end p-7 min-h-[240px] hover:-translate-y-1 transition-all duration-300 shadow-lg">
                  <img src={post.coverImage} alt={post.title} loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${post.coverColor}dd 0%, ${post.coverColor}99 100%)` }} />
                  <div className="relative z-10">
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-3 bg-white/20 text-white">
                      <Tag className="w-3 h-3" /> {post.category}
                    </span>
                    <h3 className="text-xl font-extrabold text-white mb-2 leading-snug group-hover:underline underline-offset-2" style={{ fontFamily: "Manrope, sans-serif" }}>
                      {post.title}
                    </h3>
                    <p className="text-sm mb-4" style={{ color: "rgba(255,255,255,0.80)" }}>{post.excerpt}</p>
                    <div className="flex items-center gap-3 text-xs text-white/70">
                      <Clock className="w-3.5 h-3.5" /> {post.readingTime} dk okuma
                      <span>·</span>
                      <span>{formatDate(post.publishedAt)}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Kategori filtreleri */}
        <div className="flex flex-wrap gap-2 mb-10">
          {BLOG_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="text-sm font-bold px-4 py-2 rounded-full border transition-all duration-200"
              style={
                activeCategory === cat
                  ? { background: "#123B6D", color: "#fff", borderColor: "#123B6D" }
                  : { background: "transparent", color: "#555", borderColor: "#ddd" }
              }
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Yazı grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground">
            <p className="text-lg font-semibold mb-2">Sonuç bulunamadı.</p>
            <p className="text-sm">Farklı bir arama terimi veya kategori deneyin.</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((post) => (
              <Link key={post.slug} to={`/blog/${post.slug}`}
                className="group bg-white border border-border rounded-2xl overflow-hidden hover:-translate-y-1 hover:shadow-lg transition-all duration-300 flex flex-col">
                <div className="relative h-44 overflow-hidden">
                  <img src={post.coverImage} alt={post.title} loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0" style={{ background: `linear-gradient(180deg, transparent 40%, ${post.coverColor}66 100%)` }} />
                  <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-white/90 text-foreground">
                    <Tag className="w-3 h-3" /> {post.category}
                  </span>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="font-extrabold text-foreground text-[15px] leading-snug mb-2 group-hover:text-primary transition-colors" style={{ fontFamily: "Manrope, sans-serif" }}>
                    {post.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">{post.excerpt}</p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {post.readingTime} dk</span>
                    <span className="flex items-center gap-1 font-bold text-primary group-hover:gap-2 transition-all">
                      Devamını Oku <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* CTA */}
        <div className="mt-16 rounded-3xl p-10 text-white text-center" style={{ background: "linear-gradient(135deg, #123B6D 0%, #0AADA8 100%)" }}>
          <h2 className="text-2xl font-extrabold mb-3" style={{ fontFamily: "Manrope, sans-serif" }}>
            Sorularınız mı var? Uzmanlarımız yanınızda.
          </h2>
          <p className="text-sm mb-7 max-w-lg mx-auto" style={{ color: "rgba(255,255,255,0.78)" }}>
            Kütahya merkezimizde ücretsiz ön değerlendirme için hemen randevu alın.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a href="https://wa.me/905536660343" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 bg-white font-bold text-sm px-6 py-3 rounded-xl hover:-translate-y-0.5 transition-transform"
              style={{ color: "#123B6D" }}>
              <MessageCircle className="w-4 h-4" /> WhatsApp ile Randevu
            </a>
            <a href="tel:+902746000343"
              className="flex items-center gap-2 bg-white/15 border border-white/30 text-white font-bold text-sm px-6 py-3 rounded-xl hover:-translate-y-0.5 transition-transform">
              <Phone className="w-4 h-4" /> 0274 600 03 43
            </a>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-border py-8 mt-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <Link to="/" className="font-bold text-foreground hover:text-primary transition-colors">← Ana Sayfaya Dön</Link>
          <p>© {new Date().getFullYear()} Arıkan Ortopedi - Ortez & Protez — Kütahya</p>
        </div>
      </footer>
    </div>
  );
}
