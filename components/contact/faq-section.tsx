"use client";

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How can I contact the organization?",
    answer:
      "Use any of the channels on this page — email, phone, or Telegram. All inquiries are handled directly by the organization and directed to the right person.",
  },
  {
    question: "How can I find information about upcoming events?",
    answer:
      "Visit the Events page to browse all upcoming events, or check the homepage for the next event. Each event page shows the full fight card and event details.",
  },
  {
    question: "Where can I find rankings and fight results?",
    answer:
      "The Rankings page lists the pound-for-pound and division rankings for all eight weight classes. Fight results appear on each event page and on the fighter profiles.",
  },
  {
    question:
      "How can I contact the organization about media or partnership inquiries?",
    answer:
      "Email the organization with your media or partnership request and make it clear in the subject what your inquiry is about, so it reaches the right team quickly.",
  },
  {
    question: "Where can I follow the latest organization updates?",
    answer:
      "Follow the organization on Instagram, YouTube, X, and Telegram — the links are in the Follow Us section below and in the site footer — to stay up to date with events, rankings, and news.",
  },

];

export function FaqSection() {
  return (
    <section aria-labelledby="faq-heading" className="py-12 md:py-16 lg:py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <div className="space-y-2">
          <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-accent-primary">
            <span className="inline-block size-1.5 rounded-full bg-accent-primary" />
            Help &amp; Info
          </p>
          <h2
            id="faq-heading"
            className="font-heading text-4xl font-bold uppercase leading-[0.95] tracking-tight sm:text-5xl"
            style={{ color: "var(--text-primary)" }}
          >
            FAQ
          </h2>
        </div>

        <div className="mt-8 overflow-hidden rounded-lg border border-line bg-surface sm:mt-10">
          <Accordion>
            {faqs.map((faq, index) => (
              <AccordionItem
                key={faq.question}
                value={`faq-${index}`}
                className="border-line-subtle"
              >
                <AccordionTrigger className="w-full px-4 py-4 text-left hover:no-underline sm:px-6 sm:py-5">
                  <span
                    className="font-heading text-lg font-bold uppercase leading-tight tracking-tight sm:text-xl"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {faq.question}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="px-4 sm:px-6">
                  <p
                    className="pb-4 pt-1 text-sm leading-relaxed sm:text-base"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {faq.answer}
                  </p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}