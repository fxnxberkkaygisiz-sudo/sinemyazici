import { Section, SectionHeading } from "@/components/ui/Section";
import { GlassCard } from "@/components/ui/GlassCard";
import { ServiceIcon } from "@/components/ui/ServiceIcon";
import { Reveal } from "@/components/ui/Reveal";
import { getPerson } from "@/lib/person";

export function Services() {
  const { services } = getPerson();
  if (!services.length) return null;

  return (
    <Section id="hizmetler" className="bg-panel">
      <SectionHeading
        eyebrow="Hizmetler"
        title="Nasıl birlikte çalışabiliriz?"
        description="İhtiyacınıza göre şekillenen eğitim, mentorluk ve danışmanlık programları."
      />
      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {services.map((service, i) => (
          <Reveal key={service.title} delay={i * 0.06}>
            <GlassCard hover className="h-full">
              <span className="grid h-11 w-11 place-items-center rounded-lg border border-border bg-panel text-ink">
                <ServiceIcon name={service.icon} className="h-5 w-5" />
              </span>
              <h3 className="mt-5 font-display text-lg font-semibold text-ink">
                {service.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {service.description}
              </p>
            </GlassCard>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
