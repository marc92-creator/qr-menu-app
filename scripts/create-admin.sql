-- Admin Test Account für MenuApp
-- Ausführen in Supabase SQL Editor
-- ================================

-- WICHTIG: Du musst dich zuerst über die App registrieren!
-- Dieses Script upgraded dann deinen Account auf Pro.

-- =============================================
-- Option 1: Upgrade via Email (empfohlen)
-- =============================================
-- Ersetze 'DEINE_EMAIL_HIER' mit deiner registrierten Email

UPDATE public.restaurants
SET
  plan = 'pro',
  plan_expires_at = NOW() + INTERVAL '1 year'
WHERE owner_id = (
  SELECT id FROM auth.users WHERE email = 'DEINE_EMAIL_HIER'
);

-- Prüfen ob es funktioniert hat:
SELECT r.name, r.slug, r.plan, r.plan_expires_at, u.email
FROM public.restaurants r
JOIN auth.users u ON r.owner_id = u.id
WHERE u.email = 'DEINE_EMAIL_HIER';


-- =============================================
-- Option 2: Upgrade via User ID
-- =============================================
-- Falls du die User ID bereits hast (aus Supabase Dashboard)

-- UPDATE public.restaurants
-- SET
--   plan = 'pro',
--   plan_expires_at = NOW() + INTERVAL '1 year'
-- WHERE owner_id = 'USER_UUID_HIER';


-- =============================================
-- Option 3: Subscription Tabelle (falls verwendet)
-- =============================================
-- Falls die App subscriptions Tabelle nutzt:

-- INSERT INTO public.subscriptions (user_id, plan, status, created_at)
-- VALUES (
--   (SELECT id FROM auth.users WHERE email = 'DEINE_EMAIL_HIER'),
--   'basic',  -- 'basic' = Pro in der UI
--   'active',
--   NOW()
-- )
-- ON CONFLICT (user_id)
-- DO UPDATE SET plan = 'basic', status = 'active';


-- =============================================
-- Hilfreiche Queries
-- =============================================

-- Alle Restaurants eines Users anzeigen:
-- SELECT * FROM public.restaurants
-- WHERE owner_id = (SELECT id FROM auth.users WHERE email = 'DEINE_EMAIL_HIER');

-- Alle aktiven Pro-Accounts anzeigen:
-- SELECT r.name, r.slug, r.plan, u.email
-- FROM public.restaurants r
-- JOIN auth.users u ON r.owner_id = u.id
-- WHERE r.plan = 'pro';

-- Pro-Status zurücksetzen (auf free):
-- UPDATE public.restaurants
-- SET plan = 'free', plan_expires_at = NULL
-- WHERE owner_id = (SELECT id FROM auth.users WHERE email = 'DEINE_EMAIL_HIER');
