import Image from "next/image";
import { CalendarDays, MapPin } from "lucide-react";
import type { MockEvent } from "@/mock-database/events";

function formatEventDate(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

export function EventHero({ event }: { event: MockEvent }) {
  const isUpcoming = event.status === "UPCOMING";

  return (
    <section className="relative overflow-hidden border-b border-line-subtle bg-elevated">
      <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="grid items-center gap-10 lg:gap-16 lg:grid-cols-[1fr_300px] xl:grid-cols-[1fr_340px]">
          <div className="order-1 lg:order-1">
            <div className="mb-5 flex flex-wrap items-center gap-3">
              <span
                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wider ${
                  isUpcoming
                    ? "bg-accent-primary text-white"
                    : "border border-line-subtle bg-subtle text-ink-secondary"
                }`}
              >
                <span
                  className={`inline-block size-1.5 rounded-full ${
                    isUpcoming ? "bg-white" : "bg-accent-primary"
                  }`}
                />
                {isUpcoming ? "Upcoming" : "Event Results"}
              </span>
            </div>

            <h1
              className="font-heading text-5xl font-bold uppercase leading-[0.9] tracking-tight sm:text-6xl xl:text-7xl"
              style={{ color: "var(--text-primary)" }}
            >
              {event.name}
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-relaxed text-ink-secondary sm:text-lg">
              {event.description}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
              <p className="inline-flex items-center gap-2 text-sm font-medium text-ink-secondary">
                <CalendarDays className="size-4 shrink-0 text-accent-primary" />
                {formatEventDate(event.date)}
              </p>
              <p className="inline-flex items-center gap-2 text-sm font-medium text-ink-secondary">
                <MapPin className="size-4 shrink-0 text-accent-primary" />
                {event.venue} &middot; {event.location}
              </p>
            </div>
          </div>

          <div className="order-2 mx-auto w-full max-w-[16rem] sm:max-w-[18rem] lg:order-2 lg:max-w-none lg:mx-0">
            <div className="relative aspect-[3/4] overflow-hidden rounded-xl border border-line-subtle bg-subtle">
              <Image
                src={event.imageUrl}
                alt={event.name}
                fill
                priority
                sizes="(min-width: 1024px) 340px, 288px"
                className="object-cover"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}