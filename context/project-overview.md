# MMA Organization

## Overview

MMA Organization is a modern, premium, and aggressive mixed martial arts promotion website.

The platform presents the organization's fighters, rankings, events, fight cards, results, championships, and news through a professional public-facing experience.

The website is designed to feel like a serious MMA promotion while maintaining its own distinct visual identity rather than directly copying an existing organization.

The application is built with Next.js, TypeScript, Tailwind CSS, PostgreSQL, and Prisma. Next.js is responsible for both the frontend and backend application layer, while PostgreSQL provides persistent relational data storage through Prisma.

## Goals

1. Present the MMA organization's identity through a premium, aggressive, and modern website.
2. Provide a complete fighter directory with search, filtering, and individual fighter profiles.
3. Provide official P4P and division rankings.
4. Present upcoming and completed events with detailed fight cards and results.
5. Provide a structured news platform with popular and latest news.
6. Provide detailed fighter records, rankings, championships, and fight history.
7. Provide clear information about the organization and its contact and social media channels.
8. Build the project on a relational database structure that can support the organization's MMA data.
9. Keep the architecture maintainable and scalable for future features.

## Core User Flow

1. User visits the homepage.
2. User can view the organization's identity, upcoming event, recent results, P4P rankings, champions, and news.
3. User navigates to Rankings to view P4P or division rankings.
4. User navigates to Fighters to search, filter, and browse fighters.
5. User opens a fighter profile to view their information, rankings, championships, and fight history.
6. User navigates to Events to search and filter upcoming or completed events.
7. User opens an event to view its fight card, results, and event details.
8. User navigates to News to search, browse popular news, and read the latest articles.
9. User opens a news article to read the full article and related news.
10. User visits About to learn about the organization's story, mission, values, and social media.
11. User visits Contact to find the organization's contact information and social media channels.

## Features

### Homepage

- Organization-focused hero section.
- Upcoming event presentation.
- Recent fight results carousel.
- Top 5 Pound-for-Pound rankings preview.
- Unified champions section containing all eight divisions.
- Popular news carousel.
- Global navigation and footer.

### Rankings

- P4P rankings.
- Division rankings for all eight weight classes.
- P4P ranking positions from #1 to #15.
- Division champion displayed separately from the #1 contender.
- Division contender rankings from #1 to #15.
- Ranking movement indicators.
- Clickable ranking entries leading to fighter profiles.

### Fighters

- Fighter directory.
- Search by fighter name or nickname.
- Filter by Active or Retired status.
- Filter by weight class.
- Popular Fighter section.
- Visual fighter card grid.
- Fighter cards display image, name, nickname, weight class, record, and ranking when applicable.

### Fighter Profiles

- Fighter hero section.
- Fighter image, name, nickname, record, P4P ranking, and weight class.
- Fighter information including nationality, date of birth, current age, height, and reach.
- Current rankings.
- Championships.
- Recent fights.
- Full fight history.
- Current age is calculated dynamically from the date of birth rather than stored as persistent data.

### Events

- Event search.
- Event status filters: All, Upcoming, Completed.
- Featured event carousel.
- Timeline-based event navigation.
- Upcoming and completed event listing.
- Event detail pages.
- Fight cards organized into Main Event, Co-Main Event, Main Card, and Preliminary Card.

### Event Details
- Event hero section.
- Event name, date, location, and main event.
- Complete fight card.
- Main Event.
- Co-Main Event.
- Main Card.
- Preliminary Card.
- Event results.
- Event details.

### News

- News search.
- Popular News autoplay carousel.
- Latest News chronological list.
- News article pages.
- Related news.
- News can be associated with relevant fighters and events.

### About

- Organization story.
- Mission.
- Core values.
- Competition.
- Respect.
- Integrity.
- Evolution.
- Social media links.

### Contact

- Organization email.
- Phone number.
- Telegram.
- Social media links.
- No contact form for the initial version.

### Global Navigation

- Global navbar displayed on every page.
- Organization logo on the left.
- Navigation links:
  - Rankings
  - Fighters
  - News
  - Events
  - About
  - Contact
- Responsive mobile navigation with a hamburger menu.

### Global Footer

- Organization logo and short description.
- Navigation links.
- Social media links:
  - Instagram
  - X
  - YouTube
  - Telegram
- Copyright information.
- Privacy Policy.
- Terms.

## Data and Backend

### Database

- PostgreSQL is the primary database.
- Prisma is used as the ORM and database access layer.
- The data model is relational and centered around fighters, fights, events, weight classes, rankings, championships, and news.

### Core Entities

- Fighter
- Weight Class
- Fight
- Event
- Ranking
- Championship
- News

### Relationships

- Fighters participate in fights.
- Fights belong to events.
- Fights belong to weight classes.
- Fighters have rankings.
- Fighters can hold championships.
- News articles can be associated with fighters and events.
- Events contain multiple fights.

### Data Management

- The initial version does not include an admin panel.
- Data is managed directly through the database during development.
- Authentication and administrative interfaces are not required for the initial public version.
- Ranking history is not stored.
- Only current ranking positions are required.
- Fighter age is calculated dynamically from date of birth.

### Images

- Image files are not stored on the application server initially.
- Entities store external image URLs.
- External image hosting can be introduced later if the project requires a dedicated storage solution.

## Scope

### In Scope

- Public-facing MMA organization website.
- Homepage.
- Rankings and P4P system.
- Fighter directory and fighter profiles.
- Events and event detail pages.
- Fight cards and fight results.
- Championships.
- News listing and article pages.
- About page.
- Contact page.
- Global navbar and footer.
- PostgreSQL database.
- Prisma ORM.
- Next.js backend functionality.
- Relational data model for MMA entities.
- External image URLs.

### Out Of Scope

- Admin panel.
- Authentication and user accounts.
- User profiles.
- User comments.
- User-generated content.
- Ranking history.
- Billing and subscription systems.
- Mobile-native applications.
- Dedicated image/file storage infrastructure.
- Advanced analytics.
- Live fight scoring.
- Live fight streaming.
- Betting or gambling functionality.

## Success Criteria

1. A visitor can navigate the entire public website through the global navbar and footer.
2. The homepage clearly communicates the organization's identity and current MMA activity.
3. Visitors can browse, search, and filter fighters.
4. Visitors can open detailed fighter profiles and view their records and fight history.
5. Visitors can view current P4P and division rankings.
6. Visitors can browse upcoming and completed events.
7. Visitors can open an event and view its complete fight card and results.
8. Visitors can browse popular and latest news and read individual articles.
9. The organization's story, values, contact information, and social media are clearly accessible.
10. MMA-related data is stored using a structured PostgreSQL relational database.
11. Prisma provides a clear and maintainable database access layer.
12. The application architecture is structured so future backend and administrative features can be added without requiring a major rewrite.