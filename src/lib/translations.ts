// Translation system for menu display
// Supports German (de), English (en), French (fr), Italian (it), Spanish (es), Turkish (tr), Polish (pl)

export type Language = 'de' | 'en' | 'fr' | 'it' | 'es' | 'tr' | 'pl';

export interface MenuTranslations {
  // Header
  openNow: string;
  closedNow: string;
  closedToday: string;
  opens: string;
  closes: string;

  // Badges
  vegan: string;
  vegetarian: string;
  popular: string;
  recommended: string;
  new: string;
  special: string;
  dailySpecial: string;
  chefsSpecial: string;
  soldOut: string;
  upsellTip: string;

  // Filters
  filterVegetarian: string;
  filterVegan: string;
  filterGlutenFree: string;
  filterNoNuts: string;
  noMatchingItems: string;
  clearFilters: string;

  // Allergens section
  allergens: string;
  allergenInfo: string;

  // Categories
  allCategories: string;

  // Menu items
  notAvailable: string;

  // Footer
  poweredBy: string;
  lastUpdated: string;
  free: string;
  createdWith: string;

  // Contact
  contactViaWhatsApp: string;
  orderViaWhatsApp: string;

  // Empty states
  noMenuAvailable: string;
  noItemsInCategory: string;

  // Time relative
  justNow: string;
  minuteAgo: string;
  minutesAgo: string;
  hourAgo: string;
  hoursAgo: string;
  yesterday: string;
  daysAgo: string;

  // TV Mode
  category: string;
  of: string;
  autoScrollActive: string;
  autoScrollPaused: string;
  keyboardHint: string;

  // Enhanced Filters (Phase 1)
  myAllergies: string;
  excludeAllergens: string;
  searchPlaceholder: string;
  searchTip: string;
  apply: string;
  close: string;
  activeFilters: string;

  // Additional UI elements
  filters: string;
  search: string;
  dietary: string;
  reservationRequired: string;
  minutes: string;
  openSearch: string;
  closeSearch: string;
  clearSearch: string;
  openFilters: string;
  nFilters: string;
}

