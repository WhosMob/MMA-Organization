import type { Metadata } from "next";
import { FeaturedEventsTimeline } from "@/components/events/featured-events-timeline";
import { EventsBrowser } from "@/components/events/events-browser";
import { getEventListItems } from "@/lib/fights";

export const metadata: Metadata = {
  title: "Events — MMA Organization",
  description:
    "Browse upcoming and completed MMA Organization events. Search by name or location and filter by status.",
};

export default async function EventsPage() {
  const events = await getEventListItems();

  return (
    <div className="flex flex-1 flex-col">
      <section className="border-b border-line-subtle bg-elevated py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-4 space-y-2">
            <p className="inline-flex w-fit items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-accent-primary">
              <span className="inline-block size-1.5 rounded-full bg-accent-primary" />
              Fight Nights
            </p>
            <h1
              className="font-heading text-5xl font-bold uppercase leading-[0.9] tracking-tight sm:text-6xl"
              style={{ color: "var(--text-primary)" }}
            >
              Events
            </h1>
          </div>
          <p className="max-w-2xl text-base leading-relaxed text-ink-secondary sm:text-lg">
            From title fights to breakthrough performances, explore the
            organization&apos;s upcoming and completed events.
          </p>
        </div>
      </section>

      {events.length > 0 && (
        <section
          aria-labelledby="featured-events-heading"
          className="py-12 md:py-16"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-8 space-y-2 md:mb-10">
              <p className="inline-flex w-fit items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-accent-primary">
                <span className="inline-block size-1.5 rounded-full bg-accent-primary" />
                Timeline
              </p>
              <h2
                id="featured-events-heading"
                className="font-heading text-4xl font-bold uppercase leading-[0.95] tracking-tight sm:text-5xl"
                style={{ color: "var(--text-primary)" }}
              >
                Featured Events
              </h2>
            </div>

            <FeaturedEventsTimeline events={events} />
          </div>
        </section>
      )}

      <section aria-labelledby="all-events-heading" className="pb-16 md:pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 space-y-2 md:mb-10">
            <p className="inline-flex w-fit items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-accent-primary">
              <span className="inline-block size-1.5 rounded-full bg-accent-primary" />
              Browse
            </p>
            <h2
              id="all-events-heading"
              className="font-heading text-4xl font-bold uppercase leading-[0.95] tracking-tight sm:text-5xl"
              style={{ color: "var(--text-primary)" }}
            >
              All Events
            </h2>
          </div>

          <EventsBrowser events={events} />
        </div>
      </section>
    </div>
  );
}