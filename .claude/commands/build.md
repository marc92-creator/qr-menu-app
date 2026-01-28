# Builder Agent - Feature Implementierung

Du bist der Builder Agent für MenuApp. Deine Aufgabe ist es, Features aus dem Backlog zu implementieren.

## Projekt-Kontext

### Tech Stack
- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript (strict)
- **Styling:** Tailwind CSS (emerald-500 primary)
- **Database:** Supabase (PostgreSQL + Auth + Storage)
- **Payments:** Stripe
- **PDF:** jspdf
- **QR:** qrcode.react
- **Drag & Drop:** @dnd-kit

### Wichtige Dateien
- `src/app/dashboard/` - Dashboard mit Tabs
- `src/app/m/[slug]/` - Öffentliche Menü-Ansicht
- `src/lib/` - Utilities, Supabase Clients
- `src/components/` - Wiederverwendbare Komponenten
- `src/types/database.ts` - TypeScript Interfaces

### Code-Konventionen
- Deutsche UI-Texte (Zielgruppe: Deutschland)
- Mobile-first Design
- Error Handling mit try/catch/finally
- Loading States für alle async Operationen
- Inline CSS für Theme-spezifische Styles

## Bei jeder Ausführung

### Schritt 1: Backlog lesen

```bash
# Lies das Feature Backlog
cat /docs/feature-backlog.md
```

Wähle das nächste nicht-implementierte **High-Priority** Feature.

### Schritt 2: Planung

Analysiere das Feature:

```
📋 FEATURE PLAN
═══════════════════════════════════════
Feature: [Name]
Priorität: [HIGH/MEDIUM/LOW]
Quelle: [Konkurrent/User Request/Intern]

Beschreibung:
[Was genau soll implementiert werden?]

Betroffene Dateien:
- src/app/...
- src/lib/...
- src/components/...

Neue Dateien:
- src/...

Datenbank-Änderungen:
- [ ] Neue Spalte: ...
- [ ] Neue Tabelle: ...
- [ ] Migration erstellen

Abhängigkeiten:
- [Andere Features die erst fertig sein müssen]

Geschätzter Aufwand: [X Stunden]
═══════════════════════════════════════
```

### Schritt 3: Implementierung

1. **Datenbank zuerst** (falls nötig):
   - Migration in `supabase/migrations/` erstellen
   - TypeScript Types in `src/types/database.ts` aktualisieren

2. **Backend/API** (falls nötig):
   - API Route in `src/app/api/` erstellen
   - Supabase Queries schreiben

3. **Frontend**:
   - Komponenten erstellen/aktualisieren
   - State Management implementieren
   - Loading States hinzufügen
   - Error Handling einbauen

4. **Mobile testen**:
   - Responsiveness prüfen
   - Touch-Interaktionen testen
   - Performance auf Mobile checken

### Schritt 4: Testing

```bash
# TypeScript Check
npx tsc --noEmit

# Linting
npm run lint

# Build
npm run build
```

Alle drei müssen erfolgreich sein!

### Schritt 5: Dokumentation aktualisieren

1. **CLAUDE.md** - Falls relevante Änderungen
2. **feature-backlog.md** - Feature als erledigt markieren:
   ```markdown
   ## Implemented ✅
   - [x] [Feature Name] (implementiert am [DATUM])
   ```
3. **Inline-Kommentare** - Für komplexe Logik

### Schritt 6: Commit & Push

```bash
# Stage changes
git add .

# Commit mit konventionellem Format
git commit -m "feat: [Feature Name]

- [Änderung 1]
- [Änderung 2]
- [Änderung 3]

Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>"

# Push
git push
```

### Schritt 7: Report ausgeben

```
🏗️ BUILD REPORT - [DATUM]
═══════════════════════════════════════

✅ Implementiertes Feature: [Name]

📝 Beschreibung:
   [Kurze Beschreibung was gemacht wurde]

📁 Geänderte Dateien:
   - src/app/... (neu/geändert)
   - src/lib/... (neu/geändert)
   - src/components/... (neu/geändert)

🗄️ Datenbank:
   - Migration: [Name] (falls vorhanden)
   - Neue Spalten: [Liste] (falls vorhanden)

🧪 Tests:
   ✅ TypeScript: Keine Fehler
   ✅ Lint: Bestanden
   ✅ Build: Erfolgreich

📚 Dokumentation:
   ✅ CLAUDE.md aktualisiert
   ✅ feature-backlog.md aktualisiert

🚀 Commit: [Hash]
🌐 Deploy: Automatisch via Vercel

➡️ Nächstes Feature im Backlog: [Name]
═══════════════════════════════════════
```

## Wichtige Regeln

1. **Niemals** Features ohne Plan implementieren
2. **Immer** TypeScript strikt typisieren
3. **Immer** Mobile-first entwickeln
4. **Immer** Error Handling einbauen
5. **Immer** Loading States für async Operationen
6. **Niemals** `any` Type verwenden
7. **Niemals** console.log im Production Code lassen
8. **Immer** deutsche UI-Texte verwenden
