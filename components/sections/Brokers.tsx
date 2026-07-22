import { ArrowUpRight } from "lucide-react";
import { Section, SectionHeading, SectionMore } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { getPerson } from "@/lib/person";

export function Brokers({
  /** Verilirse bölümün altına ayrıntı sayfası bağlantısı eklenir. */
  moreHref,
  hideHeading,
}: {
  moreHref?: string;
  hideHeading?: boolean;
} = {}) {
  const { brokers } = getPerson();
  if (!brokers.items.length) return null;

  return (
    <Section id="araci-kurumlar" className="bg-panel">
      {hideHeading ? null : (
        <SectionHeading
          eyebrow="Aracı Kurumlar"
          title={brokers.heading || "Çalıştığım aracı kurumlar"}
          description={brokers.description}
        />
      )}

      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {brokers.items.map((b, i) => (
          <Reveal key={b.name} delay={(i % 3) * 0.07}>
            <div className="card flex h-full flex-col p-7 transition-all duration-300 hover:border-ink hover:shadow-md">
              {b.logo ? (
                <div className="flex h-16 items-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={b.logo}
                    alt={b.name}
                    className="max-h-18 w-auto max-w-[220px] object-contain object-left"
                  />
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <span className="grid h-11 w-11 place-items-center rounded-lg bg-ink font-display text-base font-bold text-white">
                    {b.name.charAt(0)}
                  </span>
                  <h3 className="font-display text-xl font-bold text-ink">
                    {b.name}
                  </h3>
                </div>
              )}

              <p className="mt-5 flex-1 text-sm leading-relaxed text-muted">
                {b.description}
              </p>

              <a
                href={b.registerHref || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-ink px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-ink-soft"
              >
                {b.registerLabel || "Kayıt Ol"}
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </Reveal>
        ))}
      </div>

      <p className="mt-8 text-center text-xs text-faint">
        Kayıt bağlantıları ilgili aracı kurumların resmî sitelerine yönlendirir.
      </p>

      {moreHref ? (
        <SectionMore href={moreHref} className="mt-8">
          Aracı kurumlar hakkında ayrıntılı bilgi
        </SectionMore>
      ) : null}
    </Section>
  );
}
