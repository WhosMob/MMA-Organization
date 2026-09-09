"use client";

import { useCallback, useSyncExternalStore } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  const mounted = useSyncExternalStore(
    useCallback((callback: () => void) => {
      window.addEventListener("theme-change", callback);
      return () => window.removeEventListener("theme-change", callback);
    }, []),
    useCallback(() => resolvedTheme, [resolvedTheme]),
    useCallback(() => resolvedTheme, [resolvedTheme]),
  );

  function toggleTheme() {
    setTheme(mounted === "dark" ? "light" : "dark");
  }

  if (!mounted) {
    return (
      <Button
        type="button"
        variant="ghost"
        size="icon"
        disabled
        aria-label="Toggle theme"
        title="Toggle theme"
        className="text-ink-muted hover:text-ink"
      >
        <span className="size-5" />
      </Button>
    );
  }

  const isDark = mounted === "dark";

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      onClick={toggleTheme}
      className="text-ink-muted hover:text-ink"
    >
      {isDark ? <Sun className="size-5" /> : <Moon className="size-5" />}
    </Button>
  );
}
