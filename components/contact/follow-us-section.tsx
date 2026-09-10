import {
  InstagramIcon,
  XIcon,
  YouTubeIcon,
  TelegramIcon,
} from "@/components/layout/social-icons";

const socials = [
  { label: "Instagram", href: "https://instagram.com", Icon: InstagramIcon },
  { label: "X", href: "https://x.com", Icon: XIcon },
  { label: "YouTube", href: "https://youtube.com", Icon: YouTubeIcon },
  { label: "Telegram", href: "https://telegram.org", Icon: TelegramIcon },
] as const;

export function FollowUsSection() {
  return (
    <section
      aria-labelledby="follow-us-heading"
      className="border-t border-line-subtle bg-elevated py-12 md:py-16"
    >
      <div className="mx-auto flex max-w-2xl flex-col items-center gap-6 px-4 text-center sm:px-6">
        <div className="space-y-2">
          <h2
            id="follow-us-heading"
            className="font-heading text-3xl font-bold uppercase leading-[0.95] tracking-tight sm:text-4xl"
            style={{ color: "var(--text-primary)" }}
          >
            Follow Us
          </h2>
          <p
            className="text-sm leading-relaxed sm:text-base"
            style={{ color: "var(--text-secondary)" }}
          >
            Stay connected with the latest events, fighters, rankings and news.
          </p>
        </div>

        <ul className="flex flex-wrap items-center justify-center gap-3">
          {socials.map(({ label, href, Icon }) => (
            <li key={label}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="inline-flex size-11 items-center justify-center rounded-md border border-line bg-surface text-ink-secondary transition-colors hover:border-line-subtle hover:bg-subtle hover:text-accent-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary"
              >
                <Icon className="size-5" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}