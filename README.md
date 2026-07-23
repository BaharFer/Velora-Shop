# VELORA — Premium Fashion E-Commerce Frontend

A portfolio-quality, award-style frontend for a fictional luxury fashion brand, **VELORA**. Built with React, Vite, Tailwind CSS, Framer Motion, and GSAP ScrollTrigger.

## Tech Stack

- **React 18** + **Vite 5** — fast dev server & build
- **React Router v6** — client-side routing across all pages
- **Tailwind CSS 3** — utility-first styling with custom brand tokens
- **Framer Motion** — UI micro-interactions, page transitions, hover states
- **GSAP + ScrollTrigger** — cinematic scroll-driven hero animation
- **lucide-react** — icon set

## Design Tokens

| Role | Value |
|---|---|
| Primary (Ink) | `#111111` |
| Secondary (Parchment) | `#E8DED0` |
| Accent (Champagne) | `#D4AF37` |
| Background (Canvas) | `#FAF8F5` |
| Body text | `#222222` |
| Display font | Cormorant (serif) |
| UI / body font | Inter |

## Getting Started

**Requirements:** Node.js 18+ and npm.

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server
npm run dev

# 3. Open the app
# Vite will print a local URL, typically http://localhost:5173
```

### Build for production

```bash
npm run build
npm run preview   # preview the production build locally
```

The production build is emitted to `dist/`.

## Project Structure

```
velora-vite/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── src/
│   ├── main.jsx              # App entry, router setup
│   ├── App.jsx                # Route definitions, layout shell
│   ├── index.css              # Tailwind directives + global styles
│   ├── context/
│   │   └── StoreContext.jsx   # Cart + wishlist state, localStorage persistence
│   ├── data/
│   │   └── products.js        # Product & category seed data
│   ├── components/
│   │   ├── Header.jsx         # Responsive nav, search overlay, mobile menu
│   │   ├── Footer.jsx
│   │   ├── Hero.jsx           # GSAP ScrollTrigger wardrobe-opening hero
│   │   ├── ProductCard.jsx    # Reusable product card w/ hover interactions
│   │   ├── CartDrawer.jsx     # Slide-in cart drawer
│   │   ├── Toast.jsx          # Toast notifications
│   │   ├── PageLoader.jsx     # Intro loading animation
│   │   └── Ui.jsx             # Eyebrow, StarRating, PriceTag primitives
│   └── pages/
│       ├── Home.jsx           # Hero + featured collections + showcase + newsletter
│       ├── Shop.jsx           # Filterable/sortable product grid
│       ├── ProductDetail.jsx  # Gallery, variant selection, related products
│       ├── Wishlist.jsx
│       ├── Checkout.jsx       # 3-step checkout + confirmation
│       ├── Login.jsx
│       ├── Register.jsx
│       ├── Profile.jsx        # Account info + order history
│       └── NotFound.jsx
```

## Features

- Cinematic GSAP-powered hero: a wardrobe "opens" on scroll, garments float out with parallax and a subtle camera dolly-in
- Fully responsive, mobile-first layout
- Cart and wishlist persisted to `localStorage`
- Shop page with search, category filters, price range, and sorting
- Product detail page with gallery, color/size selection, and quantity stepper
- Multi-step checkout UI (info → shipping → payment → confirmation)
- Login / Register / Profile (order history) frontend flows
- Page transition animations and a branded loading intro
- Respects `prefers-reduced-motion`

## Notes

- All product imagery is sourced from Unsplash placeholder URLs — swap in real product photography for production use.
- Checkout, login, and payment forms are **frontend-only** (no backend, no real payment processing).
- Cart/wishlist state is local to the browser via `localStorage`; there is no server-side persistence or user accounts.

## License

This is a portfolio/demo project. Replace brand assets and imagery before any commercial use.
