read the /AGENTS.md before starting.

Build the Events Listing Page
Implement the Events Listing Page at:
/events
This is the next feature unit of the project.
The project already has:
Next.js 16
TypeScript
Tailwind CSS
shadcn/ui
Lucide React
dark/light theme
Navbar
Footer
mock-database/events.ts
mock-database/fights.ts
Fighter Profile
Event Detail at /events/[event-slug]
reusable FightMatchupCard
Do NOT redesign or rebuild existing features.

1. Read Context First
Before changing code, read these files in this exact order:
context/project-overview.md
context/architecture-context.md
context/ui-context.md
context/code-standards.md
context/ai-workflow-rules.md
context/progress-tracker.md
AGENTS.md
Then inspect the existing implementation relevant to this feature, especially:
mock-database/events.ts
mock-database/fights.ts
existing /events/[event-slug]
existing Event Detail components
existing Navbar
existing Footer
existing global layout/theme
existing shadcn components
any existing card/carousel/timeline components
Do not assume the structure of these files. Inspect them first.

2. Goal
Build the public Events Listing Page:
/events
The page should allow users to:
discover the organization's events
distinguish Upcoming and Completed events
search events
filter events
browse featured events
navigate to Event Detail pages
The page must feel like part of the same Premium + Aggressive + Modern MMA website.

3. Page Structure
Use this general structure:
Events Page
│
├── Page Header
│   ├── Eyebrow / small label
│   ├── "Events"
│   └── Short supporting description
│
├── Search + Filters
│   ├── Search input
│   └── Status filter
│       ├── All
│       ├── Upcoming
│       └── Completed
│
├── Featured Events
│   └── Timeline-based event navigation
│       ├── previous event
│       ├── active/current event
│       └── next event
│
└── All Events
    └── Responsive event card grid
Adapt this structure to the existing design system rather than blindly copying it.

4. Search
Implement event search.
Search should match useful event information such as:
event name
event location
Search must be:
responsive
accessible
visually consistent with the rest of the application
Use an appropriate shadcn input if one already exists.
Do not introduce a new dependency for search.

5. Status Filter
Add a status filter with exactly:
All
Upcoming
Completed
Use the existing shadcn Select or another existing project pattern.
Do not use the browser's native <select> if the project already uses the shadcn Select pattern.
Filtering should work together with search.
For example:
Search = "MMA"
Status = Upcoming
should return only upcoming events matching the search.

6. Event Status
Determine event status from the existing event data.
Inspect mock-database/events.ts and follow the existing data model.
Do not invent a new event status field if one already exists.
If status is derived from the event date, follow the project's existing convention rather than creating a second source of truth.
Do not modify the event data model unless absolutely necessary.

7. Featured Events
Implement the Featured Events section according to the existing project specification:
timeline-based navigation
no autoplay
keyboard accessible
swipe-friendly on mobile
clear active/current event
previous/next navigation
responsive
This should NOT behave like the homepage's autoplay news carousel.
The interaction should feel like browsing through an event timeline.
Each featured event should provide a clear path to:
/events/[event-slug]
Use the existing event slug/id structure.

8. Featured Event Content
Inspect the existing events.ts structure and display the appropriate available information.
Depending on the existing data model, this can include:
event name
date
location
event status
event image
main event information if available
number of fights if it can be derived cleanly from fights.ts
Do not duplicate fight data inside events.ts.
If main-event information is needed, derive it from:
fights.ts
using:
eventId
cardPosition === "MAIN_EVENT"
Resolve fighter information from:
fighters.ts
Do not create another source of truth.

9. All Events Grid
Below Featured Events, create the complete Events list.
Use a responsive grid.
Suggested behavior:
mobile: 1 column
tablet: 2 columns
desktop: 3 columns
Follow the existing project's responsive conventions if they differ.
Each Event Card should include the most useful available information, such as:
event image
event name
date
location
status
main event / featured matchup when available
Do not overload the card.
The card should visually prioritize:
event identity
date
location
status

10. Event Card
Create a reusable Event Card component if one does not already exist.
The component should be responsible for presentation only.
It should NOT:
query Prisma
access PostgreSQL
contain database logic
contain duplicated event data
contain unrelated page filtering logic
Use a clean data-driven API.
Each card should link to:
/events/[event-slug]
Use Next.js <Link>.
The whole card can be clickable if that fits the existing design language, but maintain accessibility and clear focus states.

