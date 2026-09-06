# Progress Tracker

This file records the actual implementation state of the project so AI agents can resume development accurately across sessions.

Update this file whenever the implementation state, current phase, active feature, or important project decision changes.

The information in this file must describe the actual state of the project, not the intended or assumed state.

## Current Phase

- Homepage implementation (Hero + Events + P4P + Champions + News sections complete; Recent Results remains pending).
- Fighters listing page complete.
- Fighter Profile page (phase 1) complete.

## Current Goal

- Build out the homepage sections in order per `ui-context.md` (Hero, Events/Recent Results, P4P, Champions, News). Hero, Events, P4P, Champions, and News are complete.
- Fighters listing page (`/fighters`) is complete.
- Fighter Profile page (`/fighters/[fighter-slug]`) phase 1 is complete (Hero, Information, Rankings, Championships).

## Completed

- Set up the design token system in `app/globals.css` (Tailwind v4 `@theme inline` mappings) covering surfaces, borders, text, accent, and state colors for both dark and light themes.
- Dark mode is the default theme; light and dark palettes are defined as CSS custom properties in `:root`/`.dark`.
- Loaded fonts via `next/font/google`: Inter (body, `--font-inter`) and Barlow Condensed (display/heading, `--font-barlow-condensed`); wired into the root layout and Tailwind tokens.
- Root layout (`app/layout.tsx`) renders the global Navbar and Footer, sets `dark` class by default, and uses `bg-base`/`text-ink` for the page shell.
- Implemented `ThemeToggle` client component (`components/layout/theme-toggle.tsx`) that toggles the `dark` class on `<html>`.
- Implemented responsive `Navbar` client component (`components/layout/navbar.tsx`): logo left, nav links (Rankings, Fighters, News, Events, About, Contact) + theme toggle right on desktop; hamburger menu + theme toggle on mobile; active link highlighting via `usePathname`.
- Extracted a shared `Logo` component (`components/layout/logo.tsx`) used by both Navbar and Footer for a consistent wordmark.
- Implemented the global `Footer` server component (`components/layout/footer.tsx`): organization logo, short description, navigation links, social links (Instagram, X, YouTube, Telegram), copyright, Privacy Policy, and Terms; responsive grid that stacks on mobile.
- Implemented stroke-style brand social icons as inline SVGs in `components/layout/social-icons.tsx`.
- Implemented the Homepage Hero section (`components/home/hero.tsx`, Server Component): introduces the website / organization identity — "The Ultimate Fighting League" headline in Barlow Condensed, welcome label, org mission copy, and a centered row of equal-width nav-link CTAs (Fighters, Rankings, News, Events, About, Contact) styled as outline buttons; a downward chevron scroll indicator (soft `scroll-bounce` keyframe) anchors to the Events section below; cinematic Next `<Image>` background with dark gradient overlay, token-driven and responsive. It contains no event data.
- Implemented the Homepage Events section (`components/home/events-section.tsx`, Server Component) directly below the Hero as a single "Events" section: section heading + one event carousel. The former featured "Next Event" block and separate "Past Events" heading were removed per user direction.
- Implemented the Events carousel (`components/home/events-carousel.tsx`, Client Component): one chronological timeline of all events where the center card shows the highlighted/current event with faded side previews of the previous (left) and next (right) events peeking behind it; prev/next arrow buttons, keyboard navigation (arrow keys), mobile swipe, and the current event receives the strongest visual emphasis. Previews render on `md:`+ and hide on small screens.
- Event cards use a cinematic presentation: full-bleed image with a dark gradient scrim, an "Upcoming" accent pill (or ghost date pill for past events), a MapPin venue · location line, hover image zoom, and the centered card is emphasized with a subtle red glow ring + deep shadow.
- Created the `mock-database/` development data layer per the architecture Development Data Strategy: `mock-database/events.ts` exposes a typed `MockEvent` + `upcomingEvent`, `futureEvents` (added one 2027 event "MMA — Warpath"), `pastEvents`, and a date-sorted `allEvents` timeline mirroring the target Prisma Event model. `mock-database/fighters.ts` contains 128 fighters with embedded ranking data, champion status, movement indicators, and an `imageUrl` field (currently `""` for all fighters).
- Added server-side data access helper `lib/events.ts` (`getEvents()`) — the future swap point for Prisma queries; UI consumes mock data, holds no mock definitions. `getUpcomingEvent()`/`getPastEvents()` were removed (replaced by `getEvents()`).
- Configured `images.remotePatterns` for the mock event artwork host in `next.config.ts` to support Next `<Image>` with the external URL.
- Implemented the Homepage P4P section (`components/home/p4p-section.tsx`, Server Component): "Pound for Pound" heading in Barlow Condensed, "Top 5 fighters in the world" subtitle, ranking list with position numbers, fighter names, nicknames, weight classes, records, and ranking movement indicators (UP/DOWN/STABLE/NEW); clickable rows link to fighter profiles; "View Full Rankings →" link to `/rankings`.
- `lib/rankings.ts` derives P4P and division rankings from `mock-database/fighters.ts` (removed standalone `mock-database/rankings.ts`); exports `getP4PRankings()`, `getDivisionRankings()`, `getChampion()`, `getAllChampions()`.
- Homepage (`app/page.tsx`) renders `<Hero />`, `<EventsSection />`, `<P4PSection />`, and `<ChampionsSection />` in the correct order.
- Verified with `npm run lint` (passes), `npm run build` (passes), and a live render check (hero CTAs + scroll arrow, Events heading, carousel arrows, and the centered "Night of Champions" / previewed "Warpath" events all render).

