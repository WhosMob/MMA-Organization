# Code Standards

## General

- Keep modules small and single-purpose.
- Fix root causes instead of layering workarounds.
- Do not mix unrelated concerns in one component, route, or module.
- Respect the system boundaries defined in architecture-context.md.
- Prefer simple solutions over unnecessary abstractions.
- Do not introduce a new dependency or architectural pattern unless it solves a real project requirement.
- Keep business logic separate from UI composition whenever practical.
- Avoid duplicating domain logic across multiple pages or components.

## TypeScript

- Strict mode is required throughout the project.
- Avoid any.
- Prefer explicit types and interfaces for object contracts.
- Use narrow types when the possible values are known.
- Do not use type assertions to hide type errors unless the assertion is genuinely justified.
- Validate unknown external input before trusting it.
- Use proper nullable types when a value may legitimately be absent.
- Keep domain types consistent with the Prisma data model.
- Prefer readable types over overly complex generic abstractions.

## Next.js

- Default to React Server Components.
- Add "use client" only when a component requires:
  - Browser APIs
  - React hooks
  - Client-side state
  - Event handlers
  - Client-side interactivity
- Keep Client Components as small and isolated as practical.
- Do not make an entire page a Client Component when only a small part requires interactivity.
- Prefer server-side data fetching for database-backed pages.
- Prisma must only be used from server-side code.
- Do not access the database directly from Client Components.
- Use dynamic routes for entity detail pages where appropriate:
  - /fighters/[fighter-slug]
  - /events/[event-slug]
  - /news/[news-slug]
- Use Route Handlers only when an actual HTTP API boundary is required.
- Do not create API routes simply to fetch data between Server Components and the database.
- Keep route handlers focused on a single responsibility.
- Keep database and domain logic outside route handlers when it becomes non-trivial.

## Data and Prisma

- PostgreSQL is the source of truth for persistent application data.
- Prisma is the application's database access layer.
- Prisma access must remain on the server.
- Use relational fields and foreign keys for relationships between domain entities.
- Do not duplicate relational data as arbitrary strings when a proper relation exists.
- Keep database queries focused and explicit.
- Select only the data required by the consuming component when practical.
- Do not expose unnecessary database fields to the client.
- Do not store derived values when they can be reliably calculated from existing data.
- Fighter age must be calculated from the date of birth rather than stored as a separate field.
- Current ranking data is stored without ranking history.
- Weight classes should use the canonical WeightClass entity.
- Fight ordering must be deterministic.
- Current champions must be uniquely identifiable for each division.

## Validation

- Validate external or untrusted input at the system boundary.
- Do not assume URL parameters, search parameters, form values, or request bodies are valid.
- Validate dynamic route parameters before using them in database queries.
- Validate Route Handler request bodies before processing them.
- Handle missing or invalid records explicitly.
- Do not rely on client-side validation alone when server-side validation is required.

## Styling

- Use the design tokens defined in globals.css.
- Do not use hardcoded hex values inside components.
- Do not use arbitrary Tailwind color values when an appropriate project token exists.
- Avoid raw Tailwind color classes such as bg-zinc-*, text-gray-*, or similar palette values when a project token should be used instead.


- Reference semantic project tokens through their Tailwind utility names.
- Keep colors, borders, surfaces, and text styles consistent with ui-context.md.
- Follow the established border-radius scale.
- Avoid introducing arbitrary radius values without a clear design reason.
- Use responsive Tailwind utilities rather than writing unnecessary custom media queries.
- Keep component styling close to the component when appropriate, while global design tokens belong in globals.css.

## Components

- Components should have a clear and focused responsibility.
- components/ is primarily for UI composition and reusable interface elements.
- Do not place database queries directly inside reusable presentational components.
- Do not place unrelated business logic inside UI components.
- Reusable components should receive the data they need through props or appropriate server-side composition.
- Prefer composition over deeply nested conditional components.
- Avoid creating components that are only abstractions around a few lines of markup unless reuse or clarity justifies them.

### Client Components

Client Components should be used only when client-side behavior is necessary.

Typical examples include:

- Mobile navigation
- Theme toggle
- Carousels
- Interactive filters
- Search interactions requiring client-side state
- Swipe interactions
- UI controls requiring browser events

Client Components must not access Prisma or PostgreSQL directly.

## API Routes

