import { Mail, Phone, MapPin } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/Section";
import { SocialBar } from "@/components/layout/SocialBar";
import { ContactForm } from "./ContactForm";
import { getPerson } from "@/lib/person";

export function Contact({
  withMap = false,
  hideHeading = false,
}: {
  withMap?: boolean;
  hideHeading?: boolean;
}) {
  const { contact, socials } = getPerson();

  const items = [
    contact.email && {
      icon: Mail,
      label: "E-posta",
      value: contact.email,
      href: `mailto:${contact.email}`,
    },
    contact.phone && {
      icon: Phone,
      label: "Telefon",
      value: contact.phone,
      href: `tel:${contact.phone.replace(/\s/g, "")}`,
    },
    contact.address && {
      icon: MapPin,
      label: "Konum",
      value: contact.address,
      href: undefined,
    },
  ].filter(Boolean) as {
    icon: typeof Mail;
    label: string;
    value: string;
    href?: string;
  }[];

  return (
    <Section id="iletisim" className="border-t border-hairline bg-panel">
      {!hideHeading ? (
        <SectionHeading
          eyebrow="İletişim"
          title="Birlikte çalışalım"
          description="Eğitim, mentorluk veya iş birliği için bana ulaşın. En kısa sürede dönüş yaparım."
        />
      ) : null}

      <div
        className={`${hideHeading ? "" : "mt-14"} grid gap-10 lg:grid-cols-[0.9fr_1.1fr]`}
      >
        {/* Bilgiler */}
        <div className="space-y-8">
          <ul className="space-y-4">
            {items.map((item) => {
              const Icon = item.icon;
              const content = (
                <div className="flex items-center gap-4">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-lg border border-border bg-surface text-ink">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="eyebrow">
                      {item.label}
                    </p>
                    <p className="mt-0.5 text-sm font-medium text-fg">
                      {item.value}
                    </p>
                  </div>
                </div>
              );
              return (
                <li key={item.label} className="card p-4">

                  {item.href ? (
                    <a href={item.href} className="block hover:opacity-90">
                      {content}
                    </a>
                  ) : (
                    content
                  )}
                </li>
              );
            })}
          </ul>

          <div>
            <p className="eyebrow mb-3">Sosyal medya</p>
            <SocialBar socials={socials} />
          </div>

          {withMap && contact.mapEmbedUrl ? (
            <div className="overflow-hidden rounded-2xl border border-border">
              <iframe
                src={contact.mapEmbedUrl}
                title="Harita"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-56 w-full grayscale"
              />
            </div>
          ) : null}
        </div>

        {/* Form */}
        <div className="card p-6 sm:p-8">
          <ContactForm endpoint={contact.formEndpoint} />
        </div>
      </div>
    </Section>
  );
}
