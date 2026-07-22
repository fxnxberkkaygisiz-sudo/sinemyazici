import type { Metadata } from "next";
import { Award, Trophy, Download } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { About } from "@/components/sections/About";
import { Education } from "@/components/sections/Education";
import { Button } from "@/components/ui/Button";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { getPerson } from "@/lib/person";

export function generateMetadata(): Metadata {
  const { profile } = getPerson();
  return {
    title: `${profile.fullName} Kimdir?`,
    description: profile.shortBio,
    alternates: { canonical: "/sinem-yazici-kimdir" },
  };
}

export default function AboutPage() {
  const { profile, certifications, achievements } = getPerson();

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Anasayfa", path: "/" },
          { name: `${profile.fullName} Kimdir?`, path: "/sinem-yazici-kimdir" },
        ]}
      />

      <section className="border-b border-hairline">
        <Container className="py-20 sm:py-24">
          <span className="eyebrow">Ben Kimim</span>
          <h1 className="mt-4 max-w-3xl font-display text-4xl font-semibold leading-[1.02] tracking-tight text-ink sm:text-6xl">
            {profile.fullName} Kimdir?
          </h1>
          <p className="mt-5 max-w-xl text-lg text-muted">{profile.tagline}</p>
          {profile.resumeUrl ? (
            <Button href={profile.resumeUrl} external className="mt-8">
              <Download className="h-4 w-4" />
              CV / Özgeçmiş
            </Button>
          ) : null}
        </Container>
      </section>

      <About full />

      {/* Eğitim & mentorluk — ayrıntısı /egitim sayfasında */}
      <Education limit={1} moreHref="/egitim" />

      {/* Sertifikalar & Başarılar */}
      {certifications.length || achievements.length ? (
        <Section className="border-t border-hairline bg-panel">
          <div className="grid gap-12 lg:grid-cols-2">
            {certifications.length ? (
              <div>
                <h2 className="flex items-center gap-2.5 font-display text-2xl font-semibold text-ink">
                  <Award className="h-5 w-5 text-faint" />
                  Sertifika & Lisanslar
                </h2>
                <ul className="mt-6 space-y-3">
                  {certifications.map((c) => (
                    <li
                      key={c.name}
                      className="card flex items-center justify-between p-4"
                    >
                      <div>
                        <p className="text-sm font-medium text-ink">{c.name}</p>
                        <p className="text-xs text-muted">{c.issuer}</p>
                      </div>
                      <span className="nums text-sm text-fg">{c.year}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            {achievements.length ? (
              <div>
                <h2 className="flex items-center gap-2.5 font-display text-2xl font-semibold text-ink">
                  <Trophy className="h-5 w-5 text-faint" />
                  Başarılar
                </h2>
                <ul className="mt-6 space-y-3">
                  {achievements.map((a) => (
                    <li key={a.title} className="card p-4">
                      <p className="text-sm font-medium text-ink">{a.title}</p>
                      {a.description ? (
                        <p className="mt-1 text-sm text-muted">{a.description}</p>
                      ) : null}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </Section>
      ) : null}
    </>
  );
}
