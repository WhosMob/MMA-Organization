read the /AGENTS.md before starting.



# Task: Build the About Page

Build the /about page for the MMA Organization website.

Before making any changes, read the project context files in the exact order defined by context/AGENTS.md:

1. context/project-overview.md
2. context/architecture-context.md
3. context/ui-context.md
4. context/code-standards.md
5. context/ai-workflow-rules.md
6. context/progress-tracker.md

Also inspect the existing implementation of the Navbar, Footer, theme system, homepage sections, and other completed pages so the About page feels like the same product.

---

## Important Project Rules

- This is an independent MMA Organization website.
- Do NOT make it look like a UFC clone.
- Follow the existing visual identity:
  - Premium
  - Aggressive
  - Modern
  - Cinematic
- Next.js 16 + TypeScript
- Tailwind CSS v4
- shadcn/ui
- Lucide React
- next-themes
- Mock data only at this stage
- Do NOT introduce Prisma or PostgreSQL.
- Do NOT add a backend.
- Do NOT add new unnecessary dependencies.
- Use Server Components by default.
- Use Client Components only when genuinely required.
- Reuse existing components and patterns whenever appropriate.
- Do not modify completed pages unless absolutely necessary for shared functionality.
- Do not change the existing theme system.
- The page must work correctly in both dark and light themes.
- Do not hardcode arbitrary colors in components. Use the project's existing semantic design tokens.
- Keep the page fully responsive.

---

# About Page Structure

The final structure must be:

