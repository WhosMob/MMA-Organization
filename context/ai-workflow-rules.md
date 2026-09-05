# AI Development Workflow

## Approach

Build this project incrementally using a spec-driven workflow.

The context files define:

- What the product should contain.
- How the application should be built.
- Which architectural decisions have been made.
- What coding conventions should be followed.
- What has already been implemented.
- What remains to be done.

Always implement against these specifications.

Do not infer or invent product behavior when the required behavior is not defined.

Before implementing a feature, read the relevant context files and understand the existing architecture and scope.

## Implementation Workflow

For each feature or subsystem:

1. Read the relevant context files.
2. Understand the existing implementation.
3. Define the smallest reasonable implementation unit.
4. Implement the feature.
5. Verify the implementation.
6. Fix root causes rather than adding workarounds.
7. Update progress-tracker.md.
8. Update other context files if the implementation changes a documented decision.

Do not move to a new feature while the current implementation is knowingly broken or incomplete within its defined scope.

## Scoping Rules

- Work on one feature unit or subsystem at a time.
- Prefer small, verifiable increments over large speculative changes.
- Do not combine unrelated concerns in a single implementation step.
- Avoid implementing future features before they are required.
- Do not introduce infrastructure solely because it may be useful later.
- Keep each implementation step understandable and independently verifiable.

Examples of reasonable feature units:

- Global Navbar
- Global Footer
- Fighter directory
- Fighter profile
- Rankings
- Event listing
- Event detail page
- News listing
- News article
- Database schema for a specific domain
- Search or filtering behavior
- A specific carousel

## When To Split Work

Split an implementation step if it combines:

- Multiple unrelated pages.
- Multiple unrelated database domains.
- UI work and unrelated backend work.
- Multiple unrelated Route Handlers.
- Database schema changes and unrelated UI changes.
- Several independent interactive systems.
- Behavior that is not clearly defined in the context files.

If a change cannot be reasonably verified within its defined scope, consider splitting it into smaller implementation units.

## Handling Missing Requirements

- Do not invent product behavior that is not defined in the context files.
- If a requirement is ambiguous, identify the ambiguity before implementation.
- Resolve important ambiguities in the relevant context file before writing code.
- If a requirement is missing but necessary to continue, add it as an open question in progress-tracker.md.
- Do not silently make project-wide decisions that belong in the context files.
- If a reasonable implementation choice does not affect product behavior or architecture, use the simplest consistent solution.

## Research and Current Documentation

When working with technologies whose APIs or conventions may have changed, verify the current documentation before implementation.

This is especially important for:

- Next.js
- Prisma
- Next.js APIs
- Tailwind CSS
- shadcn/ui
- Other dependencies with potentially changing APIs

For Next.js-specific implementation, follow the Next.js version and documentation available in the current project rather than relying on assumptions from older versions.

Do not replace project decisions with external examples unless the examples are compatible with the current architecture and context files.

## Existing Code First

Before creating new code:

- Inspect the relevant existing files.
- Reuse existing components and utilities when appropriate.
- Follow established project conventions.
- Avoid creating duplicate components or utilities.
- Do not rewrite working code without a clear reason.
- Do not introduce a new pattern when an existing project pattern already solves the problem.

## Protected Foundation Components

Do not modify generated third-party foundation components unless explicitly instructed.

This includes:

- components/ui/* shadcn/ui components.
- Third-party library internals.

These components should remain reusable and close to their generated/default implementation.

Project-specific styling, layout, behavior, and feature logic should normally be implemented in application-level components.

Only modify foundation components when:

- The task explicitly requires it.
- The modification is necessary for the project's design system.
- The change does not unnecessarily break their reusable nature.

## Server and Client Boundaries

Respect the Server Component and Client Component boundaries defined in architecture-context.md.

Before adding "use client":

1. Determine whether browser-side interactivity is actually required.
2. Check whether the interactive behavior can be isolated into a smaller Client Component.
3. Keep database access on the server.

Do not convert an entire page to a Client Component simply because one section requires interactivity.

## Database and Prisma Workflow

When modifying the database:

1. Read the relevant architecture and data-model requirements.
2. Inspect the current Prisma schema.
3. Make the smallest necessary schema change.
4. Run the appropriate Prisma validation/migration workflow.
5. Verify affected queries and pages.
6. Update architecture-context.md if the domain model or architectural decision changes.
7. Update progress-tracker.md.

Do not change the database schema merely to simplify a UI implementation if the change conflicts with the established domain model.

## UI and Design Workflow

When implementing UI:

- Follow ui-context.md.
- Reuse existing components where appropriate.
- Use established design tokens.
- Maintain the project's typography, spacing, color, radius, and motion conventions.
- Implement responsive behavior as part of the feature rather than as an afterthought.
- Keep interactive behavior isolated when practical.
- Do not introduce new visual patterns without a clear reason.

A UI implementation is not complete if it only works on desktop when the feature is expected to be responsive.

## Verification

Each implementation unit should be verified within its defined scope.

Verification may include:

- TypeScript checks.
- ESLint checks.
- Build checks.
- Running the development server.
- Testing the affected route.
- Testing relevant interactions.
- Testing responsive behavior.
- Verifying database queries and relationships.
- Checking error and empty states where applicable.

Use the smallest verification set that provides meaningful confidence for the change.

Do not claim a feature is complete without verifying the relevant behavior.

## Error Handling

When an error occurs:

1. Identify the actual root cause.
2. Inspect the relevant code and configuration.
3. Fix the underlying issue.
4. Re-run the appropriate verification.

Do not:

- Hide errors with unnecessary conditionals.
- Disable TypeScript or ESLint rules to make an error disappear.
- Add arbitrary fallbacks without understanding the failure.
- Introduce dependencies as a workaround for a problem that can be solved within the existing architecture.

## Keeping Documentation In Sync

Update the relevant context file whenever implementation changes:

- System architecture or boundaries.
- Database structure or data-model decisions.
- Storage decisions.
- Code conventions.
- UI/design-system decisions.
- Product features or scope.
- Page structure.
- Development workflow.

progress-tracker.md must always reflect the actual implementation state.

Do not mark planned work as completed.

Do not leave completed work marked as pending.

## Progress Tracking

After every meaningful implementation change:

1. Update the relevant progress entry.
2. Record what was actually implemented.
3. Record any remaining work.
4. Record important decisions made during implementation.
5. Record open questions that prevent future implementation.

Keep progress entries concise and factual.

## Before Moving To The Next Unit

Before starting the next implementation unit:
1. The current unit works within its defined scope.
2. Relevant TypeScript and lint checks pass when applicable.
3. No architecture invariant has been violated.
4. The implementation follows the current context files.
5. No unnecessary dependency or infrastructure was introduced.
6. progress-tracker.md reflects the actual state.
7. Any architectural, product, or UI decisions made during implementation have been documented in the appropriate context file.

Only then move to the next implementation unit.