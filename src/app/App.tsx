import { useState, useEffect, useRef } from "react";
import { Menu, X, Phone, MessageCircle, ChevronDown, ChevronUp, ChevronLeft, ChevronRight, Star, MapPin, Mail, Clock, ArrowUp, CircleCheck as CheckCircle, Award, Zap, Shield, Activity, Cpu, Scan, Wrench, HeartHandshake, ArrowRight, Baby, Dumbbell, Heart, Settings, RefreshCw, FileText, Calendar } from "lucide-react";
import { BLOG_POSTS as ALL_BLOG_POSTS } from "./blog/blogData";
import { useCanonical } from "./hooks/useCanonical";

// ─── Data ─────────────────────────────────────────────────────────────────────

const NAV_LINKS = [
  { label: "Hakkımızda", href: "#hakkimizda" },
  { label: "Hizmetlerimiz", href: "#hizmetler" },
  { label: "FootBalance®", href: "#footbalance" },
  { label: "Neden Biz?", href: "#neden-biz" },
  { label: "Hasta Hikayeleri", href: "#yorumlar" },
  { label: "Blog", href: "/blog" },
  { label: "İletişim", href: "#iletisim" },
];

const SERVICE_CATEGORIES = [
  {
    id: "alt-ekstremite",
    label: "Alt Ekstremite",
    icon: Activity,
    items: [
      { title: "Diz Altı Protez", desc: "Konforlu ve doğal görünümlü trans-tibial protez çözümleri.", icon: Activity },
      { title: "Diz Üstü Protez", desc: "Trans-femoral amputasyonda en gelişmiş teknoloji ve konfor.", icon: Activity },
      { title: "Mikroişlemcili Diz Protezi", desc: "Yapay zeka destekli, adım analizli akıllı diz protezleri.", icon: Cpu },
      { title: "Spor Protezi", desc: "Aktif yaşam için tasarlanmış karbon fiber spor protezleri.", icon: Dumbbell },
      { title: "Çocuk Protezi", desc: "Büyüme dönemine uygun, gelişimi destekleyen özel protezler.", icon: Baby },
    ],
  },
  {
    id: "ust-ekstremite",
    label: "Üst Ekstremite",
    icon: Heart,
    items: [
      { title: "Parmak Protezi", desc: "Kozmetik ve fonksiyonel parmak protez çözümleri.", icon: Activity },
      { title: "El Protezi", desc: "Güçlü kavrama gücü ve doğal görünüm sunan el protezleri.", icon: Activity },
      { title: "Biyonik Kol Protezi", desc: "Kas sinyalleriyle kontrol edilen ileri teknoloji biyonik kollar.", icon: Cpu },
      { title: "Kozmetik Protez", desc: "Estetik odaklı, gerçekçi görünümlü kozmetik protezler.", icon: Activity },
    ],
  },
  {
    id: "ortez",
    label: "Ortez Hizmetleri",
    icon: Shield,
    items: [
      { title: "AFO — Ayak-Bileği Ortezi", desc: "Ayak düşmesi ve yürüyüş bozukluklarında destek ortezleri.", icon: Activity },
      { title: "KAFO — Diz-Bacak Ortezi", desc: "Diz ve bacak desteği sağlayan kapsamlı ortez sistemleri.", icon: Activity },
      { title: "Skolyoz Korsesi", desc: "Omurga eğriliklerini düzelten kişiye özel korseler.", icon: Activity },
      { title: "Boyunluk & Bel Korsesi", desc: "Servikal ve lomber destek sağlayan konforlu ortezler.", icon: Activity },
      { title: "Sporcu Ortezleri", desc: "Spor sakatlıklarını önleyen performans ortezleri.", icon: Dumbbell },
      { title: "Diyabetik Tabanlık", desc: "Diyabetik ayak için basınç dağıtıcı özel tabanlıklar.", icon: Activity },
    ],
  },
  {
    id: "kisisel",
    label: "Kişiye Özel",
    icon: Scan,
    items: [
      { title: "3D Tarama", desc: "Yüksek hassasiyetli 3D vücut tarama teknolojisi.", icon: Scan },
      { title: "Dijital Ölçü Alma", desc: "CAD/CAM teknolojisiyle milimetrik hassasiyette ölçüm.", icon: Cpu },
      { title: "Silikon Protez", desc: "Gerçekçi doku yapısı ve renk uyumlu silikon protezler.", icon: Activity },
      { title: "Kişiye Özel Üretim", desc: "Her hastanın anatomisine göre imal edilen özel çözümler.", icon: Award },
    ],
  },
  {
    id: "bakim",
    label: "Bakım Hizmetleri",
    icon: Wrench,
    items: [
      { title: "Protez Bakımı", desc: "Düzenli bakım ve yağlama ile uzun ömürlü protezler.", icon: Wrench },
      { title: "Tamir", desc: "Hızlı ve güvenilir protez tamir ve yenileme hizmetleri.", icon: Settings },
      { title: "Soket Yenileme", desc: "Değişen vücut yapısına uygun soket yenileme işlemleri.", icon: RefreshCw },
      { title: "Periyodik Kontrol", desc: "Ücretsiz periyodik kontrol ve ayarlama hizmetleri.", icon: CheckCircle },
    ],
  },
  {
    id: "footbalance",
    label: "FootBalance® Tabanlık",
    icon: Scan,
    items: [
      { title: "Ayak & Basış Analizi", desc: "Patentli FootBalance teknolojisiyle kapsamlı ayak ve yürüyüş analizi.", icon: Scan },
      { title: "%100 Kişiye Özel Tabanlık", desc: "10 dakikada şekillendirilen, her ayakkabıya uyum sağlayan ortopedik tabanlık.", icon: Activity },
      { title: "Spor Performans Tabanlığı", desc: "Spor performansını artırır, yaralanma ve sakatlık riskini azaltır.", icon: Dumbbell },
      { title: "Çocuk & Büyüme Tabanlığı", desc: "Çocukların gelişimine uygun, büyüme dönemini destekleyen kişiye özel tabanlıklar.", icon: Baby },
    ],
  },
];

const WHY_US = [
  { icon: Award, title: "Uzman Kadro", desc: "20+ yıl deneyimli sertifikalı ortez-protez uzmanlarımız yanınızda." },
  { icon: Cpu, title: "Son Teknoloji", desc: "3D tarama, CAD/CAM ve mikroişlemci sistemleriyle en ileri üretim." },
  { icon: HeartHandshake, title: "Kişiye Özel Üretim", desc: "Her hastanın anatomisine özel tasarım ve üretim süreci." },
  { icon: Shield, title: "SGK Destek Süreçleri", desc: "SGK anlaşmalı merkez, tüm bürokratik süreçleri biz yönetiriz." },
  { icon: Zap, title: "Hızlı Teslim", desc: "Ortalama 5–7 iş günü içinde teslim güvencesi sunuyoruz." },
  { icon: CheckCircle, title: "Ücretsiz Ön Görüşme", desc: "İlk değerlendirme ve danışmanlık hizmetimiz tamamen ücretsizdir." },
];

