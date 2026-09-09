import { WEIGHT_CLASSES, getAllFighters } from "@/lib/fighters";
import { getEvents } from "@/lib/events";
import { fights } from "@/mock-database/fights";

export interface AboutStats {
  divisions: number;
  events: number;
  fighters: number;
  completedFights: number;
}

export async function getAboutStats(): Promise<AboutStats> {
  const [events, allFighters] = await Promise.all([
    getEvents(),
    getAllFighters(),
  ]);

  return {
    divisions: WEIGHT_CLASSES.length,
    events: events.length,
    fighters: allFighters.length,
    completedFights: fights.filter((fight) => fight.status === "COMPLETED")
      .length,
  };
}