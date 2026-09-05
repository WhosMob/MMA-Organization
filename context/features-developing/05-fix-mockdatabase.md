read the /AGENTS.md before starting.


Update the project's mock database architecture for fighters and rankings.

IMPORTANT:
The Homepage Pound-for-Pound section displays only the Top 5 fighters. This is a UI presentation requirement and must NOT limit the underlying ranking data.

We want to change the mock ranking data architecture so that fighter data is the single source of truth for ranking information.

## Main Architectural Change

Remove the need for a separate `rankings.ts` mock data file.

Ranking information should be stored directly inside each fighter object in `mock-database/fighters.ts`.

The UI should derive ranking lists from the fighter data by filtering and sorting the fighters according to their ranking values.

This prevents duplicate ranking data and keeps fighter information and ranking information synchronized.

## Before Making Changes

1. Read the relevant context files, especially:
   - `context/project-overview.md`
   - `context/architecture-context.md`
   - `context/ui-context.md`
   - `context/code-standards.md`
   - `context/ai-workflow-rules.md`
   - `context/progress-tracker.md`
2. Inspect the existing `mock-database/` directory.
3. Inspect the existing fighter mock data.
4. Inspect the existing ranking mock data.
5. Inspect the current Homepage P4P implementation and any ranking-related UI/components.
6. Reuse existing structures where appropriate instead of unnecessarily rewriting them.

## Fighter Ranking Data

Each fighter should contain a `rankings` object.

Use this general structure:

ts
rankings: {
  p4p: number | null
  division: number | null
}

Example:

{
  id: "fighter-001",
  name: "Alex Carter",
  weightClass: "Heavyweight",
  rankings: {
    p4p: 3,
    division: 2
  },
  isChampion: false
}

A fighter who is not ranked P4P should use:

rankings: {
  p4p: null,
  division: 5
}

Do NOT store "Not Ranked" as a string in the mock data.

Use null to represent the absence of a ranking.

The UI may display Not Ranked when the ranking value is null.

Ranking Requirements

The mock database must contain enough fighter data to support the complete Rankings page defined by the project specification.

P4P

There must be exactly:

#1 through #15


Only fighters with a non-null rankings.p4p value are included in the P4P ranking list.

Weight Divisions

The project has eight divisions:

1. Heavyweight


2. Light Heavyweight


3. Middleweight


4. Welterweight


5. Lightweight


6. Featherweight


7. Bantamweight


8. Flyweight



Each division must have:

One current champion

#1 through #15 ranked contenders


The champion is NOT considered #1.

The champion is displayed separately from the contender rankings.

For division rankings, rankings.division represents the fighter's ranking within their current weightClass.

Example:

{
  weightClass: "Heavyweight",
  rankings: {
    p4p: 3,
    division: 2
  }
}

This means the fighter is:

P4P #3

Heavyweight #2


A fighter who is not ranked in their division should have:

rankings: {
  p4p: null,
  division: null
}

Champion Handling

Do not use division: 1 to represent the champion.

Championship status must remain separate from contender ranking.

Use the existing project architecture for championship information. If the current mock structure uses isChampion, preserve it where appropriate.

The resulting data must allow the UI to determine:

Who is the current champion

Who is ranked #1

Who is ranked #2

...

Who is ranked #15


without treating the champion as a ranked contender.

Homepage P4P

Do NOT change the intended Homepage behavior.

The Homepage P4P section must display only the Top 5.

However, the Top 5 must be derived from the full P4P ranking data.

Conceptually:

Full P4P ranking
#1
#2
#3
#4
#5
...
#15
      ↓
Homepage
      ↓
Take first 5
      ↓
#1–#5

Do not create a separate five-fighter P4P dataset just for the Homepage.

The Homepage and Rankings page should use the same underlying fighter data.

Rankings UI

Update ranking-related UI logic so that ranking information is derived from mock-database/fighters.ts.

The UI should:

P4P
1. Select fighters where rankings.p4p !== null.


2. Sort them by rankings.p4p ascending.


3. Display #1 through #15.



Division

1. Select fighters belonging to the selected weightClass.


2. Identify the current champion separately.


3. Select fighters where rankings.division !== null.


4. Sort them by rankings.division ascending.


5. Display #1 through #15.



Do not hardcode ranking positions in the UI.

The ranking number displayed by the UI must come from the fighter's mock data.

Data Consistency

Make the mock data internally coherent.

Requirements:

No duplicate P4P ranking positions.

No duplicate division ranking positions within the same weight class.

Every division has one current champion.

Every division has contenders ranked #1 through #15.

A fighter may have a P4P ranking and a division ranking simultaneously.

A fighter does not need to be ranked P4P to have a division ranking.

A fighter does not need to be ranked in their division to have a P4P ranking.

Do not create impossible or contradictory ranking states.


Use fictional but realistic and coherent MMA fighter data where additional fighters are required.

File Structure

The mock database should remain organized by domain entity.

Expected structure should be similar to:

mock-database/
├── fighters.ts
├── events.ts
├── fights.ts
└── news.ts

There should NOT be a separate:

mock-database/rankings.ts

if ranking information can be completely derived from fighters.ts.

Remove the old ranking mock data file if it becomes unused after this refactor.

Do not leave duplicate ranking datasets behind.

TypeScript

Keep the implementation consistent with the project's TypeScript standards.

Prefer explicit types.

Do not use any.

Use number | null for optional rankings.

Keep the data structures readable and simple.

Do not introduce unnecessary abstractions or dependencies.

Scope

Only modify files necessary for this ranking/mock-data refactor.

Do not redesign unrelated UI.

Do not change the overall Homepage structure.

Do not modify Navbar, Footer, Hero, Event Carousel, or unrelated sections unless a small change is strictly required to consume the new fighter ranking data.

Verification

After implementing the changes:

1. Verify that fighters.ts contains the required ranking information.


2. Verify P4P contains #1–#15.


3. Verify every division contains a champion and #1–#15 contenders.


4. Verify there are no duplicate ranking positions.


5. Verify the Homepage still displays only the Top 5 P4P fighters.


6. Verify ranking numbers displayed by the UI come from fighter data.


7. Verify there is no unused rankings.ts.


8. Run the relevant TypeScript/lint checks if available.


9. Fix any issues caused by the refactor rather than adding workarounds.


10. Update context/progress-tracker.md with the actual changes made.



Do not implement PostgreSQL or Prisma as part of this task.

This task is strictly about improving the current mock database and the ranking data flow during the UI development phase.

`