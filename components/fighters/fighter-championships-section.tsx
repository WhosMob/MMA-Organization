import { Trophy } from "lucide-react";
import type { MockFighter } from "@/mock-database/fighters";

function FighterChampionshipsSection({ fighter }: { fighter: MockFighter }) {
  if (fighter.championships.length === 0) return null;

  return (
    <section className="py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 space-y-2 md:mb-12">
          <p className="inline-flex w-fit items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-accent-primary">
            <span className="inline-block size-1.5 rounded-full bg-accent-primary" />
            Titles
          </p>
          <h2 className="font-heading text-4xl font-bold uppercase leading-[0.95] tracking-tight sm:text-5xl" style={{ color: "var(--text-primary)" }}>
            Championships
          </h2>
        </div>

        <ul className="divide-y divide-line-subtle rounded-lg border border-line-subtle bg-surface">
          {fighter.championships.map((championship) => (
            <li
              key={championship.title}
              className="flex items-center gap-4 p-4 sm:p-5"
            >
              <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-md bg-accent-primary-dim text-accent-primary">
                <Trophy className="size-5" />
              </span>
              <div className="min-w-0">
                <p className="truncate font-heading text-xl font-bold uppercase tracking-tight sm:text-2xl" style={{ color: "var(--text-primary)" }}>
                  {championship.title}
                </p>
                {fighter.isChampion && (
                  <p className="mt-0.5 text-xs font-semibold uppercase tracking-wider text-accent-primary">
                    Current Champion
                  </p>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export { FighterChampionshipsSection };