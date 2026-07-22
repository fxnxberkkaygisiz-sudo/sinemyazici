import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { Faq } from "@/components/sections/Faq";
import { Contact } from "@/components/sections/Contact";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { FaqJsonLd } from "@/components/seo/FaqJsonLd";
import { Button } from "@/components/ui/Button";
import { getPage, getPerson } from "@/lib/person";

const SLUG = "sss";

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

export default function FaqPage() {
  const page = getPage(SLUG);
  const { faq } = getPerson();

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Anasayfa", path: "/" },
          { name: page.title, path: `/${SLUG}` },
        ]}
      />
      <FaqJsonLd />

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
          <Button href="/egitim">Eğitim programları</Button>
          <Button href="/araci-kurumlar" variant="outline">
            Aracı kurumlar
          </Button>
        </div>
      </PageHero>

      <Faq items={faq} hideHeading />
      <Contact />
    </>
  );
}
