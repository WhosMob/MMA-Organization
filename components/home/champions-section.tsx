import Link from "next/link";
import { getAllChampions } from "@/lib/rankings";
import type { MockFighter } from "@/mock-database/fighters";

const WEIGHT_CLASS_ORDER = [
  "Heavyweight",
  "Light Heavyweight",
  "Middleweight",
  "Welterweight",
  "Lightweight",
  "Featherweight",
  "Bantamweight",
  "Flyweight",
];

function ChampionCard({ champion }: { champion: MockFighter }) {
  return (
    <Link
      href={`/fighters/${champion.id}`}
      className="group relative flex min-w-0 flex-col items-center gap-1 p-2 sm:p-3 lg:p-6 rounded-lg bg-surface border border-line-subtle transition-all hover:bg-elevated hover:border-line hover:shadow-lg"
    >
      <div className="relative w-full aspect-[3/4] sm:aspect-square overflow-hidden rounded-lg bg-elevated">
        {champion.imageUrl ? (
          <img
            src={champion.imageUrl}
            alt={champion.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-subtle">
            <span className="font-heading text-lg sm:text-2xl lg:text-4xl font-bold text-muted-foreground">
              {champion.name.split(" ").map((n) => n[0]).join("")}
            </span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      </div>

      <div className="w-full min-w-0 text-center space-y-0.5 sm:space-y-1">
        <p
          title={champion.weightClass}
          className="w-full truncate whitespace-nowrap overflow-hidden text-[8px] sm:text-xs font-semibold uppercase tracking-[0.15em] sm:tracking-[0.2em] text-accent-primary"
        >
          {champion.weightClass}
        </p>
        <h3 title={champion.name} className="w-full truncate whitespace-nowrap overflow-hidden font-heading text-[10px] sm:text-base lg:text-xl font-bold uppercase tracking-tight group-hover:text-accent-primary transition-colors leading-tight" style={{ color: "var(--text-primary)" }}>
          {champion.name}
        </h3>
        {champion.nickname && (
          <p title={champion.nickname} className="w-full truncate whitespace-nowrap overflow-hidden text-[8px] sm:text-sm text-ink-muted leading-tight">&ldquo;{champion.nickname}&rdquo;</p>
        )}
      </div>
    </Link>
  );
}

export async function ChampionsSection() {
  const champions = await getAllChampions();

  const sortedChampions = WEIGHT_CLASS_ORDER.map((weightClass) =>
    champions.find((c) => c.weightClass === weightClass)
  ).filter(Boolean) as MockFighter[];

  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8 md:mb-12">
          <div className="space-y-2">
            <p className="inline-flex w-fit items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-accent-primary">
              <span className="inline-block size-1.5 rounded-full bg-accent-primary" />
              Eight Divisions
            </p>
            <h2 className="font-heading text-4xl font-bold uppercase leading-[0.95] tracking-tight text-ink sm:text-5xl">
              Champions
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
          {sortedChampions.map((champion) => (
            <ChampionCard key={champion.id} champion={champion} />
          ))}
        </div>
      </div>
    </section>
  );
}