- Route Handlers should only be created when an HTTP endpoint is actually required.
- Validate and parse request input before executing application logic.
- Keep Route Handlers thin.
- Move non-trivial business logic into shared server-side modules.
- Return predictable response structures.
- Handle expected errors explicitly.
- Do not expose internal database errors directly to clients.
- Do not create duplicate API endpoints for data that can be fetched directly by Server Components.

## Error Handling

- Handle expected errors at the appropriate boundary.
- Do not silently ignore errors.
- Do not use empty catch blocks unless there is a documented reason.
- Provide meaningful error states for user-facing pages.
- Use Next.js error and not-found conventions where appropriate.
- Do not expose sensitive implementation details or raw database errors to users.

## File Organization

Use responsibility-based file organization.

`text
app/
├── api/
│   └── ...
├── fighters/
├── events/
├── news/
├── rankings/
├── about/
└── contact/

components/
├── ui/
├── layout/
├── fighters/
├── events/
├── news/
├── rankings/
└── ...

lib/
├── prisma/
├── ...
    
prisma/
├── schema.prisma
└── migrations/

context/
├── AGENTS.md
├── ai-workflow-rules.md
├── architecture-context.md
├── code-standards.md
├── progress-tracker.md
├── project-overview.md
└── ui-context.md

app/ — routes, pages, layouts, and route-specific composition.
components/ — reusable UI components.
components/ui/ — shadcn/ui and reusable primitive UI components.
lib/ — shared server-side infrastructure, Prisma access, utilities, and reusable application logic.
prisma/ — Prisma schema, migrations, and database-related configuration.
public/ — static assets included in the application.
context/ — project documentation and AI development rules.
Name files according to the responsibility they contain rather than the technology used to implement them.
Naming
Use PascalCase for React component names.
Use camelCase for variables, functions, and object properties.
Use kebab-case for route slugs.
Use descriptive names that communicate responsibility.
Avoid generic names such as data, helper, utils2, or thing when a more specific name is possible.
Use consistent naming for domain concepts across the application.
Database Queries
Keep Prisma queries close to the server-side logic responsible for the data.
Avoid fetching large amounts of unrelated data.
Prefer explicit select or include configurations when they improve clarity or performance.
Avoid unnecessary database requests.
Do not duplicate the same complex query logic across multiple pages.
Shared or repeated query logic should be extracted into an appropriate server-side module.
Images
Use external image URLs as defined by the data model.
Do not introduce image upload or storage infrastructure unless the project requires it.
Use Next.js image optimization appropriately.
Configure external image domains through the current Next.js configuration when required.
Preserve image aspect ratios and avoid layout shifts where practical.
Accessibility
Use semantic HTML elements.
Interactive elements must be keyboard accessible.
Images should have meaningful alt text when they convey information.
Decorative images should use appropriate empty alt text.
Do not rely on color alone to communicate important information.
Maintain sufficient text and interactive-element contrast.
Focus states must remain visible.
Carousels and mobile navigation must remain usable with keyboard and assistive technologies where applicable.
Responsive Design
Build mobile, tablet, desktop, and large-desktop layouts intentionally.
Do not treat mobile as simply a smaller desktop layout.
Avoid horizontal overflow.
Ensure ranking lists, fight cards, event cards, and fighter cards remain usable on small screens.
Interactive carousels must support appropriate touch interaction on mobile.
Dependencies
Prefer existing project dependencies when they are sufficient.
Do not add a package for functionality that can be implemented clearly with existing tools.
Before adding a dependency, verify that it provides meaningful value over the existing stack.
Keep third-party dependencies limited and purposeful.
Use shadcn/ui components where appropriate rather than introducing another UI library for the same purpose.
Use Lucide React for interface icons.
Code Quality
Prefer readable code over clever code.
Avoid premature abstraction.
Avoid unnecessary wrapper components and utility functions.
Keep functions reasonably small.
Keep data transformations close to the layer where they are needed.
Remove dead code and unused imports.
Do not leave debugging statements in production code.
Do not suppress TypeScript or ESLint errors without a justified reason.
Follow the existing project conventions before introducing a new pattern.
Architecture Changes
Do not make architectural changes implicitly.
If an implementation changes database structure, rendering strategy, server/client boundaries, project-wide conventions, or another architectural decision documented in the context files, update the relevant context file.
New infrastructure, libraries, or external services require a demonstrated project requirement.
Keep the architecture as simple as possible while supporting the current project scope.