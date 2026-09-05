<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

<!-- END:nextjs-agent-rules -->

## Application Building Context

Read the following files in order before implementing code or making any architectural decision:

1. `context/project-overview.md` — product definition, goals, features, scope, and page structure
2. `context/architecture-context.md` — system architecture, Next.js structure, backend boundaries, database, Prisma, storage model, and technical invariants
3. `context/ui-context.md` — visual identity, theme, colors, typography, layouts, responsive behavior, and component conventions
4. `context/code-standards.md` — implementation rules, coding conventions, naming, and TypeScript standards
5. `context/ai-workflow-rules.md` — AI development workflow, scoping rules, research requirements, and delivery approach
6. `context/progress-tracker.md` — current phase, completed work, open questions, and next steps

Before implementing a feature, understand the relevant context files and follow their rules.

Update `context/progress-tracker.md` after each meaningful implementation change.

If an implementation changes the architecture, product scope, UI system, or coding standards documented in the context files, update the relevant context file before continuing.

Do not introduce new technologies, libraries, architectural patterns, or project-wide conventions without checking the existing context and considering whether the change is necessary.