export const translations: Record<Language, MenuTranslations> = {
  de: {
    // Header
    openNow: 'Geöffnet',
    closedNow: 'Geschlossen',
    closedToday: 'Heute Ruhetag',
    opens: 'Öffnet',
    closes: 'Schließt',

    // Badges
    vegan: 'Vegan',
    vegetarian: 'Vegetarisch',
    popular: 'Beliebt',
    recommended: 'Empfehlung',
    new: 'Neu',
    special: 'Angebot',
    dailySpecial: 'Tagesangebot',
    chefsSpecial: 'Empfehlung des Küchenchefs',
    soldOut: 'Ausverkauft',
    upsellTip: 'Tipp',

    // Filters
    filterVegetarian: 'Vegetarisch',
    filterVegan: 'Vegan',
    filterGlutenFree: 'Glutenfrei',
    filterNoNuts: 'Ohne Nüsse',
    noMatchingItems: 'Keine passenden Gerichte gefunden',
    clearFilters: 'Filter zurücksetzen',

    // Allergens
    allergens: 'Allergene',
    allergenInfo: 'Fragen Sie unser Personal bei Allergien oder Unverträglichkeiten.',

    // Categories
    allCategories: 'Alle',

    // Menu items
    notAvailable: 'Nicht verfügbar',

    // Footer
    poweredBy: 'Erstellt mit',
    lastUpdated: 'Aktualisiert',
    free: 'Gratis',
    createdWith: 'Erstellt mit MenuApp',

    // Contact
    contactViaWhatsApp: 'Kontakt via WhatsApp',
    orderViaWhatsApp: 'Bestellen via WhatsApp',

    // Empty states
    noMenuAvailable: 'Keine Speisekarte verfügbar.',
    noItemsInCategory: 'Keine Gerichte in dieser Kategorie',

    // Time relative
    justNow: 'Gerade eben',
    minuteAgo: 'Vor 1 Minute',
    minutesAgo: 'Vor {n} Minuten',
    hourAgo: 'Vor 1 Stunde',
    hoursAgo: 'Vor {n} Stunden',
    yesterday: 'Gestern',
    daysAgo: 'Vor {n} Tagen',

    // TV Mode
    category: 'Kategorie',
    of: 'von',
    autoScrollActive: 'Auto-Scroll aktiv',
    autoScrollPaused: 'Auto-Scroll pausiert',
    keyboardHint: 'Tastatur: ← → Navigation | P = Pause | Leertaste = Weiter',

    // Enhanced Filters (Phase 1)
    myAllergies: 'Meine Allergien',
    excludeAllergens: 'Allergene ausschließen',
    searchPlaceholder: 'Gerichte suchen...',
    searchTip: 'Tipp: Suche nach Name, Beschreibung oder Nummer',
    apply: 'Anwenden',
    close: 'Schließen',
    activeFilters: 'Aktive Filter',

    // Additional UI elements
    filters: 'Filter',
    search: 'Suche',
    dietary: 'Ernährung',
    reservationRequired: 'Reservierung erforderlich',
    minutes: 'Min.',
    openSearch: 'Suche öffnen',
    closeSearch: 'Suche schließen',
    clearSearch: 'Suche leeren',
    openFilters: 'Filter öffnen',
    nFilters: '{n} Filter',
  },
  en: {
    // Header
    openNow: 'Open now',
    closedNow: 'Closed',
    closedToday: 'Closed today',
    opens: 'Opens',
    closes: 'Closes',

    // Badges
    vegan: 'Vegan',
    vegetarian: 'Vegetarian',
    popular: 'Popular',
    recommended: 'Recommended',
    new: 'New',
    special: 'Special',
    dailySpecial: 'Daily Special',
    chefsSpecial: "Chef's Special",
    soldOut: 'Sold Out',
    upsellTip: 'Tip',

    // Filters
    filterVegetarian: 'Vegetarian',
    filterVegan: 'Vegan',
    filterGlutenFree: 'Gluten-Free',
    filterNoNuts: 'No Nuts',
    noMatchingItems: 'No matching items found',
    clearFilters: 'Clear filters',

    // Allergens
    allergens: 'Allergens',
    allergenInfo: 'Please ask our staff about allergies or intolerances.',

    // Categories
    allCategories: 'All',

    // Menu items
    notAvailable: 'Not available',

    // Footer
    poweredBy: 'Powered by',
    lastUpdated: 'Updated',
    free: 'Free',
    createdWith: 'Created with MenuApp',

    // Contact
    contactViaWhatsApp: 'Contact via WhatsApp',
    orderViaWhatsApp: 'Order via WhatsApp',

    // Empty states
    noMenuAvailable: 'No menu available.',
    noItemsInCategory: 'No items in this category',

    // Time relative
    justNow: 'Just now',
    minuteAgo: '1 minute ago',
    minutesAgo: '{n} minutes ago',
    hourAgo: '1 hour ago',
    hoursAgo: '{n} hours ago',
    yesterday: 'Yesterday',
    daysAgo: '{n} days ago',

    // TV Mode
    category: 'Category',
    of: 'of',
    autoScrollActive: 'Auto-scroll active',
    autoScrollPaused: 'Auto-scroll paused',
    keyboardHint: 'Keyboard: ← → Navigate | P = Pause | Space = Next',

    // Enhanced Filters (Phase 1)
    myAllergies: 'My Allergies',
    excludeAllergens: 'Exclude allergens',
    searchPlaceholder: 'Search dishes...',
    searchTip: 'Tip: Search by name, description, or number',
    apply: 'Apply',
    close: 'Close',
    activeFilters: 'Active filters',

    // Additional UI elements
    filters: 'Filters',
    search: 'Search',
    dietary: 'Dietary',
    reservationRequired: 'Reservation Required',
    minutes: 'min',
    openSearch: 'Open search',
    closeSearch: 'Close search',
    clearSearch: 'Clear search',
    openFilters: 'Open filters',
    nFilters: '{n} Filters',
  },
  fr: {
    // Header
    openNow: 'Ouvert',
    closedNow: 'Fermé',
    closedToday: 'Fermé aujourd\'hui',
    opens: 'Ouvre',
    closes: 'Ferme',

    // Badges
    vegan: 'Végan',
    vegetarian: 'Végétarien',
    popular: 'Populaire',
    recommended: 'Recommandé',
    new: 'Nouveau',
    special: 'Offre',
    dailySpecial: 'Plat du jour',
    chefsSpecial: 'Spécialité du chef',
    soldOut: 'Épuisé',
    upsellTip: 'Astuce',

    // Filters
    filterVegetarian: 'Végétarien',
    filterVegan: 'Végan',
    filterGlutenFree: 'Sans gluten',
    filterNoNuts: 'Sans noix',
    noMatchingItems: 'Aucun plat correspondant',
    clearFilters: 'Effacer les filtres',

    // Allergens
    allergens: 'Allergènes',
    allergenInfo: 'Veuillez consulter notre personnel pour les allergies ou intolérances.',

    // Categories
    allCategories: 'Tous',

    // Menu items
    notAvailable: 'Non disponible',

    // Footer
    poweredBy: 'Créé avec',
    lastUpdated: 'Mis à jour',
    free: 'Gratuit',
    createdWith: 'Créé avec MenuApp',

    // Contact
    contactViaWhatsApp: 'Contact via WhatsApp',
    orderViaWhatsApp: 'Commander via WhatsApp',

    // Empty states
    noMenuAvailable: 'Aucun menu disponible.',
    noItemsInCategory: 'Aucun plat dans cette catégorie',

    // Time relative
    justNow: 'À l\'instant',
    minuteAgo: 'Il y a 1 minute',
    minutesAgo: 'Il y a {n} minutes',
    hourAgo: 'Il y a 1 heure',
    hoursAgo: 'Il y a {n} heures',
    yesterday: 'Hier',
    daysAgo: 'Il y a {n} jours',

    // TV Mode
    category: 'Catégorie',
    of: 'sur',
    autoScrollActive: 'Défilement auto actif',
    autoScrollPaused: 'Défilement auto en pause',
    keyboardHint: 'Clavier: ← → Naviguer | P = Pause | Espace = Suivant',

    // Enhanced Filters (Phase 1)
    myAllergies: 'Mes allergies',
    excludeAllergens: 'Exclure les allergènes',
    searchPlaceholder: 'Rechercher des plats...',
    searchTip: 'Astuce: Recherchez par nom, description ou numéro',
    apply: 'Appliquer',
    close: 'Fermer',
    activeFilters: 'Filtres actifs',

    // Additional UI elements
    filters: 'Filtres',
    search: 'Recherche',
    dietary: 'Régime',
    reservationRequired: 'Réservation requise',
    minutes: 'min',
    openSearch: 'Ouvrir la recherche',
    closeSearch: 'Fermer la recherche',
    clearSearch: 'Effacer la recherche',
    openFilters: 'Ouvrir les filtres',
    nFilters: '{n} Filtres',
  },
  it: {
    // Header
    openNow: 'Aperto',
    closedNow: 'Chiuso',
    closedToday: 'Chiuso oggi',
    opens: 'Apre',
    closes: 'Chiude',

    // Badges
    vegan: 'Vegano',
    vegetarian: 'Vegetariano',
    popular: 'Popolare',
    recommended: 'Consigliato',
    new: 'Nuovo',
    special: 'Offerta',
    dailySpecial: 'Piatto del giorno',
    chefsSpecial: 'Specialità dello chef',
    soldOut: 'Esaurito',
    upsellTip: 'Consiglio',

    // Filters
    filterVegetarian: 'Vegetariano',
    filterVegan: 'Vegano',
    filterGlutenFree: 'Senza glutine',
    filterNoNuts: 'Senza noci',
    noMatchingItems: 'Nessun piatto trovato',
    clearFilters: 'Cancella filtri',

    // Allergens
    allergens: 'Allergeni',
    allergenInfo: 'Si prega di chiedere al personale per allergie o intolleranze.',

    // Categories
    allCategories: 'Tutti',

    // Menu items
    notAvailable: 'Non disponibile',

    // Footer
    poweredBy: 'Creato con',
    lastUpdated: 'Aggiornato',
    free: 'Gratis',
    createdWith: 'Creato con MenuApp',

    // Contact
    contactViaWhatsApp: 'Contatta via WhatsApp',
    orderViaWhatsApp: 'Ordina via WhatsApp',

    // Empty states
    noMenuAvailable: 'Nessun menu disponibile.',
    noItemsInCategory: 'Nessun piatto in questa categoria',

    // Time relative
    justNow: 'Proprio ora',
    minuteAgo: '1 minuto fa',
    minutesAgo: '{n} minuti fa',
    hourAgo: '1 ora fa',
    hoursAgo: '{n} ore fa',
    yesterday: 'Ieri',
    daysAgo: '{n} giorni fa',

    // TV Mode
    category: 'Categoria',
    of: 'di',
    autoScrollActive: 'Scorrimento automatico attivo',
    autoScrollPaused: 'Scorrimento automatico in pausa',
    keyboardHint: 'Tastiera: ← → Naviga | P = Pausa | Spazio = Avanti',

    // Enhanced Filters (Phase 1)
    myAllergies: 'Le mie allergie',
    excludeAllergens: 'Escludi allergeni',
    searchPlaceholder: 'Cerca piatti...',
    searchTip: 'Consiglio: Cerca per nome, descrizione o numero',
    apply: 'Applica',
    close: 'Chiudi',
    activeFilters: 'Filtri attivi',

    // Additional UI elements
    filters: 'Filtri',
    search: 'Cerca',
    dietary: 'Dieta',
    reservationRequired: 'Prenotazione richiesta',
    minutes: 'min',
    openSearch: 'Apri ricerca',
    closeSearch: 'Chiudi ricerca',
    clearSearch: 'Cancella ricerca',
    openFilters: 'Apri filtri',
    nFilters: '{n} Filtri',
  },
  es: {
    // Header
    openNow: 'Abierto',
    closedNow: 'Cerrado',
    closedToday: 'Cerrado hoy',
    opens: 'Abre',
    closes: 'Cierra',

    // Badges
    vegan: 'Vegano',
    vegetarian: 'Vegetariano',
    popular: 'Popular',
    recommended: 'Recomendado',
    new: 'Nuevo',
    special: 'Oferta',
    dailySpecial: 'Plato del día',
    chefsSpecial: 'Especialidad del chef',
    soldOut: 'Agotado',
    upsellTip: 'Consejo',

    // Filters
    filterVegetarian: 'Vegetariano',
    filterVegan: 'Vegano',
    filterGlutenFree: 'Sin gluten',
    filterNoNuts: 'Sin frutos secos',
    noMatchingItems: 'No se encontraron platos',
    clearFilters: 'Borrar filtros',

    // Allergens
    allergens: 'Alérgenos',
    allergenInfo: 'Por favor consulte al personal sobre alergias o intolerancias.',

    // Categories
    allCategories: 'Todos',

    // Menu items
    notAvailable: 'No disponible',

    // Footer
    poweredBy: 'Creado con',
    lastUpdated: 'Actualizado',
    free: 'Gratis',
    createdWith: 'Creado con MenuApp',

    // Contact
    contactViaWhatsApp: 'Contactar por WhatsApp',
    orderViaWhatsApp: 'Pedir por WhatsApp',

    // Empty states
    noMenuAvailable: 'No hay menú disponible.',
    noItemsInCategory: 'No hay platos en esta categoría',

    // Time relative
    justNow: 'Ahora mismo',
    minuteAgo: 'Hace 1 minuto',
    minutesAgo: 'Hace {n} minutos',
    hourAgo: 'Hace 1 hora',
    hoursAgo: 'Hace {n} horas',
    yesterday: 'Ayer',
    daysAgo: 'Hace {n} días',

    // TV Mode
    category: 'Categoría',
    of: 'de',
    autoScrollActive: 'Desplazamiento automático activo',
    autoScrollPaused: 'Desplazamiento automático en pausa',
    keyboardHint: 'Teclado: ← → Navegar | P = Pausa | Espacio = Siguiente',

    // Enhanced Filters (Phase 1)
    myAllergies: 'Mis alergias',
    excludeAllergens: 'Excluir alérgenos',
    searchPlaceholder: 'Buscar platos...',
    searchTip: 'Consejo: Busca por nombre, descripción o número',
    apply: 'Aplicar',
    close: 'Cerrar',
    activeFilters: 'Filtros activos',

    // Additional UI elements
    filters: 'Filtros',
    search: 'Buscar',
    dietary: 'Dieta',
    reservationRequired: 'Reserva requerida',
    minutes: 'min',
    openSearch: 'Abrir búsqueda',
    closeSearch: 'Cerrar búsqueda',
    clearSearch: 'Borrar búsqueda',
    openFilters: 'Abrir filtros',
    nFilters: '{n} Filtros',
  },
  tr: {
    // Header
    openNow: 'Açık',
    closedNow: 'Kapalı',
    closedToday: 'Bugün kapalı',
    opens: 'Açılış',
    closes: 'Kapanış',

    // Badges
    vegan: 'Vegan',
    vegetarian: 'Vejetaryen',
    popular: 'Popüler',
    recommended: 'Tavsiye',
    new: 'Yeni',
    special: 'Teklif',
    dailySpecial: 'Günün Yemeği',
    chefsSpecial: 'Şefin Önerisi',
    soldOut: 'Tükendi',
    upsellTip: 'İpucu',

    // Filters
    filterVegetarian: 'Vejetaryen',
    filterVegan: 'Vegan',
    filterGlutenFree: 'Glutensiz',
    filterNoNuts: 'Fındıksız',
    noMatchingItems: 'Eşleşen yemek bulunamadı',
    clearFilters: 'Filtreleri temizle',

    // Allergens
    allergens: 'Alerjenler',
    allergenInfo: 'Alerji veya intolerans için lütfen personelimize danışın.',

    // Categories
    allCategories: 'Tümü',

    // Menu items
    notAvailable: 'Mevcut değil',

    // Footer
    poweredBy: 'Tarafından oluşturuldu',
    lastUpdated: 'Güncellendi',
    free: 'Ücretsiz',
    createdWith: 'MenuApp ile oluşturuldu',

    // Contact
    contactViaWhatsApp: 'WhatsApp ile iletişim',
    orderViaWhatsApp: 'WhatsApp ile sipariş',

    // Empty states
    noMenuAvailable: 'Menü mevcut değil.',
    noItemsInCategory: 'Bu kategoride yemek yok',

    // Time relative
    justNow: 'Az önce',
    minuteAgo: '1 dakika önce',
    minutesAgo: '{n} dakika önce',
    hourAgo: '1 saat önce',
    hoursAgo: '{n} saat önce',
    yesterday: 'Dün',
    daysAgo: '{n} gün önce',

    // TV Mode
    category: 'Kategori',
    of: '/',
    autoScrollActive: 'Otomatik kaydırma aktif',
    autoScrollPaused: 'Otomatik kaydırma duraklatıldı',
    keyboardHint: 'Klavye: ← → Gezinme | P = Duraklat | Boşluk = İleri',

    // Enhanced Filters (Phase 1)
    myAllergies: 'Alerjilerim',
    excludeAllergens: 'Alerjenleri hariç tut',
    searchPlaceholder: 'Yemek ara...',
    searchTip: 'İpucu: İsim, açıklama veya numara ile arayın',
    apply: 'Uygula',
    close: 'Kapat',
    activeFilters: 'Aktif filtreler',

    // Additional UI elements
    filters: 'Filtreler',
    search: 'Ara',
    dietary: 'Diyet',
    reservationRequired: 'Rezervasyon gerekli',
    minutes: 'dk',
    openSearch: 'Aramayı aç',
    closeSearch: 'Aramayı kapat',
    clearSearch: 'Aramayı temizle',
    openFilters: 'Filtreleri aç',
    nFilters: '{n} Filtre',
  },
  pl: {
    // Header
    openNow: 'Otwarte',
    closedNow: 'Zamknięte',
    closedToday: 'Dziś zamknięte',
    opens: 'Otwiera',
    closes: 'Zamyka',

    // Badges
    vegan: 'Wegańskie',
    vegetarian: 'Wegetariańskie',
    popular: 'Popularne',
    recommended: 'Polecane',
    new: 'Nowość',
    special: 'Promocja',
    dailySpecial: 'Danie dnia',
    chefsSpecial: 'Specjalność szefa kuchni',
    soldOut: 'Wyprzedane',
    upsellTip: 'Wskazówka',

    // Filters
    filterVegetarian: 'Wegetariańskie',
    filterVegan: 'Wegańskie',
    filterGlutenFree: 'Bezglutenowe',
    filterNoNuts: 'Bez orzechów',
    noMatchingItems: 'Nie znaleziono pasujących dań',
    clearFilters: 'Wyczyść filtry',

    // Allergens
    allergens: 'Alergeny',
    allergenInfo: 'W przypadku alergii lub nietolerancji prosimy o kontakt z personelem.',

    // Categories
    allCategories: 'Wszystkie',

    // Menu items
    notAvailable: 'Niedostępne',

    // Footer
    poweredBy: 'Utworzone z',
    lastUpdated: 'Zaktualizowano',
    free: 'Bezpłatnie',
    createdWith: 'Utworzone z MenuApp',

    // Contact
    contactViaWhatsApp: 'Kontakt przez WhatsApp',
    orderViaWhatsApp: 'Zamów przez WhatsApp',

    // Empty states
    noMenuAvailable: 'Brak dostępnego menu.',
    noItemsInCategory: 'Brak dań w tej kategorii',

    // Time relative
    justNow: 'Właśnie teraz',
    minuteAgo: '1 minutę temu',
    minutesAgo: '{n} minut temu',
    hourAgo: '1 godzinę temu',
    hoursAgo: '{n} godzin temu',
    yesterday: 'Wczoraj',
    daysAgo: '{n} dni temu',

    // TV Mode
    category: 'Kategoria',
    of: 'z',
    autoScrollActive: 'Automatyczne przewijanie aktywne',
    autoScrollPaused: 'Automatyczne przewijanie wstrzymane',
    keyboardHint: 'Klawiatura: ← → Nawigacja | P = Pauza | Spacja = Dalej',

    // Enhanced Filters (Phase 1)
    myAllergies: 'Moje alergie',
    excludeAllergens: 'Wyklucz alergeny',
    searchPlaceholder: 'Szukaj dań...',
    searchTip: 'Wskazówka: Szukaj po nazwie, opisie lub numerze',
    apply: 'Zastosuj',
    close: 'Zamknij',
    activeFilters: 'Aktywne filtry',

    // Additional UI elements
    filters: 'Filtry',
    search: 'Szukaj',
    dietary: 'Dieta',
    reservationRequired: 'Wymagana rezerwacja',
    minutes: 'min',
    openSearch: 'Otwórz wyszukiwanie',
    closeSearch: 'Zamknij wyszukiwanie',
    clearSearch: 'Wyczyść wyszukiwanie',
    openFilters: 'Otwórz filtry',
    nFilters: '{n} Filtry',
  },
};