- Implemented the Homepage Champions section (`components/home/champions-section.tsx`, Server Component): "Champions" heading in Barlow Condensed, 8 champions in a 4-column grid (all viewports), cards scale down responsively on mobile (smaller padding, text, gaps); each card shows weight class, champion name, nickname, and image; cards link to fighter profiles; derived from `mock-database/fighters.ts` using `getAllChampions()` helper; ordered by canonical weight-class order (Heavyweight → Flyweight); no hardcoded champion names.
- Added `imageUrl?: string | null` to `MockFighter` interface, later made required (`imageUrl: string`) with every fighter set to `""` awaiting real image URLs.
- Added `unsplash.com` to `images.remotePatterns` in `next.config.ts` (event images reference this domain).
- Champion name text color uses inline `style={{ color: "var(--text-primary)" }}` instead of Tailwind `text-ink` utility — the Tailwind token was not resolving correctly in this component context.
- Implemented the Homepage News section (`components/home/news-section.tsx`, Server Component): "News" heading in Barlow Condensed with "Popular &amp; Featured" eyebrow, placed after the Champions section in `app/page.tsx`; renders the popular news carousel and an empty-state message when no popular news exists.
- Created `mock-database/news.ts` as the single source of truth for news: `MockNews` interface (`id`, `title`, `slug`, `excerpt`, `content`, `imageUrl`, `publishedAt`, `isPopular`) plus 8 fictional articles coherent with the org (Derek Lewis superfight at MMA 40, Night of Champions title fights, Marcus Rivera showcase, Jamal Washington, flyweight trilogy, prospects feature, Volkanovski interview, MMA — Warpath at MSG). `isPopular` is deliberately independent of recency: the newest article is NOT popular while two older articles ARE.
- Added `lib/news.ts` (`getPopularNews()`) — filters `news` by `isPopular`; the future swap point for Prisma queries. UI holds no news content.
- Implemented the News carousel (`components/home/news-carousel.tsx`, Client Component): single-slide track carousel with `translateX(-current * 100%)` and 500ms easing; exactly 5-second autoplay interval (single `setInterval` cleared on cleanup, reset on slide change/manual nav); autoplay pauses on mouse enter/focus and resumes on leave/blur; reduced-motion preference (via `useSyncExternalStore` on `matchMedia`) disables autoplay and the slide transition; prev/next arrow `Button`s, dot indicators, keyboard arrow navigation on the focusable `role="region"`, and mobile swipe (>40px delta). Slides link to `/news/[slug]` from the mock data.
- Implemented the News card (`components/home/news-card.tsx`, presentational): image with dark gradient scrim and backdrop-blurred publication-date pill (lucide `Calendar`), Barlow Condensed title, two-line-clamped excerpt; token-driven surfaces/text; hover image zoom + `border-line`/shadow lift; `group-hover:text-accent-primary` title.
- Verified with `npm run lint` (passes; only pre-existing `no-img-element` warning in champions-section.tsx), `npm run build` (passes, static prerender of `/`), and a live render check (News heading, `id="news"` anchor, carousel region, and a `/news/[slug]` link all present in the served HTML).
- Adjusted Homepage Hero section height: changed `min-h-160` to `min-h-[calc(100vh-4rem)]` so the hero fills exactly the viewport minus the navbar, keeping the scroll arrow visible without scrolling on both desktop and mobile. Reduced inner content padding (`pt-10 lg:pt-6`, `gap-4`) for tighter vertical spacing.

