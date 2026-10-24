import { ArrowLeft, Phone, MessageCircle } from "lucide-react";
import { useCanonical } from "./hooks/useCanonical";

function LegalLayout({ title, children }: { title: string; children: React.ReactNode }) {
  useCanonical();
  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "Inter, sans-serif" }}>
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2 text-sm font-semibold text-primary hover:opacity-80 transition-opacity">
            <ArrowLeft className="w-4 h-4" />
            Ana Sayfa
          </a>
          <img src="/arikan-logo.png" alt="Arıkan Ortopedi - Ortez & Protez" className="h-10 w-auto object-contain" />
          <div className="flex items-center gap-3">
            <a href="tel:+902746000343" className="hidden sm:flex items-center gap-1.5 text-xs font-semibold text-primary">
              <Phone className="w-3.5 h-3.5" /> 0274 600 03 43
            </a>
            <a href="https://wa.me/905536660343" className="flex items-center gap-1.5 text-xs font-bold text-white bg-green-500 px-3 py-1.5 rounded-lg">
              <MessageCircle className="w-3.5 h-3.5" /> WhatsApp
            </a>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <h1 className="text-3xl font-black text-gray-900 mb-2" style={{ fontFamily: "Manrope, sans-serif" }}>
          {title}
        </h1>
        <p className="text-sm text-gray-500 mb-10 pb-8 border-b border-gray-200">
          Son güncelleme: 27 Haziran 2026
        </p>
        <div className="prose prose-gray max-w-none text-sm leading-relaxed space-y-6 text-gray-700">
          {children}
        </div>
      </main>

      <footer className="border-t border-gray-200 mt-16 py-8 text-center text-xs text-gray-400">
        <p>© 2026 Arıkan Ortopedi - Ortez & Protez. Tüm hakları saklıdır.</p>
        <div className="flex justify-center gap-6 mt-3">
          <a href="/kvkk" className="hover:text-gray-600">KVKK</a>
          <a href="/gizlilik-politikasi" className="hover:text-gray-600">Gizlilik</a>
          <a href="/cerez-politikasi" className="hover:text-gray-600">Çerez</a>
          <a href="/kullanim-kosullari" className="hover:text-gray-600">Kullanım Koşulları</a>
        </div>
      </footer>
    </div>
  );
}

// ─── KVKK ─────────────────────────────────────────────────────────────────────

