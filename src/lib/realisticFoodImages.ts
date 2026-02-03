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
    imageUrl: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400&h=300&fit=crop',
    label: 'Döner Kebab',
    category: 'doener',
    photographer: 'Unsplash',
  },
  {
    id: 'real-dueruem',
    keywords: ['dürüm', 'durum', 'wrap', 'yufka', 'rolle'],
    imageUrl: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=400&h=300&fit=crop',
    label: 'Dürüm Wrap',
    category: 'doener',
  },
  {
    id: 'real-falafel',
    keywords: ['falafel', 'kichererbsen', 'hummus'],
    imageUrl: 'https://images.unsplash.com/photo-1593001874117-c99c800e3eb7?w=400&h=300&fit=crop',
    label: 'Falafel',
    category: 'doener',
  },
  {
    id: 'real-pide',
    keywords: ['pide', 'türkische pizza', 'lahmacun'],
    imageUrl: 'https://images.unsplash.com/photo-1590212151175-e58edd96185b?w=400&h=300&fit=crop',
    label: 'Pide',
    category: 'doener',
  },

  // ============================================
  // PIZZA
  // ============================================
  {
    id: 'real-pizza-margherita',
    keywords: ['pizza margherita', 'margherita', 'pizza tomate', 'pizza mozzarella'],
    imageUrl: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&h=300&fit=crop',
    label: 'Pizza Margherita',
    category: 'pizza',
  },
  {
    id: 'real-pizza-salami',
    keywords: ['pizza salami', 'pizza pepperoni', 'salami pizza', 'peperoni'],
    imageUrl: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400&h=300&fit=crop',
    label: 'Pizza Salami',
    category: 'pizza',
  },
  {
    id: 'real-pizza-hawaii',
    keywords: ['pizza hawaii', 'hawaii', 'pizza ananas', 'pizza schinken'],
    imageUrl: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=300&fit=crop',
    label: 'Pizza Hawaii',
    category: 'pizza',
  },
  {
    id: 'real-pizza-funghi',
    keywords: ['pizza funghi', 'pizza pilze', 'champignon pizza', 'mushroom pizza'],
    imageUrl: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=300&fit=crop',
    label: 'Pizza Funghi',
    category: 'pizza',
  },
  {
    id: 'real-pizza-quattro',
    keywords: ['pizza quattro', 'pizza vier', '4 jahreszeiten', 'quattro stagioni', 'quattro formaggi'],
    imageUrl: 'https://images.unsplash.com/photo-1604382355076-af4b0eb60143?w=400&h=300&fit=crop',
    label: 'Pizza Quattro',
    category: 'pizza',
  },

  // ============================================
  // PASTA
  // ============================================
  {
    id: 'real-spaghetti-bolognese',
    keywords: ['spaghetti', 'bolognese', 'pasta bolognese', 'ragù', 'fleischsoße'],
    imageUrl: 'https://images.unsplash.com/photo-1622973536968-3ead9e780960?w=400&h=300&fit=crop',
    label: 'Spaghetti Bolognese',
    category: 'pasta',
  },
  {
    id: 'real-spaghetti-carbonara',
    keywords: ['carbonara', 'spaghetti carbonara', 'pasta carbonara', 'speck', 'ei'],
    imageUrl: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?w=400&h=300&fit=crop',
    label: 'Spaghetti Carbonara',
    category: 'pasta',
  },
  {
    id: 'real-lasagne',
    keywords: ['lasagne', 'lasagna', 'nudelauflauf'],
    imageUrl: 'https://images.unsplash.com/photo-1574894709920-11b28e7367e3?w=400&h=300&fit=crop',
    label: 'Lasagne',
    category: 'pasta',
  },
  {
    id: 'real-penne',
    keywords: ['penne', 'penne arrabiata', 'penne pasta', 'rigatoni'],
    imageUrl: 'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=400&h=300&fit=crop',
    label: 'Penne',
    category: 'pasta',
  },
  {
    id: 'real-ravioli',
    keywords: ['ravioli', 'tortellini', 'gefüllte pasta', 'agnolotti'],
    imageUrl: 'https://images.unsplash.com/photo-1587740908075-9e245070dfaa?w=400&h=300&fit=crop',
    label: 'Ravioli',
    category: 'pasta',
  },
  {
    id: 'real-gnocchi',
    keywords: ['gnocchi', 'kartoffelklöße', 'italienische klöße'],
    imageUrl: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=400&h=300&fit=crop',
    label: 'Gnocchi',
    category: 'pasta',
  },

  // ============================================
  // BURGER
  // ============================================
  {
    id: 'real-burger-classic',
    keywords: ['burger', 'hamburger', 'cheeseburger', 'rindfleisch burger'],
    imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop',
    label: 'Burger',
    category: 'burger',
  },
  {
    id: 'real-burger-bacon',
    keywords: ['bacon burger', 'speck burger', 'bbq burger'],
    imageUrl: 'https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=400&h=300&fit=crop',
    label: 'Bacon Burger',
    category: 'burger',
  },
  {
    id: 'real-burger-chicken',
    keywords: ['chicken burger', 'hähnchen burger', 'crispy chicken'],
    imageUrl: 'https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=400&h=300&fit=crop',
    label: 'Chicken Burger',
    category: 'burger',
  },
  {
    id: 'real-burger-veggie',
    keywords: ['veggie burger', 'vegetarischer burger', 'vegan burger', 'plant based'],
    imageUrl: 'https://images.unsplash.com/photo-1520072959219-c595dc870360?w=400&h=300&fit=crop',
    label: 'Veggie Burger',
    category: 'burger',
  },

  // ============================================
  // ASIATISCH
  // ============================================
  {
    id: 'real-sushi',
    keywords: ['sushi', 'maki', 'nigiri', 'sashimi', 'lachs sushi'],
    imageUrl: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=400&h=300&fit=crop',
    label: 'Sushi',
    category: 'asiatisch',
  },
  {
    id: 'real-ramen',
    keywords: ['ramen', 'nudelsuppe', 'japanische suppe', 'tonkotsu'],
    imageUrl: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&h=300&fit=crop',
    label: 'Ramen',
    category: 'asiatisch',
  },
  {
    id: 'real-pho',
    keywords: ['pho', 'vietnamesisch', 'vietnamese suppe', 'reisnudelsuppe'],
    imageUrl: 'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=400&h=300&fit=crop',
    label: 'Pho',
    category: 'asiatisch',
  },
  {
    id: 'real-curry',
    keywords: ['curry', 'thai curry', 'indisches curry', 'red curry', 'green curry'],
    imageUrl: 'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=400&h=300&fit=crop',
    label: 'Curry',
    category: 'asiatisch',
  },
  {
    id: 'real-pad-thai',
    keywords: ['pad thai', 'gebratene nudeln', 'thai nudeln', 'wok nudeln'],
    imageUrl: 'https://images.unsplash.com/photo-1559314809-0d155014e29e?w=400&h=300&fit=crop',
    label: 'Pad Thai',
    category: 'asiatisch',
  },
  {
    id: 'real-fried-rice',
    keywords: ['gebratener reis', 'fried rice', 'nasi goreng', 'reis mit gemüse'],
    imageUrl: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&h=300&fit=crop',
    label: 'Gebratener Reis',
    category: 'asiatisch',
  },
  {
    id: 'real-spring-rolls',
    keywords: ['frühlingsrolle', 'spring rolls', 'sommerrollen', 'asia rolle'],
    imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=400&h=300&fit=crop',
    label: 'Frühlingsrollen',
    category: 'asiatisch',
  },
  {
    id: 'real-dim-sum',
    keywords: ['dim sum', 'dumplings', 'gyoza', 'teigtaschen', 'wan tan'],
    imageUrl: 'https://images.unsplash.com/photo-1496116218417-1a781b1c416c?w=400&h=300&fit=crop',
    label: 'Dim Sum',
    category: 'asiatisch',
  },

  // ============================================
  // DEUTSCH / TRADITIONELL
  // ============================================
  {
    id: 'real-schnitzel',
    keywords: ['schnitzel', 'wiener schnitzel', 'paniertes schnitzel', 'schweineschnitzel'],
    imageUrl: 'https://images.unsplash.com/photo-1599921841143-819065a55cc6?w=400&h=300&fit=crop',
    label: 'Schnitzel',
    category: 'deutsch',
  },
  {
    id: 'real-bratwurst',
    keywords: ['bratwurst', 'wurst', 'currywurst', 'thüringer', 'nürnberger'],
    imageUrl: 'https://images.unsplash.com/photo-1528607929212-2636ec44253e?w=400&h=300&fit=crop',
    label: 'Bratwurst',
    category: 'deutsch',
  },
  {
    id: 'real-braten',
    keywords: ['braten', 'schweinebraten', 'rinderbraten', 'sauerbraten', 'sonntagsbraten'],
    imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=400&h=300&fit=crop',
    label: 'Braten',
    category: 'deutsch',
  },
  {
    id: 'real-gulasch',
    keywords: ['gulasch', 'gulash', 'rindergulasch', 'ungarisch'],
    imageUrl: 'https://images.unsplash.com/photo-1534939561126-855b8675edd7?w=400&h=300&fit=crop',
    label: 'Gulasch',
    category: 'deutsch',
  },
  {
    id: 'real-kartoffeln',
    keywords: ['kartoffeln', 'bratkartoffeln', 'kartoffelpüree', 'pommes', 'wedges'],
    imageUrl: 'https://images.unsplash.com/photo-1518013431117-eb1465fa5752?w=400&h=300&fit=crop',
    label: 'Kartoffeln',
    category: 'deutsch',
  },

  // ============================================
  // SALATE
  // ============================================
  {
    id: 'real-salat-gemischt',
    keywords: ['salat', 'gemischter salat', 'beilagensalat', 'garden salad'],
    imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop',
    label: 'Gemischter Salat',
    category: 'salate',
  },
  {
    id: 'real-caesar-salat',
    keywords: ['caesar salat', 'caesar salad', 'hähnchen salat', 'chicken salad'],
    imageUrl: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?w=400&h=300&fit=crop',
    label: 'Caesar Salat',
    category: 'salate',
  },
  {
    id: 'real-griechischer-salat',
    keywords: ['griechischer salat', 'greek salad', 'bauernsalat', 'feta salat'],
    imageUrl: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400&h=300&fit=crop',
    label: 'Griechischer Salat',
    category: 'salate',
  },

  // ============================================
  // SUPPEN
  // ============================================
  {
    id: 'real-tomatensuppe',
    keywords: ['tomatensuppe', 'tomato soup', 'suppe'],
    imageUrl: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&h=300&fit=crop',
    label: 'Tomatensuppe',
    category: 'suppen',
  },
  {
    id: 'real-kuerbissuppe',
    keywords: ['kürbissuppe', 'pumpkin soup', 'hokkaido'],
    imageUrl: 'https://images.unsplash.com/photo-1476718406336-bb5a9690ee2a?w=400&h=300&fit=crop',
    label: 'Kürbissuppe',
    category: 'suppen',
  },
  {
    id: 'real-huehnersuppe',
    keywords: ['hühnersuppe', 'chicken soup', 'nudelsuppe', 'bouillon'],
    imageUrl: 'https://images.unsplash.com/photo-1604152135912-04a022e23696?w=400&h=300&fit=crop',
    label: 'Hühnersuppe',
    category: 'suppen',
  },

  // ============================================
  // BEILAGEN
  // ============================================
  {
    id: 'real-pommes',
    keywords: ['pommes', 'pommes frites', 'fries', 'fritten'],
    imageUrl: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400&h=300&fit=crop',
    label: 'Pommes Frites',
    category: 'beilagen',
  },
  {
    id: 'real-suesskartoffel-pommes',
    keywords: ['süßkartoffel', 'sweet potato', 'süßkartoffelpommes'],
    imageUrl: 'https://images.unsplash.com/photo-1604152135912-04a022e23696?w=400&h=300&fit=crop',
    label: 'Süßkartoffel Pommes',
    category: 'beilagen',
  },
  {
    id: 'real-reis',
    keywords: ['reis', 'rice', 'basmati', 'jasmin reis'],
    imageUrl: 'https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?w=400&h=300&fit=crop',
    label: 'Reis',
    category: 'beilagen',
  },
  {
    id: 'real-brot',
    keywords: ['brot', 'bread', 'baguette', 'brotkorb', 'fladenbrot'],
    imageUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=300&fit=crop',
    label: 'Brot',
    category: 'beilagen',
  },

  // ============================================
  // DESSERTS
  // ============================================
  {
    id: 'real-tiramisu',
    keywords: ['tiramisu', 'mascarpone', 'italienisches dessert'],
    imageUrl: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&h=300&fit=crop',
    label: 'Tiramisu',
    category: 'desserts',
  },
  {
    id: 'real-cheesecake',
    keywords: ['cheesecake', 'käsekuchen', 'new york cheesecake'],
    imageUrl: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400&h=300&fit=crop',
    label: 'Cheesecake',
    category: 'desserts',
  },
  {
    id: 'real-schokoladenkuchen',
    keywords: ['schokoladenkuchen', 'chocolate cake', 'brownie', 'schokokuchen'],
    imageUrl: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop',
    label: 'Schokoladenkuchen',
    category: 'desserts',
  },
  {
    id: 'real-eis',
    keywords: ['eis', 'ice cream', 'gelato', 'eiskugel', 'vanilleeis'],
    imageUrl: 'https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?w=400&h=300&fit=crop',
    label: 'Eis',
    category: 'desserts',
  },
  {
    id: 'real-panna-cotta',
    keywords: ['panna cotta', 'sahne dessert', 'italienisch'],
    imageUrl: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&h=300&fit=crop',
    label: 'Panna Cotta',
    category: 'desserts',
  },

  // ============================================
  // GETRÄNKE
  // ============================================
  {
    id: 'real-kaffee',
    keywords: ['kaffee', 'coffee', 'espresso', 'cappuccino', 'latte'],
    imageUrl: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&h=300&fit=crop',
    label: 'Kaffee',
    category: 'getraenke',
  },
  {
    id: 'real-tee',
    keywords: ['tee', 'tea', 'grüner tee', 'schwarzer tee'],
    imageUrl: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&h=300&fit=crop',
    label: 'Tee',
    category: 'getraenke',
  },
  {
    id: 'real-limonade',
    keywords: ['limonade', 'lemonade', 'zitrone', 'erfrischung'],
    imageUrl: 'https://images.unsplash.com/photo-1523677011781-c91d1bbe2f9e?w=400&h=300&fit=crop',
    label: 'Limonade',
    category: 'getraenke',
  },
  {
    id: 'real-smoothie',
    keywords: ['smoothie', 'shake', 'milkshake', 'frucht shake'],
    imageUrl: 'https://images.unsplash.com/photo-1505252585461-04db1eb84625?w=400&h=300&fit=crop',
    label: 'Smoothie',
    category: 'getraenke',
  },
  {
    id: 'real-wein',
    keywords: ['wein', 'wine', 'rotwein', 'weißwein', 'rosé'],
    imageUrl: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=400&h=300&fit=crop',
    label: 'Wein',
    category: 'getraenke',
  },
  {
    id: 'real-bier',
    keywords: ['bier', 'beer', 'pils', 'weizen', 'craft beer'],
    imageUrl: 'https://images.unsplash.com/photo-1535958636474-b021ee887b13?w=400&h=300&fit=crop',
    label: 'Bier',
    category: 'getraenke',
  },
  {
    id: 'real-cocktail',
    keywords: ['cocktail', 'longdrink', 'mojito', 'aperol', 'gin tonic'],
    imageUrl: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=400&h=300&fit=crop',
    label: 'Cocktail',
    category: 'getraenke',
  },

  // ============================================
  // MEXIKANISCH
  // ============================================
  {
    id: 'real-tacos',
    keywords: ['tacos', 'taco', 'mexikanisch', 'tortilla'],
    imageUrl: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400&h=300&fit=crop',
    label: 'Tacos',
    category: 'mexikanisch',
  },
  {
    id: 'real-burrito',
    keywords: ['burrito', 'mexikanisch', 'wrap', 'bohnen'],
    imageUrl: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=400&h=300&fit=crop',
    label: 'Burrito',
    category: 'mexikanisch',
  },
  {
    id: 'real-nachos',
    keywords: ['nachos', 'chips', 'guacamole', 'salsa', 'käse dip'],
    imageUrl: 'https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?w=400&h=300&fit=crop',
    label: 'Nachos',
    category: 'mexikanisch',
  },
  {
    id: 'real-quesadilla',
    keywords: ['quesadilla', 'käse tortilla', 'mexikanisch'],
    imageUrl: 'https://images.unsplash.com/photo-1618040996337-56904b7850b9?w=400&h=300&fit=crop',
    label: 'Quesadilla',
    category: 'mexikanisch',
  },

  // ============================================
  // FRÜHSTÜCK
  // ============================================
  {
    id: 'real-fruehstueck',
    keywords: ['frühstück', 'breakfast', 'brunch', 'frühstücksteller'],
    imageUrl: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=400&h=300&fit=crop',
    label: 'Frühstück',
    category: 'fruehstueck',
  },
  {
    id: 'real-eggs-benedict',
    keywords: ['eggs benedict', 'pochierte eier', 'hollandaise'],
    imageUrl: 'https://images.unsplash.com/photo-1608039829572-9b5bfcc5a973?w=400&h=300&fit=crop',
    label: 'Eggs Benedict',
    category: 'fruehstueck',
  },
  {
    id: 'real-pancakes',
    keywords: ['pancakes', 'pfannkuchen', 'american pancakes', 'waffeln'],
    imageUrl: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&h=300&fit=crop',
    label: 'Pancakes',
    category: 'fruehstueck',
  },
  {
    id: 'real-croissant',
    keywords: ['croissant', 'hörnchen', 'gebäck', 'französisch'],
    imageUrl: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400&h=300&fit=crop',
    label: 'Croissant',
    category: 'fruehstueck',
  },
  {
    id: 'real-muesli',
    keywords: ['müsli', 'granola', 'joghurt', 'bowl', 'acai'],
    imageUrl: 'https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?w=400&h=300&fit=crop',
    label: 'Müsli Bowl',
    category: 'fruehstueck',
  },

  // ============================================
  // SNACKS
  // ============================================
  {
    id: 'real-chicken-wings',
    keywords: ['chicken wings', 'wings', 'hähnchenflügel', 'buffalo'],
    imageUrl: 'https://images.unsplash.com/photo-1608039755401-742074f0548d?w=400&h=300&fit=crop',
    label: 'Chicken Wings',
    category: 'snacks',
  },
  {
    id: 'real-nuggets',
    keywords: ['nuggets', 'chicken nuggets', 'hühnchen nuggets'],
    imageUrl: 'https://images.unsplash.com/photo-1562967914-608f82629710?w=400&h=300&fit=crop',
    label: 'Chicken Nuggets',
    category: 'snacks',
  },
  {
    id: 'real-onion-rings',
    keywords: ['onion rings', 'zwiebelringe', 'frittiert'],
    imageUrl: 'https://images.unsplash.com/photo-1639024471283-03518883512d?w=400&h=300&fit=crop',
    label: 'Onion Rings',
    category: 'snacks',
  },

  // ============================================
  // GRIECHISCH
  // ============================================
  {
    id: 'real-gyros',
    keywords: ['gyros', 'pita', 'griechisch', 'tzatziki'],
    imageUrl: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400&h=300&fit=crop',
    label: 'Gyros',
    category: 'griechisch',
  },
  {
    id: 'real-souvlaki',
    keywords: ['souvlaki', 'spiess', 'griechisch', 'fleischspieß'],
    imageUrl: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=300&fit=crop',
    label: 'Souvlaki',
    category: 'griechisch',
  },
  {
    id: 'real-moussaka',
    keywords: ['moussaka', 'aubergine', 'auflauf', 'griechisch'],
    imageUrl: 'https://images.unsplash.com/photo-1574894709920-11b28e7367e3?w=400&h=300&fit=crop',
    label: 'Moussaka',
    category: 'griechisch',
  },

  // ============================================
  // SEAFOOD
  // ============================================
  {
    id: 'real-lachs',
    keywords: ['lachs', 'salmon', 'fisch', 'gegrillter lachs'],
    imageUrl: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&h=300&fit=crop',
    label: 'Lachs',
    category: 'andere',
  },
  {
    id: 'real-garnelen',
    keywords: ['garnelen', 'shrimps', 'prawns', 'meeresfrüchte', 'scampi'],
    imageUrl: 'https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?w=400&h=300&fit=crop',
    label: 'Garnelen',
    category: 'andere',
  },
  {
    id: 'real-thunfisch',
    keywords: ['thunfisch', 'tuna', 'thunfischsteak'],
    imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop',
    label: 'Thunfisch',
    category: 'andere',
  },

  // ============================================
  // VEGAN / VEGETARISCH
  // ============================================
  {
    id: 'real-buddha-bowl',
    keywords: ['buddha bowl', 'bowl', 'vegan bowl', 'gesund'],
    imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop',
    label: 'Buddha Bowl',
    category: 'vegan',
  },
  {
    id: 'real-avocado-toast',
    keywords: ['avocado toast', 'avocado', 'toast', 'gesund'],
    imageUrl: 'https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?w=400&h=300&fit=crop',
    label: 'Avocado Toast',
    category: 'vegan',
  },
  {
    id: 'real-hummus',
    keywords: ['hummus', 'kichererbsen dip', 'orientalisch'],
    imageUrl: 'https://images.unsplash.com/photo-1577805947697-89e18249d767?w=400&h=300&fit=crop',
    label: 'Hummus',
    category: 'vegan',
  },

  // ============================================
  // STEAKS & FLEISCH
  // ============================================
  {
    id: 'real-steak',
    keywords: ['steak', 'rindersteak', 'ribeye', 'entrecote', 'filet'],
    imageUrl: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?w=400&h=300&fit=crop',
    label: 'Steak',
    category: 'andere',
  },
  {
    id: 'real-spare-ribs',
    keywords: ['spare ribs', 'ribs', 'rippchen', 'bbq'],
    imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=400&h=300&fit=crop',
    label: 'Spare Ribs',
    category: 'andere',
  },

  // ============================================
  // INDIAN FOOD
  // ============================================
  {
    id: 'real-butter-chicken',
    keywords: ['butter chicken', 'murgh makhani', 'hähnchen curry', 'indian chicken'],
    imageUrl: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=400&h=300&fit=crop',
    label: 'Butter Chicken',
    category: 'indisch',
  },
  {
    id: 'real-tikka-masala',
    keywords: ['tikka masala', 'chicken tikka', 'masala', 'indisches curry'],
    imageUrl: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&h=300&fit=crop',
    label: 'Tikka Masala',
    category: 'indisch',
  },
  {
    id: 'real-biryani',
    keywords: ['biryani', 'biriyani', 'indischer reis', 'gewürzreis'],
    imageUrl: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400&h=300&fit=crop',
    label: 'Biryani',
    category: 'indisch',
  },
  {
    id: 'real-naan',
    keywords: ['naan', 'naan brot', 'indisches brot', 'fladenbrot'],
    imageUrl: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&h=300&fit=crop',
    label: 'Naan Brot',
    category: 'indisch',
  },
  {
    id: 'real-samosa',
    keywords: ['samosa', 'samosas', 'indische teigtaschen'],
    imageUrl: 'https://images.unsplash.com/photo-1601050690117-94f5f6fa8bd7?w=400&h=300&fit=crop',
    label: 'Samosa',
    category: 'indisch',
  },
  {
    id: 'real-tandoori',
    keywords: ['tandoori', 'tandoori chicken', 'tanduri', 'lehmofen'],
    imageUrl: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400&h=300&fit=crop',
    label: 'Tandoori Chicken',
    category: 'indisch',
  },
  {
    id: 'real-dal',
    keywords: ['dal', 'dhal', 'linsen', 'indische linsen'],
    imageUrl: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop',
    label: 'Dal',
    category: 'indisch',
  },

  // ============================================
  // KOREAN FOOD
  // ============================================
  {
    id: 'real-bibimbap',
    keywords: ['bibimbap', 'korean rice bowl', 'koreanische reisschale'],
    imageUrl: 'https://images.unsplash.com/photo-1553163147-622ab57be1c7?w=400&h=300&fit=crop',
    label: 'Bibimbap',
    category: 'koreanisch',
  },
  {
    id: 'real-bulgogi',
    keywords: ['bulgogi', 'korean bbq', 'koreanisches bbq'],
    imageUrl: 'https://images.unsplash.com/photo-1590301157890-4810ed352733?w=400&h=300&fit=crop',
    label: 'Bulgogi',
    category: 'koreanisch',
  },
  {
    id: 'real-kimchi',
    keywords: ['kimchi', 'korean fermented', 'koreanisch'],
    imageUrl: 'https://images.unsplash.com/photo-1583224964978-2257b960c3d3?w=400&h=300&fit=crop',
    label: 'Kimchi',
    category: 'koreanisch',
  },
  {
    id: 'real-korean-fried-chicken',
    keywords: ['korean fried chicken', 'koreanisches hähnchen', 'chicken wings korean'],
    imageUrl: 'https://images.unsplash.com/photo-1575932444877-5106bee2a599?w=400&h=300&fit=crop',
    label: 'Korean Fried Chicken',
    category: 'koreanisch',
  },

  // ============================================
  // VIETNAMESE FOOD
  // ============================================
  {
    id: 'real-banh-mi',
    keywords: ['banh mi', 'vietnamesisches sandwich', 'baguette vietnam'],
    imageUrl: 'https://images.unsplash.com/photo-1600454021293-1dd37c782d9b?w=400&h=300&fit=crop',
    label: 'Bánh Mì',
    category: 'vietnamesisch',
  },
  {
    id: 'real-bun-bo',
    keywords: ['bun bo', 'vietnamesische nudeln', 'reisnudeln'],
    imageUrl: 'https://images.unsplash.com/photo-1576577445504-6af96477db52?w=400&h=300&fit=crop',
    label: 'Bún Bò',
    category: 'vietnamesisch',
  },

  // ============================================
  // DEUTSCHE SPEZIALITÄTEN (erweitert)
  // ============================================
  {
    id: 'real-kaesespaetzle',
    keywords: ['käsespätzle', 'spätzle', 'schwäbisch', 'allgäuer'],
    imageUrl: 'https://images.unsplash.com/photo-1595295333158-4742f28fbd85?w=400&h=300&fit=crop',
    label: 'Käsespätzle',
    category: 'deutsch',
  },
  {
    id: 'real-maultaschen',
    keywords: ['maultaschen', 'schwäbische maultaschen', 'teigtaschen'],
    imageUrl: 'https://images.unsplash.com/photo-1587740908075-9e245070dfaa?w=400&h=300&fit=crop',
    label: 'Maultaschen',
    category: 'deutsch',
  },
  {
    id: 'real-flammkuchen',
    keywords: ['flammkuchen', 'tarte flambée', 'elsässer'],
    imageUrl: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=300&fit=crop',
    label: 'Flammkuchen',
    category: 'deutsch',
  },
  {
    id: 'real-weisswurst',
    keywords: ['weißwurst', 'weisswurst', 'bayerisch', 'münchner'],
    imageUrl: 'https://images.unsplash.com/photo-1528607929212-2636ec44253e?w=400&h=300&fit=crop',
    label: 'Weißwurst',
    category: 'deutsch',
  },
  {
    id: 'real-leberkaese',
    keywords: ['leberkäse', 'fleischkäse', 'bayerisch'],
    imageUrl: 'https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=400&h=300&fit=crop',
    label: 'Leberkäse',
    category: 'deutsch',
  },
  {
    id: 'real-sauerbraten',
    keywords: ['sauerbraten', 'rheinischer', 'braten'],
    imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=400&h=300&fit=crop',
    label: 'Sauerbraten',
    category: 'deutsch',
  },
  {
    id: 'real-knoedel',
    keywords: ['knödel', 'klöße', 'semmelknödel', 'kartoffelknödel'],
    imageUrl: 'https://images.unsplash.com/photo-1574894709920-11b28e7367e3?w=400&h=300&fit=crop',
    label: 'Knödel',
    category: 'deutsch',
  },
  {
    id: 'real-sauerkraut',
    keywords: ['sauerkraut', 'kraut', 'fermentiert'],
    imageUrl: 'https://images.unsplash.com/photo-1534939561126-855b8675edd7?w=400&h=300&fit=crop',
    label: 'Sauerkraut',
    category: 'deutsch',
  },

  // ============================================
  // MIDDLE EASTERN / ORIENTALISCH
  // ============================================
  {
    id: 'real-shakshuka',
    keywords: ['shakshuka', 'schakschuka', 'eier in tomatensoße'],
    imageUrl: 'https://images.unsplash.com/photo-1590412200988-a436970781fa?w=400&h=300&fit=crop',
    label: 'Shakshuka',
    category: 'orientalisch',
  },
  {
    id: 'real-baba-ganoush',
    keywords: ['baba ganoush', 'auberginenpüree', 'auberginendip'],
    imageUrl: 'https://images.unsplash.com/photo-1577805947697-89e18249d767?w=400&h=300&fit=crop',
    label: 'Baba Ganoush',
    category: 'orientalisch',
  },
  {
    id: 'real-tabbouleh',
    keywords: ['tabbouleh', 'tabouleh', 'petersiliensalat'],
    imageUrl: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400&h=300&fit=crop',
    label: 'Tabbouleh',
    category: 'orientalisch',
  },

  // ============================================
  // MEHR FRÜHSTÜCK
  // ============================================
  {
    id: 'real-waffeln',
    keywords: ['waffeln', 'waffel', 'belgian waffle'],
    imageUrl: 'https://images.unsplash.com/photo-1562376552-0d160a2f238d?w=400&h=300&fit=crop',
    label: 'Waffeln',
    category: 'fruehstueck',
  },
  {
    id: 'real-french-toast',
    keywords: ['french toast', 'arme ritter', 'pain perdu'],
    imageUrl: 'https://images.unsplash.com/photo-1484723091739-30a097e8f929?w=400&h=300&fit=crop',
    label: 'French Toast',
    category: 'fruehstueck',
  },
  {
    id: 'real-omelette',
    keywords: ['omelette', 'omelett', 'eier'],
    imageUrl: 'https://images.unsplash.com/photo-1510693206972-df098062cb71?w=400&h=300&fit=crop',
    label: 'Omelette',
    category: 'fruehstueck',
  },
  {
    id: 'real-bagel',
    keywords: ['bagel', 'bagels', 'lachs bagel'],
    imageUrl: 'https://images.unsplash.com/photo-1585837146751-a44427b54bc0?w=400&h=300&fit=crop',
    label: 'Bagel',
    category: 'fruehstueck',
  },
  {
    id: 'real-porridge',
    keywords: ['porridge', 'haferbrei', 'oatmeal'],
    imageUrl: 'https://images.unsplash.com/photo-1517673400267-0251440c45dc?w=400&h=300&fit=crop',
    label: 'Porridge',
    category: 'fruehstueck',
  },

  // ============================================
  // MEHR GETRÄNKE
  // ============================================
  {
    id: 'real-milkshake',
    keywords: ['milkshake', 'shake', 'milch shake'],
    imageUrl: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=400&h=300&fit=crop',
    label: 'Milkshake',
    category: 'getraenke',
  },
  {
    id: 'real-chai-latte',
    keywords: ['chai latte', 'chai', 'gewürztee'],
    imageUrl: 'https://images.unsplash.com/photo-1578899952107-9c390f1af1c7?w=400&h=300&fit=crop',
    label: 'Chai Latte',
    category: 'getraenke',
  },
  {
    id: 'real-matcha-latte',
    keywords: ['matcha', 'matcha latte', 'grüntee'],
    imageUrl: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?w=400&h=300&fit=crop',
    label: 'Matcha Latte',
    category: 'getraenke',
  },
  {
    id: 'real-mojito',
    keywords: ['mojito', 'cocktail', 'minze'],
    imageUrl: 'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=400&h=300&fit=crop',
    label: 'Mojito',
    category: 'getraenke',
  },
  {
    id: 'real-aperol-spritz',
    keywords: ['aperol', 'aperol spritz', 'spritz'],
    imageUrl: 'https://images.unsplash.com/photo-1560508179-b2c9a3f8e92b?w=400&h=300&fit=crop',
    label: 'Aperol Spritz',
    category: 'getraenke',
  },
  {
    id: 'real-eiskaffee',
    keywords: ['eiskaffee', 'iced coffee', 'kalter kaffee'],
    imageUrl: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&h=300&fit=crop',
    label: 'Eiskaffee',
    category: 'getraenke',
  },

  // ============================================
  // MEHR DESSERTS
  // ============================================
  {
    id: 'real-creme-brulee',
    keywords: ['crème brûlée', 'creme brulee', 'karamell'],
    imageUrl: 'https://images.unsplash.com/photo-1470124182917-cc6e71b22ecc?w=400&h=300&fit=crop',
    label: 'Crème Brûlée',
    category: 'desserts',
  },
  {
    id: 'real-mousse-chocolat',
    keywords: ['mousse au chocolat', 'schokomousse', 'chocolate mousse'],
    imageUrl: 'https://images.unsplash.com/photo-1541783245831-57d6fb0926d3?w=400&h=300&fit=crop',
    label: 'Mousse au Chocolat',
    category: 'desserts',
  },
  {
    id: 'real-apfelstrudel',
    keywords: ['apfelstrudel', 'strudel', 'apple strudel'],
    imageUrl: 'https://images.unsplash.com/photo-1568571780765-9276ac8b75a2?w=400&h=300&fit=crop',
    label: 'Apfelstrudel',
    category: 'desserts',
  },
  {
    id: 'real-muffin',
    keywords: ['muffin', 'muffins', 'cupcake'],
    imageUrl: 'https://images.unsplash.com/photo-1607958996333-41aef7caefaa?w=400&h=300&fit=crop',
    label: 'Muffin',
    category: 'desserts',
  },
  {
    id: 'real-waffel-eis',
    keywords: ['waffel mit eis', 'ice cream waffle', 'eiscreme waffel'],
    imageUrl: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&h=300&fit=crop',
    label: 'Waffel mit Eis',
    category: 'desserts',
  },
  {
    id: 'real-donut',
    keywords: ['donut', 'doughnut', 'krapfen'],
    imageUrl: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=400&h=300&fit=crop',
    label: 'Donut',
    category: 'desserts',
  },
  {
    id: 'real-baklava',
    keywords: ['baklava', 'türkisches gebäck', 'griechisches gebäck'],
    imageUrl: 'https://images.unsplash.com/photo-1598110750624-207050c4f28c?w=400&h=300&fit=crop',
    label: 'Baklava',
    category: 'desserts',
  },

  // ============================================
  // MEHR SNACKS
  // ============================================
  {
    id: 'real-mozzarella-sticks',
    keywords: ['mozzarella sticks', 'käse sticks', 'cheese sticks'],
    imageUrl: 'https://images.unsplash.com/photo-1531749668029-2db88e4276c7?w=400&h=300&fit=crop',
    label: 'Mozzarella Sticks',
    category: 'snacks',
  },
  {
    id: 'real-jalapeno-poppers',
    keywords: ['jalapeño poppers', 'jalapeno', 'gefüllte paprika'],
    imageUrl: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400&h=300&fit=crop',
    label: 'Jalapeño Poppers',
    category: 'snacks',
  },
  {
    id: 'real-bruschetta',
    keywords: ['bruschetta', 'tomaten brot', 'italienische vorspeise'],
    imageUrl: 'https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?w=400&h=300&fit=crop',
    label: 'Bruschetta',
    category: 'snacks',
  },
  {
    id: 'real-garlic-bread',
    keywords: ['knoblauchbrot', 'garlic bread', 'knoblauch baguette'],
    imageUrl: 'https://images.unsplash.com/photo-1573140247632-f8fd74997d5c?w=400&h=300&fit=crop',
    label: 'Knoblauchbrot',
    category: 'snacks',
  },

  // ============================================
  // SANDWICHES & WRAPS
  // ============================================
  {
    id: 'real-club-sandwich',
    keywords: ['club sandwich', 'sandwich', 'toast sandwich'],
    imageUrl: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=400&h=300&fit=crop',
    label: 'Club Sandwich',
    category: 'sandwiches',
  },
  {
    id: 'real-wrap',
    keywords: ['wrap', 'tortilla wrap', 'chicken wrap'],
    imageUrl: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=400&h=300&fit=crop',
    label: 'Wrap',
    category: 'sandwiches',
  },
  {
    id: 'real-belegtes-broetchen',
    keywords: ['belegtes brötchen', 'sandwich', 'brötchen'],
    imageUrl: 'https://images.unsplash.com/photo-1553909489-cd47e0907980?w=400&h=300&fit=crop',
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
