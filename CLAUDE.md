# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**QR Menu App** - A SaaS digital menu system for restaurants in the Limburg region (Germany). Restaurant owners create and manage menus, generate QR codes, and customers scan these to view menus on their phones. All UI text is in German.

### Status: MVP FERTIG + LIVE

- **Live-URL**: https://qr-menu-app-beta.vercel.app
- **GitHub**: https://github.com/marc92-creator/qr-menu-app

### Project Context

- **Created for**: Marc (Supply Chain Manager, Limburg)
- **Goal**: Passive income alongside full-time job
- **First customers**: Döner shops + Schäfer's Backhaus (60 branches)
- **Pricing**: Demo (free with watermark) / Pro (9.99€/month, no watermark)

## Completed Features

- Landing Page with Demo/Pro pricing, **"How it works" steps, testimonials, FAQ**
- User Registration & Login (Supabase Auth)
- Dashboard with onboarding checklist (4 steps with progress tracking)
- Restaurant management (CRUD, multiple restaurants per user)
- Menu Editor with 14 EU allergens
- **Image upload for menu items** (Supabase Storage, auto-compression)
- **WhatsApp contact button** on public menu (configurable per restaurant)
- **Opening hours** display with live open/closed status
- QR Code Generator + PNG download
- Table tent PDF for printing (jsPDF) - A4 and **A6 compact format**
- **Redesigned public menu view** (pill navigation, image placeholders, subtle footer)
- Trust signals (GDPR, servers in Germany)
- Impressum & Datenschutz pages
- Demo/Pro branding (consistent naming)
- Read-only demo mode for is_demo=true restaurants
- **Sandbox mode** for non-logged-in users (localStorage-based)
- Scan analytics tracking (menu_scans table)
- Last updated timestamp on public menus
- **Skeleton loading components** for better UX

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
- **Styling**: Tailwind CSS (emerald-500 primary, amber-500 for demo badges)
- **PDF**: jspdf for table tent generation
- **QR Codes**: qrcode.react

### Route Structure

| Route | Purpose |
|-------|---------|
| `/` | Landing page (public) |
| `/login`, `/register` | Auth pages (redirect to dashboard if authenticated) |
| `/dashboard` | Protected owner dashboard (menu editor, QR codes, settings) |
| `/demo` | Sandbox mode for non-logged-in users |
| `/m/[slug]` | Public menu view for customers |
| `/m/demo-doener-palace` | Fixed demo menu (not affected by sandbox changes) |
| `/impressum`, `/datenschutz` | Legal pages |
| `/api/menu/[slug]` | GET menu data |
| `/api/checkout` | POST creates Stripe checkout session |
| `/api/webhooks/stripe` | POST handles subscription events |
| `/api/track-scan` | POST tracks QR code scans |
| `/api/auth/callback` | Supabase OAuth callback |

### Database Schema

**Tables:**
- `restaurants` - owner_id, slug (unique), name, address, phone, **whatsapp_number**, **opening_hours** (JSONB), logo_url, is_active, **is_demo**, updated_at
- `menu_categories` - restaurant_id, name, position (for ordering)
- `menu_items` - category_id, name, description, price, **image_url**, is_available, position, allergens (string[])
- `menu_scans` - restaurant_id, scanned_at, user_agent, referrer
- `subscriptions` - user_id, plan ('free'/'basic'), stripe_customer_id, status

**Storage Buckets:**
- `menu-images` - Public bucket for menu item images (JPEG, max 1024px, auto-compressed)

**RLS Patterns:**
- Users can only manage their own restaurants/categories/items
- Public SELECT allowed on restaurants (by slug), categories, and items
- Stripe webhooks use service role key to bypass RLS

### Key Files

