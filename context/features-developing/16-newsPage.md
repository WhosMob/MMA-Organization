read the /AGENTS.md before starting.

# Build News Listing Page

Build the News Listing Page for the MMA organization website according to the existing project context, architecture, UI system, and coding standards.

Before making any changes, read the relevant context files, especially:

- project-overview.md
- architecture-context.md
- ui-context.md
- code-standards.md
- ai-workflow-rules.md
- progress-tracker.md

Also inspect the existing project structure and reusable components before creating anything new.

---

# 1. Page Structure

The News page should have this structure:

`text
NEWS
│
├── Page Header
│
├── Popular News
│   └── Featured News Carousel
│
├── Latest News
│   ├── Search
│   ├── Category Filter
│   └── News Grid
│
└── Footer

The page should feel like a premium MMA organization's editorial/news platform.

Design direction:

Premium + Aggressive + Modern + Cinematic

Do not make it look like a generic blog, newspaper, or UFC clone.


---

2. Page Header

Create a strong but clean page header.

Primary heading:

NEWS

Add a short supporting subtitle describing the section, for example:

Latest stories, fighter updates, events, and organization news.

The exact wording can be refined to match the existing site's tone.

Use the existing typography system:

Barlow Condensed for display/headings

Inter for body text


Keep the header spacious and cinematic without excessive decoration.


---

3. Popular News

Create a dedicated section:

POPULAR NEWS

This section should be visually more prominent than Latest News.

Create a featured news carousel.

Each slide should contain:

Large news image

Category

News title

Date

Short excerpt

Clickable area linking to /news/[news-slug]


Visual direction:

Large cinematic image

Strong image treatment/overlay where appropriate

Clear typography hierarchy

Premium dark surface

Subtle borders

Good contrast

Existing design tokens only


Do not make it a full-screen hero.


---

4. Popular News Carousel Behavior

The Popular News carousel should:

Autoplay

Have previous/next controls

Support mobile swipe

Pause autoplay on hover

Have smooth but relatively fast transitions

Avoid excessive animation

Be keyboard accessible

Respect prefers-reduced-motion


Do not add a new carousel or animation dependency if an appropriate existing implementation/component is already available.

Inspect the project first and reuse existing patterns where possible.


---

5. Latest News

Create:

LATEST NEWS

Below the Popular News section.

This section contains the complete news collection.


---

6. Search

Add a search input above the News Grid.

Placeholder:

Search news...

Requirements:

Search news by title

Search any other appropriate searchable text already available in the mock data

Use a Lucide search icon

Accessible label

Responsive

Clear visual focus state

Client-side filtering is acceptable because the current implementation uses Mock Data


Search and category filtering must work together.

Do not introduce unnecessary search infrastructure.


---

7. Category Filter

Add category filtering alongside the search.

Categories:

ALL

FIGHTERS

EVENTS

ORGANIZATION

RANKINGS


The active category must have a clearly visible active state.

Inactive categories should remain clean and understated.

The filter must actually work with the existing mock news data.

Search and category filtering must work together.

For example:

Category: FIGHTERS
Search: Gaziev

should only display news matching both conditions.

On mobile, horizontal scrolling for the category controls is acceptable if it produces a better UX.

Do not allow horizontal page overflow.


---

8. Latest News Grid

Display the filtered/latest news in a responsive grid.

Desktop:

3 columns


Tablet:

2 columns


Mobile:

1 column


Each News Card should contain:

Image

Category

Title

Date

Short excerpt where appropriate


The entire card should be clickable.

Route:

/news/[news-slug]

Use the project's existing Next.js routing conventions.

Cards should have:

Premium dark surface

Subtle border
Appropriate existing radius

Consistent image aspect ratio

Good spacing

Subtle hover interaction

No excessive scaling

No unnecessary glow


Use the existing semantic design tokens.

Do not hardcode arbitrary colors inside the component.


---

9. Empty State

If no news matches the current search/filter combination, display a polished empty state.

For example:

NO STORIES FOUND

Try a different search or category.

Do not leave an empty grid.

The empty state should fit the existing Premium + Aggressive + Modern visual language.


---

10. News Data

The current project intentionally uses Mock Data.

Do not introduce Prisma or PostgreSQL in this task.

First inspect:

mock-database/

and identify the existing News data source and structure.

Use the existing News mock-data source.

Do not create a second source of truth for News.

If the existing mock data is missing a field genuinely required by the UI, make the smallest appropriate change to the existing data structure.

Do not duplicate news objects inside React components.


---

11. Architecture

Follow the existing project architecture.

Important:

Server Components by default

Client Components only where interactivity is required

Search/filter/carousel interactions may require Client Components

Keep the page server-rendered where practical

Isolate client-side behavior to the smallest appropriate components

Never access a database directly from Client Components

Do not introduce unnecessary abstractions

Do not create unnecessary hooks or utilities


Before creating a new component, inspect existing reusable components and reuse them where appropriate.


---

12. Responsive Design

The page must work correctly on:

Desktop

Tablet

Mobile


Pay particular attention to:

Featured carousel proportions

Search/filter layout

Category filter behavior on mobile

News card image proportions

Typography

Horizontal spacing

Touch interaction

No horizontal overflow


The mobile layout should feel intentionally designed rather than simply being a collapsed desktop layout.


---

13. Visual Style

Follow the existing UI context exactly.

The page should feel:

Premium

Aggressive

Modern

Cinematic

High contrast

Professional


Use:

Barlow Condensed

Inter

Existing dark surfaces

Existing red accent

Subtle borders

Strong grid alignment

Generous whitespace

Purposeful motion


Avoid:

Generic blog styling

Excessive nested cards

Excessive red

Neon effects

Gaming UI

Huge shadows

Excessive rounded elements

Excessive animations

UFC-like visual imitation



---

14. Accessibility

Ensure:

Proper semantic heading hierarchy

Accessible search input

Keyboard-accessible carousel controls

Visible focus states

Accessible buttons

Meaningful image alt text

prefers-reduced-motion support



---

15. Do Not Build Yet

Do not build the News Detail page in this task.

Do not build:

/news/[news-slug]

yet.

We are only building the News Listing Page.

The News Detail page will be handled separately after the listing page is visually approved.


---

16. Do Not Modify Unrelated Features

Do not modify:

Rankings

Fighters

Fighter Profile

Events

Event Detail

About

Contact


unless a shared component genuinely requires a compatible change.

Do not change unrelated data.

Do not add new dependencies unless absolutely necessary and justified by the existing architecture.


---

17. Final Verification

After implementation:

1. Run TypeScript checking.


2. Run lint.


3. Verify the page at desktop widths.


4. Verify the page at tablet widths.


5. Verify the page at mobile widths.


6. Verify News search.


7. Verify every category filter.


8. Verify Search + Category filtering together.


9. Verify the Popular News carousel.


10. Verify autoplay.


11. Verify pause-on-hover.


12. Verify mobile swipe.


13. Verify keyboard controls.


14. Verify reduced-motion behavior.


15. Verify every News Card links to the correct slug.


16. Verify the empty state.


17. Verify there is no horizontal overflow.

18. Verify no unnecessary dependencies were introduced.



Finally, update:

progress-tracker.md

to reflect that the News Listing Page has been implemented.

Do NOT mark the entire News section as complete yet because the News Detail page still needs to be built.


---

Important Implementation Rule

Before coding, inspect the existing project and understand how the current pages and reusable components are structured.

Do not blindly create new components or duplicate existing patterns.

Build the first complete implementation now. Do not over-optimize or endlessly abstract the solution.

The priority is:

Correct structure → Good visual implementation → Responsive behavior → Functional interactions → Final polish