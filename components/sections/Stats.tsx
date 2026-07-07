import { Container } from "@/components/ui/Container";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { getPerson } from "@/lib/person";

export function Stats() {
  const { stats } = getPerson();
  if (!stats.length) return null;

  return (
    <section className="bg-panel py-16 sm:py-20">
      <Container>
        <div className="card grid grid-cols-2 overflow-hidden lg:grid-cols-4">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={[
                "px-6 py-8 sm:px-8 sm:py-10",
                i % 2 === 1 ? "border-l border-hairline" : "",
                i >= 2 ? "border-t border-hairline lg:border-t-0" : "",
                "lg:border-l lg:border-hairline lg:first:border-l-0",
              ].join(" ")}
            >
              <div className="nums text-4xl font-medium tracking-tight text-ink sm:text-5xl">
                <AnimatedCounter
                  value={stat.value}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                />
              </div>
              <div className="eyebrow mt-3">{stat.label}</div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