- Implemented the Fighters listing page (`/fighters`): Server Component page (`app/fighters/page.tsx`) with page header (title + description) and a Client Component `FightersBrowser` for interactive search/filter.
- Created `lib/fighters.ts` server-side data access helper: exports `getAllFighters()` and `WEIGHT_CLASSES` constant (canonical 8 divisions in project order). Future swap point for Prisma queries.
- Created `components/fighters/fighters-browser.tsx` (Client Component): search input (case-insensitive against name + nickname), weight class dropdown filter (All + 8 divisions), both filters compose with AND logic, empty state with "Clear filters" reset, fighter count display, responsive grid (4-col mobile, 6-col xl, 8-col 2xl). Select padding adjusted to `pl-4 pr-8` for proper text alignment on Windows native dropdowns.
- Created `components/fighters/fighter-card.tsx` (presentational): fighter image with dark gradient overlay, name + nickname in the image overlay, weight class + record row below, champion badge pill (top-right), P4P rank badge when ranked, division rank badge when ranked, clickable Link to `/fighters/[fighter-slug]`, hover scale + border/shadow lift consistent with homepage card patterns. All typography, badges, and padding fully scaled for 4-col mobile layout (champion badge `text-[7px]`, name `text-[10px]`, division badge shows only `#N` on mobile). Nickname line always renders to keep names vertically aligned.
- Verified with `npm run lint` (passes; only pre-existing `no-img-element` warnings), `npm run build` (passes, static prerender of `/fighters`).
- Extended the mock fighter database (`mock-database/fighters.ts`) per `context/features-developing/09-revise-the-fighters-datbase.md`: added `nationality`, `dateOfBirth` (`YYYY-MM-DD`), `height` (`F'IN / cm`), `reach` (`F'IN / cm`), and `championships` (array of `{ title }`) to every fighter. Added the `MockFighterChampionship` interface. No `age` field, no championship `status` field, no fight/event data added (deferred to a future `mock-database/fights.ts`), and existing IDs/slugs, records, rankings, `isChampion`, and movement fields were preserved unchanged. Fictional but internally coherent biographical data (nationalities, DOBs, physicals) was authored per fighter; current champions hold their division title, and a small set of established veterans (Whittaker, Ferguson, dos Anjos, Poirier, Oliveira, Holloway, Yan, Aldo, Edgar, Figueiredo) carry former-champion title entries. Verified with `npx tsc --noEmit`, `npm run lint`, `npm run build`, and a field-presence/lint script (all pass; only pre-existing duplicate P4P #1/#2 data and image warnings remain).
- Standardized the fighter `imageUrl` field in `mock-database/fighters.ts`: changed `MockFighter.imageUrl` from `string | null | undefined` to a required `imageUrl: string`, added `imageUrl: ""` to every fighter, and removed the previous placeholder paths (`/gaziev.jpg`, `/orolbai.jpg`). All 128 fighters now carry `imageUrl: ""` awaiting real image URLs. No other fighter field was touched. Verified with `npx tsc --noEmit` (passes).

- Implemented the Fighter Profile page (`/fighters/[fighter-slug]`) Phase 1 per `context/features-developing/10-fighterProfile.md`. Server Component page (`app/fighters/[fighter-slug]/page.tsx`) with `generateStaticParams()` (all 128 fighter slugs), `generateMetadata()` (title `${name} — MMA Organization`, description built from fighter data, "Fighter Not Found" fallback), and `notFound()` from `next/navigation` for unknown slugs. Renders exactly four sections — Fighter Profile Hero, Fighter Information, Rankings, Championships. Fight History and Recent Fights are intentionally NOT built yet (deferred to a future `mock-database/fights.ts` per the spec).
  - Added `lib/calculate-age.ts` → `calculateAge(dateOfBirth)` (age computed dynamically; correctly handles birthdays not yet passed).
  - Added `getFighterBySlug(slug)` to `lib/fighters.ts`; data source remains `mock-database/fighters.ts` (no new data source created).
  - `FighterProfileHero` (`components/fighters/fighter-profile-hero.tsx`): Barlow Condensed name (5xl→7xl), weight-class eyebrow, CHAMPION pill when `isChampion`, nickname, record, P4P/division rank pills, `aspect-[3/4]` image panel with initials fallback when `imageUrl` is empty and no broken `<img>`; uses `<img>` like existing fighter cards (same pre-existing lint warning).
  - `FighterInformationSection` (`components/fighters/fighter-information-section.tsx`): semantic `<dl>` grid (2-col mobile → 5-col lg) with styled stat cards — Nationality (Globe), Date of Birth (CalendarDays, raw string), Age (Cake, via `calculateAge`), Height (Ruler), Reach (ArrowLeftRight); height/reach displayed exactly as stored.
  - `FighterRankingsSection` (`components/fighters/fighter-rankings-section.tsx`): two cards — P4P (accent) and division (neutral). Champions (`rankings.division === null` + `isChampion`) display "Champion" and are never treated as Division Rank #1; unranked slots show "Not Ranked".
  - `FighterChampionshipsSection` (`components/fighters/fighter-championships-section.tsx`): returns `null` when `championships` is empty (no empty/meaningless section); otherwise a Trophy-anchored title list with a "Current Champion" sub-label when `isChampion`.
  - All components are Server Components, token-driven only, follow the existing section eyebrow + Barlow Condensed h2 patterns; no new libraries added.
  - Verified with `npx tsc --noEmit` (passes), `npm run lint` (passes; only pre-existing `no-img-element` warnings including the new hero), `npm run build` (passes; 133 static pages — `/`, `/_not-found`, `/fighters`, and 130 fighter profile pages including the `[fighter-slug]` dynamic route), and live `next start` checks: valid slug returns 200 with correct name/nickname/record/P4P #13/division "Champion"/age/rankings/championships; invalid slug returns 404; empty `imageUrl` renders initials placeholder; non-champion ranked fighter shows division `#1` and no empty championships section; champion without P4P rank shows P4P "Not Ranked" and division "Champion"; age boundary cases correct (Volkanovski `1988-09-29` → 37 before birthday, Rivera `1992-05-09` → 34 after birthday; reference date 2026-09-06).
- Applied the `text-ink` workaround (same as champions-section) to all Fighter Profile `text-ink` elements: replaced the Tailwind class with inline `style={{ color: "var(--text-primary)" }}` on the hero `h1`/record `span`, info section `dd`/`h2`, rankings section division number/`h2`, and championships section title/`h2`. This fixes the theme-color resolution issue where `text-ink` produced near-invisible text in both dark and light modes on these elements. Verified with `npx tsc --noEmit`, `npm run lint`, `npm run build` (all pass; 133 static pages).
- Made the hero division ranking pill display the weight class on all viewports: removed `hidden sm:inline` from `fighter-profile-hero.tsx` so mobile shows `#1 LIGHT HEAVYWEIGHT` like desktop (previously mobile showed only `#1`). Verified with `npx tsc --noEmit`, `npm run lint`, `npm run build` (all pass).

## In Progress

- None yet.

## Next Up

- Implement the Recent Results homepage section (horizontal carousel per `ui-context.md`), adding the `mock-database/fights.ts` data module as needed.
- Implement Fighter Profile Phase 2 (Recent Fights + Fight History sections with `mock-database/fights.ts`) once the mock fights data module exists.
- Implement Rankings page, Events page, News page, About page, Contact page as placeholders or full implementations so nav/footer links resolve.

## Mock Database Refactor

### Refactored: Fighter Ranking Architecture

**What changed:**
- Created `mock-database/fighters.ts` with all fighter data including embedded ranking information
- Removed `mock-database/rankings.ts` (ranking data now derived from fighters)
- Updated `lib/rankings.ts` to derive rankings from fighters data
- Updated `components/home/p4p-section.tsx` to use new types from `lib/rankings.ts`

**New fighter data structure:**
```typescript
interface MockFighter {
  id: string;
  name: string;
  nickname: string | null;
  record: string;
  weightClass: string;
  nationality: string;
  dateOfBirth: string;
  height: string;
  reach: string;
  championships: MockFighterChampionship[];
  imageUrl: string;
  rankings: {
    p4p: number | null;    // null = not ranked P4P
    division: number | null; // null = not ranked in division
  };
  isChampion: boolean;
  movement: {
    p4p: RankingMovement | null;
    division: RankingMovement | null;
  };
  p4pMovementChange: number;
  divisionMovementChange: number;
}
```

**Ranking data coverage:**
- P4P rankings: #1 through #15 (15 fighters)
- 8 weight classes: Heavyweight, Light Heavyweight, Middleweight, Welterweight, Lightweight, Featherweight, Bantamweight, Flyweight
- Each division has 1 champion + 15 ranked contenders (#1 through #15)
- Total: 128 fighters (8 champions + 120 contenders)
- Champions are displayed separately from contender rankings
- Movement indicators (UP/DOWN/STABLE/NEW) included for each ranking type

**Data access functions:**
- `getP4PRankings(limit)` — returns P4P rankings sorted by position
- `getDivisionRankings(weightClass, limit)` — returns division rankings sorted by position
- `getChampion(weightClass)` — returns the champion for a specific division
- `getAllChampions()` — returns all champions

**Verification:**
- No duplicate P4P ranking positions
- No duplicate division ranking positions within the same weight class
- Every division has one current champion
- Every division has contenders ranked #1 through #15
- Homepage P4P still displays only the Top 5 (derived from full P4P ranking)
- No unused rankings.ts file remains

## Open Questions

- None.

## Known Issues

- Tailwind `text-ink` utility does not resolve correctly for text color inside certain component contexts (Champions card `<Link>`, Fighter Profile `dd`/`h1`/`h2` elements). Workaround: use inline `style={{ color: "var(--text-primary)" }}` where theme-aware text color is needed in those contexts. Other sections (P4P, navbar, etc.) use `text-ink` without issue.
- Hero heading (`text-6xl`) and CTA buttons (`w-36`) overflow on small mobile screens (< 400px). Needs responsive sizing for mobile viewports.

## Architecture Decisions

- Design tokens are exposed as Tailwind utility colors (`bg-base`, `bg-surface`, `bg-elevated`, `bg-subtle`, `border-line`, `border-line-subtle`, `text-ink`, `text-ink-secondary`, `text-ink-muted`, `text-ink-faint`, `text-accent-primary`, etc.) mapped from CSS custom properties in `globals.css`. Components must use these tokens rather than raw color values.
- Sticky Navbar uses a translucent `bg-base/80` with backdrop blur; a future refinement may add scroll-state transparency behavior.
- Dark mode is applied by the `dark` class on `<html>` (default), matching the existing `@custom-variant dark (&:is(.dark *))`.
- Theme preference is currently not persisted; the toggle only switches the `dark` class for the session.
- The Navbar and Footer wordmark is a shared `Logo` component to keep the brand mark consistent across the shell.
- The project is in the mock-data development phase per the architecture Development Data Strategy: UI consumes data from `mock-database/` modules via server-side helpers in `lib/`; mock data definitions never live inside UI components. This layer will be replaced by Prisma/PostgreSQL queries later without rewriting UI.
- Social media links (Instagram, X, YouTube, Telegram) use inline stroke-style SVG icons defined in the project (`social-icons.tsx`). Lucide 1.41.0 no longer ships brand icons, so these were hand-drawn to match the stroke-based icon convention.
- P4P rankings use a ranking-list presentation (not cards) per ui-context.md. Position numbers use Barlow Condensed font, ranking movement indicators use color-coded arrows (green for UP, red for DOWN, neutral dash for STABLE, accent for NEW). Rows are clickable links to fighter profiles.
- Fighters page uses a Server Component for the page shell and data fetching, with a Client Component (`FightersBrowser`) isolated for the interactive search/filter state. This follows the architecture principle of not converting entire pages to Client Components when only a portion requires interactivity.
- `lib/fighters.ts` exports `WEIGHT_CLASSES` as a const tuple to keep the canonical division list in one place; both the filter dropdown and any future weight-class logic reference this single source.
- Fighter card links use the existing `id` field (slugified names) as the URL slug, matching the convention already used by the P4P section and champions section links.
- Fighter Profile pages are fully static (SSG via `generateStaticParams`), so biographical age is computed at build time via `lib/calculate-age.ts`. Acceptable for the mock phase (static data); will need a runtime strategy when ages become dynamic.
- Fighter Profile uses inline `params` typing (`{ params: Promise<{ "fighter-slug": string }> }`) rather than relying on generated `.next/types` route types, keeping standalone `npx tsc --noEmit` valid. Next.js 16 makes `params` a Promise, awaited in the page, `generateMetadata`, and `generateStaticParams`.

## Session Notes

- The project uses Next.js 16 (Turbopack), Tailwind CSS v4, shadcn/ui (base-nova style), Base UI React, and Lucide icons.
- `components/ui/button.tsx` (shadcn Base UI button) is a protected foundation component and was not modified.
- The existing shadcn button/theme tokens were remapped to the project token system (e.g. `--background` → `--bg-base`, `--foreground` → `--text-primary`) so base components and the new layout tokens stay consistent.
- `ThemeToggle` intentionally avoids calling `setState` inside an effect (lint rule `react-hooks/set-state-in-effect`); state is initialized to the default dark value.
- Social icon decision: Lucide 1.41.0 removed brand icons (verified no Instagram/Youtube/Telegram/Twitter exports). The user chose to embed inline stroke SVGs rather than add a dependency. This slightly deviates from the literal "Use Lucide React" line in ui-context.md but preserves the stroke-based icon convention.
- Nav and footer link targets (`/rankings`, `/fighters`, `/news`, `/events`, `/about`, `/contact`) do not yet have page files, so those routes currently 404 until pages are added.
- The hero's related event data is placeholder mock data from `mock-database/events.ts`: upcoming "MMA — Night of Champions" (featured center card by default), a future "MMA — Warpath", plus four past/completed events; artwork URLs are external Unsplash images allowed via `next.config.ts` remote patterns. Replace with production data when the DB is connected.
- Fighter IDs in `mock-database/fighters.ts` use slugified names (e.g., `marcus-rivera`) instead of auto-generated IDs (e.g., `ftr-001`) for cleaner URL slugs in fighter profile links.
- The News carousel reads `prefers-reduced-motion` via `useSyncExternalStore` (subscribe to `matchMedia` change). The initial `useState`-in-effect approach was rejected because it trips the `react-hooks/set-state-in-effect` lint rule (same rule already noted for `ThemeToggle`); `useSyncExternalStore` is the idiomatic no-lint-violation alternative.
- News mock data (`mock-database/news.ts`) references Unsplash image URLs already whitelisted in `images.remotePatterns`; not all image IDs were verified to load at runtime, but a broken image degrades to the card's `bg-subtle` fallback without breaking the page.
- News article dates (June–September 2026) are consistent with the org's event timeline (MMA 37 Feb 2026 → Night of Champions Nov 2026, Warpath Feb 2027).
- `/news/[news-slug]` route targets generated from mock slugs are intentionally not-yet-implemented pages (per 07-news-section.md scope); they will 404 until the News pages are built.
- Fighters page (`/fighters`) is now live and links resolve from the Navbar. Fighter card links point to `/fighters/[fighter-slug]` which will 404 until the Fighter Profile page is built.
- The `FightersBrowser` Client Component uses `useMemo` for filtered results to avoid re-filtering on every render when only unrelated state changes.
- The search input uses `sr-only` label for accessibility; the weight class filter uses a native `<select>` element for simplicity and accessibility rather than a custom dropdown component.
- Fighter card design follows the visual hierarchy specified in ui-context.md: image prominently displayed with dark gradient scrim, fighter name and nickname overlaid, weight class and record below, ranking metadata as secondary badges.
- Every fighter in `mock-database/fighters.ts` now carries `nationality`, `dateOfBirth` (`YYYY-MM-DD`, age computed dynamically per code-standards.md), `height`/`reach` (`F'IN / cm`), and `championships` (`MockFighterChampionship[]` of `{ title }`) for the upcoming Fighter Profile page. Champions list their reigning division title; select veterans list former titles. No fight data yet — that belongs to `mock-database/fights.ts` (not yet created).
- `MockFighter.imageUrl` is a required `string` set to `""` for all 128 fighters. UI components that render fighter images already handle a missing/empty URL via a `bg-subtle` fallback, so the placeholder paths (`/gaziev.jpg`, `/orolbai.jpg`) were safe to remove. Real image URLs will be added when the fighters page swaps to production data.
- The `text-ink` Tailwind utility fails to resolve correctly in certain component contexts — observed in champions card `<h3>` and fighter-profile `dd`/`h1`/`h2` elements, producing near-invisible text in both themes. The inline `style={{ color: "var(--text-primary)" }}` pattern is the established mitigation. The mechanism behind the `text-ink` resolution failure is not fully understood; further investigation may be warranted if the issue spreads to other components.
- Fighter Profile page is live: P4P section, Champions section, and Fighters browser links to `/fighters/[fighter-slug]` now resolve instead of 404-ing. Unknown slugs render Next's default 404 page (no custom `not-found.tsx` exists yet).
- The Fighter Profile hero's empty-`imageUrl` initials fallback follows the same fallback pattern already used across fighter cards.
- `mock-database/fights.ts` does not exist yet; Fighter Profile Phase 2 (Recent Fights + Fight History) and the Recent Results homepage carousel both depend on it.
