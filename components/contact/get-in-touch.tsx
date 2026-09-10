import type { ComponentType } from "react";
import { Mail, Phone } from "lucide-react";
import { TelegramIcon } from "@/components/layout/social-icons";

type ContactItem = {
  label: string;
  description: string;
  value: string;
  href: string;
  external?: boolean;
  Icon: ComponentType<{ className?: string }>;
};

const contactChannels: ContactItem[] = [
  {
    label: "Email",
    description: "General inquiries, partnerships, and media requests",
    value: "contact@somethingmale.com",
    href: "mailto:contact@somethingmale.com",
    Icon: Mail,
  },
  {
    label: "Phone",
    description: "Reach the organization directly by phone",
    value: "+1 0000000",
    href: "tel:+10000000",
    Icon: Phone,
  },
  {
    label: "Telegram",
    description: "The fastest way to reach the organization",
    value: "t.me/something",
    href: "https://t.me/",
    external: true,
    Icon: TelegramIcon,
  },
];

function ContactCard({ item }: { item: ContactItem }) {
  return (
    <div className="group flex flex-col gap-4 rounded-lg border border-line bg-surface p-6 transition-colors hover:border-line-subtle hover:bg-subtle sm:p-7">
      <div className="flex size-12 items-center justify-center rounded-md border border-line-subtle bg-subtle text-accent-primary transition-colors group-hover:border-line">
        <item.Icon className="size-5" />
      </div>

      <div className="space-y-1">
        <h3
          className="font-heading text-xl font-bold uppercase leading-[0.95] tracking-tight sm:text-2xl"
          style={{ color: "var(--text-primary)" }}
        >
          {item.label}
        </h3>
        <p className="text-sm leading-relaxed text-ink-muted">
          {item.description}
        </p>
      </div>

      <a
        href={item.href}
        target={item.external ? "_blank" : undefined}
        rel={item.external ? "noopener noreferrer" : undefined}
        className="mt-auto inline-flex w-fit break-all text-sm font-medium text-accent-primary transition-colors hover:text-accent-primary/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary"
      >
        {item.value}
      </a>
    </div>
  );
}

export function GetInTouch() {
  return (
    <section
      aria-labelledby="get-in-touch-heading"
      className="py-12 md:py-16 lg:py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="space-y-2">
          <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-accent-primary">
            <span className="inline-block size-1.5 rounded-full bg-accent-primary" />
            Reach Out
          </p>
          <h2
            id="get-in-touch-heading"
            className="font-heading text-4xl font-bold uppercase leading-[0.95] tracking-tight sm:text-5xl"
            style={{ color: "var(--text-primary)" }}
          >
            Get in Touch
          </h2>
          <p className="max-w-2xl pt-3 text-base leading-relaxed text-ink-secondary sm:text-lg">
            The fastest ways to reach the organization directly.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {contactChannels.map((item) => (
            <ContactCard key={item.label} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}