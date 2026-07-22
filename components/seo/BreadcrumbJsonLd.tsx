import { siteUrl } from "@/lib/person";

/**
 * Alt sayfalar için BreadcrumbList (schema.org).
 * Google arama sonucunda URL yerine "Anasayfa › Eğitim" yolunu gösterir ve
 * site hiyerarşisini anlamasına yardımcı olur (sitelinks için önemli sinyal).
 */
export function BreadcrumbJsonLd({
  items,
}: {
  items: { name: string; path: string }[];
}) {
  const base = siteUrl();

  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${base}${item.path === "/" ? "" : item.path}`,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
