import { getPerson, siteUrl } from "@/lib/person";

/** Ana sayfa için Person + WebSite + ProfilePage yapılandırılmış verisi (schema.org). */
export function PersonJsonLd() {
  const { profile, seo, socials, expertise } = getPerson();
  const base = siteUrl();

  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${base}/#person`,
        name: profile.fullName,
        givenName: profile.firstName,
        familyName: profile.lastName,
        jobTitle: profile.title,
        description: profile.shortBio,
        url: base,
        image: profile.avatar ? `${base}${profile.avatar}` : undefined,
        address: profile.location
          ? { "@type": "PostalAddress", addressLocality: profile.location }
          : undefined,
        knowsAbout: expertise.length ? expertise : undefined,
        knowsLanguage: profile.languages.length ? profile.languages : undefined,
        sameAs: socials.map((s) => s.url),
      },
      {
        "@type": "WebSite",
        "@id": `${base}/#website`,
        url: base,
        name: seo.siteName,
        // Marka aramalarında ("sinem yazıcı borsa") eşleşmeyi güçlendirir.
        alternateName: seo.alternateNames.length
          ? seo.alternateNames
          : undefined,
        description: seo.description,
        inLanguage: "tr-TR",
        publisher: { "@id": `${base}/#person` },
      },
      {
        "@type": "ProfilePage",
        "@id": `${base}/#webpage`,
        url: base,
        name: seo.titleDefault,
        description: seo.description,
        inLanguage: "tr-TR",
        isPartOf: { "@id": `${base}/#website` },
        about: { "@id": `${base}/#person` },
        mainEntity: { "@id": `${base}/#person` },
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
