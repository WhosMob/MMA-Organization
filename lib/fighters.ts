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

export async function getAllFighters(): Promise<MockFighter[]> {
  return fighters;
}
