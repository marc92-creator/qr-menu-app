/**
 * Realistic Food Image Library
 *
 * High-quality food photos from Unsplash (free to use)
 * Images are curated and cached as URLs - no API calls needed
 */

export interface RealisticFoodImage {
  id: string;
  keywords: string[];
  imageUrl: string;
  label: string;
  category: string;
  photographer?: string;
  unsplashId?: string;
}

/**
 * Curated collection of realistic food photos from Unsplash
 * All images are free to use under Unsplash license
 */
export const REALISTIC_FOOD_LIBRARY: RealisticFoodImage[] = [
  // ============================================
  // DÖNER & TÜRKISCH
  // ============================================
  {
    id: 'real-doener',
    keywords: ['döner', 'doner', 'kebab', 'kebap', 'shawarma', 'gyros'],
    imageUrl: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    label: 'Döner Kebab',
    category: 'doener',
    photographer: 'Unsplash',
  },
  {
    id: 'real-dueruem',
    keywords: ['dürüm', 'durum', 'wrap', 'yufka', 'rolle'],
    imageUrl: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    label: 'Dürüm Wrap',
    category: 'doener',
  },
  {
    id: 'real-falafel',
    keywords: ['falafel', 'kichererbsen', 'hummus'],
    imageUrl: 'https://images.unsplash.com/photo-1593001874117-c99c800e3eb7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    label: 'Falafel',
    category: 'doener',
  },
  {
    id: 'real-pide',
    keywords: ['pide', 'türkische pizza', 'lahmacun'],
    imageUrl: 'https://images.unsplash.com/photo-1590212151175-e58edd96185b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    label: 'Pide',
    category: 'doener',
  },

  // ============================================
  // PIZZA
  // ============================================
  {
    id: 'real-pizza-margherita',
    keywords: ['pizza margherita', 'margherita', 'pizza tomate', 'pizza mozzarella'],
    imageUrl: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    label: 'Pizza Margherita',
    category: 'pizza',
  },
  {
    id: 'real-pizza-salami',
    keywords: ['pizza salami', 'pizza pepperoni', 'salami pizza', 'peperoni'],
    imageUrl: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    label: 'Pizza Salami',
    category: 'pizza',
  },
  {
    id: 'real-pizza-hawaii',
    keywords: ['pizza hawaii', 'hawaii', 'pizza ananas', 'pizza schinken'],
    imageUrl: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    label: 'Pizza Hawaii',
    category: 'pizza',
  },
  {
    id: 'real-pizza-funghi',
    keywords: ['pizza funghi', 'pizza pilze', 'champignon pizza', 'mushroom pizza'],
    imageUrl: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    label: 'Pizza Funghi',
    category: 'pizza',
  },
  {
    id: 'real-pizza-quattro',
    keywords: ['pizza quattro', 'pizza vier', '4 jahreszeiten', 'quattro stagioni', 'quattro formaggi'],
    imageUrl: 'https://images.unsplash.com/photo-1604382355076-af4b0eb60143?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    label: 'Pizza Quattro',
    category: 'pizza',
  },

  // ============================================
  // PASTA
  // ============================================
  {
    id: 'real-spaghetti-bolognese',
    keywords: ['spaghetti', 'bolognese', 'pasta bolognese', 'ragù', 'fleischsoße'],
    imageUrl: 'https://images.unsplash.com/photo-1622973536968-3ead9e780960?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    label: 'Spaghetti Bolognese',
    category: 'pasta',
  },
  {
    id: 'real-spaghetti-carbonara',
    keywords: ['carbonara', 'spaghetti carbonara', 'pasta carbonara', 'speck', 'ei'],
    imageUrl: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    label: 'Spaghetti Carbonara',
    category: 'pasta',
  },
  {
    id: 'real-lasagne',
    keywords: ['lasagne', 'lasagna', 'nudelauflauf'],
    imageUrl: 'https://images.unsplash.com/photo-1574894709920-11b28e7367e3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    label: 'Lasagne',
    category: 'pasta',
  },
  {
    id: 'real-penne',
    keywords: ['penne', 'penne arrabiata', 'penne pasta', 'rigatoni'],
    imageUrl: 'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    label: 'Penne',
    category: 'pasta',
  },
  {
    id: 'real-ravioli',
    keywords: ['ravioli', 'tortellini', 'gefüllte pasta', 'agnolotti'],
    imageUrl: 'https://images.unsplash.com/photo-1587740908075-9e245070dfaa?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    label: 'Ravioli',
    category: 'pasta',
  },
  {
    id: 'real-gnocchi',
    keywords: ['gnocchi', 'kartoffelklöße', 'italienische klöße'],
    imageUrl: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    label: 'Gnocchi',
    category: 'pasta',
  },

  // ============================================
  // BURGER
  // ============================================
  {
    id: 'real-burger-classic',
    keywords: ['burger', 'hamburger', 'cheeseburger', 'rindfleisch burger'],
    imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    label: 'Burger',
    category: 'burger',
  },
  {
    id: 'real-burger-bacon',
    keywords: ['bacon burger', 'speck burger', 'bbq burger'],
    imageUrl: 'https://images.unsplash.com/photo-1553979459-d2229ba7433b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    label: 'Bacon Burger',
    category: 'burger',
  },
  {
    id: 'real-burger-chicken',
    keywords: ['chicken burger', 'hähnchen burger', 'crispy chicken'],
    imageUrl: 'https://images.unsplash.com/photo-1606755962773-d324e0a13086?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    label: 'Chicken Burger',
    category: 'burger',
  },
  {
    id: 'real-burger-veggie',
    keywords: ['veggie burger', 'vegetarischer burger', 'vegan burger', 'plant based'],
    imageUrl: 'https://images.unsplash.com/photo-1520072959219-c595dc870360?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    label: 'Veggie Burger',
    category: 'burger',
  },

  // ============================================
  // ASIATISCH
  // ============================================
  {
    id: 'real-sushi',
    keywords: ['sushi', 'maki', 'nigiri', 'sashimi', 'lachs sushi'],
    imageUrl: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    label: 'Sushi',
    category: 'asiatisch',
  },
  {
    id: 'real-ramen',
    keywords: ['ramen', 'nudelsuppe', 'japanische suppe', 'tonkotsu'],
    imageUrl: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    label: 'Ramen',
    category: 'asiatisch',
  },
  {
    id: 'real-pho',
    keywords: ['pho', 'vietnamesisch', 'vietnamese suppe', 'reisnudelsuppe'],
    imageUrl: 'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    label: 'Pho',
    category: 'asiatisch',
  },
  {
    id: 'real-curry',
    keywords: ['curry', 'thai curry', 'indisches curry', 'red curry', 'green curry'],
    imageUrl: 'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    label: 'Curry',
    category: 'asiatisch',
  },
  {
    id: 'real-pad-thai',
    keywords: ['pad thai', 'gebratene nudeln', 'thai nudeln', 'wok nudeln'],
    imageUrl: 'https://images.unsplash.com/photo-1559314809-0d155014e29e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    label: 'Pad Thai',
    category: 'asiatisch',
  },
  {
    id: 'real-fried-rice',
    keywords: ['gebratener reis', 'fried rice', 'nasi goreng', 'reis mit gemüse'],
    imageUrl: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    label: 'Gebratener Reis',
    category: 'asiatisch',
  },
  {
    id: 'real-spring-rolls',
    keywords: ['frühlingsrolle', 'spring rolls', 'sommerrollen', 'asia rolle'],
    imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    label: 'Frühlingsrollen',
    category: 'asiatisch',
  },
  {
    id: 'real-dim-sum',
    keywords: ['dim sum', 'dumplings', 'gyoza', 'teigtaschen', 'wan tan'],
    imageUrl: 'https://images.unsplash.com/photo-1496116218417-1a781b1c416c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    label: 'Dim Sum',
    category: 'asiatisch',
  },

  // ============================================
  // DEUTSCH / TRADITIONELL
  // ============================================
  {
    id: 'real-schnitzel',
    keywords: ['schnitzel', 'wiener schnitzel', 'paniertes schnitzel', 'schweineschnitzel'],
    imageUrl: 'https://images.unsplash.com/photo-1599921841143-819065a55cc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    label: 'Schnitzel',
    category: 'deutsch',
  },
  {
    id: 'real-bratwurst',
    keywords: ['bratwurst', 'wurst', 'currywurst', 'thüringer', 'nürnberger'],
    imageUrl: 'https://images.unsplash.com/photo-1528607929212-2636ec44253e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    label: 'Bratwurst',
    category: 'deutsch',
  },
  {
    id: 'real-braten',
    keywords: ['braten', 'schweinebraten', 'rinderbraten', 'sauerbraten', 'sonntagsbraten'],
    imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    label: 'Braten',
    category: 'deutsch',
  },
  {
    id: 'real-gulasch',
    keywords: ['gulasch', 'gulash', 'rindergulasch', 'ungarisch'],
    imageUrl: 'https://images.unsplash.com/photo-1534939561126-855b8675edd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    label: 'Gulasch',
    category: 'deutsch',
  },
  {
    id: 'real-kartoffeln',
    keywords: ['kartoffeln', 'bratkartoffeln', 'kartoffelpüree', 'pommes', 'wedges'],
    imageUrl: 'https://images.unsplash.com/photo-1518013431117-eb1465fa5752?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    label: 'Kartoffeln',
    category: 'deutsch',
  },

  // ============================================
  // SALATE
  // ============================================
  {
    id: 'real-salat-gemischt',
    keywords: ['salat', 'gemischter salat', 'beilagensalat', 'garden salad'],
    imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    label: 'Gemischter Salat',
    category: 'salate',
  },
  {
    id: 'real-caesar-salat',
    keywords: ['caesar salat', 'caesar salad', 'hähnchen salat', 'chicken salad'],
    imageUrl: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    label: 'Caesar Salat',
    category: 'salate',
  },
  {
    id: 'real-griechischer-salat',
    keywords: ['griechischer salat', 'greek salad', 'bauernsalat', 'feta salat'],
    imageUrl: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    label: 'Griechischer Salat',
    category: 'salate',
  },

  // ============================================
  // SUPPEN
  // ============================================
  {
    id: 'real-tomatensuppe',
    keywords: ['tomatensuppe', 'tomato soup', 'suppe'],
    imageUrl: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    label: 'Tomatensuppe',
    category: 'suppen',
  },
  {
    id: 'real-kuerbissuppe',
    keywords: ['kürbissuppe', 'pumpkin soup', 'hokkaido'],
    imageUrl: 'https://images.unsplash.com/photo-1476718406336-bb5a9690ee2a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    label: 'Kürbissuppe',
    category: 'suppen',
  },
  {
    id: 'real-huehnersuppe',
    keywords: ['hühnersuppe', 'chicken soup', 'nudelsuppe', 'bouillon'],
    imageUrl: 'https://images.unsplash.com/photo-1604152135912-04a022e23696?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    label: 'Hühnersuppe',
    category: 'suppen',
  },

  // ============================================
  // BEILAGEN
  // ============================================
  {
    id: 'real-pommes',
    keywords: ['pommes', 'pommes frites', 'fries', 'fritten'],
    imageUrl: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    label: 'Pommes Frites',
    category: 'beilagen',
  },
  {
    id: 'real-suesskartoffel-pommes',
    keywords: ['süßkartoffel', 'sweet potato', 'süßkartoffelpommes'],
    imageUrl: 'https://images.unsplash.com/photo-1604152135912-04a022e23696?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    label: 'Süßkartoffel Pommes',
    category: 'beilagen',
  },
  {
    id: 'real-reis',
    keywords: ['reis', 'rice', 'basmati', 'jasmin reis'],
    imageUrl: 'https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    label: 'Reis',
    category: 'beilagen',
  },
  {
    id: 'real-brot',
    keywords: ['brot', 'bread', 'baguette', 'brotkorb', 'fladenbrot'],
    imageUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    label: 'Brot',
    category: 'beilagen',
  },

  // ============================================
  // DESSERTS
  // ============================================
  {
    id: 'real-tiramisu',
    keywords: ['tiramisu', 'mascarpone', 'italienisches dessert'],
    imageUrl: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    label: 'Tiramisu',
    category: 'desserts',
  },
  {
    id: 'real-cheesecake',
    keywords: ['cheesecake', 'käsekuchen', 'new york cheesecake'],
    imageUrl: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    label: 'Cheesecake',
    category: 'desserts',
  },
  {
    id: 'real-schokoladenkuchen',
    keywords: ['schokoladenkuchen', 'chocolate cake', 'brownie', 'schokokuchen'],
    imageUrl: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    label: 'Schokoladenkuchen',
    category: 'desserts',
  },
  {
    id: 'real-eis',
    keywords: ['eis', 'ice cream', 'gelato', 'eiskugel', 'vanilleeis'],
    imageUrl: 'https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    label: 'Eis',
    category: 'desserts',
  },
  {
    id: 'real-panna-cotta',
    keywords: ['panna cotta', 'sahne dessert', 'italienisch'],
    imageUrl: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    label: 'Panna Cotta',
    category: 'desserts',
  },

  // ============================================
  // GETRÄNKE
  // ============================================
  {
    id: 'real-kaffee',
    keywords: ['kaffee', 'coffee', 'espresso', 'cappuccino', 'latte'],
    imageUrl: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    label: 'Kaffee',
    category: 'getraenke',
  },
  {
    id: 'real-tee',
    keywords: ['tee', 'tea', 'grüner tee', 'schwarzer tee'],
    imageUrl: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    label: 'Tee',
    category: 'getraenke',
  },
  {
    id: 'real-limonade',
    keywords: ['limonade', 'lemonade', 'zitrone', 'erfrischung'],
    imageUrl: 'https://images.unsplash.com/photo-1523677011781-c91d1bbe2f9e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    label: 'Limonade',
    category: 'getraenke',
  },
  {
    id: 'real-smoothie',
    keywords: ['smoothie', 'shake', 'milkshake', 'frucht shake'],
    imageUrl: 'https://images.unsplash.com/photo-1505252585461-04db1eb84625?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    label: 'Smoothie',
    category: 'getraenke',
  },
  {
    id: 'real-wein',
    keywords: ['wein', 'wine', 'rotwein', 'weißwein', 'rosé'],
    imageUrl: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    label: 'Wein',
    category: 'getraenke',
  },
  {
    id: 'real-bier',
    keywords: ['bier', 'beer', 'pils', 'weizen', 'craft beer'],
    imageUrl: 'https://images.unsplash.com/photo-1535958636474-b021ee887b13?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    label: 'Bier',
    category: 'getraenke',
  },
  {
    id: 'real-cocktail',
    keywords: ['cocktail', 'longdrink', 'mojito', 'aperol', 'gin tonic'],
    imageUrl: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    label: 'Cocktail',
    category: 'getraenke',
  },

  // ============================================
  // MEXIKANISCH
  // ============================================
  {
    id: 'real-tacos',
    keywords: ['tacos', 'taco', 'mexikanisch', 'tortilla'],
    imageUrl: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    label: 'Tacos',
    category: 'mexikanisch',
  },
  {
    id: 'real-burrito',
    keywords: ['burrito', 'mexikanisch', 'wrap', 'bohnen'],
    imageUrl: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    label: 'Burrito',
    category: 'mexikanisch',
  },
  {
    id: 'real-nachos',
    keywords: ['nachos', 'chips', 'guacamole', 'salsa', 'käse dip'],
    imageUrl: 'https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    label: 'Nachos',
    category: 'mexikanisch',
  },
  {
    id: 'real-quesadilla',
    keywords: ['quesadilla', 'käse tortilla', 'mexikanisch'],
    imageUrl: 'https://images.unsplash.com/photo-1618040996337-56904b7850b9?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    label: 'Quesadilla',
    category: 'mexikanisch',
  },

  // ============================================
  // FRÜHSTÜCK
  // ============================================
  {
    id: 'real-fruehstueck',
    keywords: ['frühstück', 'breakfast', 'brunch', 'frühstücksteller'],
    imageUrl: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    label: 'Frühstück',
    category: 'fruehstueck',
  },
  {
    id: 'real-eggs-benedict',
    keywords: ['eggs benedict', 'pochierte eier', 'hollandaise'],
    imageUrl: 'https://images.unsplash.com/photo-1608039829572-9b5bfcc5a973?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    label: 'Eggs Benedict',
    category: 'fruehstueck',
  },
  {
    id: 'real-pancakes',
    keywords: ['pancakes', 'pfannkuchen', 'american pancakes', 'waffeln'],
    imageUrl: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    label: 'Pancakes',
    category: 'fruehstueck',
  },
  {
    id: 'real-croissant',
    keywords: ['croissant', 'hörnchen', 'gebäck', 'französisch'],
    imageUrl: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    label: 'Croissant',
    category: 'fruehstueck',
  },
  {
    id: 'real-muesli',
    keywords: ['müsli', 'granola', 'joghurt', 'bowl', 'acai'],
    imageUrl: 'https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    label: 'Müsli Bowl',
    category: 'fruehstueck',
  },

  // ============================================
  // SNACKS
  // ============================================
  {
    id: 'real-chicken-wings',
    keywords: ['chicken wings', 'wings', 'hähnchenflügel', 'buffalo'],
    imageUrl: 'https://images.unsplash.com/photo-1608039755401-742074f0548d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    label: 'Chicken Wings',
    category: 'snacks',
  },
  {
    id: 'real-nuggets',
    keywords: ['nuggets', 'chicken nuggets', 'hühnchen nuggets'],
    imageUrl: 'https://images.unsplash.com/photo-1562967914-608f82629710?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    label: 'Chicken Nuggets',
    category: 'snacks',
  },
  {
    id: 'real-onion-rings',
    keywords: ['onion rings', 'zwiebelringe', 'frittiert'],
    imageUrl: 'https://images.unsplash.com/photo-1639024471283-03518883512d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    label: 'Onion Rings',
    category: 'snacks',
  },

  // ============================================
  // GRIECHISCH
  // ============================================
  {
    id: 'real-gyros',
    keywords: ['gyros', 'pita', 'griechisch', 'tzatziki'],
    imageUrl: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    label: 'Gyros',
    category: 'griechisch',
  },
  {
    id: 'real-souvlaki',
    keywords: ['souvlaki', 'spiess', 'griechisch', 'fleischspieß'],
    imageUrl: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    label: 'Souvlaki',
    category: 'griechisch',
  },
  {
    id: 'real-moussaka',
    keywords: ['moussaka', 'aubergine', 'auflauf', 'griechisch'],
    imageUrl: 'https://images.unsplash.com/photo-1574894709920-11b28e7367e3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    label: 'Moussaka',
    category: 'griechisch',
  },

  // ============================================
  // SEAFOOD
  // ============================================
  {
    id: 'real-lachs',
    keywords: ['lachs', 'salmon', 'fisch', 'gegrillter lachs'],
    imageUrl: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    label: 'Lachs',
    category: 'andere',
  },
  {
    id: 'real-garnelen',
    keywords: ['garnelen', 'shrimps', 'prawns', 'meeresfrüchte', 'scampi'],
    imageUrl: 'https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    label: 'Garnelen',
    category: 'andere',
  },
  {
    id: 'real-thunfisch',
    keywords: ['thunfisch', 'tuna', 'thunfischsteak'],
    imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    label: 'Thunfisch',
    category: 'andere',
  },

  // ============================================
  // VEGAN / VEGETARISCH
  // ============================================
  {
    id: 'real-buddha-bowl',
    keywords: ['buddha bowl', 'bowl', 'vegan bowl', 'gesund'],
    imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    label: 'Buddha Bowl',
    category: 'vegan',
  },
  {
    id: 'real-avocado-toast',
    keywords: ['avocado toast', 'avocado', 'toast', 'gesund'],
    imageUrl: 'https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    label: 'Avocado Toast',
    category: 'vegan',
  },
  {
    id: 'real-hummus',
    keywords: ['hummus', 'kichererbsen dip', 'orientalisch'],
    imageUrl: 'https://images.unsplash.com/photo-1577805947697-89e18249d767?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    label: 'Hummus',
    category: 'vegan',
  },

  // ============================================
  // STEAKS & FLEISCH
  // ============================================
  {
    id: 'real-steak',
    keywords: ['steak', 'rindersteak', 'ribeye', 'entrecote', 'filet'],
    imageUrl: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    label: 'Steak',
    category: 'andere',
  },
  {
    id: 'real-spare-ribs',
    keywords: ['spare ribs', 'ribs', 'rippchen', 'bbq'],
    imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    label: 'Spare Ribs',
    category: 'andere',
  },

  // ============================================
  // INDIAN FOOD
  // ============================================
  {
    id: 'real-butter-chicken',
    keywords: ['butter chicken', 'murgh makhani', 'hähnchen curry', 'indian chicken'],
    imageUrl: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    label: 'Butter Chicken',
    category: 'indisch',
  },
  {
    id: 'real-tikka-masala',
    keywords: ['tikka masala', 'chicken tikka', 'masala', 'indisches curry'],
    imageUrl: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    label: 'Tikka Masala',
    category: 'indisch',
  },
  {
    id: 'real-biryani',
    keywords: ['biryani', 'biriyani', 'indischer reis', 'gewürzreis'],
    imageUrl: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    label: 'Biryani',
    category: 'indisch',
  },
  {
    id: 'real-naan',
    keywords: ['naan', 'naan brot', 'indisches brot', 'fladenbrot'],
    imageUrl: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    label: 'Naan Brot',
    category: 'indisch',
  },
  {
    id: 'real-samosa',
    keywords: ['samosa', 'samosas', 'indische teigtaschen'],
    imageUrl: 'https://images.unsplash.com/photo-1601050690117-94f5f6fa8bd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    label: 'Samosa',
    category: 'indisch',
  },
  {
    id: 'real-tandoori',
    keywords: ['tandoori', 'tandoori chicken', 'tanduri', 'lehmofen'],
    imageUrl: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    label: 'Tandoori Chicken',
    category: 'indisch',
  },
  {
    id: 'real-dal',
    keywords: ['dal', 'dhal', 'linsen', 'indische linsen'],
    imageUrl: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    label: 'Dal',
    category: 'indisch',
  },

  // ============================================
  // KOREAN FOOD
  // ============================================
  {
    id: 'real-bibimbap',
    keywords: ['bibimbap', 'korean rice bowl', 'koreanische reisschale'],
    imageUrl: 'https://images.unsplash.com/photo-1553163147-622ab57be1c7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    label: 'Bibimbap',
    category: 'koreanisch',
  },
  {
    id: 'real-bulgogi',
    keywords: ['bulgogi', 'korean bbq', 'koreanisches bbq'],
    imageUrl: 'https://images.unsplash.com/photo-1590301157890-4810ed352733?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    label: 'Bulgogi',
    category: 'koreanisch',
  },
  {
    id: 'real-kimchi',
    keywords: ['kimchi', 'korean fermented', 'koreanisch'],
    imageUrl: 'https://images.unsplash.com/photo-1583224964978-2257b960c3d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    label: 'Kimchi',
    category: 'koreanisch',
  },
  {
    id: 'real-korean-fried-chicken',
    keywords: ['korean fried chicken', 'koreanisches hähnchen', 'chicken wings korean'],
    imageUrl: 'https://images.unsplash.com/photo-1575932444877-5106bee2a599?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    label: 'Korean Fried Chicken',
    category: 'koreanisch',
  },

  // ============================================
  // VIETNAMESE FOOD
  // ============================================
  {
    id: 'real-banh-mi',
    keywords: ['banh mi', 'vietnamesisches sandwich', 'baguette vietnam'],
    imageUrl: 'https://images.unsplash.com/photo-1600454021293-1dd37c782d9b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    label: 'Bánh Mì',
    category: 'vietnamesisch',
  },
  {
    id: 'real-bun-bo',
    keywords: ['bun bo', 'vietnamesische nudeln', 'reisnudeln'],
    imageUrl: 'https://images.unsplash.com/photo-1576577445504-6af96477db52?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    label: 'Bún Bò',
    category: 'vietnamesisch',
  },

  // ============================================
  // DEUTSCHE SPEZIALITÄTEN (erweitert)
  // ============================================
  {
    id: 'real-kaesespaetzle',
    keywords: ['käsespätzle', 'spätzle', 'schwäbisch', 'allgäuer'],
    imageUrl: 'https://images.unsplash.com/photo-1595295333158-4742f28fbd85?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    label: 'Käsespätzle',
    category: 'deutsch',
  },
  {
    id: 'real-maultaschen',
    keywords: ['maultaschen', 'schwäbische maultaschen', 'teigtaschen'],
    imageUrl: 'https://images.unsplash.com/photo-1587740908075-9e245070dfaa?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    label: 'Maultaschen',
    category: 'deutsch',
  },
  {
    id: 'real-flammkuchen',
    keywords: ['flammkuchen', 'tarte flambée', 'elsässer'],
    imageUrl: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    label: 'Flammkuchen',
    category: 'deutsch',
  },
  {
    id: 'real-weisswurst',
    keywords: ['weißwurst', 'weisswurst', 'bayerisch', 'münchner'],
    imageUrl: 'https://images.unsplash.com/photo-1528607929212-2636ec44253e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    label: 'Weißwurst',
    category: 'deutsch',
  },
  {
    id: 'real-leberkaese',
    keywords: ['leberkäse', 'fleischkäse', 'bayerisch'],
    imageUrl: 'https://images.unsplash.com/photo-1529006557810-274b9b2fc783?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    label: 'Leberkäse',
    category: 'deutsch',
  },
  {
    id: 'real-sauerbraten',
    keywords: ['sauerbraten', 'rheinischer', 'braten'],
    imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    label: 'Sauerbraten',
    category: 'deutsch',
  },
  {
    id: 'real-knoedel',
    keywords: ['knödel', 'klöße', 'semmelknödel', 'kartoffelknödel'],
    imageUrl: 'https://images.unsplash.com/photo-1574894709920-11b28e7367e3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    label: 'Knödel',
    category: 'deutsch',
  },
  {
    id: 'real-sauerkraut',
    keywords: ['sauerkraut', 'kraut', 'fermentiert'],
    imageUrl: 'https://images.unsplash.com/photo-1534939561126-855b8675edd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    label: 'Sauerkraut',
    category: 'deutsch',
  },

  // ============================================
  // MIDDLE EASTERN / ORIENTALISCH
  // ============================================
  {
    id: 'real-shakshuka',
    keywords: ['shakshuka', 'schakschuka', 'eier in tomatensoße'],
    imageUrl: 'https://images.unsplash.com/photo-1590412200988-a436970781fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    label: 'Shakshuka',
    category: 'orientalisch',
  },
  {
    id: 'real-baba-ganoush',
    keywords: ['baba ganoush', 'auberginenpüree', 'auberginendip'],
    imageUrl: 'https://images.unsplash.com/photo-1577805947697-89e18249d767?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    label: 'Baba Ganoush',
    category: 'orientalisch',
  },
  {
    id: 'real-tabbouleh',
    keywords: ['tabbouleh', 'tabouleh', 'petersiliensalat'],
    imageUrl: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    label: 'Tabbouleh',
    category: 'orientalisch',
  },

  // ============================================
  // MEHR FRÜHSTÜCK
  // ============================================
  {
    id: 'real-waffeln',
    keywords: ['waffeln', 'waffel', 'belgian waffle'],
    imageUrl: 'https://images.unsplash.com/photo-1562376552-0d160a2f238d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    label: 'Waffeln',
    category: 'fruehstueck',
  },
  {
    id: 'real-french-toast',
    keywords: ['french toast', 'arme ritter', 'pain perdu'],
    imageUrl: 'https://images.unsplash.com/photo-1484723091739-30a097e8f929?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    label: 'French Toast',
    category: 'fruehstueck',
  },
  {
    id: 'real-omelette',
    keywords: ['omelette', 'omelett', 'eier'],
    imageUrl: 'https://images.unsplash.com/photo-1510693206972-df098062cb71?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    label: 'Omelette',
    category: 'fruehstueck',
  },
  {
    id: 'real-bagel',
    keywords: ['bagel', 'bagels', 'lachs bagel'],
    imageUrl: 'https://images.unsplash.com/photo-1585837146751-a44427b54bc0?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    label: 'Bagel',
    category: 'fruehstueck',
  },
  {
    id: 'real-porridge',
    keywords: ['porridge', 'haferbrei', 'oatmeal'],
    imageUrl: 'https://images.unsplash.com/photo-1517673400267-0251440c45dc?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    label: 'Porridge',
    category: 'fruehstueck',
  },

  // ============================================
  // MEHR GETRÄNKE
  // ============================================
  {
    id: 'real-milkshake',
    keywords: ['milkshake', 'shake', 'milch shake'],
    imageUrl: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    label: 'Milkshake',
    category: 'getraenke',
  },
  {
    id: 'real-chai-latte',
    keywords: ['chai latte', 'chai', 'gewürztee'],
    imageUrl: 'https://images.unsplash.com/photo-1578899952107-9c390f1af1c7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    label: 'Chai Latte',
    category: 'getraenke',
  },
  {
    id: 'real-matcha-latte',
    keywords: ['matcha', 'matcha latte', 'grüntee'],
    imageUrl: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    label: 'Matcha Latte',
    category: 'getraenke',
  },
  {
    id: 'real-mojito',
    keywords: ['mojito', 'cocktail', 'minze'],
    imageUrl: 'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    label: 'Mojito',
    category: 'getraenke',
  },
  {
    id: 'real-aperol-spritz',
    keywords: ['aperol', 'aperol spritz', 'spritz'],
    imageUrl: 'https://images.unsplash.com/photo-1560508179-b2c9a3f8e92b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    label: 'Aperol Spritz',
    category: 'getraenke',
  },
  {
    id: 'real-eiskaffee',
    keywords: ['eiskaffee', 'iced coffee', 'kalter kaffee'],
    imageUrl: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    label: 'Eiskaffee',
    category: 'getraenke',
  },

  // ============================================
  // MEHR DESSERTS
  // ============================================
  {
    id: 'real-creme-brulee',
    keywords: ['crème brûlée', 'creme brulee', 'karamell'],
    imageUrl: 'https://images.unsplash.com/photo-1470124182917-cc6e71b22ecc?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    label: 'Crème Brûlée',
    category: 'desserts',
  },
  {
    id: 'real-mousse-chocolat',
    keywords: ['mousse au chocolat', 'schokomousse', 'chocolate mousse'],
    imageUrl: 'https://images.unsplash.com/photo-1541783245831-57d6fb0926d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    label: 'Mousse au Chocolat',
    category: 'desserts',
  },
  {
    id: 'real-apfelstrudel',
    keywords: ['apfelstrudel', 'strudel', 'apple strudel'],
    imageUrl: 'https://images.unsplash.com/photo-1568571780765-9276ac8b75a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    label: 'Apfelstrudel',
    category: 'desserts',
  },
  {
    id: 'real-muffin',
    keywords: ['muffin', 'muffins', 'cupcake'],
    imageUrl: 'https://images.unsplash.com/photo-1607958996333-41aef7caefaa?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    label: 'Muffin',
    category: 'desserts',
  },
  {
    id: 'real-waffel-eis',
    keywords: ['waffel mit eis', 'ice cream waffle', 'eiscreme waffel'],
    imageUrl: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    label: 'Waffel mit Eis',
    category: 'desserts',
  },
  {
    id: 'real-donut',
    keywords: ['donut', 'doughnut', 'krapfen'],
    imageUrl: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    label: 'Donut',
    category: 'desserts',
  },
  {
    id: 'real-baklava',
    keywords: ['baklava', 'türkisches gebäck', 'griechisches gebäck'],
    imageUrl: 'https://images.unsplash.com/photo-1598110750624-207050c4f28c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    label: 'Baklava',
    category: 'desserts',
  },

  // ============================================
  // MEHR SNACKS
  // ============================================
  {
    id: 'real-mozzarella-sticks',
    keywords: ['mozzarella sticks', 'käse sticks', 'cheese sticks'],
    imageUrl: 'https://images.unsplash.com/photo-1531749668029-2db88e4276c7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    label: 'Mozzarella Sticks',
    category: 'snacks',
  },
  {
    id: 'real-jalapeno-poppers',
    keywords: ['jalapeño poppers', 'jalapeno', 'gefüllte paprika'],
    imageUrl: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    label: 'Jalapeño Poppers',
    category: 'snacks',
  },
  {
    id: 'real-bruschetta',
    keywords: ['bruschetta', 'tomaten brot', 'italienische vorspeise'],
    imageUrl: 'https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    label: 'Bruschetta',
    category: 'snacks',
  },
  {
    id: 'real-garlic-bread',
    keywords: ['knoblauchbrot', 'garlic bread', 'knoblauch baguette'],
    imageUrl: 'https://images.unsplash.com/photo-1573140247632-f8fd74997d5c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    label: 'Knoblauchbrot',
    category: 'snacks',
  },

  // ============================================
  // SANDWICHES & WRAPS
  // ============================================
  {
    id: 'real-club-sandwich',
    keywords: ['club sandwich', 'sandwich', 'toast sandwich'],
    imageUrl: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    label: 'Club Sandwich',
    category: 'sandwiches',
  },
  {
    id: 'real-wrap',
    keywords: ['wrap', 'tortilla wrap', 'chicken wrap'],
    imageUrl: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    label: 'Wrap',
    category: 'sandwiches',
  },
  {
    id: 'real-belegtes-broetchen',
    keywords: ['belegtes brötchen', 'sandwich', 'brötchen'],
    imageUrl: 'https://images.unsplash.com/photo-1553909489-cd47e0907980?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    label: 'Belegtes Brötchen',
    category: 'sandwiches',
  },
];

/**
 * Get a realistic food image by matching keywords
 */
export function getRealisticFoodImage(dishName: string): RealisticFoodImage | null {
  const normalizedName = dishName.toLowerCase().trim();

  // First try exact match
  for (const image of REALISTIC_FOOD_LIBRARY) {
    for (const keyword of image.keywords) {
      if (normalizedName.includes(keyword.toLowerCase()) ||
          keyword.toLowerCase().includes(normalizedName)) {
        return image;
      }
    }
  }

  // Try partial word matching
  const words = normalizedName.split(/\s+/);
  for (const image of REALISTIC_FOOD_LIBRARY) {
    for (const keyword of image.keywords) {
      const keywordWords = keyword.toLowerCase().split(/\s+/);
      for (const word of words) {
        if (word.length > 2 && keywordWords.some(kw => kw.includes(word) || word.includes(kw))) {
          return image;
        }
      }
    }
  }

  return null;
}

/**
 * Get all realistic images for a category
 */
export function getRealisticImagesByCategory(category: string): RealisticFoodImage[] {
  return REALISTIC_FOOD_LIBRARY.filter(img => img.category === category);
}
