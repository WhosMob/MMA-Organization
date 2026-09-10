import Image from "next/image";

const heroImage =
  "";

export function AboutHero() {
  return (
    <section className="relative flex min-h-[55vh] w-full items-center overflow-hidden border-b border-line-subtle bg-elevated sm:min-h-[65vh]">
      <Image
        src={heroImage}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover opacity-50"
      />
      <div className="absolute inset-0 bg-linear-to-r from-base via-base/80 to-base/40" />

      <div className="relative mx-auto flex w-full max-w-7xl flex-col items-center gap-4 px-4 py-16 text-center sm:px-6 sm:py-24">
        <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-accent-primary">
          <span className="inline-block size-1.5 rounded-full bg-accent-primary" />
          About
        </p>

        <h1
          className="max-w-4xl font-heading text-5xl font-bold uppercase leading-[0.9] tracking-tight sm:text-6xl lg:text-7xl"
          style={{ color: "var(--text-primary)" }}
        >
          The Organization
          <br />
          Behind the Fights
        </h1>

        <p className="max-w-2xl text-base leading-relaxed text-ink-secondary sm:text-lg">
          A modern, premium, and aggressive mixed martial arts promotion built
          on high-level competition, respect, and integrity.
        </p>
      </div>
    </section>
  );
}