<div align="center">

# 🥊 MMA Organization

**A modern, premium, and aggressive mixed martial arts promotion website.**

The Ultimate Fighting League — live rankings, fighter profiles, events, news, and more.

</div>

## ✨ Features

- **🗂️ Official Rankings** — Pound-for-Pound and all seven weight divisions (Heavyweight → Bantamweight), with champions and ranking movement (up / down / new).
- **🥇 Fighter Profiles** — detailed pages for every fighter: record, nickname, nationality, height, reach, championships, and division standings.
- **🎟️ Events** — upcoming and completed events with venues, locations, and full card details.
- **📰 News** — the latest articles with dedicated article pages.
- **🏆 Champions Showcase** — champion spotlight on the home page.
- **🌙 Dark / Light Theme** — full theming support with a smooth toggle.
- **📱 Fully Responsive** — mobile-first layout with a collapsible navigation menu.

## 🛠 Tech Stack

### Core

| Layer          | Technology                                                        |
| -------------- | ----------------------------------------------------------------- |
| Framework      | [Next.js 16](https://nextjs.org) (App Router)                     |
| UI Library     | [React 19](https://react.dev)                                     |
| Language       | [TypeScript](https://www.typescriptlang.org) (strict mode)        |
| Build Tool     | [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack)  |
| Metadata / SEO | [Next.js Metadata API](https://nextjs.org/docs/app/building-your-application/optimizing/metadata) |

### Styling & UI

| Layer        | Technology                                                        |
| ------------ | ----------------------------------------------------------------- |
| Styling      | [Tailwind CSS 4](https://tailwindcss.com) + [PostCSS](https://postcss.org) |
| Components   | [shadcn/ui](https://ui.shadcn.com) + [Base UI](https://base-ui.com) (`@base-ui/react`) |
| Icons        | [lucide-react](https://lucide.dev) + [Simple Icons](https://simpleicons.org) (`simple-icons`) |
| Animation    | [tw-animate-css](https://github.com/tw-animate-css/tw-animate-css) |
| Class Helpers| [class-variance-authority](https://cva.style) + [`cn`](https://www.npmjs.com/package/cn) utility |
| Theming      | [next-themes](https://github.com/pacocoursey/next-themes) (dark / light) |
| Fonts        | [next/font](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) — Inter, Barlow Condensed, Geist Mono |

### Tooling & Dev Experience

| Layer            | Technology                                                        |
| ---------------- | ----------------------------------------------------------------- |
| Linting          | [ESLint 9](https://eslint.org) + `eslint-config-next`              |
| Code Quality     | [TypeScript](https://www.typescriptlang.org) (`strict`, path aliases `@/*`) |
| Images           | [next/image](https://nextjs.org/docs/app/api-reference/components/image) (Unsplash remote patterns configured) |
| Data Layer       | Modular `lib/` services over a typed `mock-database/`              |

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org) 18.18+ (or 20+ recommended)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/<your-username>/mma-organization.git
cd mma-organization

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📜 Available Scripts

| Command          | Description                             |
| ---------------- | --------------------------------------- |
| `npm run dev`    | Start the development server            |
| `npm run build`  | Build the application for production    |
| `npm run start`  | Start the production server             |
| `npm run lint`   | Run ESLint                              |

## 📁 Project Structure

```
mma-organization/
├── app/                  # App Router pages (routes, layouts, metadata)
│   ├── about/            # About page
│   ├── contact/          # Contact page
│   ├── events/           # Events listing + detail pages
│   ├── fighters/         # Fighters listing + detail pages
│   ├── news/             # News listing + article pages
│   └── rankings/         # Rankings page
├── components/           # Reusable UI components
│   ├── layout/           # Navbar, Footer, theme toggle, logo
│   ├── home/             # Home page sections
│   ├── ui/               # Base UI primitives (Button, etc.)
│   └── ...               # Page-specific components
├── lib/                  # Data, helpers, and business logic
├── mock-database/        # Mock data (fighters, events, fights, news)
└── public/               # Static assets
```

## 🧩 Pages

| Route          | Description                                                     |
| -------------- | --------------------------------------------------------------- |
| `/`            | Home — hero, upcoming events, P4P, champions, latest news       |
| `/rankings`    | Official P4P and divisional rankings                            |
| `/fighters`    | All fighters with searchable list                               |
| `/fighters/:slug` | Individual fighter profile                                   |
| `/events`      | Upcoming and past events                                        |
| `/events/:slug` | Event details and fight card                                   |
| `/news`        | Latest news and articles                                        |
| `/news/:slug`  | Full article view                                               |
| `/about`       | Information about the promotion, stats, and philosophy          |
| `/contact`     | Contact information and FAQ                                     |

## 🗄 Data

The application currently runs on a **mock database** located in `mock-database/`. This keeps the frontend fully functional without a real backend. The data layer is isolated in `lib/`, so swapping to a real database or API is straightforward.

Images are served from Unsplash and configured as allowed remote patterns in `next.config.ts`.

## 🌍 Deployment

The easiest way to deploy is the [Vercel Platform](https://vercel.com/new):

```bash
npm run build
```

Then connect your repository to Vercel — zero configuration required. Refer to the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for other platforms (Netlify, Docker, self-hosted, etc.).

## 🤝 Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a pull request

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

<div align="center">
  <sub>Built with ❤️ and a lot of fight nights.</sub>
</div>