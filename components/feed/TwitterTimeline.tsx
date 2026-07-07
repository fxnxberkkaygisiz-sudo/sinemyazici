"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { SocialIcon } from "@/components/ui/SocialIcon";

declare global {
  interface Window {
    twttr?: { widgets?: { load: (el?: HTMLElement | null) => void } };
  }
}

/**
 * Gömülü X (Twitter) zaman tüneli. X'in ücretsiz gömülü timeline'ı çoğu zaman
 * boş/sıfır yükseklikte gelir; bu yüzden yalnızca GERÇEKTEN boyutlanmış bir
 * iframe geldiğinde "hazır" sayarız, aksi halde zarif bir "X'te takip et"
 * kartı gösteririz (asla boş alan kalmaz).
 */
export function TwitterTimeline({
  handle,
  height = 640,
  limit = 5,
}: {
  handle: string;
  height?: number;
  limit?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "failed">("loading");

  useEffect(() => {
    let done = false;
    const finish = (s: "ready" | "failed") => {
      if (!done) {
        done = true;
        setStatus(s);
      }
    };

    const check = setInterval(() => {
      const f = ref.current?.querySelector("iframe") as HTMLIFrameElement | null;
      // Sadece görünür/boyutlanmış iframe = gerçek içerik geldi
      if (f && f.offsetHeight > 120) {
        finish("ready");
        clearInterval(check);
      }
    }, 400);

    const load = () => window.twttr?.widgets?.load(ref.current);

    const existing = document.getElementById("twitter-wjs") as HTMLScriptElement | null;
    if (existing) {
      load();
    } else {
      const s = document.createElement("script");
      s.id = "twitter-wjs";
      s.src = "https://platform.twitter.com/widgets.js";
      s.async = true;
      s.onload = load;
      s.onerror = () => finish("failed");
      document.body.appendChild(s);
    }

    // İçerik boyutlanmadıysa zarif fallback
    const timeout = setTimeout(() => finish("failed"), 9000);

    return () => {
      done = true;
      clearInterval(check);
      clearTimeout(timeout);
    };
  }, [handle]);

  return (
    <div className="relative">
      <div ref={ref} style={{ minHeight: status === "failed" ? 0 : 300 }}>
        <a
          className="twitter-timeline"
          data-theme="light"
          data-chrome="noheader nofooter noborders transparent"
          data-tweet-limit={limit}
          data-height={height}
          href={`https://twitter.com/${handle}?ref_src=twsrc`}
        >
          @{handle} paylaşımları
        </a>
      </div>

      {status === "loading" ? (
        <div className="pointer-events-none absolute inset-0 flex flex-col gap-3 p-1">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="animate-pulse rounded-lg border border-hairline bg-panel p-4"
            >
              <div className="mb-2.5 h-2.5 w-1/3 rounded bg-border" />
              <div className="mb-1.5 h-2 w-full rounded bg-border" />
              <div className="h-2 w-4/5 rounded bg-border" />
            </div>
          ))}
        </div>
      ) : null}

      {status === "failed" ? (
        <div className="flex flex-col items-center justify-center gap-4 px-6 py-14 text-center">
          <span className="grid h-14 w-14 place-items-center rounded-2xl bg-ink text-white">
            <SocialIcon platform="twitter" className="h-6 w-6" />
          </span>
          <p className="max-w-xs text-sm leading-relaxed text-muted">
            Son paylaşımlarımı X (Twitter) üzerinden takip edebilirsin.
          </p>
          <a
            href={`https://x.com/${handle}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-ink px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-ink-soft"
          >
            @{handle} hesabını aç
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      ) : null}
    </div>
  );
}
