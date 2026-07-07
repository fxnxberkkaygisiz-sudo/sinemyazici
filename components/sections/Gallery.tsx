import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { getPerson } from "@/lib/person";

type GalleryImage = {
  src: string;
  caption: string;
  href: string;
  tall: boolean;
};

const CARD =
  "group relative block overflow-hidden rounded-2xl border border-border bg-surface shadow-sm";

function Card({
  img,
  fill = false,
  delay = 0,
}: {
  img: GalleryImage;
  fill?: boolean;
  delay?: number;
}) {
  const inner = (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={img.src}
        alt={img.caption || "Galeri görseli"}
        loading="lazy"
        className={
          fill
            ? "h-full w-full object-cover transition-transform duration-[600ms] group-hover:scale-[1.05]"
            : "w-full object-contain transition-transform duration-[600ms] group-hover:scale-[1.03]"
        }
      />
      {img.caption ? (
        <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/90 via-ink/40 to-transparent p-4 pt-14">
          <span className="text-[13px] font-medium leading-snug text-white">
            {img.caption}
          </span>
        </figcaption>
      ) : null}
    </>
  );

  const cls = fill ? `${CARD} h-full` : CARD;

  return (
    <Reveal delay={delay} className={fill ? "h-full" : ""}>
      {img.href ? (
        <a href={img.href} target="_blank" rel="noopener noreferrer" className={cls}>
          {inner}
        </a>
      ) : (
        <figure className={cls}>{inner}</figure>
      )}
    </Reveal>
  );
}

export function Gallery() {
  const { gallery } = getPerson();
  if (!gallery.images.length) return null;

  const images = gallery.images as GalleryImage[];
  const tall = images.filter((i) => i.tall);
  const wide = images.filter((i) => !i.tall);

  return (
    <Section id="galeri" className="bg-panel">
      <SectionHeading
        eyebrow="Galeri"
        title={gallery.heading || "Eğitimlerden kareler"}
        description={gallery.description}
      />

      <div className="mt-14 grid gap-4 sm:gap-5 lg:grid-cols-3">
        {/* Sol: dikey görseller — tam görünür (kırpılmadan) */}
        {tall.length ? (
          <div className="flex flex-col gap-4 sm:gap-5">
            {tall.map((img, i) => (
              <Card key={img.src + i} img={img} delay={i * 0.06} />
            ))}
          </div>
        ) : null}

        {/* Sağ: yatay görseller — düzenli ikili ızgara */}
        <div
          className={
            tall.length
              ? "grid grid-cols-2 gap-4 sm:gap-5 lg:col-span-2"
              : "grid grid-cols-2 gap-4 sm:gap-5 lg:col-span-3 lg:grid-cols-3"
          }
        >
          {wide.map((img, i) => (
            <div key={img.src + i} className="aspect-[4/3]">
              <Card img={img} fill delay={(i % 3) * 0.06} />
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
