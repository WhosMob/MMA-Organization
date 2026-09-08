import { getRankingsPageData } from "@/lib/rankings-data";
import { RankingsAccordion } from "@/components/rankings/rankings-accordion";

export const metadata = {
  title: "Rankings — MMA Organization",
  description:
    "Official MMA Organization rankings including Pound-for-Pound and all eight weight class divisions.",
};

export default async function RankingsPage() {
  const data = await getRankingsPageData();

  return (
    <div className="flex flex-1 flex-col">
      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 md:mb-12 space-y-2">
            <h1 className="font-heading text-4xl sm:text-5xl font-bold uppercase leading-[0.95] tracking-tight text-ink">
              Rankings
            </h1>
            <p className="text-ink-secondary text-base sm:text-lg max-w-2xl">
              Official rankings across all eight weight divisions and
              Pound-for-Pound.
            </p>
          </div>

          <RankingsAccordion
            p4p={data.p4p}
            divisions={data.divisions}
          />
        </div>
      </section>
    </div>
  );
}
