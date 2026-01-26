# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

QR Menu App - A SaaS digital menu system for restaurants in the Limburg region (Germany). Restaurant owners create and manage menus, generate QR codes, and customers scan these to view menus on their phones. All UI text is in German.

## Commands

```bash
npm run dev      # Start development server (localhost:3000)
npm run build    # Build for production
npm run lint     # Run ESLint
npm run start    # Start production server
```

## Architecture

### Tech Stack
- **Framework**: Next.js 14 (App Router, no pages directory)
- **Database**: Supabase (PostgreSQL with Row Level Security)
- **Payments**: Stripe (checkout sessions, webhooks)
- **Styling**: Tailwind CSS (emerald-500 primary color)
- **PDF**: jspdf for table tent generation
- **QR Codes**: qrcode.react

### Route Structure

| Route | Purpose |
|-------|---------|
| `/` | Landing page (public) |
| `/login`, `/register` | Auth pages (redirect to dashboard if authenticated) |
| `/dashboard` | Protected owner dashboard (menu editor, QR codes, settings) |
| `/m/[slug]` | Public menu view for customers |
| `/api/menu/[slug]` | GET menu data |
| `/api/checkout` | POST creates Stripe checkout session |
| `/api/webhooks/stripe` | POST handles subscription events |
| `/api/track-scan` | POST tracks QR code scans |
| `/api/auth/callback` | Supabase OAuth callback |

### Database Schema

**Tables:**
- `restaurants` - owner_id, slug (unique), name, address, phone, logo_url, is_active
- `menu_categories` - restaurant_id, name, position (for ordering)
- `menu_items` - category_id, name, description, price, is_available, position, allergens (string[])
- `menu_scans` - restaurant_id, scanned_at, user_agent, referrer
- `subscriptions` - user_id, plan ('free'/'basic'), stripe_customer_id, status

**RLS Patterns:**
- Users can only manage their own restaurants/categories/items
- Public SELECT allowed on restaurants (by slug), categories, and items
- Stripe webhooks use service role key to bypass RLS

### Supabase Client Usage

```typescript
// Client Components (browser)
import { createClient } from '@/lib/supabase/client';
const supabase = createClient();

// Server Components & API Routes (await required)
import { createClient } from '@/lib/supabase/server';
const supabase = await createClient();
```

The middleware (`src/middleware.ts`) automatically refreshes auth sessions and handles redirects.

### Key Patterns

**Allergen System**: 14 EU allergens defined in `/lib/allergens.ts` with German labels and emoji icons. Menu items store allergen IDs as string arrays.

**URL Generation**: Use `getMenuUrl(slug)` from `/lib/utils.ts` for consistent menu URLs. Respects `NEXT_PUBLIC_APP_URL` env var.

**Price Formatting**: Use `formatPrice(price)` for German locale EUR formatting.

**Subscription/Watermark Logic**: Free plans show watermark on public menu; 'basic' plan (9.99€/month) removes it.

**Timestamp Updates**: When modifying menu items/categories, call `updateRestaurantTimestamp()` to keep `updated_at` current.

## Environment Variables

Required in `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY      # Required for webhooks and scan tracking
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
STRIPE_SECRET_KEY
STRIPE_WEBHOOK_SECRET
STRIPE_PRICE_ID                # Stripe price ID for basic plan
NEXT_PUBLIC_APP_URL            # Production URL for QR codes
```

## Database Migrations

SQL migrations are in `supabase/migrations/`. Run them directly in Supabase SQL Editor - no ORM is used.

## Gotchas

1. **German UI**: All user-facing text is German. Maintain this consistency.
2. **Service Role Key**: The track-scan API and Stripe webhooks require `SUPABASE_SERVICE_ROLE_KEY`.
3. **TypeScript Set Spreading**: Use `Array.from(new Set(...))` instead of `[...new Set(...)]` due to TypeScript configuration.
4. **HTMLElement Refs**: Use `HTMLElement` instead of `HTMLDivElement` for generic element refs in Maps.
