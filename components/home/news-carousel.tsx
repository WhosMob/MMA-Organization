"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { NewsCard } from "@/components/home/news-card";
import type { MockNews } from "@/mock-database/news";

const AUTOPLAY_INTERVAL = 5000;
const SWIPE_THRESHOLD = 40;

const reducedMotionQuery = "(prefers-reduced-motion: reduce)";

function subscribeToReducedMotion(callback: () => void) {
  const mediaQuery = window.matchMedia(reducedMotionQuery);
  mediaQuery.addEventListener("change", callback);
  return () => mediaQuery.removeEventListener("change", callback);
}

function getReducedMotionSnapshot() {
  return window.matchMedia(reducedMotionQuery).matches;
}

function usePrefersReducedMotion() {
  return useSyncExternalStore(
    subscribeToReducedMotion,
    getReducedMotionSnapshot,
    () => false,
  );
}

export function NewsCarousel({ news }: { news: MockNews[] }) {
  const count = news.length;
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);

  const prev = useCallback(() => {
    setCurrent((value) => (value - 1 + count) % count);
  }, [count]);

  const next = useCallback(() => {
    setCurrent((value) => (value + 1) % count);
  }, [count]);

  useEffect(() => {
    if (prefersReducedMotion || paused || count <= 1) return;
    const timer = window.setInterval(next, AUTOPLAY_INTERVAL);
    return () => window.clearInterval(timer);
  }, [prefersReducedMotion, paused, current, count, next]);

  useEffect(() => {
    const node = trackRef.current;
    if (!node) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        prev();
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        next();
      }
    };

    node.addEventListener("keydown", onKeyDown);
    return () => node.removeEventListener("keydown", onKeyDown);
  }, [prev, next]);

  if (count === 0) {
    return null;
  }

  return (
    <div
      ref={trackRef}
      tabIndex={0}
      role="region"
      aria-label="Popular news carousel"
      className="outline-none focus-visible:ring-2 focus-visible:ring-ring"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onTouchStart={(event) => {
        touchStartX.current = event.touches[0].clientX;
      }}
      onTouchEnd={(event) => {
        if (touchStartX.current === null) return;
        const delta = event.changedTouches[0].clientX - touchStartX.current;
        touchStartX.current = null;
        if (delta > SWIPE_THRESHOLD) prev();
        else if (delta < -SWIPE_THRESHOLD) next();
      }}
    >
      <div className="flex items-center justify-center gap-3 sm:gap-5">
        <Button
          type="button"
          variant="outline"
          size="icon"
          aria-label="Previous news"
          onClick={prev}
        >
          <ChevronLeft className="size-5" />
        </Button>

        <div className="relative h-[26rem] w-full overflow-hidden rounded-lg bg-subtle sm:h-[28rem] lg:max-w-4xl lg:h-[30rem]">
          <div
            className={cn(
              "flex h-full",
              !prefersReducedMotion && "transition-transform duration-500 ease-out",
            )}
            style={{ transform: `translateX(-${current * 100}%)` }}
          >
            {news.map((article, index) => (
              <div
                key={article.id}
                className="h-full w-full min-w-full shrink-0"
                aria-hidden={index !== current}
              >
                <Link
                  href={`/news/${article.slug}`}
                  aria-label={article.title}
                  aria-hidden={index !== current}
                  tabIndex={index === current ? 0 : -1}
                  className="block h-full w-full p-1 sm:p-2"
                >
                  <NewsCard news={article} />
                </Link>
              </div>
            ))}
          </div>
        </div>

        <Button
          type="button"
          variant="outline"
          size="icon"
          aria-label="Next news"
          onClick={next}
        >
          <ChevronRight className="size-5" />
        </Button>
      </div>

      <div className="mt-6 flex items-center justify-center gap-2">
        {news.map((article, index) => (
          <button
            key={article.id}
            type="button"
            onClick={() => setCurrent(index)}
            aria-label={`Go to slide ${index + 1}: ${article.title}`}
            aria-current={index === current ? "true" : undefined}
            className={cn(
              "h-1.5 rounded-full transition-all duration-300",
              index === current
                ? "w-6 bg-accent-primary"
                : "w-2.5 bg-ink-faint hover:bg-ink-muted",
            )}
          />
        ))}
      </div>
    </div>
  );
}