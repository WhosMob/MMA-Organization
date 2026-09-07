import type { MockEvent } from "@/mock-database/events";
import type { MockFighter } from "@/mock-database/fighters";
import {
  fights,
  type Fight,
  type FightCardPosition,
  type FightResult,
  type FightStatus,
} from "@/mock-database/fights";
import { getAllFighters } from "@/lib/fighters";
import { getEvents } from "@/lib/events";

export type FighterFightOutcome = "WIN" | "LOSS" | "DRAW" | "NC";

export interface FighterFight {
  id: string;
  selfId: string;
  fighter1: MockFighter;
  fighter2: MockFighter;
  opponent: MockFighter;
  event: MockEvent;
  weightClass: string;
  cardPosition: FightCardPosition;
  date: string;
  status: FightStatus;
  result: FightResult | null;
  outcome: FighterFightOutcome | null;
}

function deriveFighterOutcome(
  fight: Fight,
  fighterId: string
): FighterFightOutcome | null {
  if (fight.status !== "COMPLETED" || fight.result === null) return null;

  switch (fight.result.outcome) {
    case "DRAW":
      return "DRAW";
    case "NO_CONTEST":
      return "NC";
    case "WIN":
      return fight.result.winnerId === fighterId ? "WIN" : "LOSS";
  }
}

export async function getFighterFights(
  fighterId: string
): Promise<FighterFight[]> {
  const [allFighters, allEvents] = await Promise.all([
    getAllFighters(),
    getEvents(),
  ]);

  const fighterById = new Map(allFighters.map((fighter) => [fighter.id, fighter]));
  const eventById = new Map(allEvents.map((event) => [event.id, event]));

  const fighterFights: FighterFight[] = [];

  for (const fight of fights) {
    if (fight.fighter1Id !== fighterId && fight.fighter2Id !== fighterId) {
      continue;
    }

    const fighter1 = fighterById.get(fight.fighter1Id);
    const fighter2 = fighterById.get(fight.fighter2Id);
    const opponentId =
      fight.fighter1Id === fighterId ? fight.fighter2Id : fight.fighter1Id;
    const opponent = fighterById.get(opponentId);
    const event = eventById.get(fight.eventId);

    if (!fighter1 || !fighter2 || !opponent || !event) continue;

    fighterFights.push({
      id: fight.id,
      selfId: fighterId,
      fighter1,
      fighter2,
      opponent,
      event,
      weightClass: fight.weightClass,
      cardPosition: fight.cardPosition,
      date: fight.date,
      status: fight.status,
      result: fight.result,
      outcome: deriveFighterOutcome(fight, fighterId),
    });
  }

  return fighterFights.sort((a, b) => b.date.localeCompare(a.date));
}

export async function getEventFights(
  eventId: string
): Promise<FighterFight[]> {
  const [allFighters, allEvents] = await Promise.all([
    getAllFighters(),
    getEvents(),
  ]);

  const fighterById = new Map(allFighters.map((fighter) => [fighter.id, fighter]));
  const eventById = new Map(allEvents.map((event) => [event.id, event]));

  const eventFights: FighterFight[] = [];

  for (const fight of fights) {
    if (fight.eventId !== eventId) continue;

    const fighter1 = fighterById.get(fight.fighter1Id);
    const fighter2 = fighterById.get(fight.fighter2Id);
    const event = eventById.get(fight.eventId);

    if (!fighter1 || !fighter2 || !event) continue;

    eventFights.push({
      id: fight.id,
      selfId: fight.fighter1Id,
      fighter1,
      fighter2,
      opponent: fighter2,
      event,
      weightClass: fight.weightClass,
      cardPosition: fight.cardPosition,
      date: fight.date,
      status: fight.status,
      result: fight.result,
      outcome: deriveFighterOutcome(fight, fight.fighter1Id),
    });
  }

  return eventFights;
}