export function KVKK() {
  return (
    <LegalLayout title="KVKK Aydınlatma Metni">
      <section>
        <h2 className="text-lg font-bold text-gray-900 mb-3">1. Veri Sorumlusunun Kimliği</h2>
        <p>
          6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVKK") uyarınca, kişisel verileriniz; veri sorumlusu sıfatıyla
          <strong> Kütahya Arıkan Ortopedi Ortez Protez Merkezi</strong> (Evliya Çelebi Mah. Eken Paşa Cd. No:13/E, Şehir Hastanesi Yanı, Kütahya) tarafından aşağıda açıklanan
          kapsamda işlenmektedir.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-bold text-gray-900 mb-3">2. İşlenen Kişisel Veriler</h2>
        <p>Merkezimiz tarafından aşağıdaki kişisel veri kategorileri işlenmektedir:</p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li><strong>Kimlik Bilgileri:</strong> Ad, soyad, T.C. kimlik numarası</li>
          <li><strong>İletişim Bilgileri:</strong> Telefon numarası, e-posta adresi, adres</li>
          <li><strong>Sağlık Bilgileri:</strong> Tanı bilgileri, tedavi geçmişi, engel durumu, ölçü ve beden bilgileri</li>
          <li><strong>SGK ve Sigorta Bilgileri:</strong> SGK numarası, provizyon bilgileri</li>
          <li><strong>Finansal Bilgiler:</strong> Ödeme bilgileri, fatura adresi</li>
          <li><strong>Görsel Kayıtlar:</strong> İzniniz dahilinde alınan fotoğraflar</li>
        </ul>
      </section>

      <section>
        <h2 className="text-lg font-bold text-gray-900 mb-3">3. Kişisel Verilerin İşlenme Amaçları</h2>
        <p>Kişisel verileriniz aşağıdaki amaçlarla işlenmektedir:</p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li>Ortez ve protez ürün ve hizmetlerinin sunulması ve yönetilmesi</li>
          <li>SGK ve özel sigorta süreçlerinin yürütülmesi</li>
          <li>Randevu, takip ve bakım hatırlatmalarının yapılması</li>
          <li>Yasal yükümlülüklerin yerine getirilmesi (Sağlık Bakanlığı mevzuatı)</li>
          <li>Hasta memnuniyeti değerlendirmesi ve hizmet kalitesinin iyileştirilmesi</li>
          <li>Muhasebe ve faturalandırma işlemleri</li>
        </ul>
      </section>

      <section>
        <h2 className="text-lg font-bold text-gray-900 mb-3">4. Kişisel Verilerin Aktarılması</h2>
        <p>
          Kişisel verileriniz; yasal yükümlülükler çerçevesinde Sağlık Bakanlığı, SGK ve yetkili kamu kurumlarıyla; hizmet
          sunumu kapsamında tedarikçi ve iş ortaklarımızla KVKK'nın 8. ve 9. maddeleri uyarınca paylaşılabilir. Yurt dışı veri
          aktarımı yapılmamaktadır.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-bold text-gray-900 mb-3">5. Kişisel Veri Toplamanın Yöntemi ve Hukuki Sebebi</h2>
        <p>
          Kişisel verileriniz; yüz yüze görüşme, telefon, e-posta, web sitesi iletişim formu ve yazılı formlar aracılığıyla
          toplanmaktadır. İşlemenin hukuki dayanakları: açık rızanız, sözleşmenin ifası, yasal yükümlülük ve meşru menfaat.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-bold text-gray-900 mb-3">6. Haklarınız</h2>
        <p>KVKK'nın 11. maddesi uyarınca aşağıdaki haklara sahipsiniz:</p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li>Kişisel verilerinizin işlenip işlenmediğini öğrenme</li>
          <li>İşlenme amacını ve amaca uygun kullanılıp kullanılmadığını öğrenme</li>
          <li>Yurt içinde veya yurt dışında aktarıldığı üçüncü kişileri bilme</li>
          <li>Eksik veya yanlış işlenmişse düzeltilmesini isteme</li>
          <li>Silinmesini veya yok edilmesini talep etme</li>
          <li>Otomatik sistemler vasıtasıyla analiz edilmesi sonucu aleyhinize çıkan karara itiraz etme</li>
          <li>Zarara uğramanız halinde tazminat talep etme</li>
        </ul>
        <p className="mt-3">
          Bu haklarınızı kullanmak için <strong>info@arikanortopedi.com</strong> adresine veya
          Evliya Çelebi Mah. Eken Paşa Cd. No:13/E, Şehir Hastanesi Yanı, Kütahya adresine yazılı başvuruda bulunabilirsiniz.
        </p>
      </section>
    </LegalLayout>
  );
}

// ─── Gizlilik Politikası ───────────────────────────────────────────────────────

export function GizlilikPolitikasi() {
  return (
    <LegalLayout title="Gizlilik Politikası">
      <section>
        <h2 className="text-lg font-bold text-gray-900 mb-3">1. Genel Bilgi</h2>
        <p>
          Kütahya Arıkan Ortopedi Ortez Protez Merkezi olarak kullanıcılarımızın gizliliğine büyük önem veriyoruz. Bu Gizlilik Politikası,
          web sitemizi ziyaret ettiğinizde hangi bilgilerin toplandığını, bu bilgilerin nasıl kullanıldığını ve korunduğunu
          açıklamaktadır.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-bold text-gray-900 mb-3">2. Toplanan Bilgiler</h2>
        <p>Web sitemiz aracılığıyla aşağıdaki bilgiler toplanabilir:</p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li><strong>İletişim Formu:</strong> Ad soyad, telefon, e-posta ve mesaj içeriği</li>
          <li><strong>Otomatik Toplanan Veriler:</strong> IP adresi, tarayıcı türü, ziyaret süresi, sayfa görüntülemeleri</li>
          <li><strong>Çerez Verileri:</strong> Oturum ve tercih çerezleri (detaylar için Çerez Politikamıza bakınız)</li>
        </ul>
      </section>

      <section>
        <h2 className="text-lg font-bold text-gray-900 mb-3">3. Bilgilerin Kullanım Amaçları</h2>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li>Başvurularınıza ve sorularınıza yanıt vermek</li>
          <li>Randevu ve değerlendirme süreçlerini yönetmek</li>
          <li>Web sitesinin teknik performansını iyileştirmek</li>
          <li>Yasal yükümlülükleri yerine getirmek</li>
        </ul>
      </section>

      <section>
        <h2 className="text-lg font-bold text-gray-900 mb-3">4. Bilgilerin Üçüncü Taraflarla Paylaşımı</h2>
        <p>
          Kişisel bilgileriniz; yasal zorunluluklar dışında hiçbir üçüncü tarafla ticari amaçla paylaşılmamaktadır.
          Web sitesi hizmetlerini sağlamak amacıyla kullandığımız teknik altyapı sağlayıcıları, veri işleme anlaşmaları
          kapsamında bilgilerinize sınırlı erişim sağlayabilir.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-bold text-gray-900 mb-3">5. Veri Güvenliği</h2>
        <p>
          Kişisel verileriniz, SSL/TLS şifreleme protokolleriyle korunan sunucularda saklanmaktadır. Verilere yetkisiz erişimi
          engellemek için teknik ve idari tedbirler uygulanmaktadır.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-bold text-gray-900 mb-3">6. Veri Saklama Süresi</h2>
        <p>
          Hasta kayıtları, Sağlık Bakanlığı mevzuatı gereği en az 20 yıl saklanmaktadır. İletişim formu verileri, talebiniz
          yanıtlandıktan sonra 1 yıl süreyle tutulmaktadır. Yasal saklama süreleri dışında kalan veriler silinmektedir.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-bold text-gray-900 mb-3">7. İletişim</h2>
        <p>
          Gizlilik politikamıza ilişkin sorularınız için{" "}
          <a href="mailto:info@arikanortopedi.com" className="text-primary underline">info@arikanortopedi.com</a>{" "}
          adresine yazabilirsiniz.
        </p>
      </section>
    </LegalLayout>
  );
}

