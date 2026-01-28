# Design Verbesserungen Log

Dieses Dokument trackt alle Design-Verbesserungen.

---

## Design-System

### Farben

| Name | Hex | Tailwind | Verwendung |
|------|-----|----------|------------|
| Primary | #10B981 | emerald-500 | Buttons, Links, Akzente |
| Primary Light | #D1FAE5 | emerald-100 | Badges, Hintergründe |
| Primary Dark | #047857 | emerald-700 | Hover States |
| Background | #F9FAFB | gray-50 | Seitenhintergrund |
| Surface | #FFFFFF | white | Cards, Panels |
| Text | #111827 | gray-900 | Haupttext |
| Text Muted | #6B7280 | gray-500 | Sekundärtext |
| Border | #E5E7EB | gray-200 | Rahmen, Trennlinien |
| Error | #EF4444 | red-500 | Fehlermeldungen |
| Warning | #F59E0B | amber-500 | Warnungen, Demo-Badge |
| Success | #10B981 | emerald-500 | Erfolgsmeldungen |

### Rundungen

| Name | Tailwind | Pixel | Verwendung |
|------|----------|-------|------------|
| Small | rounded-lg | 8px | Inputs, kleine Buttons |
| Medium | rounded-xl | 12px | Cards, Modals |
| Large | rounded-2xl | 16px | Große Cards, Sections |
| Full | rounded-full | 9999px | Pills, Avatare, Badges |

### Schatten

| Name | Tailwind | Verwendung |
|------|----------|------------|
| Subtle | shadow-sm | Hover States |
| Card | shadow-md | Standard Cards |
| Elevated | shadow-lg | Modals, Dropdowns |
| Floating | shadow-xl | FABs, Tooltips |

### Animationen

| Name | Tailwind | Dauer | Verwendung |
|------|----------|-------|------------|
| Fast | duration-150 | 150ms | Hover, kleine Interaktionen |
| Normal | duration-200 | 200ms | Standard Übergänge |
| Slow | duration-300 | 300ms | Modals, große Elemente |
| Smooth | duration-500 | 500ms | Bilder laden, komplexe Animationen |

### Abstände (Spacing)

| Name | Tailwind | Pixel | Verwendung |
|------|----------|-------|------------|
| XS | p-1 / m-1 | 4px | Inline-Elemente |
| SM | p-2 / m-2 | 8px | Kleine Abstände |
| MD | p-4 / m-4 | 16px | Standard |
| LG | p-6 / m-6 | 24px | Sections |
| XL | p-8 / m-8 | 32px | Große Abstände |

### Typografie

| Element | Klassen | Verwendung |
|---------|---------|------------|
| H1 | text-2xl sm:text-3xl font-bold | Seitentitel |
| H2 | text-lg font-bold | Section-Titel |
| H3 | text-base font-semibold | Card-Titel |
| Body | text-sm | Fließtext |
| Small | text-xs | Labels, Hinweise |
| Muted | text-gray-500 | Sekundärtext |

---

## Komponenten-Patterns

### Cards
```jsx
<div className="bg-white rounded-2xl p-6 shadow-sm ring-1 ring-gray-100">
  {/* Content */}
</div>
```

### Buttons (Primary)
```jsx
<button className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white font-medium rounded-xl transition-colors shadow-lg shadow-emerald-500/20">
  Button Text
</button>
```

### Buttons (Secondary)
```jsx
<button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-xl transition-colors">
  Button Text
</button>
```

### Input Fields
```jsx
<input className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent" />
```

### Pills/Tabs
```jsx
<button className="px-4 py-2 rounded-full text-sm font-medium transition-all">
  {/* Active: bg-emerald-500 text-white */}
  {/* Inactive: bg-gray-100 text-gray-600 */}
</button>
```

### Badges
```jsx
// Success/Vegan
<span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 text-xs font-semibold rounded-full">
  Badge
</span>

// Warning/Demo
<span className="px-2 py-0.5 bg-amber-100 text-amber-700 text-xs font-semibold rounded-full">
  Demo
</span>

// Info/Popular
<span className="px-2 py-0.5 bg-red-100 text-red-700 text-xs font-semibold rounded-full">
  Beliebt
</span>
```

---

## Theme-System

Das App hat 5 Themes für die öffentliche Menü-Ansicht:

| Theme | Beschreibung | Primärfarbe |
|-------|--------------|-------------|
| Classic | Sauber, minimalistisch | #10B981 (Emerald) |
| Dark | Elegant, nachtmodus | #22D3EE (Cyan) |
| Rustic | Warm, erdtöne | #D97706 (Amber) |
| Modern | Mutig, geometrisch | #8B5CF6 (Violet) |
| Oriental | Gold, ornamental | #F59E0B (Amber/Gold) |

Themes sind definiert in `src/lib/themes.ts`.

---

## Verbesserungen

### [Datum] - [Bereich]

*Wird vom Design Agent erweitert*

---

## Design-Prinzipien

1. **Mobile First** - Immer zuerst für Mobile designen
2. **Konsistenz** - Gleiche Elemente sehen überall gleich aus
3. **Weißraum** - Großzügige Abstände für Lesbarkeit
4. **Feedback** - Jede Interaktion gibt visuelles Feedback
5. **Zugänglichkeit** - Kontrast mind. 4.5:1, Touch-Targets 44px
6. **Performance** - Keine schweren Animationen, schnelle Ladezeiten

---

## Bekannte Design-Issues

- [ ] Einige Buttons haben inkonsistente Rundungen
- [ ] Loading-States könnten schöner sein (Skeleton vs Spinner)
- [ ] Dark Mode für Dashboard (später)
- [ ] Micro-Interactions fehlen teilweise
