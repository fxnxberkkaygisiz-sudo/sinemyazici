import { cn } from "@/lib/cn";

/**
 * JS-bağımsız giriş animasyonu (CSS). İçerik varsayılan olarak görünürdür;
 * animasyon yalnızca bir iyileştirmedir — böylece JS çalışmasa bile içerik
 * asla kaybolmaz (SSR/erişilebilirlik/bot dostu).
 */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 16,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  return (
    <div
      className={cn("reveal", className)}
      style={
        {
          animationDelay: `${delay}s`,
          "--reveal-y": `${y}px`,
        } as React.CSSProperties
      }
    >
      {children}
    </div>
  );
}