const STEPS = [
  { n: 1, title: "Ön Görüşme", desc: "Uzman ekibimizle ücretsiz ön değerlendirme görüşmesi." },
  { n: 2, title: "Muayene ve Ölçü", desc: "Detaylı fizik muayene ve 3D dijital ölçü alma." },
  { n: 3, title: "3D Tasarım", desc: "CAD yazılımıyla kişiye özel protez tasarımı." },
  { n: 4, title: "Üretim", desc: "İleri teknoloji ekipmanlarla hassas üretim süreci." },
  { n: 5, title: "Teslim", desc: "Uyum kontrolü ve ilk adaptasyon eğitimi." },
  { n: 6, title: "Kontrol & Destek", desc: "Sürekli takip, bakım ve ücretsiz kontrol randevuları." },
];

const TESTIMONIALS = [
  {
    name: "Mehmet Yılmaz",
    meta: "42 Yaşında · Diz Altı Protez Kullanıcısı",
    text: "Diz altı protezimi aldıktan sonra hayatım tamamen değişti. Artık çocuklarımla parkta koşabiliyorum. Ekip gerçekten çok ilgili ve profesyonel, her adımda yanımda hissettim.",
  },
  {
    name: "Ayşe Kara",
    meta: "35 Yaşında · Skolyoz Korsesi Kullanıcısı",
    text: "Skolyoz korsemin hazırlanmasından teslim sürecine kadar her şey inanılmaz bir özenle yönetildi. SGK süreçlerini de onlar halledince gerçekten çok rahatladım.",
  },
  {
    name: "Hasan Demir",
    meta: "58 Yaşında · Mikroişlemcili Diz Protezi Kullanıcısı",
    text: "Mikroişlemcili diz protezim sayesinde düz yüzeylerde ve merdivenlerde çok daha güvenli adım atıyorum. Bu teknolojiyi bu kadar erişilebilir sunan nadir merkezlerden biri.",
  },
  {
    name: "Fatma Özdemir",
    meta: "29 Yaşında · Biyonik Kol Protezi Kullanıcısı",
    text: "Biyonik kol protezim için farklı merkezlere danıştım ama buradaki kişisel ilgi fark yarattı. 3D tarama teknolojisi sayesinde mükemmel bir uyum sağlandı.",
  },
];

const BLOG_POSTS = ALL_BLOG_POSTS.slice(0, 4).map((p) => ({
  title: p.title,
  excerpt: p.excerpt,
  category: p.category,
  date: new Date(p.publishedAt).toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" }),
  readTime: `${p.readingTime} dk`,
  img: p.coverImage,
  slug: p.slug,
  toc: p.sections.filter((s) => s.level === 2).slice(0, 4).map((s) => s.heading),
}));

const FAQ_ITEMS = [
  {
    q: "SGK ortez ve protez bedelini karşılıyor mu?",
    a: "Evet, SGK anlaşmalı merkezimizde pek çok ortez ve protez ürünü SGK güvencesi kapsamındadır. Hangi ürünlerin karşılandığı ve gerekli belgeler konusunda uzman ekibimiz size ücretsiz danışmanlık sağlar. Başvuru sürecinizi başından sonuna kadar biz yönetiriz.",
  },
  {
    q: "Ölçü alma süreci nasıl ilerliyor?",
    a: "3D tarama teknolojimizle tüm vücut ölçüleriniz yüksek hassasiyetle dijital ortama aktarılır. Bu süreç yaklaşık 20–30 dakika sürer, ağrısız ve konforludur. Elde edilen veriler CAD yazılımımıza aktarılarak kişiye özel tasarım süreci başlar.",
  },
  {
    q: "Protez ne kadar sürede hazırlanıyor?",
    a: "Standart ürünlerde ortalama 5–7 iş günü, tamamen kişiye özel üretimde ise 10–14 iş günü içinde teslim sağlıyoruz. Acil durumlarda hızlandırılmış üretim seçeneğimiz de mevcuttur.",
  },
  {
    q: "Protez ve ortezler için garanti var mı?",
    a: "Tüm ürünlerimiz 1 yıl üretici garantisi kapsamındadır. Bunun yanı sıra, garanti süresince ücretsiz bakım ve kontrol hizmeti sunuyoruz. Kaza veya üretim kaynaklı arızalarda ücretsiz tamir veya değişim yapılmaktadır.",
  },
  {
    q: "Kontrol randevuları ücretli mi?",
    a: "Hayır. Teslim tarihinden itibaren 1 yıl boyunca tüm periyodik kontrol ve ayarlama randevularınız ücretsizdir. Bu süre zarfında oluşabilecek minor tamir ve ayarlama işlemlerinde de herhangi bir ücret talep edilmez.",
  },
];

// ─── Hooks ────────────────────────────────────────────────────────────────────

function useScrollY() {
  const [y, setY] = useState(0);
  useEffect(() => {
    const h = () => setY(window.scrollY);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);
  return y;
}

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

function useCounter(target: number, active: boolean) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!active) return;
    const step = target / (2000 / 16);
    let cur = 0;
    const t = setInterval(() => {
      cur = Math.min(cur + step, target);
      setN(Math.floor(cur));
      if (cur >= target) clearInterval(t);
    }, 16);
    return () => clearInterval(t);
  }, [target, active]);
  return n;
}

// ─── Shared components ────────────────────────────────────────────────────────

function SectionBadge({ text, light = false }: { text: string; light?: boolean }) {
  return (
    <span
      className={`inline-flex items-center text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4 ${
        light
          ? "bg-white/15 text-white border border-white/25"
          : "border"
      }`}
      style={light ? {} : {
        background: "rgba(10,173,168,0.12)",
        color: "#087a76",
        borderColor: "rgba(10,173,168,0.35)",
      }}
    >
      {text}
    </span>
  );
}

