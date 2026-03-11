# Shipment Tracker — Logistics OS

A real-time shipment tracking dashboard built with **Next.js 14**, **Redux Toolkit**, **Tailwind CSS**, and **Recharts**. Features a premium dark UI inspired by Bloomberg Terminal aesthetics — deep navy backgrounds, electric cyan accents, monospace typography, and ambient glow effects.

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)
![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-2.x-764ABC?style=flat-square&logo=redux)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-06B6D4?style=flat-square&logo=tailwindcss)
![Recharts](https://img.shields.io/badge/Recharts-3.x-22B5BF?style=flat-square)

---

## Table of Contents

- [Overview](#overview)
- [Design Philosophy](#design-philosophy)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Routing & Pages](#routing--pages)
- [State Management](#state-management)
- [Data Model](#data-model)
- [Components](#components)
- [Custom Hooks](#custom-hooks)
- [Utilities](#utilities)
- [Theming & Styling](#theming--styling)
- [Build & Deployment](#build--deployment)

---

## Overview

Shipment Tracker is a logistics management dashboard that enables users to:

- **Monitor** all shipments at a glance via KPI stat cards
- **Filter** shipments by status (In Transit, Delayed, Delivered, Pending) and carrier
- **Search** by shipment ID, origin, or destination
- **Inspect** individual shipments via a slide-in detail panel or a dedicated detail page
- **Visualize** analytics — weekly delivery trends, status distribution, and carrier on-time performance
- **Track routes** on an animated SVG world map with pulsing origin/destination indicators

The app ships with **15 mock shipment records** across **8 global carriers** (Maersk, MSC, CMA CGM, Hapag-Lloyd, COSCO, Evergreen, ONE, Yang Ming).

---

## Design Philosophy

**"Deep navy + electric cyan — industrial precision with a premium SaaS feel."**

| Element | Detail |
|---|---|
| **Background** | `#080C14` — near-black navy |
| **Card surfaces** | `#0F172A` with `#1A2740` borders |
| **Sidebar** | `#0B1120` with cyan-highlighted active states |
| **Accent color** | `#00D4FF` — electric cyan used for links, badges, glows, and charts |
| **Status palette** | Cyan (In Transit), Red (Delayed), Emerald (Delivered), Amber (Pending) |
| **Body font** | [DM Mono](https://fonts.google.com/specimen/DM+Mono) — monospace for a terminal feel |
| **Heading font** | [Syne](https://fonts.google.com/specimen/Syne) — geometric bold headings |
| **Animations** | Pulse dots on "In Transit" badges, slide-in detail panel, radial glow on KPI cards, animated route on map |

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | [Next.js 14](https://nextjs.org/) (App Router) |
| UI Library | [React 18](https://react.dev/) |
| State Management | [Redux Toolkit](https://redux-toolkit.js.org/) + [React Redux](https://react-redux.js.org/) |
| Styling | [Tailwind CSS 3.4](https://tailwindcss.com/) with custom theme |
| Charts | [Recharts 3](https://recharts.org/) (BarChart, PieChart) |
| Fonts | Google Fonts (DM Mono, Syne) via CSS `@import` |
| Linting | ESLint with `eslint-config-next` |

---

## Getting Started

### Prerequisites

- **Node.js** ≥ 18
- **npm** ≥ 9

### Installation

```bash
# Clone the repository
git clone <repo-url>
cd shipment-tracker

# Install dependencies
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — the app will redirect to `/dashboard`.

### Production Build

```bash
npm run build
npm start
```

### Linting

```bash
npm run lint
```

---

## Project Structure

```
shipment-tracker/
├── app/                              # Next.js App Router
│   ├── layout.js                     # Root layout — fonts, metadata, ReduxProvider
│   ├── page.js                       # Home (redirects → /dashboard)
│   ├── globals.css                   # Global styles, animations, glow utilities
│   └── dashboard/
│       ├── layout.jsx                # Dashboard shell — Sidebar + Navbar + content
│       ├── page.jsx                  # Main dashboard — KPIs, filters, table, detail panel
│       ├── analytics/
│       │   └── page.jsx              # Analytics — charts loaded via next/dynamic (SSR disabled)
│       └── shipments/
│           └── [id]/
│               └── page.jsx          # Shipment detail — info card, timeline, SVG route map
│
├── components/
│   ├── ReduxProvider.jsx              # "use client" wrapper for <Provider store={store}>
│   ├── layout/
│   │   ├── Sidebar.jsx                # Navigation, logo, collapsible on mobile
│   │   ├── Navbar.jsx                 # Live indicator, notifications, avatar, hamburger
│   │   └── ThemeToggle.jsx            # Dark/light theme toggle button
│   ├── dashboard/
│   │   ├── StatsCard.jsx              # KPI card with icon, radial glow background
│   │   ├── FilterBar.jsx              # Status + carrier dropdown filters
│   │   ├── SearchBar.jsx              # Text search input
│   │   ├── ShipmentTable.jsx          # Paginated table wrapper
│   │   ├── ShipmentRow.jsx            # Clickable row — opens detail panel on click
│   │   ├── StatusBadge.jsx            # Colored pill with animated pulse dot
│   │   └── DetailPanel.jsx            # Slide-in panel — progress bar, ETA, timeline
│   ├── shipment/
│   │   ├── ShipmentDetails.jsx        # All shipment fields + ETA countdown
│   │   ├── ShipmentTimeline.jsx       # Step-by-step timeline with glowing cyan dots
│   │   └── ShipmentMap.jsx            # SVG world map with animated route + pulsing dots
│   └── analytics/
│       ├── DeliveryChart.jsx          # Recharts BarChart — weekly deliveries
│       ├── StatusPieChart.jsx         # Recharts donut — status distribution
│       └── CarrierPerformance.jsx     # Recharts BarChart + data table — on-time %
│
├── data/
│   └── mockShipments.js               # 15 shipment records with full timeline data
│
├── hooks/
│   ├── useShipments.js                # Filtering, pagination, stats computation
│   └── useTheme.js                    # Theme state + DOM class toggle
│
├── store/
│   ├── index.js                       # configureStore with shipments + ui slices
│   └── slices/
│       ├── shipmentsSlice.js          # Shipment data, filters, pagination, selection
│       └── uiSlice.js                 # Theme toggle, sidebar collapse
│
├── utils/
│   ├── constants.js                   # STATUS_LIST, CARRIERS, PAGE_SIZE
│   ├── formatDate.js                  # formatDate(), formatShortDate(), daysRemaining()
│   └── statusHelpers.js              # getStatusColor(), getStatusDot(), getStatusGlow()
│
├── tailwind.config.js                 # Custom navy/cyan colors, fonts, animations
├── postcss.config.mjs                 # PostCSS with Tailwind plugin
├── jsconfig.json                      # @/* path alias
├── next.config.mjs                    # Next.js config
└── package.json                       # Dependencies & scripts
```

---

## Routing & Pages

| Route | Page | Description |
|---|---|---|
| `/` | `app/page.js` | Server-side redirect to `/dashboard` |
| `/dashboard` | `app/dashboard/page.jsx` | Main dashboard with 4 KPI cards, filter/search bar, paginated shipment table, and slide-in detail panel |
| `/dashboard/analytics` | `app/dashboard/analytics/page.jsx` | Three analytical charts — weekly deliveries, status pie, carrier performance (loaded client-side via `next/dynamic`) |
| `/dashboard/shipments/[id]` | `app/dashboard/shipments/[id]/page.jsx` | Dynamic route — breadcrumb nav, shipment detail card, tracking timeline, animated SVG route map |

### Layout Hierarchy

```
app/layout.js                         ← Root: fonts, metadata, ReduxProvider
  └── app/dashboard/layout.jsx         ← Dashboard shell: Sidebar + Navbar
        ├── /dashboard                 ← KPI + Table + DetailPanel
        ├── /dashboard/analytics       ← Charts
        └── /dashboard/shipments/[id]  ← Detail Page
```

---

## State Management

State is managed with **Redux Toolkit** via two slices:

### Shipments Slice (`store/slices/shipmentsSlice.js`)

```
state.shipments = {
  shipments: [...],         // All 15 mock records (loaded at init)
  filters: {
    status: "All",          // "All" | "In Transit" | "Delayed" | "Delivered" | "Pending"
    carrier: "All",         // "All" | "Maersk" | "MSC" | ...
    searchQuery: "",        // Free-text search
  },
  selectedShipment: null,   // Currently selected shipment object
  currentPage: 1,           // Active pagination page
}
```

**Actions**: `setStatusFilter`, `setCarrierFilter`, `setSearchQuery`, `setSelectedShipment`, `setCurrentPage`

### UI Slice (`store/slices/uiSlice.js`)

```
state.ui = {
  theme: "dark",            // "dark" | "light"
  sidebarOpen: true,        // Sidebar expanded or collapsed
}
```

**Actions**: `toggleTheme`, `setTheme`, `toggleSidebar`, `setSidebarOpen`

---

## Data Model

Each shipment record (`data/mockShipments.js`) has the following shape:

```javascript
{
  id: "SHP-20481",                            // Unique identifier
  origin: "Shanghai, CN",                     // Origin port/city
  destination: "Mumbai, IN",                  // Destination port/city
  carrier: "Maersk",                          // Shipping line
  status: "In Transit",                       // Current status
  eta: "2024-03-18",                          // Estimated arrival (YYYY-MM-DD)
  dispatchDate: "2024-03-10",                 // Dispatch date (YYYY-MM-DD)
  weight: "2400 kg",                          // Cargo weight
  container: "FCL 20ft",                      // Container type (FCL 20ft, FCL 40ft, LCL)
  timeline: [                                 // 5-step tracking timeline
    { step: "Order Placed",       date: "Mar 10", done: true  },
    { step: "Picked Up",          date: "Mar 11", done: true  },
    { step: "In Transit",         date: "Mar 12", done: true  },
    { step: "Customs Clearance",  date: "Mar 15", done: false },
    { step: "Delivered",          date: "Mar 18", done: false },
  ]
}
```

**Status values**: `In Transit`, `Delayed`, `Delivered`, `Pending`

**Carriers**: Maersk, MSC, CMA CGM, Hapag-Lloyd, COSCO, Evergreen, ONE, Yang Ming

---

## Components

### Layout

| Component | Description |
|---|---|
| **Sidebar** | Fixed left navigation with logo ("Shipment Tracker"), nav links (Dashboard, Analytics) with SVG icons, active state highlighted in cyan, collapsible on mobile, footer reads "Logistics OS v2.1" |
| **Navbar** | Sticky top bar with backdrop blur, hamburger toggle for mobile sidebar, animated "Live" indicator with ping effect, notification bell with cyan badge, user avatar |
| **ThemeToggle** | Sun/moon icon button to toggle dark/light mode |

### Dashboard

| Component | Description |
|---|---|
| **StatsCard** | KPI card showing a metric value with icon. Supports `cyan`, `amber`, `red`, `green` color variants. Each card has a radial glow background effect matching its color |
| **FilterBar** | Two `<select>` dropdowns — filter by status and carrier. Navy-styled with cyan focus rings |
| **SearchBar** | Text input with search icon. Searches across shipment ID, origin, and destination |
| **ShipmentTable** | Renders header row + paginated `ShipmentRow` components. Accepts `selectedId` and `onSelectShipment` for row selection. Pagination controls at bottom |
| **ShipmentRow** | Table row displaying ID (cyan), origin → destination, carrier, status badge, ETA, and container. Clicking a row opens the detail panel. Selected row gets a cyan left border |
| **StatusBadge** | Pill-shaped badge with status-specific colors. "In Transit" status shows an animated pulsing dot |
| **DetailPanel** | Slide-in panel from the right edge. Shows shipment progress bar (gradient fill), ETA countdown, metadata grid, step-by-step timeline, and a "View Full Details →" link. Has closing animation |

### Shipment Detail

| Component | Description |
|---|---|
| **ShipmentDetails** | Card displaying all shipment fields in a 2-column grid. Shipment ID is highlighted in cyan. Includes an ETA countdown box (days remaining / arriving today / overdue) |
| **ShipmentTimeline** | Vertical timeline with connected dots. Completed steps have glowing cyan dots with a box-shadow effect. Incomplete steps are muted |
| **ShipmentMap** | SVG world map with simplified continent outlines. An animated dashed route line connects origin (green pulsing dot) to destination (cyan pulsing dot). A moving dot animates along the route path |

### Analytics

| Component | Description |
|---|---|
| **DeliveryChart** | Recharts `BarChart` — weekly delivery counts for the last 4 weeks. Cyan bars on navy background |
| **StatusPieChart** | Recharts `PieChart` (donut) — shipment count per status. Colors: cyan (In Transit), red (Delayed), emerald (Delivered), amber (Pending) |
| **CarrierPerformance** | Recharts `BarChart` showing on-time delivery rate per carrier (emerald bars) + a data table below with carrier name, total shipments, delivered count, and on-time percentage |

---

## Custom Hooks

### `useShipments()`

Central hook for all shipment data needs. Returns:

| Property | Type | Description |
|---|---|---|
| `filtered` | `Array` | Shipments after applying status, carrier, and search filters |
| `paginated` | `Array` | Current page slice (10 items per page) |
| `stats` | `Object` | `{ total, inTransit, delayed, delivered, pending }` |
| `totalPages` | `Number` | Total pagination pages |
| `currentPage` | `Number` | Active page number |

Filtering and stat computation use `useMemo` for performance.

### `useTheme()`

| Property | Type | Description |
|---|---|---|
| `theme` | `String` | Current theme (`"dark"` or `"light"`) |
| `toggle` | `Function` | Toggles theme and persists to localStorage |

Syncs the `dark` class on `<html>` element for Tailwind dark mode.

---

## Utilities

### `constants.js`

| Export | Value |
|---|---|
| `STATUSES` | Object with status string constants |
| `STATUS_LIST` | `["All", "In Transit", "Delayed", "Delivered", "Pending"]` |
| `CARRIERS` | `["All", "Maersk", "MSC", "CMA CGM", ...]` (9 entries) |
| `PAGE_SIZE` | `10` |

### `formatDate.js`

| Function | Input → Output |
|---|---|
| `formatDate(dateStr)` | `"2024-03-18"` → `"Mar 18, 2024"` |
| `formatShortDate(dateStr)` | `"2024-03-18"` → `"Mar 18"` |
| `daysRemaining(etaStr)` | Returns days until ETA (negative = overdue) |

### `statusHelpers.js`

| Function | Returns |
|---|---|
| `getStatusColor(status)` | Tailwind classes for badge background, text, and border |
| `getStatusDot(status)` | Single Tailwind color class for the indicator dot |
| `getStatusGlow(status)` | Custom CSS class name for radial glow effect |

---

## Theming & Styling

### Tailwind Configuration

The project extends Tailwind with a custom theme in `tailwind.config.js`:

**Dark Mode**: Class-based (`darkMode: "class"`)

**Custom Colors**:
```
navy-950: #080C14    (main background)
navy-900: #0B1120    (sidebar, header)
navy-800: #0F172A    (card surfaces)
navy-700: #1A2740    (borders)
navy-600: #243352    (hover borders)
navy-500: #2E4066    (subtle accents)
cyan-400: #00D4FF    (primary accent)
cyan-500: #00BCD4    (hover state)
cyan-600: #0097A7    (active state)
```

**Custom Animations**: `pulse-slow` (3s), `slide-in` (0.3s), `slide-out` (0.3s), `glow` (2s)

### Global CSS Highlights

- **Custom scrollbar**: Thin navy scrollbar with cyan thumb on hover
- **Glow utilities**: `.glow-cyan`, `.glow-red`, `.glow-green`, `.glow-amber` — colored box-shadow classes
- **Radial glow backgrounds**: `.radial-glow-cyan`, `.radial-glow-red`, etc. — radial gradient overlays for KPI cards
- **Selection styling**: Text selection uses cyan background
- **Slide animations**: `.detail-panel` and `.detail-panel-closing` for the slide-in/out effect
- **Row selection**: `.shipment-row` hover and `.shipment-row.selected` cyan left border + subtle glow

---

## Build & Deployment

### Build Output

```
Route (app)                              Size     First Load JS
┌ ○ /                                    138 B          87.7 kB
├ ○ /_not-found                          873 B          88.4 kB
├ ○ /dashboard                           4.04 kB         113 kB
├ ○ /dashboard/analytics                 1.39 kB        88.9 kB
└ ƒ /dashboard/shipments/[id]            2.89 kB         101 kB

○  (Static)   prerendered as static content
ƒ  (Dynamic)  server-rendered on demand
```

### Deploy on Vercel

The easiest way to deploy is via the [Vercel Platform](https://vercel.com/new):

1. Push the repository to GitHub
2. Import the project on Vercel
3. Vercel auto-detects Next.js — no config needed
4. Deploy

For other platforms, see the [Next.js deployment docs](https://nextjs.org/docs/deployment).

---

## Scripts

```bash
npm run dev       # Start development server (http://localhost:3000)
npm run build     # Create optimized production build
npm start         # Serve the production build
npm run lint      # Run ESLint checks
```

---

## License

This project is private and not licensed for redistribution.
