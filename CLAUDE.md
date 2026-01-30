# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**QR Menu App** - A SaaS digital menu system for restaurants in Germany. Restaurant owners create menus, generate QR codes, and customers scan to view menus on phones. All UI text is German.

- **Live URL**: https://qr-menu-app-beta.vercel.app
- **Pricing**: 14-day free trial (all features) → Pro 9.99€/month

## Commands

```bash
npm run dev      # Start development server (localhost:3000)
npm run build    # Build for production
npm run lint     # Run ESLint
```

## Architecture

### Tech Stack
- **Framework**: Next.js 14 (App Router)
- **Database**: Supabase (PostgreSQL with Row Level Security)
- **Payments**: Lemon Squeezy (primary), Stripe (legacy)
- **Styling**: Tailwind CSS (emerald-500 primary)
- **PDF**: jspdf
- **QR Codes**: qrcode.react

### Route Structure

| Route | Purpose |
|-------|---------|
| `/` | Landing page |
| `/login`, `/register` | Auth pages |
| `/dashboard` | Dashboard (sandbox mode for non-logged-in users) |
| `/m/[slug]` | Public menu view |
| `/m/[slug]/tv` | TV Mode - auto-scrolling display |
| `/api/track-scan` | Track QR scans |
| `/api/webhooks/stripe` | Subscription webhooks |

### Database Schema

**Key Tables:**
- `restaurants` - owner_id, slug, name, theme, opening_hours (JSONB), **trial_ends_at**, is_demo
- `menu_categories` - restaurant_id, name, position
- `menu_items` - category_id, name, price, allergens[], is_vegetarian, is_vegan, is_sold_out
- `subscriptions` - user_id, plan ('free'/'basic'), status

**Storage:** `menu-images` bucket for uploads

### Key Files

| File | Purpose |
|------|---------|
| `src/app/dashboard/MenuEditor.tsx` | Menu editing with drag & drop |
| `src/app/dashboard/SandboxMenuEditor.tsx` | LocalStorage-based editing for non-logged-in users |
| `src/app/m/[slug]/MenuView.tsx` | Public menu component with theme support |
| `src/hooks/useSubscription.ts` | **Trial/subscription logic** - IMPORTANT |
| `src/lib/themes.ts` | 5 menu themes (Classic, Dark, Rustic, Modern, Oriental) |
| `src/lib/foodImages.ts` | 235+ Ghibli-style food illustrations with auto-matching |
| `src/lib/translations.ts` | DE/EN translations for public menu |
| `src/lib/allergens.ts` | 14 EU allergens |

### Supabase Client Usage

```typescript
// Client Components (browser)
import { createClient } from '@/lib/supabase/client';
const supabase = createClient();

// Server Components & API Routes
import { createClient } from '@/lib/supabase/server';
const supabase = await createClient();  // await required!
```

## Key Patterns

### Trial & Subscription System

Trial is per-restaurant (not per-user). Use functions from `src/hooks/useSubscription.ts`:

```typescript
import { getAccessStatus, shouldShowWatermark, isInTrial } from '@/hooks/useSubscription';

const status = getAccessStatus(subscription, restaurant); // 'trial' | 'pro' | 'expired'
const showWatermark = shouldShowWatermark(subscription, restaurant);
const inTrial = isInTrial(restaurant);
```

**Logic:**
- Trial active (day 1-14): All features, NO watermark
- Trial expired + no Pro: Watermark shown, editing disabled in MenuEditor
- Pro subscription: All features, NO watermark

**Database naming quirk:** UI shows "Pro" but database stores `plan='basic'`

### Sandbox Mode

Non-logged-in users at `/dashboard` enter sandbox mode:
- All data in localStorage (via `src/lib/sandboxStorage.ts`)
- QR code download locked with registration prompt
- Resets on browser close or "Zurücksetzen" click

### Theme System

5 themes in `src/lib/themes.ts` with `ThemeStyles` interface defining colors, patterns, badges. Theme selector shows mini previews.

### Image System

Auto-matching food illustrations:
```typescript
import { getAutoImage, getItemImageUrl } from '@/lib/foodImages';

const image = getAutoImage('Döner Kebab'); // Returns matching SVG
const url = getItemImageUrl(menuItem, autoImagesEnabled);
```

### Editing Disabled States

MenuEditor uses `isEditingDisabled` for both demo mode AND expired trial:
```typescript
const isEditingDisabled = isDemo || isExpired;
```

## Environment Variables

```
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY           # For webhooks and scan tracking
NEXT_PUBLIC_APP_URL                 # Production URL for QR codes
NEXT_PUBLIC_LEMONSQUEEZY_CHECKOUT_URL  # Lemon Squeezy checkout
LEMON_SQUEEZY_WEBHOOK_SECRET        # Webhook signature verification (optional but recommended)
```

## Gotchas

1. **German UI**: All user-facing text is German
2. **TypeScript Set**: Use `Array.from(new Set(...))` instead of `[...new Set(...)]`
3. **Loading states**: Always use try/catch/finally to ensure `setLoading(false)` is called
4. **Sandbox vs Demo**: Sandbox = localStorage mode. Demo = `is_demo=true` flag for read-only restaurants
5. **Trial per restaurant**: Each restaurant has its own `trial_ends_at`, not per user account

## Database Migrations

SQL migrations in `supabase/migrations/`. Run directly in Supabase SQL Editor.

## Agent Commands

Custom slash commands for development workflow:

| Command | Purpose |
|---------|---------|
| `/scout` | Analyze competitors, find feature ideas |
| `/build` | Implement features from backlog |
| `/improve` | Small UX/code improvements |
| `/design` | Visual design improvements |
| `/daily` | Run all agents sequentially |

Documentation in `/docs/` (feature-backlog.md, competitor-analysis.md, improvements.md).
