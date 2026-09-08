read the /AGENTS.md before starting.

Build and finalize the Rankings Page for the MMA organization website.

Before making any changes, read and follow all project context files according to "context/AGENTS.md", especially:

- "project-overview.md"
- "architecture-context.md"
- "ui-context.md"
- "code-standards.md"
- "ai-workflow-rules.md"
- "progress-tracker.md"

Also inspect the current implementation and existing fighter data before writing new code.

---

1. Page Goal

Create the public-facing Rankings Page.

The page should feel:

- Premium
- Aggressive
- Modern
- Cinematic
- Professional
- Clean

It should feel like an official MMA organization's rankings page.

Do NOT make it look like a UFC clone.

Reuse the existing design system, components, typography, spacing, colors, tokens, and responsive patterns already established in the project.

---

2. Ranking Structure

There are exactly 9 ranking sections:

1. Pound-for-Pound
2. Heavyweight
3. Light Heavyweight
4. Middleweight
5. Welterweight
6. Lightweight
7. Featherweight
8. Bantamweight
9. Flyweight

There must NOT be separate ranking sections for anything outside these divisions.

---

3. Single-Open Accordion

Use the existing "shadcn/ui" Accordion component if appropriate.

The rankings must behave as a single-open Accordion.

Requirements:

- All sections are CLOSED on initial page load.
- Only ONE ranking section can be open at a time.
- Opening one section automatically closes the previously opened section.
- Multiple sections must NEVER remain open simultaneously.
- Closing the currently open section should also be possible if supported naturally by the component.
- Do not use a complicated custom accordion implementation unless the existing component cannot satisfy the requirements.

The accordion should feel like a compact cinematic ranking selector, not a generic settings accordion.

---

4. Accordion Header Design

Each division should have a clearly clickable header.

Example concept:

┌──────────────────────────────────────────────┐
│  HEAVYWEIGHT                              +   │
└──────────────────────────────────────────────┘

When opened:

┌──────────────────────────────────────────────┐
│  HEAVYWEIGHT                              −   │
├──────────────────────────────────────────────┤
│  #    Fighter                         MOV.   │
│  ...                                         │
└──────────────────────────────────────────────┘

Headers should be:

- compact
- visually strong
- clearly interactive
- easy to scan
- consistent across all divisions

Add subtle hover/focus feedback so users understand that the header is clickable.

Do NOT use constant animation, excessive glow, or pulsing effects.

Opening/closing animation should be simple, smooth, and fast.

---

5. Pound-for-Pound

The first section is:

Pound-for-Pound

It contains ranks:

#1 through #15

P4P should feel slightly more special than the division rankings.

Possible subtle differences:

- stronger header treatment
- slightly more prominent accent
- slightly more cinematic presentation

But it must still belong to the same Accordion system.

Do NOT make it visually excessive.

---

6. Division Rankings

Each of the 8 divisions contains:

- 1 Champion
- #1 through #15 contenders

Important:

Champion is NOT #1.

The Champion is a separate fighter at the top of the ranking list.

Example:

CHAMPION
Fighter Name

Then:

#1   Fighter Name
#2   Fighter Name
#3   Fighter Name
...
#15  Fighter Name

Do NOT assign the champion "rankings.division = 1".

The existing data model already distinguishes champions using "isChampion".

Use the existing fighter data as the source of truth.

---

7. Ranking Row Design

Keep each ranking row compact.

The row should contain ONLY:

- Rank
- Fighter Photo
- Fighter Name
- Movement

Do NOT add unnecessary information such as:

- Record
- Age
- Height
- Reach
- Nationality
- Stance
- Championship history
- Full fight statistics

The ranking page should remain focused.

Conceptually:
┌──────────────────────────────────────────────┐
│ #3    [PHOTO]    Fighter Name             ▲2 │
└──────────────────────────────────────────────┘

Movement appears on the far right.

---

8. Movement Indicators

Use the existing movement data/model if available.

Supported visual states:

▲2
▼1
—
NEW

Meaning:

- "▲2" = moved up two positions
- "▼1" = moved down one position
- "—" = unchanged
- "NEW" = newly ranked

Use appropriate semantic styling from the existing design system.

Do NOT introduce arbitrary colors directly inside components if semantic tokens already exist.

---

9. Fighter Photos

Every fighter ranking row should display a fighter photo.

Use the existing "imageUrl" from "fighters.ts".

Some current fighters intentionally have:

imageUrl: ""

Do NOT invent external images.

For empty "imageUrl" values, use the project's existing polished fallback/avatar treatment.

The fallback should look intentional and professional rather than like a broken image.

Do NOT modify the fighter database just to fill ranking photos.

---

10. Champion Styling

Champions must be visually distinct from normal ranked fighters.

The Champion row should clearly communicate:

CURRENT CHAMPION

without overwhelming the rest of the ranking.

Possible visual treatments:

- subtle accent border
- stronger background
- slightly larger photo
- champion badge
- stronger typography
- accent indicator

Use a restrained combination of these.

Do NOT create an oversized champion card.

The champion should still fit naturally into the ranking list.

Example:

┌──────────────────────────────────────────────┐
│  CHAMPION                                    │
│  [PHOTO]   Fighter Name                  —   │
└──────────────────────────────────────────────┘

