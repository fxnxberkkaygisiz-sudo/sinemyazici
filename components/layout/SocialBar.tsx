import { SocialIcon, socialLabel } from "@/components/ui/SocialIcon";
import type { SocialLink } from "@/lib/person";
import { cn } from "@/lib/cn";

const tones = {
  light:
    "border-border bg-surface text-muted hover:border-ink hover:text-ink",
  dark: "border-white/15 bg-white/[0.04] text-white/70 hover:border-white/40 hover:text-white",
} as const;

export function SocialBar({
  socials,
  className,
  iconClassName = "h-[17px] w-[17px]",
  tone = "light",
}: {
  socials: SocialLink[];
  className?: string;
  iconClassName?: string;
  tone?: keyof typeof tones;
}) {
  if (!socials.length) return null;
  return (
    <ul className={cn("flex flex-wrap items-center gap-2.5", className)}>
      {socials.map((s) => (
        <li key={s.platform}>
          <a
            href={s.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={socialLabel(s.platform)}
            title={socialLabel(s.platform)}
            className={cn(
              "grid h-10 w-10 place-items-center rounded-full border transition-all duration-200 hover:-translate-y-0.5",
              tones[tone]
            )}
          >
            <SocialIcon platform={s.platform} className={iconClassName} />
          </a>
        </li>
      ))}
    </ul>
  );
}
