# Architecture Context

## Stack

### Current Development Stage

| Layer | Technology | Role |
| ---------------- | ----------------------- | -------------------------------------------------------------- |
| Framework | Next.js 16 + TypeScript | Frontend application: pages, layouts, components, rendering |
| UI | Tailwind CSS + shadcn/ui | Component composition and styling |
| Data source | Mock Database (`mock-database/`) | Temporary development data; not part of production architecture |
| Images | External image URLs | Image references stored as URLs rather than uploaded files |

### Planned Production Architecture (Future Phase — Not Implemented)

```text
Next.js 16 (frontend)
        ↓
TanStack Query + Axios
        ↓
Django REST API (separate backend application)
        ↓
PostgreSQL
```

| Layer | Technology | Role |
| ---------------- | ----------------------- | -------------------------------------------------------------- |
| Frontend framework | Next.js 16 + TypeScript | Frontend UI, pages, layouts, components, rendering |
| Server-state management | TanStack Query | Fetching, caching, refetching, mutations, loading/error states |
| HTTP client | Axios | HTTP communication between Next.js and the Django API |
| Backend framework | Django | Backend application: business logic, validation, data access |
| API layer | Django REST Framework (DRF) | REST API endpoints consumed by the frontend |
| Database access | Django ORM | Backend database access layer |
| Database | PostgreSQL | Persistent production data storage |
| Images | External image URLs | Image references stored as URLs rather than uploaded files |

Prisma was the previously planned ORM/database access layer; that plan has been replaced by Django + Django REST Framework. Do not introduce Prisma or a Next.js-based backend.

Django implementation has NOT started. During the current development stage the frontend still reads from the mock database.

## Separation of Responsibilities

- **Next.js** — frontend UI: pages, layouts, components, client-side interactions, frontend rendering, and consuming backend APIs.
- **TanStack Query** — server-state management on the frontend: fetching backend data, caching, loading/error states, refetching, and mutations.
- **Axios** — HTTP communication between Next.js and Django.
- **Django / Django REST Framework** — the backend/API: business logic, authentication/authorization when introduced, data validation, and database interaction through the Django ORM.
- **PostgreSQL** — persistent application data.

The backend is a separate Django application, not a Next.js backend. Next.js Route Handlers and Server Actions are not the main backend/API.

## System Boundaries

- app — Next.js routes, layouts, and pages (frontend only).
- components — Reusable UI components and interactive client-side elements.
- lib — Shared frontend infrastructure, data-access helpers, and reusable application logic.
- mock-database — Temporary mock data modules used during the current development stage.
- public — Static application assets that are part of the codebase.
- context — Project-level documentation and AI development rules. Context files are not application runtime code.

The Django backend will live in a separate application and is not part of the current Next.js codebase.

## Application Architecture

During the current development stage, the application is a Next.js 16 frontend that reads from the mock database through server-side data-access helpers in `lib/`.

In the planned production architecture, Next.js is the frontend only. The frontend talks to a separate Django REST API over HTTP using TanStack Query + Axios. Django owns the backend: business logic, validation, authentication/authorization (when introduced), and PostgreSQL access through the Django ORM.

Client Components are used only when browser-side interactivity or client-side state is required.

Client Components must not access any database directly; all database access happens in the Django backend.

## Data Flow

### Current Development Stage

```text
Next.js Page / Server Component
            ↓
   lib/ data-access helper
            ↓
      Mock Database
            ↓
        UI rendering
```

### Planned Production Architecture (Not Implemented Yet)

```text
Next.js Page / Component
            ↓
   TanStack Query (server-state management)
            ↓
      Axios (HTTP)
            ↓
 Django REST API (DRF)
            ↓
     Django ORM
            ↓
      PostgreSQL
            ↓
 response flows back: DRF → Axios → TanStack Query → UI rendering
```

Do not introduce Next.js Route Handlers or Server Actions as the primary backend; the Django REST API is the backend. Do not introduce an API layer purely for architectural appearance.

## Database Architecture

PostgreSQL is the planned persistent production data store.

The database uses a relational model because the application's core data has strong relationships between fighters, fights, events, rankings, championships, weight classes, and news.

The backend will access the database through the Django ORM, which provides:

- Database schema definition.
- Database migrations.
- Data validation.
- Relational queries.

Prisma is not used and is not part of the planned architecture.

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
During the current mock-data phase, data is managed directly in the mock database; once the backend exists, data is managed directly through PostgreSQL during development.
There is no authentication or authorization requirement for the initial public-facing version.
Administrative interfaces, authentication, and protected data-management workflows can be introduced later if the project requires them.
Rendering Strategy
Use the appropriate Next.js rendering strategy based on the nature of the page and its data.
During the current mock-data phase, pages that primarily display data-backed content should prefer server-side data fetching through `lib/` helpers. When the Django API is introduced, data fetching will move to TanStack Query as described in the Data Flow section.
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
Detail pages use the slug to retrieve the corresponding data record.
System Invariants
PostgreSQL is the source of truth for persistent MMA organization data (planned production database).
The Django REST API is the application's backend; Django owns all database access through the Django ORM.
Prisma must not be used anywhere in the project.
Client Components must not access any database directly.
The current Next.js application must not become the backend: Next.js Route Handlers and Server Actions are not the primary API/backend layer.
During the mock-data phase, data is read through server-side `lib/` helpers from `mock-database/`.
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

Mock data is temporary development data used to build and verify the UI before the Django API and PostgreSQL are connected.

All mock data must be kept separate from UI components and organized inside a dedicated mock-database/ directory.

The mock-database/ directory should contain mock data modules organized by the project's core domain entities.

Example structure:

```text
mock-database/
├── fighters.ts
├── events.ts
├── fights.ts
└── news.ts
```


The mock database should represent the same general domain structure that will later be provided by the Django REST API and PostgreSQL.
UI components and pages may consume data from the mock database during the initial UI development phase, but they must not contain the mock data definitions themselves.
The intended production data flow is:
Next.js ↓ TanStack Query + Axios ↓ Django REST API ↓ Django ORM ↓ PostgreSQL
The mock database is a temporary development layer and is not part of the production data architecture.
When the Django API is implemented, mock data should be replaced by frontend data fetching through TanStack Query + Axios against the Django REST API, without unnecessarily rewriting the UI components.
Do not introduce PostgreSQL, Prisma, or Django database queries into a feature solely because they are part of the final project stack.
Follow the current implementation phase defined in progress-tracker.md.
When the project moves from the mock-data phase to the backend phase, update the relevant context files and replace the mock database with TanStack Query + Axios calls to the Django REST API.