import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/cn";
import { Container } from "./Container";

/**
 * Bölüm altındaki "tümünü gör" bağlantısı.
 * Ana sayfadaki özet bölümleri ilgili alt sayfaya bağlar — hem kullanıcı akışı
 * hem de Google'ın iç link hiyerarşisini anlaması için.
 */
export function SectionMore({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mt-12 text-center", className)}>
      <Link
        href={href}
        className="group inline-flex items-center gap-2 rounded-lg border border-border px-6 py-3 text-sm font-medium text-fg transition-colors hover:border-ink hover:text-ink"
      >
        {children}
        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
      </Link>
    </div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "center" | "left";
}) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" ? "mx-auto text-center" : "text-left"
      )}
    >
      {eyebrow ? <span className="eyebrow mb-4 block">{eyebrow}</span> : null}
      <h2 className="font-display text-3xl font-semibold leading-[1.08] tracking-tight text-ink sm:text-[2.6rem]">
        {title}
      </h2>
      {description ? (
        <p className="mt-5 text-base leading-relaxed text-muted">{description}</p>
      ) : null}
    </div>
  );
}

export function Section({
  id,
  children,
  className,
  containerClassName,
}: {
  id?: string;
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
}) {
  return (
    <section
      id={id}
      className={cn("scroll-mt-24 py-20 sm:py-28", className)}
    >
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}
