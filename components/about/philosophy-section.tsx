import { Handshake, ShieldCheck, Swords } from "lucide-react";

const values = [
  {
    icon: Swords,
    title: "Competition",
    description:
      "Meaningful matchups at the highest level. Every fight is built to matter — challenging opponents, high-level performance, and stakes in every division.",
  },
  {
    icon: Handshake,
    title: "Respect",
    description:
      "Respect between fighters, opponents, and the sport itself. The fiercest rivalries are built on athletes who honor what it takes to get there.",
  },
  {
    icon: ShieldCheck,
    title: "Integrity",
    description:
      "Fairness and credibility in everything we do — rankings, championships, and results that fighters and fans can trust.",
  },
] as const;

export function PhilosophySection() {
  return (
    <section
      aria-labelledby="philosophy-heading"
      className="border-y border-line-subtle bg-elevated py-12 md:py-16 lg:py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 space-y-2 text-center md:mb-14">
          <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-accent-primary">
            <span className="inline-block size-1.5 rounded-full bg-accent-primary" />
            Core Values
          </p>
          <h2
            id="philosophy-heading"
            className="font-heading text-4xl font-bold uppercase leading-[0.95] tracking-tight sm:text-5xl"
            style={{ color: "var(--text-primary)" }}
          >
            Our Philosophy
          </h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {values.map(({ icon: Icon, title, description }) => (
            <article
              key={title}
              className="group rounded-lg border border-line bg-surface p-6 sm:p-8 transition-colors hover:border-line-subtle hover:bg-subtle"
            >
              <Icon className="size-8 text-accent-primary" />
              <h3
                className="mt-5 font-heading text-2xl font-bold uppercase tracking-tight sm:text-3xl"
                style={{ color: "var(--text-primary)" }}
              >
                {title}
              </h3>
              <p
                className="mt-3 text-sm leading-relaxed sm:text-base"
                style={{ color: "var(--text-secondary)" }}
              >
                {description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}