import { getPerson, siteUrl } from "@/lib/person";

/**
 * SiteNavigationElement — sitenin ana menüsünü makine tarafından okunabilir
 * hale getirir. Google'a "bu site şu ana bölümlerden oluşuyor" sinyali verir;
 * sitelinks üretiminde kullanılan yapısal ipuçlarından biridir.
 * Yalnızca gerçek (hash olmayan) URL'ler yayınlanır.
 */
export function SiteNavigationJsonLd() {
  const { navigation } = getPerson();
  const base = siteUrl();

  const items = navigation.filter(
    (item) => item.href.startsWith("/") && !item.href.includes("#")
  );
  if (!items.length) return null;

  const data = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${base}/#navigation`,
    name: "Ana menü",
    itemListElement: items.map((item, i) => ({
      "@type": "SiteNavigationElement",
      position: i + 1,
      name: item.label,
      url: `${base}${item.href === "/" ? "" : item.href}`,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
