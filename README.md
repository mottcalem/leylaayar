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

## Vercel deploy

GitHub reposunu Vercel’de **Add New → Project** ile içe aktarın. **Root Directory** repo kökü (`./`) olmalı. `vercel.json` diğer ayarları tanımlar:

| Ayar | Değer |
| --- | --- |
| Framework Preset | Vite |
| Node.js | 22.x (`package.json` ve `.nvmrc`) |
| Install Command | `npm ci --include=dev --include=optional` |
| Build Command | `npm run build` |
| Output Directory | `dist` |

Environment variable veya API anahtarı gerekmiyor. `npm ci` tek kilit dosyası olan `package-lock.json` üzerinden kurulum yapar; derleme araçları ve platforma uygun native bağımlılıklar da yüklenir. Yerelde geliştirme için Node.js 22 kullanın (`nvm use`).

Ana sayfa, blog ve yasal sayfalar build sırasında ayrı HTML dosyaları olarak üretilir. Vercel mevcut dosyaları öncelikle sunar; diğer adresler React Router için `/index.html` dosyasına yönlenir. Böylece alt sayfa yenilemelerinde sunucu kaynaklı 404 oluşmaz.

Üretim canonical/sitemap adresi `https://www.leylaayar.com` olarak korunur. Canlı yayında bu alan adını Vercel projesine bağlayın. Önizleme adresi Vercel’in verdiği `.vercel.app` adresi olabilir.

Referans: [Vercel yapılandırması](https://vercel.com/docs/project-configuration/vercel-json), [paket yöneticileri](https://vercel.com/docs/package-managers), [Node.js sürümü](https://vercel.com/docs/functions/runtimes/node-js/node-js-versions).
