read the /AGENTS.md before starting.


Build the first phase of the Fighter Profile page.

IMPORTANT:
Before making any changes, inspect the existing project structure and read the relevant context files, especially:
- context/project-overview.md
- context/architecture-context.md
- context/ui-context.md
- context/code-standards.md
- context/ai-workflow-rules.md
- context/progress-tracker.md

Follow the existing architecture and coding conventions. Do not assume file names or patterns before inspecting the project.

========================================
GOAL
========================================

Create the Fighter Profile page at:

/fighters/[fighter-slug]

The page must use the existing `mock-database/fighters.ts` as its data source.

This is the FIRST PHASE of the Fighter Profile.

Build ONLY:
1. Fighter Hero
2. Fighter Information
3. Rankings
4. Championships

DO NOT build Fight History or Recent Fights yet.

Fight data will be implemented later using `mock-database/fights.ts`.

========================================
DATA SOURCE
========================================

Use:

`mock-database/fighters.ts`

The existing fighter IDs are also the fighter slugs.

Example:

`/fighters/alex-volkanovski`

must find the fighter whose:

`id === "alex-volkanovski"`

Do not create another fighter data source.

Do not duplicate fighter data inside components.

========================================
ROUTING
========================================

Create the dynamic route:

`app/fighters/[fighter-slug]/page.tsx`

Follow the project's existing Next.js 16 conventions.

The page should be a Server Component by default.

Do not add `"use client"` unless there is a genuine requirement.

Do not introduce client-side state for information that can be rendered on the server.

========================================
FIGHTER LOOKUP
========================================

Use the route parameter to find the corresponding fighter from `mock-database/fighters.ts`.

If the fighter does not exist:

- Use the project's existing not-found pattern.
- Render the Next.js `notFound()` behavior if that matches the current architecture.

Do not silently render an empty profile for an invalid slug.

========================================
FIGHTER HERO
========================================

Create a strong premium MMA-style hero section.

It should display:

- Fighter image
- Fighter name
- Nickname, when available
- Record
- Weight class
- Champion status when `isChampion === true`
- P4P ranking when available
- Division ranking when available

The hierarchy should make the fighter's name the primary visual element.

Example:

Alexander Volkanovski
"The Great"

26-3-0
Featherweight
CHAMPION

P4P #13

Do not invent additional fighter information.

========================================
IMAGE HANDLING
========================================

IMPORTANT:

Currently all `imageUrl` values may be empty strings:

`imageUrl: ""`

The profile must handle this gracefully.

When `imageUrl` is empty:

- Do not render a broken image.
- Show a polished placeholder/fallback area.
- The hero layout must remain visually balanced.

When a real image URL/path is later provided, the image should automatically display without requiring changes to the component.

Use the project's existing visual language.

Do not add image infrastructure or dependencies.

========================================
FIGHTER INFORMATION
========================================

Create a dedicated information section displaying:

- Nationality
- Date of Birth
- Age
- Height
- Reach

Age MUST NOT come from the database.

Calculate the age dynamically from:

`dateOfBirth`

Do not add an `age` field to `fighters.ts`.

The age calculation must correctly account for whether the fighter's birthday has occurred yet in the current year.

Prefer a small reusable utility if appropriate, following the project's existing architecture.

Do not use a third-party date library for this simple calculation.

Display the existing height/reach strings exactly as provided by the data, for example:

`6'4 / 193 cm`

`6'6 / 198 cm`

Do not parse or unnecessarily transform these values.

========================================
RANKINGS
========================================

Create a dedicated Rankings section.

Display:

- P4P Ranking
- Division Ranking

Use the existing:

`rankings.p4p`
`rankings.division`

Rules:

- `null` means the fighter is not ranked.
- Do not invent ranking numbers.
- The UI may display `Not Ranked` when the value is null.
- If the fighter is a champion, do NOT treat the champion as Division Rank #1.
- Champions have `rankings.division === null`.

If appropriate, visually distinguish P4P and Division ranking while keeping the design consistent.

========================================
CHAMPIONSHIPS
========================================

Create a dedicated Championships section using:

`fighter.championships`

Each championship currently has:

```ts
{
  title: string
}
Do NOT expect or use a status property.
Current champion status is determined by:
isChampion
If the fighter has championship entries, display them cleanly.
If the championships array is empty:
Do not render a large empty/meaningless section.
Use the simplest appropriate behavior consistent with the project's design.
Do not invent championship history.
========================================
DESIGN
Follow the existing project UI context:
Premium + Aggressive + Modern.
The page should feel like an official professional MMA organization fighter profile.
Use:
Existing semantic design tokens
Existing typography
Existing spacing system
Existing border/radius conventions
Existing dark/light theme system
shadcn/ui where it genuinely improves the UI
Lucide icons where appropriate
Do NOT introduce arbitrary hardcoded colors if existing semantic tokens are available.
Do NOT redesign the global Navbar or Footer.
Do NOT change the global theme system.
========================================
RESPONSIVE DESIGN
The page must work intentionally across:
Desktop
Tablet
Mobile
On mobile:
Hero should stack naturally.
Fighter image should remain visually prominent.
Information and ranking sections should remain readable.
Avoid horizontal overflow.
Do not simply shrink the desktop layout.
========================================
ACCESSIBILITY
Follow the existing accessibility standards.
Ensure:
Meaningful semantic HTML
Proper heading hierarchy
Image alt text when an image exists
Keyboard accessibility
Sufficient contrast
Visible focus states where interactive elements exist
The profile itself does not need unnecessary interactive controls.
========================================
MOTION
Use only subtle, purposeful motion if the existing project patterns support it.
Respect:
prefers-reduced-motion
Do not add unnecessary animation libraries.
========================================
ARCHITECTURE
Keep the implementation simple.
Possible structure:
app/
└── fighters/
└── [fighter-slug]/
└── page.tsx
components/
└── fighters/
└── ...
lib/
└── calculate-age.ts
However, inspect the existing project first and follow its established patterns rather than blindly creating this exact structure.
Server Components should remain the default.
Do not make the entire page a Client Component.
Do not access mock data from unnecessary Client Components.
========================================
DO NOT DO THESE THINGS
Do NOT:
Create mock-database/fights.ts
Add Fight History
Add Recent Fights
Add API routes
Add Prisma
Add PostgreSQL
Add authentication
Add admin functionality
Add pagination
Add unnecessary filters
Add social media sections
Add statistics that do not exist in the data
Add new dependencies unless absolutely necessary
Modify the Fighters listing page unnecessarily
Modify Fighter Card behavior unnecessarily
Modify Navbar/Footer
Change existing fighter IDs/slugs
Change existing fighter ranking data


Add age to the fighter database
Add status to championship objects
This is a focused Fighter Profile implementation.
========================================
VERIFICATION
After implementation:
Run TypeScript checking.
Run lint.
Run build if appropriate.
Verify a valid fighter route works.
Verify an invalid fighter slug produces the proper not-found behavior.
Verify a fighter with an empty imageUrl does not show a broken image.
Verify the age is calculated correctly.
Verify both ranked and unranked fighters.
Verify champions do not appear as Division Rank #1.
Verify fighters with empty championships are handled correctly.
Test dark mode.
Test light mode.
Test desktop/tablet/mobile layouts.
Check keyboard accessibility.
Check that no unrelated functionality was broken.
Update context/progress-tracker.md after the feature is successfully implemented, following the existing project workflow.
At the end, report:
Files created/modified
What was implemented
Verification results
Any warnings or issues
Do not proceed beyond the scope of this task.