import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FighterChampionshipsSection } from "@/components/fighters/fighter-championships-section";
import { FighterFightHistorySection } from "@/components/fighters/fighter-fight-history-section";
import { FighterInformationSection } from "@/components/fighters/fighter-information-section";
import { FighterProfileHero } from "@/components/fighters/fighter-profile-hero";
import { FighterRankingsSection } from "@/components/fighters/fighter-rankings-section";
import { FighterRecentFightsSection } from "@/components/fighters/fighter-recent-fights-section";
import { FighterUpcomingFightsSection } from "@/components/fighters/fighter-upcoming-fights-section";
import { getAllFighters, getFighterBySlug } from "@/lib/fighters";

type FighterProfileParams = {
  "fighter-slug": string;
};

export async function generateStaticParams(): Promise<FighterProfileParams[]> {
  const fighters = await getAllFighters();

  return fighters.map((fighter) => ({ "fighter-slug": fighter.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<FighterProfileParams>;
}): Promise<Metadata> {
  const { "fighter-slug": slug } = await params;
  const fighter = await getFighterBySlug(slug);

  if (!fighter) {
    return { title: "Fighter Not Found — MMA Organization" };
  }

  return {
    title: `${fighter.name} — MMA Organization`,
    description: `${fighter.name}${
      fighter.nickname ? ` ${fighter.nickname}` : ""
    } — ${fighter.weightClass} fighter with a ${fighter.record} record${
      fighter.isChampion ? ", reigning division champion" : ""
    }.`,
  };
}

export default async function FighterProfilePage({
  params,
}: {
  params: Promise<FighterProfileParams>;
}) {
  const { "fighter-slug": slug } = await params;
  const fighter = await getFighterBySlug(slug);

  if (!fighter) notFound();

  return (
    <div className="flex flex-1 flex-col">
      <FighterProfileHero fighter={fighter} />
      <FighterInformationSection fighter={fighter} />
      <FighterRankingsSection fighter={fighter} />
      <FighterChampionshipsSection fighter={fighter} />
      <FighterUpcomingFightsSection fighter={fighter} />
      <FighterRecentFightsSection fighter={fighter} />
      <FighterFightHistorySection fighter={fighter} />
    </div>
  );
}