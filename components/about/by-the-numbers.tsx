import type { AboutStats } from "@/lib/about-stats";

interface StatItem {
  label: string;
  value: number;
}

const STAT_ITEMS: (stats: AboutStats) => StatItem[] = (stats) => [
  { label: "Divisions", value: stats.divisions },
  { label: "Fighters", value: stats.fighters },
  { label: "Events", value: stats.events },
  { label: "Completed Fights", value: stats.completedFights },
];

export function ByTheNumbers({ stats }: { stats: AboutStats }) {
  const items = STAT_ITEMS(stats);

  return (
    <section
      aria-labelledby="by-the-numbers-heading"
      className="py-12 md:py-16 lg:py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 space-y-2 md:mb-14">
          <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-accent-primary">
            <span className="inline-block size-1.5 rounded-full bg-accent-primary" />
            The Record
          </p>
          <h2
            id="by-the-numbers-heading"
            className="font-heading text-4xl font-bold uppercase leading-[0.95] tracking-tight sm:text-5xl"
            style={{ color: "var(--text-primary)" }}
          >
            By the Numbers
          </h2>
        </div>

        <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line-subtle bg-line-subtle lg:grid-cols-4">
          {items.map((item) => (
            <div
              key={item.label}
              className="flex flex-col items-center bg-page px-4 py-10 text-center sm:py-12"
            >
              <dd
                className="order-1 font-heading text-5xl font-bold leading-none tracking-tight sm:text-6xl lg:text-7xl"
                style={{ color: "var(--text-primary)" }}
              >
                {item.value.toLocaleString("en-US")}
              </dd>
              <dt className="order-2 mt-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-ink-muted">
                {item.label}
              </dt>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}