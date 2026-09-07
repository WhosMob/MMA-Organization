import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { EventHero } from "@/components/events/event-hero";
import { EventInformation } from "@/components/events/event-information";
import { FightCardSection } from "@/components/events/fight-card-section";
import { getEvents, getEventBySlug } from "@/lib/events";
import { getEventFights } from "@/lib/fights";

type EventParams = {
  "event-slug": string;
};

function formatEventDate(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

export async function generateStaticParams(): Promise<EventParams[]> {
  const events = await getEvents();

  return events.map((event) => ({ "event-slug": event.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<EventParams>;
}): Promise<Metadata> {
  const { "event-slug": slug } = await params;
  const event = await getEventBySlug(slug);

  if (!event) {
    return { title: "Event Not Found — MMA Organization" };
  }

  return {
    title: `${event.name} — MMA Organization`,
    description: `${event.name} at ${event.venue}, ${event.location} on ${formatEventDate(
      event.date
    )}. ${event.description}`,
  };
}

export default async function EventDetailPage({
  params,
}: {
  params: Promise<EventParams>;
}) {
  const { "event-slug": slug } = await params;
  const event = await getEventBySlug(slug);

  if (!event) notFound();

  const [eventFights] = await Promise.all([getEventFights(event.id)]);

  return (
    <div className="flex flex-1 flex-col">
      <EventHero event={event} />
      <EventInformation event={event} />
      <FightCardSection event={event} fights={eventFights} />
    </div>
  );
}