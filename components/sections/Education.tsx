import { CalendarDays } from "lucide-react";
import { Section, SectionHeading, SectionMore } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/cn";
import { getPerson } from "@/lib/person";

export function Education({
  /** Gösterilecek program sayısı (ana sayfada özet için). */
  limit,
  /** Verilirse bölümün altına "tümünü gör" bağlantısı eklenir. */
  moreHref,
  hideHeading,
}: {
  limit?: number;
  moreHref?: string;
  hideHeading?: boolean;
} = {}) {
  const { education } = getPerson();
  if (!education.items.length) return null;

  const items = limit ? education.items.slice(0, limit) : education.items;
  const hasMore = Boolean(moreHref) && items.length < education.items.length;

  return (
    <Section id="egitim" className="border-t border-hairline">
      {hideHeading ? null : (
        <SectionHeading
          align="left"
          eyebrow="Eğitim Kadrosu"
          title={education.heading || "Eğitim & mentorluk"}
          description={education.description}
        />
      )}

      <div
        className={cn(
          "space-y-16 lg:space-y-24",
          hideHeading ? "mt-0" : "mt-14"
        )}
      >
        {items.map((item, i) => {
          const reversed = i % 2 === 1;
          return (
            <Reveal key={item.title}>
              <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-14">
                {/* Görsel */}
                <div className={cn(reversed && "lg:order-2")}>
                  <div className="overflow-hidden rounded-2xl border border-border bg-panel shadow-md">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.image}
                      alt={item.title}
                      loading="lazy"
                      className="aspect-[4/3] w-full object-cover"
                    />
                  </div>
                </div>

                {/* Metin */}
                <div className={cn(reversed && "lg:order-1")}>
                  {item.date ? (
                    <span className="inline-flex items-center gap-2 rounded-full border border-border bg-panel px-3.5 py-1.5 text-xs font-medium text-muted">
                      <CalendarDays className="h-3.5 w-3.5" />
                      {item.date}
                    </span>
                  ) : null}
                  <h3 className="mt-4 font-display text-2xl font-bold tracking-tight text-ink">
                    {item.title}
                  </h3>
                  {item.description ? (
                    <p className="mt-4 text-base leading-relaxed text-muted">
                      {item.description}
                    </p>
                  ) : null}
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>

      {hasMore ? (
        <SectionMore href={moreHref!}>Tüm eğitim programlarını gör</SectionMore>
      ) : null}
    </Section>
  );
}
