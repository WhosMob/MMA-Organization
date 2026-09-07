import { Trophy } from "lucide-react";
import { FightMatchupCard } from "@/components/fighters/fight-matchup-card";
import type { FighterFight } from "@/lib/fights";
import type { MockEvent } from "@/mock-database/events";

type FightGroupProps = {
  heading: string;
  fights: FighterFight[];
  featured?: boolean;
};

function FightGroup({ heading, fights, featured }: FightGroupProps) {
  return (
    <div className="space-y-4">
      <h3
        className={`font-heading font-bold uppercase tracking-tight ${
          featured ? "text-3xl sm:text-4xl" : "text-2xl sm:text-3xl"
        }`}
        style={{ color: "var(--text-primary)" }}
      >
        {heading}
      </h3>
      <ul className="space-y-4">
        {fights.map((fight) => (
          <li key={fight.id}>
            <FightMatchupCard fight={fight} variant="event" featured={featured} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export function FightCardSection({
  event,
  fights,
}: {
  event: MockEvent;
  fights: FighterFight[];
}) {
  const mainEvent = fights.filter((fight) => fight.cardPosition === "MAIN_EVENT");
  const coMainEvent = fights.filter(
    (fight) => fight.cardPosition === "CO_MAIN_EVENT"
  );
  const mainCard = fights.filter((fight) => fight.cardPosition === "MAIN_CARD");
  const preliminaries = fights.filter(
    (fight) => fight.cardPosition === "PRELIMINARY"
  );

  return (
    <section id="fight-card" className="py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 space-y-2 md:mb-12">
          <p className="inline-flex w-fit items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-accent-primary">
            <span className="inline-block size-1.5 rounded-full bg-accent-primary" />
            Card
          </p>
          <h2
            className="font-heading text-4xl font-bold uppercase leading-[0.95] tracking-tight sm:text-5xl"
            style={{ color: "var(--text-primary)" }}
          >
            Full Fight Card
          </h2>
        </div>

        {fights.length === 0 ? (
          <div className="rounded-xl border border-line-subtle bg-surface p-10 text-center">
            <Trophy className="mx-auto size-8 text-ink-faint" />
            <p
              className="mt-4 font-heading text-2xl font-bold uppercase tracking-tight"
              style={{ color: "var(--text-primary)" }}
            >
              Fight Card Coming Soon
            </p>
            <p className="mt-2 text-sm text-ink-muted">
              No bouts have been announced for {event.name} yet.
            </p>
          </div>
        ) : (
          <div className="space-y-10 md:space-y-12">
            {mainEvent.length > 0 && (
              <FightGroup heading="Main Event" fights={mainEvent} featured />
            )}
            {coMainEvent.length > 0 && (
              <FightGroup heading="Co-Main Event" fights={coMainEvent} featured />
            )}
            {mainCard.length > 0 && (
              <FightGroup heading="Main Card" fights={mainCard} />
            )}
            {preliminaries.length > 0 && (
              <FightGroup heading="Preliminary" fights={preliminaries} />
            )}
          </div>
        )}
      </div>
    </section>
  );
}