import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn(
        "font-heading text-2xl font-bold uppercase tracking-wide text-ink",
        className,
      )}
      aria-label="MMA Organization home"
    >
      MMA<span className="text-accent-primary">Organization</span>
    </Link>
  );
}
