# Amazing Hauling of North Florida

A professional website for Amazing Hauling of North Florida, built on **Payload CMS 3.x**, **Next.js 15**, **MongoDB Atlas**, and **TailwindCSS** with strict **Atomic Design** architecture.

## Architecture

### Atomic Design Hierarchy

```
Pages → Templates → Organisms → Molecules → Atoms
```

- **Atoms**: Pure UI primitives (Button, Heading, Text, Image, Icon, Input, TextArea, Select, Label, Badge, Logo, Divider, Container)
- **Molecules**: Composed of Atoms only (NavLink, ServiceCard, StatItem, FormField, ContactInfoItem, ProjectCard, ValueCard, CTAButtonGroup, AreaCard, MetricDisplay, FooterColumn)
- **Organisms**: Composed of Molecules only — NO Atoms (Header, Footer, HeroSection, ServicesGrid, StatsBar, ProjectShowcase, ValueProposition, CTABanner, FleetSection, ServiceAreasList, QuoteRequestForm, ContentSection)
- **Templates**: Composed of Organisms only — NO Atoms (HomeTemplate, ServicesTemplate, ProjectsTemplate, AboutTemplate, ServiceAreasTemplate, SubcontractorTemplate, ContactTemplate, SEOCityTemplate)
- **Pages**: Next.js App Router pages that pass content data to Templates

### Strict Separation

- **Content**: Lives in Payload CMS collections/globals (MongoDB Atlas) and is passed as props through the page layer
- **Components**: Pure presentational React components with no inline styles
- **Styling**: Centralized in `/src/styles/` — design tokens, animations, and component styles organized by atomic level

### Centralized Styling

All styles are defined in `src/styles/`:
- `tokens.css` — Design tokens (colors, typography, spacing, shadows, transitions)
- `animations.css` — Scroll-triggered animations, hero animations, card lifts, parallax, gold accent lines, pulse glow
- `atoms.css` — Atom-level styles
- `molecules.css` — Molecule-level styles
- `organisms.css` — Organism-level styles
- `templates.css` — Template/layout styles
- `globals.css` — Imports all above + Tailwind + base reset

### On-Brand Animations

- **Section reveals**: Fade-up, fade-down, fade-left, fade-right, scale-in, slide-reveal
- **Staggered children**: Sequential reveal of grid items
- **Hero animations**: Title, subtitle, and CTA entrance animations
- **Gold accent lines**: Animated underlines on section headings
- **Card lift**: Hover elevation + shadow on cards
- **Image zoom**: Subtle zoom on hover for image containers
- **Pulse glow**: CTA button attention animation
- **Counter animation**: Stats bar number reveals
- **Draw line**: Animated divider expansion
- All animations respect `prefers-reduced-motion`

## Tech Stack

- **CMS**: Payload CMS 3.x
- **Framework**: Next.js 15 (App Router)
- **Database**: MongoDB Atlas
- **Styling**: TailwindCSS + Custom CSS design tokens
- **Icons**: Lucide React
- **Language**: TypeScript

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB Atlas account (or local MongoDB)

### Setup

1. Clone the repository
2. Copy environment variables:
   ```bash
   cp .env.example .env
   ```
3. Update `.env` with your MongoDB Atlas connection string and Payload secret
4. Install dependencies:
   ```bash
   npm install
   ```
5. Start the development server:
   ```bash
   npm run dev
   ```
6. Visit `http://localhost:3000` for the frontend
7. Visit `http://localhost:3000/admin` for the Payload CMS admin panel

### First Admin User

On first visit to `/admin`, you'll be prompted to create an admin user account.

## Pages

| Route | Page | Template |
|-------|------|----------|
| `/` | Homepage | HomeTemplate |
| `/services` | Services | ServicesTemplate |
| `/projects` | Projects & Gallery | ProjectsTemplate |
| `/about` | About Us | AboutTemplate |
| `/service-areas` | Service Areas | ServiceAreasTemplate |
| `/subcontractor-resources` | Subcontractor Resources | SubcontractorTemplate |
| `/contact` | Contact & Quote | ContactTemplate |
| `/areas/[slug]` | SEO City Pages | SEOCityTemplate |

### SEO City Pages

- `/areas/jacksonville` — Jacksonville Dump Truck Hauling
- `/areas/fernandina-beach` — Dirt Hauling in Fernandina Beach
- `/areas/orange-park` — Dump Truck Services in Orange Park
- `/areas/st-augustine` — Aggregate Hauling in St. Augustine
- `/areas/yulee` — Dump Truck Hauling in Yulee

## Payload CMS Collections

- **Pages** — General page content
- **Services** — Hauling service types
- **Projects** — Project portfolio
- **Service Areas** — Geographic regions served
- **SEO Pages** — City-specific landing pages
- **Media** — Images and documents
- **Form Submissions** — Quote request leads
- **Subcontractor Applications** — Partner applications

## Brand Colors

| Token | Hex | Usage |
|-------|-----|-------|
| Navy | `#0A1628` | Primary dark, headings |
| Blue | `#1B3A5C` | Secondary dark |
| Gold | `#D4A843` | Primary accent, CTAs |
| Orange | `#E87C2E` | Secondary accent |
| Off-White | `#F5F3EF` | Alternate backgrounds |
