import {
  siInstagram,
  siTelegram,
  siX,
  siYoutube,
  type SimpleIcon,
} from "simple-icons";

const socials = [
  { label: "Instagram", href: "https://instagram.com", icon: siInstagram },
  { label: "X", href: "https://x.com", icon: siX },
  { label: "YouTube", href: "https://youtube.com", icon: siYoutube },
  { label: "Telegram", href: "https://telegram.org", icon: siTelegram },
] as const;

function BrandIcon({
  icon,
  className,
}: {
  icon: SimpleIcon;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d={icon.path} />
    </svg>
  );
}

export function FollowSection() {
  return (
    <section
      aria-labelledby="follow-heading"
      className="border-t border-line-subtle bg-elevated py-12 md:py-16"
    >
      <div className="mx-auto flex max-w-2xl flex-col items-center gap-6 px-4 text-center sm:px-6">
        <div className="space-y-2">
          <h2
            id="follow-heading"
            className="font-heading text-3xl font-bold uppercase leading-[0.95] tracking-tight sm:text-4xl"
            style={{ color: "var(--text-primary)" }}
          >
            Follow the Organization
          </h2>
          <p
            className="text-sm leading-relaxed sm:text-base"
            style={{ color: "var(--text-secondary)" }}
          >
            Stay connected with the latest events, fighters, rankings and news.
          </p>
        </div>

        <ul className="flex flex-wrap items-center justify-center gap-3">
          {socials.map(({ label, href, icon }) => (
            <li key={label}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="inline-flex size-11 items-center justify-center rounded-md border border-line bg-surface text-ink-secondary transition-colors hover:border-line-subtle hover:bg-subtle hover:text-accent-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary"
              >
                <BrandIcon icon={icon} className="size-5" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}