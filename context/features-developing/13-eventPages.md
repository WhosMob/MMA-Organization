read the /AGENTS.md before starting.


Task: Build Event Detail Page
Objective
Build the Event Detail page for the MMA organization website.
The route must be:
/events/[event-slug]
This feature should integrate with the existing event and fight data architecture.
The project is currently in the mock-data development phase.
Do NOT introduce PostgreSQL, Prisma, API routes, authentication, or any other backend infrastructure for this task.

1. Read Project Context First
Before changing any code, read these files in this exact order:
context/project-overview.md
context/architecture-context.md
context/ui-context.md
context/code-standards.md
context/ai-workflow-rules.md
context/progress-tracker.md
Then inspect the existing implementation related to:
Events listing page
mock-database/events.ts
mock-database/fights.ts
mock-database/fighters.ts
Existing Fighter Profile page
Existing reusable FightMatchupCard component created during Fighter Profile work
Existing navbar/footer/layout
Existing not-found handling
Existing date formatting utilities/components if any
Do not assume filenames or component names.
Use the existing project structure and reuse existing components whenever appropriate.

2. Data Architecture
The existing data architecture must remain the source of truth.
Use:
mock-database/events.ts for event metadata
mock-database/fights.ts for fights
mock-database/fighters.ts for fighter information
Do NOT create:
event-specific fight-card data
duplicate fighter data
duplicate event data
a new fights data structure
a new API
database models
Prisma queries
The fight card must be derived from:
fight.eventId
and the event must be resolved from the existing event data.
Fighters must be resolved from their IDs in fights.ts.

3. Dynamic Route
Create:
/events/[event-slug]
Use the existing event identifier/slug convention from events.ts.
Do not invent a second slug system if the existing event data already provides a suitable identifier.
For an invalid event slug:
use the project's existing not-found pattern
use Next.js notFound() if that is the existing project convention
The page should be a Server Component by default.
Do not add "use client" unless genuinely required.

4. Event Detail Page Structure
The page should have these major sections:
Event Hero
Event Information
Full Fight Card
The overall page should feel like a premium professional MMA organization event page.

5. Event Hero
Create a strong cinematic event hero section.
It should clearly communicate:
Event name
Event date
Event status
Location/venue if available in the existing event data
The hero should visually establish the event as the main subject of the page.
Use the project's existing design language:
Premium
Aggressive
Modern
Cinematic
High contrast
Professional MMA aesthetic
Do not make it look like a generic dashboard.
Avoid excessive decorative elements.

6. Event Information
Below or integrated with the hero, display the relevant event metadata that actually exists in events.ts.
Examples may include:
Date
Location
Venue
Status
Event number/type if available
Only display fields that actually exist.
Do not invent new event properties just for the UI.
Format dates in a clean, human-readable way.

7. Full Fight Card
This is the core section.
Get all fights where:
fight.eventId === event.id
Do not hardcode the fights for an event.
Group them according to the existing cardPosition values:
Main Event
Co-Main Event
Main Card
Preliminary
Use the existing enum/type values from fights.ts.
The ordering should be deterministic.
The expected hierarchy is:
Main Event
Show the MAIN_EVENT fight prominently.
Co-Main Event
Show the CO_MAIN_EVENT fight prominently.
Main Card
Show all MAIN_CARD fights in deterministic order.
Preliminary
Show all PRELIMINARY fights in deterministic order.
Do not assume there is only one Main Card or Preliminary fight.

8. Fight Cards
Reuse the existing reusable FightMatchupCard component created during Fighter Profile work.
Do NOT create a second visually unrelated fight-card component if the existing component can support this page.
The same visual language should be shared between:
Upcoming fights
Recent fights
Full fight history
Event Detail fights
If the existing component already has variants, use the appropriate variant.
If a small extension is genuinely necessary for Event Detail, extend the existing component rather than duplicating it.

9. Fight Card Content
Each fight should resolve both fighters from fighters.ts.
The matchup should visually communicate:
Fighter 1
Photo
Name
Nickname if available
Record
Relevant metadata where appropriate
VS
Fighter 2
Photo
Name
Nickname if available
Record
Relevant metadata where appropriate
Use the existing fighter image/fallback behavior.
Remember:
Many current fighter imageUrl values are empty strings.
An empty image URL must never produce a broken image.
Use the same polished fallback approach already established on Fighter Profile.

10. Completed Fights
For completed fights, display the relevant result information from fight.result.
This may include:
Winner / loser indication
Method
Round
Time
Draw
No Contest
Respect the existing data model.
Important:
DRAW and NO_CONTEST are outcomes, not methods.
Do not display a fake winner for a draw or no contest.
For normal wins:
winnerId identifies the winner
loserId identifies the loser
Make the result visually obvious without overwhelming the matchup itself.

11. Upcoming Fights
Upcoming fights must remain visually distinguishable from completed fights.
For upcoming fights:
clearly show that the fight is upcoming
show the event matchup
show the date/time information only if that information actually exists in the current data
do not render fake result/method/round/time information
Use the existing status field.
Do not infer upcoming/completed status from arbitrary UI assumptions when fight.status already exists.