// ─── Çerez Politikası ─────────────────────────────────────────────────────────

export function CerezPolitikasi() {
  return (
    <LegalLayout title="Çerez Politikası">
      <section>
        <h2 className="text-lg font-bold text-gray-900 mb-3">1. Çerez Nedir?</h2>
        <p>
          Çerezler (cookies), bir web sitesini ziyaret ettiğinizde tarayıcınız tarafından cihazınıza kaydedilen küçük metin
          dosyalarıdır. Web sitelerinin sizi tanımasına, tercihlerinizi hatırlamasına ve deneyiminizi kişiselleştirmesine
          yardımcı olurlar.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-bold text-gray-900 mb-3">2. Kullandığımız Çerez Türleri</h2>

        <h3 className="font-semibold text-gray-800 mt-4 mb-2">2.1 Zorunlu Çerezler</h3>
        <p>
          Web sitesinin temel işlevlerinin çalışması için gereklidir. Bu çerezler devre dışı bırakılamaz çünkü olmadan site
          düzgün çalışmaz. Herhangi bir kişisel veri içermezler.
        </p>

        <h3 className="font-semibold text-gray-800 mt-4 mb-2">2.2 Analitik Çerezler</h3>
        <p>
          Ziyaretçilerin siteyi nasıl kullandığını anlamamıza yardımcı olur. Hangi sayfaların ziyaret edildiğini, oturum
          sürelerini ve hata mesajlarını anonim olarak toplarız. Bu veriler siteyi geliştirmek için kullanılır.
        </p>

        <h3 className="font-semibold text-gray-800 mt-4 mb-2">2.3 Fonksiyonel Çerezler</h3>
        <p>
          Dil tercihiniz gibi ayarlarınızı hatırlamamızı sağlar. Bu çerezler olmadan her ziyarette tercihlerinizi yeniden
          ayarlamanız gerekebilir.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-bold text-gray-900 mb-3">3. Çerezleri Nasıl Kontrol Edebilirsiniz?</h2>
        <p>
          Tarayıcınızın ayarlarını değiştirerek çerezleri kabul etmeyi reddedebilir veya mevcut çerezleri silebilirsiniz.
          Çerezleri devre dışı bırakmak bazı site özelliklerinin çalışmamasına neden olabilir.
        </p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li><strong>Google Chrome:</strong> Ayarlar → Gizlilik ve Güvenlik → Çerezler</li>
          <li><strong>Mozilla Firefox:</strong> Seçenekler → Gizlilik ve Güvenlik → Çerezler</li>
          <li><strong>Safari:</strong> Tercihler → Gizlilik → Çerezler</li>
          <li><strong>Microsoft Edge:</strong> Ayarlar → Gizlilik, arama ve hizmetler → Çerezler</li>
        </ul>
      </section>

      <section>
        <h2 className="text-lg font-bold text-gray-900 mb-3">4. Üçüncü Taraf Çerezleri</h2>
        <p>
          Web sitemizde Google Maps harita entegrasyonu kullanılmaktadır. Bu servis, kendi çerez politikaları kapsamında
          çerez kullanabilir. Detaylar için Google'ın gizlilik politikasını incelemenizi öneririz.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-bold text-gray-900 mb-3">5. Değişiklikler</h2>
        <p>
          Bu çerez politikası zaman zaman güncellenebilir. Önemli değişikliklerde sizi bilgilendireceğiz. Politikanın güncel
          halini her zaman bu sayfada bulabilirsiniz.
        </p>
      </section>
    </LegalLayout>
  );
}