`text
/about

├── Hero
├── Who We Are
├── Our Philosophy
├── By the Numbers
├── Follow the Organization
└── Footer


---

1. Hero

Create a cinematic About page hero.

Requirements:

Use the organization name prominently.

Include a short, strong statement about the organization.

Use a high-quality MMA-related background image from an external image URL.

Apply a dark gradient/overlay so the typography remains readable.

Do NOT make the hero unnecessarily fullscreen.

Keep the section visually consistent with the homepage Hero.

Use the existing typography system.

The title should use the display font/style already established in the project.

Body text should use the existing body typography.

Make sure the hero works in both dark and light mode.


Do not invent a detailed founding story, founder, date, location, or other factual history that does not exist in the mock data/context.


---

2. Who We Are

This is the main informational section of the page.

Use a premium two-column layout on desktop and a stacked layout on mobile.

Suggested structure:

[ Large MMA Visual ]    [ Heading + Text ]

                        Who We Are

                        2–3 concise paragraphs
                        explaining the organization
                        and what it represents.

The content should explain things such as:

The organization is built around high-level MMA competition.

Fighters are the core of the organization.

Events bring the competition together.

Rankings and championships provide a competitive structure.

Matchmaking should feel meaningful and competitive.

The organization values high-level competition, respect, and integrity.


Keep the writing concise and professional.

Do NOT create fake history or specific claims such as:

Founded in a specific year

Founded by a specific person

Based in a specific city

Number of years operating

Specific real-world achievements


unless those facts already exist in the project context/mock data.

Use an appropriate MMA image from an external URL.


---

3. Our Philosophy

Create a visually strong section containing exactly three philosophy cards:

Competition

Explain the importance of meaningful competition, challenging matchups, and high-level performance.

Respect

Explain respect between fighters, opponents, the sport, and everyone involved.

Integrity 
Explain fairness, credibility, rankings, championships, and maintaining trust in the organization.

Requirements:

Exactly 3 cards.

Each card should have an appropriate Lucide icon.

Use the existing card design language.

Keep descriptions short.

Avoid generic corporate language.

Make the section feel connected to MMA.

Use subtle hover/motion effects only if they fit the existing project's motion style.

Respect reduced-motion preferences if animations are used.



---

4. By the Numbers

Create a compact, premium statistics section.

Show exactly these four statistics:

Divisions
Events
Fighters
Completed Fights

The numbers MUST be derived from the existing mock data.

Do NOT manually hardcode the current numbers.

Use the existing mock database as the source of truth.

Expected logic:

Divisions → derive from the organization's existing weight-class/division data or the appropriate existing source.

Events → count the existing events.

Fighters → count the existing fighters.

Completed Fights → count fights where status === "COMPLETED".


Do not create duplicate statistics data just for this page.

The section should remain correct automatically if the mock data changes.

Visual direction:

Large numbers

Small uppercase labels

Strong typography

Clean grid

Premium/cinematic presentation

Responsive

Works in dark and light mode


Do not add unnecessary charts or complicated animations.


---

5. Follow the Organization

Add a small social-media CTA section after By the Numbers and before the Footer.

This should NOT be a huge section.

Suggested content:

Heading:

Follow the Organization

Short supporting text:

Stay connected with the latest events, fighters, rankings and news.

Then display the organization's social media links.

Use the project's existing social platforms if they are already defined.

Potential platforms:

Instagram

YouTube

X

Telegram


IMPORTANT:

Do NOT use Lucide icons for social media brand icons.

Lucide should continue to be used for normal UI icons, but social media icons are brand icons.

Use a dedicated brand-icon package such as simple-icons / react-icons only if an appropriate package is already installed or if the project's dependency/context rules explicitly allow adding it.

Before installing anything, inspect package.json and existing dependencies.

Do NOT add a new dependency if an existing installed package can provide the icons.

If a brand-icon package is already available, use it.

If no suitable brand-icon package exists and adding one is justified, use the smallest appropriate package and update the project dependencies normally.

Do NOT use manually-created SVGs for these brand icons unless absolutely necessary.

Social links should:

Be accessible.

Have meaningful aria-labels.

Open external links safely.

Have subtle hover states.

Match the site's visual language.

Work in both themes.

Be keyboard accessible.


Do not duplicate a huge social-media section from the Footer.

This section should feel like a final CTA before the Footer.


---

6. Footer

Reuse the existing Footer component.

Do NOT create a second Footer.

Do NOT redesign the existing Footer.

The About page should use the same site-wide Footer as the other pages.


---

Design Requirements

The About page should feel:

Premium

Aggressive

Modern

Cinematic

Professional

Spacious

High contrast

MMA-specific


Avoid:

Generic corporate About-page design

Excessive rounded cards

Excessive gradients

Excessive animations

Huge walls of text

Fake company history

Stock-business imagery

Unnecessary sections

Testimonials

Sponsors

Team/Staff section

Founder story

FAQ

Timeline

Separate Mission/Vision sections

Large Contact section



---

Responsive Behavior

Desktop:

Strong two-column layouts where appropriate.

Generous whitespace.

Clear visual hierarchy.


Tablet:

Adapt grids and spacing naturally.


Mobile:

Stack content vertically where necessary.

Keep typography readable.

Preserve visual hierarchy.

Make social icons/buttons easy to tap.

Prevent horizontal overflow.

Ensure images maintain proper aspect ratios.


Test common viewport sizes mentally and through the existing project conventions.


---

Data / Architecture

The About page should remain a Server Component unless a specific interactive feature requires client-side JavaScript.

Do not fetch data through an API.

Read mock data directly on the server where appropriate.

Do not create a new database abstraction.

Do not create duplicate fighter/event/fight data.

Use existing mock-data files as the source of truth.

Keep data calculations simple and readable.


---

SEO / Metadata

Add appropriate metadata for the About page.

Use a clear page title and concise description consistent with the project's existing metadata conventions.

Do not introduce a new metadata architecture.


---

Code Quality

Before finishing:

Run TypeScript checks.

Run lint.

Run the production build.

Fix any errors caused by your changes.

Do not rewrite unrelated code.

Do not modify working components unnecessarily.


After implementation, inspect the final diff and remove unnecessary changes.


---

Progress Tracker

After the About page is successfully implemented and verified, update:

context/progress-tracker.md

Record:

About page implemented.

Sections completed.

By the Numbers uses derived mock-data statistics.

Follow the Organization social section added.

Any dependency added for brand icons, if applicable.

TypeScript/lint/build status.


Do not modify the progress tracker before the implementation is actually complete.


---

Final Requirement

Do not stop after creating only the visual structure.

The complete /about page should be implemented, responsive, theme-aware, data-driven where applicable, accessible, and consistent with the existing MMA Organization design system.

Do not modify completed pages or unrelated architecture.