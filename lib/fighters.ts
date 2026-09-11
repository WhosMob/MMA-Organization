import { fighters, type MockFighter } from "@/mock-database/fighters";

export const WEIGHT_CLASSES = [
  "Heavyweight",
  "Light Heavyweight",
  "Middleweight",
  "Welterweight",
  "Lightweight",
  "Featherweight",
  "Bantamweight",
  "Flyweight",
] as const;

export type WeightClass = (typeof WEIGHT_CLASSES)[number];

export const WEIGHT_CLASS_LIMITS: Record<WeightClass, string> = {
  Heavyweight: "265 lbs / 120 kg",
  "Light Heavyweight": "205 lbs / 93 kg",
  Middleweight: "185 lbs / 84 kg",
  Welterweight: "170 lbs / 77 kg",
  Lightweight: "155 lbs / 70 kg",
  Featherweight: "145 lbs / 66 kg",
  Bantamweight: "135 lbs / 61 kg",
  Flyweight: "125 lbs / 57 kg",
};

export function getWeightLimit(weightClass: string): string {
  return WEIGHT_CLASS_LIMITS[weightClass as WeightClass] ?? "—";
}

export async function getAllFighters(): Promise<MockFighter[]> {
  return fighters;
}

export async function getFighterBySlug(
  slug: string
): Promise<MockFighter | undefined> {
  return fighters.find((fighter) => fighter.id === slug);
}
