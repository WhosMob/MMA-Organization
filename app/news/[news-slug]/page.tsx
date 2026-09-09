import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleBody } from "@/components/news/article-body";
import { NewsHero } from "@/components/news/news-hero";
import { RelatedNews } from "@/components/news/related-news";
import { getAllNews, getNewsBySlug } from "@/lib/news";

type NewsParams = {
  "news-slug": string;
};

export async function generateStaticParams(): Promise<NewsParams[]> {
  const allNews = await getAllNews();

  return allNews.map((article) => ({ "news-slug": article.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<NewsParams>;
}): Promise<Metadata> {
  const { "news-slug": slug } = await params;
  const article = await getNewsBySlug(slug);

  if (!article) {
    return { title: "Article Not Found — MMA Organization" };
  }

  return {
    title: `${article.title} — MMA Organization`,
    description: article.excerpt,
  };
}

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<NewsParams>;
}) {
  const { "news-slug": slug } = await params;
  const [article, allNews] = await Promise.all([
    getNewsBySlug(slug),
    getAllNews(),
  ]);

  if (!article) notFound();

  return (
    <div className="flex flex-1 flex-col">
      <NewsHero article={article} />
      <ArticleBody article={article} />
      <RelatedNews article={article} allNews={allNews} />
    </div>
  );
}
