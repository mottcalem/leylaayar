# Leyla Ayar — Bahçeşehir

React + Vite ile hazırlanan fizyoterapi ve klinik pilates sitesi.

## Geliştirme

```sh
npm ci
npm run dev
```

## Üretim

```sh
npm run build
```

`dist/` yayınlanmaya hazır statik çıktıdır. Derleme, tüm sayfaların içeriğini HTML olarak oluşturur; sitemap, canonical ve sosyal paylaşım metalarını üretir. `npm run verify:seo` SEO, hizmetler, iç bağlantılar ve yerel görselleri doğrular.

Marka bilgileri ve sekiz hizmet `src/app/brand.ts` içinde; ana renk `src/styles/theme.css` ile `src/styles/brand.css` içindedir. Blog verileri `src/app/blog/blogData.ts` dosyasındadır.

## İçerik kaynakları

24 Ekim 2026 tarihinde https://www.leylaayar.com/, `/hakkimizda` ve `/hizmetlerimiz` sayfalarındaki marka, eğitim, hizmet ve iletişim bilgileri esas alındı. Logo kullanıcı tarafından sağlandı. Klinik fotoğrafı mevcut Leyla Ayar sitesinden alındı.

Kaynak projedeki ortez/protez anahtar kelimeleri korundu; lokasyon Bahçeşehir olarak uyarlandı. Cihaz üretimi, SGK anlaşması ve doğrulanmamış başarı/sertifika iddiaları Leyla Ayar hizmeti olarak sunulmaz. İlgili konular bilgilendirme rehberlerinde bulunur. Önceki Kütahya blog yolları istemci tarafında eşdeğer rehberlere çözümlenir; canonical yeni Bahçeşehir yolunu gösterir.

Kaynak proje: https://github.com/mottcalem/MedikalCMS-IstanbulOrtezProtez

## Destek asistanı

Tüm sayfalarda çalışan otomatik bilgi paneli, `brand.ts` içindeki hizmet/iletişim/çalışma saatlerini kullanır. Soru eşleştirme kuralları `src/app/supportKnowledge.ts` içindedir. API anahtarı ve sunucu gerektirmez; mesajlar dış servise gönderilmez veya kalıcı saklanmaz. Ücret ve müsaitlik gibi sitede bulunmayan bilgiler için kliniğe yönlendirir. Soru senaryolarını `npm run test:support` ile kontrol edebilirsiniz.
