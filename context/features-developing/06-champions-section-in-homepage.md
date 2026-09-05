read the /AGENTS.md before starting.



Update the Fighters Mock Database and implement the Homepage Champions section.

IMPORTANT:
Championship status must be determined from the fighter data using the existing boolean field:

isChampion: boolean

Do not create a separate Champions mock data file.

## Before Making Changes

1. Read the relevant context files:
   - context/project-overview.md
   - context/architecture-context.md
   - context/ui-context.md
   - context/code-standards.md
   - context/ai-workflow-rules.md
   - context/progress-tracker.md
2. Inspect the existing mock-database/fighters.ts.
3. Inspect the current Homepage implementation.
4. Inspect the existing Weight Class definitions/constants if they already exist.
5. Reuse existing types, constants, and components where appropriate.

## Champion Data

Use the existing fighter data as the single source of truth.

A fighter is considered a current champion when:

`ts
isChampion: true

Do not create:

mock-database/champions.ts

or another separate mock dataset for Homepage champions.

There must be exactly one current champion for each of the eight divisions:

1. Heavyweight


2. Light Heavyweight


3. Middleweight


4. Welterweight


5. Lightweight


6. Featherweight


7. Bantamweight


8. Flyweight



Therefore, the mock database should contain exactly 8 fighters with:

isChampion: true

one for each weight class.

Champion Ranking Rules

Champions are separate from contender rankings.

A champion must NOT occupy a contender ranking position.

Therefore, for a champion:

rankings: {
  p4p: number | null,
  division: null
}

The champion may have a P4P ranking if appropriate.

Do not use:

division: 1

to represent championship status.

Homepage Champions Section

Implement the Champions section on the Homepage using the fighter mock data.

The section must:

1. Read fighters from mock-database/fighters.ts.


2. Filter fighters where:



isChampion === true

3. Display the 8 current champions.


4. Order them according to the project's canonical weight-class order:



Heavyweight
Light Heavyweight
Middleweight
Welterweight
Lightweight
Featherweight
Bantamweight
Flyweight

Do NOT rely on the order of fighters inside fighters.ts.

Do NOT manually hardcode individual champion names into the UI.

The UI should derive the champion for each division from the fighter's:

isChampion

weightClass


data.

Conceptually:

Fighters
   ↓
filter isChampion === true
   ↓
match by weightClass
   ↓
sort by canonical weight-class order
   ↓
Champions Section

UI Requirements

Keep the previously established Homepage Champions design direction:

One unified Champions section/container.

All 8 divisions are presented inside the same section.

Each division clearly displays:

Weight class

Champion image

Champion name


The design should feel premium, aggressive, modern, and consistent with the existing Homepage.

Use the existing UI design system and semantic color tokens.

Use existing shadcn/ui components where appropriate.

Use Lucide icons only when they provide a meaningful UI purpose.

Do not introduce unnecessary dependencies.


Data Integrity

Verify that:

Every division has exactly one current champion.

No division has multiple fighters with isChampion: true.

Every champion has a valid weightClass.

Champions do not have a division contender ranking.

Existing P4P rankings remain valid.

Existing contender rankings remain valid.

Do not modify unrelated fighter data unless required for consistency.


Architecture

Do not create a separate data source for Champions.

The intended relationship is:

mock-database/fighters.ts
        ↓
   Fighter data
        ↓
isChampion + weightClass
        ↓
Champions Section

The Homepage should consume the fighter data rather than duplicating it.

Do not introduce PostgreSQL or Prisma for this task.

This is still the initial UI development phase using the project's Mock Database.

Scope

Only implement the Homepage Champions section and the minimum required mock-data changes.

Do not modify:

Navbar

Footer

Hero

Event Carousel

P4P Top 5 section

Other Homepage sections


unless a small change is strictly required for integration.

Do not redesign existing sections.

Verification

After implementation:

1. Verify all 8 divisions have exactly one champion.


2. Verify champions are derived from isChampion.


3. Verify the order is: Heavyweight → Light Heavyweight → Middleweight → Welterweight → Lightweight → Featherweight → Bantamweight → Flyweight.


4. Verify champion names are not hardcoded into the Champions UI.


5. Verify the UI does not depend on the physical order of fighters in fighters.ts.


6. Verify champions have rankings.division === null.


7. Verify the existing Homepage sections still work.


8. Run TypeScript/lint checks if available.


9. Fix root causes rather than adding workarounds.


10. Update context/progress-tracker.md with the actual implementation completed.



Do not implement PostgreSQL, Prisma, authentication, an admin panel, or any other backend functionality as part of this task.