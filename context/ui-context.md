# UI Context

## Visual Identity

The visual language of the website is:

- Premium
- Aggressive
- Modern

The design should feel like a serious professional MMA organization while maintaining its own visual identity.

The interface should avoid looking like a generic sports website, gaming interface, or direct clone of an existing MMA promotion.

The design should prioritize:

- Strong visual hierarchy
- Large and confident typography
- High-quality fighter and event imagery
- Clean layouts
- Generous negative space
- High contrast
- Controlled use of accent color
- Subtle and purposeful motion

## Theme

The application supports dark and light modes, managed by next-themes.

The default theme is `system`, which follows the operating system preference.

Users can manually switch between dark and light mode using a global theme toggle in the Navbar.

Manual theme selections persist across page navigation, refresh, and browser sessions via localStorage.

Both themes must be designed intentionally. Light mode should not simply be an inverted version of the dark theme.

All theme colors should be defined as CSS custom properties and mapped to Tailwind tokens.

Components must use the defined design tokens rather than hardcoded color values or arbitrary Tailwind color classes.

- Theme system: next-themes
- Default: system
- User-selected theme persists
- Dark and Light supported

### Dark Theme

| Role | CSS Variable | Value |
| ---------------- | ---------------------- | ---------------- |
| Page background | --bg-base | #080808 |
| Surface | --bg-surface | #111111 |
| Elevated surface | --bg-elevated | #171717 |
| Subtle surface | --bg-subtle | #1d1d1d |
| Default border | --border-default | #262626 |
| Subtle border | --border-subtle | #333333 |
| Primary text | --text-primary | #F5F5F5 |
| Secondary text | --text-secondary | #A1A1A1 |
| Muted text | --text-muted | #707070 |
| Faint text | --text-faint | #4A4A4A |
| Brand accent | --accent-primary | #E10600 |
| Brand accent dim | --accent-primary-dim | rgba(225, 6, 0, 0.12) |
| Error | --state-error | #EF4444 |
| Success | --state-success | #22C55E |
| Warning | --state-warning | #F59E0B |

### Light Theme

Light theme uses the same semantic token names as the dark theme.

The exact light-theme values should be defined in globals.css and maintained as a cohesive palette rather than using arbitrary Tailwind colors.

The light theme should preserve:

- Strong contrast
- Brand red
- Clear surface hierarchy
- Subtle borders
- Premium visual character

## Color Usage

Brand red is an accent, not a dominant background color.

Use the accent primarily for:

- Primary CTAs
- Active navigation states
- Active tabs
- Important indicators
- Ranking movement
- Championship indicators
- Winner states
- Hover states
- Selected elements
- Small visual accents

Do not use the accent color excessively.

The interface should remain predominantly neutral, allowing the red accent to carry visual importance.

## Typography

Typography should create a strong editorial and sports-oriented visual identity.

### Display Font

Use Barlow Condensed for large display typography.

Primary usage:

- Hero headings
- Event names
- Fighter names
- Section headings
- Ranking numbers
- Major promotional text

### Body Font

Use Inter for general interface and body text.

Primary usage:

- Navigation
- Descriptions
- Metadata
- Buttons
- Labels
- Article content
- Form controls
- Supporting text

Both fonts should be loaded using next/font/google and exposed as CSS variables.

The base body should use Inter with antialiased.

Typography should use strong weight and size contrast rather than excessive decorative effects.

## Border Radius

The design uses sharp to slightly rounded surfaces.

Avoid excessive use of large rounded containers.

| Context | Class |
| ----------------- | ---------------- |
| Inline / small UI | rounded-md |
| Buttons / inputs | rounded-md |
| Cards | rounded-lg |
| Large panels | rounded-xl |
| Modal / overlay | rounded-xl |

Large rounded-2xl or rounded-3xl surfaces should only be used when they have a clear visual purpose.

## Layout

Layouts should feel spacious, structured, and editorial.

Use:
- Strong grid systems
- Consistent content widths
- Generous vertical spacing
- Clear section separation
- Large visual areas for imagery
- Strong alignment
- Responsive layouts

Avoid:

- Dense dashboard-style layouts
- Excessive cards
- Unnecessary borders
- Excessive visual decoration
- Large amounts of empty UI chrome

## Homepage Layout

The homepage follows this section order:

1. Hero
2. Recent Results
3. Pound-for-Pound
4. Champions
5. News

The Hero should establish the organization's identity before presenting event information.

The Upcoming Event is presented as part of the Hero experience.

Recent Results use a horizontal carousel.

Pound-for-Pound uses a ranking-list presentation rather than individual cards.

Champions are displayed inside one unified section/container containing all eight divisions.

News uses an animated carousel for popular or featured articles.

