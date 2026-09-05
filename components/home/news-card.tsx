import Image from "next/image";
import { Calendar } from "lucide-react";
import type { MockNews } from "@/mock-database/news";

function formatDate(iso: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(iso));
}

export function NewsCard({ news }: { news: MockNews }) {
  return (
    <article className="group relative flex h-full w-full flex-col overflow-hidden rounded-lg border border-line-subtle bg-surface transition-all duration-300 hover:border-line hover:shadow-xl">
      <div className="relative h-52 w-full overflow-hidden bg-subtle sm:h-56 md:h-64 lg:h-72">
        <Image
          src={news.imageUrl}
          alt={news.title}
          fill
          sizes="(min-width: 1024px) 720px, (min-width: 640px) 640px, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
        <p className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full border border-line-subtle bg-black/40 px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-wider text-white backdrop-blur-sm">
          <Calendar className="size-3" />
          {formatDate(news.publishedAt)}
        </p>
      </div>

      <div className="flex flex-1 flex-col gap-2 p-5 sm:p-6">
        <h3 className="font-heading text-xl font-bold uppercase leading-[1.05] tracking-tight text-ink transition-colors group-hover:text-accent-primary sm:text-2xl">
          {news.title}
        </h3>
        <p className="line-clamp-2 text-sm leading-relaxed text-ink-secondary">
          {news.excerpt}
        </p>
      </div>
    </article>
  );
}