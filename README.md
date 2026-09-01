# Coffeeland FC ⚽

Football Academy website for **Coffeeland FC**, Chikkamagaluru's premier KSFA-affiliated football club.

A clean, modern app with a **Next.js frontend** and a **Bun backend** (SQLite), themed around the club logo (green `#1B5E20` + gold `#D4AF37`).

## Project Structure

```
coffeelandfc/
├── frontend/               # Next.js 16 (React 19) UI
│   ├── app/
│   │   ├── layout.js       # Root layout (Navbar + Footer + logo background)
│   │   ├── globals.css     # Design system (logo colors, animations)
│   │   ├── page.js         # Home
│   │   ├── about/page.js   # About
│   │   ├── academy/page.js # Academy
│   │   ├── contact/page.js # Contact
│   │   ├── events/page.js  # Events
│   │   ├── news/page.js    # News
│   │   ├── sponsors/page.js# Sponsors
│   │   └── components/     # Navbar + Footer
│   ├── public/             # Static assets (logo, images)
│   └── next.config.mjs     # Proxies /api/* -> backend
│
├── backend/                # Bun server (SQLite)
│   ├── server.js           # API: /api/register, /api/contact, /api/students
│   ├── package.json
│   └── data/               # SQLite database
│
└── package.json            # Root scripts to run both
```

## Requirements

- **Node.js** 18+
- **Bun** (latest) — for the backend

## Getting Started

```bash
# 1. Install all dependencies
bun run install:all

# 2. Run both frontend + backend together
bun run dev
```

- Frontend: http://localhost:3000
- Backend:  http://localhost:4000

Or run them separately:

```bash
bun run dev:backend    # Backend on :4000
bun run dev:frontend   # Frontend on :3000
```

## API Endpoints

| Method | Endpoint          | Description                    |
|--------|-------------------|--------------------------------|
| GET    | `/api/health`     | Health check                   |
| POST   | `/api/register`   | Register a student             |
| POST   | `/api/contact`    | Submit a contact form message  |
| GET    | `/api/students`   | List registered students       |

## Build

```bash
bun run build   # Production build of the frontend
```
