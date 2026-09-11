import Link from "next/link";
import { Logo } from "@/components/layout/logo";
import {
  InstagramIcon,
  XIcon,
  YouTubeIcon,
  TelegramIcon,
} from "@/components/layout/social-icons";

const navLinks = [
  { label: "Rankings", href: "/rankings" },
  { label: "Fighters", href: "/fighters" },
  { label: "News", href: "/news" },
  { label: "Events", href: "/events" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

const socials = [
  { label: "Instagram", href: "https://instagram.com", Icon: InstagramIcon },
  { label: "X", href: "https://x.com", Icon: XIcon },
  { label: "YouTube", href: "https://youtube.com", Icon: YouTubeIcon },
  { label: "Telegram", href: "https://telegram.org", Icon: TelegramIcon },
] as const;

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-page">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr]">
          <div className="space-y-4">
            <Logo />
            <p className="max-w-sm text-sm leading-relaxed text-ink-muted">
              A modern, premium, and aggressive mixed martial arts promotion
              showcasing fighters, rankings, events, championships, and news.
            </p>
          </div>

          <nav aria-label="Footer navigation" className="md:justify-self-center">
            <h2 className="font-heading text-lg font-semibold uppercase tracking-wide text-ink">
              Navigation
            </h2>
            <ul className="mt-4 space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-ink-muted transition-colors hover:text-ink"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:justify-self-end">
            <h2 className="font-heading text-lg font-semibold uppercase tracking-wide text-ink">
              Follow
            </h2>
            <ul className="mt-4 space-y-2">
              {socials.map(({ label, href, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 text-sm text-ink-muted transition-colors hover:text-accent-primary"
                  >
                    <Icon className="size-5" />
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-line pt-6 sm:flex-row">
          <p className="text-xs text-ink-faint">
            &copy; {year} MMA Organization. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="/privacy"
              className="text-xs text-ink-muted transition-colors hover:text-ink"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-xs text-ink-muted transition-colors hover:text-ink"
            >
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
