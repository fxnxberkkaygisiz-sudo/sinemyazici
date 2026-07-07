import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Contact } from "@/components/sections/Contact";
import { getPerson } from "@/lib/person";

export function generateMetadata(): Metadata {
  return {
    title: "İletişim",
    description:
      "Eğitim, mentorluk veya iş birliği için iletişim formu ve sosyal medya bağlantıları.",
    alternates: { canonical: "/iletisim" },
  };
}

export default function ContactPage() {
  const { contact } = getPerson();

  return (
    <>
      <section className="border-b border-hairline">
        <Container className="py-16 sm:py-20">
          <span className="eyebrow">İletişim</span>
          <h1 className="mt-4 max-w-3xl font-display text-4xl font-bold leading-[1.05] tracking-tight text-ink sm:text-5xl">
            Birlikte çalışalım
          </h1>
          <p className="mt-5 max-w-xl text-lg text-muted">
            Eğitim, mentorluk veya iş birliği için bana ulaşın. En kısa sürede
            {contact.email ? " e-posta ile" : ""} dönüş yaparım.
          </p>
        </Container>
      </section>
      <Contact withMap hideHeading />
    </>
  );
}
