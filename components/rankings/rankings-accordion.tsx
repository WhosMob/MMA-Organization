"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import type { MockRanking } from "@/lib/rankings";
import type { MockFighter } from "@/mock-database/fighters";

interface RankingRowProps {
  position: number;
  fighter: {
    id: string;
    name: string;
    nickname: string | null;
    imageUrl: string;
  };
  movement: MockRanking["movement"];
  movementChange: number;
  champion?: boolean;
}

function RankingRow({
  position,
  fighter,
  movement,
  movementChange,
  champion,
}: RankingRowProps) {
  return (
    <Link
      href={`/fighters/${fighter.id}`}
      className="group flex items-center gap-3 px-4 py-2.5 transition-colors hover:bg-surface/50 rounded-lg sm:gap-4 sm:px-5 sm:py-3 no-underline"
      style={{ textDecoration: "none" }}
    >
      <span
        className="font-heading w-7 shrink-0 text-center text-lg font-bold text-ink-faint transition-colors group-hover:text-accent-primary sm:w-9 sm:text-xl"
      >
        {champion ? "" : position}
      </span>

      {fighter.imageUrl ? (
        <img
          src={fighter.imageUrl}
          alt={fighter.name}
          className="h-9 w-9 shrink-0 rounded-full object-cover ring-1 ring-line-subtle transition-all group-hover:ring-accent-primary sm:h-10 sm:w-10"
        />
      ) : (
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-subtle font-heading text-xs font-bold uppercase text-ink-muted ring-1 ring-line-subtle transition-all group-hover:ring-accent-primary sm:h-10 sm:w-10 sm:text-sm">
          {fighter.name
            .split(" ")
            .map((n) => n[0])
            .join("")}
        </div>
      )}

      <span
        className="min-w-0 flex-1 truncate font-heading text-sm font-semibold uppercase tracking-tight transition-colors group-hover:text-accent-primary sm:text-base"
        style={{ color: "var(--text-primary)" }}
      >
        {fighter.name}
      </span>

      <MovementIndicator
        movement={movement}
        change={movementChange}
      />
    </Link>
  );
}

function ChampionRow({ fighter }: { fighter: MockFighter }) {
  return (
    <Link
      href={`/fighters/${fighter.id}`}
      className="group mb-1 flex items-center gap-3 rounded-lg border border-accent-primary/20 bg-accent-primary/5 px-4 py-3 transition-colors hover:bg-accent-primary/10 sm:gap-4 sm:px-5 sm:py-3.5 no-underline"
      style={{ textDecoration: "none" }}
    >
      <span className="w-7 shrink-0 text-center sm:w-9">
        <span className="inline-block rounded bg-accent-primary/15 px-1.5 py-0.5 font-heading text-[9px] font-bold uppercase tracking-wider text-accent-primary sm:text-[10px]">
          CHAMP
        </span>
      </span>

      {fighter.imageUrl ? (
        <img
          src={fighter.imageUrl}
          alt={fighter.name}
          className="h-10 w-10 shrink-0 rounded-full object-cover ring-2 ring-accent-primary/40 transition-all group-hover:ring-accent-primary sm:h-11 sm:w-11"
        />
      ) : (
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent-primary/10 font-heading text-xs font-bold uppercase text-accent-primary ring-2 ring-accent-primary/40 transition-all group-hover:ring-accent-primary sm:h-11 sm:w-11 sm:text-sm">
          {fighter.name
            .split(" ")
            .map((n) => n[0])
            .join("")}
        </div>
      )}

      <span
        className="min-w-0 flex-1 truncate font-heading text-sm font-bold uppercase tracking-tight transition-colors group-hover:text-accent-primary sm:text-base"
        style={{ color: "var(--text-primary)" }}
      >
        {fighter.name}
      </span>

      <MovementIndicator
        movement={fighter.movement.division ?? "STABLE"}
        change={fighter.divisionMovementChange}
      />
    </Link>
  );
}

function MovementIndicator({
  movement,
  change,
}: {
  movement: MockRanking["movement"];
  change: number;
}) {
  switch (movement) {
    case "UP":
      return (
        <span className="shrink-0 text-xs font-medium text-success sm:text-sm">
          ▲{change}
        </span>
      );
    case "DOWN":
      return (
        <span className="shrink-0 text-xs font-medium text-error sm:text-sm">
          ▼{change}
        </span>
      );
    case "NEW":
      return (
        <span className="shrink-0 text-xs font-semibold text-accent-primary sm:text-sm">
          NEW
        </span>
      );
    default:
      return (
        <span className="shrink-0 text-xs text-ink-muted sm:text-sm">—</span>
      );
  }
}

interface DivisionRankingsData {
  weightClass: string;
  champion: MockFighter | null;
  contenders: MockRanking[];
}

interface RankingsAccordionProps {
  p4p: MockRanking[];
  divisions: DivisionRankingsData[];
}

function getSectionTitle(item: string | number, divisions: DivisionRankingsData[]) {
  if (typeof item === "number") {
    return item === 0
      ? "Pound for Pound"
      : divisions[item - 1]?.weightClass ?? "";
  }
  return "";
}

export function RankingsAccordion({
  p4p,
  divisions,
}: RankingsAccordionProps) {
  const [openItems, setOpenItems] = useState<string[]>([]);

  const totalSections = 1 + divisions.length;

  return (
    <Accordion
      value={openItems}
      onValueChange={setOpenItems}
    >
      {Array.from({ length: totalSections }, (_, i) => i).map((index) => {
        const title = getSectionTitle(index, divisions);
        const isP4P = index === 0;
        const divisionIndex = index - 1;

        return (
          <AccordionItem
            key={index}
            value={String(index)}
            className="border-line-subtle"
          >
            <AccordionTrigger
              className={`
                w-full py-3.5 text-left sm:py-4
                ${isP4P
                  ? "border-l-2 border-l-accent-primary pl-4 sm:pl-5"
                  : "pl-4 sm:pl-5"
                }
                hover:no-underline
              `}
            >
              <div className="flex items-center gap-2.5">
                {isP4P && (
                  <span className="inline-block size-1.5 rounded-full bg-accent-primary" />
                )}
                <span
                  className={`
                    font-heading text-lg font-bold uppercase tracking-tight
                    sm:text-xl
                    ${isP4P ? "text-ink" : "text-ink-secondary"}
                  `}
                >
                  {title}
                </span>
              </div>
            </AccordionTrigger>

            <AccordionContent className="px-2 sm:px-3">
              <div className="space-y-1 pb-2">
                {isP4P ? (
                  p4p.map((ranking) => (
                    <RankingRow
                      key={ranking.fighterId}
                      position={ranking.position}
                      fighter={{
                        id: ranking.fighterId,
                        name: ranking.fighterName,
                        nickname: ranking.fighterNickname,
                        imageUrl: ranking.imageUrl,
                      }}
                      movement={ranking.movement}
                      movementChange={ranking.movementChange}
                    />
                  ))
                ) : (
                  <>
                    {divisions[divisionIndex]?.champion && (
                      <ChampionRow
                        fighter={divisions[divisionIndex].champion!}
                      />
                    )}
                    {divisions[divisionIndex]?.contenders.map((ranking) => (
                      <RankingRow
                        key={ranking.fighterId}
                        position={ranking.position}
                        fighter={{
                          id: ranking.fighterId,
                          name: ranking.fighterName,
                          nickname: ranking.fighterNickname,
                          imageUrl: ranking.imageUrl,
                        }}
                        movement={ranking.movement}
                        movementChange={ranking.movementChange}
                      />
                    ))}
                  </>
                )}
              </div>
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
}
