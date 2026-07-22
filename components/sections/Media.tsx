import { ArrowUpRight } from "lucide-react";
import { Section, SectionHeading, SectionMore } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { getPerson } from "@/lib/person";

export function Media({
  limit,
  moreHref,
  hideHeading,
}: {
  /** Gösterilecek görsel sayısı (ana sayfada özet için). */
  limit?: number;
  /** Verilirse bölümün altına "tümünü gör" bağlantısı eklenir. */
  moreHref?: string;
  hideHeading?: boolean;
} = {}) {
  const { media } = getPerson();
  if (!media.images.length) return null;

  const images = limit ? media.images.slice(0, limit) : media.images;
  const hasMore = Boolean(moreHref) && images.length < media.images.length;

  return (
    <Section id="medya" className="border-t border-hairline">
      {hideHeading ? null : (
        <SectionHeading
          eyebrow="Basın & Etkinlik"
          title={media.heading || "Medyada Sinem Yazıcı"}
          description={media.description}
        />
      )}

      {/* Basın-kupürü masonry — görseller kırpılmaz, künye altta açık kartta */}
      <div
        className={`gap-6 [column-fill:balance] sm:columns-2 lg:columns-3 [&>*]:mb-6 ${
          hideHeading ? "mt-0" : "mt-14"
        }`}
      >
        {images.map((img, i) => {
          const inner = (
            <>
              <div className="relative overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={img.src}
                  alt={img.caption || "Medya görseli"}
                  loading="lazy"
                  className="w-full transition-transform duration-[600ms] group-hover:scale-[1.04]"
                />
                {img.href ? (
                  <span className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-white/95 text-ink opacity-0 shadow transition-opacity group-hover:opacity-100">
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                ) : null}
              </div>
              {img.caption ? (
                <figcaption className="flex items-start gap-2.5 px-4 py-3.5">
                  <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                  <span className="text-[13px] font-medium leading-snug text-fg">
                    {img.caption}
                  </span>
                </figcaption>
              ) : null}
            </>
          );

          const cls =
            "group block break-inside-avoid overflow-hidden rounded-xl border border-border bg-surface shadow-sm transition-shadow hover:shadow-md";

          return (
            <Reveal key={img.src + i} delay={(i % 3) * 0.06}>
              {img.href ? (
                <a
                  href={img.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cls}
                >
                  {inner}
                </a>
              ) : (
                <figure className={cls}>{inner}</figure>
              )}
            </Reveal>
          );
        })}
      </div>

      {hasMore ? (
        <SectionMore href={moreHref!}>Tüm medya karelerini gör</SectionMore>
      ) : null}
    </Section>
  );
}
