# Architecture Context

## Stack

| Layer | Technology | Role |
| ---------------- | ----------------------- | -------------------------------------------------------------- |
| Framework | Next.js 16 + TypeScript | Full-stack application with server/client boundaries |
| UI | Tailwind CSS + shadcn/ui | Component composition and styling |
| Database | PostgreSQL | Relational storage for MMA organization data |
| ORM | Prisma | Database schema, migrations, and type-safe database access |
| Images | External image URLs | Image references stored as URLs rather than uploaded files |

## System Boundaries

- app — Next.js routes, layouts, pages, and route-specific application logic.
- app/api — Route handlers for cases that require an HTTP API boundary. Do not create API routes when direct server-side data access is sufficient.
- components — Reusable UI components and interactive client-side elements.
- lib — Shared infrastructure, Prisma client, database utilities, and reusable application logic.
- prisma — Prisma schema, migrations, and generated database client.
- public — Static application assets that are part of the codebase.
- context — Project-level documentation and AI development rules. Context files are not application runtime code.

## Application Architecture

The application follows a full-stack Next.js architecture.

The frontend and backend are part of the same Next.js application.

Server-side code is responsible for database access and other operations that should not be exposed to the browser.

Client components are used only when browser-side interactivity or client-side state is required.

The application should prefer server-side data fetching when the data does not require client-side interactivity.

Database access should not be performed directly from Client Components.

The Prisma client should be used from server-side code only.

## Data Flow

The standard data flow is:

