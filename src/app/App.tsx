import { useState } from "react";
import {
  Activity,
  ArrowRight,
  ArrowUp,
  Award,
  CheckCircle,
  Clock,
  Footprints,
  Hand,
  Heart,
  Leaf,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  Shield,
  X,
} from "lucide-react";
import { BRAND, SERVICES } from "./brand";
import { BLOG_POSTS } from "./blog/blogData";
import { useCanonical } from "./hooks/useCanonical";

const NAV = [
  ["Hakkımızda", "#hakkimizda"],
  ["Hizmetlerimiz", "#hizmetler"],
  ["Taban Analizi", "#taban-analizi"],
  ["Blog", "/blog"],
  ["İletişim", "#iletisim"],
];
const FAQ = [
  [
    "Bahçeşehir’de fizyoterapist randevusu nasıl alabilirim?",
    "0534 307 00 48 numaralı telefondan veya WhatsApp üzerinden ulaşarak ihtiyaçlarınızı paylaşabilir ve uygun randevu saatini öğrenebilirsiniz. Kliniğimiz Bahçeşehir Sofa Evleri’ndedir.",
  ],
  [
    "Klinik pilates ile pilates arasındaki fark nedir?",
    "Klinik pilateste program, fizyoterapi değerlendirmesi ve kişinin hareket ihtiyaçları doğrultusunda şekillenir. Egzersiz seçimi, yoğunluğu ve ilerleme planı bireye göre düzenlenir.",
  ],
  [
    "İlk görüşmede neler değerlendiriliyor?",
    "Hareket hedefleriniz, mevcut şikâyetleriniz ve sağlık geçmişiniz konuşulur. Postür, hareket kapasitesi ve ihtiyaç duyulan alanlar değerlendirilerek izlenecek süreç planlanır. Varsa hekim raporlarınızı yanınızda getirebilirsiniz.",
  ],
  [
    "Ortez ve protez hakkında bilgi alabilir miyim?",
    "Blogumuzda AFO, ortez, protez, ortopedik tabanlık ve SGK anlaşmalı ortez protez süreçlerine ilişkin bilgilendirici rehberler yer alır. Cihaz reçetesi, üretimi, teknik uygulama ve geri ödeme için ilgili hekim, yetkili ortez protez merkezi ve SGK ile görüşülmelidir.",
  ],
  [
    "Hamilelik pilatesine nasıl başlanır?",
    "Gebelikte egzersize uygunluk için hekiminizin görüşü alınır. Ardından ihtiyaçlarınız ve gebelik süreciniz dikkate alınarak kişiye uygun bir plan oluşturulur.",
  ],
];
const icons = {
  foot: Footprints,
  activity: Activity,
  hand: Hand,
  heart: Heart,
  shield: Shield,
  leaf: Leaf,
};
function Heading({
  badge,
  title,
  text,
}: {
  badge: string;
  title: string;
  text?: string;
}) {
  return (
    <div className="text-center max-w-3xl mx-auto mb-12">
      <span className="section-badge">{badge}</span>
      <h2 className="text-3xl sm:text-4xl font-extrabold mb-5">{title}</h2>
      {text && (
        <p className="text-muted-foreground leading-relaxed text-lg">{text}</p>
      )}
    </div>
  );
}
function ContactButtons() {
  return (
    <div className="flex flex-wrap gap-3">
      <a className="brand-button" href="tel:+905343070048">
        <Phone size={18} />
        Randevu İçin Arayın
      </a>
      <a className="brand-button brand-button-outline" href={BRAND.whatsapp}>
        <MessageCircle size={18} />
        WhatsApp
      </a>
    </div>
  );
}
export default function App() {
  const [menu, setMenu] = useState(false);
  const [category, setCategory] = useState("Tümü");
  useCanonical();
  const schema = {
    "@context": "https://schema.org",
    "@type": "MedicalClinic",
    name: BRAND.name,
    description: BRAND.description,
    url: BRAND.origin,
    image: `${BRAND.origin}/leylaayar.png`,
    telephone: BRAND.telephone,
    email: BRAND.email,
    sameAs: [BRAND.instagram],
    address: {
      "@type": "PostalAddress",
      streetAddress: "Avni Akyol Bulvarı Sofa Evleri B5 Blok D:37",
      addressLocality: "Bahçeşehir",
      addressRegion: "İstanbul",
      addressCountry: "TR",
    },
    areaServed: { "@type": "Place", name: "Bahçeşehir, İstanbul" },
    openingHours: ["Mo-Fr 09:00-18:00", "Sa 12:00-18:00"],
  };
  return (
    <div className="bg-background text-foreground">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-border">
        <div className="site-container flex items-center justify-between gap-4 h-24">
          <a href="/" aria-label="Leyla Ayar ana sayfa">
            <img
              src="/leylaayar.png"
              alt="Fizyoterapist Leyla Ayar"
              className="w-[188px] sm:w-[210px] h-auto"
              width="210"
              height="83"
            />
          </a>
          <nav
            className="hidden xl:flex items-center gap-6"
            aria-label="Ana menü"
          >
            {NAV.map(([label, href]) => (
              <a
                key={href}
                href={href}
                className="text-sm font-semibold text-muted-foreground hover:text-primary"
              >
                {label}
              </a>
            ))}
          </nav>
          <a
            href={`tel:${BRAND.telephone}`}
            className="brand-button hidden sm:inline-flex"
          >
            <Phone size={16} />
            <span>{BRAND.phone}</span>
          </a>
          <button
            className="xl:hidden p-3 rounded-xl bg-secondary text-primary"
            onClick={() => setMenu(!menu)}
            aria-label={menu ? "Menüyü kapat" : "Menüyü aç"}
            aria-expanded={menu}
            aria-controls="mobile-menu"
          >
            {menu ? <X /> : <Menu />}
          </button>
        </div>
        {menu && (
          <nav
            id="mobile-menu"
            aria-label="Mobil menü"
            className="xl:hidden site-container pb-5 flex flex-col gap-4"
          >
            {NAV.map(([label, href]) => (
              <a key={href} href={href} onClick={() => setMenu(false)}>
                {label}
              </a>
            ))}
            <a href={`tel:${BRAND.telephone}`}>{BRAND.phone}</a>
          </nav>
        )}
      </header>
      <main>
        <section
          id="anasayfa"
          className="brand-hero text-white overflow-hidden"
        >
          <div className="site-container grid lg:grid-cols-2 gap-12 items-center py-16 lg:py-24">
            <div>
              <span className="section-badge section-badge-light">
                BAHÇEŞEHİR · İSTANBUL
              </span>
              <p className="font-semibold text-white/70 mb-5">
                Uzman Fizyoterapist Leyla Ayar
              </p>
              <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-extrabold leading-[1.15] mb-7">
                Bahçeşehir’de Fizyoterapist Eşliğinde{" "}
                <span className="text-[#b8ddcd]">Klinik Pilates</span>
              </h1>
              <p className="text-lg leading-relaxed text-white/75 mb-9 max-w-xl">
                Hareketi hayatınıza güvenle katın. Fizyoterapi, klinik pilates
                ve rehabilitasyon sürecinizi ihtiyaçlarınıza, günlük yaşamınıza
                ve hedeflerinize göre birlikte planlayalım.
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href="#iletisim"
                  className="brand-button bg-white! text-primary!"
                >
                  Randevu Alın <ArrowRight size={18} />
                </a>
                <a
                  href="#hizmetler"
                  className="brand-button border border-white/30 bg-transparent!"
                >
                  Hizmetleri Keşfedin
                </a>
              </div>
              <div className="grid grid-cols-3 gap-4 mt-12 pt-8 border-t border-white/15">
                {[
                  ["Kişiye Özel", "Egzersiz planı"],
                  ["Uzman", "Fizyoterapist eşliği"],
                  ["Bahçeşehir", "Sofa Evleri"],
                ].map(([title, desc]) => (
                  <div key={title}>
                    <strong className="text-sm sm:text-base">{title}</strong>
                    <p className="text-xs mt-2 text-white/60">{desc}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative max-w-lg lg:ml-auto w-full">
              <img
                src="/leyla-ayar-about.png"
                alt="Uzman Fizyoterapist Leyla Ayar Bahçeşehir kliniğinde"
                className="w-full aspect-[4/5] object-cover rounded-[2rem] shadow-2xl"
                width="875"
                height="1024"
                loading="eager"
              />
              <div className="absolute bottom-5 left-5 right-5 rounded-2xl p-5 bg-white/95 text-primary flex gap-3 items-center shadow-lg">
                <Award className="shrink-0" size={32} />
                <div>
                  <strong className="text-sm">
                    Uzman Fizyoterapist Leyla Ayar
                  </strong>
                  <p className="text-xs mt-1 text-muted-foreground">
                    Bilimsel yaklaşım · Bireysel değerlendirme
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="hakkimizda" className="py-24">
          <div className="site-container grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <span className="section-badge">Hakkımızda</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold mb-6">
                Bahçeşehir’de kişiye özel fizyoterapi yaklaşımı
              </h2>
              <p className="body-copy mb-5">
                Leyla Ayar, Okan Üniversitesi Fizyoterapi ve Rehabilitasyon
                Bölümü’ndeki lisans eğitimini 2016’da, yüksek lisansını ise
                2019’da tamamlamıştır. Hastane ve özel klinik deneyimlerini
                Bahçeşehir’deki kliniğinde danışanlarıyla buluşturmaktadır.
              </p>
              <p className="body-copy">
                Değerlendirmeden egzersiz planına uzanan süreçte hareket
                kapasitenizi, duruşunuzu ve günlük yaşam alışkanlıklarınızı
                birlikte ele alıyoruz. Hedefimiz, bedeninizi daha iyi tanımanıza
                ve sürdürülebilir hareket alışkanlıkları geliştirmenize destek
                olmak.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                [
                  Activity,
                  "Bireysel Değerlendirme",
                  "Hareket ihtiyaçlarınız ve hedeflerinizle başlıyoruz.",
                ],
                [
                  Heart,
                  "Kişiye Özel Plan",
                  "Programınızı günlük yaşamınıza göre uyarlıyoruz.",
                ],
                [
                  Shield,
                  "Bilimsel Yaklaşım",
                  "Değerlendirmeyi ve mesleki bilgiyi bir araya getiriyoruz.",
                ],
                [
                  CheckCircle,
                  "Düzenli Takip",
                  "Gelişiminize göre programınızı gözden geçiriyoruz.",
                ],
              ].map(([Icon, title, text]) => {
                const I = Icon as typeof Activity;
                return (
                  <div className="brand-card" key={String(title)}>
                    <I className="text-primary mb-4" />
                    <h3 className="font-bold mb-2">{String(title)}</h3>
                    <p className="text-sm body-copy">{String(text)}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
        <section id="hizmetler" className="py-24 bg-secondary">
          <div className="site-container">
            <Heading
              badge="Terapi Alanlarımız"
              title="Bahçeşehir fizyoterapi ve pilates hizmetleri"
              text="Her bireyin hareket ihtiyacı farklıdır. Size uygun başlangıç noktasını birlikte belirleyelim."
            />
            <div
              className="flex flex-wrap justify-center gap-2 mb-10"
              role="group"
              aria-label="Hizmet kategorileri"
            >
              {[
                "Tümü",
                "Fizyoterapi",
                "Pilates",
                "Ayak sağlığı",
                "Sağlıklı yaşam",
              ].map((c) => (
                <button
                  key={c}
                  onClick={() => setCategory(c)}
                  aria-pressed={category === c}
                  className={`rounded-full px-5 py-3 text-sm font-semibold transition-colors ${category === c ? "bg-primary text-white" : "bg-white text-primary hover:bg-primary/10"}`}
                >
                  {c}
                </button>
              ))}
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {SERVICES.filter(
                (s) => category === "Tümü" || s.category === category,
              ).map((s) => {
                const Icon = icons[s.icon as keyof typeof icons];
                return (
                  <article className="brand-card flex flex-col" key={s.title}>
                    <div className="w-12 h-12 bg-secondary text-primary rounded-xl flex items-center justify-center mb-6">
                      <Icon />
                    </div>
                    <h3 className="font-bold text-lg mb-3">{s.title}</h3>
                    <p className="text-sm body-copy mb-6 grow">{s.text}</p>
                    <a
                      href="#iletisim"
                      className="inline-flex items-center gap-2 text-sm font-bold text-primary"
                    >
                      Bilgi ve Randevu <ArrowRight size={16} />
                    </a>
                  </article>
                );
              })}
            </div>
          </div>
        </section>
        <section id="taban-analizi" className="py-24">
          <div className="site-container grid lg:grid-cols-2 gap-12 items-center">
            <div className="rounded-3xl bg-secondary p-8 sm:p-12">
              <Footprints size={46} className="text-primary mb-6" />
              <span className="section-badge">Ayak Sağlığı ve Hareket</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold mb-5">
                Bahçeşehir taban analizi
              </h2>
              <p className="body-copy">
                Ayak basışınızı tek başına değil, duruş ve yürüyüş düzeninizle
                birlikte değerlendiriyoruz. Analiz sonrasında egzersiz yaklaşımı
                ve gerekli görülen kişiye özel destek seçenekleri hakkında bilgi
                alabilirsiniz.
              </p>
              <a href="#iletisim" className="brand-button mt-7">
                Taban Analizi İçin Ulaşın <ArrowRight size={18} />
              </a>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-6">
                Ortopedik tabanlık, ortez ve protez rehberleri
              </h3>
              <p className="body-copy mb-6">
                Kişiye özel tabanlık, FootBalance, AFO — ayak bileği ortezi, alt
                ekstremite protezi ve üst ekstremite protezi gibi konuların
                hareket ve rehabilitasyonla ilişkisini blogumuzda ele alıyoruz.
              </p>
              <p className="body-copy mb-7">
                Cihaz seçimi ve teknik uygulama ilgili hekim ve yetkili ortez
                protez merkezi tarafından değerlendirilmelidir. Blogdaki SGK
                anlaşmalı ortez protez bilgileri genel başvuru rehberidir.
              </p>
              <div className="flex flex-wrap gap-2">
                {[
                  "Ortez",
                  "Protez",
                  "Ortopedik tabanlık",
                  "Ayak analizi",
                  "Kişiye özel tabanlık",
                  "FootBalance",
                  "Diz protezi",
                  "Biyonik kol",
                ].map((t) => (
                  <a
                    key={t}
                    href="/blog"
                    className="rounded-full border border-primary/15 px-3 py-2 text-xs font-semibold text-primary hover:bg-secondary"
                  >
                    {t}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>
        <section id="surec" className="py-24 brand-hero text-white">
          <div className="site-container">
            <div className="max-w-2xl mx-auto text-center mb-12">
              <span className="section-badge section-badge-light">
                Birlikte Planlıyoruz
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold">
                İlk görüşmeden düzenli takibe
              </h2>
            </div>
            <div className="grid sm:grid-cols-3 gap-8">
              {[
                [
                  "01",
                  "Tanışma ve Değerlendirme",
                  "Sağlık geçmişinizi, hareket ihtiyaçlarınızı ve ulaşmak istediğiniz hedefleri konuşuyoruz.",
                ],
                [
                  "02",
                  "Kişisel Program",
                  "Değerlendirmeye uygun fizyoterapi, klinik pilates veya egzersiz yaklaşımını belirliyoruz.",
                ],
                [
                  "03",
                  "Takip ve Uyarlama",
                  "Seanslar boyunca gelişiminizi izleyerek programın içeriğini ve yoğunluğunu düzenliyoruz.",
                ],
              ].map(([n, t, d]) => (
                <div key={n} className="border-t border-white/25 pt-6">
                  <span className="text-4xl font-extrabold text-[#b8ddcd]">
                    {n}
                  </span>
                  <h3 className="font-bold text-xl mt-5 mb-3">{t}</h3>
                  <p className="text-white/70 leading-relaxed text-sm">{d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="py-24" id="blog">
          <div className="site-container">
            <Heading
              badge="Blog ve Rehberler"
              title="Hareket ve sağlıklı yaşam üzerine"
              text="Fizyoterapi ve klinik pilatesin yanı sıra ortez, protez ve tabanlık konularındaki rehberleri keşfedin."
            />
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {BLOG_POSTS.slice(0, 4).map((p) => (
                <article
                  className="brand-card p-0! overflow-hidden flex flex-col"
                  key={p.slug}
                >
                  <img
                    src={p.coverImage}
                    alt={p.title}
                    loading="lazy"
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6 flex flex-col grow">
                    <span className="text-xs font-bold text-primary mb-3">
                      {p.category}
                    </span>
                    <h3 className="font-bold mb-3">
                      <a href={`/blog/${p.slug}`}>{p.title}</a>
                    </h3>
                    <p className="text-sm body-copy grow mb-5">{p.excerpt}</p>
                    <a
                      href={`/blog/${p.slug}`}
                      className="text-sm font-bold text-primary inline-flex gap-2 items-center"
                    >
                      Yazıyı Oku <ArrowRight size={16} />
                    </a>
                  </div>
                </article>
              ))}
            </div>
            <div className="text-center mt-9">
              <a href="/blog" className="brand-button">
                Tüm Rehberler <ArrowRight size={18} />
              </a>
            </div>
          </div>
        </section>
        <section className="py-24 bg-secondary" id="sikca-sorulan-sorular">
          <div className="site-container max-w-4xl">
            <Heading badge="Merak Ettikleriniz" title="Sıkça sorulan sorular" />
            <div className="space-y-3">
              {FAQ.map(([q, a]) => (
                <details key={q} className="brand-card group">
                  <summary className="cursor-pointer font-bold leading-relaxed">
                    {q}
                  </summary>
                  <p className="body-copy pt-4 text-sm">{a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
        <section id="iletisim" className="py-24">
          <div className="site-container">
            <Heading
              badge="İletişim ve Randevu"
              title="İletişim Bilgileri"
              text="İhtiyaçlarınızı konuşmak ve randevu planlamak için bize ulaşın."
            />
            <div className="grid lg:grid-cols-2 gap-8">
              <div className="brand-card space-y-7">
                <div className="flex gap-4">
                  <MapPin className="text-primary shrink-0" />
                  <div>
                    <h3 className="font-bold mb-2">Adres</h3>
                    <p className="body-copy">{BRAND.address}</p>
                    <a
                      className="text-sm font-bold text-primary inline-block mt-3"
                      target="_blank"
                      rel="noopener noreferrer"
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent("Leyla Ayar " + BRAND.address)}`}
                    >
                      Yol Tarifi Alın ↗
                    </a>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Phone className="text-primary" />
                  <a className="font-semibold" href={`tel:${BRAND.telephone}`}>
                    {BRAND.phone}
                  </a>
                </div>
                <div className="flex gap-4">
                  <Mail className="text-primary" />
                  <a href={`mailto:${BRAND.email}`}>{BRAND.email}</a>
                </div>
                <div className="flex gap-4">
                  <Clock className="text-primary shrink-0" />
                  <div>
                    <h3 className="font-bold mb-2">Çalışma Saatleri</h3>
                    <p className="body-copy text-sm">
                      {BRAND.hours.weekdays}
                      <br />
                      {BRAND.hours.saturday}
                      <br />
                      {BRAND.hours.sunday}
                    </p>
                  </div>
                </div>
                <ContactButtons />
              </div>
              <div className="brand-card bg-secondary! flex flex-col justify-center">
                <span className="section-badge self-start">
                  Bahçeşehir · Sofa Evleri
                </span>
                <h3 className="text-3xl font-extrabold mb-5">
                  Sağlıklı hareket için ilk adımı birlikte atalım.
                </h3>
                <p className="body-copy mb-7">
                  Bahçeşehir fizyoterapist, klinik pilates, omurga sağlığı,
                  ortopedik rehabilitasyon ve taban analizi ihtiyaçlarınız için
                  randevu oluşturabilirsiniz.
                </p>
                <a
                  href={BRAND.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-primary"
                >
                  Instagram’da takip edin · @fzt.leylaayar ↗
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="brand-hero text-white py-12">
        <div className="site-container">
          <div className="grid md:grid-cols-3 gap-9 pb-9 border-b border-white/15">
            <div>
              <a href="/">
                <img
                  src="/leylaayar.png"
                  width="210"
                  height="83"
                  alt="Fizyoterapist Leyla Ayar"
                  className="bg-white rounded-xl p-3 mb-5"
                  loading="lazy"
                />
              </a>
              <p className="text-white/65 text-sm leading-relaxed">
                Bahçeşehir’de kişiye özel fizyoterapi, klinik pilates ve
                sağlıklı yaşam yaklaşımı.
              </p>
            </div>
            <div>
              <h2 className="font-bold mb-5">Hızlı Bağlantılar</h2>
              <div className="flex flex-col gap-3 text-sm text-white/70">
                {NAV.map(([label, href]) => (
                  <a key={href} href={href}>
                    {label}
                  </a>
                ))}
              </div>
            </div>
            <div>
              <h2 className="font-bold mb-5">İletişim</h2>
              <address className="not-italic text-white/70 text-sm leading-relaxed mb-4">
                {BRAND.address}
              </address>
              <a href={`tel:${BRAND.telephone}`}>{BRAND.phone}</a>
              <p className="mt-3 text-sm">
                <a href={`mailto:${BRAND.email}`}>{BRAND.email}</a>
              </p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row justify-between gap-5 pt-7 text-xs text-white/60">
            <p>
              © {new Date().getFullYear()} Fizyoterapist Leyla Ayar. Tüm hakları
              saklıdır.
            </p>
            <div className="flex flex-wrap gap-4">
              {[
                ["KVKK", "/kvkk"],
                ["Gizlilik", "/gizlilik-politikasi"],
                ["Çerezler", "/cerez-politikasi"],
                ["Kullanım Koşulları", "/kullanim-kosullari"],
              ].map(([t, u]) => (
                <a href={u} key={u}>
                  {t}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
      <div className="fixed right-5 bottom-24 z-40 flex flex-col gap-3">
        <a
          href="#anasayfa"
          className="rounded-full p-3 bg-white text-primary shadow-lg border border-border"
          aria-label="Sayfanın başına dön"
        >
          <ArrowUp size={21} />
        </a>
        <a
          href={BRAND.whatsapp}
          className="rounded-full p-4 bg-primary text-white shadow-xl"
          aria-label="WhatsApp ile iletişim"
        >
          <MessageCircle size={26} />
        </a>
      </div>
    </div>
  );
}