11. Empty States
Handle these cases properly:
No events
If there are no events:
Show a polished empty state instead of an empty page.
No search/filter results
If the current search/filter combination produces no results:
Show a clear message such as:
No events found
and explain that the search/filter can be changed.
Do not display a broken or empty grid.

12. Data Handling
For this feature, continue using the temporary mock database.
Use:
mock-database/events.ts
mock-database/fights.ts
mock-database/fighters.ts
as appropriate.
Do NOT introduce:
Prisma
PostgreSQL
Route Handlers
API endpoints
Server Actions
new backend architecture
This is still the UI/mock-data phase.
Keep the production architecture unchanged.
The intended future flow remains:
Next.js
   ↓
Server-side logic
   ↓
Prisma
   ↓
PostgreSQL
The current implementation may use the mock database until the project moves to the database phase.

13. Server / Client Components
Follow the existing architecture:
Server Components by default
Client Components only where browser interactivity is actually required
The Events page will likely need a small Client Component for:
search state
status filter state
timeline interaction if necessary
Do NOT make the entire page a Client Component just because some controls are interactive.
Keep interactive logic isolated.

14. Design Requirements
Follow context/ui-context.md exactly.
The visual direction is:
Premium + Aggressive + Modern
The page should feel:
cinematic
high contrast
professional
spacious
structured
modern
MMA-oriented without becoming visually noisy
Use:
existing semantic design tokens
existing typography
existing spacing conventions
existing card styles
existing borders/radii
existing motion patterns
Do NOT introduce arbitrary colors.
Do NOT use hardcoded hex values if a project token already exists.
Use Lucide icons where appropriate.
Avoid excessive animations.

15. Responsive Design
The page must work properly across:
mobile
tablet
desktop
large desktop
Pay particular attention to:
search/filter layout
featured event timeline
event cards
text wrapping
event images
navigation controls
The featured event timeline must remain usable on mobile with touch/swipe interaction.

16. Accessibility
Follow the project's accessibility standards.
Ensure:
semantic HTML
keyboard navigation
visible focus states
accessible buttons
meaningful labels
proper heading hierarchy
appropriate image alt text
no interaction that depends exclusively on hover
timeline navigation is keyboard accessible
If using a carousel-like interaction, make sure screen-reader users can understand the current event and navigation controls.
17. Performance
Do not add unnecessary client-side JavaScript.
Keep the page Server Component-first.
Do not introduce a carousel library just for this page if the existing project can implement the interaction without one.
Reuse existing components and dependencies where practical.

18. Metadata
Add appropriate page metadata for:
/events
Follow the project's existing metadata conventions.
Do not modify global metadata unnecessarily.

19. Error / Edge Cases
Handle:
invalid/missing event data
events with no fights
events with no main event
events with no image
no search results
no filtered results
empty event dataset
Do not fabricate missing information.
Use polished fallbacks where necessary.

20. Important Constraints
Do NOT:
redesign the Navbar
redesign the Footer
modify Fighter Profile
modify Event Detail unless a small compatibility fix is genuinely necessary
create duplicate fight-card components
duplicate event data
add Prisma
add PostgreSQL
add API routes
add authentication
add an admin panel
add unnecessary dependencies
add autoplay to the Events timeline
invent event information
hardcode event lists inside the page component
The existing mock-database/events.ts remains the source of truth.

21. Verification
After implementation, run:
npx tsc --noEmit
npm run lint
npm run build
Fix the root cause of any errors.
Also manually verify:
/events
search
status filter
search + status filter together
featured timeline
keyboard navigation
mobile layout
tablet layout
desktop layout
event card links
event detail navigation
empty states
light mode
dark mode
Do not consider the feature complete if TypeScript, lint, or build fails.

22. Progress Tracker
After the feature is complete, update:
context/progress-tracker.md
Record:
Events Listing Page completed
search implemented
status filter implemented
featured event timeline implemented
event grid implemented
Event Detail navigation implemented
verification results
any important implementation decisions
any known issues
Only record what was actually implemented and verified.

23. Final Report
When finished, report:
Files created
Files modified
What was implemented
How search/filter works
How featured timeline works
How Event Cards connect to Event Detail
Whether TypeScript passed
Whether lint passed
Whether build passed
Any remaining issues
Do not claim anything was verified unless you actually verified it.