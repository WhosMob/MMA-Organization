import { FightMatchupCard } from "@/components/fighters/fight-matchup-card";
import { getFighterFights } from "@/lib/fights";
import type { MockFighter } from "@/mock-database/fighters";

export async function FighterFightHistorySection({
  fighter,
}: {
  fighter: MockFighter;
}) {
  const fighterFights = await getFighterFights(fighter.id);

  if (fighterFights.length === 0) return null;

  return (
    <section className="py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 space-y-2 md:mb-12">
          <p className="inline-flex w-fit items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-accent-primary">
            <span className="inline-block size-1.5 rounded-full bg-accent-primary" />
            Record
          </p>
          <h2
            className="font-heading text-4xl font-bold uppercase leading-[0.95] tracking-tight sm:text-5xl"
            style={{ color: "var(--text-primary)" }}
          >
            Fight History
          </h2>
        </div>

        <ul className="space-y-4">
          {fighterFights.map((fight) => (
            <li key={fight.id}>
              <FightMatchupCard fight={fight} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}