| File | Purpose |
|------|---------|
| `src/app/dashboard/page.tsx` | Dashboard main page with tabs |
| `src/app/dashboard/MenuEditor.tsx` | Menu editing (Supabase-based) |
| `src/app/dashboard/SandboxMenuEditor.tsx` | Menu editing (localStorage-based) |
| `src/app/demo/page.tsx` | Sandbox demo page for non-logged-in users |
| `src/app/m/[slug]/page.tsx` | Public menu route |
| `src/app/m/[slug]/MenuView.tsx` | Public menu view component |
| `src/lib/supabase/client.ts` | Browser Supabase client |
| `src/lib/supabase/server.ts` | Server Supabase client |
| `src/lib/demoData.ts` | Fixed demo restaurant/menu data |
| `src/lib/sandboxStorage.ts` | LocalStorage utilities for sandbox mode |
| `src/lib/allergens.ts` | 14 EU allergens with German labels |
| `src/lib/imageUpload.ts` | Image compression and Supabase Storage upload |
| `src/types/database.ts` | TypeScript interfaces |
| `src/components/OnboardingChecklist.tsx` | 4-step onboarding with localStorage tracking |
| `src/components/ImageUpload.tsx` | Image upload component with preview |
| `src/components/TableTentPDF.tsx` | PDF generation for table tents (A4 + A6) |
| `src/components/Skeleton.tsx` | Skeleton loading components for better UX |

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

**Sandbox Mode**: Non-logged-in users can try the app at `/demo`. Changes are stored in localStorage. Public demo menu (`/m/demo-doener-palace`) always shows fixed data from `demoData.ts`.

**Demo Mode (is_demo)**: Restaurants with `is_demo=true` are read-only. Users see a banner prompting registration. Public menus for demo restaurants show fixed demo data.

**Allergen System**: 14 EU allergens defined in `/lib/allergens.ts` with German labels and emoji icons. Menu items store allergen IDs as string arrays.

**URL Generation**: Use `getMenuUrl(slug)` from `/lib/utils.ts` for consistent menu URLs. Respects `NEXT_PUBLIC_APP_URL` env var.

**Price Formatting**: Use `formatPrice(price)` for German locale EUR formatting.

**Subscription/Watermark Logic**: Free/demo plans show watermark on public menu; 'basic' plan (9.99€/month) removes it. UI calls it "Pro" but database stores 'basic'.

**Timestamp Updates**: When modifying menu items/categories, call `updateRestaurantTimestamp()` to keep `updated_at` current.

**Onboarding Tracking**: QR step completion tracked via `localStorage.getItem('onboarding_qr_printed')`.

**Image Upload**: Menu item images are compressed client-side (max 1024px, JPEG 80% quality) before uploading to Supabase Storage. Uses `uploadMenuItemImage()` from `/lib/imageUpload.ts`.

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
NEXT_PUBLIC_APP_URL            # Production URL for QR codes (https://qr-menu-app-beta.vercel.app)
```

## Database Migrations

SQL migrations are in `supabase/migrations/`. Run them directly in Supabase SQL Editor - no ORM is used.

Recent migrations:
- `001_add_allergens.sql` - Allergens array column
- `20240126_add_menu_scans.sql` - Scan tracking table
- `20240127_add_is_demo.sql` - Demo mode flag for restaurants
- `20240127_menu_images_storage.sql` - Storage bucket setup docs for menu images
- `20240127_add_whatsapp.sql` - WhatsApp number field
- `20240127_add_opening_hours.sql` - Opening hours JSONB field

## Gotchas

1. **German UI**: All user-facing text is German. Maintain this consistency.
2. **Service Role Key**: The track-scan API and Stripe webhooks require `SUPABASE_SERVICE_ROLE_KEY`.
3. **TypeScript Set Spreading**: Use `Array.from(new Set(...))` instead of `[...new Set(...)]` due to TypeScript configuration.
4. **HTMLElement Refs**: Use `HTMLElement` instead of `HTMLDivElement` for generic element refs in Maps.
5. **Demo vs Pro naming**: UI shows "Demo" and "Pro", but database stores 'free' and 'basic' for plan values.
6. **Loading states**: Always use try/catch/finally in async functions to ensure `setLoading(false)` is called (prevents infinite spinners on mobile).
7. **Sandbox vs Demo**: Sandbox = localStorage mode at `/demo`. Demo = is_demo flag in database for read-only restaurants.
