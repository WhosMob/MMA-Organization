import type { MockNews } from "@/mock-database/news";
import { NewsGridCard } from "./news-grid-card";

function sortByPublishedDesc(
  a: MockNews,
  b: MockNews,
): number {
  return (
    new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

export function RelatedNews({
  article,
  allNews,
}: {
  article: MockNews;
  allNews: MockNews[];
}) {
  const others = allNews.filter((item) => item.slug !== article.slug);

  const sameCategory = others
    .filter((item) => item.category === article.category)
    .sort(sortByPublishedDesc);

  const otherCategory = others
    .filter((item) => item.category !== article.category)
    .sort(sortByPublishedDesc);

  const related = [...sameCategory, ...otherCategory].slice(0, 3);

  if (related.length === 0) return null;

  return (
    <section aria-labelledby="related-news-heading" className="bg-base">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
        <div className="mb-8 space-y-2 md:mb-10">
          <p className="inline-flex w-fit items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-accent-primary">
            <span className="inline-block size-1.5 rounded-full bg-accent-primary" />
            Keep Reading
          </p>
          <h2
            id="related-news-heading"
            className="font-heading text-3xl font-bold uppercase leading-[0.95] tracking-tight sm:text-4xl"
            style={{ color: "var(--text-primary)" }}
          >
            Related News
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {related.map((item) => (
            <NewsGridCard key={item.id} article={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
