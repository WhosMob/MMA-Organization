import { Hero } from "@/components/home/hero";
import { EventsSection } from "@/components/home/events-section";
import { P4PSection } from "@/components/home/p4p-section";
import { ChampionsSection } from "@/components/home/champions-section";
import { NewsSection } from "@/components/home/news-section";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <Hero />
      <EventsSection />
      <P4PSection />
      <ChampionsSection />
      <NewsSection />
    </div>
  );
}
