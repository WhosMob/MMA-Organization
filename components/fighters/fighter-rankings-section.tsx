import type { MockFighter } from "@/mock-database/fighters";

type RankingCardProps = {
  label: string;
  displayValue: string;
  accent: boolean;
  isChampion?: boolean;
};

function RankingCard({
  label,
  displayValue,
  accent,
  isChampion,
}: RankingCardProps) {
  return (
    <div className="rounded-lg border border-line-subtle bg-surface p-5 sm:p-6">
      <p className="text-[11px] font-semibold uppercase tracking-wider text-ink-muted">
        {label}
      </p>
      {isChampion ? (
        <span className="mt-2 inline-flex items-center rounded-md bg-accent-primary-dim px-2.5 py-1 text-sm font-bold uppercase tracking-wider text-accent-primary">
          Champion
        </span>
      ) : accent ? (
        <p className="mt-2 font-heading text-5xl font-bold tracking-tight text-accent-primary sm:text-6xl">
          #{displayValue}
        </p>
      ) : displayValue === "Not Ranked" ? (
        <p className="mt-2 text-sm font-medium text-ink-muted">
          {displayValue}
        </p>
      ) : (
        <p className="mt-2 font-heading text-5xl font-bold tracking-tight sm:text-6xl" style={{ color: "var(--text-primary)" }}>
          #{displayValue}
        </p>
      )}
    </div>
  );
}

function FighterRankingsSection({ fighter }: { fighter: MockFighter }) {
  return (
    <section className="py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 space-y-2 md:mb-12">
          <p className="inline-flex w-fit items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-accent-primary">
            <span className="inline-block size-1.5 rounded-full bg-accent-primary" />
            Standing
          </p>
          <h2 className="font-heading text-4xl font-bold uppercase leading-[0.95] tracking-tight sm:text-5xl" style={{ color: "var(--text-primary)" }}>
            Rankings
          </h2>
        </div>

        <div className="grid gap-3 sm:gap-4 sm:grid-cols-2">
          <RankingCard
            label="Pound for Pound"
            displayValue={
              fighter.rankings.p4p !== null
                ? String(fighter.rankings.p4p)
                : "Not Ranked"
            }
            accent
          />
          <RankingCard
            label={`${fighter.weightClass} Division`}
            displayValue={
              fighter.rankings.division !== null
                ? String(fighter.rankings.division)
                : fighter.isChampion
                  ? "Champion"
                  : "Not Ranked"
            }
            accent={false}
            isChampion={
              fighter.rankings.division === null && fighter.isChampion
            }
          />
        </div>
      </div>
    </section>
  );
}

export { FighterRankingsSection };