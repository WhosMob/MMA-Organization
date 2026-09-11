import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { MockNews } from "@/mock-database/news";

function formatHeroDate(iso: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(iso));
}

export function NewsHero({ article }: { article: MockNews }) {
  const hasImage = article.imageUrl !== "";

  return (
    <section className="relative overflow-hidden border-b border-line-subtle bg-elevated">
      <div className="relative">
        {hasImage ? (
          <Image
            src={article.imageUrl}
            alt={article.title}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        ) : (
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(135deg, var(--bg-elevated), var(--bg-subtle))",
            }}
          />
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-black/30" />

        <div className="relative mx-auto flex min-h-[60vh] w-full max-w-7xl flex-col justify-between gap-10 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
          <Link
            href="/news"
            className="group inline-flex w-fit items-center gap-2 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/80 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary"
          >
            <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-0.5" />
            Back to News
          </Link>

          <div className="max-w-3xl pb-8 sm:pb-10 lg:pb-12">
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-white/20 bg-black/40 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-white backdrop-blur-sm">
              <span className="inline-block size-1.5 rounded-full bg-accent-primary" />
              {article.category}
            </span>

            <h1 className="mt-5 font-heading text-4xl font-bold uppercase leading-[0.95] tracking-tight text-white sm:text-5xl md:text-6xl">
              {article.title}
            </h1>

            <p className="mt-5 text-sm font-medium text-ink-secondary">
              {formatHeroDate(article.publishedAt)}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
