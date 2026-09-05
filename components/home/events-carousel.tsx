"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import type { MockEvent } from "@/mock-database/events";

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

function defaultCurrentIndex(events: MockEvent[]) {
  const index = events.findIndex((event) => event.status === "UPCOMING");
  return index === -1 ? 0 : index;
}

function EventCard({
  event,
  emphasised,
  deemphasised,
}: {
  event: MockEvent;
  emphasised?: boolean;
  deemphasised?: boolean;
}) {
  return (
    <div
      className={cn(
        "group relative flex h-full w-full flex-col overflow-hidden rounded-lg border bg-surface",
        emphasised
          ? "border-line-subtle shadow-[0_0_0_1px_rgba(225,6,0,0.35),0_20px_50px_-20px_rgba(0,0,0,0.8)]"
          : "border-transparent",
      )}
    >
      <div className="relative h-full w-full bg-subtle">
        <Image
          src={event.imageUrl}
          alt={event.name}
          fill
          sizes="(min-width: 1024px) 720px, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/10" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent" />

        <div className="absolute inset-x-0 bottom-0 flex flex-col gap-3 p-6">
          <div className="flex items-center gap-2">
            <span
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-wider",
                event.status === "UPCOMING"
                  ? "bg-accent-primary text-white"
                  : "border border-line-subtle bg-black/40 text-ink-secondary",
              )}
            >
              <span
                className={cn(
                  "inline-block size-1.5 rounded-full",
                  event.status === "UPCOMING" ? "bg-white" : "bg-accent-primary",
                )}
              />
              {event.status === "UPCOMING" ? "Upcoming" : formatDate(event.date)}
            </span>
          </div>
          <h3 className="font-heading text-2xl font-bold uppercase leading-[0.95] tracking-tight text-white sm:text-3xl">
            {event.name}
          </h3>
          <p className="flex items-center gap-1.5 text-sm font-medium text-ink-secondary">
            {!deemphasised && (
              <MapPin className="size-4 shrink-0 text-accent-primary" />
            )}
            {event.venue} &middot; {event.location}
          </p>
        </div>
      </div>
    </div>
  );
}

export function EventsCarousel({ events }: { events: MockEvent[] }) {
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

  const center = events[current];
  const left = events[(current - 1 + count) % count];
  const right = events[(current + 1) % count];

  return (
    <div
      ref={trackRef}
      tabIndex={0}
      role="region"
      aria-label="Events carousel"
      className="outline-none focus-visible:ring-2 focus-visible:ring-ring"
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

        <div className="relative h-80 w-full overflow-hidden sm:h-[26rem] sm:max-w-4xl">
          <Link
            href={`/events/${left.slug}`}
            aria-label={left.name}
            tabIndex={-1}
            aria-hidden
            className="absolute left-0 top-0 hidden h-full w-1/3 -translate-x-1/4 scale-[0.82] opacity-40 transition-transform duration-300 hover:opacity-60 md:block"
          >
            <EventCard event={left} deemphasised />
          </Link>

          <Link
            href={`/events/${center.slug}`}
            aria-current={true}
            className="absolute left-1/2 top-0 z-30 h-full w-full -translate-x-1/2 md:w-[70%]"
          >
            <div className="relative h-full ring-2 ring-accent-primary">
              <EventCard event={center} emphasised />
            </div>
          </Link>

          <Link
            href={`/events/${right.slug}`}
            aria-label={right.name}
            tabIndex={-1}
            aria-hidden
            className="absolute right-0 top-0 hidden h-full w-1/3 translate-x-1/4 scale-[0.82] opacity-40 transition-transform duration-300 hover:opacity-60 md:block"
          >
            <EventCard event={right} deemphasised />
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
  );
}
