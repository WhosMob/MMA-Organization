import { fighters, type MockFighter, type RankingMovement } from "@/mock-database/fighters";

export interface MockRanking {
  position: number;
  fighterId: string;
  fighterName: string;
  fighterNickname: string | null;
  record: string;
  weightClass: string;
  imageUrl: string;
  movement: RankingMovement;
  movementChange: number;
}

function fighterToRanking(fighter: MockFighter, type: "p4p" | "division"): MockRanking {
  const position = type === "p4p" ? fighter.rankings.p4p : fighter.rankings.division;
  const movement = type === "p4p" ? fighter.movement.p4p : fighter.movement.division;
  const movementChange = type === "p4p" ? fighter.p4pMovementChange : fighter.divisionMovementChange;

  return {
    position: position!,
    fighterId: fighter.id,
    fighterName: fighter.name,
    fighterNickname: fighter.nickname,
    record: fighter.record,
    weightClass: fighter.weightClass,
    imageUrl: fighter.imageUrl,
    movement: movement ?? "STABLE",
    movementChange,
  };
}

export async function getP4PRankings(limit: number = 15): Promise<MockRanking[]> {
  return fighters
    .filter((f) => f.rankings.p4p !== null)
    .sort((a, b) => a.rankings.p4p! - b.rankings.p4p!)
    .slice(0, limit)
    .map((f) => fighterToRanking(f, "p4p"));
}

export async function getDivisionRankings(weightClass: string, limit: number = 15): Promise<MockRanking[]> {
  return fighters
    .filter((f) => f.weightClass === weightClass && f.rankings.division !== null)
    .sort((a, b) => a.rankings.division! - b.rankings.division!)
    .slice(0, limit)
    .map((f) => fighterToRanking(f, "division"));
}

export async function getChampion(weightClass: string): Promise<MockFighter | undefined> {
  return fighters.find((f) => f.weightClass === weightClass && f.isChampion);
}

export async function getAllChampions(): Promise<MockFighter[]> {
  return fighters.filter((f) => f.isChampion);
}
