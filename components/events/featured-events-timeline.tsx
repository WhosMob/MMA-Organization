"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { CalendarDays, ChevronLeft, ChevronRight, MapPin, Swords } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import type { EventListItem } from "@/lib/fights";

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

function defaultCurrentIndex(events: EventListItem[]) {
  const index = events.findIndex((event) => event.status === "UPCOMING");
  return index === -1 ? 0 : index;
}

function FeaturedCard({
  event,
  emphasised,
}: {
  event: EventListItem;
  emphasised?: boolean;
}) {
  const isUpcoming = event.status === "UPCOMING";

  return (
    <div
      className={cn(
        "group relative flex h-full w-full flex-col overflow-hidden rounded-lg",
        emphasised
          ? "ring-2 ring-accent-primary shadow-[0_0_0_1px_rgba(225,6,0,0.35),0_20px_50px_-20px_rgba(0,0,0,0.8)]"
          : "border border-transparent"
      )}
    >
      <div className="relative h-full w-full bg-subtle">
        {event.imageUrl ? (
          <Image
            src={event.imageUrl}
            alt={event.name}
            fill
            sizes="(min-width: 1024px) 720px, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-elevated via-subtle to-base">
            <Swords className="size-12 text-ink-faint" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10" />

        <div className="absolute inset-x-0 bottom-0 flex flex-col gap-2.5 p-5 sm:p-7">
          <span
            className={cn(
              "inline-flex w-fit items-center gap-1.5 rounded-full px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-wider",
              isUpcoming
                ? "bg-accent-primary text-white"
                : "border border-line-subtle bg-black/40 text-ink-secondary"
            )}
          >
            <span
              className={cn(
                "inline-block size-1.5 rounded-full",
                isUpcoming ? "bg-white" : "bg-accent-primary"
              )}
            />
            {isUpcoming ? "Upcoming" : "Completed"}
          </span>

          <h3 className="font-heading text-2xl font-bold uppercase leading-[0.95] tracking-tight text-white sm:text-3xl lg:text-4xl">
            {event.name}
          </h3>

          <p className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-secondary">
            <CalendarDays className="size-4 shrink-0 text-accent-primary" />
            {formatDate(event.date)}
          </p>

          <p className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-secondary">
            <MapPin className="size-4 shrink-0 text-accent-primary" />
            {event.venue} &middot; {event.location}
          </p>

          <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm font-medium text-ink-secondary">
            {event.mainEvent && (
              <p className="inline-flex items-center gap-1.5">
                <Swords className="size-4 shrink-0 text-accent-primary" />
                {event.mainEvent.fighter1} vs {event.mainEvent.fighter2}
                {event.fightCount > 1 && (
                  <span className="hidden text-ink-muted sm:inline">&middot;</span>
                )}
              </p>
            )}
            {event.fightCount > 0 && (
              <p className="text-ink-muted">
                {event.fightCount} {event.fightCount === 1 ? "Fight" : "Fights"}
              </p>
            )}
          </div>

          <p className="mt-1 text-sm font-semibold uppercase tracking-wider text-accent-primary">
            View Event &rarr;
          </p>
        </div>
      </div>
    </div>
  );
}

export function FeaturedEventsTimeline({
  events,
}: {
  events: EventListItem[];
}) {
  const [current, setCurrent] = useState(() => defaultCurrentIndex(events));
  const count = events.length;
  const trackRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);

  const prev = () => setCurrent((value) => (value - 1 + count) % count);
  const next = () => setCurrent((value) => (value + 1) % count);

  useEffect(() => {
    const node = trackRef.current;
    if (!node) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        setCurrent((value) => (value - 1 + count) % count);
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        setCurrent((value) => (value + 1) % count);
      }
    };

    node.addEventListener("keydown", onKeyDown);
    return () => node.removeEventListener("keydown", onKeyDown);
  }, [count]);

  if (events.length === 0) return null;

  const center = events[current];
  const left = events[(current - 1 + count) % count];
  const right = events[(current + 1) % count];

  return (
    <div>
      <div
        ref={trackRef}
        tabIndex={0}
        role="region"
        aria-label={`Featured events timeline, event ${current + 1} of ${count}: ${center.name}`}
        className="outline-none focus-visible:ring-2 focus-visible:ring-accent-primary"
        onTouchStart={(e) => {
          touchStartX.current = e.touches[0].clientX;
        }}
        onTouchEnd={(e) => {
          if (touchStartX.current === null) return;
          const delta = e.changedTouches[0].clientX - touchStartX.current;
          touchStartX.current = null;
          if (delta > 40) prev();
          else if (delta < -40) next();
        }}
      >
        <div className="flex items-center justify-center gap-3 sm:gap-5">
          <Button
            type="button"
            variant="outline"
            size="icon"
            aria-label="Previous event"
            onClick={prev}
          >
            <ChevronLeft className="size-5" />
          </Button>

          <div className="relative h-80 w-full overflow-hidden sm:h-[26rem] sm:max-w-3xl">
            <Link
              href={`/events/${left.slug}`}
              aria-hidden
              tabIndex={-1}
              className="absolute left-0 top-0 hidden h-full w-1/3 -translate-x-1/4 scale-[0.82] opacity-40 transition-transform duration-300 hover:opacity-60 md:block"
            >
              <FeaturedCard event={left} />
            </Link>

            <Link
              href={`/events/${center.slug}`}
              aria-current={true}
              aria-label={`View ${center.name}`}
              className="absolute left-1/2 top-0 z-30 h-full w-full -translate-x-1/2 md:w-[65%]"
            >
              <FeaturedCard event={center} emphasised />
            </Link>

            <Link
              href={`/events/${right.slug}`}
              aria-hidden
              tabIndex={-1}
              className="absolute right-0 top-0 hidden h-full w-1/3 translate-x-1/4 scale-[0.82] opacity-40 transition-transform duration-300 hover:opacity-60 md:block"
            >
              <FeaturedCard event={right} />
            </Link>
          </div>

          <Button
            type="button"
            variant="outline"
            size="icon"
            aria-label="Next event"
            onClick={next}
          >
            <ChevronRight className="size-5" />
          </Button>
        </div>
      </div>

      <div className="mt-5 flex items-center justify-center gap-3">
        <p className="text-xs font-semibold uppercase tracking-wider text-ink-muted">
          {current + 1} / {count}
        </p>
        <ol className="flex items-center gap-1.5" aria-hidden>
          {events.map((event, index) => (
            <li key={event.id}>
              <span
                className={cn(
                  "block size-1.5 rounded-full transition-colors",
                  index === current ? "bg-accent-primary" : "bg-line"
                )}
              />
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}