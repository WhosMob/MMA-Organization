import Image from "next/image";
import Link from "next/link";
import { Calendar } from "lucide-react";
import type { MockNews } from "@/mock-database/news";

function formatDate(iso: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(iso));
}

export function NewsGridCard({ article }: { article: MockNews }) {
  return (
    <Link
      href={`/news/${article.slug}`}
      aria-label={`Read ${article.title}`}
      className="group flex h-full flex-col overflow-hidden rounded-lg border border-line-subtle bg-surface transition-colors duration-200 hover:border-line focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary"
    >
      <div className="relative aspect-video w-full overflow-hidden bg-subtle">
        <Image
          src={article.imageUrl}
          alt={article.title}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <span className="absolute left-3 top-3 inline-flex items-center rounded-full border border-line-subtle bg-black/40 px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-wider text-ink-secondary backdrop-blur-sm">
          {article.category}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4 sm:p-5">
        <h3
          className="font-heading text-lg font-bold uppercase leading-[1.05] tracking-tight transition-colors group-hover:text-accent-primary sm:text-xl"
          style={{ color: "var(--text-primary)" }}
        >
          {article.title}
        </h3>

        <p className="inline-flex items-center gap-1.5 text-xs text-ink-muted">
          <Calendar className="size-3 shrink-0" />
          {formatDate(article.publishedAt)}
        </p>

        <p className="line-clamp-2 text-sm leading-relaxed text-ink-secondary">
          {article.excerpt}
        </p>
      </div>
    </Link>
  );
}
