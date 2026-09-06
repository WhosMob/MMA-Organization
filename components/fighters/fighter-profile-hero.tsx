import type { MockFighter } from "@/mock-database/fighters";

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 3)
    .toUpperCase();
}

function FighterProfileHero({ fighter }: { fighter: MockFighter }) {
  return (
    <section className="relative overflow-hidden border-b border-line-subtle bg-elevated">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-20">
        <div className="grid items-center gap-10 lg:gap-16 lg:grid-cols-[1fr_340px] xl:grid-cols-[1fr_400px]">
          <div className="order-2 lg:order-1">
            <div className="mb-4 flex flex-wrap items-center gap-x-4 gap-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-primary">
                {fighter.weightClass}
              </p>
              {fighter.isChampion && (
                <span className="inline-flex items-center gap-1.5 rounded-md bg-accent-primary px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                  Champion
                </span>
              )}
            </div>

            <h1 className="font-heading text-5xl font-bold uppercase leading-[0.9] tracking-tight sm:text-6xl xl:text-7xl" style={{ color: "var(--text-primary)" }}>
              {fighter.name}
            </h1>

            {fighter.nickname && (
              <p className="mt-3 text-lg text-ink-secondary sm:text-xl">
                &ldquo;{fighter.nickname}&rdquo;
              </p>
            )}

            <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2">
              <span className="font-heading text-3xl font-bold uppercase tracking-tight sm:text-4xl" style={{ color: "var(--text-primary)" }}>
                {fighter.record}
              </span>
              {fighter.rankings.p4p !== null && (
                <span className="inline-flex items-center rounded-md bg-accent-primary-dim px-2.5 py-1 text-xs font-semibold uppercase tracking-wider text-accent-primary">
                  P4P #{fighter.rankings.p4p}
                </span>
              )}
              {fighter.rankings.division !== null && (
                <span className="inline-flex items-center rounded-md bg-subtle px-2.5 py-1 text-xs font-semibold uppercase tracking-wider text-ink-secondary">
                  #{fighter.rankings.division}
                  <span className="ml-1">
                    {fighter.weightClass}
                  </span>
                </span>
              )}
            </div>
          </div>

          <div className="order-1 mx-auto w-full max-w-xs lg:order-2 lg:max-w-none lg:mx-0">
            <div className="relative aspect-[3/4] overflow-hidden rounded-xl border border-line-subtle bg-subtle">
              {fighter.imageUrl ? (
                <img
                  src={fighter.imageUrl}
                  alt={`${fighter.name} portrait`}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-elevated via-subtle to-base">
                  <span className="font-heading text-7xl font-bold uppercase tracking-tight text-ink-faint sm:text-8xl">
                    {getInitials(fighter.name)}
                  </span>
                </div>
              )}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export { FighterProfileHero };