import Image from "next/image";
import Link from "next/link";
import { CalendarDays, MapPin, Swords } from "lucide-react";
import type { EventListItem } from "@/lib/fights";

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

export function EventCard({ event }: { event: EventListItem }) {
  const isUpcoming = event.status === "UPCOMING";

  return (
    <Link
      href={`/events/${event.slug}`}
      aria-label={`View ${event.name}`}
      className="group flex h-full flex-col overflow-hidden rounded-lg border border-line-subtle bg-surface transition-colors duration-200 hover:border-line focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary"
    >
      <div className="relative aspect-video w-full overflow-hidden bg-subtle">
        {event.imageUrl ? (
          <Image
            src={event.imageUrl}
            alt={event.name}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-elevated via-subtle to-base">
            <Swords className="size-10 text-ink-faint" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        <span
          className={`absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-wider ${
            isUpcoming
              ? "bg-accent-primary text-white"
              : "border border-line-subtle bg-black/40 text-ink-secondary"
          }`}
        >
          <span
            className={`inline-block size-1.5 rounded-full ${
              isUpcoming ? "bg-white" : "bg-accent-primary"
            }`}
          />
          {isUpcoming ? "Upcoming" : "Completed"}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4 sm:p-5">
        <h3
          className="font-heading text-xl font-bold uppercase leading-[0.95] tracking-tight sm:text-2xl group-hover:text-accent-primary transition-colors"
          style={{ color: "var(--text-primary)" }}
        >
          {event.name}
        </h3>

        <p className="inline-flex items-center gap-1.5 text-sm text-ink-secondary">
          <CalendarDays className="size-3.5 shrink-0 text-accent-primary" />
          {formatDate(event.date)}
        </p>

        <p className="inline-flex items-center gap-1.5 text-sm text-ink-secondary">
          <MapPin className="size-3.5 shrink-0 text-accent-primary" />
          {event.venue} &middot; {event.location}
        </p>

        {event.mainEvent && (
          <p className="inline-flex items-center gap-1.5 text-sm text-ink-muted">
            <Swords className="size-3.5 shrink-0" />
            Main Event: {event.mainEvent.fighter1} vs{" "}
            {event.mainEvent.fighter2}
          </p>
        )}

        <span className="mt-auto pt-2 text-sm font-medium text-accent-primary">
          View Event &rarr;
        </span>
      </div>
    </Link>
  );
}