// Allergen name translations (by ID)
export const allergenTranslations: Record<Language, Record<string, string>> = {
  de: {
    gluten: 'Gluten',
    crustaceans: 'Krebstiere',
    eggs: 'Eier',
    fish: 'Fisch',
    peanuts: 'Erdnüsse',
    soy: 'Soja',
    milk: 'Milch',
    nuts: 'Schalenfrüchte',
    celery: 'Sellerie',
    mustard: 'Senf',
    sesame: 'Sesam',
    sulfites: 'Sulfite',
    lupin: 'Lupinen',
    molluscs: 'Weichtiere',
  },
  en: {
    gluten: 'Gluten',
    crustaceans: 'Crustaceans',
    eggs: 'Eggs',
    fish: 'Fish',
    peanuts: 'Peanuts',
    soy: 'Soy',
    milk: 'Milk',
    nuts: 'Tree Nuts',
    celery: 'Celery',
    mustard: 'Mustard',
    sesame: 'Sesame',
    sulfites: 'Sulfites',
    lupin: 'Lupin',
    molluscs: 'Molluscs',
  },
  fr: {
    gluten: 'Gluten',
    crustaceans: 'Crustacés',
    eggs: 'Œufs',
    fish: 'Poisson',
    peanuts: 'Arachides',
    soy: 'Soja',
    milk: 'Lait',
    nuts: 'Fruits à coque',
    celery: 'Céleri',
    mustard: 'Moutarde',
    sesame: 'Sésame',
    sulfites: 'Sulfites',
    lupin: 'Lupin',
    molluscs: 'Mollusques',
  },
  it: {
    gluten: 'Glutine',
    crustaceans: 'Crostacei',
    eggs: 'Uova',
    fish: 'Pesce',
    peanuts: 'Arachidi',
    soy: 'Soia',
    milk: 'Latte',
    nuts: 'Frutta a guscio',
    celery: 'Sedano',
    mustard: 'Senape',
    sesame: 'Sesamo',
    sulfites: 'Solfiti',
    lupin: 'Lupini',
    molluscs: 'Molluschi',
  },
  es: {
    gluten: 'Gluten',
    crustaceans: 'Crustáceos',
    eggs: 'Huevos',
    fish: 'Pescado',
    peanuts: 'Cacahuetes',
    soy: 'Soja',
    milk: 'Leche',
    nuts: 'Frutos secos',
    celery: 'Apio',
    mustard: 'Mostaza',
    sesame: 'Sésamo',
    sulfites: 'Sulfitos',
    lupin: 'Altramuces',
    molluscs: 'Moluscos',
  },
  tr: {
    gluten: 'Gluten',
    crustaceans: 'Kabuklu deniz hayvanları',
    eggs: 'Yumurta',
    fish: 'Balık',
    peanuts: 'Yer fıstığı',
    soy: 'Soya',
    milk: 'Süt',
    nuts: 'Kabuklu yemişler',
    celery: 'Kereviz',
    mustard: 'Hardal',
    sesame: 'Susam',
    sulfites: 'Sülfitler',
    lupin: 'Acı bakla',
    molluscs: 'Yumuşakçalar',
  },
  pl: {
    gluten: 'Gluten',
    crustaceans: 'Skorupiaki',
    eggs: 'Jaja',
    fish: 'Ryby',
    peanuts: 'Orzeszki ziemne',
    soy: 'Soja',
    milk: 'Mleko',
    nuts: 'Orzechy',
    celery: 'Seler',
    mustard: 'Gorczyca',
    sesame: 'Sezam',
    sulfites: 'Siarczyny',
    lupin: 'Łubin',
    molluscs: 'Mięczaki',
  },
};

