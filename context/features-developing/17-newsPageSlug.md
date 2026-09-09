read the /AGENTS.md before starting.


# Build News Detail Page

Build the News Detail Page for the MMA organization website.

The route should be:

`text
/news/[news-slug]

Before making any changes, read the relevant context files:

project-overview.md

architecture-context.md

ui-context.md

code-standards.md

ai-workflow-rules.md

progress-tracker.md


Also inspect the existing project structure, News mock data, reusable components, and the already-built News Listing page before implementing anything.


---

1. Goal

Create a premium, cinematic News Detail page for individual news articles.

The page should feel like an MMA organization's official editorial platform.

Design direction:

Premium + Aggressive + Modern + Cinematic

Do not make it look like a generic blog or a UFC clone.


---

2. Route and Data

Use the existing dynamic route:

/news/[news-slug]

Use the existing News mock data as the single source of truth.

The current News objects already contain:

id
title
slug
excerpt
content
imageUrl
publishedAt
isPopular
category

Do NOT add another News data source.

Do NOT add imageUrl because it already exists.

Do NOT introduce Prisma or PostgreSQL yet.

The current project is still using Mock Data.


---

3. Invalid Slug

If the requested slug does not match an existing News article:

notFound()

Use the existing Next.js conventions and the project's current approach for not-found.

Do not create a fake article for an invalid slug.


---

4. Hero Section

The image must be the actual Hero of the page.

This is an important design requirement.

Do NOT place the image as a small image above the article.

The Hero should be a large cinematic section with the News image as its background/primary visual.

Conceptually:

┌─────────────────────────────────────────────────────┐
│                                                     │
│                                                     │
│                  NEWS IMAGE                         │
│                                                     │
│        dark cinematic gradient overlay              │
│                                                     │
│        EVENTS                                       │
│                                                     │
│        Lewis vs Washington Superfight                │
│        Delivers at MMA 40                           │
│                                                     │
│        September 5, 2026                            │
│                                                     │
└─────────────────────────────────────────────────────┘

Use the existing imageUrl from the News data.

Hero requirements:

Large visual impact

Wide layout

Strong cinematic image

Dark gradient overlay

Text positioned over the image

Excellent text readability

Responsive

No unnecessary decorative elements


The image should remain visually important.

Do not cover the entire image with an opaque background.


---

5. Hero Content

Display:

Category

Use the existing News category.

Examples:

FIGHTERS
EVENTS
ORGANIZATION
RANKINGS

Title

Display the News title prominently.

The title should be the primary visual element.

Use:

Barlow Condensed

Strong display size

Appropriate line height

Responsive typography


Do not make the title unnecessarily huge on mobile.

Published Date

Display the publication date using the existing publishedAt field.

Format it as a human-readable date.

For example:

September 5, 2026

Do not display the raw ISO timestamp.


---

6. Hero Responsive Behavior

Desktop:

Large cinematic hero

Wide image

Title can span multiple lines

Content anchored toward the lower portion of the Hero


Tablet:

Reduce hero height appropriately

Maintain strong image presence


Mobile:

Hero remains image-based

Reduce height appropriately

Adjust title size

Keep enough contrast behind text

Do not let the title overflow

Preserve the cinematic feeling


Do not simply shrink the desktop Hero.
The mobile Hero should feel intentionally designed.


---

7. Article Content

After the Hero, create the main article section.

The article should use a comfortable reading width rather than stretching across the entire screen.

Conceptually:

Article Content

        The O2 Arena exploded as...

        Washington, who moved up...

        After the win...

        "I told you all..."

Requirements:

Maximum readable content width

Good line height

Comfortable paragraph spacing

Strong contrast

Premium typography

Responsive text size

Preserve paragraph structure


The existing content field contains paragraphs separated by newline characters.

Render those paragraphs properly.

Do NOT display the entire article as one huge text block.


---

8. Article Introduction / Excerpt

Use the existing excerpt appropriately.

The excerpt can be used as a short introductory lead beneath the Hero or at the beginning of the article.

It should be visually distinct from the normal body text.

Do not duplicate it unnecessarily if the design already communicates the introduction effectively.

Use your judgment based on the existing UI system.


---

9. Article Typography

Use the project's existing typography system:

Barlow Condensed for headings

Inter for article body


The article body should prioritize readability.

Avoid:

Extremely narrow text

Extremely large body text

Excessive bold text

Excessive red text

Decorative typography that hurts readability


The page should feel like a professional editorial article.


---

10. Associated Fighter / Event

Inspect the current News mock data and existing project data structures before deciding whether associated Fighters or Events can be displayed.

Do NOT invent relationships.

Do NOT infer relationships only from names inside article text if the project does not already have a reliable relationship field.

If the current data provides a reliable relationship, display it elegantly.

If it does not, do not add unnecessary fields just for this page.

This can be implemented later if the data model needs explicit relationships.


---

11. Related News

At the bottom of the article, create:

RELATED NEWS

Display a small selection of related News cards.

Use the existing News data.

Do not include the current article itself.

Choose related articles using a simple, deterministic approach based on the existing data, such as:

1. Same category first


2. Then other recent/popular articles if necessary



Do not create a complicated recommendation system.

Use the existing News Card design/pattern from the News Listing page where appropriate.

Related News cards should link to:

/news/[news-slug]


---

12. Navigation Back to News

Include a subtle way to return to the News listing page.

For example:

← BACK TO NEWS

Use a Lucide icon if appropriate.

It should feel integrated into the design rather than looking like a generic browser button.

It can appear above the Hero or in another appropriate location.

Use your judgment based on the existing layout.


---

13. Image Handling

The News data already contains imageUrl.

Use that field.

If imageUrl is empty or invalid, the page must still render gracefully using the project's existing image fallback pattern if one exists.

Do not break the layout because of a missing image.

Use the project's existing image conventions.

If the project currently uses external image URLs, configure/use them according to the existing Next.js setup rather than introducing a new image solution.


---

14. Architecture

Follow the existing project architecture.

Important:

Server Components by default

The News Detail page should remain a Server Component unless interactivity genuinely requires a Client Component

Do not access databases from Client Components

Do not introduce unnecessary Client Components

Reuse existing components where appropriate

Do not create unnecessary abstractions

Do not add dependencies


The dynamic route should use the existing Next.js 16 conventions already established by the project.


---

15. SEO / Metadata
Use the News article information to provide appropriate page metadata where the project's existing architecture supports it.

At minimum, the page title should use the News title.

The description should use the News excerpt.

Follow the project's existing Next.js metadata conventions.

Do not introduce a separate SEO library.


---

16. Accessibility

Ensure:

Proper heading hierarchy

Semantic article structure

Meaningful image alt text

Sufficient text contrast over Hero image

Keyboard-accessible navigation

Visible focus states

Accessible links

No interaction dependent only on hover



---

17. Visual Style

Follow the existing UI context exactly.

The page should feel:

Premium

Aggressive

Modern

Cinematic

High contrast

Professional


Use:

Existing dark surfaces

Existing accent color

Existing semantic tokens

Barlow Condensed

Inter

Subtle borders

Strong spacing

Cinematic imagery

Purposeful motion only where necessary


Avoid:

Generic blog appearance

Excessive cards

Excessive red

Neon effects

Gaming UI

Huge shadows

Excessive rounded elements

Excessive animations

UFC-like visual imitation



---

18. Do Not Change

Do NOT modify:

Rankings

Fighters

Fighter Profile

Events

Event Detail

About

Contact

Existing News Listing behavior


unless a genuinely shared component requires a compatible change.

Do not change existing News content.

Do not create duplicate News data.

Do not add Prisma/PostgreSQL.

Do not add authentication.

Do not add an admin system.

Do not add unnecessary dependencies.


---

19. Final Verification

After implementation:

1. Run TypeScript checking.


2. Run lint.


3. Test a valid News slug.


4. Test an invalid News slug.


5. Verify the Hero image.


6. Verify Hero overlay/readability.


7. Verify title rendering.


8. Verify formatted publication date.


9. Verify article paragraphs.


10. Verify excerpt presentation.


11. Verify Related News.


12. Verify the current article is excluded from Related News.


13. Verify Related News links.


14. Verify responsive behavior on desktop.


15. Verify responsive behavior on mobile.


16. Verify no horizontal overflow.


17. Verify image fallback behavior.


18. Verify accessibility/focus states.


19. Verify metadata.


20. Verify no unrelated pages were changed.



Finally, update:

progress-tracker.md

to reflect that the News Detail Page has been implemented.

Do not mark the entire News section as complete if there are still known News-related issues.


---

Important Implementation Rule

Before coding, inspect:

Existing News Listing page

Existing News mock data

Existing reusable News Card

Existing image handling

Existing page layouts

Existing responsive patterns

Existing metadata conventions


Reuse existing patterns wherever appropriate.

Do not blindly create new components if an existing component can be reused.

Build the first complete implementation now.

Priority:

Correct data → Strong Hero → Readable article → Related News → Responsive behavior → Accessibility → Final polish