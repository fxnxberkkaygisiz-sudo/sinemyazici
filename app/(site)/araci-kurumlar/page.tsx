import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { Brokers } from "@/components/sections/Brokers";
import { Newsletter } from "@/components/sections/Newsletter";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { Button } from "@/components/ui/Button";
import { getPage, getPerson } from "@/lib/person";

const SLUG = "araci-kurumlar";

export function generateMetadata(): Metadata {
  const page = getPage(SLUG);
  return {
    title: page.title,
    description: page.description,
    alternates: { canonical: `/${SLUG}` },
    openGraph: {
      type: "website",
      title: page.title,
      description: page.description,
      url: `/${SLUG}`,
    },
  };
}

export default function BrokersPage() {
  const page = getPage(SLUG);
  const { newsletter } = getPerson();

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Anasayfa", path: "/" },
          { name: page.title, path: `/${SLUG}` },
        ]}
      />

      <PageHero
        eyebrow={page.eyebrow}
        title={page.h1}
        intro={page.intro}
        breadcrumb={[
          { name: "Anasayfa", path: "/" },
          { name: page.title, path: `/${SLUG}` },
        ]}
      >
        <div className="mt-8 flex flex-wrap gap-3">
          <Button href="/iletisim">Soru sor</Button>
          <Button href="/egitim" variant="outline">
            Eğitim programları
          </Button>
        </div>
      </PageHero>

      <Brokers hideHeading />

      <Newsletter
        heading={newsletter.heading}
        description={newsletter.description}
        telegramUrl={newsletter.telegramUrl}
        buttonLabel={newsletter.buttonLabel}
      />
    </>
  );
}