// ─── Kullanım Koşulları ───────────────────────────────────────────────────────

export function KullanimKosullari() {
  return (
    <LegalLayout title="Kullanım Koşulları">
      <section>
        <h2 className="text-lg font-bold text-gray-900 mb-3">1. Kabul</h2>
        <p>
          Bu web sitesini kullanarak aşağıdaki kullanım koşullarını okuduğunuzu, anladığınızı ve kabul ettiğinizi beyan
          etmektesiniz. Koşulları kabul etmiyorsanız lütfen siteyi kullanmayınız.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-bold text-gray-900 mb-3">2. Hizmetlerin Kapsamı</h2>
        <p>
          Arıkan Ortopedi - Ortez & Protez web sitesi; merkezimizin sunduğu ortez ve protez hizmetlerine ilişkin genel bilgilendirme
          amacıyla hazırlanmıştır. Web sitesindeki içerikler tıbbi tavsiye niteliği taşımamaktadır; sağlık kararlarınız
          için mutlaka uzman hekim görüşü alınız.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-bold text-gray-900 mb-3">3. Fikri Mülkiyet Hakları</h2>
        <p>
          Bu web sitesinde yer alan tüm içerikler (metin, görsel, logo, tasarım ve diğer materyaller) Arıkan Ortopedi - Ortez & Protez'e
          aittir ve telif hakkı yasalarıyla korunmaktadır. Yazılı izin alınmadan kopyalanamaz, çoğaltılamaz veya dağıtılamaz.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-bold text-gray-900 mb-3">4. Kullanıcı Yükümlülükleri</h2>
        <p>Web sitesini kullanırken aşağıdaki kurallara uymayı kabul edersiniz:</p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li>Yasalara aykırı herhangi bir amaçla siteyi kullanmamak</li>
          <li>Sisteme zarar verebilecek yazılım veya kod göndermemek</li>
          <li>Başka kullanıcıların siteden yararlanmasını engelleyecek davranışlarda bulunmamak</li>
          <li>Hatalı veya yanıltıcı bilgi paylaşmamak</li>
        </ul>
      </section>

      <section>
        <h2 className="text-lg font-bold text-gray-900 mb-3">5. Sorumluluk Sınırlaması</h2>
        <p>
          Web sitesindeki bilgilerin güncelliği ve doğruluğu konusunda azami özen gösterilmekte olmakla birlikte, içeriğin
          eksiksizliği veya doğruluğu konusunda açık ya da zımni herhangi bir garanti verilmemektedir. Siteden edinilen
          bilgilere dayanarak alınan kararlar sonucunda oluşabilecek zararlardan Arıkan Ortopedi - Ortez & Protez sorumlu tutulamaz.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-bold text-gray-900 mb-3">6. Dış Bağlantılar</h2>
        <p>
          Web sitemiz üçüncü taraf web sitelerine bağlantılar içerebilir. Bu siteler üzerinde herhangi bir kontrolümüz
          bulunmamakta olup, içeriklerinden sorumlu değiliz.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-bold text-gray-900 mb-3">7. Değişiklikler</h2>
        <p>
          Bu kullanım koşulları önceden haber verilmeksizin değiştirilebilir. Değişiklikler sitede yayımlandığı anda
          yürürlüğe girer. Siteyi kullanmaya devam etmeniz değişiklikleri kabul ettiğiniz anlamına gelir.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-bold text-gray-900 mb-3">8. Uygulanacak Hukuk</h2>
        <p>
          Bu kullanım koşulları Türk Hukuku'na tabidir. Doğabilecek anlaşmazlıklarda Kütahya Mahkemeleri ve İcra Daireleri
          yetkilidir.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-bold text-gray-900 mb-3">9. İletişim</h2>
        <p>
          Kullanım koşullarına ilişkin sorularınız için{" "}
          <a href="mailto:info@arikanortopedi.com" className="text-primary underline">info@arikanortopedi.com</a>{" "}
          adresine yazabilir veya <a href="tel:+902746000343" className="text-primary underline">0274 600 03 43</a> numaralı
          telefondan bize ulaşabilirsiniz.
        </p>
      </section>
    </LegalLayout>
  );
}