12. Main Event Presentation
The Main Event should have stronger visual hierarchy than ordinary fights.
Possible treatment:
larger card
stronger border/accent
larger fighter imagery
more prominent VS
stronger section heading
subtle cinematic background treatment
Keep it consistent with the project's design system.
Do not turn it into an enormous distracting hero that dominates the entire page.
The Co-Main Event should also have stronger hierarchy than ordinary Main Card/Preliminary fights, but slightly less emphasis than the Main Event.

13. Main Card and Preliminary
Main Card and Preliminary fights should use the same reusable matchup design, but can use a more compact variant if the existing component supports variants.
Maintain:
consistent spacing
consistent fighter alignment
consistent typography
clear separation between fights
Do not create four completely different card designs.
The hierarchy should come from scale, spacing, labels, and subtle variants.

14. Responsive Design
The Event Detail page must be fully responsive.
Desktop:
strong two-sided fighter matchup layout
clear VS center
spacious professional composition
Tablet:
reduce spacing and image sizes appropriately
Mobile:
matchup must remain readable
no horizontal scrolling
fighter information must not become cramped
VS must remain visually clear
cards may stack/reflow if necessary
Do not simply shrink the desktop layout.
Design the mobile composition intentionally.

15. Dark / Light Theme
The page must support the existing global dark/light theme.
Do not introduce a separate theme.
Use the existing semantic design tokens.
Do not introduce arbitrary hardcoded hex colors inside components when an existing token can be used.
The page should look good in both:
Dark mode
Light mode
Dark mode remains the default.

16. Typography and Visual Language
Follow context/ui-context.md.
Use:
Barlow Condensed for display/headline typography
Inter for body/UI text
Visual direction:
Premium
Aggressive
Modern
Cinematic
Strong grid
Generous whitespace
High contrast
Controlled red accent
Professional sports organization feel
Use motion only when it improves the experience.
Avoid:
excessive animations
particles
heavy parallax
unnecessary gradients
gimmicky effects
excessive shadows
generic dashboard styling

17. Navigation / Existing Layout
Use the existing global:
Navbar
Footer
Theme system
Do not rebuild them.
The Event Detail page should feel like a natural part of the existing website.
If the Events page already provides links to event details, make sure those links resolve correctly to:
/events/[event-slug]
Do not change unrelated navigation behavior.

18. SEO / Metadata
If the project already uses route-level metadata conventions, add appropriate dynamic metadata for the event page.
The title should be based on the actual event.
Example concept:
MMA 40 | Organization Name
But use the project's actual organization naming convention.
Do not introduce a new metadata architecture.

19. Empty / Edge Cases
Handle these cases safely:
Event exists but has no fights
Do not crash.
Show an appropriate empty state for the fight card.
Event has no Main Event
Do not render an empty Main Event section.
Event has no Co-Main Event
Do not render an empty Co-Main Event section.
Event has no Main Card fights
Do not render an empty Main Card section.
Event has no Preliminary fights
Do not render an empty Preliminary section.
Invalid event slug
Use the project's not-found behavior.
Never render broken or undefined UI.

20. Important Constraints
Do NOT:
modify fights.ts just to make the UI easier
modify fighters.ts just to make the UI easier
create duplicate fight data
create duplicate event data
create an API route
add Prisma
add PostgreSQL
add authentication
add new dependencies unless absolutely necessary
rebuild existing Navbar/Footer
rebuild Fighter Profile fight cards from scratch
introduce unnecessary abstractions
This is an Event Detail UI/integration task using the existing data layer.

21. Code Quality
Follow context/code-standards.md.
Requirements:
strict TypeScript
no any
small single-purpose components
readable code
reusable components
semantic HTML
accessible markup
proper image alt text
keyboard accessibility where interactive elements exist
no dead code
no debug logs
no unnecessary comments
no lint/TypeScript suppression unless genuinely justified
Keep data transformation logic out of presentational components when possible.

22. Verification
After implementation, run:
npx tsc --noEmit
npm run lint
npm run build
Fix the root cause of any errors.
Also manually verify:
An existing event detail URL works.
An invalid event slug triggers the correct not-found behavior.
Event metadata is correct.
Main Event appears correctly.
Co-Main Event appears correctly.
Main Card fights appear correctly.
Preliminary fights appear correctly.
Completed fights show correct results.
Upcoming fights are visually distinct.
Fighter names/images resolve correctly.
Empty fighter images do not break the UI.
Dark mode works.
Light mode works.
Mobile layout works.
No horizontal scrolling exists.
Existing Event listing links correctly to the detail page.
Existing Fighter Profile behavior remains intact.

23. Progress Tracker
After the feature is actually implemented and verified, update:
context/progress-tracker.md
Record:
Event Detail page completed
route implemented
event/fight data integration
reusable FightMatchupCard reused/extended if applicable
verification results
any important implementation decision
next logical feature
Do not claim completion before verification passes.

24. Implementation Rule
Work incrementally.
Do not immediately rewrite large parts of the project.
First inspect the existing implementation and identify what can be reused.
Then implement the smallest clean solution.
If an existing component already solves a problem, reuse it.
Only create a new component when the existing architecture does not provide an appropriate reusable unit.
At the end, summarize:
files created
files modified
important implementation decisions
verification results
any remaining issues
Then stop.