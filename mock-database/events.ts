export type EventStatus = "UPCOMING" | "COMPLETED";

export interface MockEvent {
  id: string;
  name: string;
  slug: string;
  date: Date;
  location: string;
  venue: string;
  imageUrl: string;
  description: string;
  status: EventStatus;
}

export const upcomingEvent: MockEvent = {
  id: "evt-001",
  name: "MMA — Night of Champions",
  slug: "night-of-champions",
  date: new Date("2026-11-14T23:00:00.000Z"),
  location: "Las Vegas, Nevada",
  venue: "T-Mobile Arena",
  imageUrl:
    "https://images.unsplash.com/photo-1787906678460-0b2b7a0ea47c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzfHx8ZW58MHx8fHx8",
  description:
    "The best fighters in the world collide in MMA — Night of Champions. Titles on the line, legacies at stake.",
  status: "UPCOMING",
};

export const futureEvents: MockEvent[] = [
  {
    id: "evt-006",
    name: "MMA — Warpath",
    slug: "mma-warpath",
    date: new Date("2027-02-20T23:00:00.000Z"),
    location: "New York, New York",
    venue: "Madison Square Garden",
    imageUrl:
      "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=1920&q=80",
    description:
      "The road to the championship begins as the promotion returns for the biggest night of the year.",
    status: "UPCOMING",
  },
];

export const pastEvents: MockEvent[] = [
  {
    id: "evt-002",
    name: "MMA 40 — Collision Course",
    slug: "mma-40-collision-course",
    date: new Date("2026-08-22T23:00:00.000Z"),
    location: "London, England",
    venue: "O2 Arena",
    imageUrl:
      "https://images.unsplash.com/photo-1552072092-7f42b515721a?auto=format&fit=crop&w=1600&q=80",
    description:
      "Two undefeated champions finally collide in a blockbuster superfight.",
    status: "COMPLETED",
  },
  {
    id: "evt-003",
    name: "MMA 39 — Homecoming",
    slug: "mma-39-homecoming",
    date: new Date("2026-06-06T23:00:00.000Z"),
    location: "Rio de Janeiro, Brazil",
    venue: "Jeunesse Arena",
    imageUrl:
      "https://images.unsplash.com/photo-1508609349937-119721b8a683?auto=format&fit=crop&w=1600&q=80",
    description:
      "A hometown hero looks to claim gold in front of a sold-out crowd.",
    status: "COMPLETED",
  },
  {
    id: "evt-004",
    name: "MMA 38 — Ground Zero",
    slug: "mma-38-ground-zero",
    date: new Date("2026-04-04T23:00:00.000Z"),
    location: "Sydney, Australia",
    venue: "Qudos Bank Arena",
    imageUrl:
      "https://images.unsplash.com/photo-1505663912201-a46696d6c8a1?auto=format&fit=crop&w=1600&q=80",
    description:
      "A stacked card from top to bottom delivers fireworks Down Under.",
    status: "COMPLETED",
  },
  {
    id: "evt-005",
    name: "MMA 37 — All In",
    slug: "mma-37-all-in",
    date: new Date("2026-02-14T23:00:00.000Z"),
    location: "Abu Dhabi, UAE",
    venue: "Etihad Arena",
    imageUrl:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1600&q=80",
    description:
      "The first card of the year sets the tone with a championship double-header.",
    status: "COMPLETED",
  },
];

export const allEvents: MockEvent[] = [...pastEvents, upcomingEvent, ...futureEvents].sort(
  (a, b) => a.date.getTime() - b.date.getTime(),
);

