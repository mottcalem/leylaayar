import { test } from "node:test";
import assert from "node:assert/strict";
import { build } from "esbuild";
const result = await build({
  entryPoints: ["src/app/supportKnowledge.ts"],
  bundle: true,
  format: "esm",
  platform: "node",
  write: false,
});
const { getSupportReply } = await import(
  "data:text/javascript;base64," +
    Buffer.from(result.outputFiles[0].text).toString("base64")
);
const cases = [
  ["Adresiniz nerede?", "Avni Akyol"],
  ["NEREDESİNİZ?", "Avni Akyol"],
  ["calisma saatleri", "09:00"],
  ["Cumartesi açık mısınız?", "12:00"],
  ["Pazar açık mı?", "Pazar: Kapalı"],
  ["Randevu alabilir miyim?", "randevu oluşturulmuyor"],
  ["yarın müsait misiniz?", "randevu oluşturulmuyor"],
  ["telefon numaranız", "0534 307 00 48"],
  ["Hangi hizmetleriniz var?", "Taban Analizi"],
  ["Klinik pilates nedir?", "Klinik Pilates:"],
  ["Hamile pilatesi var mı?", "Hamilelik Pilatesi:"],
  ["tabanlık hakkında bilgi", "FootBalance"],
  ["FootBalance hizmetiniz var mı?", "kişiye özel FootBalance"],
  ["Rehabilitasyon var mı?", "Ortopedik Rehabilitasyon:"],
  ["Fiyat ne kadar?", "güncel ücret"],
  ["SGK anlaşmanız var mı?", "doğrulanmış bir bilgi"],
  ["Bel ağrım için egzersiz önerir misin?", "kişisel tedavi"],
  ["Leyla Ayar kimdir?", "2019"],
  ["İlk görüşmeye ne getirmeliyim?", "hekim raporlarınızı"],
  ["Otopark var mı?", "ek bilgi için bizi arayabilirsiniz"],
  ["Hava nasıl?", "doğrulanmış bir bilgi bulamıyorum"],
  ["", "soru sorabilirsiniz"],
  ["<script>alert(1)</script>", "doğrulanmış bir bilgi bulamıyorum"],
];
for (const [q, expected] of cases)
  test(q || "empty input", () =>
    assert.ok(
      getSupportReply(q).text.includes(expected),
      getSupportReply(q).text,
    ),
  );
test("contact actions use the actual clinic number", () =>
  assert.ok(
    getSupportReply("randevu").links.some(
      (l) => l.href === "tel:+905343070048",
    ),
  ));
