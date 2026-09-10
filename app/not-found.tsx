import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function NotFound() {
  return (
    <section className="flex flex-1 flex-col items-center justify-center px-4 py-24 sm:px-6">
      <div className="flex flex-col items-center text-center">
        <p
          aria-hidden="true"
          className="select-none bg-linear-to-b from-ink via-ink to-ink-muted bg-clip-text font-heading text-7xl font-bold uppercase leading-none tracking-tight text-transparent sm:text-8xl lg:text-9xl"
        >
          404
        </p>

        <h1
          className="mt-6 font-heading text-3xl font-bold uppercase tracking-widest sm:text-4xl"
          style={{ color: "var(--text-primary)" }}
        >
          Page Not Found
        </h1>

        <div aria-hidden="true" className="mt-6 h-px w-14 bg-accent-primary" />

        <p
          className="mt-6 max-w-md text-base leading-relaxed sm:text-lg"
          style={{ color: "var(--text-secondary)" }}
        >
          The page you&apos;re looking for doesn&apos;t exist or may have
          moved.
        </p>

        <Link
          href="/"
          className={cn(
            buttonVariants({ variant: "default", size: "lg" }),
            "mt-10 h-12 rounded-md px-8 text-sm font-semibold uppercase tracking-wide",
          )}
        >
          Back to Home
        </Link>
      </div>
    </section>
  );
}