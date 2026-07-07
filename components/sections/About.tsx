import { Check, ArrowRight } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { getPerson } from "@/lib/person";

export function About({ full = false }: { full?: boolean }) {
  const { about, profile } = getPerson();
  if (!about.body.length && !about.heading) return null;

  const paragraphs = full ? about.body : about.body.slice(0, 2);
  const hasHighlights = about.highlights.length > 0;

  return (
    <Section id="ben-kimim" className="border-t border-hairline">
      <div
        className={
          hasHighlights ? "grid gap-12 lg:grid-cols-2 lg:gap-20" : "max-w-3xl"
        }
      >
        <Reveal>
          <span className="eyebrow mb-4 block">Ben Kimim</span>
          <h2 className="font-display text-3xl font-semibold leading-[1.1] tracking-tight text-ink sm:text-[2.4rem]">
            {about.heading || `Ben ${profile.fullName}`}
          </h2>
          <div className="mt-7 space-y-4 text-base leading-relaxed text-muted">
            {paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          {!full ? (
            <Button href="/sinem-yazici-kimdir" variant="outline" className="mt-8">
              Daha fazlasını oku
              <ArrowRight className="h-4 w-4" />
            </Button>
          ) : null}
        </Reveal>

        {hasHighlights ? (
          <Reveal delay={0.08}>
            <div className="card p-8">
              <span className="eyebrow">Çalışma prensipleri</span>
              <ul className="mt-6 divide-y divide-hairline">
                {about.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-3.5 py-4 first:pt-0 last:pb-0">
                    <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-brand/10 text-brand">
                      <Check className="h-3 w-3" strokeWidth={3} />
                    </span>
                    <span className="text-sm leading-relaxed text-fg">{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ) : null}
      </div>
    </Section>
  );
}
