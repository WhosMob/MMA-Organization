import { Calendar } from "lucide-react";
import Link from "next/link";
import type { FighterFight, FighterFightOutcome } from "@/lib/fights";
import type { MockFighter } from "@/mock-database/fighters";
import type { FightCardPosition, FightMethod } from "@/mock-database/fights";

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 3)
    .toUpperCase();
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(`${date}T12:00:00`));
}

function formatMethod(method: FightMethod) {
  switch (method) {
    case "KO":
      return "KO";
    case "TKO":
      return "TKO";
    case "SUBMISSION":
      return "Submission";
    case "UNANIMOUS_DECISION":
      return "U Decision";
    case "SPLIT_DECISION":
      return "S Decision";
    case "MAJORITY_DECISION":
      return "M Decision";
  }
}

function formatCardPosition(position: FightCardPosition) {
  switch (position) {
    case "MAIN_EVENT":
      return "Main Event";
    case "CO_MAIN_EVENT":
      return "Co-Main Event";
    case "MAIN_CARD":
      return "Main Card";
    case "PRELIMINARY":
      return "Preliminary";
  }
}

function getOutcomeClass(outcome: FighterFightOutcome | null) {
  switch (outcome) {
    case "WIN":
      return "text-accent-primary";
    case "LOSS":
      return "text-ink-secondary";
    case "DRAW":
      return "text-warning";
    case "NC":
      return "text-ink-muted";
    default:
      return "text-ink-faint";
  }
}

function getEventResultText(fight: FighterFight) {
  const result = fight.result;
  if (!result || result.outcome !== "WIN") {
    switch (result?.outcome) {
      case "DRAW":
        return "Draw";
      case "NO_CONTEST":
        return "No Contest";
      default:
        return "—";
    }
  }
  const winner =
    result.winnerId === fight.fighter1.id ? fight.fighter1 : fight.fighter2;
  return winner.name;
}

function getEventResultClass(fight: FighterFight) {
  switch (fight.result?.outcome) {
    case "DRAW":
      return "text-warning";
    case "NO_CONTEST":
      return "text-ink-muted";
    default:
      return "text-accent-primary";
  }
}

type FighterPanelProps = {
  fighter: MockFighter;
  isWinner: boolean;
  featured?: boolean;
};

function FighterPanel({ fighter, isWinner, featured }: FighterPanelProps) {
  return (
    <Link
      href={`/fighters/${fighter.id}`}
      aria-label={`Open ${fighter.name} profile`}
      className="group flex min-w-0 flex-col items-center gap-3 rounded-lg text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary sm:gap-4"
    >
      <div
        className={`relative w-full ${
          featured
            ? "max-w-[10rem] sm:max-w-[14rem] lg:max-w-[16rem]"
            : "max-w-[8rem] sm:max-w-[10rem] lg:max-w-[12rem]"
        }`}
      >
        <div
          className={`relative aspect-[3/4] overflow-hidden rounded-lg border transition-all duration-200 ${
            isWinner
              ? "border-accent-primary ring-2 ring-accent-primary/60"
              : "border-line-subtle group-hover:border-line"
          }`}
        >
          {fighter.imageUrl ? (
            <img
              src={fighter.imageUrl}
              alt={`${fighter.name} portrait`}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-elevated via-subtle to-base">
              <span className="font-heading text-3xl font-bold uppercase tracking-tight text-ink-faint sm:text-4xl lg:text-5xl">
                {getInitials(fighter.name)}
              </span>
            </div>
          )}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          {(isWinner || fighter.isChampion) && (
            <span className="absolute left-2 top-2 inline-flex rounded-md bg-accent-primary px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white">
              {isWinner ? "Winner" : "Champion"}
            </span>
          )}
        </div>
      </div>

      <div className="min-w-0 max-w-full">
        <h3
          className={`truncate font-heading font-bold uppercase leading-tight tracking-tight ${
            featured ? "text-xl sm:text-2xl lg:text-3xl" : "text-lg sm:text-xl lg:text-2xl"
          }`}
          style={{ color: "var(--text-primary)" }}
        >
          {fighter.name}
        </h3>
        <p className="mt-1 text-xs font-medium text-ink-muted sm:text-sm">
          {fighter.record}
        </p>
        <p className="mt-0.5 text-[10px] font-semibold uppercase tracking-wider text-ink-faint sm:text-[11px]">
          {fighter.weightClass}
        </p>
      </div>
    </Link>
  );
}

