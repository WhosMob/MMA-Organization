import { allEvents, type MockEvent } from "@/mock-database/events";

export async function getEvents(): Promise<MockEvent[]> {
  return allEvents;
}

export async function getEventById(id: string): Promise<MockEvent | undefined> {
  return allEvents.find((event) => event.id === id);
}

export async function getEventBySlug(
  slug: string
): Promise<MockEvent | undefined> {
  return allEvents.find((event) => event.slug === slug);
}
