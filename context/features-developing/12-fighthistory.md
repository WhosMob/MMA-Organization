read the /AGENTS.md before starting.


# Implement Fighter Profile Fight History

Implement the next feature unit: **connect the Fighter Profile page to `mock-database/fights.ts` and display Recent Fights + Full Fight History.**

## 1. Before Changing Anything

Read the project context files in this exact order:

1. `context/project-overview.md`
2. `context/architecture-context.md`
3. `context/ui-context.md`
4. `context/code-standards.md`
5. `context/ai-workflow-rules.md`
6. `context/progress-tracker.md`

Then inspect the existing implementation of:

- `mock-database/fighters.ts`
- `mock-database/fights.ts`
- `mock-database/events.ts`
- The existing Fighter Profile page at `/fighters/[fighter-slug]`
- All components currently used by the Fighter Profile
- Existing shared UI components that can reasonably be reused

Do not assume file names or component names. Inspect the actual project first.

---

## 2. Goal

Complete the remaining fight-related parts of the Fighter Profile page:

1. **Recent Fights**
2. **Full Fight History**

The existing Fighter Profile sections must continue working:

- Fighter Hero
- Fighter Information
- Rankings
- Championships

Do not rewrite or unnecessarily refactor those sections.

---

## 3. Data Sources

`mock-database/fights.ts` is the single source of truth for fights.

Use:

- `fighters.ts` → fighter information
- `fights.ts` → fight information
- `events.ts` → event information

The relationship is:

```text
Fighter Profile
      ↓
fights.ts
      ↓
eventId → events.ts
fighter1Id / fighter2Id → fighters.ts
Do NOT add fight history to fighters.ts.
Do NOT introduce:
PostgreSQL
Prisma
API routes
Authentication
Any other backend/database technology
This project is still in the mock-data development phase.

4. Selecting a Fighter's Fights
For a fighter with ID fighterId, select fights where:
fight.fighter1Id === fighterId || fight.fighter2Id === fighterId
Do not duplicate fights.

5. Resolving the Opponent
For every fight, determine the opponent dynamically.
If:
fight.fighter1Id === fighterId
the opponent is:
fight.fighter2Id
Otherwise the opponent is:
fight.fighter1Id
Resolve the opponent from mock-database/fighters.ts.
Do not hardcode opponent names.

6. Determining the Fighter's Result
For completed fights, derive the selected fighter's result from fight.result.
WIN
If:
fight.result.outcome === "WIN"
then:
fight.result.winnerId === fighterId → WIN
otherwise → LOSS
DRAW
If:
fight.result.outcome === "DRAW"
display:
DRAW
NO_CONTEST
If:
fight.result.outcome === "NO_CONTEST"
display:
NC
Do not store a separate fighter-specific result in the UI.
The result must always be derived from the fight data.

7. Upcoming Fights
fights.ts contains:
UPCOMING
COMPLETED
Upcoming fights have:
result: null
Upcoming fights must NOT be displayed as WIN/LOSS/DRAW/NC.
Instead display:
UPCOMING
For upcoming fights, show relevant information such as:
Opponent
Event
Date
Weight Class
Card Position
Do not attempt to calculate a result when the fight is upcoming.

8. Date Handling
Fight dates are stored as:
YYYY-MM-DD
Display them in a readable format consistent with the existing project.
Do not introduce a third-party date library.

9. Event Information
Use:
fight.eventId
to resolve the event from:
mock-database/events.ts
Display the event name where appropriate.
Do not hardcode event names.

10. Recent Fights
Create a Recent Fights section on the Fighter Profile.
Requirements:
Show the fighter's most recent completed fights.
Sort completed fights by date descending.
Most recent fight first.
Show a reasonable limited number of recent fights.
Do not add pagination unless the existing project already uses it.
Each completed fight should provide enough information to understand:
Opponent
Result
Method
Round
Time
Date
Event
Weight Class
If the fighter has upcoming fights, they may be displayed separately if this fits the existing design.
Do not mix upcoming fights into the completed recent-fight results.
11. Full Fight History
Create a Fight History section containing all fights involving the selected fighter.
Requirements:
Include completed and upcoming fights.
Sort by date descending.
Most recent fight first.
Do not duplicate fights.
Correctly calculate the fighter's result.
Correctly resolve the opponent.
Correctly resolve the event.
Support all possible states:
WIN
LOSS
DRAW
NC
UPCOMING
The layout must remain readable on mobile.
A table/list layout is acceptable if it matches the existing visual language.
Do not add pagination unless it is genuinely necessary for the current dataset.

12. Reusable Components
Before creating new components, inspect the existing component structure.
If a fight row/card can naturally be reused between:
Recent Fights
Full Fight History
create a small reusable component.
Keep components:
Small
Focused
Single-purpose
Do not create unnecessary abstraction layers.

13. Server/Client Architecture
Keep the Fighter Profile as a Server Component by default.
Do not add:
"use client";
unless there is a genuine client-side interaction requirement.
Do not query mock data from Client Components.
Do not create API routes for this feature.
Resolve the data server-side.

14. TypeScript
Follow the existing types in mock-database/fights.ts.
Do not use:
any
Do not weaken existing types.
Use proper type narrowing for:
fight.status
fight.result
fight.result.outcome
Respect nullability.
Do not duplicate the Fight type definition if it already exists.

15. UI and Design
Follow context/ui-context.md.
The new sections must visually belong to the existing Fighter Profile.
Maintain:
Premium
Aggressive
Modern
Dark mode default
Light mode support
Existing typography
Existing spacing system
Existing semantic color tokens
Existing border/radius conventions
Responsive behavior
Use semantic design tokens.
Do NOT introduce arbitrary hardcoded colors when an existing semantic token is available.
Use existing shadcn/ui and Lucide components where appropriate.
Do not introduce another UI library.

16. Accessibility
Ensure:
Semantic HTML
Good text hierarchy
Sufficient contrast
Keyboard accessibility for interactive elements
Meaningful labels
No inaccessible icon-only controls
If opponent or event names are links, their purpose should be clear.

17. Routing
If opponent names link to Fighter Profiles, use:
/fighters/[fighter-slug]
Use the fighter ID as the slug, consistent with the existing architecture.
If event names link to Event pages, use:
/events/[event-slug]
Follow the existing event routing convention.
Do not invent another routing convention.

18. Important Constraints
Do NOT:
Modify the structure of fights.ts
Add fight history to fighters.ts
Add PostgreSQL
Add Prisma
Add API routes
Add authentication
Add ranking history
Create an admin panel
Add unnecessary dependencies
Redesign the existing Fighter Profile
Rewrite unrelated components
Modify Event Detail
Implement the Event page in this task
This task is ONLY:
fights.ts
   ↓
Fighter Profile
   ↓
Recent Fights
   ↓
Full Fight History

19. Verification
After implementation, run:
npx tsc --noEmit
Then:
npm run lint
Then:
npm run build
Also manually verify:
A fighter with completed fights shows the correct opponents.
WIN/LOSS is calculated correctly.
DRAW is displayed correctly.
NO_CONTEST is displayed as NC.
Upcoming fights display UPCOMING instead of a result.
Event names resolve correctly from events.ts.
Dates are sorted newest first.
No fight appears twice.
Fighter profiles with no fights do not crash.
Invalid fighter slugs still use the existing not-found behavior.
Dark mode works.
Light mode works.
Mobile layout works.
Pay special attention to fighter identity.
For every fight, make sure the displayed opponent is the OTHER fighter, not the selected fighter.

20. Progress Tracker
After successful implementation and verification, update:
context/progress-tracker.md
Reflect the actual implementation state.
Move the Fighter Profile fight-history work into Completed.
Set the next logical feature under Next Up, but do not implement that feature.
Add concise session notes describing what was implemented.
Do not claim anything is completed unless it was actually implemented and verified.

21. Final Response
When finished, report:
Files created
Files modified
What was implemented
Verification results
Any warnings/issues
Next recommended feature
Then STOP.
Do not continue into Event Detail or any other feature.