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
  isLoser: boolean;
  featured?: boolean;
};

function FighterPanel({
  fighter,
  isWinner,
  isLoser,
  featured,
}: FighterPanelProps) {
  return (
    <Link
      href={`/fighters/${fighter.id}`}
      aria-label={`Open ${fighter.name} profile`}
      className={`group flex min-w-0 flex-col items-center rounded-lg text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary sm:gap-4 ${
        isLoser ? "gap-2 opacity-60 sm:opacity-100" : "gap-2 sm:gap-4"
      }`}
    >
      <div
        className={`relative w-24 shrink-0 sm:w-full sm:shrink ${
          featured
            ? "sm:max-w-[14rem] lg:max-w-[16rem]"
            : "sm:max-w-[10rem] lg:max-w-[12rem]"
        }`}
      >
        <div
          className={`relative aspect-[3/4] overflow-hidden rounded-lg border transition-all duration-200 ${
            isWinner
              ? "border-accent-primary ring-1 ring-accent-primary/50 sm:ring-2 sm:ring-accent-primary/60"
              : isLoser
                ? "border-line-subtle/50 group-hover:border-line sm:border-line-subtle"
                : "border-line-subtle group-hover:border-line"
          }`}
        >
          {fighter.imageUrl ? (
            <img
              src={fighter.imageUrl}
              alt={`${fighter.name} portrait`}
              className={`h-full w-full object-cover transition-transform duration-300 group-hover:scale-105 ${
                isLoser
                  ? "brightness-[0.85] saturate-[0.85] group-hover:brightness-100 group-hover:saturate-100 sm:brightness-100 sm:saturate-100"
                  : ""
              }`}
            />
          ) : (
            <div
              className={`absolute inset-0 flex items-center justify-center bg-gradient-to-br from-elevated via-subtle to-base ${
                isWinner ? "from-accent-primary-dim via-elevated to-subtle" : ""
              }`}
            >
              <span
                className={`font-heading font-bold uppercase tracking-tight ${
                  isWinner
                    ? "text-2xl text-accent-primary sm:text-4xl sm:text-[var(--text-faint)] lg:text-5xl"
                    : "text-2xl text-[var(--text-faint)] sm:text-4xl lg:text-5xl"
                }`}
              >
                {getInitials(fighter.name)}
              </span>
            </div>
          )}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          {(isWinner || fighter.isChampion) && (
            <span className="absolute left-1.5 top-1.5 inline-flex items-center rounded bg-accent-primary px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-wider text-white sm:left-2 sm:top-2 sm:rounded-md sm:px-2 sm:py-0.5 sm:text-[9px]">
              {isWinner ? "Winner" : "Champion"}
            </span>
          )}
        </div>
      </div>

      <div className="w-full min-w-0 max-w-full px-0.5 sm:px-0">
        <h3
          className={`truncate font-heading uppercase leading-tight tracking-tight ${
            isWinner
              ? "text-sm font-extrabold text-accent-primary sm:text-xl sm:font-bold sm:text-[var(--text-primary)] lg:text-2xl"
              : isLoser
                ? "text-sm font-bold text-ink-secondary sm:text-xl sm:font-bold sm:text-[var(--text-primary)] lg:text-2xl"
                : "text-sm font-bold text-[var(--text-primary)] sm:text-xl sm:font-bold lg:text-2xl"
          }`}
        >
          {fighter.name}
        </h3>
        <p
          className={`mt-0.5 text-[10px] font-medium sm:mt-1 sm:text-sm ${
            isLoser ? "text-ink-faint sm:text-ink-muted" : "text-ink-muted"
          }`}
        >
          {fighter.record}
        </p>
        <p className="mt-px text-[8px] font-semibold uppercase tracking-wider text-ink-faint sm:mt-0.5 sm:text-[11px]">
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

  const desktopLabelSize =
    variant === "fighter"
      ? featured
        ? "text-3xl sm:text-6xl"
        : "text-xl sm:text-5xl lg:text-6xl"
      : featured
        ? "text-3xl sm:text-4xl lg:text-5xl"
        : "text-xl sm:text-2xl lg:text-3xl";

  return (
    <article
      className={`mx-auto w-full max-w-5xl rounded-lg border p-3 transition-colors duration-200 sm:p-6 lg:p-8 ${cardClasses} ${
        featured ? "max-w-6xl" : ""
      } ${featuredClasses}`}
    >
      <div className="flex items-center justify-between gap-2 sm:gap-4">
        <p className="inline-flex items-center gap-1.5 text-[9px] font-semibold uppercase tracking-wider text-ink-muted sm:gap-2 sm:text-[11px]">
          <span className="inline-block size-1 rounded-full bg-accent-primary sm:size-1.5" />
          {formatCardPosition(fight.cardPosition)}
        </p>
        {isUpcoming && (
          <span className="inline-flex items-center rounded bg-accent-primary px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-wider text-white sm:rounded-md sm:px-2.5 sm:py-1 sm:text-[10px]">
            Upcoming
          </span>
        )}
      </div>

      <div className="mt-4 grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-2 sm:mt-6 sm:gap-5 lg:gap-8">
        <FighterPanel
          fighter={fight.fighter1}
          isWinner={winnerId === fight.fighter1.id}
          isLoser={winnerId !== null && winnerId !== fight.fighter1.id}
          featured={featured}
        />

        <div className="flex w-20 shrink-0 min-w-0 flex-col items-center px-1 sm:w-auto sm:shrink sm:gap-2">
          {isUpcoming ? (
            <span
              className={`font-heading font-bold uppercase tracking-tight text-ink-faint ${
                featured ? "text-4xl sm:text-7xl" : "text-3xl sm:text-6xl"
              }`}
            >
              VS
            </span>
          ) : (
            <>
              <span
                className={`sm:hidden font-heading font-bold uppercase tracking-tight text-ink-faint ${
                  featured ? "text-4xl sm:text-7xl" : "text-3xl sm:text-6xl"
                }`}
              >
                VS
              </span>
              <span
                className={`hidden sm:block font-heading font-bold uppercase leading-none tracking-tight text-balance ${desktopLabelSize} ${resultLabel.className}`}
              >
                {resultLabel.text}
              </span>
              {fight.result && (
                <>
                  <span className="hidden sm:block mt-1 text-center text-[11px] font-bold uppercase tracking-wider text-ink-secondary sm:text-xs">
                    {formatMethod(fight.result.method)}
                  </span>
                  <span className="hidden sm:block text-center text-[11px] uppercase tracking-wider text-ink-muted sm:text-xs">
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
          isLoser={winnerId !== null && winnerId !== fight.fighter2.id}
          featured={featured}
        />
      </div>

      {fight.result && (
        <div className="mt-3 flex flex-col items-center gap-0.5 sm:hidden">
          <span className="text-center text-[9px] font-bold uppercase tracking-wider text-ink-secondary">
            {formatMethod(fight.result.method)}
          </span>
          <span className="text-center text-[8px] uppercase tracking-wider text-ink-muted">
            R{fight.result.round} · {fight.result.time}
          </span>
        </div>
      )}

      <div className="mt-4 flex flex-col items-center gap-1 border-t border-line-subtle pt-3 text-center sm:mt-6 sm:flex-row sm:justify-center sm:gap-x-3 sm:gap-y-0 sm:pt-4">
        {variant === "fighter" ? (
          <Link
            href={`/events/${fight.event.slug}`}
            className="font-heading text-sm font-semibold uppercase leading-tight tracking-tight text-ink-secondary transition-colors hover:text-accent-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary sm:text-lg"
          >
            {fight.event.name}
          </Link>
        ) : (
          <p
            className="font-heading text-sm font-semibold uppercase leading-tight tracking-tight sm:text-lg"
            style={{ color: "var(--text-primary)" }}
          >
            {fight.weightClass}
          </p>
        )}
        <p className="inline-flex items-center gap-1 text-[10px] text-ink-muted sm:gap-1.5 sm:text-sm">
          <Calendar className="size-3 sm:size-3.5" />
          {formatDate(fight.date)}
        </p>
      </div>
    </article>
  );
}