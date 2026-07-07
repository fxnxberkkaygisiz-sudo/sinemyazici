import { getPerson } from "@/lib/person";

/** Ana sayfa için Person + WebSite yapılandırılmış verisi (schema.org). */
export function PersonJsonLd() {
  const { profile, seo, socials } = getPerson();
  const base = seo.url.replace(/\/$/, "");

  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${base}/#person`,
        name: profile.fullName,
        jobTitle: profile.title,
        description: profile.shortBio,
        url: base,
        image: profile.avatar ? `${base}${profile.avatar}` : undefined,
        address: profile.location
          ? { "@type": "PostalAddress", addressLocality: profile.location }
          : undefined,
        sameAs: socials.map((s) => s.url),
      },
      {
        "@type": "WebSite",
        "@id": `${base}/#website`,
        url: base,
        name: seo.siteName,
        description: seo.description,
        inLanguage: "tr-TR",
        publisher: { "@id": `${base}/#person` },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