function SectionHeading({
  badge, title, subtitle, light = false, center = true,
}: {
  badge?: string; title: string; subtitle?: string; light?: boolean; center?: boolean;
}) {
  const { ref, inView } = useInView();
  return (
    <div
      ref={ref}
      className={`mb-14 transition-all duration-700 ${center ? "text-center" : ""} ${
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      {badge && <SectionBadge text={badge} light={light} />}
      <h2
        className={`text-3xl sm:text-4xl font-extrabold leading-tight mb-4 ${
          light ? "text-white" : "text-foreground"
        }`}
        style={{ fontFamily: "Manrope, sans-serif" }}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`text-lg max-w-2xl leading-relaxed ${center ? "mx-auto" : ""} ${
            light ? "text-white/65" : "text-muted-foreground"
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}

// ─── Header ───────────────────────────────────────────────────────────────────

function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white shadow-lg" : "bg-white/95 backdrop-blur-md"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-28">
          <a href="#anasayfa" className="flex items-center shrink-0">
            <img src="/arikan-logo.png" alt="Arıkan Ortopedi - Ortez & Protez" className="h-20 w-auto max-w-[240px] object-contain" />
          </a>

          <nav className="hidden xl:flex items-center gap-0.5">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-[13px] font-medium text-foreground/65 hover:text-primary px-3 py-2 rounded-lg hover:bg-secondary transition-all duration-200"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-2.5">
            <a
              href="tel:+902746000343"
              className="flex items-center gap-2 text-[13px] font-bold text-primary bg-secondary border border-primary/15 px-4 py-2.5 rounded-xl hover:bg-primary hover:text-white transition-all duration-200"
            >
              <Phone className="w-4 h-4" />
              Hemen Ara
            </a>
            <a
              href="https://wa.me/905536660343"
              className="flex items-center gap-2 text-[13px] font-bold text-white bg-green-500 hover:bg-green-600 px-4 py-2.5 rounded-xl transition-all duration-200 shadow-md"
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp
            </a>
          </div>

          <button
            onClick={() => setOpen(!open)}
            className="xl:hidden p-2 rounded-lg text-primary hover:bg-secondary transition-colors"
            aria-label="Menüyü aç/kapat"
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="xl:hidden bg-white border-t border-border shadow-xl">
          <div className="max-w-7xl mx-auto px-4 py-4 space-y-0.5">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="block text-sm font-medium text-foreground/70 hover:text-primary px-3 py-2.5 rounded-lg hover:bg-secondary transition-all"
              >
                {l.label}
              </a>
            ))}
            <div className="flex gap-3 pt-3 border-t border-border mt-2">
              <a
                href="tel:+902746000343"
                className="flex-1 flex items-center justify-center gap-2 text-sm font-bold text-primary bg-secondary border border-primary/15 px-4 py-3 rounded-xl"
              >
                <Phone className="w-4 h-4" /> Hemen Ara
              </a>
              <a
                href="https://wa.me/905536660343"
                className="flex-1 flex items-center justify-center gap-2 text-sm font-bold text-white bg-green-500 px-4 py-3 rounded-xl"
              >
                <MessageCircle className="w-4 h-4" /> WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section
      id="anasayfa"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: "linear-gradient(135deg, #0a2444 0%, #123B6D 55%, #1a4e8a 100%)" }}
    >
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1760333333916-9fb99a7df0c7?w=1920&h=1080&fit=crop&auto=format"
          alt="Protez kullanan hasta güvenle yürüyor"
          className="w-full h-full object-cover opacity-15"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a2444]/95 via-[#123B6D]/85 to-[#123B6D]/50" />
      </div>

      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] rounded-full opacity-10 blur-[120px] pointer-events-none" style={{ background: "#0AADA8" }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20 w-full">
        <div className="grid lg:grid-cols-2 gap-14 items-center">

          <div>
            <div className="inline-flex items-center gap-2 border text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-8" style={{ background: "rgba(10,173,168,0.18)", color: "#0AADA8", borderColor: "rgba(10,173,168,0.35)" }}>
              <CheckCircle className="w-3.5 h-3.5" />
              Kütahya Ortez Protez Merkezi
            </div>

            <h1
              className="text-[2.6rem] sm:text-5xl lg:text-[3.2rem] font-black text-white leading-[1.12] mb-6"
              style={{ fontFamily: "Manrope, sans-serif" }}
            >
              Kütahya{" "}
              <span style={{ color: "#0AADA8" }}>Ortez Protez Merkezi</span>{" "}
              Uzmanı
            </h1>

            <p className="text-lg leading-relaxed mb-10 max-w-xl" style={{ color: "rgba(255,255,255,0.72)" }}>
              Kişiye özel ortez ve protez çözümleriyle yaşam kalitenizi artırıyor, her adımınızda güven ve konfor sunuyoruz.
            </p>

            <div className="flex flex-wrap gap-4 mb-14">
              <a
                href="#iletisim"
                className="inline-flex items-center gap-2.5 text-white font-bold px-8 py-4 rounded-2xl transition-all duration-200 hover:-translate-y-0.5 text-[15px]"
                style={{ background: "#0AADA8", boxShadow: "0 8px 32px rgba(10,173,168,0.35)" }}
              >
                Ücretsiz Ön Değerlendirme
                <ArrowRight className="w-5 h-5" />
              </a>
              <a
                href="https://wa.me/905536660343"
                className="inline-flex items-center gap-2.5 text-white font-semibold px-8 py-4 rounded-2xl border transition-all duration-200 hover:-translate-y-0.5 text-[15px]"
                style={{ background: "rgba(255,255,255,0.1)", borderColor: "rgba(255,255,255,0.2)" }}
              >
                <MessageCircle className="w-5 h-5" style={{ color: "#4ade80" }} />
                WhatsApp ile İletişim
              </a>
            </div>

            <div className="grid grid-cols-3 gap-8">
              {[
                { v: "2500+", l: "Başarılı Uygulama" },
                { v: "Uzman", l: "Ortez & Protez Ekibi" },
                { v: "Kişiye Özel", l: "Çözümler" },
              ].map((s) => (
                <div key={s.l} className="pl-4" style={{ borderLeft: "2px solid rgba(10,173,168,0.5)" }}>
                  <div
                    className="text-2xl font-black text-white"
                    style={{ fontFamily: "Manrope, sans-serif" }}
                  >
                    {s.v}
                  </div>
                  <div className="text-xs font-medium mt-0.5" style={{ color: "rgba(255,255,255,0.5)" }}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="hidden lg:flex justify-end">
            <div className="relative w-full max-w-[440px]">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/5]">
                <img
                  src="/hero-prosthetic.jpg"
                  alt="Ortez protez hasta uygulaması"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(18,59,109,0.4), transparent)" }} />
              </div>

              <div className="absolute -bottom-6 -left-10 bg-white rounded-2xl shadow-xl p-4 max-w-[220px]">
                <div className="flex items-center gap-3 mb-1.5">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "rgba(10,173,168,0.1)" }}>
                    <CheckCircle className="w-4 h-4" style={{ color: "#0AADA8" }} />
                  </div>
                  <div>
                    <div className="text-[10px] text-muted-foreground">Son değerlendirme</div>
                    <div className="text-xs font-bold text-foreground">Ahmet B. — 5★</div>
                  </div>
                </div>
                <p className="text-[11px] text-muted-foreground">"Harika bir hizmet, çok memnun kaldım!"</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2" style={{ color: "rgba(255,255,255,0.3)" }}>
        <span className="text-[11px] tracking-widest uppercase">Keşfet</span>
        <div className="w-5 h-8 border border-current rounded-full flex items-start justify-center p-1">
          <div className="w-1 h-2 rounded-full animate-bounce" style={{ background: "rgba(255,255,255,0.4)" }} />
        </div>
      </div>
    </section>
  );
}