## Navbar

The Navbar is a global component displayed on every page.

Desktop structure:

`text
LOGO                    RANKINGS  FIGHTERS  NEWS  EVENTS  ABOUT  CONTACT

The logo is positioned on the left.
Navigation links are positioned on the right.
The Navbar includes a global Dark/Light theme toggle.
On mobile, navigation links collapse into a hamburger menu.
The Navbar should remain visually minimal and should not contain social media links.
Footer
The Footer is a global component displayed on every page.
It contains:
Organization logo
Short organization description
Navigation links
Social media links
Copyright information
Privacy Policy
Terms
Social media platforms:
Instagram
X
YouTube
Telegram
Cards
Cards should support the premium, aggressive, and modern visual language.
Cards should use:
Strong imagery
Clear hierarchy
Subtle borders
Controlled shadows
Slight corner rounding
Clear hover states
Avoid excessive use of decorative card backgrounds.
Fighter Cards
Fighter cards should prioritize the fighter image.
A typical card hierarchy is:
FIGHTER IMAGE

FIGHTER NAME
NICKNAME

WEIGHT CLASS       RECORD
If the fighter is ranked, the ranking should be displayed as secondary metadata.
Event Cards
Event cards should prioritize event artwork or imagery.
They may display:
Event name
Date
Location
Main event
Status
View Event action
Featured event cards can use a more cinematic presentation than standard event cards.
News Cards
News cards should prioritize the article image and headline.
They may display:
Image
Title
Date
Short excerpt when appropriate
Rankings
Ranking interfaces should feel official and structured rather than card-heavy.
Ranking lists should prioritize:
Position
Fighter name
Record
Ranking movement
Relevant weight class information
Rows should have clear hover and active states.
Ranking numbers can use the brand accent selectively.
Champions are displayed separately from contender rankings.
Imagery
Fighter and event imagery are major parts of the visual identity.
Preferred imagery characteristics:
Cinematic
High contrast
Dynamic
Professional
Strong subject isolation
Dark or controlled backgrounds
Large imagery should be used in:
Homepage Hero
Event Hero
Fighter Hero
Fighter Cards
Featured News
Featured Events
Images should not overwhelm the information hierarchy.
Image URLs are provided by the data layer and may reference external image hosts.
Motion
Motion should be subtle, fast, and purposeful.
Use animation for:
Carousel transitions
Card hover states
Image hover effects
Navigation interactions
Button interactions
Theme transitions
Ranking indicators
Mobile menu transitions
Avoid unnecessary animation.
Premium visual quality should come from composition, typography, imagery, and spacing rather than excessive motion.
Carousel Behavior
Event Carousel
The Event Carousel represents a chronological timeline.

No autoplay.
Previous and next controls.
Keyboard navigation.
Mobile swipe support.
Current event should receive the strongest visual emphasis.
News Carousel
The News Carousel highlights popular or featured news.
Autoplay enabled.
Previous and next controls.
Mobile swipe support.
Pause on hover where applicable.
Clicking an item navigates to the article.
Responsive Design
The website must be fully responsive.
Design should be considered across:
Mobile
Tablet
Desktop
Large desktop
Do not treat mobile as a reduced desktop layout.
Important layouts should be intentionally designed for smaller screens.
Examples:
Navbar becomes a mobile menu.
Multi-column grids collapse appropriately.
Carousels support touch/swipe interaction.
Typography scales responsively.
Large hero compositions adapt to smaller viewports.
Tables or ranking layouts remain readable without horizontal overflow where practical.
Component Library
Use shadcn/ui on top of Tailwind CSS where appropriate.
Reusable components should live in appropriate component directories.
Use the shadcn CLI when adding standard shadcn/ui components rather than manually recreating components that already exist in the library.
Custom components should be created when the project's specific UI requirements are not adequately covered by shadcn/ui.
Icons
Use Lucide React.
Icons should be stroke-based.
Avoid filled icon variants unless there is a clear design reason.
Recommended sizes:
h-4 w-4 for inline icons
h-5 w-5 for buttons and navigation
h-6 w-6 for larger controls
h-8 w-8 for prominent feature or empty-state icons
Icons should support the interface rather than become decorative elements.
UI Principles
Premium over flashy.
Aggressive through typography, imagery, and contrast rather than excessive decoration.
Modern through clean composition and restrained motion.
Red is an accent, not the dominant color.
Dark mode is the default, but Light mode must remain fully supported.
Use design tokens instead of arbitrary colors.
Prefer whitespace and hierarchy over unnecessary visual elements.
Keep components visually consistent across pages.
Preserve strong readability and accessibility.
Do not introduce visual patterns that conflict with the established brand identity.