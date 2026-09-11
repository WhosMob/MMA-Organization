import type { MockNews } from "@/mock-database/news";

function formatArticleDate(iso: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(iso));
}

export function ArticleBody({ article }: { article: MockNews }) {
  const paragraphs = article.content
    .split("\n")
    .map((paragraph) => paragraph.trim())
    .filter((paragraph) => paragraph.length > 0);

  return (
    <article className="bg-page">
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
        <p
          className="border-l-2 border-accent-primary pl-4 text-lg font-medium leading-relaxed text-ink sm:text-xl"
          style={{ color: "var(--text-secondary)" }}
        >
          {article.excerpt}
        </p>

        <time
          dateTime={article.publishedAt}
          className="mt-6 block text-xs font-semibold uppercase tracking-[0.2em] text-ink-muted"
        >
          {formatArticleDate(article.publishedAt)}
        </time>

        <div className="mt-8 space-y-6 border-t border-line-subtle pt-8">
          {paragraphs.map((paragraph, index) => (
            <p
              key={index}
              className="text-base leading-relaxed text-ink-secondary sm:text-lg"
            >
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </article>
  );
}
