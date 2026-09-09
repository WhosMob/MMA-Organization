import { news, type MockNews, type NewsCategory } from "@/mock-database/news";

export type { MockNews, NewsCategory };

export async function getAllNews(): Promise<MockNews[]> {
  return [...news].sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );
}

export async function getPopularNews(): Promise<MockNews[]> {
  return news.filter((article) => article.isPopular);
}

export async function getNewsBySlug(slug: string): Promise<MockNews | null> {
  return news.find((article) => article.slug === slug) ?? null;
}
