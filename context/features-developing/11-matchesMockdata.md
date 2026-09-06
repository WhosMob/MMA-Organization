read the /AGENTS.md before starting.


Create the mock fight database for the MMA organization project.

IMPORTANT:
Before making any changes, inspect the existing project and read the relevant context files:

- context/project-overview.md
- context/architecture-context.md
- context/ui-context.md
- context/code-standards.md
- context/ai-workflow-rules.md
- context/progress-tracker.md

Also inspect:
- mock-database/fighters.ts
- mock-database/events.ts

Follow the existing project conventions and current data structures.

========================================
GOAL
========================================

Create:

mock-database/fights.ts

This will be the source of truth for fight data during the current mock-data development phase.

Fight data will later be replaced by the appropriate Prisma/PostgreSQL data model.

Do NOT implement Prisma or PostgreSQL now.

Do NOT build or modify any UI.

========================================
FIGHT DATA MODEL
========================================

Each fight must contain:

- id
- eventId
- fighter1Id
- fighter2Id
- weightClass
- cardPosition
- status
- result
- date

Use a strongly typed TypeScript structure.

Prefer explicit types/interfaces and strict typing.

Do not use any.

========================================
FIELDS
========================================

### id

Unique identifier for the fight.

Use a readable slug-like format.

Example:

"gaziev-vs-volkov"

Every fight must have a unique ID.

----------------------------------------

### eventId

References an existing event from:

mock-database/events.ts

Use the existing event IDs.

Do not invent event IDs that do not exist.

----------------------------------------

### fighter1Id / fighter2Id

References existing fighters from:

mock-database/fighters.ts

Use fighter IDs exactly as they exist in the fighter database.

Do not duplicate fighter information inside the fight object.

Do not use fighter names as the relationship field.

----------------------------------------

### weightClass

Use the project's existing canonical weight-class values.

The valid divisions are:

- Heavyweight
- Light Heavyweight
- Middleweight
- Welterweight
- Lightweight
- Featherweight
- Bantamweight
- Flyweight

Do not create alternative spellings or abbreviations.

----------------------------------------

### cardPosition

Represents where the fight appears on the event fight card.

Valid values:

- MAIN_EVENT
- CO_MAIN_EVENT
- MAIN_CARD
- PRELIMINARY

Use:

MAIN_EVENT

for the primary headline fight.

Use:

CO_MAIN_EVENT

for the co-main event.

Use:

MAIN_CARD

for other main-card fights.

Use:

PRELIMINARY

for preliminary-card fights.

----------------------------------------

### status

Use a dedicated fight status field.

Valid values:

- UPCOMING
- COMPLETED

For example:

status: "UPCOMING"

or:

status: "COMPLETED"

Do not infer the status from result.

The status field is intentionally explicit.

----------------------------------------

### result

For an upcoming fight:

