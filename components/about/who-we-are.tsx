import Image from "next/image";

const whoWeAreImage =
  "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1920&q=80";

export function WhoWeAre() {
  return (
    <section
      aria-labelledby="who-we-are-heading"
      className="py-12 md:py-16 lg:py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-line-subtle bg-subtle">
            <Image
              src={whoWeAreImage}
              alt="Fighters competing inside the octagon"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-accent-primary">
                <span className="inline-block size-1.5 rounded-full bg-accent-primary" />
                Our Story
              </p>
              <h2
                id="who-we-are-heading"
                className="font-heading text-4xl font-bold uppercase leading-[0.95] tracking-tight sm:text-5xl"
                style={{ color: "var(--text-primary)" }}
              >
                Who We Are
              </h2>
            </div>

            <div className="space-y-4 text-base leading-relaxed text-ink-secondary sm:text-lg">
              <p>
                MMA Organization is built around high-level mixed martial arts
                competition — bringing together the best fighters in the world
                and the biggest nights in the sport.
              </p>
              <p>
                Fighters are the core of everything we do. From rising prospects
                to the champions carrying their divisions, our roster drives the
                matchups, the rankings, and the moments that define this
                organization.
              </p>
              <p>
                Events bring that competition together. Through meaningful
                matchmaking, official rankings, and championships that must be
                earned, we build a structure where every fight matters — and
                where competition, respect, and integrity come first.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}