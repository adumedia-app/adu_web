# ADUmedia Website

## Overview

ADUmedia is an architecture news digest website that automatically publishes curated content about architecture, design, and urbanism. The system aggregates articles from various sources (via separate RSS and scraper services), stores them in Supabase, and presents them through a clean, editorial-style web interface.

The website displays daily, weekend, and weekly digest editions, each containing 5-7 curated articles with AI-generated summaries. It includes a public-facing website for readers and an admin dashboard for content management.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend (React + TypeScript)
- **Framework**: React with TypeScript, built using Vite
- **Styling**: Tailwind CSS with custom warm cream color palette and serif typography (Cormorant Garamond)
- **UI Components**: Radix UI primitives with shadcn/ui patterns
- **State Management**: TanStack React Query for server state, React Context for auth
- **Routing**: React Router for client-side navigation
- **Animations**: Framer Motion for page transitions and interactions

The frontend is a mobile-first Single Page Application designed to look like an editorial publication. Key pages include:
- Home (today's digest)
- Archive (past editions grouped by month)
- Digest detail view with article summaries
- Admin dashboard with edition/article editing

### Backend (Python FastAPI)
- **Framework**: FastAPI with Uvicorn server
- **Authentication**: JWT-based admin authentication with simple password login
- **Database Client**: Supabase Python client for all database operations
- **API Structure**: 
  - `/api/*` - Public endpoints for editions and articles
  - `/api/admin/*` - Protected admin endpoints
  - `/api/webhook/*` - Supabase webhook handlers

The backend serves both the API and static frontend files in production. It proxies requests during development via Vite's dev server.

### Data Flow
1. External services (adu_rss, adu_scrapers) collect articles and store in Supabase
2. Telegram bot (adu_telegram) publishes editions at scheduled times
3. Website reads published editions and articles from Supabase
4. Admin panel allows editing summaries and managing content

### Build & Deployment
- **Containerization**: Multi-stage Dockerfile builds frontend and serves via Python backend
- **Platform**: Configured for Railway deployment
- **Health Check**: `/api/health` endpoint for container orchestration

## External Dependencies

### Supabase (Database)
- Primary data store for editions and articles
- Tables: `editions`, `articles` (inferred from code)
- Used via `supabase-py` client library
- Supports webhook triggers for new edition notifications

### Cloudflare R2 (Image Storage)
- Stores article thumbnail images
- Public URL configured via `R2_PUBLIC_URL` environment variable
- Images referenced by `image_key` in article records

### Environment Variables Required
```
SUPABASE_URL          - Supabase project URL
SUPABASE_KEY          - Supabase API key (anon or service)
R2_PUBLIC_URL         - Cloudflare R2 public URL for images
ADMIN_PASSWORD        - Password for admin login
JWT_SECRET            - Secret for signing JWT tokens
WEBHOOK_SECRET        - Secret for authenticating Supabase webhooks
PORT                  - Server port (default: 8080)
DEBUG                 - Enable debug mode
```

### Third-Party Frontend Libraries
- `@tanstack/react-query` - Server state management
- `framer-motion` - Animations
- `lucide-react` - Icons
- `date-fns` - Date formatting
- Radix UI components - Accessible UI primitives