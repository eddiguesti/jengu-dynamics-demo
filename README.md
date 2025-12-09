# Jengu Demo - Dynamic Pricing for Campsites

Interactive demo showcasing AI-powered dynamic pricing for hospitality businesses.

**Live Demo**: [demo.jengu.com](https://demo.jengu.com)

## Features

- **Revenue Dashboard** - See how dynamic pricing boosts revenue by 30%+
- **Price Optimization** - AI-powered pricing recommendations
- **Competitor Monitoring** - Track competitor prices in real-time
- **Weather Impact Analysis** - See how weather affects bookings
- **Guided Tour** - Interactive walkthrough of all features

## Quick Start

```bash
# Install dependencies
pnpm install

# Start development server
pnpm run dev

# Build for production
pnpm run build
```

## Deploy to Vercel

1. Push to GitHub
2. Connect repo to Vercel
3. Deploy (auto-detects Vite)

Or deploy directly:

```bash
npx vercel --prod
```

## Tech Stack

- **React 18** + TypeScript
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Recharts** - Data visualization
- **React Query** - Data management

## Environment Variables

Copy `.env.example` to `.env` (not needed for demo mode):

```bash
cp .env.example .env
```

All data is mocked - no backend required.

## Project Structure

```
src/
├── components/     # UI components
│   ├── ui/        # Base components (Button, Card, etc.)
│   ├── layout/    # Layout components (Sidebar, etc.)
│   └── dashboard/ # Dashboard-specific components
├── pages/         # Route pages
├── hooks/         # Custom React hooks
├── stores/        # Zustand state stores
├── lib/           # Utilities and services
│   ├── api/       # API services (mocked)
│   └── mockData.ts # Demo data
└── contexts/      # React contexts
```

## License

Proprietary - Jengu SAS

---

**Book a free call**: [calendly.com/jengu/demo](https://calendly.com/jengu/demo)

*You don't pay unless you make more money.*
