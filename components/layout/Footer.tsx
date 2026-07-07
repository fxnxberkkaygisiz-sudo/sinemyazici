import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SocialBar } from "./SocialBar";
import { getPerson } from "@/lib/person";

export function Footer() {
  const person = getPerson();
  const year = new Date().getFullYear();
  const { profile, contact, socials, navigation, legal, seo } = person;

  return (
    <footer className="border-t border-border bg-panel">
      <Container className="py-16">
        <div className="grid gap-12 md:grid-cols-3">
          {/* Marka */}
          <div>
            <Link href="/" className="flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-lg bg-brand font-display text-sm font-bold text-white">
                {profile.firstName[0]}
                {profile.lastName[0]}
              </span>
              <span className="font-display text-lg font-bold text-ink">
                {profile.fullName}
              </span>
            </Link>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted">
              {profile.shortBio}
            </p>
            <SocialBar socials={socials} className="mt-6" />
          </div>

          {/* Menü */}
          <div className="md:justify-self-center">
            <h3 className="eyebrow">Menü</h3>
            <ul className="mt-5 space-y-3">
              {navigation.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted transition-colors hover:text-ink"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* İletişim */}
          <div>
            <h3 className="eyebrow">İletişim</h3>
            <ul className="mt-5 space-y-3.5 text-sm text-muted">
              {contact.email ? (
                <li>
                  <a
                    href={`mailto:${contact.email}`}
                    className="flex items-center gap-3 transition-colors hover:text-ink"
                  >
                    <Mail className="h-4 w-4 text-faint" />
                    {contact.email}
                  </a>
                </li>
              ) : null}
              {contact.phone ? (
                <li>
                  <a
                    href={`tel:${contact.phone.replace(/\s/g, "")}`}
                    className="flex items-center gap-3 transition-colors hover:text-ink"
                  >
                    <Phone className="h-4 w-4 text-faint" />
                    {contact.phone}
                  </a>
                </li>
              ) : null}
              {contact.address ? (
                <li className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 text-faint" />
                  {contact.address}
                </li>
              ) : null}
            </ul>
          </div>
        </div>

        {legal.disclaimer ? (
          <p className="mt-14 rounded-lg border border-border bg-surface p-5 text-xs leading-relaxed text-faint">
            {legal.disclaimer}
          </p>
        ) : null}

        <div className="nums mt-8 flex flex-col items-center justify-between gap-3 border-t border-hairline pt-7 text-xs text-faint sm:flex-row">
          <p>
            © {year} {legal.copyright || profile.fullName}. Tüm hakları saklıdır.
          </p>
          <p>{seo.url.replace(/^https?:\/\//, "")}</p>
        </div>
      </Container>
    </footer>
  );
}
