read the /AGENTS.md before starting.

# Task: Build the Contact Page

Build the `/contact` page for the MMA Organization website.

Before making any changes, read the project context files in the exact order defined by `context/AGENTS.md`:

1. `context/project-overview.md`
2. `context/architecture-context.md`
3. `context/ui-context.md`
4. `context/code-standards.md`
5. `context/ai-workflow-rules.md`
6. `context/progress-tracker.md`

Also inspect the existing implementation of:

- Navbar
- Footer
- Theme system
- About page
- Homepage
- Fighters page
- Events page
- Rankings page
- News page

The goal is to make the Contact page feel like a natural part of the existing website, not a separate design.

---

# Important Project Rules

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
- `next-themes`
- Simple Icons for social-media brand icons
- Mock data only at this stage
- Do NOT introduce Prisma or PostgreSQL.
- Do NOT add a backend.
- Do NOT add authentication.
- Do NOT add unnecessary dependencies.
- Use Server Components by default.
- Use Client Components only when genuinely required.
- Reuse existing components and patterns whenever appropriate.
- Do not modify completed pages unless absolutely necessary for shared functionality.
- Do not change the existing theme system.
- The page must work correctly in both dark and light themes.
- Do not hardcode arbitrary colors in components.
- Use the project's existing semantic design tokens.
- Keep the page fully responsive.

---

# Final Contact Page Structure

The page must have exactly these major sections:

