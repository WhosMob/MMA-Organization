import { getPopularNews } from "@/lib/news";
import { NewsCarousel } from "@/components/home/news-carousel";

export async function NewsSection() {
  const popularNews = await getPopularNews();

  return (
    <section id="news" className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 md:py-24">
      <div className="mb-8 space-y-2 md:mb-12">
        <p className="inline-flex w-fit items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-accent-primary">
          <span className="inline-block size-1.5 rounded-full bg-accent-primary" />
          Popular &amp; Featured
        </p>
        <h2 className="font-heading text-4xl font-bold uppercase leading-[0.95] tracking-tight text-ink sm:text-5xl">
          News
        </h2>
      </div>

      {popularNews.length > 0 ? (
        <NewsCarousel news={popularNews} />
      ) : (
        <p className="text-sm text-ink-muted">No news available yet.</p>
      )}
    </section>
  );
}