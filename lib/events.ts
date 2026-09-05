import { allEvents, type MockEvent } from "@/mock-database/events";

export async function getEvents(): Promise<MockEvent[]> {
  return allEvents;
}
