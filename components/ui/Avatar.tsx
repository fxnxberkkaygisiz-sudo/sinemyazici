"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

/**
 * Portre/görsel bileşeni.
 * Monogram taban her zaman altta durur; gerçek görsel varsa üstüne binerek
 * doğrudan görünür (ilk boyamada). Görsel yüklenemezse gizlenir ve monogram
 * kalır. Böylece gerçek foto anında görünür, foto yoksa kırık ikon çıkmaz.
 */
export function Avatar({
  src,
  alt,
  initials,
  className,
  imgClassName,
}: {
  src?: string;
  alt: string;
  initials: string;
  className?: string;
  imgClassName?: string;
}) {
  const [failed, setFailed] = useState(false);

  return (
    <div
      className={cn(
        "@container relative overflow-hidden bg-gradient-to-br from-panel to-[#e9ebee]",
        className
      )}
    >
      {/* Monogram taban */}
      <div className="grid h-full w-full place-items-center">
        <span className="font-display text-[34cqw] font-bold leading-none tracking-tight text-ink/25">
          {initials}
        </span>
      </div>

      {/* Gerçek görsel */}
      {src && !failed ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={alt}
          onError={() => setFailed(true)}
          className={cn(
            "absolute inset-0 h-full w-full object-cover",
            imgClassName
          )}
        />
      ) : null}
    </div>
  );
}
