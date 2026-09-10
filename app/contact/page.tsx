import type { Metadata } from "next";
import { ContactHero } from "@/components/contact/contact-hero";
import { GetInTouch } from "@/components/contact/get-in-touch";
import { FaqSection } from "@/components/contact/faq-section";
import { FollowUsSection } from "@/components/contact/follow-us-section";

export const metadata: Metadata = {
  title: "Contact — MMA Organization",
  description:
    "Contact MMA Organization — email, phone, or Telegram — for general inquiries, partnerships, media requests, and more.",
};

export default function ContactPage() {
  return (
    <div className="flex flex-1 flex-col">
      <ContactHero />
      <GetInTouch />
      <FaqSection />
      <FollowUsSection />
    </div>
  );
}