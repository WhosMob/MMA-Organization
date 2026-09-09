import type { Metadata } from "next";
import { AboutHero } from "@/components/about/about-hero";
import { WhoWeAre } from "@/components/about/who-we-are";
import { PhilosophySection } from "@/components/about/philosophy-section";
import { ByTheNumbers } from "@/components/about/by-the-numbers";
import { FollowSection } from "@/components/about/follow-section";
import { getAboutStats } from "@/lib/about-stats";

export const metadata: Metadata = {
  title: "About — MMA Organization",
  description:
    "Learn about MMA Organization — a modern, premium mixed martial arts promotion built around high-level competition, respect, and integrity.",
};

export default async function AboutPage() {
  const stats = await getAboutStats();

  return (
    <div className="flex flex-1 flex-col">
      <AboutHero />
      <WhoWeAre />
      <PhilosophySection />
      <ByTheNumbers stats={stats} />
      <FollowSection />
    </div>
  );
}