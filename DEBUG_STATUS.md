# Debug Status - Realistische Fotos Problem

**Datum:** 2026-02-04
**Letzter Commit:** 5e61436

## Problem
Realistische Fotos (image_strategy='real') werden auf der öffentlichen Seite (/m/[slug]) und TV-Mode (/m/[slug]/tv) NICHT angezeigt - nur graue/weiße Platzhalter.

## Durchgeführte Tests

### SCHRITT 1: Unsplash URL Test ✅
```bash
curl -I "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=300&fit=crop&auto=format"
# Ergebnis: HTTP 200 - URLs funktionieren
```

### SCHRITT 2: Syntax-Prüfung ✅
- MenuItem.tsx: MenuImage Komponente syntaktisch korrekt
- TraditionalLayout.tsx: Korrekte JSX-Syntax
- TVMenuView.tsx: Korrekte JSX-Syntax

### SCHRITT 3: Test-Placeholder (AKTUELLER STATUS)
Beide Dateien wurden modifiziert um IMMER einen roten TEST-Placeholder zu zeigen:

**TraditionalLayout.tsx (Zeile ~240-252):**
```typescript
{categoryItems.map((item, itemIndex) => {
  const imageResult = getItemImageByStrategy(item, restaurant.image_strategy || 'ghibli', restaurant.auto_images !== false);
  // DEBUG: ALWAYS show test placeholder to verify image rendering works - remove after testing
  const imageUrl = 'https://via.placeholder.com/80x80/ff0000/ffffff?text=TEST';

  // DEBUG: Log to console - remove after testing
  if (typeof window !== 'undefined' && itemIndex === 0) {
    console.log('DEBUG TraditionalLayout:', {
      strategy: restaurant.image_strategy,
      autoImages: restaurant.auto_images,
      itemName: item.name,
      imageResult,
      forcedUrl: imageUrl
    });
  }
```

**TVMenuView.tsx (Zeile ~206-218):**
```typescript
{categoryItems.map((item, itemIndex) => {
  const imageResult = getItemImageByStrategy(item, restaurant.image_strategy || 'ghibli', restaurant.auto_images !== false);
  // DEBUG: ALWAYS show test placeholder to verify image rendering works - remove after testing
  const imageUrl = 'https://via.placeholder.com/400x200/ff0000/ffffff?text=TEST';

  // DEBUG: Log to console - remove after testing
  if (typeof window !== 'undefined' && itemIndex === 0) {
    console.log('DEBUG TVMenuView:', {
      strategy: restaurant.image_strategy,
      autoImages: restaurant.auto_images,
      itemName: item.name,
      imageResult,
      forcedUrl: imageUrl
    });
  }
```

## Erwartetes Test-Ergebnis

### Wenn rote TEST-Platzhalter SICHTBAR sind:
- Image-Rendering funktioniert
- Problem liegt bei:
  - Unsplash URLs werden nicht korrekt generiert
  - `getRealisticFoodImage()` findet keine Matches
  - `image_strategy` ist nicht auf 'real' gesetzt

### Wenn rote TEST-Platzhalter NICHT sichtbar sind:
- CSS/Layout Problem
- Mögliche Ursachen:
  - Container hat keine Größe
  - overflow:hidden schneidet ab
  - z-index Problem

## Nächste Schritte (SCHRITT 4 - falls nötig)

Falls Unsplash nicht funktioniert, lokale Bilder verwenden:
1. Bilder in `/public/images/food/` speichern
2. URLs in realisticFoodImages.ts durch lokale Pfade ersetzen
3. z.B. `/images/food/pizza-1.jpg` statt Unsplash URLs

## Relevante Dateien

| Datei | Zweck |
|-------|-------|
| `src/lib/imageService.ts` | Zentrale Image-Logik |
| `src/lib/realisticFoodImages.ts` | Unsplash URL Bibliothek + Matching |
| `src/components/MenuView/shared/MenuItem.tsx` | MenuImage Komponente |
| `src/components/MenuView/TraditionalLayout.tsx` | Standard Menu Layout |
| `src/app/m/[slug]/tv/TVMenuView.tsx` | TV Modus |

## Debug-Anleitung

1. Öffne `/m/[dein-slug]` oder `/m/[dein-slug]/tv`
2. Öffne Browser DevTools (F12)
3. Gehe zum Console Tab
4. Suche nach "DEBUG TraditionalLayout" oder "DEBUG TVMenuView"
5. Notiere die Werte für:
   - `strategy`: sollte 'real' sein
   - `autoImages`: sollte true oder undefined sein
   - `imageResult`: sollte ein Objekt mit `url` sein

## Zum Entfernen der Debug-Änderungen

Nach dem Debugging diese Zeilen entfernen:
1. In TraditionalLayout.tsx: Zeilen mit `// DEBUG:` Kommentaren
2. In TVMenuView.tsx: Zeilen mit `// DEBUG:` Kommentaren
3. Diese Datei (DEBUG_STATUS.md) löschen
