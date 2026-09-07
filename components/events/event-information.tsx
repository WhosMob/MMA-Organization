import { Building2, CalendarDays, MapPin } from "lucide-react";
import type { ReactNode } from "react";
import type { MockEvent } from "@/mock-database/events";

type InfoItemProps = {
  icon: ReactNode;
  label: string;
  value: ReactNode;
};

function InfoItem({ icon, label, value }: InfoItemProps) {
  return (
    <div className="rounded-lg border border-line-subtle bg-surface p-4 sm:p-5">
      <div className="mb-2 inline-flex size-8 items-center justify-center rounded-md bg-accent-primary-dim text-accent-primary">
        {icon}
      </div>
      <dt className="text-[11px] font-semibold uppercase tracking-wider text-ink-muted">
        {label}
      </dt>
      <dd
        className="mt-1 text-sm font-medium sm:text-base"
        style={{ color: "var(--text-primary)" }}
      >
        {value}
      </dd>
    </div>
  );
}

function formatEventDate(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

export function EventInformation({ event }: { event: MockEvent }) {
  const isUpcoming = event.status === "UPCOMING";

  return (
    <section className="py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 space-y-2 md:mb-12">
          <p className="inline-flex w-fit items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-accent-primary">
            <span className="inline-block size-1.5 rounded-full bg-accent-primary" />
            Event Details
          </p>
          <h2
            className="font-heading text-4xl font-bold uppercase leading-[0.95] tracking-tight sm:text-5xl"
            style={{ color: "var(--text-primary)" }}
          >
            Event Information
          </h2>
        </div>

        <dl className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          <InfoItem
            icon={<CalendarDays className="size-4" />}
            label="Date"
            value={formatEventDate(event.date)}
          />
          <InfoItem
            icon={<MapPin className="size-4" />}
            label="Location"
            value={event.location}
          />
          <InfoItem
            icon={<Building2 className="size-4" />}
            label="Venue"
            value={event.venue}
          />
          <InfoItem
            icon={<Building2 className="size-4" />}
            label="Status"
            value={
              <span className="inline-flex items-center gap-1.5">
                <span
                  className={`inline-block size-1.5 rounded-full ${
                    isUpcoming ? "bg-accent-primary" : "bg-success"
                  }`}
                />
                {isUpcoming ? "Upcoming" : "Completed"}
              </span>
            }
          />
        </dl>
      </div>
    </section>
  );
}