export function FightMatchupCard({
  fight,
  variant = "fighter",
  featured = false,
}: {
  fight: FighterFight;
  variant?: "fighter" | "event";
  featured?: boolean;
}) {
  const isUpcoming = fight.status === "UPCOMING";

  const cardClasses = isUpcoming
    ? "border-accent-primary/30 bg-elevated hover:border-accent-primary/50"
    : "border-line-subtle bg-surface hover:border-line";

  const featuredClasses = featured
    ? "shadow-[0_0_0_1px_rgba(225,6,0,0.25),0_20px_60px_-30px_rgba(0,0,0,0.8)] ring-1 ring-accent-primary/40"
    : "";

  const winnerId = !isUpcoming ? fight.result?.winnerId ?? null : null;

  const resultLabel =
    variant === "fighter"
      ? { text: fight.outcome ?? "—", className: getOutcomeClass(fight.outcome) }
      : {
          text: getEventResultText(fight),
          className: getEventResultClass(fight),
        };

  const headlineSize = featured
    ? "text-3xl sm:text-4xl lg:text-5xl"
    : "text-xl sm:text-2xl lg:text-3xl";

  return (
    <article
      className={`mx-auto w-full max-w-5xl rounded-lg border p-4 transition-colors duration-200 sm:p-6 lg:p-8 ${cardClasses} ${
        featured ? "max-w-6xl" : ""
      } ${featuredClasses}`}
    >
      <div className="flex items-center justify-between gap-4">
        <p className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-ink-muted">
          <span className="inline-block size-1.5 rounded-full bg-accent-primary" />
          {formatCardPosition(fight.cardPosition)}
        </p>
        {isUpcoming && (
          <span className="inline-flex items-center rounded-md bg-accent-primary px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
            Upcoming
          </span>
        )}
      </div>

      <div className="mt-6 grid grid-cols-[1fr_auto_1fr] items-center gap-3 sm:gap-5 lg:gap-8">
        <FighterPanel
          fighter={fight.fighter1}
          isWinner={winnerId === fight.fighter1.id}
          featured={featured}
        />

        <div className="flex flex-col items-center gap-2 px-1">
          {isUpcoming ? (
            <span
              className={`font-heading font-bold uppercase tracking-tight text-ink-faint ${
                featured ? "text-6xl sm:text-7xl" : "text-5xl sm:text-6xl"
              }`}
            >
              VS
            </span>
          ) : (
            <>
              <span
                className={`font-heading font-bold uppercase leading-none tracking-tight text-balance ${
                  variant === "fighter"
                    ? featured
                      ? "text-5xl sm:text-6xl"
                      : "text-4xl sm:text-5xl lg:text-6xl"
                    : headlineSize
                } ${resultLabel.className}`}
              >
                {resultLabel.text}
              </span>
              {fight.result && (
                <>
                  <span className="mt-1 text-center text-[11px] font-bold uppercase tracking-wider text-ink-secondary sm:text-xs">
                    {formatMethod(fight.result.method)}
                  </span>
                  <span className="text-center text-[11px] uppercase tracking-wider text-ink-muted sm:text-xs">
                    R{fight.result.round} · {fight.result.time}
                  </span>
                </>
              )}
            </>
          )}
        </div>

        <FighterPanel
          fighter={fight.fighter2}
          isWinner={winnerId === fight.fighter2.id}
          featured={featured}
        />
      </div>

      <div className="mt-6 flex flex-col items-center gap-1 border-t border-line-subtle pt-4 text-center sm:flex-row sm:justify-center sm:gap-x-3 sm:gap-y-0">
        {variant === "fighter" ? (
          <Link
            href={`/events/${fight.event.slug}`}
            className="font-heading text-lg font-semibold uppercase leading-tight tracking-tight text-ink-secondary transition-colors hover:text-accent-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary"
          >
            {fight.event.name}
          </Link>
        ) : (
          <p
            className="font-heading text-lg font-semibold uppercase leading-tight tracking-tight"
            style={{ color: "var(--text-primary)" }}
          >
            {fight.weightClass}
          </p>
        )}
        <p className="inline-flex items-center gap-1.5 text-xs text-ink-muted sm:text-sm">
          <Calendar className="size-3.5" />
          {formatDate(fight.date)}
        </p>
      </div>
    </article>
  );
}