// Allergen description translations (by ID)
export const allergenDescriptions: Record<Language, Record<string, string>> = {
  de: {
    gluten: 'Weizen, Roggen, Gerste, Hafer',
    crustaceans: 'Krebse, Garnelen, Hummer',
    eggs: 'Eier und Eiprodukte',
    fish: 'Fisch und Fischprodukte',
    peanuts: 'Erdnüsse und Erdnussprodukte',
    soy: 'Sojabohnen und Sojaprodukte',
    milk: 'Milch und Milchprodukte (Laktose)',
    nuts: 'Mandeln, Haselnüsse, Walnüsse, etc.',
    celery: 'Sellerie und Sellerieprodukte',
    mustard: 'Senf und Senfprodukte',
    sesame: 'Sesamsamen und Sesamprodukte',
    sulfites: 'Schwefeldioxid und Sulfite (>10mg/kg)',
    lupin: 'Lupinen und Lupinenprodukte',
    molluscs: 'Muscheln, Schnecken, Tintenfisch',
  },
  en: {
    gluten: 'Wheat, rye, barley, oats',
    crustaceans: 'Crabs, shrimp, lobster',
    eggs: 'Eggs and egg products',
    fish: 'Fish and fish products',
    peanuts: 'Peanuts and peanut products',
    soy: 'Soybeans and soy products',
    milk: 'Milk and dairy products (lactose)',
    nuts: 'Almonds, hazelnuts, walnuts, etc.',
    celery: 'Celery and celery products',
    mustard: 'Mustard and mustard products',
    sesame: 'Sesame seeds and sesame products',
    sulfites: 'Sulfur dioxide and sulfites (>10mg/kg)',
    lupin: 'Lupin and lupin products',
    molluscs: 'Mussels, snails, squid',
  },
  fr: {
    gluten: 'Blé, seigle, orge, avoine',
    crustaceans: 'Crabes, crevettes, homard',
    eggs: 'Œufs et produits à base d\'œufs',
    fish: 'Poisson et produits à base de poisson',
    peanuts: 'Arachides et produits à base d\'arachides',
    soy: 'Soja et produits à base de soja',
    milk: 'Lait et produits laitiers (lactose)',
    nuts: 'Amandes, noisettes, noix, etc.',
    celery: 'Céleri et produits à base de céleri',
    mustard: 'Moutarde et produits à base de moutarde',
    sesame: 'Graines de sésame et produits au sésame',
    sulfites: 'Dioxyde de soufre et sulfites (>10mg/kg)',
    lupin: 'Lupin et produits à base de lupin',
    molluscs: 'Moules, escargots, calamars',
  },
  it: {
    gluten: 'Grano, segale, orzo, avena',
    crustaceans: 'Granchi, gamberi, aragosta',
    eggs: 'Uova e prodotti a base di uova',
    fish: 'Pesce e prodotti a base di pesce',
    peanuts: 'Arachidi e prodotti a base di arachidi',
    soy: 'Soia e prodotti a base di soia',
    milk: 'Latte e latticini (lattosio)',
    nuts: 'Mandorle, nocciole, noci, ecc.',
    celery: 'Sedano e prodotti a base di sedano',
    mustard: 'Senape e prodotti a base di senape',
    sesame: 'Semi di sesamo e prodotti al sesamo',
    sulfites: 'Anidride solforosa e solfiti (>10mg/kg)',
    lupin: 'Lupini e prodotti a base di lupini',
    molluscs: 'Cozze, lumache, calamari',
  },
  es: {
    gluten: 'Trigo, centeno, cebada, avena',
    crustaceans: 'Cangrejos, gambas, langosta',
    eggs: 'Huevos y productos a base de huevo',
    fish: 'Pescado y productos a base de pescado',
    peanuts: 'Cacahuetes y productos a base de cacahuete',
    soy: 'Soja y productos a base de soja',
    milk: 'Leche y productos lácteos (lactosa)',
    nuts: 'Almendras, avellanas, nueces, etc.',
    celery: 'Apio y productos a base de apio',
    mustard: 'Mostaza y productos a base de mostaza',
    sesame: 'Semillas de sésamo y productos de sésamo',
    sulfites: 'Dióxido de azufre y sulfitos (>10mg/kg)',
    lupin: 'Altramuces y productos a base de altramuz',
    molluscs: 'Mejillones, caracoles, calamares',
  },
  tr: {
    gluten: 'Buğday, çavdar, arpa, yulaf',
    crustaceans: 'Yengeç, karides, ıstakoz',
    eggs: 'Yumurta ve yumurta ürünleri',
    fish: 'Balık ve balık ürünleri',
    peanuts: 'Yer fıstığı ve yer fıstığı ürünleri',
    soy: 'Soya fasulyesi ve soya ürünleri',
    milk: 'Süt ve süt ürünleri (laktoz)',
    nuts: 'Badem, fındık, ceviz, vb.',
    celery: 'Kereviz ve kereviz ürünleri',
    mustard: 'Hardal ve hardal ürünleri',
    sesame: 'Susam tohumu ve susam ürünleri',
    sulfites: 'Kükürt dioksit ve sülfitler (>10mg/kg)',
    lupin: 'Acı bakla ve acı bakla ürünleri',
    molluscs: 'Midye, salyangoz, kalamar',
  },
  pl: {
    gluten: 'Pszenica, żyto, jęczmień, owies',
    crustaceans: 'Kraby, krewetki, homary',
    eggs: 'Jaja i produkty z jaj',
    fish: 'Ryby i produkty rybne',
    peanuts: 'Orzeszki ziemne i produkty z orzeszków',
    soy: 'Soja i produkty sojowe',
    milk: 'Mleko i produkty mleczne (laktoza)',
    nuts: 'Migdały, orzechy laskowe, włoskie, itp.',
    celery: 'Seler i produkty z selera',
    mustard: 'Gorczyca i produkty z gorczycy',
    sesame: 'Nasiona sezamu i produkty sezamowe',
    sulfites: 'Dwutlenek siarki i siarczyny (>10mg/kg)',
    lupin: 'Łubin i produkty z łubinu',
    molluscs: 'Małże, ślimaki, kalmary',
  },
};

// Get translation helper
export function getTranslation(lang: Language): MenuTranslations {
  return translations[lang] || translations.de;
}

// Get allergen name in specified language
export function getAllergenName(allergenId: string, lang: Language): string {
  return allergenTranslations[lang]?.[allergenId] || allergenTranslations.de[allergenId] || allergenId;
}

// Get allergen description in specified language
export function getAllergenDescription(allergenId: string, lang: Language): string {
  return allergenDescriptions[lang]?.[allergenId] || allergenDescriptions.de[allergenId] || '';
}

// Format relative time with translations
export function formatRelativeTime(dateString: string, lang: Language): string {
  const t = getTranslation(lang);
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffMins < 1) return t.justNow;
  if (diffMins === 1) return t.minuteAgo;
  if (diffMins < 60) return t.minutesAgo.replace('{n}', String(diffMins));
  if (diffHours === 1) return t.hourAgo;
  if (diffHours < 24) return t.hoursAgo.replace('{n}', String(diffHours));
  if (diffDays === 1) return t.yesterday;
  if (diffDays < 7) return t.daysAgo.replace('{n}', String(diffDays));

  const localeMap: Record<Language, string> = {
    de: 'de-DE',
    en: 'en-US',
    fr: 'fr-FR',
    it: 'it-IT',
    es: 'es-ES',
    tr: 'tr-TR',
    pl: 'pl-PL',
  };

  return date.toLocaleDateString(localeMap[lang] || 'de-DE', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
}

// Default language
export const DEFAULT_LANGUAGE: Language = 'de';

// Language options for UI
export const LANGUAGE_OPTIONS: { id: Language; label: string; flag: string }[] = [
  { id: 'de', label: 'Deutsch', flag: '🇩🇪' },
  { id: 'en', label: 'English', flag: '🇬🇧' },
  { id: 'fr', label: 'Français', flag: '🇫🇷' },
  { id: 'it', label: 'Italiano', flag: '🇮🇹' },
  { id: 'es', label: 'Español', flag: '🇪🇸' },
  { id: 'tr', label: 'Türkçe', flag: '🇹🇷' },
  { id: 'pl', label: 'Polski', flag: '🇵🇱' },
];

// ===========================================
// AUTO-TRANSLATION DICTIONARY (500+ entries)
// ===========================================
// For menu items without manual translations

