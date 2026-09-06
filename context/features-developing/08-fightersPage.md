read the /AGENTS.md before starting.


Build the Fighters page for the MMA organization website.

IMPORTANT:
Before making any changes, read the project context files in the exact order defined by `context/AGENTS.md`:

1. context/project-overview.md
2. context/architecture-context.md
3. context/ui-context.md
4. context/code-standards.md
5. context/ai-workflow-rules.md
6. context/progress-tracker.md

Then inspect the existing project structure and the current implementation of the Navbar, Footer, theme system, homepage, and mock database so the new page follows the existing architecture and visual language.

This task is ONLY for the Fighters listing page.

Do NOT build the Fighter Profile page yet.
Do NOT build Rankings page.
Do NOT introduce PostgreSQL or Prisma.
Do NOT add authentication.
Do NOT add unnecessary dependencies.

---

## PAGE

Create the Fighters page at:

`/fighters`

The page should allow users to browse, search, and filter the organization's fighters.

The page must follow the project's existing:

- Premium + Aggressive + Modern visual identity
- Dark-first design with Light Mode support
- Barlow Condensed for display typography
- Inter for body text
- semantic design tokens
- responsive layout
- spacing and border conventions
- existing Navbar and Footer
- shadcn/ui and Lucide React where appropriate

Do not redesign the global Navbar, Footer, or theme system.

---

## DATA SOURCE

Use:

`mock-database/fighters.ts`

as the source of truth.

Do NOT define fighter data directly inside page or component files.

Inspect the existing fighter data structure before implementing the UI and use the existing types/properties.

Ranking information already belongs to each fighter:

```ts
rankings: {
  p4p: number | null
  division: number | null
}
Do not create a separate rankings data file.
Championship status is represented by:
isChampion: boolean
Use the existing weightClass field and existing fighter properties rather than creating duplicate data structures.

PAGE STRUCTURE
The page should contain:
1. Page Header
Create a clean page introduction:
Page title: FIGHTERS
A short supporting description related to the organization's athletes.
Keep it visually strong but not unnecessarily large.
The fighters grid should remain the primary focus of the page.

2. Search
Add a search input near the top of the page.
Placeholder:
Search fighters...
Search must work against:
fighter name
fighter nickname
Search should be case-insensitive.
Example searches:
Alex
Pereira
The Eagle
Use the existing fighter data.
Do not add a backend search endpoint.

3. Weight Class Filter
There should be ONLY these filter options:
All
Weight Class
The Weight Class filter should allow selecting one of the organization's canonical divisions:
Heavyweight
Light Heavyweight
Middleweight
Welterweight
Lightweight
Featherweight
Bantamweight
Flyweight
Do NOT add:
Active / Retired
Gender
Nationality
Ranking
Sort
Other filters
The canonical weight-class order should follow the order already defined by the project context.

FILTER BEHAVIOR
Search and Weight Class filtering must work together.
For example:
Search:
Alex
Weight Class:
Light Heavyweight
should only display fighters matching both conditions.
When All is selected, all fighters matching the search should be displayed.

FIGHTER GRID
Display fighters in a responsive card grid.
The exact number of columns should be chosen based on the existing design system and responsive conventions rather than hardcoding an arbitrary layout.
The cards should feel:
premium
athletic
aggressive
cinematic
clean
consistent with the homepage
Avoid excessive borders, shadows, gradients, badges, or visual clutter.
Use fighter imagery prominently.

FIGHTER CARD
Each fighter card should display the most useful information at a glance.
Use the existing data to show:

Fighter image
Fighter name
Nickname, when available
Weight class
Record
P4P ranking, when ranked
Division ranking, when ranked
Champion status, when applicable
If a fighter is a champion, make the CHAMPION status clearly visible.
Do not display Not Ranked as raw database data.
Remember:
p4p: null
division: null
means the fighter is not ranked in that category.
The UI may display an appropriate fallback such as Not Ranked, or simply omit the ranking when appropriate.
Champion fighters should NOT be treated as division rank #1.
Use isChampion to identify champions.

CARD INTERACTION
Each fighter card should be clickable.
Clicking a fighter should navigate to:
/fighters/[fighter-slug]
Use the existing slug field from the mock data.
Do NOT build the dynamic Fighter Profile page in this task.
The link should simply point to the correct future route.
Use proper semantic links rather than unnecessary click handlers when possible.

EMPTY STATE
If no fighters match the current search/filter combination, show a clean empty state:
No fighters found.
Provide an appropriate way to clear/reset the current search/filter state if it fits naturally into the existing UI.
Do not over-engineer this.

COMPONENT ARCHITECTURE
Follow the project's Server/Client Component architecture.
The page should remain a Server Component by default.
Only isolate the interactive search/filter functionality into a Client Component if React state/event handlers are required.
Do NOT add "use client" to the entire /fighters/page.tsx unless there is a genuine architectural reason.
Keep reusable presentational components separate when appropriate.
Possible structure:
app/
└── fighters/
    └── page.tsx

components/
└── fighters/
    ├── fighter-card.tsx
    └── fighters-browser.tsx
This is only an example.
Follow the existing project structure if it already has a better convention.
Do not create unnecessary abstractions.

RESPONSIVENESS
The page must work properly across:
desktop
tablet
mobile
The search/filter controls should remain usable on small screens.
The fighter cards should maintain good image proportions and readable typography at all breakpoints.
Do not simply shrink the desktop design.

ACCESSIBILITY
Follow the project's accessibility standards.
Make sure:
search input has an accessible label
interactive controls are keyboard accessible
fighter cards use semantic links
images have meaningful alt text
focus states remain visible
color contrast is sufficient
filter controls have clear accessible states
Do not sacrifice accessibility for visual effects.

MOTION
Use motion only where it improves the experience.
Keep animations:
subtle
fast
purposeful
Respect prefers-reduced-motion.
Do not add unnecessary animation libraries.

STYLING RULES
Follow context/ui-context.md and context/code-standards.md.
Do NOT:
introduce arbitrary hex colors in components
create random custom design tokens
add unnecessary CSS
use excessive gradients
use excessive glassmorphism
introduce another UI library
redesign the site's visual identity
Use the existing semantic theme tokens and Tailwind conventions.
Use shadcn/ui components where they genuinely fit the interaction.
Use Lucide icons where an icon is useful.

IMPORTANT SCOPE LIMITS
This task is ONLY:
/fighters
Do NOT implement:
/fighters/[fighter-slug]
Fighter Profile
Rankings page
Ranking history
PostgreSQL
Prisma
API routes
Authentication
Admin panel
Pagination
Load More
Sorting
Additional filters
Keep the implementation focused.

VERIFICATION
After implementation:
Run the appropriate TypeScript checks.
Run linting if configured.
Verify the development server.
Verify /fighters.
Test search by name.
Test search by nickname.
Test Weight Class filtering.
Test Search + Weight Class together.
Test All.
Test the empty state.
Test fighter card links.

Test dark mode.
Test light mode.
Test desktop, tablet, and mobile layouts.
Check keyboard accessibility.
Check that no existing homepage/Navbar/Footer functionality was broken.
Fix the root cause of any issues rather than suppressing errors.
Do not leave debug code, unused imports, dead components, or unnecessary dependencies.
Finally, update context/progress-tracker.md so it accurately reflects that the Fighters listing page has been completed and records any important implementation decisions or unfinished items.
Do not modify other context files unless an actual architecture, UI, coding-standard, or workflow decision changed.