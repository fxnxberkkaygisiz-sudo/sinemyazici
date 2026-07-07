import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { SocialBar } from "@/components/layout/SocialBar";
import { getPerson } from "@/lib/person";

export function Hero() {
  const { profile, hero, socials } = getPerson();

  return (
    <section className="relative isolate overflow-hidden border-b border-hairline bg-bg">
      {/* Sağ kenara dayalı tam-boy görsel (masaüstü) */}
      <div className="absolute inset-y-0 right-0 hidden w-[46%] lg:block">
        {profile.avatar ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={profile.avatar}
            alt={profile.fullName}
            className="h-full w-full object-cover object-[center_18%]"
          />
        ) : null}
        {/* Sol kenarda beyaza yumuşak geçiş */}
        <div className="absolute inset-y-0 left-0 w-28 bg-gradient-to-r from-bg to-transparent" />
      </div>

      <Container className="relative flex min-h-[86vh] items-center">
        <div className="w-full py-16 lg:max-w-[50%] lg:py-24">
          {/* Görsel (mobil — üstte) */}
          {profile.avatar ? (
            <div className="mb-10 overflow-hidden rounded-2xl border border-border shadow-md lg:hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={profile.avatar}
                alt={profile.fullName}
                className="aspect-[4/3] w-full object-cover object-[center_15%]"
              />
            </div>
          ) : null}

          <h1 className="font-display text-5xl font-extrabold leading-[0.98] tracking-tight text-ink sm:text-6xl lg:text-7xl">
            {profile.firstName}
            <br />
            {profile.lastName}
          </h1>

          <p className="mt-7 max-w-lg text-lg leading-relaxed text-muted">
            {profile.tagline}
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            {hero.primaryCta ? (
              <Button href={hero.primaryCta.href} size="lg">
                {hero.primaryCta.label}
                <ArrowRight className="h-4 w-4" />
              </Button>
            ) : null}
            {hero.secondaryCta ? (
              <Button href={hero.secondaryCta.href} variant="outline" size="lg">
                {hero.secondaryCta.label}
              </Button>
            ) : null}
          </div>

          <div className="mt-12 flex items-center gap-4 border-t border-hairline pt-8">
            <span className="text-xs uppercase tracking-wider text-faint">
              Takip edin
            </span>
            <SocialBar socials={socials} />
          </div>
        </div>
      </Container>
    </section>
  );
}
