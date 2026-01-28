# Feature Backlog

Letzte Aktualisierung: 28. Januar 2025 (Daily Run)

---

## High Priority 🔴

### NEU: AI-Features

- [ ] **AI Menu Import** (Quelle: Yumzi - Daily Scout 28.01.)
  - PDF oder Foto der Speisekarte hochladen
  - AI digitalisiert automatisch alle Gerichte
  - Extrahiert: Name, Beschreibung, Preis, Kategorie
  - **UNIQUE FEATURE** - Könnte großer USP werden!
  - Aufwand: 8-12 Stunden (OpenAI Vision API)

### Mehrsprachigkeit

- [ ] **Mehrsprachige Gerichtnamen** (Quelle: Menury)
  - `name_en`, `description_en` Felder für MenuItems
  - Tabs im Editor für DE/EN
  - DB Migration nötig
  - Aufwand: 4-6 Stunden

### QR-Code Verbesserungen

- [ ] **QR-Code mit Restaurant-Logo** (Quelle: QR-Code-Generator.de)
  - Logo in der Mitte des QR-Codes
  - Nur für Pro-User
  - Aufwand: 2-3 Stunden

---

## Medium Priority 🟡

### Social & Marketing

- [ ] **Social Media Links im Menü** (Quelle: Yumzi)
  - Instagram, TikTok, Facebook Icons im Footer
  - Konfigurierbar in Einstellungen
  - Aufwand: 2-3 Stunden

- [ ] **WhatsApp-Vorschau verbessern** (Intern)
  - Open Graph Meta Tags optimieren
  - Schöne Preview beim Teilen
  - Aufwand: 1 Stunde

### Design & Themes

- [ ] **Event-Themes** (Quelle: Codezwerg)
  - Weihnachten (Dezember)
  - Ramadan (variabel)
  - Silvester
  - Aufwand: 3-4 Stunden pro Theme

- [ ] **Mehr Ghibli-Bilder** (Intern)
  - Desserts erweitern
  - Frühstück hinzufügen
  - Aufwand: 2 Stunden

### Integration

- [ ] **Widget/iFrame für Restaurant-Website** (Quelle: Resmio)
  - Embed Code Generator
  - Responsives Widget
  - Aufwand: 3-4 Stunden

---

## Low Priority 🟢

### Erweiterte Features

- [ ] **Erweiterte Filter** (Quelle: Codezwerg)
  - Glutenfrei-Badge
  - Alkoholfrei-Badge
  - Scharf-Indikator
  - Aufwand: 2-3 Stunden

- [ ] **Separate Menüs** (Quelle: Zenchef)
  - Tagesmenü
  - Weinkarte
  - Mittagskarte
  - Aufwand: 6-8 Stunden

- [ ] **QR-Code Download-Formate** (Quelle: QR-Code-Generator.de)
  - SVG Export
  - PDF Export (nur QR)
  - Aufwand: 1-2 Stunden

### Zukunft (V2)

- [ ] **Gutschein-System** (Quelle: NordQR)
- [ ] **Bestellfunktion** (Quelle: Resmio, Menury)
- [ ] **Google Business Integration** (Quelle: Resmio)
- [ ] **Reservierungssystem** (Quelle: Resmio)
- [ ] **Newsletter-Tool** (Quelle: Resmio)

---

## Implemented ✅

### Januar 2025

- [x] **Auto-Spracherkennung + Sprachauswahl** (28.01.2025 - Daily Build)
  - Browser-Sprache automatisch erkennen
  - 🇩🇪/🇬🇧 Toggle Button im Menü-Header
  - Speichert Präferenz im localStorage
  - Quelle: NordQR, Menury

- [x] **DE/EN UI-Übersetzung** (28.01.2025)
  - Alle UI-Texte übersetzbar
  - Sprache in Einstellungen wählbar
  - Quelle: Menury

- [x] **TV-Modus** (27.01.2025)
  - Auto-Scroll durch Kategorien
  - Keyboard Navigation
  - Fullscreen optimiert
  - Quelle: Yumzi

- [x] **PDF-Export Speisekarte** (27.01.2025)
  - Komplette Speisekarte als PDF
  - Mit Allergenen und QR-Code
  - Quelle: Menury

- [x] **Link teilen** (27.01.2025)
  - Native Share API
  - Fallback für Desktop
  - Quelle: Intern

- [x] **Restaurant-Logo Upload** (27.01.2025)
  - Logo in Einstellungen hochladen
  - Wird im Menü-Header angezeigt
  - Quelle: User Request

- [x] **Kategorien Drag & Drop** (27.01.2025)
  - Kategorien per Drag & Drop sortieren
  - Nicht nur Gerichte
  - Quelle: User Request

### Dezember 2024 - Januar 2025

- [x] **100 Ghibli-Stil Bilder** (Januar 2025)
  - 15 Kategorien
  - Auto-Matching nach Gerichtname
  - USP gegenüber Konkurrenz

- [x] **5 Theme-Optionen** (Januar 2025)
  - Classic, Dark, Rustic, Modern, Oriental
  - Vollständiges Styling pro Theme

- [x] **Drag & Drop für Gerichte** (Januar 2025)
  - @dnd-kit Integration
  - Smooth Animations

- [x] **14 EU-Allergene** (Dezember 2024)
  - Vollständige Allergen-Kennzeichnung
  - Deutsche Labels und Emojis

- [x] **WhatsApp-Integration** (Dezember 2024)
  - Floating Button im Menü
  - Konfigurierbare Nummer

- [x] **Öffnungszeiten mit Live-Status** (Dezember 2024)
  - Geöffnet/Geschlossen Anzeige
  - Wochenplan konfigurierbar

---

## Priorisierungs-Matrix

```
                    IMPACT
                High        Low
              ┌─────────┬─────────┐
         Low  │ Quick   │ Nice to │
   EFFORT     │ Wins    │ Have    │
              ├─────────┼─────────┤
        High  │ Major   │ Avoid   │
              │ Projects│         │
              └─────────┴─────────┘

Quick Wins (Low Effort, High Impact):
- Social Media Links
- WhatsApp-Vorschau optimieren

Major Projects (High Effort, High Impact):
- Mehrsprachige Gerichtnamen
- Widget/iFrame
- Event-Themes
```

---

## Nächste Schritte

1. **Sofort:** ✅ Auto-Spracherkennung + Sprachauswahl-Button (DONE)
2. **Diese Woche:** Mehrsprachige Gerichtnamen (name_en, description_en)
3. **Nächste Woche:** AI Menu Import, QR-Code mit Logo, Social Links
