import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { getPerson } from "@/lib/person";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const person = getPerson();

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-brand focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
      >
        İçeriğe geç
      </a>
      <Header
        siteName={person.seo.siteName}
        brandText={person.seo.url.replace(/^https?:\/\//, "").replace(/\/$/, "")}
        nav={person.navigation}
        auth={person.auth}
      />
      <main id="main">{children}</main>
      <Footer />
    </>
  );
}
