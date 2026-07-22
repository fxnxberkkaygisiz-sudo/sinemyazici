import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Container } from "@/components/ui/Container";

/**
 * Alt sayfaların ortak başlık bloğu: görünür breadcrumb + H1 + giriş metni.
 * Görünür breadcrumb, BreadcrumbJsonLd ile birebir aynı yolu göstermelidir.
 */
export function PageHero({
  eyebrow,
  title,
  intro,
  breadcrumb,
  children,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  /** Anasayfa hariç ara adımlar; son eleman mevcut sayfadır. */
  breadcrumb: { name: string; path: string }[];
  children?: React.ReactNode;
}) {
  const trail = breadcrumb.slice(0, -1);
  const current = breadcrumb[breadcrumb.length - 1];

  return (
    <section className="border-b border-hairline">
      <Container className="py-16 sm:py-20">
        <nav aria-label="Sayfa yolu">
          <ol className="flex flex-wrap items-center gap-1.5 text-xs text-faint">
            {trail.map((item) => (
              <li key={item.path} className="flex items-center gap-1.5">
                <Link
                  href={item.path}
                  className="transition-colors hover:text-ink"
                >
                  {item.name}
                </Link>
                <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
              </li>
            ))}
            <li className="font-medium text-muted" aria-current="page">
              {current.name}
            </li>
          </ol>
        </nav>

        {eyebrow ? <span className="eyebrow mt-6 block">{eyebrow}</span> : null}

        <h1 className="mt-4 max-w-3xl font-display text-4xl font-bold leading-[1.05] tracking-tight text-ink sm:text-5xl">
          {title}
        </h1>

        {intro ? (
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">
            {intro}
          </p>
        ) : null}

        {children}
      </Container>
    </section>
  );
}
