# MenuApp Agent System

## Verfügbare Agents

| Command | Agent | Beschreibung |
|---------|-------|--------------|
| `/scout` | Scout Agent | Analysiert Konkurrenz, findet neue Feature-Ideen |
| `/build` | Builder Agent | Implementiert Features aus dem Backlog |
| `/improve` | Improve Agent | Kleine UX/Code/Performance Verbesserungen |
| `/design` | Design Agent | Visuelles Design, UI, Animationen |
| `/daily` | Orchestrator | Führt alle Agents nacheinander aus (mit Limits und Pausen) |

## Workflow

```
┌─────────┐     ┌─────────┐     ┌─────────┐     ┌─────────┐
│  SCOUT  │ ──▶ │  BUILD  │ ──▶ │ IMPROVE │ ──▶ │ DESIGN  │
└─────────┘     └─────────┘     └─────────┘     └─────────┘
     │               │               │               │
     ▼               ▼               ▼               ▼
┌───────────────────────────────────────────────────────────┐
│                   /docs/ Dokumentation                    │
│  - competitor-analysis.md    - improvements.md            │
│  - feature-backlog.md        - design-improvements.md     │
└───────────────────────────────────────────────────────────┘
```

### Typischer Workflow:

1. **`/scout`** - Analysiere Konkurrenz, finde neue Feature-Ideen
2. **Review** - Prüfe `/docs/feature-backlog.md`
3. **`/build`** - Implementiere das nächste High-Priority Feature
4. **`/improve`** - Mache kleine Verbesserungen zwischendurch
5. **Repeat** - Kontinuierliche Verbesserung

## Kommunikation zwischen Agents

Die Agents kommunizieren über gemeinsame Markdown-Dateien:

| Datei | Schreibt | Liest |
|-------|----------|-------|
| `/docs/competitor-analysis.md` | Scout | Builder, User |
| `/docs/feature-backlog.md` | Scout, Builder | Builder, User |
| `/docs/improvements.md` | Improve | User |
| `/docs/design-improvements.md` | Design | User |
| `CLAUDE.md` | Builder, Improve, Design | Alle |

## Projekt-Kontext

- **App:** QR Menu App - Digitale Speisekarten SaaS
- **Zielgruppe:** Restaurants in Limburg (Deutschland), speziell Dönerläden
- **USP:** 100 Ghibli-Bilder, 9,99€/Monat, einfachstes Onboarding
- **Stack:** Next.js 14, TypeScript, Tailwind, Supabase, Stripe
