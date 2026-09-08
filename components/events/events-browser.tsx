"use client";

import { useMemo, useState } from "react";
import { CalendarX2, Search, X } from "lucide-react";
import type { EventStatus } from "@/mock-database/events";
import type { EventListItem } from "@/lib/fights";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { EventCard } from "./event-card";

type StatusFilter = "All" | EventStatus;

const STATUS_OPTIONS: { value: StatusFilter; label: string }[] = [
  { value: "All", label: "All Events" },
  { value: "UPCOMING", label: "Upcoming" },
  { value: "COMPLETED", label: "Completed" },
];

export function EventsBrowser({ events }: { events: EventListItem[] }) {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<StatusFilter>("All");

  const filteredEvents = useMemo(() => {
    const q = query.trim().toLowerCase();

    return events
      .filter((event) => {
        const matchesSearch =
          q === "" ||
          event.name.toLowerCase().includes(q) ||
          event.location.toLowerCase().includes(q);

        const matchesStatus = status === "All" || event.status === status;

        return matchesSearch && matchesStatus;
      })
      .sort((a, b) => b.date.getTime() - a.date.getTime());
  }, [events, query, status]);

  const hasActiveFilters = query !== "" || status !== "All";

  function handleClear() {
    setQuery("");
    setStatus("All");
  }

  if (events.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-line-subtle bg-surface px-6 py-16 text-center">
        <CalendarX2 className="size-8 text-ink-faint" />
        <p
          className="mt-4 font-heading text-2xl font-bold uppercase tracking-tight"
          style={{ color: "var(--text-primary)" }}
        >
          No events yet
        </p>
        <p className="mt-2 max-w-sm text-sm text-ink-muted">
          Events will appear here as soon as they are announced. Check back soon.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <label htmlFor="event-search" className="sr-only">
            Search events
          </label>
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-ink-muted" />
          <input
            id="event-search"
            type="text"
            placeholder="Search by event or location..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="h-10 w-full rounded-lg border border-line-subtle bg-surface pl-10 pr-4 text-sm text-ink outline-none transition-colors placeholder:text-ink-muted focus:border-accent-primary focus:ring-1 focus:ring-accent-primary/30"
          />
        </div>

        <div className="flex items-center gap-2">
          <Select
            value={status}
            onValueChange={(value) => setStatus(value as StatusFilter)}
          >
            <SelectTrigger className="!h-10 cursor-pointer rounded-lg border border-line-subtle bg-surface pl-4 pr-2 text-sm text-ink">
              <SelectValue placeholder="All Events" />
            </SelectTrigger>
            <SelectContent>
              {STATUS_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {hasActiveFilters && (
            <button
              type="button"
              onClick={handleClear}
              className="inline-flex h-10 items-center gap-1.5 rounded-lg border border-line-subtle bg-surface px-3 text-sm text-ink-secondary transition-colors hover:bg-elevated hover:text-ink"
            >
              <X className="size-3.5" />
              Clear
            </button>
          )}
        </div>
      </div>

      {filteredEvents.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl border border-line-subtle bg-surface px-6 py-16 text-center">
          <Search className="size-8 text-ink-faint" />
          <p
            className="mt-4 font-heading text-2xl font-bold uppercase tracking-tight"
            style={{ color: "var(--text-primary)" }}
          >
            No events found
          </p>
          <p className="mt-2 max-w-sm text-sm text-ink-muted">
            No events match your current search and filter. Try a different
            search term or status.
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
            {filteredEvents.length}{" "}
            {filteredEvents.length === 1 ? "event" : "events"}
          </p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}