Then normal rankings begin underneath.

---

11. Fighter Row Interaction

Every fighter row must be clickable.

Clicking a fighter should navigate to:

/fighters/[fighter-slug]

Use the existing fighter slug/routing implementation.

Do NOT create a separate ranking profile page.

Use the existing Fighter Profile page.

Add subtle hover feedback to indicate that rows are interactive.

Do not make the entire ranking page feel overly animated.

---

12. Responsive Design

The Rankings Page must work properly on:

- mobile
- tablet
- desktop

On mobile:

- ranking rows become compact
- photos remain consistently sized
- rank remains easy to scan
- fighter names remain readable
- movement stays aligned to the right
- long fighter names must not break the layout
- accordion headers remain easy to tap
- no horizontal scrolling

Do not let long names push the movement indicator outside the card.

Use proper responsive layout techniques rather than arbitrary positioning.

---

13. Typography

Use the existing project typography system:

- Barlow Condensed for display/heading-oriented text
- Inter for body/UI text

Do not introduce a new font.

Ranking numbers should be visually distinct but not oversized.

Fighter names should be the primary content.

Movement should be secondary but immediately readable.

---

14. Animation

Use subtle, purposeful motion only.

Accordion:

- smooth open/close
- fast transition
- no excessive spring animation

Rows:

- subtle hover state
- no continuous animation

Champion:

- no pulsing glow
- no automatic animation

P4P:

- may have slightly stronger visual treatment
- still restrained

---

15. Accessibility

Make sure:

- Accordion headers are keyboard accessible.
- Focus states are visible.
- Buttons/interactive elements have appropriate semantics.
- Fighter rows are keyboard accessible if implemented as interactive elements.
- Images have appropriate alt text.
- Color is not the only way movement status is communicated.

Use semantic HTML where possible.

---

16. Data Architecture

Do NOT create a separate "rankings.ts" data source.

The existing:

mock-database/fighters.ts

is the source of truth.

Derive ranking sections from the existing fighter data.

Use:

rankings.p4p
rankings.division
isChampion
weightClass

according to the existing data model.
Remember:

rankings.p4p === null

means the fighter is not P4P ranked.

And:

rankings.division === null

means the fighter is not a numbered contender.

A champion is identified using:

isChampion === true

and should be displayed separately from #1.

Do not store ""Not Ranked"" strings.

Do not duplicate ranking data unnecessarily.

---

17. Component Architecture

Keep the implementation reusable and clean.

A reasonable structure could be:

RankingsPage
 └── RankingsAccordion
      └── RankingSection
           ├── RankingHeader
           └── RankingList
                └── RankingRow

You may adapt this to the existing project architecture.

Do not blindly create all of these components if they are unnecessary.

Prefer the simplest clean architecture that fits the existing codebase.

---

18. Server / Client Components

Follow the existing architecture rules.

The Rankings Page should remain a Server Component by default.

Only use a Client Component where necessary for:

- Accordion interactivity
- browser-only behavior
- client state

Do not make the entire page a Client Component unnecessarily.

Do not access mock database data from a Client Component if it can be passed from the server.

---

19. Do Not Modify Existing Features

This task is specifically for the Rankings Page.

Do NOT unnecessarily modify:

- Fighter Profile
- Fighters Listing
- Events
- Fight Cards
- News
- Homepage
- Navbar
- Footer
- existing data models

If a shared component genuinely needs a small change to support the Rankings Page, verify that the change does not regress existing pages.

---

20. Visual Quality

The final page should have strong visual hierarchy:

RANKINGS

P4P
────────────────────────────

Heavyweight
────────────────────────────

Light Heavyweight
────────────────────────────

Middleweight
────────────────────────────

...

When a section opens:

Heavyweight
────────────────────────────
CHAMPION
[photo] Fighter Name

#1 [photo] Fighter Name        ▲2
#2 [photo] Fighter Name        —
#3 [photo] Fighter Name        ▼1
...
#15 [photo] Fighter Name       NEW

The page should feel like a premium sports ranking interface, not a generic dashboard/table.

Avoid:

- excessive borders everywhere
- excessive rounded cards
- huge typography
- excessive shadows
- neon effects
- unnecessary icons
- excessive information
- giant fighter cards

Use whitespace, hierarchy, alignment, typography, and subtle accent treatment to create the premium feel.

---

21. Final Verification

After implementation:

1. Run TypeScript.
2. Run lint.
3. Verify all 9 Accordion sections exist.
4. Verify all sections are closed initially.
5. Verify only one section can be open at a time.
6. Verify P4P has #1–#15.
7. Verify every division has one Champion + #1–#15.
8. Verify Champion is NOT #1.
9. Verify movement indicators render correctly.
10. Verify every fighter row is clickable.
11. Verify links point to the correct fighter profile.
12. Verify empty image URLs use the existing fallback.
13. Verify mobile layout.
14. Verify tablet layout.
15. Verify desktop layout.
16. Verify long fighter names.
17. Verify keyboard accessibility.
18. Verify no existing page was accidentally broken.

Finally, update "context/progress-tracker.md" if the Rankings Page is successfully completed, following the existing project documentation rules.

Do not consider the task complete if the ranking data, champion separation, accordion behavior, or mobile layout is incorrect.