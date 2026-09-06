import { ArrowLeftRight, Cake, CalendarDays, Globe, Ruler } from "lucide-react";
import type { ReactNode } from "react";
import { calculateAge } from "@/lib/calculate-age";
import type { MockFighter } from "@/mock-database/fighters";

type InfoItemProps = {
  icon: ReactNode;
  label: string;
  value: string;
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
      <dd className="mt-1 text-sm font-medium sm:text-base" style={{ color: "var(--text-primary)" }}>{value}</dd>
    </div>
  );
}

function FighterInformationSection({ fighter }: { fighter: MockFighter }) {
  return (
    <section className="py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 space-y-2 md:mb-12">
          <p className="inline-flex w-fit items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-accent-primary">
            <span className="inline-block size-1.5 rounded-full bg-accent-primary" />
            Profile
          </p>
          <h2 className="font-heading text-4xl font-bold uppercase leading-[0.95] tracking-tight sm:text-5xl" style={{ color: "var(--text-primary)" }}>
            Fighter Information
          </h2>
        </div>

        <dl className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-5">
          <InfoItem
            icon={<Globe className="size-4" />}
            label="Nationality"
            value={fighter.nationality}
          />
          <InfoItem
            icon={<CalendarDays className="size-4" />}
            label="Date of Birth"
            value={fighter.dateOfBirth}
          />
          <InfoItem
            icon={<Cake className="size-4" />}
            label="Age"
            value={`${calculateAge(fighter.dateOfBirth)} years`}
          />
          <InfoItem
            icon={<Ruler className="size-4" />}
            label="Height"
            value={fighter.height}
          />
          <InfoItem
            icon={<ArrowLeftRight className="size-4" />}
            label="Reach"
            value={fighter.reach}
          />
        </dl>
      </div>
    </section>
  );
}

export { FighterInformationSection };