"use client";

import { useState, useMemo } from "react";
import { Search, X } from "lucide-react";
import type { MockFighter } from "@/mock-database/fighters";
import { WEIGHT_CLASSES, type WeightClass } from "@/lib/fighters";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { FighterCard } from "./fighter-card";

interface FightersBrowserProps {
  fighters: MockFighter[];
}

export function FightersBrowser({ fighters }: FightersBrowserProps) {
  const [query, setQuery] = useState("");
  const [selectedWeightClass, setSelectedWeightClass] = useState<
    WeightClass | "All"
  >("All");

  const filteredFighters = useMemo(() => {
    const q = query.toLowerCase().trim();

    return fighters.filter((fighter) => {
      const matchesSearch =
        q === "" ||
        fighter.name.toLowerCase().includes(q) ||
        (fighter.nickname && fighter.nickname.toLowerCase().includes(q));

      const matchesWeightClass =
        selectedWeightClass === "All" ||
        fighter.weightClass === selectedWeightClass;

      return matchesSearch && matchesWeightClass;
    });
  }, [fighters, query, selectedWeightClass]);

  const hasActiveFilters = query !== "" || selectedWeightClass !== "All";

  function handleClear() {
    setQuery("");
    setSelectedWeightClass("All");
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <label htmlFor="fighter-search" className="sr-only">
            Search fighters
          </label>
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-ink-muted" />
          <input
            id="fighter-search"
            type="text"
            placeholder="Search fighters..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full h-10 rounded-lg border border-line-subtle bg-surface pl-10 pr-4 text-sm text-ink placeholder:text-ink-muted outline-none transition-colors focus:border-accent-primary focus:ring-1 focus:ring-accent-primary/30"
          />
        </div>

        <div className="flex items-center gap-2">
          <Select
            value={selectedWeightClass}
            onValueChange={(v) =>
              setSelectedWeightClass(v as WeightClass | "All")
            }
          >
            <SelectTrigger
              className="!h-10 rounded-lg border border-line-subtle bg-surface pl-4 pr-2 text-sm text-ink cursor-pointer"
            >
              <SelectValue placeholder="All Weight Classes" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Weight Classes</SelectItem>
              {WEIGHT_CLASSES.map((wc) => (
                <SelectItem key={wc} value={wc}>
                  {wc}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {hasActiveFilters && (
            <button
              onClick={handleClear}
              className="inline-flex items-center gap-1.5 h-10 rounded-lg border border-line-subtle bg-surface px-3 text-sm text-ink-secondary transition-colors hover:bg-elevated hover:text-ink"
              type="button"
            >
              <X className="size-3.5" />
              Clear
            </button>
          )}
        </div>
      </div>

      {filteredFighters.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <p className="text-ink-muted text-lg font-medium">
            No fighters found.
          </p>
          {hasActiveFilters && (
            <button
              onClick={handleClear}
              className="mt-3 text-accent-primary text-sm font-medium hover:underline"
              type="button"
            >
              Clear filters
            </button>
          )}
        </div>
      ) : (
        <>
          <p className="text-sm text-ink-muted">
            {filteredFighters.length}{" "}
            {filteredFighters.length === 1 ? "fighter" : "fighters"}
          </p>
          <div className="grid grid-cols-4 xl:grid-cols-6 2xl:grid-cols-8 gap-4">
            {filteredFighters.map((fighter) => (
              <FighterCard key={fighter.id} fighter={fighter} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
