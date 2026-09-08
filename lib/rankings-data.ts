import {
  getP4PRankings,
  getDivisionRankings,
  getChampion,
} from "@/lib/rankings";
import { WEIGHT_CLASSES } from "@/lib/fighters";
import type { MockRanking } from "@/lib/rankings";
import type { MockFighter } from "@/mock-database/fighters";

export interface DivisionRankingsData {
  weightClass: string;
  champion: MockFighter | null;
  contenders: MockRanking[];
}

export interface RankingsPageData {
  p4p: MockRanking[];
  divisions: DivisionRankingsData[];
}

export async function getRankingsPageData(): Promise<RankingsPageData> {
  const [p4p, divisionResults] = await Promise.all([
    getP4PRankings(15),
    Promise.all(
      WEIGHT_CLASSES.map(async (wc) => ({
        weightClass: wc,
        champion: (await getChampion(wc)) ?? null,
        contenders: await getDivisionRankings(wc, 15),
      }))
    ),
  ]);

  return { p4p, divisions: divisionResults };
}
