"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Section, SectionHeading, SectionMore } from "@/components/ui/Section";
import { cn } from "@/lib/cn";

type FaqItem = { q: string; a: string };

export function Faq({
  items,
  limit,
  moreHref,
  hideHeading,
}: {
  items: FaqItem[];
  /** Gösterilecek soru sayısı (ana sayfada özet için). */
  limit?: number;
  /** Verilirse bölümün altına "tümünü gör" bağlantısı eklenir. */
  moreHref?: string;
  hideHeading?: boolean;
}) {
  const [open, setOpen] = useState<number | null>(0);
  if (!items.length) return null;

  const shown = limit ? items.slice(0, limit) : items;
  const hasMore = Boolean(moreHref) && shown.length < items.length;

  return (
    <Section id="sss">
      {hideHeading ? null : (
        <SectionHeading
          eyebrow="S.S.S."
          title="Sıkça sorulan sorular"
          description="Aklınıza takılanların bir kısmının yanıtı burada."
        />
      )}
      <div
        className={cn(
          "mx-auto max-w-3xl space-y-3",
          hideHeading ? "mt-0" : "mt-12"
        )}
      >
        {shown.map((item, i) => {
          const isOpen = open === i;
          return (
            <div
              key={i}
              className={cn(
                "overflow-hidden rounded-2xl border transition-colors",
                isOpen
                  ? "border-ink bg-surface"
                  : "border-border bg-surface hover:border-muted"
              )}
            >
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                aria-expanded={isOpen}
              >
                <span className="font-display text-base font-medium text-ink">
                  {item.q}
                </span>
                <Plus
                  className={cn(
                    "h-5 w-5 shrink-0 text-ink transition-transform duration-300",
                    isOpen && "rotate-45"
                  )}
                />
              </button>
              <div
                className={cn(
                  "grid transition-all duration-300 ease-out",
                  isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                )}
              >
                <div className="overflow-hidden">
                  <p className="px-6 pb-6 text-sm leading-relaxed text-muted">
                    {item.a}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {hasMore ? (
        <SectionMore href={moreHref!}>Tüm soruları gör</SectionMore>
      ) : null}
    </Section>
  );
}
