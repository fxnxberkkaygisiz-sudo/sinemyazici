import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SocialIcon } from "@/components/ui/SocialIcon";
import { Reveal } from "@/components/ui/Reveal";
import { TwitterTimeline } from "@/components/feed/TwitterTimeline";
import { getPerson } from "@/lib/person";

export function Feed() {
  const { feed, socials } = getPerson();
  if (!feed.twitterHandle) return null;

  const handle = feed.twitterHandle.replace(/^@/, "");
  const profileUrl =
    socials.find((s) => s.platform === "twitter" || s.platform === "x")?.url ||
    `https://x.com/${handle}`;

  return (
    <section id="paylasimlar" className="scroll-mt-24 border-t border-hairline py-24 sm:py-32">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
          {/* Sol — bilgi */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="eyebrow flex items-center gap-2">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-up" />
              Canlı · X
            </p>
            <h2 className="mt-5 font-display text-4xl font-medium leading-[1.05] text-fg sm:text-5xl">
              {feed.heading}
            </h2>
            <p className="mt-5 max-w-md text-base leading-relaxed text-muted">
              {feed.description}
            </p>

            <a
              href={profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2.5 rounded-lg bg-brand px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-brand-deep"
            >
              <SocialIcon platform="twitter" className="h-4 w-4" />
              @{handle} hesabını takip et
              <ArrowUpRight className="h-4 w-4 opacity-60" />
            </a>

            <p className="nums mt-6 text-xs text-faint">
              Akış doğrudan X üzerinden, gerçek zamanlı yüklenir.
            </p>
          </div>

          {/* Sağ — zaman tüneli */}
          <Reveal>
            <div className="card overflow-hidden p-2 shadow-md">
              <div className="flex items-center justify-between border-b border-hairline px-4 py-3">
                <span className="nums text-xs font-medium text-fg">@{handle}</span>
                <span className="eyebrow">Son paylaşımlar</span>
              </div>
              <div className="max-h-[640px] overflow-y-auto p-2">
                <TwitterTimeline handle={handle} height={640} limit={6} />
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
