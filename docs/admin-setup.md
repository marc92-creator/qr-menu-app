# Admin Test-Account Setup

Diese Anleitung erklärt, wie du einen Test-Account mit Pro-Features erstellst.

## Voraussetzung

Du musst dich zuerst normal über die App registrieren. Das SQL-Script kann keine neuen User erstellen (das passiert über Supabase Auth), aber es kann bestehende Accounts upgraden.

## Option 1: Existierenden Account upgraden (empfohlen)

1. **Registriere dich** auf der App mit deiner Email
   - Gehe zu `/register`
   - Erstelle ein Restaurant

2. **Öffne Supabase Dashboard**
   - Gehe zu [supabase.com](https://supabase.com)
   - Wähle dein Projekt

3. **Führe das SQL aus**
   - Gehe zu SQL Editor
   - Öffne `scripts/create-admin.sql` oder kopiere:

```sql
UPDATE public.restaurants
SET
  plan = 'pro',
  plan_expires_at = NOW() + INTERVAL '1 year'
WHERE owner_id = (
  SELECT id FROM auth.users WHERE email = 'DEINE_EMAIL_HIER'
);
```

4. **Ersetze** `DEINE_EMAIL_HIER` mit deiner registrierten Email

5. **Führe aus** und prüfe das Ergebnis

## Option 2: Via Supabase Dashboard (GUI)

Falls du lieber die GUI nutzt:

1. Gehe zu **Supabase → Authentication → Users**
2. Finde deinen User und **kopiere die User ID**
3. Gehe zu **Table Editor → restaurants**
4. Finde die Zeile mit deiner `owner_id`
5. Ändere `plan` von `free` auf `pro`
6. Setze `plan_expires_at` auf ein Datum in der Zukunft (z.B. `2026-01-28`)

## Prüfen ob es funktioniert hat

Nach dem Upgrade solltest du:

- **Im Dashboard** den "Pro" Badge sehen
- **Kein Wasserzeichen** auf der öffentlichen Speisekarte haben
- **Alle Features** freigeschaltet haben

SQL zum Prüfen:

```sql
SELECT r.name, r.slug, r.plan, r.plan_expires_at, u.email
FROM public.restaurants r
JOIN auth.users u ON r.owner_id = u.id
WHERE u.email = 'DEINE_EMAIL_HIER';
```

## Test-Credentials

Nach dem Setup:
- **Email:** [deine registrierte Email]
- **Passwort:** [dein Passwort bei der Registrierung]
- **Plan:** Pro (alle Features freigeschaltet)

## Pro-Status zurücksetzen

Falls du den Free-Plan testen willst:

```sql
UPDATE public.restaurants
SET plan = 'free', plan_expires_at = NULL
WHERE owner_id = (SELECT id FROM auth.users WHERE email = 'DEINE_EMAIL_HIER');
```

## Hinweise

- **UI zeigt "Pro"**, aber die Datenbank speichert `plan = 'pro'` oder `plan = 'basic'`
- Das `plan_expires_at` Feld ist optional, aber nützlich für automatische Ablauflogik
- Falls die App eine separate `subscriptions` Tabelle nutzt, siehe das SQL-Script für alternative Queries

## Troubleshooting

### "Kein Restaurant gefunden"

Stelle sicher, dass du nach der Registrierung auch ein Restaurant erstellt hast.

### "Plan ändert sich nicht"

Prüfe ob die Email korrekt ist:

```sql
SELECT id, email FROM auth.users WHERE email ILIKE '%dein%';
```

### "Wasserzeichen erscheint trotzdem"

Cache leeren oder in einem Incognito-Tab testen. Die App prüft den Plan bei jedem Seitenaufruf.