`ts
result: null

For a completed fight:

result: {
  outcome: "WIN",
  winnerId: "fighter-id",
  loserId: "fighter-id",
  method: "KO",
  round: 2,
  time: "3:42",
}

The result object must contain:

outcome

winnerId

loserId

method

round

time


======================================== OUTCOME

Valid outcome values:

WIN

DRAW

NO_CONTEST


For a normal win:

outcome: "WIN"

For a draw:

outcome: "DRAW"

For a no contest:

outcome: "NO_CONTEST"

For DRAW and NO_CONTEST:

winnerId: null
loserId: null

For a normal WIN:

winnerId must reference one of the two fighters

loserId must reference the other fighter


Do not allow a fighter to be both winner and loser.

======================================== METHOD

Use these valid method values:

KO

TKO

SUBMISSION

UNANIMOUS_DECISION

SPLIT_DECISION

MAJORITY_DECISION


Important:

DRAW and NO_CONTEST are outcomes, NOT methods.

Do not put DRAW or NO_CONTEST inside method.

Examples:

Decision win:
{
  outcome: "WIN",
  winnerId: "fighter-a",
  loserId: "fighter-b",
  method: "UNANIMOUS_DECISION",
  round: 5,
  time: "5:00",
}

Draw:

{
  outcome: "DRAW",
  winnerId: null,
  loserId: null,
  method: "MAJORITY_DECISION",
  round: 5,
  time: "5:00",
}

No contest:

{
  outcome: "NO_CONTEST",
  winnerId: null,
  loserId: null,
  method: "TKO",
  round: 1,
  time: "0:42",
}

Use sensible combinations for the fictional data.

======================================== ROUND AND TIME

For completed fights:

round should be a positive integer.

time should use M:SS.


Examples:

"0:42" "2:15" "4:37" "5:00"

For upcoming fights:

result must be null, so there is no round/time yet.

======================================== DATE

Use:

YYYY-MM-DD

Example:

"2026-08-15"

The date should be coherent with the referenced event.

Do not invent dates that conflict with events.ts.

======================================== DATASET

Create a realistic fictional MMA fight dataset that works with the existing fighters and events.

IMPORTANT:

Before creating fights, inspect the existing:

mock-database/fighters.ts

and:

mock-database/events.ts

Use their actual IDs.

Do not invent fighters or events.

The dataset should contain enough fights to support the future Fighter Profile and Event Detail pages.

Include:

completed fights

upcoming fights

main events

co-main events

main-card fights

preliminary fights

different weight classes

different result outcomes

different finish methods

decision fights

at least some DRAW / NO_CONTEST examples if appropriate


Keep the dataset coherent.

Avoid impossible or contradictory relationships.

For example:

Do not make a fighter fight themselves.

Do not reference nonexistent fighter IDs.

Do not reference nonexistent event IDs.

Do not assign more than one MAIN_EVENT to the same event.

Do not assign more than one CO_MAIN_EVENT to the same event.

MAIN_EVENT and CO_MAIN_EVENT should be distinct fights.

Upcoming fights must have result: null.

Completed fights must have a populated result.

Completed fights should have dates that are not later than their event date.

Upcoming fights should have dates consistent with their event date.


======================================== FIGHTER PROFILE COMPATIBILITY

The future Fighter Profile will query fights using:

fighter1Id or fighter2Id

Therefore the data must make it possible to retrieve all fights involving a fighter without duplicating fight history inside fighters.ts.

Do NOT add:

recentFights to fighters.ts

fightHistory to fighters.ts

fight IDs to fighters.ts


The relationship belongs in fights.ts.

======================================== EVENT COMPATIBILITY

The future Event Detail page will query fights using:

eventId

Therefore every fight must belong to an existing event.

The event fight card should be reconstructable entirely from:

eventId + cardPosition

Do not create a separate fight-card data structure.

======================================== ARCHITECTURE

Keep this as a simple mock database module.

Do not introduce:

Prisma

PostgreSQL

API routes

Server Actions

external database

new packages

state management

UI components


Do not modify existing UI.

Do not modify fighters.ts unless a type import or shared type is genuinely necessary, and avoid doing so if possible.

Keep the mock database independent and easy to replace later with Prisma.

======================================== TYPE DESIGN

Use TypeScript types/interfaces that clearly represent:

Fight

FightResult

FightStatus

FightOutcome

FightMethod

FightCardPosition


Prefer string literal unions for constrained values.

For example:

type FightStatus = "UPCOMING" | "COMPLETED";

Use appropriate nullability.

Do not use loose string types where a fixed set of values is appropriate.

======================================== EXPORT

Export the fight data in a way consistent with the existing mock-database files.

Prefer a named export such as:

fights

if that matches the existing project convention.
Do not introduce unnecessary classes or database abstractions.

======================================== VERIFICATION

After implementation:

1. Run TypeScript checking.


2. Run lint.


3. Run build if appropriate.


4. Verify every eventId exists in events.ts.


5. Verify every fighter1Id and fighter2Id exists in fighters.ts.


6. Verify fighter1Id !== fighter2Id.


7. Verify every fight has exactly one valid cardPosition.


8. Verify each event has at most one MAIN_EVENT.


9. Verify each event has at most one CO_MAIN_EVENT.


10. Verify UPCOMING fights have result: null.


11. Verify COMPLETED fights have a valid result.


12. Verify WIN results have valid winner/loser IDs belonging to the two fighters.


13. Verify DRAW and NO_CONTEST have null winner/loser IDs.


14. Verify all completed fight dates are coherent with their events.


15. Verify no duplicate fight IDs.


16. Verify no invalid enum values.


17. Verify no any types were introduced.



Update:

context/progress-tracker.md

after successful implementation, following the project's existing workflow.

======================================== IMPORTANT SCOPE LIMIT

This task is ONLY about creating the mock fight database.

Do NOT:

Build Fighter Profile fight history UI.

Build Recent Fights UI.

Modify Fighter Profile UI.

Build Event Detail UI.

Build Events page.

Create Prisma models.

Create PostgreSQL schema.

Create APIs.

Add authentication.

Add admin functionality.


Stop after the fight data layer is complete and verified.

At the end, report:

Files created/modified

Number of fights created

Number of upcoming fights

Number of completed fights

Verification results

Any warnings/issues