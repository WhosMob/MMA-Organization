import { getEvents } from "@/lib/events";
import { EventsCarousel } from "@/components/home/events-carousel";

export async function EventsSection() {
  const events = await getEvents();

  return (
    <section id="events" className="mx-auto w-full max-w-6xl space-y-10 px-4 py-20 sm:px-6">
      <div className="space-y-2">
        <p className="inline-flex w-fit items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-accent-primary">
          <span className="inline-block size-1.5 rounded-full bg-accent-primary" />
          Upcoming &amp; Recent
        </p>
        <h2 className="font-heading text-4xl font-bold uppercase leading-[0.95] tracking-tight text-ink sm:text-5xl">
          Events
        </h2>
      </div>

      <EventsCarousel events={events} />
    </section>
  );
}
