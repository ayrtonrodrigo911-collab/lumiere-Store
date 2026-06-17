# Lumière — Premium Women's Fashion E-Commerce

> *Quiet elegance in every interaction.*

A mobile-first premium fashion e-commerce app designed with a clean, editorial aesthetic inspired by Zara, COS, and Totême. Built with React and Next.js, prototyped with Google Stitch.

---

## ✦ Overview

**Lumière** is a high-end women's fashion store experience focused on minimalism, editorial photography, and a refined shopping journey. Every screen is designed to feel like a luxury fashion magazine — white space, serif typography, and sharp black CTAs.

This repository contains the frontend implementation migrated from Google Stitch prototypes into a production-ready React + Next.js application.

---

## ✦ Screens

| Screen | Description |
|---|---|
| **Home Lookbook** | Editorial hero banner, curated collections grid |
| **Collection Listing** | Filterable product grid with editorial photography |
| **Product Details** | Large imagery, size selector, "Add to Bag" CTA, "Complete the Look" |
| **My Wishlist** | Saved items list with move-to-bag and remove actions |
| **Profile / My Account** | Full customer dashboard — orders, tracking, addresses, cards, points |

### Profile dashboard includes:
- Order history with status labels and filter tabs
- Order tracking with vertical milestone timeline (Correios integration)
- Saved addresses manager
- Payment methods (add/remove cards)
- Wishlist sync
- Notification preferences
- Security & password settings
- **Lumière Points** — loyalty program with tiers and points history

---

## ✦ Tech Stack

![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat&logo=tailwindcss&logoColor=white)
![Google Stitch](https://img.shields.io/badge/Google_Stitch-4285F4?style=flat&logo=google&logoColor=white)

| Layer | Technology |
|---|---|
| Framework | Next.js (App Router) |
| UI Library | React |
| Styling | Tailwind CSS / CSS Modules |
| Language | TypeScript |
| Prototyping | Google Stitch |
| Design | Figma |
| Version Control | Git + GitHub |

---

## ✦ Design Identity

Lumière follows a strict visual language across all screens:

```
Background    →  #FFFFFF / #FAFAF8  (white / off-white)
Primary text  →  #111111            (near black)
Secondary     →  #888888            (medium gray)
Borders       →  0.5px #E0E0E0      (ultra-thin light gray)
CTA buttons   →  #000000 filled     (sharp rectangle, no border-radius)
Typography    →  Serif (headlines) + Sans-serif light (body)
Border-radius →  0px everywhere     (no rounded corners)
```

**Design principles:**
- No gradients. No drop shadows. No rounded corners.
- No colored accents. Pure black and white palette.
- Editorial photography on neutral backgrounds.
- Generous whitespace — every section breathes.
- Inputs use underline-only style (no box borders).

---

## ✦ Project Structure

```
lumiere/
├── app/
│   ├── page.tsx                  # Home Lookbook
│   ├── shop/
│   │   └── page.tsx              # Collection Listing
│   ├── product/
│   │   └── [slug]/page.tsx       # Product Details
│   ├── wishlist/
│   │   └── page.tsx              # My Wishlist
│   └── account/
│       ├── page.tsx              # Profile Overview
│       ├── orders/page.tsx       # Order History
│       ├── tracking/page.tsx     # Order Tracking
│       ├── addresses/page.tsx    # Saved Addresses
│       ├── payment/page.tsx      # Payment Methods
│       ├── notifications/page.tsx
│       ├── security/page.tsx
│       └── points/page.tsx       # Lumière Points
├── components/
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Divider.tsx
│   │   └── StatusLabel.tsx
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   └── BottomNav.tsx
│   ├── product/
│   │   ├── ProductCard.tsx
│   │   └── ProductGrid.tsx
│   └── account/
│       ├── OrderCard.tsx
│       ├── TrackingTimeline.tsx
│       ├── AddressCard.tsx
│       └── PaymentCard.tsx
├── public/
│   └── images/
├── styles/
│   └── globals.css
└── README.md
```

---

## ✦ Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/ayrtonrodrigo911-collab/lumiere-Store.git

# Navigate into the project
cd lumiere-editorial

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for production

```bash
npm run build
npm start
```

---

## ✦ Roadmap

- [x] Home Lookbook screen
- [x] Collection Listing screen
- [x] Product Details screen
- [x] My Wishlist screen
- [x] Profile / My Account screen
- [ ] Migrate Stitch prototypes to React components
- [ ] Implement routing with Next.js App Router
- [ ] Integrate cart state management
- [ ] Connect Correios tracking API
- [ ] Payment gateway integration
- [ ] Authentication (NextAuth.js)
- [ ] CMS integration for product catalog

---

## ✦ Screenshots

> Screens designed in Google Stitch and Figma.

| Home Lookbook | Collection | Product Details | Profile |
|---|---|---|---|
| *(screenshot)* | *(screenshot)* | *(screenshot)* | *(screenshot)* |

---

## ✦ License

This project is for portfolio and educational purposes.

---

<p align="center">
  <em>Lumière — Eternizing moments with quiet elegance.</em>
</p>

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`
