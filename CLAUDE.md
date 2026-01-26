# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

QR Menu App - A digital menu system for restaurants in the Limburg region. Restaurant owners can create and manage their menus, generate QR codes, and customers can scan these to view menus on their phones.

## Commands

```bash
npm run dev      # Start development server (localhost:3000)
npm run build    # Build for production
npm run lint     # Run ESLint
npm run start    # Start production server
```

## Architecture

### Tech Stack
- **Framework**: Next.js 14 (App Router)
- **Database**: Supabase (PostgreSQL with Row Level Security)
- **Payments**: Stripe
- **Styling**: Tailwind CSS
- **Language**: TypeScript

### Key Routes

| Route | Purpose |
|-------|---------|
| `/` | Landing page |
| `/login`, `/register` | Auth pages |
| `/dashboard` | Restaurant owner dashboard (menu editor, QR codes, settings) |
| `/m/[slug]` | Public menu view for customers |
| `/api/menu/[slug]` | API to fetch menu data |
| `/api/checkout` | Stripe checkout session creation |
| `/api/webhooks/stripe` | Stripe webhook handler |
| `/api/auth/callback` | Supabase auth callback |

### Database Tables (Supabase)

- `restaurants` - Restaurant profiles (linked to auth.users via `owner_id`)
- `menu_categories` - Menu categories with `position` for ordering
- `menu_items` - Individual dishes with `category_id`, `price`, `is_available`, `position`
- `subscriptions` - Stripe subscription tracking

### Supabase Client Usage

```typescript
// Server Components & API Routes
import { createClient } from '@/lib/supabase/server';
const supabase = await createClient();

// Client Components
import { createClient } from '@/lib/supabase/client';
const supabase = createClient();
```

### Type Definitions

All database types are in `src/types/database.ts`. Use these interfaces when working with Supabase queries.

## Environment Variables

Required in `.env.local`:
- `NEXT_PUBLIC_SUPABASE_URL` - Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Supabase anon/public key
- `STRIPE_SECRET_KEY` - Stripe secret key (for server-side)
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` - Stripe publishable key
- `STRIPE_WEBHOOK_SECRET` - For verifying Stripe webhooks
- `NEXT_PUBLIC_APP_URL` - Base URL of the app

## Notes

- Public menu pages (`/m/[slug]`) are accessible without authentication
- Dashboard requires authentication; redirects to login if not authenticated
- Middleware handles session refresh for all routes except static assets
- The app uses German language for UI text (target market: Limburg region)
