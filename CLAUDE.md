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
- **Dashboard Preview tab** - Live phone mockup showing how customers see the menu
- Restaurant management (CRUD, multiple restaurants per user)
- Menu Editor with 14 EU allergens
- **Drag & Drop sorting** for categories AND menu items (@dnd-kit)
- **Image upload for menu items** (Supabase Storage, auto-compression)
- **100+ Ghibli-style food illustrations** organized in 15 categories with auto-matching
- **Menu badges** - Vegetarian, Vegan, Popular, Special/Tagesangebot
- **5 Menu themes** - Classic, Dark, Rustic, Modern, Oriental
- **WhatsApp contact button** on public menu (configurable per restaurant)
- **Opening hours editor** in Settings with live open/closed status
- **Restaurant logo upload** with display in menu header
- QR Code Generator + PNG download + **Link teilen** (native share API)
- Table tent PDF for printing (jsPDF) - A4 and **A6 compact format**
- **Complete menu PDF export** with all dishes, prices, allergens, and QR code
- **TV Mode** (`/m/[slug]/tv`) - Auto-scrolling display for restaurant TVs
- **Redesigned public menu view** (pill navigation, image placeholders, subtle footer, theme support)
- Trust signals (GDPR, servers in Germany)
- Impressum & Datenschutz pages
- Demo/Pro branding (consistent naming)
- Read-only demo mode for is_demo=true restaurants
- **Sandbox mode** - Non-logged-in users access dashboard directly, all features work via localStorage
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
| `/dashboard` | Dashboard (sandbox mode for non-logged-in, full features for logged-in) |
| `/demo` | Fallback demo page (redirects to /dashboard if logged in) |
| `/m/[slug]` | Public menu view for customers |
| `/m/[slug]/tv` | **TV Mode** - Auto-scrolling display for restaurant TVs |
| `/m/demo-doener-palace` | Fixed demo menu (not affected by sandbox changes) |
| `/impressum`, `/datenschutz` | Legal pages |
| `/api/menu/[slug]` | GET menu data |
| `/api/checkout` | POST creates Stripe checkout session |
| `/api/webhooks/stripe` | POST handles subscription events |
| `/api/track-scan` | POST tracks QR code scans |
| `/api/auth/callback` | Supabase OAuth callback |

### Database Schema

**Tables:**
- `restaurants` - owner_id, slug (unique), name, address, phone, **whatsapp_number**, **opening_hours** (JSONB), **theme** (MenuTheme), logo_url, is_active, **is_demo**, updated_at
- `menu_categories` - restaurant_id, name, position (for ordering)
- `menu_items` - category_id, name, description, price, **image_url**, is_available, position, allergens (string[]), **is_vegetarian**, **is_vegan**, **is_popular**, **is_special**
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
| `src/app/dashboard/page.tsx` | Dashboard main page with tabs (includes sandbox mode) |
| `src/app/dashboard/MenuEditor.tsx` | Menu editing (Supabase-based) with drag & drop |
| `src/app/dashboard/SandboxMenuEditor.tsx` | Menu editing (localStorage-based) |
| `src/app/dashboard/SettingsTab.tsx` | Settings (real accounts) |
| `src/app/dashboard/SandboxSettingsTab.tsx` | Settings (sandbox mode) |
| `src/app/demo/page.tsx` | Fallback demo page (redirects to /dashboard if logged in) |
| `src/app/m/[slug]/page.tsx` | Public menu route |
| `src/app/m/[slug]/MenuView.tsx` | Public menu view component with theme support |
| `src/lib/supabase/client.ts` | Browser Supabase client |
| `src/lib/supabase/server.ts` | Server Supabase client |
| `src/lib/demoData.ts` | Fixed demo restaurant/menu data |
| `src/lib/sandboxStorage.ts` | LocalStorage utilities for sandbox mode |
| `src/lib/allergens.ts` | 14 EU allergens with German labels |
| `src/lib/themes.ts` | 5 menu themes with full ThemeStyles (colors, patterns, badges, hover effects) |
| `src/lib/imageUpload.ts` | Image compression and Supabase Storage upload |
| `src/types/database.ts` | TypeScript interfaces |
| `src/hooks/useSandboxMode.ts` | Hook to check if user is in sandbox mode |
| `src/components/OnboardingChecklist.tsx` | 4-step onboarding with localStorage tracking |
| `src/components/ImageUpload.tsx` | Image upload component with preview |
| `src/components/TableTentPDF.tsx` | PDF generation for table tents (A4 + A6) |
| `src/components/Skeleton.tsx` | Skeleton loading components for better UX |
| `src/lib/translations.ts` | DE/EN translation system for public menu |
| `src/lib/foodImages.ts` | Food image matching and library (98 Ghibli images) |
| `src/app/m/[slug]/tv/TVMenuView.tsx` | TV mode component with auto-scroll |
| `src/components/MenuPDFExport.tsx` | PDF export for full menu |
| `src/components/ImageGalleryModal.tsx` | Image picker for menu items |

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

