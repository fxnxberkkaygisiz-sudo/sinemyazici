import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { getPerson } from "@/lib/person";

export function Expertise() {
  const { expertise } = getPerson();
  if (!expertise.length) return null;

  return (
    <Section id="uzmanlik">
      <SectionHeading
        eyebrow="Uzmanlık"
        title="Odaklandığım alanlar"
        description="Yılların getirdiği tecrübeyle piyasanın farklı katmanlarında derinlemesine çalışıyorum."
      />
      <Reveal className="mt-12">
        <div className="flex flex-wrap justify-center gap-2.5">
          {expertise.map((item) => (
            <span
              key={item}
              className="rounded-md border border-border bg-surface px-4 py-2 text-sm text-fg transition-colors hover:border-ink"
            >
              {item}
            </span>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}
