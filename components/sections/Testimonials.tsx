import { Quote } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Avatar } from "@/components/ui/Avatar";
import { Reveal } from "@/components/ui/Reveal";
import { getPerson } from "@/lib/person";

function initialsOf(name: string): string {
  return name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export function Testimonials() {
  const { testimonials } = getPerson();
  if (!testimonials.length) return null;

  return (
    <Section id="yorumlar" className="bg-panel">
      <SectionHeading
        eyebrow="Referanslar"
        title="Öğrencilerim ne diyor?"
        description="Eğitim ve mentorluk süreçlerinden geçen yatırımcıların deneyimleri."
      />
      <div className="mt-14 grid gap-5 md:grid-cols-3">
        {testimonials.map((t, i) => (
          <Reveal key={t.name} delay={i * 0.07}>
            <figure className="card flex h-full flex-col p-7">
              <Quote className="h-7 w-7 text-ink/15" />
              <blockquote className="mt-4 flex-1 text-[0.95rem] leading-relaxed text-fg">
                {t.quote}
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3 border-t border-hairline pt-5">
                <Avatar
                  src={t.avatar}
                  alt={t.name}
                  initials={initialsOf(t.name)}
                  className="h-10 w-10 rounded-full"
                />
                <div>
                  <p className="text-sm font-medium text-ink">{t.name}</p>
                  {t.role ? <p className="text-xs text-muted">{t.role}</p> : null}
                </div>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
