import Link from "next/link";
import type { MockFighter } from "@/mock-database/fighters";

function FighterCard({ fighter }: { fighter: MockFighter }) {
  return (
    <Link
      href={`/fighters/${fighter.id}`}
      className="group relative flex flex-col rounded-lg bg-surface border border-line-subtle overflow-hidden transition-all hover:bg-elevated hover:border-line hover:shadow-lg"
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-elevated">
        {fighter.imageUrl ? (
          <img
            src={fighter.imageUrl}
            alt={fighter.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-subtle">
            <span className="font-heading text-lg sm:text-2xl lg:text-4xl font-bold text-muted-foreground">
              {fighter.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

        {fighter.isChampion && (
          <span className="absolute top-1 right-1 sm:top-2 sm:right-2 lg:top-3 lg:right-3 inline-flex items-center gap-1 rounded-md bg-accent-primary px-1 py-px sm:px-1.5 sm:py-0.5 text-[7px] sm:text-[9px] font-bold uppercase tracking-wider text-white">
            Champion
          </span>
        )}

        <div className="absolute bottom-0 left-0 right-0 p-1.5 sm:p-3 lg:p-4">
          <h3 className="font-heading text-[10px] sm:text-sm lg:text-lg xl:text-xl font-bold uppercase tracking-tight leading-tight text-white">
            {fighter.name}
          </h3>
          <p className="text-[7px] sm:text-xs text-white/70 mt-0.5 h-[1em]">
            {fighter.nickname ? `\u201C${fighter.nickname}\u201D` : "\u00A0"}
          </p>
        </div>
      </div>

      <div className="p-1.5 sm:p-3 lg:p-4 space-y-1 sm:space-y-2">
        <div className="flex items-center justify-between gap-1">
          <span className="text-[7px] sm:text-[10px] lg:text-xs font-semibold uppercase tracking-wider text-accent-primary truncate">
            {fighter.weightClass}
          </span>
          <span className="text-[8px] sm:text-xs lg:text-sm font-medium text-ink-secondary shrink-0">
            {fighter.record}
          </span>
        </div>

        <div className="flex items-center gap-1 sm:gap-2 flex-wrap">
          {fighter.rankings.p4p !== null && (
            <span className="inline-flex items-center gap-1 rounded-md bg-accent-primary-dim px-1 py-px sm:px-1.5 sm:py-0.5 text-[6px] sm:text-[8px] lg:text-[10px] font-semibold uppercase tracking-wider text-accent-primary">
              P4P #{fighter.rankings.p4p}
            </span>
          )}
          {fighter.rankings.division !== null && (
            <span className="inline-flex items-center gap-1 rounded-md bg-elevated px-1 py-px sm:px-1.5 sm:py-0.5 text-[6px] sm:text-[8px] lg:text-[10px] font-semibold uppercase tracking-wider text-ink-secondary">
              #{fighter.rankings.division}
              <span className="hidden sm:inline"> {fighter.weightClass}</span>
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}

export { FighterCard };
