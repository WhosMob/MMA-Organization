import Link from "next/link";
import { getP4PRankings, type MockRanking } from "@/lib/rankings";

function RankingMovementIndicator({ ranking }: { ranking: MockRanking }) {
  if (ranking.movement === "STABLE") {
    return <span className="text-ink-muted text-sm">—</span>;
  }

  if (ranking.movement === "NEW") {
    return (
      <span className="text-accent-primary text-sm font-medium">NEW</span>
    );
  }

  const isUp = ranking.movement === "UP";
  const color = isUp ? "text-success" : "text-error";
  const arrow = isUp ? "↑" : "↓";

  return (
    <span className={`${color} text-sm font-medium`}>
      {arrow} {ranking.movementChange}
    </span>
  );
}

export async function P4PSection() {
  const rankings = await getP4PRankings(5);

  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8 md:mb-12">
          <div className="space-y-2">
            <p className="inline-flex w-fit items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-accent-primary">
              <span className="inline-block size-1.5 rounded-full bg-accent-primary" />
              Top 5 Fighters
            </p>
            <h2 className="font-heading text-4xl font-bold uppercase leading-[0.95] tracking-tight text-ink sm:text-5xl">
              Pound for Pound
            </h2>
          </div>
          <Link
            href="/rankings"
            className="text-accent-primary hover:text-accent-primary/80 text-sm font-medium transition-colors"
          >
            View Full Rankings →
          </Link>
        </div>

        <div className="divide-y divide-line-subtle">
          {rankings.map((ranking) => (
            <Link
              key={ranking.fighterId}
              href={`/fighters/${ranking.fighterId}`}
              className="group flex items-center gap-4 py-4 md:py-5 transition-colors hover:bg-surface/50 -mx-4 px-4 rounded-lg"
            >
              <span className="font-heading text-2xl md:text-3xl font-bold text-ink-faint w-10 md:w-12 text-center group-hover:text-accent-primary transition-colors">
                {ranking.position}
              </span>

              <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-2">
                  <span className="font-heading text-lg md:text-xl font-bold uppercase tracking-tight text-ink group-hover:text-accent-primary transition-colors truncate">
                    {ranking.fighterName}
                  </span>
                  {ranking.fighterNickname && (
                    <span className="text-ink-muted text-sm hidden sm:inline">
                      &ldquo;{ranking.fighterNickname}&rdquo;
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-ink-secondary text-sm">
                    {ranking.weightClass}
                  </span>
                  <span className="text-ink-faint text-sm">·</span>
                  <span className="text-ink-secondary text-sm">
                    {ranking.record}
                  </span>
                </div>
              </div>

              <RankingMovementIndicator ranking={ranking} />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
