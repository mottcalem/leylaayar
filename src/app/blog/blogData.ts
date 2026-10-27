export type BlogSection = {
  id: string;
  heading: string;
  level: 2 | 3;
  content: string[];
};

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  sections: BlogSection[];
  category: string;
  tags: string[];
  readingTime: number;
  publishedAt: string;
  updatedAt?: string;
  author: string;
  metaDescription: string;
  keywords: string[];
  featured?: boolean;
  coverColor: string;
  coverImage: string;
};

export const BLOG_POSTS: BlogPost[] = [
  {
    "slug": "bahcesehir-fizyoterapist-kisiye-ozel-degerlendirme",
    "title": "Bahçeşehir Fizyoterapist: Kişiye Özel Değerlendirme ve Hareket Planı",
    "excerpt": "Bahçeşehir’de fizyoterapist arayanlar için ilk görüşme, hareket değerlendirmesi ve kişiye özel planlama süreci.",
    "category": "Fizyoterapi",
    "tags": [
      "bahçeşehir fizyoterapist",
      "bahçeşehir fizyoterapi",
      "rehabilitasyon",
      "kişiye özel egzersiz"
    ],
    "readingTime": 3,
    "publishedAt": "2026-10-24",
    "author": "Leyla Ayar Bilgilendirme",
    "metaDescription": "Bahçeşehir’de fizyoterapist arayanlar için ilk görüşme, hareket değerlendirmesi ve kişiye özel planlama süreci.",
    "keywords": [
      "bahçeşehir fizyoterapist",
      "bahçeşehir fizyoterapi",
      "rehabilitasyon",
      "kişiye özel egzersiz"
    ],
    "featured": true,
    "coverColor": "#153c33",
    "coverImage": "/leyla-ayar-about.png",
    "sections": [
      {
        "id": "bolum-1",
        "heading": "İlk görüşme nasıl ilerler?",
        "level": 2,
        "content": [
          "Görüşmeye mevcut şikâyetlerinizi, günlük hareket alışkanlıklarınızı ve beklentilerinizi konuşarak başlanır. Varsa hekim raporlarınız ve önceki uygulamalarınıza ilişkin bilgileri yanınızda getirebilirsiniz."
        ]
      },
      {
        "id": "bolum-2",
        "heading": "Kişiye özel planlama",
        "level": 2,
        "content": [
          "Postür ve hareket değerlendirmesi sonrasında egzersiz hedefleri birlikte belirlenir. Çalışmanın içeriği ve ilerleme hızı kişisel ihtiyaçlara göre düzenlenir; her danışan için aynı program uygulanmaz."
        ]
      },
      {
        "id": "bolum-3",
        "heading": "Bahçeşehir’de randevu ve takip",
        "level": 2,
        "content": [
          "Leyla Ayar kliniği Bahçeşehir Sofa Evleri’ndedir. Randevu için 0534 307 00 48 numaralı telefondan ulaşabilir, fizyoterapi ve egzersiz danışmanlığı hakkında bilgi alabilirsiniz."
        ]
      }
    ]
  },
  {
    "slug": "bahcesehir-klinik-pilates-fizyoterapist-esliginde",
    "title": "Bahçeşehir Klinik Pilates: Fizyoterapist Eşliğinde Egzersiz",
    "excerpt": "Klinik pilatesin değerlendirme, bireysel program ve düzenli takip adımlarını tanıyın.",
    "category": "Pilates",
    "tags": [
      "bahçeşehir klinik pilates",
      "fizyoterapist eşliğinde klinik pilates",
      "bahçeşehir pilates",
      "postür"
    ],
    "readingTime": 3,
    "publishedAt": "2026-10-24",
    "author": "Leyla Ayar Bilgilendirme",
    "metaDescription": "Klinik pilatesin değerlendirme, bireysel program ve düzenli takip adımlarını tanıyın.",
    "keywords": [
      "bahçeşehir klinik pilates",
      "fizyoterapist eşliğinde klinik pilates",
      "bahçeşehir pilates",
      "postür"
    ],
    "featured": true,
    "coverColor": "#153c33",
    "coverImage": "/blog-klinik-pilates.jpg",
    "sections": [
      {
        "id": "bolum-1",
        "heading": "Klinik pilates yaklaşımı",
        "level": 2,
        "content": [
          "Klinik pilateste egzersizler, fizyoterapi değerlendirmesi ile belirlenen ihtiyaçlara göre uyarlanır. Beden farkındalığı, hareket kontrolü ve kas dengesi gibi hedefler kişisel planın parçaları olabilir."
        ]
      },
      {
        "id": "bolum-2",
        "heading": "Program nasıl belirlenir?",
        "level": 2,
        "content": [
          "Günlük yaşamınız, hareket deneyiminiz ve mevcut yakınmalarınız değerlendirilir. Egzersiz seçimi ile seansların yoğunluğu bu değerlendirmeye göre planlanır ve süreç içinde gözden geçirilir."
        ]
      },
      {
        "id": "bolum-3",
        "heading": "Bahçeşehir’de klinik pilates",
        "level": 2,
        "content": [
          "Leyla Ayar kliniğinde klinik pilates ve pilates seansları hakkında bilgi almak için iletişime geçebilirsiniz. Hamilelik pilatesi talebinde gebelik takibini yapan hekimin görüşü ve bireysel uygunluk değerlendirmesi dikkate alınır."
        ]
      }
    ]
  },
  {
    "slug": "bahcesehir-taban-analizi-ortopedik-tabanlik",
    "title": "Bahçeşehir Taban Analizi ve Ortopedik Tabanlık Rehberi",
    "excerpt": "Ayak basışı, duruş, yürüyüş ve kişiye özel tabanlık konularını birlikte ele alan başlangıç rehberi.",
    "category": "Tabanlık",
    "tags": [
      "bahçeşehir taban analizi",
      "bahçeşehir ayak analizi",
      "ortopedik tabanlık bahçeşehir",
      "kişiye özel tabanlık",
      "FootBalance"
    ],
    "readingTime": 3,
    "publishedAt": "2026-10-24",
    "author": "Leyla Ayar Bilgilendirme",
    "metaDescription": "Ayak basışı, duruş, yürüyüş ve kişiye özel tabanlık konularını birlikte ele alan başlangıç rehberi.",
    "keywords": [
      "bahçeşehir taban analizi",
      "bahçeşehir ayak analizi",
      "ortopedik tabanlık bahçeşehir",
      "kişiye özel tabanlık",
      "FootBalance"
    ],
    "featured": true,
    "coverColor": "#153c33",
    "coverImage": "/footbalance-tabanlik.webp",
    "sections": [
      {
        "id": "bolum-1",
        "heading": "Taban analizi neden değerlendirilir?",
        "level": 2,
        "content": [
          "Ayak basışı, kişinin duruş ve yürüme alışkanlıklarıyla birlikte ele alınır. Değerlendirme sırasında günlük aktivite, ayakkabı kullanımı ve varsa mevcut şikâyetler paylaşılır."
        ]
      },
      {
        "id": "bolum-2",
        "heading": "Ortopedik tabanlık ve kişiye özel yaklaşım",
        "level": 2,
        "content": [
          "Kliniğimizde kişiye özel FootBalance tabanlık hizmeti sunulmaktadır. Ayak basışı, günlük hareket alışkanlıkları ve ayakkabı kullanımı değerlendirilerek kişiye uygun tabanlık uygulaması planlanır."
        ]
      },
      {
        "id": "randevu",
        "heading": "Kişiye özel FootBalance tabanlık randevusu",
        "level": 2,
        "content": [
          "Bahçeşehir’deki Leyla Ayar kliniğinde taban analizi ve kişiye özel FootBalance tabanlık hizmeti hakkında bilgi almak için 0534 307 00 48 numaralı telefondan ulaşabilirsiniz."
        ]
      }
    ]
  },
  {
    "slug": "bahcesehir-ortopedik-rehabilitasyon-omurga-sagligi",
    "title": "Bahçeşehir Ortopedik Rehabilitasyon ve Omurga Sağlığı",
    "excerpt": "Ortopedik rehabilitasyonda kişisel hedefler, omurga sağlığı ve hareket takibine dair bilgiler.",
    "category": "Rehabilitasyon",
    "tags": [
      "bahçeşehir ortopedik rehabilitasyon",
      "bahçeşehir rehabilitasyon",
      "omurga sağlığı"
    ],
    "readingTime": 3,
    "publishedAt": "2026-10-24",
    "author": "Leyla Ayar Bilgilendirme",
    "metaDescription": "Ortopedik rehabilitasyonda kişisel hedefler, omurga sağlığı ve hareket takibine dair bilgiler.",
    "keywords": [
      "bahçeşehir ortopedik rehabilitasyon",
      "bahçeşehir rehabilitasyon",
      "omurga sağlığı"
    ],
    "featured": true,
    "coverColor": "#153c33",
    "coverImage": "/hero-foot-analysis.jpg",
    "sections": [
      {
        "id": "bolum-1",
        "heading": "Hareket hedefleri nasıl belirlenir?",
        "level": 2,
        "content": [
          "Ameliyat veya yaralanma sonrası süreçte hekim önerileri, mevcut hareket kapasitesi ve günlük yaşam hedefleri birlikte değerlendirilir. Programın içeriği kişinin ihtiyaçları doğrultusunda planlanır."
        ]
      },
      {
        "id": "bolum-2",
        "heading": "Omurga sağlığı ve postür",
        "level": 2,
        "content": [
          "Uzun süre oturma, çalışma düzeni ve günlük hareket alışkanlıkları değerlendirmede ele alınabilir. Egzersiz ve beden farkındalığı çalışmaları kişiye uygun bir program içinde düzenlenir."
        ]
      }
    ]
  },
  {
    "slug": "footbalance-ortopedik-tabanlik-kimlere-uygun",
    "title": "FootBalance Ortopedik Tabanlık: Kimler İçin Uygundur ve Nasıl Çalışır?",
    "excerpt": "Bahçeşehir’de kişiye özel FootBalance tabanlık hizmeti, bireysel değerlendirme ve uygulama süreci hakkında bilgi alın.",
    "category": "Tabanlık",
    "tags": [
      "FootBalance",
      "ortopedik tabanlık",
      "düz tabanlık",
      "plantar fasiit",
      "ayak ağrısı"
    ],
    "readingTime": 3,
    "publishedAt": "2026-06-02",
    "author": "Leyla Ayar Bilgilendirme",
    "updatedAt": "2026-10-24",
    "metaDescription": "Bahçeşehir’de kişiye özel FootBalance tabanlık hizmeti, bireysel değerlendirme ve uygulama süreci hakkında bilgi alın.",
    "keywords": [
      "footbalance tabanlık",
      "ortopedik tabanlık bahçeşehir",
      "kişiye özel tabanlık",
      "düz tabanlık tedavisi",
      "plantar fasiit tabanlık"
    ],
    "featured": true,
    "coverColor": "#2f6b57",
    "coverImage": "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200&q=80&auto=format&fit=crop",
    "sections": [
      {
        "id": "footbalance",
        "heading": "Kişiye özel FootBalance tabanlık",
        "level": 2,
        "content": [
          "Leyla Ayar kliniğinde kişiye özel FootBalance tabanlık hizmeti sunulmaktadır. Tabanlık uygulaması kişinin ayak yapısı, günlük aktivitesi ve ayakkabı kullanımı dikkate alınarak planlanır."
        ]
      },
      {
        "id": "degerlendirme",
        "heading": "Bireysel değerlendirme",
        "level": 2,
        "content": [
          "İlk görüşmede ayak basışınız, duruş ve yürüyüş alışkanlıklarınız ile tabanlıktan beklentileriniz birlikte ele alınır. Varsa mevcut tabanlığınızı ve hekim raporlarınızı yanınızda getirebilirsiniz."
        ]
      },
      {
        "id": "uygulama",
        "heading": "Uygulama ve uyum",
        "level": 2,
        "content": [
          "FootBalance tabanlık kişiye özel olarak şekillendirilir. Ayakkabı içindeki uyumu ve kullanım konforu değerlendirilir; kullanım ve takip hakkında bilgi verilir."
        ]
      },
      {
        "id": "randevu",
        "heading": "Bahçeşehir’de FootBalance randevusu",
        "level": 2,
        "content": [
          "Kişiye özel FootBalance tabanlık hizmetimiz hakkında bilgi ve randevu için 0534 307 00 48 numaralı telefondan veya WhatsApp üzerinden iletişime geçebilirsiniz."
        ]
      }
    ]
  },
  {
    "slug": "plantar-fasiit-duz-tabanlik-ortopedik-tabanlik-tedavisi",
    "title": "Plantar Fasiit ve Düz Tabanlık: Ortopedik Tabanlık ile Tedavi",
    "excerpt": "Topuk ağrısının en sık nedeni plantar fasiitin ve düz tabanlığın (pes planus) ortopedik tabanlık ile konservatif tedavisi.",
    "category": "Tabanlık",
    "tags": [
      "plantar fasiit",
      "düz tabanlık",
      "topuk ağrısı",
      "pes planus",
      "ortopedik tabanlık"
    ],
    "readingTime": 7,
    "publishedAt": "2026-06-08",
    "author": "Leyla Ayar Bilgilendirme",
    "updatedAt": "2026-10-24",
    "metaDescription": "Plantar fasiit ve düz tabanlık (pes planus) tedavisinde ortopedik tabanlığın rolü, egzersiz protokolleri ve Bahçeşehir’de tedavi seçenekleri.",
    "keywords": [
      "plantar fasiit tedavisi",
      "düz tabanlık tedavisi",
      "topuk ağrısı",
      "pes planus bahçeşehir",
      "ayak tabanı ağrısı"
    ],
    "featured": false,
    "coverColor": "#1a7a5e",
    "coverImage": "https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?w=1200&q=80&auto=format&fit=crop",
    "sections": [
      {
        "id": "plantar-fasiit-nedir",
        "heading": "Plantar Fasiit Nedir?",
        "level": 2,
        "content": [
          "Plantar fasya; topuk kemiğini (kalkaneüs) ön ayağa bağlayan kalın bağ dokusudur. Plantar fasiit, bu yapının aşırı gerilmesi veya tekrarlayan mikrotravmalara maruz kalması sonucu oluşan iltihaplanma durumudur.",
          "Sabah yataktan ilk kalktığınızda hissedilen topuk ağrısı plantar fasiitin en karakteristik belirtisidir. Bu ağrı ilk adımlardan sonra hafifler; ancak uzun süre ayakta kaldıktan ya da oturma sonrasında yeniden ortaya çıkabilir.",
          "Görülme sıklığı: Plantar fasiit, topuk ağrısının en yaygın nedenidir ve her yıl 2 milyondan fazla kişi bu tanıyı almaktadır. Risk faktörleri arasında düz tabanlık, yüksek kavus, obezite, uzun süre ayakta çalışma ve uygunsuz ayakkabı seçimi sayılabilir."
        ]
      },
      {
        "id": "duz-tabanlik-nedir",
        "heading": "Düz Tabanlık (Pes Planus) Nedir?",
        "level": 2,
        "content": [
          "Düz tabanlık, ayağın iç kenar arkının kısmen ya da tamamen çökmesi durumudur. İki ana formu bulunmaktadır: esnek (fonksiyonel) düz tabanlık ve rijit düz tabanlık. Esnek formda ayak dinlenirken düz görünürken parmak ucuna kalkışla ark kendiliğinden oluşur; rijit formda ise bu gerçekleşmez.",
          "Düz tabanlık tek başına her zaman sorun yaratmaz; ancak aşırı pronasyon (ayak içe dönüşü), diz içe dönüklüğü (genu valgum), kalça addüksiyonu ve bel ağrısıyla ilişkili olabilir. Bu zincirleme biyomekanik etkiyi kırmak için erken dönem ortopedik destek oldukça önemlidir."
        ]
      },
      {
        "id": "tabanlik-nasil-yardimci-olur",
        "heading": "Ortopedik Tabanlık Nasıl Yardımcı Olur?",
        "level": 2,
        "content": [
          "Kişiye özel ortopedik tabanlıklar, plantar fasiit ve düz tabanlık tedavisinde randomize kontrollü çalışmalarla etkinliği kanıtlanmış konservatif tedavi yöntemleri arasında yer almaktadır.",
          "Ark desteği: Medial longitudinal arkı destekleyen tabanlık, plantar fasya üzerindeki gerilimi azaltarak iltihaplanmayı baskılar ve yük dağılımını düzeltir.",
          "Topuk kupası: Kalın silikon veya EVA malzemeden üretilen topuk kupası, kalkaneüsü çevreler ve yağ yastığının laterale doğru yayılmasını önler. Bu sayede topuğun darbe emme kapasitesi artar.",
          "Aşırı pronasyon kontrolü: Medial ark ve rearfoot post bileşenleri bir arada, aşırı ayak içe dönüşünü kısıtlayarak alt ekstremite biyomekaniğini düzeltir."
        ]
      },
      {
        "id": "egzersiz-protokolu",
        "heading": "Egzersiz Protokolü ile Destekleme",
        "level": 2,
        "content": [
          "Ortopedik tabanlık, egzersiz ve fizik tedavi ile kombinlendiğinde çok daha etkin sonuçlar verir. Aşağıdaki egzersizler plantar fasiit ve düz tabanlık için günde iki kez uygulanabilir:",
          "Plantar fasya germe: Topukta ağrı hissetmeden önce sabah yataktan kalkmadan parmakları geriye doğru çekin ve 30 saniye tutun. 3 tekrar yapın.",
          "Baldır germe (gastrosoleus): Duvara yaslanarak düz ve hafif bükük diz pozisyonlarında baldır germe egzersizi plantar fasya üzerindeki gerilimi azaltır. Her pozisyon 30 sn / 3 tekrar.",
          "Kısa ayak egzersizi: Parmakları yere bastırarak ayak tabanını kısaltma hareketi intrinsik ayak kaslarını güçlendirir. Günde 2 × 10 tekrar önerilir."
        ]
      },
      {
        "id": "ayakkabi-secimi",
        "heading": "Doğru Ayakkabı Seçimi",
        "level": 2,
        "content": [
          "Ortopedik tabanlık ne kadar iyi seçilirse seçilsin yanlış ayakkabıyla birlikte kullanıldığında etkinliği azalır. Plantar fasiit ve düz tabanlıkta dikkat edilmesi gereken ayakkabı özellikleri:",
          "Taban yüksekliği: Topuğun ön ayaktan 8-12 mm yüksek olduğu ayakkabılar plantar fasya üzerindeki gerilimi azaltır. Sıfır tabanlı (minimalist) ayakkabılar plantar fasiit aktif fazında önerilmez.",
          "Torsiyonel sertlik: Ayakkabıyı karşılıklı iki elinizle bükerseniz orta bölgede kolayca bükülmemesi gerekir. Bu özellik midfoot desteği sağlar.",
          "Yeterli topuk derinliği: Tabanlığı barındırabilecek yeterli iç hacim olmalıdır. Dar burunlu ve düz tabanlı ayakkabılar bu ölçütleri karşılamaz."
        ]
      }
    ]
  }
];

export const BLOG_CATEGORIES = ["Tümü","Fizyoterapi","Pilates","Tabanlık","Rehabilitasyon"];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug.replace(/kutahyada/g, "bahcesehirde").replace(/kutahya/g, "bahcesehir"));
}

export function getRelatedPosts(current: BlogPost, count = 3): BlogPost[] {
  return BLOG_POSTS.filter(
    (p) => p.slug !== current.slug && (p.category === current.category || p.tags.some((t) => current.tags.includes(t)))
  ).slice(0, count);
}
