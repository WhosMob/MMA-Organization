import type { Metadata } from "next";
import { NewsCarousel } from "@/components/home/news-carousel";
import { NewsBrowser } from "@/components/news/news-browser";
import { getAllNews, getPopularNews } from "@/lib/news";

export const metadata: Metadata = {
  title: "News — MMA Organization",
  description:
    "Latest stories, fighter updates, events, and organization news from MMA Organization.",
};

export default async function NewsPage() {
  const [allNews, popularNews] = await Promise.all([
    getAllNews(),
    getPopularNews(),
  ]);

  return (
    <div className="flex flex-1 flex-col">
      <section className="border-b border-line-subtle bg-elevated py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-4 space-y-2">
            <p className="inline-flex w-fit items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-accent-primary">
              <span className="inline-block size-1.5 rounded-full bg-accent-primary" />
              Editorial
            </p>
            <h1
              className="font-heading text-5xl font-bold uppercase leading-[0.9] tracking-tight sm:text-6xl"
              style={{ color: "var(--text-primary)" }}
            >
              News
            </h1>
          </div>
          <p className="max-w-2xl text-base leading-relaxed text-ink-secondary sm:text-lg">
            Latest stories, fighter updates, events, and organization news.
          </p>
        </div>
      </section>

      {popularNews.length > 0 && (
        <section
          aria-labelledby="popular-news-heading"
          className="py-12 md:py-16"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-8 space-y-2 md:mb-10">
              <p className="inline-flex w-fit items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-accent-primary">
                <span className="inline-block size-1.5 rounded-full bg-accent-primary" />
                Popular &amp; Featured
              </p>
              <h2
                id="popular-news-heading"
                className="font-heading text-4xl font-bold uppercase leading-[0.95] tracking-tight sm:text-5xl"
                style={{ color: "var(--text-primary)" }}
              >
                Popular News
              </h2>
            </div>

            <NewsCarousel news={popularNews} />
          </div>
        </section>
      )}

      <section aria-labelledby="latest-news-heading" className="pb-16 md:pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 space-y-2 md:mb-10">
            <p className="inline-flex w-fit items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-accent-primary">
              <span className="inline-block size-1.5 rounded-full bg-accent-primary" />
              Browse
            </p>
            <h2
              id="latest-news-heading"
              className="font-heading text-4xl font-bold uppercase leading-[0.95] tracking-tight sm:text-5xl"
              style={{ color: "var(--text-primary)" }}
            >
              Latest News
            </h2>
          </div>

          <NewsBrowser news={allNews} />
        </div>
      </section>
    </div>
  );
}
