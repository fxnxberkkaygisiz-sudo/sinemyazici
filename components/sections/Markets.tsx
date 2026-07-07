import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { TradingViewWidget } from "@/components/ui/TradingViewWidget";
import { getPerson } from "@/lib/person";

export function Markets() {
  const { markets } = getPerson();
  if (!markets.length) return null;

  return (
    <Section id="piyasalar" className="border-t border-hairline">
      <SectionHeading
        eyebrow="Canlı Piyasalar"
        title="Takip ettiğim enstrümanlar"
        description="Anlık fiyatlar ve grafikler TradingView üzerinden sağlanmaktadır."
      />

      <Reveal className="mt-12">
        <div className="card overflow-hidden">
          <TradingViewWidget
            scriptSrc="embed-widget-ticker-tape.js"
            minHeight={78}
            config={{
              symbols: markets.map((m) => ({
                proName: m.symbol,
                title: m.label,
              })),
              showSymbolLogo: true,
              isTransparent: true,
              displayMode: "adaptive",
              colorTheme: "light",
              locale: "tr",
            }}
          />
        </div>
      </Reveal>

      <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {markets.slice(0, 6).map((m, i) => (
          <Reveal key={m.symbol} delay={i * 0.05}>
            <div className="card overflow-hidden p-1">
              <TradingViewWidget
                scriptSrc="embed-widget-mini-symbol-overview.js"
                minHeight={220}
                config={{
                  symbol: m.symbol,
                  width: "100%",
                  height: 220,
                  locale: "tr",
                  dateRange: "3M",
                  colorTheme: "light",
                  isTransparent: true,
                  autosize: true,
                  chartOnly: false,
                }}
              />
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