// Dictionary for exact matches (German -> English)
const exactTranslations: Record<string, string> = {
  // ==========================================
  // KATEGORIEN / CATEGORIES
  // ==========================================
  'Vorspeisen': 'Starters',
  'Appetizer': 'Appetizers',
  'Hauptgerichte': 'Main Courses',
  'Hauptspeisen': 'Main Dishes',
  'Nachspeisen': 'Desserts',
  'Desserts': 'Desserts',
  'Süßspeisen': 'Sweet Dishes',
  'Beilagen': 'Side Dishes',
  'Extras': 'Extras',
  'Getränke': 'Beverages',
  'Drinks': 'Drinks',
  'Alkoholfreie Getränke': 'Non-Alcoholic Drinks',
  'Alkoholische Getränke': 'Alcoholic Drinks',
  'Heißgetränke': 'Hot Drinks',
  'Kaltgetränke': 'Cold Drinks',
  'Salate': 'Salads',
  'Suppen': 'Soups',
  'Pizza': 'Pizza',
  'Pizzen': 'Pizzas',
  'Pasta': 'Pasta',
  'Nudelgerichte': 'Pasta Dishes',
  'Burger': 'Burgers',
  'Sandwiches': 'Sandwiches',
  'Wraps': 'Wraps',
  'Steaks': 'Steaks',
  'Grillgerichte': 'Grilled Dishes',
  'Vom Grill': 'From the Grill',
  'Fisch': 'Fish',
  'Fischgerichte': 'Fish Dishes',
  'Meeresfrüchte': 'Seafood',
  'Fleisch': 'Meat',
  'Fleischgerichte': 'Meat Dishes',
  'Geflügel': 'Poultry',
  'Geflügelgerichte': 'Poultry Dishes',
  'Vegetarisch': 'Vegetarian',
  'Vegetarische Gerichte': 'Vegetarian Dishes',
  'Vegan': 'Vegan',
  'Vegane Gerichte': 'Vegan Dishes',
  'Frühstück': 'Breakfast',
  'Brunch': 'Brunch',
  'Mittagstisch': 'Lunch Menu',
  'Mittagsmenü': 'Lunch Menu',
  'Tagesangebot': 'Daily Special',
  'Tagesgerichte': 'Daily Specials',
  'Wochenangebot': 'Weekly Special',
  'Spezialitäten': 'Specialties',
  'Empfehlungen': 'Recommendations',
  'Empfehlung des Hauses': 'House Recommendation',
  'Unsere Empfehlung': 'Our Recommendation',
  'Kindermenü': 'Kids Menu',
  'Kindergerichte': 'Kids Dishes',
  'Für die Kleinen': 'For the Little Ones',
  'Snacks': 'Snacks',
  'Kleinigkeiten': 'Small Bites',
  'Fingerfood': 'Finger Food',
  'Klassiker': 'Classics',
  'Neue Gerichte': 'New Dishes',
  'Saisonale Gerichte': 'Seasonal Dishes',
  'Regionale Spezialitäten': 'Regional Specialties',
  'Internationale Küche': 'International Cuisine',
  'Hausmannskost': 'Home Cooking',
  'Leichte Küche': 'Light Cuisine',

  // ==========================================
  // DÖNER / TÜRKISCH / TURKISH
  // ==========================================
  'Döner': 'Döner Kebab',
  'Döner Kebab': 'Döner Kebab',
  'Döner im Brot': 'Döner in Bread',
  'Döner im Fladenbrot': 'Döner in Flatbread',
  'Döner Teller': 'Döner Plate',
  'Döner Box': 'Döner Box',
  'Döner Tasche': 'Döner Pocket',
  'Döner & Wraps': 'Döner & Wraps',
  'Dürüm': 'Dürüm Wrap',
  'Dürüm Döner': 'Dürüm Döner',
  'Dürüm Kebab': 'Dürüm Kebab',
  'Yufka': 'Yufka Wrap',
  'Lahmacun': 'Lahmacun',
  'Lahmacun mit Salat': 'Lahmacun with Salad',
  'Lahmacun Teller': 'Lahmacun Plate',
  'Pide': 'Turkish Pide',
  'Pide mit Käse': 'Pide with Cheese',
  'Pide mit Hackfleisch': 'Pide with Minced Meat',
  'Pide mit Spinat': 'Pide with Spinach',
  'Pide mit Sucuk': 'Pide with Turkish Sausage',
  'Köfte': 'Köfte Meatballs',
  'Köfte Teller': 'Köfte Plate',
  'Köfte im Brot': 'Köfte in Bread',
  'Adana': 'Adana Kebab',
  'Adana Kebab': 'Adana Kebab',
  'Adana Spieß': 'Adana Skewer',
  'Adana Teller': 'Adana Plate',
  'Iskender': 'Iskender Kebab',
  'Iskender Kebab': 'Iskender Kebab',
  'Tantuni': 'Tantuni',
  'Börek': 'Börek Pastry',
  'Sigara Börek': 'Cigarette Börek',
  'Su Börek': 'Water Börek',
  'Peynirli Börek': 'Cheese Börek',
  'Baklava': 'Baklava',
  'Künefe': 'Künefe',
  'Sütlaç': 'Rice Pudding',
  'Ayran': 'Ayran Yogurt Drink',
  'Cacık': 'Cacık',
  'Şalgam': 'Turnip Juice',
  'Hummus': 'Hummus',
  'Baba Ganoush': 'Baba Ganoush',
  'Falafel': 'Falafel',
  'Falafel Teller': 'Falafel Plate',
  'Falafel im Brot': 'Falafel in Bread',
  'Falafel Box': 'Falafel Box',
  'Vegetarischer Döner': 'Vegetarian Döner',
  'Veganer Döner': 'Vegan Döner',
  'Hähnchenspieß': 'Chicken Skewer',
  'Hähnchen Döner': 'Chicken Döner',
  'Lammspieß': 'Lamb Skewer',
  'Lamm Döner': 'Lamb Döner',
  'Schawarma': 'Shawarma',
  'Shawarma': 'Shawarma',
  'Tavuk': 'Chicken',
  'Tavuk Döner': 'Chicken Döner',
  'Tavuk Şiş': 'Chicken Shish',
  'Et Döner': 'Meat Döner',
  'Kuzu': 'Lamb',
  'Kuzu Şiş': 'Lamb Shish',
  'Şiş Kebab': 'Shish Kebab',
  'Urfa Kebab': 'Urfa Kebab',
  'Beyti': 'Beyti Kebab',
  'Ali Nazik': 'Ali Nazik',
  'Çiğ Köfte': 'Raw Köfte',
  'Mercimek Köftesi': 'Lentil Köfte',
  'Sarma': 'Stuffed Vine Leaves',
  'Dolma': 'Stuffed Vegetables',
  'Imam Bayıldı': 'Imam Bayıldı',
  'Karnıyarık': 'Karnıyarık',
  'Manti': 'Turkish Dumplings',
  'Gözleme': 'Gözleme',
  'Simit': 'Turkish Bagel',
  'Çorba': 'Soup',
  'Mercimek Çorbası': 'Lentil Soup',
  'Tavuk Suyu Çorbası': 'Chicken Soup',
  'Ezogelin Çorbası': 'Ezogelin Soup',

  // ==========================================
  // ITALIENISCH / ITALIAN
  // ==========================================
  'Pizza Margherita': 'Pizza Margherita',
  'Pizza Salami': 'Pepperoni Pizza',
  'Pizza Funghi': 'Mushroom Pizza',
  'Pizza Hawaii': 'Hawaiian Pizza',
  'Pizza Tonno': 'Tuna Pizza',
  'Pizza Quattro Stagioni': 'Four Seasons Pizza',
  'Pizza Quattro Formaggi': 'Four Cheese Pizza',
  'Pizza Capricciosa': 'Pizza Capricciosa',
  'Pizza Diavola': 'Spicy Pizza Diavola',
  'Pizza Prosciutto': 'Ham Pizza',
  'Pizza Vegetariana': 'Vegetarian Pizza',
  'Pizza Calzone': 'Calzone',
  'Calzone': 'Calzone',
  'Spaghetti': 'Spaghetti',
  'Spaghetti Bolognese': 'Spaghetti Bolognese',
  'Spaghetti Carbonara': 'Spaghetti Carbonara',
  'Spaghetti Napoli': 'Spaghetti Napoli',
  'Spaghetti Aglio e Olio': 'Spaghetti Aglio e Olio',
  'Penne': 'Penne',
  'Penne Arrabiata': 'Penne Arrabiata',
  'Penne al Forno': 'Baked Penne',
  'Rigatoni': 'Rigatoni',
  'Tagliatelle': 'Tagliatelle',
  'Fettuccine': 'Fettuccine',
  'Fettuccine Alfredo': 'Fettuccine Alfredo',
  'Lasagne': 'Lasagna',
  'Lasagne Bolognese': 'Lasagna Bolognese',
  'Lasagne Vegetariana': 'Vegetarian Lasagna',
  'Cannelloni': 'Cannelloni',
  'Ravioli': 'Ravioli',
  'Tortellini': 'Tortellini',
  'Gnocchi': 'Gnocchi',
  'Risotto': 'Risotto',
  'Risotto ai Funghi': 'Mushroom Risotto',
  'Risotto alla Milanese': 'Risotto Milanese',
  'Carpaccio': 'Carpaccio',
  'Bruschetta': 'Bruschetta',
  'Antipasti': 'Antipasti',
  'Caprese': 'Caprese Salad',
  'Insalata Mista': 'Mixed Salad',
  'Insalata Caesar': 'Caesar Salad',
  'Minestrone': 'Minestrone Soup',
  'Vitello Tonnato': 'Vitello Tonnato',
  'Saltimbocca': 'Saltimbocca',
  'Ossobuco': 'Ossobuco',
  'Tiramisu': 'Tiramisu',
  'Tiramisù': 'Tiramisu',
  'Panna Cotta': 'Panna Cotta',
  'Affogato': 'Affogato',
  'Gelato': 'Gelato',
  'Espresso': 'Espresso',
  'Cappuccino': 'Cappuccino',
  'Latte Macchiato': 'Latte Macchiato',
  'Americano': 'Americano',

  // ==========================================
  // ASIATISCH / ASIAN
  // ==========================================
  'Sushi': 'Sushi',
  'Sushi Platte': 'Sushi Platter',
  'Sushi Set': 'Sushi Set',
  'Maki': 'Maki Rolls',
  'Maki Rolle': 'Maki Roll',
  'Nigiri': 'Nigiri',
  'Sashimi': 'Sashimi',
  'California Roll': 'California Roll',
  'Ramen': 'Ramen',
  'Ramen Suppe': 'Ramen Soup',
  'Miso Ramen': 'Miso Ramen',
  'Tonkotsu Ramen': 'Tonkotsu Ramen',
  'Pho': 'Pho',
  'Pho Bo': 'Beef Pho',
  'Pho Ga': 'Chicken Pho',
  'Pad Thai': 'Pad Thai',
  'Curry': 'Curry',
  'Rotes Curry': 'Red Curry',
  'Grünes Curry': 'Green Curry',
  'Gelbes Curry': 'Yellow Curry',
  'Massaman Curry': 'Massaman Curry',
  'Panang Curry': 'Panang Curry',
  'Teriyaki': 'Teriyaki',
  'Teriyaki Hähnchen': 'Teriyaki Chicken',
  'Teriyaki Lachs': 'Teriyaki Salmon',
  'Tempura': 'Tempura',
  'Tempura Gemüse': 'Vegetable Tempura',
  'Tempura Garnelen': 'Shrimp Tempura',
  'Dim Sum': 'Dim Sum',
  'Frühlingsrollen': 'Spring Rolls',
  'Sommerrollen': 'Summer Rolls',
  'Wan Tan': 'Wontons',
  'Wonton Suppe': 'Wonton Soup',
  'Gebratener Reis': 'Fried Rice',
  'Gebratene Nudeln': 'Fried Noodles',
  'Bami Goreng': 'Bami Goreng',
  'Nasi Goreng': 'Nasi Goreng',
  'Satay': 'Satay',
  'Satay Spieße': 'Satay Skewers',
  'Tom Yum': 'Tom Yum Soup',
  'Tom Kha Gai': 'Tom Kha Gai',
  'Edamame': 'Edamame',
  'Gyoza': 'Gyoza Dumplings',
  'Miso Suppe': 'Miso Soup',
  'Udon': 'Udon Noodles',
  'Soba': 'Soba Noodles',
  'Bibimbap': 'Bibimbap',
  'Bulgogi': 'Bulgogi',
  'Kimchi': 'Kimchi',
  'Bao': 'Bao Buns',
  'Peking Ente': 'Peking Duck',
  'Kung Pao Hähnchen': 'Kung Pao Chicken',
  'Süß-Sauer': 'Sweet and Sour',
  'Tofu': 'Tofu',
  'Tofu Gerichte': 'Tofu Dishes',
  'Seitan': 'Seitan',

  // ==========================================
  // BURGER / AMERIKANISCH / AMERICAN
  // ==========================================
  'Cheeseburger': 'Cheeseburger',
  'Hamburger': 'Hamburger',
  'Bacon Burger': 'Bacon Burger',
  'BBQ Burger': 'BBQ Burger',
  'Veggie Burger': 'Veggie Burger',
  'Chicken Burger': 'Chicken Burger',
  'Crispy Chicken Burger': 'Crispy Chicken Burger',
  'Double Burger': 'Double Burger',
  'Triple Burger': 'Triple Burger',
  'Classic Burger': 'Classic Burger',
  'Cheese Fries': 'Cheese Fries',
  'Loaded Fries': 'Loaded Fries',
  'Onion Rings': 'Onion Rings',
  'Zwiebelringe': 'Onion Rings',
  'Coleslaw': 'Coleslaw',
  'Krautsalat': 'Coleslaw',
  'BBQ Sauce': 'BBQ Sauce',
  'Ranch Sauce': 'Ranch Sauce',
  'Mayo': 'Mayo',
  'Mayonnaise': 'Mayonnaise',
  'Ketchup': 'Ketchup',
  'Senf': 'Mustard',
  'Hot Dog': 'Hot Dog',
  'Chicken Wings': 'Chicken Wings',
  'Buffalo Wings': 'Buffalo Wings',
  'Chicken Nuggets': 'Chicken Nuggets',
  'Chicken Strips': 'Chicken Strips',
  'Fish and Chips': 'Fish and Chips',
  'Milkshake': 'Milkshake',
  'Brownie': 'Brownie',
  'Cheesecake': 'Cheesecake',
  'Apple Pie': 'Apple Pie',
  'Pancakes': 'Pancakes',
  'Waffeln': 'Waffles',
  'French Toast': 'French Toast',
  'Bacon': 'Bacon',
  'Speck': 'Bacon',
  'Eggs Benedict': 'Eggs Benedict',
  'Rührei': 'Scrambled Eggs',
  'Spiegelei': 'Fried Egg',

  // ==========================================
  // GETRÄNKE / BEVERAGES
  // ==========================================
  'Wasser': 'Water',
  'Mineralwasser': 'Mineral Water',
  'Stilles Wasser': 'Still Water',
  'Sprudelwasser': 'Sparkling Water',
  'Leitungswasser': 'Tap Water',
  'Cola': 'Coke',
  'Coca-Cola': 'Coca-Cola',
  'Pepsi': 'Pepsi',
  'Fanta': 'Fanta',
  'Sprite': 'Sprite',
  'Mezzo Mix': 'Mezzo Mix',
  'Spezi': 'Cola Mix',
  'Eistee': 'Iced Tea',
  'Zitrone': 'Lemon',
  'Pfirsich': 'Peach',
  'Apfelschorle': 'Apple Spritzer',
  'Apfelsaftschorle': 'Apple Juice Spritzer',
  'Orangensaft': 'Orange Juice',
  'Apfelsaft': 'Apple Juice',
  'Traubensaft': 'Grape Juice',
  'Ananassaft': 'Pineapple Juice',
  'Multivitaminsaft': 'Multivitamin Juice',
  'Tomatensaft': 'Tomato Juice',
  'Karottensaft': 'Carrot Juice',
  'Smoothie': 'Smoothie',
  'Limonade': 'Lemonade',
  'Hausgemachte Limonade': 'Homemade Lemonade',
  'Ingwerlimonade': 'Ginger Lemonade',
  'Bier': 'Beer',
  'Pils': 'Pilsner',
  'Weizen': 'Wheat Beer',
  'Weißbier': 'Wheat Beer',
  'Helles': 'Lager',
  'Dunkles': 'Dark Beer',
  'Radler': 'Shandy',
  'Alkoholfreies Bier': 'Non-Alcoholic Beer',
  'Wein': 'Wine',
  'Rotwein': 'Red Wine',
  'Weißwein': 'White Wine',
  'Rosé': 'Rosé',
  'Rosewein': 'Rosé Wine',
  'Hauswein': 'House Wine',
  'Prosecco': 'Prosecco',
  'Sekt': 'Sparkling Wine',
  'Champagner': 'Champagne',
  'Aperitif': 'Aperitif',
  'Digestif': 'Digestif',
  'Schnaps': 'Schnapps',
  'Likör': 'Liqueur',
  'Whisky': 'Whisky',
  'Wodka': 'Vodka',
  'Gin': 'Gin',
  'Rum': 'Rum',
  'Tequila': 'Tequila',
  'Cocktail': 'Cocktail',
  'Cocktails': 'Cocktails',
  'Mojito': 'Mojito',
  'Caipirinha': 'Caipirinha',
  'Gin Tonic': 'Gin & Tonic',
  'Aperol Spritz': 'Aperol Spritz',
  'Hugo': 'Hugo',
  'Piña Colada': 'Piña Colada',
  'Margarita': 'Margarita',
  'Long Island Iced Tea': 'Long Island Iced Tea',
  'Sex on the Beach': 'Sex on the Beach',
  'Cosmopolitan': 'Cosmopolitan',
  'Moscow Mule': 'Moscow Mule',
  'Negroni': 'Negroni',
  'Kaffee': 'Coffee',
  'Filterkaffee': 'Filter Coffee',
  'Milchkaffee': 'Café au Lait',
  'Tee': 'Tea',
  'Schwarzer Tee': 'Black Tea',
  'Grüner Tee': 'Green Tea',
  'Kräutertee': 'Herbal Tea',
  'Pfefferminztee': 'Peppermint Tea',
  'Kamillentee': 'Chamomile Tea',
  'Früchtetee': 'Fruit Tea',
  'Türkischer Tee': 'Turkish Tea',
  'Chai Tee': 'Chai Tea',
  'Chai Latte': 'Chai Latte',
  'Heiße Schokolade': 'Hot Chocolate',
  'Kakao': 'Hot Cocoa',

  // ==========================================
  // SALATE / SALADS
  // ==========================================
  'Salat': 'Salad',
  'Gemischter Salat': 'Mixed Salad',
  'Großer gemischter Salat': 'Large Mixed Salad',
  'Kleiner Salat': 'Small Salad',
  'Beilagensalat': 'Side Salad',
  'Bauernsalat': 'Farmer Salad',
  'Hirtensalat': 'Shepherd Salad',
  'Griechischer Salat': 'Greek Salad',
  'Caesar Salat': 'Caesar Salad',
  'Hähnchensalat': 'Chicken Salad',
  'Thunfischsalat': 'Tuna Salad',
  'Lachssalat': 'Salmon Salad',
  'Mozzarella Salat': 'Mozzarella Salad',
  'Tomatensalat': 'Tomato Salad',
  'Gurkensalat': 'Cucumber Salad',
  'Kartoffelsalat': 'Potato Salad',
  'Nudelsalat': 'Pasta Salad',
  'Reissalat': 'Rice Salad',
  'Quinoa Salat': 'Quinoa Salad',
  'Rucola Salat': 'Arugula Salad',
  'Feldsalat': 'Lamb Lettuce Salad',

  // ==========================================
  // SUPPEN / SOUPS
  // ==========================================
  'Suppe': 'Soup',
  'Tagessuppe': 'Soup of the Day',
  'Tomatensuppe': 'Tomato Soup',
  'Hühnersuppe': 'Chicken Soup',
  'Gemüsesuppe': 'Vegetable Soup',
  'Linsensuppe': 'Lentil Soup',
  'Kartoffelsuppe': 'Potato Soup',
  'Gulaschsuppe': 'Goulash Soup',
  'Zwiebelsuppe': 'Onion Soup',
  'Knoblauchsuppe': 'Garlic Soup',
  'Kürbissuppe': 'Pumpkin Soup',
  'Spargelsuppe': 'Asparagus Soup',
  'Pilzsuppe': 'Mushroom Soup',
  'Nudelsuppe': 'Noodle Soup',
  'Rindfleischsuppe': 'Beef Soup',
  'Fischsuppe': 'Fish Soup',
  'Borschtsch': 'Borscht',

  // ==========================================
  // FLEISCH / MEAT
  // ==========================================
  'Hähnchen': 'Chicken',
  'Huhn': 'Chicken',
  'Hühnchen': 'Chicken',
  'Hähnchenbrust': 'Chicken Breast',
  'Hähnchenkeule': 'Chicken Leg',
  'Hähnchenflügel': 'Chicken Wings',
  'Rind': 'Beef',
  'Rindfleisch': 'Beef',
  'Rindersteak': 'Beef Steak',
  'Rinderfilet': 'Beef Fillet',
  'Entrecôte': 'Rib Eye Steak',
  'Ribeye': 'Ribeye',
  'T-Bone Steak': 'T-Bone Steak',
  'Schwein': 'Pork',
  'Schweinefleisch': 'Pork',
  'Schweineschnitzel': 'Pork Schnitzel',
  'Schweinefilet': 'Pork Tenderloin',
  'Schweinelende': 'Pork Loin',
  'Spareribs': 'Spare Ribs',
  'Rippchen': 'Ribs',
  'Lamm': 'Lamb',
  'Lammfleisch': 'Lamb',
  'Lammkotelett': 'Lamb Chop',
  'Lammkeule': 'Leg of Lamb',
  'Kalb': 'Veal',
  'Kalbfleisch': 'Veal',
  'Kalbsschnitzel': 'Veal Schnitzel',
  'Ente': 'Duck',
  'Entenbrust': 'Duck Breast',
  'Pute': 'Turkey',
  'Putenbrust': 'Turkey Breast',
  'Putenstreifen': 'Turkey Strips',
  'Hackfleisch': 'Minced Meat',
  'Gehacktes': 'Ground Meat',
  'Schnitzel': 'Schnitzel',
  'Wiener Schnitzel': 'Wiener Schnitzel',
  'Jägerschnitzel': 'Hunter Schnitzel',
  'Zigeunerschnitzel': 'Gypsy Schnitzel',
  'Cordon Bleu': 'Cordon Bleu',
  'Geschnetzeltes': 'Sliced Meat',
  'Zürcher Geschnetzeltes': 'Zurich Style Sliced Meat',
  'Gulasch': 'Goulash',
  'Rouladen': 'Beef Roulades',
  'Sauerbraten': 'Sauerbraten',
  'Braten': 'Roast',
  'Schweinebraten': 'Pork Roast',
  'Rinderbraten': 'Beef Roast',

  // ==========================================
  // FISCH & MEERESFRÜCHTE / FISH & SEAFOOD
  // ==========================================
  'Lachs': 'Salmon',
  'Lachsfilet': 'Salmon Fillet',
  'Räucherlachs': 'Smoked Salmon',
  'Thunfisch': 'Tuna',
  'Forelle': 'Trout',
  'Dorade': 'Sea Bream',
  'Wolfsbarsch': 'Sea Bass',
  'Kabeljau': 'Cod',
  'Seelachs': 'Pollock',
  'Scholle': 'Plaice',
  'Heilbutt': 'Halibut',
  'Matjes': 'Matjes Herring',
  'Hering': 'Herring',
  'Sardinen': 'Sardines',
  'Garnelen': 'Shrimp',
  'Gambas': 'Prawns',
  'Scampi': 'Scampi',
  'Krabben': 'Crab',
  'Hummer': 'Lobster',
  'Langusten': 'Spiny Lobster',
  'Muscheln': 'Mussels',
  'Miesmuscheln': 'Blue Mussels',
  'Jakobsmuscheln': 'Scallops',
  'Austern': 'Oysters',
  'Calamari': 'Calamari',
  'Tintenfisch': 'Squid',
  'Oktopus': 'Octopus',

  // ==========================================
  // BEILAGEN / SIDE DISHES
  // ==========================================
  'Pommes': 'French Fries',
  'Pommes Frites': 'French Fries',
  'Süßkartoffel Pommes': 'Sweet Potato Fries',
  'Wedges': 'Potato Wedges',
  'Kartoffelecken': 'Potato Wedges',
  'Kroketten': 'Croquettes',
  'Bratkartoffeln': 'Fried Potatoes',
  'Kartoffelpüree': 'Mashed Potatoes',
  'Stampfkartoffeln': 'Mashed Potatoes',
  'Ofenkartoffel': 'Baked Potato',
  'Folienkartoffel': 'Jacket Potato',
  'Kartoffelgratin': 'Potato Gratin',
  'Salzkartoffeln': 'Boiled Potatoes',
  'Petersilienkartoffeln': 'Parsley Potatoes',
  'Rosmarinkartoffeln': 'Rosemary Potatoes',
  'Reis': 'Rice',
  'Basmatireis': 'Basmati Rice',
  'Jasminreis': 'Jasmine Rice',
  'Wildreis': 'Wild Rice',
  'Butterreis': 'Buttered Rice',
  'Safranreis': 'Saffron Rice',
  'Curryreis': 'Curry Rice',
  'Bulgur': 'Bulgur',
  'Couscous': 'Couscous',
  'Quinoa': 'Quinoa',
  'Nudeln': 'Noodles',
  'Spätzle': 'Spätzle',
  'Knödel': 'Dumplings',
  'Semmelknödel': 'Bread Dumplings',
  'Kartoffelknödel': 'Potato Dumplings',
  'Gemüse': 'Vegetables',
  'Grillgemüse': 'Grilled Vegetables',
  'Buttergemüse': 'Buttered Vegetables',
  'Saisongemüse': 'Seasonal Vegetables',
  'Brot': 'Bread',
  'Brotkorb': 'Bread Basket',
  'Knoblauchbrot': 'Garlic Bread',
  'Fladenbrot': 'Flatbread',
  'Ciabatta': 'Ciabatta',
  'Baguette': 'Baguette',
  'Naan': 'Naan Bread',
  'Tortilla': 'Tortilla',

  // ==========================================
  // DESSERTS / SÜSSES
  // ==========================================
  'Eis': 'Ice Cream',
  'Vanilleeis': 'Vanilla Ice Cream',
  'Schokoladeneis': 'Chocolate Ice Cream',
  'Erdbeereis': 'Strawberry Ice Cream',
  'Eiscreme': 'Ice Cream',
  'Eisbecher': 'Ice Cream Sundae',
  'Sahne': 'Whipped Cream',
  'Schlagsahne': 'Whipped Cream',
  'Kuchen': 'Cake',
  'Torte': 'Cake',
  'Apfelkuchen': 'Apple Cake',
  'Käsekuchen': 'Cheesecake',
  'Schokoladenkuchen': 'Chocolate Cake',
  'Schwarzwälder Kirschtorte': 'Black Forest Cake',
  'Obstkuchen': 'Fruit Cake',
  'Crème Brûlée': 'Crème Brûlée',
  'Mousse au Chocolat': 'Chocolate Mousse',
  'Pudding': 'Pudding',
  'Vanillepudding': 'Vanilla Pudding',
  'Griesbrei': 'Semolina Pudding',
  'Milchreis': 'Rice Pudding',
  'Apfelstrudel': 'Apple Strudel',
  'Kaiserschmarrn': 'Kaiserschmarrn',
  'Rote Grütze': 'Red Berry Compote',
  'Obstsalat': 'Fruit Salad',
  'Früchte': 'Fruits',
  'Sorbet': 'Sorbet',

  // ==========================================
  // HÄUFIGE BESCHREIBUNGEN / COMMON DESCRIPTIONS
  // ==========================================
  'Mit frischem Salat und Soße': 'With fresh salad and sauce',
  'Mit frischem Salat, Tomaten, Zwiebeln und Soße nach Wahl': 'With fresh salad, tomatoes, onions and sauce of your choice',
  'Mit Reis oder Pommes': 'With rice or fries',
  'Mit Reis oder Pommes, Salat und Soße': 'With rice or fries, salad and sauce',
  'Knusprige Pommes Frites': 'Crispy French Fries',
  'Gemischter Salat mit Dressing': 'Mixed salad with dressing',
  'Hausgemacht': 'Homemade',
  'Nach Wahl': 'Of your choice',
  'Täglich frisch': 'Fresh daily',
  'Aus eigener Herstellung': 'House-made',
  'Nach Originalrezept': 'Original recipe',
  'Frisch zubereitet': 'Freshly prepared',
  'Serviert mit': 'Served with',
  'Dazu reichen wir': 'Served with',
  'Auf Wunsch': 'Upon request',
  'Preis pro Person': 'Price per person',
  'Für 2 Personen': 'For 2 people',
  'Mindestbestellmenge': 'Minimum order',
  'Nur solange der Vorrat reicht': 'While supplies last',
  'Enthält': 'Contains',
  'Kann Spuren enthalten von': 'May contain traces of',
  'Allergene': 'Allergens',
  'Zusatzstoffe': 'Additives',
};

