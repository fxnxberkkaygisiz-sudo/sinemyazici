"use client";

import { useEffect, useRef } from "react";

/**
 * Genel TradingView embed sarmalayıcı.
 * scriptSrc: örn. "embed-widget-ticker-tape.js"
 * config: widget JSON konfigürasyonu
 */
export function TradingViewWidget({
  scriptSrc,
  config,
  className,
  minHeight = 0,
}: {
  scriptSrc: string;
  config: Record<string, unknown>;
  className?: string;
  minHeight?: number;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Önceki içerik temizlenir (StrictMode / re-mount koruması)
    container.innerHTML = "";
    const widget = document.createElement("div");
    widget.className = "tradingview-widget-container__widget";
    container.appendChild(widget);

    const script = document.createElement("script");
    script.src = `https://s3.tradingview.com/external-embedding/${scriptSrc}`;
    script.async = true;
    script.type = "text/javascript";
    script.innerHTML = JSON.stringify(config);
    container.appendChild(script);

    return () => {
      container.innerHTML = "";
    };
  }, [scriptSrc, config]);

  return (
    <div
      ref={containerRef}
      className={className}
      style={minHeight ? { minHeight } : undefined}
    />
  );
}
