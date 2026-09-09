"use client";

import { useMemo, useState } from "react";
import { Newspaper, Search, X } from "lucide-react";
import { cn } from "@/lib/utils";
import type { MockNews, NewsCategory } from "@/mock-database/news";
import { NewsGridCard } from "./news-grid-card";

type CategoryFilter = "ALL" | NewsCategory;

const CATEGORIES: { value: CategoryFilter; label: string }[] = [
  { value: "ALL", label: "All" },
  { value: "FIGHTERS", label: "Fighters" },
  { value: "EVENTS", label: "Events" },
  { value: "ORGANIZATION", label: "Organization" },
  { value: "RANKINGS", label: "Rankings" },
];

export function NewsBrowser({ news }: { news: MockNews[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<CategoryFilter>("ALL");

  const filteredNews = useMemo(() => {
    const q = query.trim().toLowerCase();

    return news.filter((article) => {
      const matchesSearch =
        q === "" ||
        article.title.toLowerCase().includes(q) ||
        article.excerpt.toLowerCase().includes(q);

      const matchesCategory =
        category === "ALL" || article.category === category;

      return matchesSearch && matchesCategory;
    });
  }, [news, query, category]);

  const hasActiveFilters = query !== "" || category !== "ALL";

  function handleClear() {
    setQuery("");
    setCategory("ALL");
  }

  if (news.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-line-subtle bg-surface px-6 py-16 text-center">
        <Newspaper className="size-8 text-ink-faint" />
        <p
          className="mt-4 font-heading text-2xl font-bold uppercase tracking-tight"
          style={{ color: "var(--text-primary)" }}
        >
          No stories yet
        </p>
        <p className="mt-2 max-w-sm text-sm text-ink-muted">
          News and stories will appear here as soon as they are published. Check
          back soon.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4">
        <div className="relative">
          <label htmlFor="news-search" className="sr-only">
            Search news
          </label>
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-ink-muted" />
          <input
            id="news-search"
            type="text"
            placeholder="Search news..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="h-10 w-full rounded-lg border border-line-subtle bg-surface pl-10 pr-4 text-sm text-ink outline-none transition-colors placeholder:text-ink-muted focus:border-accent-primary focus:ring-1 focus:ring-accent-primary/30"
          />
        </div>

        <div className="-mx-4 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0">
          {CATEGORIES.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => setCategory(option.value)}
              className={cn(
                "shrink-0 rounded-full border px-4 py-1.5 text-xs font-semibold uppercase tracking-wider transition-colors",
                category === option.value
                  ? "border-accent-primary bg-accent-primary text-white"
                  : "border-line-subtle bg-surface text-ink-secondary hover:border-line hover:text-ink",
              )}
            >
              {option.label}
            </button>
          ))}

          {hasActiveFilters && (
            <button
              type="button"
              onClick={handleClear}
              className="shrink-0 inline-flex items-center gap-1.5 rounded-full border border-line-subtle bg-surface px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-ink-secondary transition-colors hover:border-line hover:text-ink"
            >
              <X className="size-3" />
              Clear
            </button>
          )}
        </div>
      </div>

      {filteredNews.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl border border-line-subtle bg-surface px-6 py-16 text-center">
          <Search className="size-8 text-ink-faint" />
          <p
            className="mt-4 font-heading text-2xl font-bold uppercase tracking-tight"
            style={{ color: "var(--text-primary)" }}
          >
            No stories found
          </p>
          <p className="mt-2 max-w-sm text-sm text-ink-muted">
            Try a different search or category.
          </p>
          <button
            type="button"
            onClick={handleClear}
            className="mt-4 text-sm font-medium text-accent-primary transition-colors hover:text-accent-primary/80"
          >
            Clear search and filters
          </button>
        </div>
      ) : (
        <>
          <p className="text-sm text-ink-muted">
            {filteredNews.length}{" "}
            {filteredNews.length === 1 ? "story" : "stories"}
          </p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredNews.map((article) => (
              <NewsGridCard key={article.id} article={article} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