`text
Next.js Page / Server Component
            ↓
       Server-side logic
            ↓
          Prisma
            ↓
       PostgreSQL
            ↓
          Prisma
            ↓
       Server Component
            ↓
        UI rendering


        For interactive operations that require an HTTP boundary:
        Client Component
      ↓
  Route Handler
      ↓
Server-side logic
      ↓
    Prisma
      ↓
 PostgreSQL





 Do not introduce an API layer purely for architectural appearance. Use Route Handlers when an actual HTTP endpoint is useful or required.
Database Architecture
PostgreSQL is the primary persistent data store.
The database uses a relational model because the application's core data has strong relationships between fighters, fights, events, rankings, championships, weight classes, and news.
Prisma is used as the ORM and provides:
Database schema definition.
Type-safe database queries.
Database migrations.
Generated TypeScript types and database client.
The initial core entities are:
Fighter
WeightClass
Fight
Event
Ranking
Championship
News
Relationships between these entities should be represented using proper relational fields and foreign keys rather than duplicated string values where a relationship exists.
MMA Data Model
Fighters
A Fighter represents an MMA athlete participating in the organization.
Fighter data includes:
Name
Slug
Nickname
Nationality
Date of birth
Height
Reach
Status
Record
Image URL
Biography
Popularity score
Current age is calculated from the date of birth and is not stored as a separate database field.
Weight Classes
The organization currently supports eight weight classes:
Heavyweight
Light Heavyweight
Middleweight
Welterweight
Lightweight
Featherweight
Bantamweight
Flyweight
Weight classes are represented as a dedicated database entity so fighters, fights, rankings, and championships can reference the same canonical division.
Each weight class has a canonical weight limit, surfaced on fighter profiles (e.g., the Fighter Information "Weight" stat). The limit belongs to the weight class, not the individual fighter, so it lives beside the canonical division definition rather than on the fighter record.
Fights
A Fight represents a matchup between two fighters.
A fight is associated with:
Two fighters
One event
One weight class
Result
Method
Round
Time
Fight card type
Display order
Fight card types include:
Main Event
Co-Main Event
Main Card
Preliminary
The fight order is stored explicitly so the event page can render the card in the correct order.
Events
An Event represents an MMA organization event.
An event contains:
Name
Slug
Date
Location
Venue
Image URL
Description
Status
Associated fights
Event status includes:
Upcoming
Completed
Rankings
The application stores current rankings only.
Ranking history is intentionally out of scope.
The ranking system supports:
Pound-for-Pound rankings.
Rankings for each weight class.
Current ranking position.
Ranking movement indicator when applicable.
P4P rankings do not belong to a specific weight class.
Division rankings are associated with their corresponding weight class.
Champions are displayed separately from contender rankings and are not treated as the #1 contender.
Championships
Championship records represent current and historical title ownership data required by fighter profiles and division champion displays.
A championship record is associated with:
Fighter
Weight class
Title status
Relevant title dates when required
The current champion for each division must be uniquely identifiable so the homepage and other pages can retrieve the current champion efficiently.
News
News articles contain:
Title
Slug
Excerpt
Content
Image URL
Published date
Popularity information
News can be related to:
Fighters
Events
These relationships allow news articles to provide relevant links to fighter profiles and event pages.
Image Storage
The initial version does not include dedicated file or object storage.
Images are referenced using external URLs.
Database entities that require images store an imageUrl value rather than storing image files.



Example:
imageUrl
→ https://example.com/fighter-image.jpg





The architecture should allow dedicated image storage to be introduced later without requiring major changes to the core domain model.
Data Management
The initial version does not include an Admin Panel.
Data is managed directly through PostgreSQL during development.
There is no authentication or authorization requirement for the initial public-facing version.
Administrative interfaces, authentication, and protected data-management workflows can be introduced later if the project requires them.
Rendering Strategy
Use the appropriate Next.js rendering strategy based on the nature of the page and its data.
Pages that primarily display database-backed content should prefer server-side data fetching.
Client Components should be limited to interactive functionality such as:
Carousels
Search interactions when client-side behavior is required
Filters requiring client-side state
Mobile navigation
Interactive UI controls
A page should not become a Client Component merely because one small part of the page requires interactivity. Interactive functionality should be isolated into dedicated Client Components whenever practical.
Dynamic Routes
The application uses slug-based dynamic routes for entity detail pages.
/fighters/[fighter-slug]
/events/[event-slug]
/news/[news-slug]
Slugs should be stable, URL-friendly, and unique within their entity type.
Detail pages use the slug to retrieve the corresponding database record.
System Invariants
PostgreSQL is the source of truth for persistent MMA organization data.
Prisma is the application's database access layer.
Prisma database access must remain on the server.
Client Components must not access PostgreSQL directly.
Do not introduce an API layer when direct server-side data access is sufficient.
Route Handlers should only be introduced when an HTTP API boundary is actually required.
Current ranking data is stored without ranking history.
Fighter age is derived from date of birth rather than stored independently.
Weight classes are canonical database entities and should not be duplicated as arbitrary strings across related records.
Fight card ordering must be deterministic.
Champions are represented separately from contender ranking positions.
Images are referenced by external URLs in the initial version.
Authentication and Admin Panel functionality are out of scope for the initial version.
New infrastructure or third-party services should not be introduced unless they solve a demonstrated project requirement.
Architecture changes must be reflected in this file before implementation continues.





## Development Data Strategy

During the initial UI development phase, pages and components may use local mock data.

Mock data is temporary development data used to build and verify the UI before the PostgreSQL database is connected.

All mock data must be kept separate from UI components and organized inside a dedicated mock-database/ directory.

The mock-database/ directory should contain mock data modules organized by the project's core domain entities.

Example structure:

`text
mock-database/
├── fighters.ts
├── events.ts
├── fights.ts
├── rankings.ts
└── news.ts


The mock database should represent the same general domain structure that will later be provided by PostgreSQL and Prisma.
UI components and pages may consume data from the mock database during the initial UI development phase, but they must not contain the mock data definitions themselves.
The intended production data flow remains:
Next.js ↓ Server-side logic ↓ Prisma ↓ PostgreSQL
The mock database is a temporary development layer and is not part of the production data architecture.
When the database layer is implemented, mock data should be replaced by the appropriate server-side Prisma queries without unnecessarily rewriting the UI components.
Do not introduce PostgreSQL or Prisma database queries into a feature solely because PostgreSQL and Prisma are part of the final project stack.
Follow the current implementation phase defined in progress-tracker.md.
When the project moves from the mock-data phase to the database phase, update the relevant context files and replace the mock database with the appropriate Prisma/PostgreSQL data access layer.