read the /AGENTS.md before starting.



Implement the Homepage News section and its mock data.

IMPORTANT:
This is the final section of the Homepage.

Before making any changes, read and follow:
- context/project-overview.md
- context/architecture-context.md
- context/ui-context.md
- context/code-standards.md
- context/ai-workflow-rules.md
- context/progress-tracker.md

Also inspect the existing Homepage implementation and the current mock-database/ structure before writing code.

## 1. News Mock Database

Create or update:

`text
mock-database/news.ts
The News mock database is the single source of truth for the Homepage News section and future News pages.
Do not hardcode news content directly inside UI components.
Each news item should contain the information required by the current project architecture, such as:
{
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  imageUrl: string
  publishedAt: string
  isPopular: boolean
}
Use appropriate types rather than any.
Use fictional but realistic MMA-related news.
Create enough news items to make the carousel feel realistic. Prefer around 6–8 news articles rather than only 2–3 items.
The news should be coherent with the fictional MMA organization and its fighters/events.
Some articles should be marked:
isPopular: true
and others:
isPopular: false
Important:
isPopular represents popularity/featured status, not simply recency.
Do not assume the newest article is automatically the most popular.
2. Homepage News Data
The Homepage should display popular/featured news from the mock database.
The UI should derive the displayed news from:
mock-database/news.ts
        ↓
filter popular news
        ↓
News Carousel
Do not create a second dataset specifically for the Homepage.
Do not hardcode news titles, images, dates, or other article information inside the component.
3. News Carousel
Implement the Homepage News section as an animated carousel.
Requirements:
Autoplay enabled.
Autoplay interval: exactly 5 seconds.
Previous arrow.
Next arrow.
Mobile swipe support.
Pause autoplay when the user hovers over the carousel.
The carousel should be keyboard accessible.
Users should be able to manually navigate between slides.
Clicking a news card should navigate to:
/news/[news-slug]
Use the article's slug from the mock database.
Do not hardcode article URLs.
4. Autoplay Behavior
Use a 5-second autoplay interval.
The carousel should not aggressively fight user interaction.
When the user manually navigates using arrows or swipe:
update the active slide normally.
keep the carousel functional.
do not create multiple autoplay timers.
clean up timers when the component unmounts.
Respect:
prefers-reduced-motion
If the user prefers reduced motion, disable autoplay and unnecessary animation.
Do not introduce a new carousel library unless the project already has one or the existing implementation cannot reasonably support these requirements.
Prefer existing project dependencies and shadcn/ui where appropriate.
5. News Card
Each carousel slide should visually communicate:
News image
News title
Short excerpt
Publication date
The design should follow the project's established visual identity:
Premium
Aggressive
Modern
Cinematic MMA aesthetic
Strong typography
High-contrast imagery
Generous spacing
Dark theme as default
Light theme must continue to work
Use the existing design tokens.
Do not introduce arbitrary hardcoded colors if an existing semantic token can be used.
Do not redesign the existing Navbar, Footer, Hero, Event Carousel, P4P, or Champions sections.
6. Responsive Behavior
The News Carousel must work intentionally across:
Mobile
Tablet
Desktop
Large desktop
On mobile:
support touch/swipe interaction.
maintain readable typography.
prevent overflow.
keep navigation controls usable.
7. Accessibility
Follow the existing accessibility rules.
The carousel should:
have accessible navigation buttons.
have meaningful accessible labels for previous/next controls.
support keyboard navigation.
provide appropriate alt text for news images.
not rely only on color to communicate information.
respect reduced-motion preferences.
8. Component Architecture
Keep the implementation aligned with the project's Server/Client Component boundaries.
The News section may receive news data from the server/page layer.
Interactive carousel behavior should be isolated into a Client Component because it requires:
state
timers
user interaction
browser APIs/events
Do not make the entire Homepage a Client Component just because the carousel is interactive.
Keep the interactive portion isolated.
Do not put database logic inside the UI component.
Do not access PostgreSQL or Prisma.
This project is still using the Mock Database during the initial UI development phase.
9. Data and UI Separation
Maintain this separation:
mock-database/news.ts
        ↓
News data
        ↓
Homepage/server layer
        ↓
News Carousel Client Component
        ↓
News Card UI
The UI must consume the data rather than define it.
10. Scope
Only implement:
mock-database/news.ts
Homepage News section
Required News Carousel component(s)
Required News Card component(s)
Minimal supporting code necessary for the section
Do not implement the full /news page yet.
Do not implement /news/[news-slug] yet.
Do not implement the complete News system/backend yet.
Do not introduce PostgreSQL or Prisma.
Do not modify unrelated Homepage sections.
11. Verification
After implementation:
Verify the mock News data exists in mock-database/news.ts.
Verify news content is not hardcoded inside UI components.
Verify popular news is derived using isPopular.
Verify the carousel displays the popular news.
Verify autoplay changes slides every 5 seconds.
Verify autoplay pauses on hover.
Verify previous/next controls work.
Verify mobile swipe works.
Verify clicking a news card uses the correct /news/[news-slug] route.
Verify keyboard navigation works.
Verify reduced-motion preference disables autoplay/unnecessary animation.
Verify there are no duplicate autoplay timers or memory leaks.
Verify responsive layouts.
Verify both dark and light themes.
Run TypeScript/lint checks if available.
Fix root causes rather than adding workarounds.
Update context/progress-tracker.md with the actual implementation completed.
Do not implement any unrelated feature as part of this task.