// Dictionary for word-by-word replacements
const wordTranslations: Record<string, string> = {
  // ==========================================
  // VERBINDUNGSWÖRTER / CONNECTORS
  // ==========================================
  'mit': 'with',
  'und': 'and',
  'oder': 'or',
  'ohne': 'without',
  'nach': 'of',
  'auf': 'on',
  'in': 'in',
  'an': 'at',
  'bei': 'with',
  'zu': 'to',
  'vom': 'from the',
  'von': 'from',
  'aus': 'from',
  'für': 'for',
  'pro': 'per',
  'je': 'each',
  'dazu': 'with it',
  'sowie': 'as well as',

  // ==========================================
  // ADJEKTIVE / ADJECTIVES
  // ==========================================
  'frisch': 'fresh',
  'hausgemacht': 'homemade',
  'selbstgemacht': 'homemade',
  'knusprig': 'crispy',
  'cremig': 'creamy',
  'saftig': 'juicy',
  'zart': 'tender',
  'würzig': 'spicy',
  'pikant': 'savory',
  'scharf': 'spicy',
  'mild': 'mild',
  'süß': 'sweet',
  'sauer': 'sour',
  'salzig': 'salty',
  'bitter': 'bitter',
  'aromatisch': 'aromatic',
  'gegrillt': 'grilled',
  'gebraten': 'fried',
  'gebacken': 'baked',
  'gekocht': 'boiled',
  'gedünstet': 'steamed',
  'geschmort': 'braised',
  'mariniert': 'marinated',
  'paniert': 'breaded',
  'gratiniert': 'gratinated',
  'gefüllt': 'stuffed',
  'belegt': 'topped',
  'garniert': 'garnished',
  'geröstet': 'roasted',
  'geräuchert': 'smoked',
  'eingelegt': 'pickled',
  'gemischt': 'mixed',
  'sortiert': 'assorted',
  'traditionell': 'traditional',
  'original': 'original',
  'klassisch': 'classic',
  'modern': 'modern',
  'neu': 'new',
  'beliebt': 'popular',
  'empfohlen': 'recommended',
  'lecker': 'delicious',
  'köstlich': 'delicious',
  'heiß': 'hot',
  'kalt': 'cold',
  'warm': 'warm',
  'lauwarm': 'lukewarm',
  'groß': 'large',
  'klein': 'small',
  'mittel': 'medium',
  'extra': 'extra',
  'doppelt': 'double',
  'halb': 'half',
  'ganz': 'whole',
  'dünn': 'thin',
  'dick': 'thick',
  'leicht': 'light',
  'schwer': 'heavy',
  'fein': 'fine',
  'grob': 'coarse',
  'vegetarisch': 'vegetarian',
  'vegan': 'vegan',
  'glutenfrei': 'gluten-free',
  'laktosefrei': 'lactose-free',
  'bio': 'organic',
  'regional': 'regional',
  'saisonal': 'seasonal',

  // ==========================================
  // ZUTATEN / INGREDIENTS
  // ==========================================
  'Salat': 'salad',
  'Tomaten': 'tomatoes',
  'Tomate': 'tomato',
  'Zwiebeln': 'onions',
  'Zwiebel': 'onion',
  'Gurken': 'cucumbers',
  'Gurke': 'cucumber',
  'Paprika': 'bell pepper',
  'Karotten': 'carrots',
  'Karotte': 'carrot',
  'Möhren': 'carrots',
  'Pilze': 'mushrooms',
  'Champignons': 'mushrooms',
  'Spinat': 'spinach',
  'Brokkoli': 'broccoli',
  'Blumenkohl': 'cauliflower',
  'Zucchini': 'zucchini',
  'Aubergine': 'eggplant',
  'Mais': 'corn',
  'Bohnen': 'beans',
  'Erbsen': 'peas',
  'Linsen': 'lentils',
  'Kichererbsen': 'chickpeas',
  'Avocado': 'avocado',
  'Jalapeños': 'jalapeños',
  'Peperoni': 'pepperoni',
  'Chili': 'chili',
  'Käse': 'cheese',
  'Mozzarella': 'mozzarella',
  'Parmesan': 'parmesan',
  'Gouda': 'gouda',
  'Cheddar': 'cheddar',
  'Emmentaler': 'emmental',
  'Gorgonzola': 'gorgonzola',
  'Feta': 'feta',
  'Schafskäse': 'feta cheese',
  'Ziegenkäse': 'goat cheese',
  'Frischkäse': 'cream cheese',
  'Fleisch': 'meat',
  'Hähnchen': 'chicken',
  'Huhn': 'chicken',
  'Pute': 'turkey',
  'Rind': 'beef',
  'Schwein': 'pork',
  'Lamm': 'lamb',
  'Kalb': 'veal',
  'Ente': 'duck',
  'Schinken': 'ham',
  'Speck': 'bacon',
  'Salami': 'salami',
  'Wurst': 'sausage',
  'Würstchen': 'sausages',
  'Hackfleisch': 'minced meat',
  'Fisch': 'fish',
  'Lachs': 'salmon',
  'Thunfisch': 'tuna',
  'Garnelen': 'shrimp',
  'Krabben': 'crab',
  'Muscheln': 'mussels',
  'Soße': 'sauce',
  'Sauce': 'sauce',
  'Dressing': 'dressing',
  'Kräuter': 'herbs',
  'Knoblauch': 'garlic',
  'Ingwer': 'ginger',
  'Basilikum': 'basil',
  'Oregano': 'oregano',
  'Rosmarin': 'rosemary',
  'Thymian': 'thyme',
  'Petersilie': 'parsley',
  'Koriander': 'cilantro',
  'Minze': 'mint',
  'Dill': 'dill',
  'Schnittlauch': 'chives',
  'Joghurt': 'yogurt',
  'Sahne': 'cream',
  'Butter': 'butter',
  'Öl': 'oil',
  'Olivenöl': 'olive oil',
  'Essig': 'vinegar',
  'Balsamico': 'balsamic',
  'Zitrone': 'lemon',
  'Limette': 'lime',
  'Orange': 'orange',
  'Brot': 'bread',
  'Fladenbrot': 'flatbread',
  'Brötchen': 'roll',
  'Reis': 'rice',
  'Nudeln': 'noodles',
  'Kartoffeln': 'potatoes',
  'Pommes': 'fries',
  'Oliven': 'olives',
  'Kapern': 'capers',
  'Nüsse': 'nuts',
  'Mandeln': 'almonds',
  'Walnüsse': 'walnuts',
  'Erdnüsse': 'peanuts',
  'Pinienkerne': 'pine nuts',
  'Ei': 'egg',
  'Eier': 'eggs',
  'Honig': 'honey',
  'Zucker': 'sugar',
  'Salz': 'salt',
  'Pfeffer': 'pepper',
  'Senf': 'mustard',
  'Ketchup': 'ketchup',
  'Mayonnaise': 'mayonnaise',
  'Sojasauce': 'soy sauce',
  'Currysauce': 'curry sauce',

  // ==========================================
  // MENGEN / QUANTITIES
  // ==========================================
  'Portion': 'portion',
  'Stück': 'piece',
  'Scheibe': 'slice',
  'Teller': 'plate',
  'Schale': 'bowl',
  'Glas': 'glass',
  'Flasche': 'bottle',
  'Krug': 'pitcher',
  'Liter': 'liter',
  'Gramm': 'grams',
  'Person': 'person',
  'Personen': 'people',

  // ==========================================
  // ALLERGENE (einzigartige Einträge)
  // ==========================================
  'Krebstiere': 'Crustaceans',
  'Milchprodukte': 'Dairy',
  'Laktose': 'Lactose',
  'Schalenfrüchte': 'Tree Nuts',
  'Sellerie': 'Celery',
  'Sesam': 'Sesame',
  'Sulfite': 'Sulfites',
  'Schwefeldioxid': 'Sulfites',
  'Lupinen': 'Lupins',
  'Weichtiere': 'Mollusks',
  'Weizen': 'Wheat',
  'Roggen': 'Rye',
  'Gerste': 'Barley',
  'Hafer': 'Oats',
  'Gluten': 'Gluten',
};

