-- ==========================================
-- ALLERGENE SPALTE HINZUFÜGEN
-- ==========================================

-- Füge allergens Spalte zu menu_items hinzu (Array von Text)
ALTER TABLE menu_items
ADD COLUMN IF NOT EXISTS allergens TEXT[] DEFAULT '{}';

-- Kommentar zur Dokumentation
COMMENT ON COLUMN menu_items.allergens IS 'Array der Allergen-IDs: gluten, crustaceans, eggs, fish, peanuts, soy, milk, nuts, celery, mustard, sesame, sulfites, lupin, molluscs';
