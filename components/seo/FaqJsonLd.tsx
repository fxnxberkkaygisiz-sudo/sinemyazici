import { getPerson, siteUrl } from "@/lib/person";

/**
 * FAQPage (schema.org) — yalnızca /sss sayfasında kullanılır.
 * Aynı SSS içeriğini birden fazla sayfada işaretlemek Google tarafından
 * yinelenen içerik olarak değerlendirildiği için ana sayfaya eklenmez.
 */
export function FaqJsonLd() {
  const { faq } = getPerson();
  if (!faq.length) return null;
  const base = siteUrl();

  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${base}/sss#faq`,
    inLanguage: "tr-TR",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
