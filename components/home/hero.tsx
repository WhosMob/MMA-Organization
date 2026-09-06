import Image from "next/image";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

export function Hero() {
  return (
    <section className="relative flex min-h-[calc(100vh-4rem)] w-full items-center overflow-hidden bg-base">
      <Image
        src=""
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover opacity-40"
      />
      <div className="absolute inset-0 bg-linear-to-r from-base via-base/80 to-base/40" />

      <div className="relative mx-auto flex w-full max-w-6xl flex-col items-center gap-4 px-4 pb-16 pt-10 text-center sm:px-6 lg:pt-6">
        <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-accent-primary">
          <span className="inline-block size-1.5 rounded-full bg-accent-primary" />
          Welcome to
        </p>

        <h1 className="max-w-3xl font-heading text-6xl font-bold uppercase leading-[0.9] tracking-tight text-ink sm:text-7xl lg:text-8xl">
          The Ultimate
          <br />
          Fighting League
        </h1>

        <p className="max-w-xl text-base leading-relaxed text-ink-secondary sm:text-lg">
          A modern and aggressive mixed martial arts promotion. We bring
          together the world&apos;s best fighters, the fiercest rivalries, and
          the biggest nights in combat sports.
        </p>

        <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/fighters"
            className="inline-flex h-12 w-36 items-center justify-center rounded-md border border-line bg-surface/60 text-sm font-semibold uppercase tracking-wide text-ink transition-colors hover:border-line-subtle hover:bg-subtle"
          >
            Fighters
          </Link>
          <Link
            href="/rankings"
            className="inline-flex h-12 w-36 items-center justify-center rounded-md border border-line bg-surface/60 text-sm font-semibold uppercase tracking-wide text-ink transition-colors hover:border-line-subtle hover:bg-subtle"
          >
            Rankings
          </Link>
          <Link
            href="/news"
            className="inline-flex h-12 w-36 items-center justify-center rounded-md border border-line bg-surface/60 text-sm font-semibold uppercase tracking-wide text-ink transition-colors hover:border-line-subtle hover:bg-subtle"
          >
            News
          </Link>
          <Link
            href="/events"
            className="inline-flex h-12 w-36 items-center justify-center rounded-md border border-line bg-surface/60 text-sm font-semibold uppercase tracking-wide text-ink transition-colors hover:border-line-subtle hover:bg-subtle"
          >
            Events
          </Link>
          <Link
            href="/about"
            className="inline-flex h-12 w-36 items-center justify-center rounded-md border border-line bg-surface/60 text-sm font-semibold uppercase tracking-wide text-ink transition-colors hover:border-line-subtle hover:bg-subtle"
          >
            About
          </Link>
          <Link
            href="/contact"
            className="inline-flex h-12 w-36 items-center justify-center rounded-md border border-line bg-surface/60 text-sm font-semibold uppercase tracking-wide text-ink transition-colors hover:border-line-subtle hover:bg-subtle"
          >
            Contact
          </Link>
        </div>
      </div>

      <a
        href="#events"
        aria-label="Scroll down to explore"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-ink-muted transition-colors hover:text-ink"
      >
        <ChevronDown className="size-8 animate-[scroll-bounce_2s_ease-in-out_infinite]" />
      </a>
    </section>
  );
}
