import { Send } from "lucide-react";
import { Container } from "@/components/ui/Container";

export function Newsletter({
  heading,
  description,
  telegramUrl,
  buttonLabel = "Telegram Kanalına Abone Ol",
}: {
  heading: string;
  description: string;
  telegramUrl?: string;
  buttonLabel?: string;
}) {
  return (
    <section className="py-20 sm:py-24">
      <Container>
        <div className="brand-panel relative overflow-hidden rounded-2xl px-6 py-16 sm:px-14">
          <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/5 blur-2xl" />
          <div className="relative mx-auto max-w-2xl text-center">
            <p className="eyebrow" style={{ color: "rgba(255,255,255,0.5)" }}>
              Telegram
            </p>
            <h2 className="mt-5 font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              {heading}
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-base text-white/60">
              {description}
            </p>

            {telegramUrl ? (
              <a
                href={telegramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-9 inline-flex items-center justify-center gap-2 rounded-lg bg-white px-7 py-3.5 text-sm font-semibold text-brand transition-colors hover:bg-white/90"
              >
                <Send className="h-4 w-4" />
                {buttonLabel}
              </a>
            ) : null}
          </div>
        </div>
      </Container>
    </section>
  );
}
