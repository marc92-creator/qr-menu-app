// Die 14 EU-Hauptallergene nach Lebensmittelinformationsverordnung (LMIV)
export const ALLERGENS = [
  { id: 'gluten', name: 'Gluten', icon: '🌾', description: 'Weizen, Roggen, Gerste, Hafer' },
  { id: 'crustaceans', name: 'Krebstiere', icon: '🦐', description: 'Krebse, Garnelen, Hummer' },
  { id: 'eggs', name: 'Eier', icon: '🥚', description: 'Eier und Eiprodukte' },
  { id: 'fish', name: 'Fisch', icon: '🐟', description: 'Fisch und Fischprodukte' },
  { id: 'peanuts', name: 'Erdnüsse', icon: '🥜', description: 'Erdnüsse und Erdnussprodukte' },
  { id: 'soy', name: 'Soja', icon: '🫘', description: 'Sojabohnen und Sojaprodukte' },
  { id: 'milk', name: 'Milch', icon: '🥛', description: 'Milch und Milchprodukte (Laktose)' },
  { id: 'nuts', name: 'Schalenfrüchte', icon: '🌰', description: 'Mandeln, Haselnüsse, Walnüsse, etc.' },
  { id: 'celery', name: 'Sellerie', icon: '🥬', description: 'Sellerie und Sellerieprodukte' },
  { id: 'mustard', name: 'Senf', icon: '🟡', description: 'Senf und Senfprodukte' },
  { id: 'sesame', name: 'Sesam', icon: '⚪', description: 'Sesamsamen und Sesamprodukte' },
  { id: 'sulfites', name: 'Sulfite', icon: '🍷', description: 'Schwefeldioxid und Sulfite (>10mg/kg)' },
  { id: 'lupin', name: 'Lupinen', icon: '🌸', description: 'Lupinen und Lupinenprodukte' },
  { id: 'molluscs', name: 'Weichtiere', icon: '🦪', description: 'Muscheln, Schnecken, Tintenfisch' },
] as const;

export type AllergenId = typeof ALLERGENS[number]['id'];

export function getAllergenById(id: string) {
  return ALLERGENS.find(a => a.id === id);
}

export function getAllergensByIds(ids: string[]): typeof ALLERGENS[number][] {
  return ids
    .map(id => getAllergenById(id))
    .filter((a): a is typeof ALLERGENS[number] => a !== undefined);
}