**Sandbox Mode**: Non-logged-in users access `/dashboard` directly and enter sandbox mode. All features work via localStorage (menu editing, themes, opening hours, badges, drag & drop). QR code and image upload are locked with registration prompts. Preview tab shows live changes. Data persists in browser but resets on "Zurücksetzen" click. Public demo menu (`/m/demo-doener-palace`) always shows fixed data from `demoData.ts`.

**Demo Mode (is_demo)**: Restaurants with `is_demo=true` are read-only. Users see a banner prompting registration. Public menus for demo restaurants show fixed demo data.

**Theme System**: 5 distinct visual themes, each with comprehensive styling:
- **Classic**: Clean white, minimalist, professional
- **Dark**: Dark background (#0a0a0f) with neon cyan accents - elegant night mode
- **Rustic**: Warm earth tones (beige/amber) with subtle paper texture
- **Modern**: Bold violet gradients, geometric shapes, vibrant look
- **Oriental**: Gold accents with ornamental patterns, luxurious döner shop feel

Each theme defines: background patterns (CSS gradients), card styles with hover effects, category pill styles, badge colors (vegan/popular/special), allergen badge styles, status badges (open/closed), price colors, footer styling, and decorative overlays. All styles use inline CSS from `ThemeStyles` interface in `/lib/themes.ts`. Theme selector shows mini menu previews. Sandbox users save to localStorage, real users save to database.

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
- `20240128_add_menu_badges.sql` - Menu item badges (is_vegetarian, is_vegan, is_popular, is_special)
- `20240128_add_theme.sql` - Restaurant theme column
- `20240129_add_menu_language.sql` - Menu language (de/en) for public menu UI

## Gotchas

1. **German UI**: All user-facing text is German. Maintain this consistency.
2. **Service Role Key**: The track-scan API and Stripe webhooks require `SUPABASE_SERVICE_ROLE_KEY`.
3. **TypeScript Set Spreading**: Use `Array.from(new Set(...))` instead of `[...new Set(...)]` due to TypeScript configuration.
4. **HTMLElement Refs**: Use `HTMLElement` instead of `HTMLDivElement` for generic element refs in Maps.
5. **Demo vs Pro naming**: UI shows "Demo" and "Pro", but database stores 'free' and 'basic' for plan values.
6. **Loading states**: Always use try/catch/finally in async functions to ensure `setLoading(false)` is called (prevents infinite spinners on mobile).
7. **Sandbox vs Demo**: Sandbox = localStorage mode at `/demo`. Demo = is_demo flag in database for read-only restaurants.

## Admin/Test Account Setup

To test Pro features during development:

1. **Create a test account**: Register via `/register` with a test email (e.g., `test@menuapp.de`)
2. **Get the user ID**: In Supabase Dashboard → Authentication → Users, find and copy the user's UUID
3. **Grant Pro access**: In Supabase SQL Editor, run:
   ```sql
   INSERT INTO subscriptions (user_id, plan, status, created_at)
   VALUES ('USER_UUID_HERE', 'basic', 'active', NOW())
   ON CONFLICT (user_id) DO UPDATE SET plan = 'basic', status = 'active';
   ```
4. **Verify**: The user should now see "Pro" badge in Settings and have no watermark on menus

Note: UI shows "Pro" but database stores `plan='basic'` (legacy naming).

## TV Mode

The TV Mode (`/m/[slug]/tv`) is designed for Dönerläden with display screens:
- Auto-scrolls through categories every 8 seconds
- Keyboard navigation: ← → arrows, P to pause, Space to advance
- Full-screen optimized layout with large fonts
- Respects restaurant theme styles
- Shows progress dots and category navigation

## Translation System (DE/EN)

The app now supports German and English for public menu UI:
- **File**: `src/lib/translations.ts` - Contains all UI strings
- **Restaurant Setting**: `menu_language: 'de' | 'en'` - Stored in database
- **What's translated**: Opening status, badges (Vegan, Vegetarian, Popular, Daily Special), allergens, footer, empty states, relative time
- **What's NOT translated**: Dish names and descriptions (these are entered by restaurant owner)

Usage:
```typescript
import { getTranslation, formatRelativeTime, Language } from '@/lib/translations';

const lang = (restaurant.menu_language || 'de') as Language;
const t = getTranslation(lang);

// Use t.openNow, t.dailySpecial, t.allergens, etc.
```

## Current Development Status (January 2025)

### Recently Completed (this session):
- ✅ DE/EN language toggle for public menu UI
- ✅ Translation system with all UI strings
- ✅ Language selector in Settings (both real and sandbox)
- ✅ TV Mode translations
- ✅ PDF Export translations

### Next Up (TODO - based on competitor analysis):

**High Priority:**
1. **Auto-Spracherkennung** - Detect browser language and auto-switch menu language
2. **Sprachauswahl-Button** - Add 🇩🇪/🇬🇧 toggle on public menu for visitors
3. **Mehrsprachige Gerichtnamen** - Add `name_en`, `description_en` fields to MenuItems

**Medium Priority:**
4. **QR-Code mit Logo** - Restaurant logo in center of QR code
5. **Social Media Links** - Instagram, TikTok links in menu
6. **Event-Themes** - Christmas, Ramadan, Silvester special themes

**Lower Priority:**
7. **Erweiterte Filter** - glutenfrei, alkoholfrei badges
8. **Widget/iFrame** - Embed menu on restaurant's own website

### Competitor Analysis Summary:

**Main Competitors:**
- Menury.com - Free, 7 languages, ads-supported
- Zenchef.com - Enterprise, payment integration
- Resmio.com - 69-129€/month, comprehensive but expensive
- Yumzi.app - TV mode, social media focus

**Our USP (Unique Selling Points):**
1. **100+ Ghibli-Stil Illustrationen KOSTENLOS** - Kein anderer Anbieter hat das!
2. **Einfachster Onboarding-Flow** - Demo ohne Registrierung
3. **TV-Modus für Dönerläden** - Kaum ein Anbieter bietet das
4. **Professionelles Design out-of-the-box** - 5+ Themes
5. **Günstigster Preis** - 9,99€/Monat vs. 69-129€ bei Konkurrenz

### Files Changed in Recent Session:
- `src/lib/translations.ts` (NEW) - Translation system
- `src/types/database.ts` - Added MenuLanguage type
- `src/app/dashboard/SettingsTab.tsx` - Language selector
- `src/app/dashboard/SandboxSettingsTab.tsx` - Language selector
- `src/app/m/[slug]/MenuView.tsx` - Uses translations
- `src/app/m/[slug]/tv/TVMenuView.tsx` - Uses translations
- `src/components/MenuPDFExport.tsx` - Uses translations
- `src/lib/demoData.ts` - Added menu_language
- `src/lib/sandboxStorage.ts` - Migration v4 for menu_language
- `supabase/migrations/20240129_add_menu_language.sql` (NEW)

## Agent System

Dieses Projekt hat ein Multi-Agent-System für kontinuierliche Verbesserung.

### Verfügbare Agents

| Command | Agent | Beschreibung |
|---------|-------|--------------|
| `/scout` | Scout Agent | Analysiert Konkurrenz, findet neue Feature-Ideen |
| `/build` | Builder Agent | Implementiert Features aus dem Backlog |
| `/improve` | Improve Agent | Kleine UX/Code/Performance Verbesserungen |
| `/design` | Design Agent | Visuelles Design, Themes, Animationen, moderne UI |

### Workflow

```
/scout → Review Backlog → /build → /improve → Repeat
```

1. **`/scout`** - Finde neue Ideen von der Konkurrenz
2. **Review** - Prüfe `/docs/feature-backlog.md`
3. **`/build`** - Implementiere das nächste High-Priority Feature
4. **`/improve`** - Mache kleine Verbesserungen zwischendurch

### Dokumentation

| Datei | Beschreibung |
|-------|--------------|
| `/docs/competitor-analysis.md` | Konkurrenz-Analyse (7 Wettbewerber) |
| `/docs/feature-backlog.md` | Feature Backlog mit Prioritäten |
| `/docs/improvements.md` | Log aller Verbesserungen |
| `/docs/design-improvements.md` | Design-System und visuelle Verbesserungen |
| `.claude/commands/agents.md` | Agent-System Übersicht |
| `.claude/commands/scout.md` | Scout Agent Anleitung |
| `.claude/commands/build.md` | Builder Agent Anleitung |
| `.claude/commands/improve.md` | Improve Agent Anleitung |
| `.claude/commands/design.md` | Design Agent Anleitung |

### Kommunikation zwischen Agents

Die Agents kommunizieren über gemeinsame Markdown-Dateien in `/docs/`:
- Scout schreibt → Builder liest
- Builder aktualisiert → User reviewed
- Improve dokumentiert → Alle profitieren
