import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { Media } from "@/components/sections/Media";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { Button } from "@/components/ui/Button";
import { getPage } from "@/lib/person";

const SLUG = "medya";

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

export default function MediaPage() {
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
          <Button href="/sinem-yazici-kimdir">Ben kimim</Button>
          <Button href="/iletisim" variant="outline">
            Basın & iş birliği
          </Button>
        </div>
      </PageHero>

      <Media hideHeading />
    </>
  );
}