```text
/contact

├── Hero
│
├── Get in Touch
│   ├── Email
│   ├── Phone
│   └── Telegram
│
├── FAQ
│   └── 4–5 Questions
│
├── Follow Us
│   ├── Instagram
│   ├── YouTube
│   ├── X
│   └── Telegram
│
└── Footer
Do not add additional major sections.

1. Hero
Create a short, cinematic Contact page hero.
Heading:
Contact the Organization
Add a concise supporting paragraph explaining that visitors can contact the organization for general inquiries, partnerships, media-related questions, or other relevant matters.
Requirements:
Keep the Hero shorter than a homepage Hero.
Maintain the existing cinematic visual language.
Use an appropriate MMA-related visual if the existing page conventions support it.
Use the existing typography system.
Keep the section visually consistent with the About page.
Work correctly in both dark and light themes.
Do not invent a physical address or office location.
Avoid excessive text.

2. Get in Touch
This is the primary section of the Contact page.
Create three contact cards/items:
Email
Use a Lucide Mail icon.
Display the organization's existing email address if one is already defined in the project.
The email should be a real mailto: link.
Phone
Use a Lucide Phone icon.
Display the organization's existing phone number if one is already defined in the project.
The phone number should be a clickable tel: link.
Telegram
Use the Telegram brand icon from Simple Icons.
Display the organization's existing Telegram handle/link if already defined in the project.
The Telegram item should link to the appropriate Telegram URL.

Contact Data Rules
Before writing contact information:
Inspect the existing project for already-defined organization contact details.
Reuse existing values if they exist.
Do NOT invent realistic-looking personal contact information if the project does not already define it.
If placeholder/mock contact information is already intentionally used by the project, follow that existing convention.
Do not create a separate mock database file for contact information unless the existing architecture already requires it.
For this page, simple static contact content is acceptable.
3. FAQ
Create a simple FAQ section using the existing shadcn/ui Accordion component.
Use approximately 4–5 concise, useful questions.
The FAQ should be specifically relevant to contacting and interacting with the organization.
Good topics include:
How can I contact the organization?
How can I find information about upcoming events?
Where can I find rankings and fight results?
How can I contact the organization about media or partnership inquiries?
Where can I follow the latest organization updates?
Do NOT create generic MMA educational questions such as:
What is MMA?
What is a knockout?
What are the rules of MMA?
The FAQ is for helping visitors navigate/contact the organization.

FAQ Data
Keep the FAQ content as a simple local array directly inside the FAQ component.
Example structure:
const faqs = [
  {
    question: "...",
    answer: "...",
  },
  {
    question: "...",
    answer: "...",
  },
];
Important:
Do NOT create mock-database/faq.ts.
Do NOT create a database model.
Do NOT fetch FAQ data.
Do NOT create an API endpoint.
This is intentionally static content.
Keep the array simple and readable.

4. Follow Us
Create a small social-media section after the FAQ.
This should be a compact CTA, NOT a second Footer.
Suggested direction:
Heading:
Follow Us
Supporting text:
Stay connected with the latest events, fighters, rankings and news.
Display:
Instagram
YouTube
X
Telegram

Social Icon Rules
Use proper brand icons.
Do NOT use Lucide icons for:
Instagram
YouTube
X
Telegram
Use simple-icons.
Before adding anything:
Inspect package.json.
Check whether the Simple Icons dependency used by the About page is already installed.
Reuse the existing dependency.
Do NOT install another icon library.
Do NOT install Simple Icons again if it is already available.
Do NOT manually create SVG icons.
Follow the same implementation approach already used successfully in the About page's Follow the Organization section.
The goal is consistency between About and Contact.

Social Links
Inspect the existing project for the organization's social URLs.
Reuse existing URLs.
Do NOT invent new social URLs if the project already defines them elsewhere.
If social links are currently centralized in an existing configuration/component, reuse that source where appropriate.
Do not unnecessarily duplicate configuration.
Social links must:
Be accessible.
Have meaningful aria-labels.
Be keyboard accessible.
Have appropriate hover/focus states.
Work correctly in both themes.
Open external links safely when appropriate.
Be responsive and easy to tap on mobile.

5. Footer
Reuse the existing Footer component.
Do NOT create a new Footer.
Do NOT redesign the Footer.
Do NOT modify its structure.
The Contact page should use exactly the same site-wide Footer used by the other pages.

Design Requirements
The page should feel:
Premium
Aggressive
Modern
Cinematic
Professional
Spacious
High contrast
Consistent with the existing site
Use:
Existing spacing system
Existing typography
Existing semantic color tokens
Existing border/radius conventions
Existing motion conventions
Existing responsive patterns
Avoid:
Generic corporate Contact page design
Excessive rounded cards
Excessive gradients
Excessive animations
Huge walls of text
Fake office information
Fake addresses
Maps
Contact forms
Newsletter forms
Support ticket systems
Team sections
Working hours
Additional FAQ pages
Large unnecessary CTAs

Responsive Behavior
Desktop:
Strong visual hierarchy.
Contact options displayed in a clean horizontal layout where appropriate.
Generous whitespace.
FAQ remains readable and compact.
Tablet:
Adapt spacing and layout naturally.
Mobile:
Contact options stack cleanly.
FAQ remains easy to scan and interact with.
Social icons are comfortably tappable.
No horizontal overflow.
Typography remains readable.
Preserve the existing site's mobile conventions.
Architecture
The Contact page should remain a Server Component unless a specific interactive feature requires client-side behavior.
The FAQ Accordion may require the existing shadcn client component internally. Do not make the entire Contact page a Client Component just because the Accordion is interactive.
Do not fetch data through an API.
Do not introduce a database.
Do not create unnecessary abstractions.

SEO / Metadata
Add appropriate metadata for /contact.
Use the project's existing metadata conventions.
Create:
A clear page title.
A concise description.
Do not introduce a new metadata architecture.

Code Quality
Before finishing:
Run TypeScript checks.
Run lint.
Run the production build.
Fix any errors caused by your changes.
Do not rewrite unrelated code.
Inspect the final diff.
Remove unnecessary changes.

Progress Tracker
Only after the Contact page is fully implemented and verified, update:
context/progress-tracker.md
Record:
Contact page implemented.
Hero completed.
Get in Touch completed.
FAQ implemented with a local static array.
Follow Us social section completed.
Simple Icons reused for social-media brands.
Existing Footer reused.
TypeScript/lint/build status.
Do not modify the progress tracker before the implementation is actually complete.

Final Requirement
The /contact page must be fully implemented, responsive, theme-aware, accessible, and visually consistent with the existing MMA Organization website.
Do not modify completed pages or unrelated architecture.
Keep the implementation simple.
Do not add features that are not explicitly requested above.