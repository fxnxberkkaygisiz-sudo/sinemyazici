import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { Education } from "@/components/sections/Education";
import { Gallery } from "@/components/sections/Gallery";
import { Contact } from "@/components/sections/Contact";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { Button } from "@/components/ui/Button";
import { getPage } from "@/lib/person";

const SLUG = "egitim";

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

export default function EducationPage() {
  const page = getPage(SLUG);

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
          <Button href="/iletisim">Kontenjan ve başvuru</Button>
          <Button href="/sinem-yazici-kimdir" variant="outline">
            Eğitmen hakkında
          </Button>
        </div>
      </PageHero>

      <Education hideHeading />
      <Gallery />
      <Contact />
    </>
  );
}