// ─── About ────────────────────────────────────────────────────────────────────

function About() {
  const { ref, inView } = useInView();
  return (
    <section
      id="hakkimizda"
      ref={ref}
      className={`py-24 bg-background transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <SectionBadge text="Hakkımızda" />
            <h2
              className="text-3xl sm:text-4xl font-extrabold text-foreground leading-tight mb-5"
              style={{ fontFamily: "Manrope, sans-serif" }}
            >
              Kütahya'nın Güvenilir Ortez & Protez Merkezi
            </h2>
<p className="text-muted-foreground leading-relaxed mb-8">
  <strong>2022 yılından bu yana Kütahya’da hizmet veren Arıkan Ortopedi - Ortez &amp; Protez</strong>, kişiye özel ortez ve protez çözümleriyle danışanlarının yaşam kalitesini ve hareket özgürlüğünü desteklemeyi amaçlamaktadır.
</p>

<p className="text-muted-foreground leading-relaxed mb-8">
  Deneyimli ekibimiz ve güncel teknolojilerden yararlanan uygulama yaklaşımımızla; alt ve üst ekstremite protezleri, kişiye özel ortez uygulamaları, CNC tabanlık, AFO, KAFO, 3 boyutlu skolyoz korseleri ve uzun yürüme cihazları gibi farklı ihtiyaçlara yönelik çözümler sunuyoruz.
</p>

<p className="text-muted-foreground leading-relaxed mb-8">
  Her bireyin ihtiyacının farklı olduğuna inanıyor; değerlendirme, ölçülendirme, üretim ve uygulama süreçlerini kişiye özel olarak planlıyoruz. <strong>Arıkan Ortopedi olarak amacımız, doğru uygulamayı güvenilir hizmet ve uzun yıllara dayanan deneyimle buluşturmaktır.</strong>
</p>
            <div className="flex flex-wrap gap-3">
              {["SGK Anlaşmalı", "ISO Sertifikalı", "20+ Yıl Deneyim", "Ücretsiz Danışma"].map((tag) => (
                <span
                  key={tag}
                  className="text-xs font-bold text-primary bg-secondary border border-primary/15 px-3 py-1.5 rounded-full"
                >
                  ✓ {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="relative pb-8">
            <div className="grid grid-cols-2 gap-4">
              <img
                src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=280&fit=crop&auto=format"
                alt="Uzman protez teknisyeni"
                className="w-full rounded-2xl shadow-lg object-cover"
              />
              <img
                src="https://images.unsplash.com/photo-1782397132123-0166b524d6bc?w=400&h=280&fit=crop&auto=format"
                alt="Modern klinik ortamı"
                className="w-full rounded-2xl shadow-lg object-cover mt-8"
              />
            </div>
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 bg-white rounded-2xl shadow-xl px-6 py-4 flex items-center gap-3 border border-border whitespace-nowrap">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                <Award className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Sektörde</div>
                <div className="font-bold text-foreground text-sm" style={{ fontFamily: "Manrope, sans-serif" }}>20+ Yıllık Deneyim</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Services ─────────────────────────────────────────────────────────────────

function Services() {
  const [active, setActive] = useState("alt-ekstremite");
  const cat = SERVICE_CATEGORIES.find((c) => c.id === active)!;

  return (
    <section id="hizmetler" className="py-24 bg-secondary/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Hizmetlerimiz"
          title="Kapsamlı Ortez & Protez Çözümleri"
          subtitle="Son teknoloji ekipmanlar ve uzman kadromuzla sizin için en uygun çözümü üretiyoruz."
        />

        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {SERVICE_CATEGORIES.map((c) => {
            const Icon = c.icon;
            return (
              <button
                key={c.id}
                onClick={() => setActive(c.id)}
                className={`flex items-center gap-2 text-sm font-semibold px-4 py-2.5 rounded-xl transition-all duration-200 ${
                  active === c.id
                    ? "text-white shadow-lg"
                    : "bg-white text-foreground/65 border border-border hover:text-primary hover:bg-secondary"
                }`}
                style={active === c.id ? { background: "#123B6D", boxShadow: "0 4px 16px rgba(18,59,109,0.25)" } : {}}
              >
                <Icon className="w-4 h-4" />
                {c.label}
              </button>
            );
          })}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {cat.items.map((item, i) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="group bg-white border border-border rounded-2xl p-6 hover:-translate-y-1 transition-all duration-300"
                style={{ transitionDelay: `${i * 40}ms` }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-colors duration-300"
                  style={{ background: "rgba(18,59,109,0.07)" }}
                >
                  <Icon className="w-6 h-6 text-primary group-hover:scale-110 transition-transform duration-300" />
                </div>
                <h3
                  className="font-bold text-foreground mb-2"
                  style={{ fontFamily: "Manrope, sans-serif" }}
                >
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                <a
                  href="https://wa.me/905536660343"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ color: "#0AADA8" }}
                >
                  <MessageCircle className="w-3.5 h-3.5" /> WhatsApp İletişim
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── FootBalance ──────────────────────────────────────────────────────────────

const FB_BENEFITS = [
  { icon: Activity, title: "Sağlıklı & Dengeli Basış", desc: "Sağlıklı, doğru ve dengeli basmanıza yardımcı olur; ayak, diz ve sırt ağrılarını azaltır." },
  { icon: Zap, title: "10 Dakikada Hazır", desc: "Kullanmak için beklemek gerekmez. Seans sonunda hemen ayakkabınıza takabilirsiniz." },
  { icon: Heart, title: "Her Ayakkabıya Uyum", desc: "Her ayakkabı ile mükemmel uyum sağlar ve sıradan ayakkabınızı ortopedik ayakkabıya dönüştürür." },
  { icon: Dumbbell, title: "Spor Performansı", desc: "Spor ve sporcunun performansını destekler, yaralanma riskini önemli ölçüde azaltır." },
];

const FB_PROCESS = [
  { n: 1, title: "Kapsamlı Ayak & Basış Analizi", desc: "Patentli FootBalance teknolojisiyle ayaklarınızın ve basış biçiminizin detaylı analizi yapılır." },
  { n: 2, title: "Detaylı Kişisel Rapor", desc: "Ayak yapınız ve yürüyüş biçiminize özel, uzman tarafından hazırlanan kişisel raporunuz sunulur." },
  { n: 3, title: "Uzman Görüşü & Çözüm Önerisi", desc: "Ortez-protez uzmanımız size en uygun tabanlık tipini ve çözümü belirler." },
  { n: 4, title: "Hemen Kullanıma Hazır Tabanlık", desc: "%100 kişiye özel tabanlığınız 10 dakikada şekillendirilir; seans biter bitmez kullanmaya başlarsınız." },
];

function FootBalance() {
  return (
    <section id="footbalance" className="py-24 bg-secondary/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <SectionHeading
          badge="FootBalance® Yetkili Merkezi"
          title="10 Dakikada %100 Kişiye Özel Ortopedik Tabanlık"
          subtitle="Kütahya'nın FootBalance yetkili merkezi olarak patentli teknoloji ile ayak analizinizi yapıyor, anında şekillendirdiğimiz kişisel tabanlıkla konfor ve sağlığı ayağınıza getiriyoruz."
        />

        {/* Video + Ürün Görseli */}
        <div className="grid lg:grid-cols-2 gap-6 mb-16">
          {/* Video */}
          <div className="relative rounded-3xl overflow-hidden shadow-xl bg-black" style={{ minHeight: 280 }}>
            <video
              src="https://footbalance.com.tr/wp-content/uploads/2026/03/anasayfa-hub.mp4"
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
              style={{ minHeight: 280 }}
            />
            <div className="absolute bottom-0 inset-x-0 p-5" style={{ background: "linear-gradient(to top, rgba(18,59,109,0.75), transparent)" }}>
              <span className="text-white font-bold text-sm">FootBalance® Teknolojisi — Nasıl Çalışır?</span>
            </div>
          </div>

          {/* Ürün Görseli + İstatistikler */}
          <div className="relative rounded-3xl overflow-hidden shadow-xl" style={{ minHeight: 280 }}>
            <img
              src="/footbalance-tabanlik.png"
              alt="FootBalance ortopedik tabanlık"
              className="w-full h-full object-cover"
              style={{ minHeight: 280 }}
            />
            <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(18,59,109,0.80) 40%, rgba(18,59,109,0.10) 100%)" }} />
            <div className="absolute bottom-0 inset-x-0 p-6">
              <p className="text-white font-extrabold text-lg mb-4" style={{ fontFamily: "Manrope, sans-serif" }}>
                FootBalance Dynamic — Hayatınıza Uyum Sağlar
              </p>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { v: "10dk", l: "Şekillendirme" },
                  { v: "%100", l: "Kişiye Özel" },
                  { v: "∞", l: "Ayakkabı Uyumu" },
                ].map((s) => (
                  <div key={s.l} className="rounded-xl p-3 text-center" style={{ background: "rgba(255,255,255,0.15)", backdropFilter: "blur(8px)" }}>
                    <div className="text-white font-black text-xl" style={{ fontFamily: "Manrope, sans-serif" }}>{s.v}</div>
                    <div className="text-white/75 text-xs mt-0.5">{s.l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Faydalar + Süreç */}
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Faydalar */}
          <div>
            <h3 className="text-xl font-extrabold text-foreground mb-6" style={{ fontFamily: "Manrope, sans-serif" }}>
              FootBalance Tabanlığın Faydaları
            </h3>
            <div className="space-y-4">
              {FB_BENEFITS.map((b) => {
                const Icon = b.icon;
                return (
                  <div key={b.title} className="flex items-start gap-4 bg-white rounded-2xl p-5 border border-border hover:-translate-y-0.5 transition-transform duration-200">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: "rgba(10,173,168,0.10)" }}>
                      <Icon className="w-5 h-5" style={{ color: "#0AADA8" }} />
                    </div>
                    <div>
                      <div className="font-bold text-foreground mb-1" style={{ fontFamily: "Manrope, sans-serif" }}>{b.title}</div>
                      <p className="text-sm text-muted-foreground leading-relaxed">{b.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Süreç + CTA */}
          <div>
            <h3 className="text-xl font-extrabold text-foreground mb-6" style={{ fontFamily: "Manrope, sans-serif" }}>
              Merkezimizde Sizi Ne Bekliyor?
            </h3>
            <div className="space-y-4 mb-8">
              {FB_PROCESS.map((p) => (
                <div key={p.n} className="flex items-start gap-4 bg-white rounded-2xl p-5 border border-border hover:-translate-y-0.5 transition-transform duration-200">
                  <span className="w-8 h-8 rounded-full text-white text-sm font-extrabold flex items-center justify-center shrink-0" style={{ background: "#123B6D" }}>
                    {p.n}
                  </span>
                  <div>
                    <div className="font-bold text-foreground mb-1" style={{ fontFamily: "Manrope, sans-serif" }}>{p.title}</div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* Ortalanmış CTA */}
        <div className="mt-14 flex justify-center">
          <div className="w-full max-w-2xl rounded-2xl p-8 text-white text-center" style={{ background: "linear-gradient(135deg, #123B6D 0%, #0AADA8 100%)" }}>
            <div className="flex items-center justify-center gap-2 mb-3">
              <Clock className="w-5 h-5 text-white/80" />
              <span className="font-extrabold text-xl" style={{ fontFamily: "Manrope, sans-serif" }}>Sadece 10 Dakikada Hazır!</span>
            </div>
            <p className="text-sm mb-6 max-w-md mx-auto" style={{ color: "rgba(255,255,255,0.75)" }}>
              Ücretsiz ayak analizi için hemen randevu alın. SGK kapsamı hakkında bilgi alın.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <a href="https://wa.me/905536660343" className="flex items-center gap-2 bg-white font-bold text-sm px-6 py-3 rounded-xl hover:-translate-y-0.5 transition-transform" style={{ color: "#123B6D" }}>
                <MessageCircle className="w-4 h-4" />
                WhatsApp ile Randevu
              </a>
              <a href="tel:+902746000343" className="flex items-center gap-2 bg-white/15 border border-white/30 text-white font-bold text-sm px-6 py-3 rounded-xl hover:-translate-y-0.5 transition-transform">
                <Phone className="w-4 h-4" />
                0274 600 03 43
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

// ─── Why Us ───────────────────────────────────────────────────────────────────

function WhyUs() {
  const { ref, inView } = useInView(0.1);
  return (
    <section id="neden-biz" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Neden Biz?"
          title="Farkımızı Hissedeceksiniz"
          subtitle="Arıkan Ortopedi - Ortez & Protez olarak hasta odaklı yaklaşımımız ve teknik üstünlüğümüzle ayrışıyoruz."
        />
        <div ref={ref} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {WHY_US.map((item, i) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className={`flex items-start gap-4 bg-white border border-border rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-500 ${
                  inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center shrink-0 shadow-md" style={{ boxShadow: "0 4px 12px rgba(18,59,109,0.22)" }}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3
                    className="font-bold text-foreground mb-1.5"
                    style={{ fontFamily: "Manrope, sans-serif" }}
                  >
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── Patient Process ──────────────────────────────────────────────────────────

function PatientProcess() {
  const { ref, inView } = useInView(0.1);
  return (
    <section id="hasta-sureci" className="py-24 bg-secondary/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Hasta Süreciniz"
          title="Adım Adım Yanınızdayız"
          subtitle="İlk görüşmeden ürün teslimine, bakımdan destek hizmetine kadar her adımda ekibimiz sizinle."
        />

        <div ref={ref} className="relative">
          <div
            className="hidden lg:block absolute top-8 left-[calc(8.33%+28px)] right-[calc(8.33%+28px)] h-px"
            style={{ background: "linear-gradient(to right, transparent, rgba(18,59,109,0.25), transparent)" }}
          />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 lg:gap-4">
            {STEPS.map((s, i) => (
              <div
                key={s.n}
                className={`flex flex-col items-center text-center transition-all duration-500 ${
                  inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${i * 90}ms` }}
              >
                <div
                  className="relative z-10 w-16 h-16 rounded-full text-white font-black text-lg flex items-center justify-center mb-4 ring-4 ring-background"
                  style={{ fontFamily: "Manrope, sans-serif", background: "#123B6D", boxShadow: "0 6px 20px rgba(18,59,109,0.3)" }}
                >
                  {s.n}
                </div>
                <h4
                  className="font-bold text-foreground text-sm mb-1.5 leading-tight"
                  style={{ fontFamily: "Manrope, sans-serif" }}
                >
                  {s.title}
                </h4>
                <p className="text-xs text-muted-foreground leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-14">
          <a
            href="#iletisim"
            className="inline-flex items-center gap-2 text-white font-bold px-8 py-4 rounded-2xl transition-all duration-200 hover:-translate-y-0.5"
            style={{ background: "#123B6D", boxShadow: "0 6px 24px rgba(18,59,109,0.25)" }}
          >
            Hemen Randevu Al <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  );
}

// ─── Testimonials ─────────────────────────────────────────────────────────────

function Testimonials() {
  const [idx, setIdx] = useState(0);
  const prev = () => setIdx((i) => (i === 0 ? TESTIMONIALS.length - 1 : i - 1));
  const next = () => setIdx((i) => (i === TESTIMONIALS.length - 1 ? 0 : i + 1));
  const t = TESTIMONIALS[idx];

  return (
    <section id="yorumlar" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Hasta Hikayeleri"
          title="Gerçek Hastalar, Gerçek Sonuçlar"
          subtitle="Binlerce hastamızın hayatına dokunmanın gururuyla, onların deneyimlerini paylaşıyoruz."
        />

        <div className="max-w-3xl mx-auto">
          <div className="relative bg-white border border-border rounded-3xl p-8 sm:p-12 shadow-xl overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" style={{ background: "rgba(10,173,168,0.05)" }} />
            <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full translate-y-1/2 -translate-x-1/2 pointer-events-none" style={{ background: "rgba(18,59,109,0.04)" }} />

            <div className="relative z-10">
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <blockquote className="text-lg sm:text-xl text-foreground leading-relaxed mb-8 font-medium">
                "{t.text}"
              </blockquote>
              <div className="text-center">
                <div className="font-bold text-foreground" style={{ fontFamily: "Manrope, sans-serif" }}>{t.name}</div>
                <div className="text-sm font-semibold" style={{ color: "#0AADA8" }}>{t.meta}</div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full border border-border bg-white hover:text-white flex items-center justify-center transition-all duration-200"
              style={{}}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#123B6D"; (e.currentTarget as HTMLElement).style.borderColor = "#123B6D"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "white"; (e.currentTarget as HTMLElement).style.borderColor = ""; }}
              aria-label="Önceki"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex gap-2">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIdx(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${i === idx ? "w-8" : "w-2 bg-muted"}`}
                  style={i === idx ? { background: "#123B6D" } : {}}
                  aria-label={`Yorum ${i + 1}`}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="w-10 h-10 rounded-full border border-border bg-white hover:text-white flex items-center justify-center transition-all duration-200"
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#123B6D"; (e.currentTarget as HTMLElement).style.borderColor = "#123B6D"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "white"; (e.currentTarget as HTMLElement).style.borderColor = ""; }}
              aria-label="Sonraki"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Blog ─────────────────────────────────────────────────────────────────────

function Blog() {
  const { ref, inView } = useInView(0.1);
  return (
    <section id="blog" className="py-24 bg-secondary/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Blog"
          title="Ortez & Protez Hakkında Her Şey"
          subtitle="Uzmanlarımızın kaleme aldığı kapsamlı rehber yazılar, güncel teknoloji haberleri ve hasta deneyimleri."
        />

        <div ref={ref} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {BLOG_POSTS.map((post, i) => (
            <article
              key={post.title}
              className={`group bg-white border border-border rounded-2xl overflow-hidden hover:-translate-y-1 transition-all duration-400 ${
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div className="aspect-[16/9] overflow-hidden bg-muted">
                <img
                  src={post.img}
                  alt={post.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="p-5">
                <span
                  className="inline-block text-[10px] font-bold uppercase tracking-wide px-2.5 py-1 rounded-full mb-3"
                  style={{ background: "rgba(10,173,168,0.1)", color: "#0AADA8" }}
                >
                  {post.category}
                </span>

                <h3
                  className="font-bold text-foreground text-sm leading-snug mb-2 group-hover:text-primary transition-colors duration-200"
                  style={{ fontFamily: "Manrope, sans-serif" }}
                >
                  {post.title}
                </h3>

                <p className="text-xs text-muted-foreground leading-relaxed mb-4 line-clamp-2">
                  {post.excerpt}
                </p>

                <div className="bg-secondary/60 rounded-xl p-3 mb-4">
                  <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <FileText className="w-3 h-3" /> İçindekiler
                  </div>
                  <ol className="space-y-1">
                    {post.toc.map((item, j) => (
                      <li key={item} className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                        <span className="font-bold" style={{ color: "#0AADA8" }}>{j + 1}.</span> {item}
                      </li>
                    ))}
                  </ol>
                </div>

                <div className="flex items-center justify-between text-[11px] text-muted-foreground border-t border-border pt-3">
                  <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {post.date}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {post.readTime}</span>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center mt-10">
          <a
            href="/blog"
            className="inline-flex items-center gap-2 bg-white border border-border hover:bg-primary hover:text-white hover:border-primary text-foreground font-semibold px-6 py-3 rounded-xl transition-all duration-200 text-sm"
          >
            Tüm Blog Yazılarını Gör <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}

// ─── FAQ ──────────────────────────────────────────────────────────────────────

function FAQ() {
  const [open, setOpen] = useState<number | null>(null);
  const { ref, inView } = useInView(0.1);

  return (
    <section id="sss" className="py-24 bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="SSS"
          title="Sıkça Sorulan Sorular"
          subtitle="Hizmetlerimiz ve süreçler hakkında en çok merak edilen soruların yanıtları."
        />

        <div ref={ref} className="space-y-3">
          {FAQ_ITEMS.map((item, i) => (
            <div
              key={i}
              className={`bg-white border border-border rounded-2xl overflow-hidden transition-all duration-500 ${
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
              style={{ transitionDelay: `${i * 70}ms`, boxShadow: open === i ? "0 4px 20px rgba(18,59,109,0.08)" : undefined }}
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between gap-4 p-6 text-left focus:outline-none"
                aria-expanded={open === i}
              >
                <span className="font-semibold text-foreground" style={{ fontFamily: "Manrope, sans-serif" }}>
                  {item.q}
                </span>
                <div
                  className="w-8 h-8 rounded-full border flex items-center justify-center shrink-0 transition-all duration-300"
                  style={open === i ? { background: "#123B6D", borderColor: "#123B6D" } : { borderColor: "#e2e8f0" }}
                >
                  {open === i
                    ? <ChevronUp className="w-4 h-4 text-white" />
                    : <ChevronDown className="w-4 h-4 text-muted-foreground" />
                  }
                </div>
              </button>

              {open === i && (
                <div className="px-6 pb-6 text-sm text-muted-foreground leading-relaxed border-t border-border pt-4">
                  {item.a}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-10 p-6 bg-secondary/60 rounded-2xl border border-border flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
          <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center shrink-0">
            <MessageCircle className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <div className="font-bold text-foreground mb-0.5" style={{ fontFamily: "Manrope, sans-serif" }}>
              Sorunuz yanıt bulamadı mı?
            </div>
            <div className="text-sm text-muted-foreground">
              WhatsApp'tan yazın, uzmanlarımız kısa sürede yanıt versin.
            </div>
          </div>
          <a
            href="https://wa.me/905536660343"
            className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold px-5 py-2.5 rounded-xl text-sm transition-all duration-200 whitespace-nowrap"
          >
            <MessageCircle className="w-4 h-4" /> WhatsApp'ta Sor
          </a>
        </div>
      </div>
    </section>
  );
}

// ─── Contact ──────────────────────────────────────────────────────────────────

function Contact() {
  return (
    <section id="iletisim" className="py-24 bg-secondary/40" aria-label="İletişim ve konum bilgileri">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="İletişim"
          title="Bizi Ziyaret Edin"
          subtitle="Ücretsiz ön değerlendirme için kliniğimize bekliyor, telefon veya WhatsApp üzerinden kolayca ulaşabilirsiniz."
        />

        <div className="grid lg:grid-cols-2 gap-10">
          <div className="h-[500px] rounded-3xl overflow-hidden border border-border shadow-sm">
            <iframe
              title="Arıkan Ortopedi - Ortez & Protez Kütahya Klinik Konumu"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3081.923513971461!2d29.9631!3d39.425854!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14c9470c0a8223f9%3A0xc4dae7929356e209!2sARIKAN%20ORTOPED%C4%B0%20K%C3%9CTAHYA%20ORTEZ%20PROTEZ%20YAPIM%20VE%20UYGULAMA%20MERKEZ%C4%B0!5e0!3m2!1str!2str!4v1786557774867!5m2!1str!2str"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          <div className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { icon: MapPin, label: "Adres", value: "Evliya Çelebi Mah. Eken Paşa Cd.\nNo:13/E, Şehir Hastanesi Yanı\nKütahya" },
                { icon: Phone, label: "Telefon", value: "0274 600 03 43\n0553 666 03 43\n0553 849 90 35" },
                { icon: Mail, label: "E-posta", value: "info@arikanortopedi.com" },
                { icon: Clock, label: "Çalışma Saatleri", value: "Pzt–Cum: 08:00–18:00\nCumartesi: 09:00–14:00" },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.label} className="bg-white border border-border rounded-2xl p-4">
                    <div className="flex items-start gap-3">
                      <div
                        className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                        style={{ background: "rgba(18,59,109,0.07)" }}
                      >
                        <Icon className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-1">
                          {item.label}
                        </div>
                        <div className="text-xs text-foreground whitespace-pre-line leading-relaxed">
                          {item.value}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <a
              href="https://wa.me/905536660343"
              className="flex items-center gap-4 text-white font-bold p-5 rounded-2xl transition-all duration-200 hover:-translate-y-0.5"
              style={{ background: "#22c55e", boxShadow: "0 6px 24px rgba(34,197,94,0.28)" }}
              aria-label="WhatsApp ile iletişime geçin"
            >
              <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: "rgba(255,255,255,0.2)" }}>
                <MessageCircle className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <div className="text-[15px]">WhatsApp ile Hızlı İletişim</div>
                <div className="text-xs font-normal" style={{ color: "rgba(255,255,255,0.72)" }}>
                  Genellikle birkaç dakika içinde yanıt veriyoruz
                </div>
              </div>
              <ArrowRight className="w-5 h-5 opacity-70" />
            </a>

            <a
              href="tel:+902746000343"
              className="flex items-center gap-4 text-white font-bold p-5 rounded-2xl transition-all duration-200 hover:-translate-y-0.5"
              style={{ background: "#123B6D", boxShadow: "0 6px 24px rgba(18,59,109,0.22)" }}
              aria-label="Hemen ara 0274 600 03 43"
            >
              <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: "rgba(255,255,255,0.15)" }}>
                <Phone className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <div className="text-[15px]">Hemen Ara</div>
                <div className="text-xs font-normal" style={{ color: "rgba(255,255,255,0.72)" }}>0274 600 03 43</div>
              </div>
              <ArrowRight className="w-5 h-5 opacity-70" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer style={{ background: "#0c2045", color: "white" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

          <div>
            <div className="mb-5">
              <img src="/arikan-logo.png" alt="Arıkan Ortopedi - Ortez & Protez" className="h-20 w-auto max-w-[220px] object-contain" />
            </div>
            <p className="text-sm leading-relaxed mb-6" style={{ color: "rgba(255,255,255,0.52)" }}>
              Kütahya'nın lider ortez ve protez merkezi olarak, her hastamıza kişiye özel çözümler sunuyoruz.
            </p>
            <div className="flex gap-2.5">
              {[
                { id: "fb", l: "F" },
                { id: "ig", l: "IG" },
                { id: "yt", l: "YT" },
                { id: "li", l: "in" },
              ].map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  aria-label={s.id}
                  className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200 text-[11px] font-bold"
                  style={{ background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.6)" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#0AADA8"; (e.currentTarget as HTMLElement).style.color = "white"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.08)"; (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.6)"; }}
                >
                  {s.l}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4
              className="font-bold mb-4 text-xs uppercase tracking-widest"
              style={{ fontFamily: "Manrope, sans-serif", color: "rgba(255,255,255,0.75)" }}
            >
              Hızlı Menü
            </h4>
            <ul className="space-y-2.5">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="text-sm transition-colors duration-200"
                    style={{ color: "rgba(255,255,255,0.48)" }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "white"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.48)"; }}
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4
              className="font-bold mb-4 text-xs uppercase tracking-widest"
              style={{ fontFamily: "Manrope, sans-serif", color: "rgba(255,255,255,0.75)" }}
            >
              Hizmetler
            </h4>
            <ul className="space-y-2.5">
              {[
                "Alt Ekstremite Protezleri",
                "Üst Ekstremite Protezleri",
                "Ortez Hizmetleri",
                "Kişiye Özel Üretim",
                "Bakım Hizmetleri",
              ].map((s) => (
                <li key={s}>
                  <a
                    href="#hizmetler"
                    className="text-sm transition-colors duration-200"
                    style={{ color: "rgba(255,255,255,0.48)" }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "white"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.48)"; }}
                  >
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4
              className="font-bold mb-4 text-xs uppercase tracking-widest"
              style={{ fontFamily: "Manrope, sans-serif", color: "rgba(255,255,255,0.75)" }}
            >
              Yasal
            </h4>
            <ul className="space-y-2.5 mb-6">
              {[
                { label: "KVKK Aydınlatma Metni", href: "/kvkk" },
                { label: "Gizlilik Politikası", href: "/gizlilik-politikasi" },
                { label: "Çerez Politikası", href: "/cerez-politikasi" },
                { label: "Kullanım Koşulları", href: "/kullanim-kosullari" },
              ].map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="text-sm transition-colors duration-200"
                    style={{ color: "rgba(255,255,255,0.48)" }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "white"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.48)"; }}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
            <div
              className="p-4 rounded-xl border"
              style={{ background: "rgba(255,255,255,0.05)", borderColor: "rgba(255,255,255,0.1)" }}
            >
              <div className="text-xs font-bold mb-1" style={{ color: "#0AADA8" }}>SGK Anlaşmalı Merkez</div>
              <div className="text-[11px] leading-relaxed" style={{ color: "rgba(255,255,255,0.42)" }}>
                Sosyal Güvenlik Kurumu ile tam anlaşmalı sağlık kuruluşuyuz.
              </div>
            </div>
          </div>
        </div>

        <div
          className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-3"
          style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
        >
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.32)" }}>
            © 2025 Arıkan Ortopedi - Ortez & Protez. Tüm hakları saklıdır.
          </p>
          <p className="text-[11px]" style={{ color: "rgba(255,255,255,0.22)" }}>
            Schema.org MedicalOrganization · TR · Kütahya
          </p>
        </div>
      </div>
    </footer>
  );
}

// ─── Floating Buttons ─────────────────────────────────────────────────────────

function FloatingButtons({ scrollY }: { scrollY: number }) {
  return (
    <div className="fixed bottom-6 right-5 z-50 flex flex-col items-end gap-3">
      {scrollY > 500 && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="w-11 h-11 rounded-full text-white flex items-center justify-center transition-all duration-200 hover:-translate-y-0.5"
          style={{ background: "#123B6D", boxShadow: "0 4px 16px rgba(18,59,109,0.35)" }}
          aria-label="Yukarı çık"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}

      <a
        href="https://wa.me/905536660343"
        className="flex items-center gap-2.5 text-white font-bold px-4 py-3 rounded-2xl transition-all duration-200 hover:-translate-y-0.5"
        style={{ background: "#22c55e", boxShadow: "0 4px 20px rgba(34,197,94,0.35)" }}
        aria-label="WhatsApp ile iletişim"
      >
        <MessageCircle className="w-5 h-5" />
        <span className="text-sm hidden sm:inline">WhatsApp</span>
      </a>
    </div>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────

export default function App() {
  useCanonical();
  const scrollY = useScrollY();

  return (
    <div className="bg-background text-foreground" style={{ fontFamily: "Inter, sans-serif" }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "MedicalOrganization",
            name: "Arıkan Ortopedi - Ortez & Protez",
            description: "Kütahya Arıkan Ortopedi - Ortez & Protez ile kişiye özel ortez ve protez çözümleri sunan SGK anlaşmalı merkez.",
            url: "https://arikanortopedi.com",
            telephone: ["+90-274-600-03-43", "+90-553-666-03-43", "+90-553-849-90-35"],
            address: {
              "@type": "PostalAddress",
              streetAddress: "Evliya Çelebi Mah. Eken Paşa Cd. No:13/E, Şehir Hastanesi Yanı",
              addressLocality: "Kütahya",
              addressRegion: "Kütahya",
              addressCountry: "TR",
            },
            openingHours: ["Mo-Fr 08:00-18:00", "Sa 09:00-14:00"],
          }),
        }}
      />

      <Header />
      <main>
        <Hero />
        <About />
        <Services />
        <FootBalance />
        <WhyUs />
        <PatientProcess />
        <Testimonials />
        <Blog />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <FloatingButtons scrollY={scrollY} />
    </div>
  );
}
