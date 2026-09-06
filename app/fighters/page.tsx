import { getAllFighters } from "@/lib/fighters";
import { FightersBrowser } from "@/components/fighters/fighters-browser";

export const metadata = {
  title: "Fighters — MMA Organization",
  description:
    "Browse the complete roster of MMA Organization fighters. Search by name or filter by weight class.",
};

export default async function FightersPage() {
  const fighters = await getAllFighters();

  return (
    <div className="flex flex-1 flex-col">
      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 md:mb-12 space-y-2">
            <h1 className="font-heading text-4xl sm:text-5xl font-bold uppercase leading-[0.95] tracking-tight text-ink">
              Fighters
            </h1>
            <p className="text-ink-secondary text-base sm:text-lg max-w-2xl">
              Browse the complete roster of athletes representing the
              organization across eight weight divisions.
            </p>
          </div>

          <FightersBrowser fighters={fighters} />
        </div>
      </section>
    </div>
  );
}
