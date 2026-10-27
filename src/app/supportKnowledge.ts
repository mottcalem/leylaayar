import { BRAND, SERVICES } from "./brand";

export type SupportReply = {
  text: string;
  links?: { label: string; href: string }[];
};
export const SUPPORT_SUGGESTIONS = [
  "Hangi hizmetler var?",
  "Adresiniz nerede?",
  "Çalışma saatleri",
  "Nasıl randevu alabilirim?",
];
const contact = [
  { label: "WhatsApp ile ulaşın", href: BRAND.whatsapp },
  { label: BRAND.phone, href: `tel:${BRAND.telephone}` },
];
function normalize(value: string) {
  return value
    .toLocaleLowerCase("tr-TR")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ı/g, "i")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}
export function getSupportReply(question: string): SupportReply {
  const q = normalize(question);
  const has = (...terms: string[]) => terms.some((term) => q.includes(term));
  if (!q)
    return {
      text: "Hizmetlerimiz, adresimiz, çalışma saatlerimiz veya randevu hakkında soru sorabilirsiniz.",
    };
  if (has("fiyat", "ucret", "kac tl", "ne kadar", "paket", "indirim"))
    return {
      text: "Sitede güncel ücret veya paket bilgisi yer almıyor. İlgilendiğiniz hizmetin ücretini öğrenmek için kliniğe ulaşabilirsiniz.",
      links: contact,
    };
  if (has("sgk", "sigorta"))
    return {
      text: "Kliniğin SGK anlaşması veya geri ödeme koşulları hakkında doğrulanmış bir bilgi paylaşamıyorum. Ayrıntılar için kliniğe ulaşabilirsiniz.",
      links: contact,
    };
  if (has("randevu", "rezervasyon", "musait", "bos saat", "seans ayir"))
    return {
      text: `Randevu için ${BRAND.phone} numaralı telefondan veya WhatsApp üzerinden iletişime geçebilirsiniz. Uygun gün ve saat klinikle görüşülerek belirlenir; bu sohbet üzerinden randevu oluşturulmuyor.`,
      links: contact,
    };
  if (
    has(
      "saat",
      "kacta",
      "acik",
      "kapali",
      "pazar",
      "cumartesi",
      "hafta sonu",
      "calisma",
      "kapan",
    )
  )
    return {
      text: `Çalışma saatlerimiz: ${BRAND.hours.weekdays}; ${BRAND.hours.saturday}; ${BRAND.hours.sunday}. Ziyaretiniz öncesinde randevunuzu klinikle doğrulayabilirsiniz.`,
      links: contact,
    };
  if (
    has(
      "adres",
      "nerede",
      "nerdes",
      "konum",
      "ulasim",
      "yol tarif",
      "nasil gel",
      "otopark",
    )
  )
    return {
      text: `Adresimiz: ${BRAND.address}. Ulaşım ve bina girişi hakkında ek bilgi için bizi arayabilirsiniz.`,
      links: [
        {
          label: "Haritada görüntüleyin",
          href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent("Leyla Ayar " + BRAND.address)}`,
        },
      ],
    };
  if (
    has(
      "telefon",
      "numara",
      "iletisim",
      "whatsapp",
      "e posta",
      "eposta",
      "mail",
    )
  )
    return {
      text: `Telefon: ${BRAND.phone}. E-posta: ${BRAND.email}. WhatsApp üzerinden de ulaşabilirsiniz.`,
      links: [
        ...contact,
        { label: "E-posta gönderin", href: `mailto:${BRAND.email}` },
      ],
    };
  if (has("leyla", "kimdir", "egitim", "mezun", "deneyim", "hakkimizda"))
    return {
      text: "Uzman Fizyoterapist Leyla Ayar, Okan Üniversitesi Fizyoterapi ve Rehabilitasyon Bölümü’nden 2016’da mezun olmuş, 2019’da yüksek lisansını tamamlamıştır. Hastane ve özel klinik deneyimlerinin ardından Bahçeşehir’deki kliniğinde danışanlarıyla çalışmaktadır.",
      links: [{ label: "Hakkımızda", href: "/#hakkimizda" }],
    };
  if (has("ilk gorus", "ilk seans", "ne getirm", "degerlendirme"))
    return {
      text: "İlk görüşmede sağlık geçmişiniz, hareket ihtiyaçlarınız ve hedefleriniz konuşulur. Postür ve hareket kapasitesi değerlendirilerek kişiye özel süreç planlanır. Varsa hekim raporlarınızı yanınızda getirebilirsiniz.",
      links: contact,
    };
  const service = [...SERVICES]
    .sort((a, b) => b.title.length - a.title.length)
    .find(
      (s) =>
        q.includes(normalize(s.title)) ||
        (s.title === "Hamilelik Pilatesi" && has("hamile", "gebe")) ||
        (s.title === "Taban Analizi" && has("tabanlik", "ayak analizi", "footbalance")) ||
        
        (s.title === "Ortopedik Rehabilitasyon" && has("rehabilitasyon")),
    );
  if (service)
    return {
      text: `${service.title}: ${service.text}`,
      links: [
        { label: "Hizmetleri inceleyin", href: "/#hizmetler" },
        ...contact,
      ],
    };
  if (has("hizmet", "terapi", "neler var", "neler yapi", "fizyoterapi"))
    return {
      text: `Hizmetlerimiz: ${SERVICES.map((s) => s.title).join(", ")}. Hangi hizmet hakkında bilgi almak istersiniz?`,
      links: [{ label: "Tüm hizmetler", href: "/#hizmetler" }],
    };
  if (has("agri", "tedavi", "fitik", "egzersiz", "tani", "ilac", "hastalik"))
    return {
      text: "Size uygun yaklaşım bireysel değerlendirmeyle belirlenir. Bu bilgi asistanı tanı koyamaz veya kişisel tedavi ve egzersiz öneremez. Şikâyetlerinizi değerlendirmek için bir sağlık uzmanıyla görüşebilirsiniz.",
      links: contact,
    };
  if (has("merhaba", "selam", "iyi gun", "tesekkur"))
    return {
      text: "Merhaba! Leyla Ayar bilgi asistanına hoş geldiniz. Hizmetler, adres, çalışma saatleri ve randevu hakkında yardımcı olabilirim.",
    };
  return {
    text: "Bu konuda sitede doğrulanmış bir bilgi bulamıyorum. Hizmetler, adres, çalışma saatleri veya randevu hakkında soru sorabilirsiniz. Daha ayrıntılı bilgi için kliniğe ulaşabilirsiniz.",
    links: contact,
  };
}