/**
 * Auto-translate German text to English
 * First tries exact match, then word-by-word replacement
 */
export function autoTranslate(text: string): string {
  if (!text) return text;

  // First check for exact match
  if (exactTranslations[text]) {
    return exactTranslations[text];
  }

  // Try case-insensitive exact match
  const lowerText = text.toLowerCase();
  for (const [de, en] of Object.entries(exactTranslations)) {
    if (de.toLowerCase() === lowerText) {
      return en;
    }
  }

  // Word-by-word replacement (preserving case for first letter)
  let result = text;
  for (const [de, en] of Object.entries(wordTranslations)) {
    // Create regex that matches the word with word boundaries
    const regex = new RegExp(`\\b${de}\\b`, 'gi');
    result = result.replace(regex, (match) => {
      // Preserve capitalization of first letter
      if (match[0] === match[0].toUpperCase()) {
        return en.charAt(0).toUpperCase() + en.slice(1);
      }
      return en;
    });
  }

  return result;
}

/**
 * Get localized text with auto-translation fallback
 * Returns manual translation if available, otherwise auto-translates
 */
export function getLocalizedText(
  germanText: string,
  englishText: string | null | undefined,
  lang: Language
): string {
  if (lang === 'de') {
    return germanText;
  }

  // English requested
  if (englishText && englishText.trim() !== '') {
    return englishText;
  }

  // Auto-translate from German
  return autoTranslate(germanText);
}
