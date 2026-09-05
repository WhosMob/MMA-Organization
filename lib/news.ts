import { news, type MockNews } from "@/mock-database/news";

export async function getPopularNews(): Promise<MockNews[]> {
  return news.filter((article) => article.isPopular);
}