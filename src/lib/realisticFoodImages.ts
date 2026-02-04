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
    keywords: ['döner', 'doner', 'kebab', 'kebap', 'shawarma', 'gyros', 'döner teller', 'dönerteller'],
    imageUrl: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400&h=300&fit=crop',
    label: 'Döner Kebab',
    category: 'doener',
    photographer: 'Unsplash',
  },
  {
    id: 'real-dueruem',
    keywords: ['dürüm', 'durum', 'wrap', 'yufka', 'rolle', 'türkischer wrap'],
    imageUrl: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=400&h=300&fit=crop',
    label: 'Dürüm Wrap',
    category: 'doener',
  },
  {
    id: 'real-falafel',
    keywords: ['falafel', 'kichererbsen', 'falafel teller', 'falafelteller'],
    imageUrl: 'https://images.unsplash.com/photo-1593001874117-c99c800e3eb7?w=400&h=300&fit=crop',
    label: 'Falafel',
    category: 'doener',
  },
  {
    id: 'real-pide',
    keywords: ['pide', 'türkische pizza', 'lahmacun', 'türkisches fladenbrot'],
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
    keywords: ['pizza salami', 'pizza pepperoni', 'salami pizza', 'peperoni', 'salamipizza'],
    imageUrl: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400&h=300&fit=crop',
    label: 'Pizza Salami',
    category: 'pizza',
  },
  {
    id: 'real-pizza-hawaii',
    keywords: ['pizza hawaii', 'hawaii', 'pizza ananas', 'pizza schinken', 'hawaiipizza'],
    imageUrl: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=300&fit=crop',
    label: 'Pizza Hawaii',
    category: 'pizza',
  },
  {
    id: 'real-pizza-funghi',
    keywords: ['pizza funghi', 'pizza pilze', 'champignon pizza', 'mushroom pizza', 'pilzpizza'],
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
  {
    id: 'real-pizza-prosciutto',
    keywords: ['pizza prosciutto', 'schinken pizza', 'prosciutto', 'schinkenpizza'],
    imageUrl: 'https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?w=400&h=300&fit=crop',
    label: 'Pizza Prosciutto',
    category: 'pizza',
  },
  {
    id: 'real-pizza-tonno',
    keywords: ['pizza tonno', 'thunfisch pizza', 'tonno', 'tuna pizza'],
    imageUrl: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400&h=300&fit=crop',
    label: 'Pizza Tonno',
    category: 'pizza',
  },

  // ============================================
  // PASTA
  // ============================================
  {
    id: 'real-spaghetti-bolognese',
    keywords: ['spaghetti', 'bolognese', 'pasta bolognese', 'ragù', 'fleischsoße', 'fleischsauce'],
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
    keywords: ['penne', 'penne arrabiata', 'penne pasta', 'rigatoni', 'penne arrabbiata'],
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
    keywords: ['gnocchi', 'kartoffelklöße', 'italienische klöße', 'kartoffelnocken'],
    imageUrl: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=400&h=300&fit=crop',
    label: 'Gnocchi',
    category: 'pasta',
  },
  {
    id: 'real-tagliatelle',
    keywords: ['tagliatelle', 'bandnudeln', 'fettuccine'],
    imageUrl: 'https://images.unsplash.com/photo-1556761223-4c4282c73f77?w=400&h=300&fit=crop',
    label: 'Tagliatelle',
    category: 'pasta',
  },
  {
    id: 'real-pasta-pesto',
    keywords: ['pesto', 'pesto pasta', 'basilikum pasta', 'spaghetti pesto'],
    imageUrl: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=400&h=300&fit=crop',
    label: 'Pasta Pesto',
    category: 'pasta',
  },

  // ============================================
  // BURGER
  // ============================================
  {
    id: 'real-burger-classic',
    keywords: ['burger', 'hamburger', 'cheeseburger', 'rindfleisch burger', 'rindburger'],
    imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop',
    label: 'Burger',
    category: 'burger',
  },
  {
    id: 'real-burger-bacon',
    keywords: ['bacon burger', 'speck burger', 'bbq burger', 'baconburger'],
    imageUrl: 'https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=400&h=300&fit=crop',
    label: 'Bacon Burger',
    category: 'burger',
  },
  {
    id: 'real-burger-chicken',
    keywords: ['chicken burger', 'hähnchen burger', 'crispy chicken', 'hähnchenburger'],
    imageUrl: 'https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=400&h=300&fit=crop',
    label: 'Chicken Burger',
    category: 'burger',
  },
  {
    id: 'real-burger-veggie',
    keywords: ['veggie burger', 'vegetarischer burger', 'vegan burger', 'plant based', 'veggieburger'],
    imageUrl: 'https://images.unsplash.com/photo-1520072959219-c595dc870360?w=400&h=300&fit=crop',
    label: 'Veggie Burger',
    category: 'burger',
  },
  {
    id: 'real-burger-double',
    keywords: ['double burger', 'doppelburger', 'double cheeseburger'],
    imageUrl: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=400&h=300&fit=crop',
    label: 'Double Burger',
    category: 'burger',
  },

  // ============================================
  // ASIATISCH - Erweitert
  // ============================================
  {
    id: 'real-sushi',
    keywords: ['sushi', 'maki', 'nigiri', 'sashimi', 'lachs sushi', 'sushi platte', 'sushiplatte'],
    imageUrl: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=400&h=300&fit=crop',
    label: 'Sushi',
    category: 'asiatisch',
  },
  {
    id: 'real-sushi-rolls',
    keywords: ['sushi rolle', 'california roll', 'inside out', 'uramaki'],
    imageUrl: 'https://images.unsplash.com/photo-1553621042-f6e147245754?w=400&h=300&fit=crop',
    label: 'Sushi Rolls',
    category: 'asiatisch',
  },
  {
    id: 'real-ramen',
    keywords: ['ramen', 'nudelsuppe', 'japanische suppe', 'tonkotsu', 'miso ramen', 'shoyu ramen'],
    imageUrl: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&h=300&fit=crop',
    label: 'Ramen',
    category: 'asiatisch',
  },
  {
    id: 'real-pho',
    keywords: ['pho', 'vietnamesisch', 'vietnamese suppe', 'reisnudelsuppe', 'pho bo', 'pho ga'],
    imageUrl: 'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=400&h=300&fit=crop',
    label: 'Pho',
    category: 'asiatisch',
  },
  {
    id: 'real-curry',
    keywords: ['curry', 'thai curry', 'indisches curry', 'red curry', 'green curry', 'gelbes curry'],
    imageUrl: 'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=400&h=300&fit=crop',
    label: 'Curry',
    category: 'asiatisch',
  },
  {
    id: 'real-pad-thai',
    keywords: ['pad thai', 'gebratene nudeln', 'thai nudeln', 'wok nudeln', 'padthai'],
    imageUrl: 'https://images.unsplash.com/photo-1559314809-0d155014e29e?w=400&h=300&fit=crop',
    label: 'Pad Thai',
    category: 'asiatisch',
  },
  {
    id: 'real-fried-rice',
    keywords: ['gebratener reis', 'fried rice', 'nasi goreng', 'reis mit gemüse', 'bratreis'],
    imageUrl: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&h=300&fit=crop',
    label: 'Gebratener Reis',
    category: 'asiatisch',
  },
  {
    id: 'real-spring-rolls',
    keywords: ['frühlingsrolle', 'spring rolls', 'sommerrollen', 'asia rolle', 'frühlingsrollen'],
    imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=400&h=300&fit=crop',
    label: 'Frühlingsrollen',
    category: 'asiatisch',
  },
  {
    id: 'real-dim-sum',
    keywords: ['dim sum', 'dumplings', 'gyoza', 'teigtaschen', 'wan tan', 'wantan', 'dimsum'],
    imageUrl: 'https://images.unsplash.com/photo-1496116218417-1a781b1c416c?w=400&h=300&fit=crop',
    label: 'Dim Sum',
    category: 'asiatisch',
  },
  {
    id: 'real-bibimbap',
    keywords: ['bibimbap', 'korean rice bowl', 'koreanische reisschale', 'koreanisch'],
    imageUrl: 'https://images.unsplash.com/photo-1553163147-622ab57be1c7?w=400&h=300&fit=crop',
    label: 'Bibimbap',
    category: 'asiatisch',
  },
  {
    id: 'real-teriyaki',
    keywords: ['teriyaki', 'teriyaki chicken', 'teriyaki hähnchen', 'teriyaki lachs'],
    imageUrl: 'https://images.unsplash.com/photo-1580476262798-bddd9f4b7369?w=400&h=300&fit=crop',
    label: 'Teriyaki',
    category: 'asiatisch',
  },
  {
    id: 'real-bento',
    keywords: ['bento', 'bento box', 'japanische lunchbox'],
    imageUrl: 'https://images.unsplash.com/photo-1569050467447-06c1e1b1f15a?w=400&h=300&fit=crop',
    label: 'Bento Box',
    category: 'asiatisch',
  },
  {
    id: 'real-udon',
    keywords: ['udon', 'udon nudeln', 'dicke nudeln', 'japanische nudeln'],
    imageUrl: 'https://images.unsplash.com/photo-1618841557871-b4664fbf0cb3?w=400&h=300&fit=crop',
    label: 'Udon',
    category: 'asiatisch',
  },
  {
    id: 'real-tom-yum',
    keywords: ['tom yum', 'tom kha', 'thai suppe', 'garnelen suppe'],
    imageUrl: 'https://images.unsplash.com/photo-1548943487-a2e4e43b4853?w=400&h=300&fit=crop',
    label: 'Tom Yum',
    category: 'asiatisch',
  },

  // ============================================
  // DEUTSCH / TRADITIONELL - Stark erweitert
  // ============================================
  {
    id: 'real-schnitzel',
    keywords: ['schnitzel', 'wiener schnitzel', 'paniertes schnitzel', 'schweineschnitzel', 'jägerschnitzel', 'rahmschnitzel', 'schnitzelchen'],
    imageUrl: 'https://images.unsplash.com/photo-1599921841143-819065a55cc6?w=400&h=300&fit=crop',
    label: 'Schnitzel',
    category: 'deutsch',
  },
  {
    id: 'real-bratwurst',
    keywords: ['bratwurst', 'wurst', 'thüringer', 'nürnberger', 'würstchen', 'rostbratwurst'],
    imageUrl: 'https://images.unsplash.com/photo-1528607929212-2636ec44253e?w=400&h=300&fit=crop',
    label: 'Bratwurst',
    category: 'deutsch',
  },
  {
    id: 'real-currywurst',
    keywords: ['currywurst', 'curry wurst', 'currywurst pommes', 'berliner currywurst'],
    imageUrl: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=400&h=300&fit=crop',
    label: 'Currywurst',
    category: 'deutsch',
  },
  {
    id: 'real-braten',
    keywords: ['braten', 'schweinebraten', 'rinderbraten', 'sauerbraten', 'sonntagsbraten', 'schweine braten'],
    imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=400&h=300&fit=crop',
    label: 'Braten',
    category: 'deutsch',
  },
  {
    id: 'real-gulasch',
    keywords: ['gulasch', 'gulash', 'rindergulasch', 'ungarisch', 'gulaschsuppe'],
    imageUrl: 'https://images.unsplash.com/photo-1534939561126-855b8675edd7?w=400&h=300&fit=crop',
    label: 'Gulasch',
    category: 'deutsch',
  },
  {
    id: 'real-kartoffeln',
    keywords: ['kartoffeln', 'bratkartoffeln', 'kartoffelpüree', 'kartoffelpuree', 'wedges', 'salzkartoffeln'],
    imageUrl: 'https://images.unsplash.com/photo-1518013431117-eb1465fa5752?w=400&h=300&fit=crop',
    label: 'Kartoffeln',
    category: 'deutsch',
  },
  {
    id: 'real-kaesespaetzle',
    keywords: ['käsespätzle', 'käsespaetzle', 'spätzle', 'spaetzle', 'schwäbisch', 'allgäuer', 'kasespaetzle'],
    imageUrl: 'https://images.unsplash.com/photo-1595295333158-4742f28fbd85?w=400&h=300&fit=crop',
    label: 'Käsespätzle',
    category: 'deutsch',
  },
  {
    id: 'real-maultaschen',
    keywords: ['maultaschen', 'schwäbische maultaschen', 'teigtaschen', 'herrgottsbscheißerle'],
    imageUrl: 'https://images.unsplash.com/photo-1587740908075-9e245070dfaa?w=400&h=300&fit=crop',
    label: 'Maultaschen',
    category: 'deutsch',
  },
  {
    id: 'real-flammkuchen',
    keywords: ['flammkuchen', 'tarte flambée', 'elsässer', 'flamm kuchen'],
    imageUrl: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=300&fit=crop',
    label: 'Flammkuchen',
    category: 'deutsch',
  },
  {
    id: 'real-weisswurst',
    keywords: ['weißwurst', 'weisswurst', 'bayerisch', 'münchner', 'weisswürstchen', 'weißwürstchen'],
    imageUrl: 'https://images.unsplash.com/photo-1528607929212-2636ec44253e?w=400&h=300&fit=crop',
    label: 'Weißwurst',
    category: 'deutsch',
  },
  {
    id: 'real-leberkaese',
    keywords: ['leberkäse', 'leberkase', 'fleischkäse', 'fleischkase', 'bayerisch', 'leberkäs', 'leberkässemmel'],
    imageUrl: 'https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=400&h=300&fit=crop',
    label: 'Leberkäse',
    category: 'deutsch',
  },
  {
    id: 'real-sauerbraten',
    keywords: ['sauerbraten', 'rheinischer', 'rheinischer sauerbraten'],
    imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=400&h=300&fit=crop',
    label: 'Sauerbraten',
    category: 'deutsch',
  },
  {
    id: 'real-knoedel',
    keywords: ['knödel', 'klöße', 'semmelknödel', 'kartoffelknödel', 'kloesse', 'knoedel'],
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
  {
    id: 'real-eisbein',
    keywords: ['eisbein', 'schweinshaxe', 'haxe', 'haxn', 'schweinehaxe'],
    imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=400&h=300&fit=crop',
    label: 'Eisbein',
    category: 'deutsch',
  },
  {
    id: 'real-rouladen',
    keywords: ['roulade', 'rouladen', 'rinderroulade', 'rinderrouladen'],
    imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=400&h=300&fit=crop',
    label: 'Rouladen',
    category: 'deutsch',
  },
  {
    id: 'real-frikadelle',
    keywords: ['frikadelle', 'frikadellen', 'bulette', 'buletten', 'fleischpflanzerl', 'fleischküchle'],
    imageUrl: 'https://images.unsplash.com/photo-1529042355636-4ce3c3e0d03f?w=400&h=300&fit=crop',
    label: 'Frikadelle',
    category: 'deutsch',
  },
  {
    id: 'real-königsberger-klopse',
    keywords: ['königsberger klopse', 'klopse', 'klopse in kapernsauce'],
    imageUrl: 'https://images.unsplash.com/photo-1529042355636-4ce3c3e0d03f?w=400&h=300&fit=crop',
    label: 'Königsberger Klopse',
    category: 'deutsch',
  },

  // ============================================
  // SALATE
  // ============================================
  {
    id: 'real-salat-gemischt',
    keywords: ['salat', 'gemischter salat', 'beilagensalat', 'garden salad', 'grüner salat'],
    imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop',
    label: 'Gemischter Salat',
    category: 'salate',
  },
  {
    id: 'real-caesar-salat',
    keywords: ['caesar salat', 'caesar salad', 'hähnchen salat', 'chicken salad', 'caesarsalat'],
    imageUrl: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?w=400&h=300&fit=crop',
    label: 'Caesar Salat',
    category: 'salate',
  },
  {
    id: 'real-griechischer-salat',
    keywords: ['griechischer salat', 'greek salad', 'bauernsalat', 'feta salat', 'hirtensalat'],
    imageUrl: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400&h=300&fit=crop',
    label: 'Griechischer Salat',
    category: 'salate',
  },
  {
    id: 'real-caprese-salat',
    keywords: ['caprese', 'tomate mozzarella', 'insalata caprese'],
    imageUrl: 'https://images.unsplash.com/photo-1592417817098-8fd3d9eb14a5?w=400&h=300&fit=crop',
    label: 'Caprese Salat',
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
    keywords: ['kürbissuppe', 'kurbissuppe', 'pumpkin soup', 'hokkaido'],
    imageUrl: 'https://images.unsplash.com/photo-1476718406336-bb5a9690ee2a?w=400&h=300&fit=crop',
    label: 'Kürbissuppe',
    category: 'suppen',
  },
  {
    id: 'real-huehnersuppe',
    keywords: ['hühnersuppe', 'huhnersuppe', 'chicken soup', 'nudelsuppe', 'bouillon', 'hühner suppe'],
    imageUrl: 'https://images.unsplash.com/photo-1604152135912-04a022e23696?w=400&h=300&fit=crop',
    label: 'Hühnersuppe',
    category: 'suppen',
  },
  {
    id: 'real-erbsensuppe',
    keywords: ['erbsensuppe', 'erbsen suppe', 'pea soup'],
    imageUrl: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&h=300&fit=crop',
    label: 'Erbsensuppe',
    category: 'suppen',
  },
  {
    id: 'real-kartoffelsuppe',
    keywords: ['kartoffelsuppe', 'kartoffel suppe', 'potato soup'],
    imageUrl: 'https://images.unsplash.com/photo-1476718406336-bb5a9690ee2a?w=400&h=300&fit=crop',
    label: 'Kartoffelsuppe',
    category: 'suppen',
  },

  // ============================================
  // BEILAGEN
  // ============================================
  {
    id: 'real-pommes',
    keywords: ['pommes', 'pommes frites', 'fries', 'fritten', 'french fries'],
    imageUrl: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400&h=300&fit=crop',
    label: 'Pommes Frites',
    category: 'beilagen',
  },
  {
    id: 'real-suesskartoffel-pommes',
    keywords: ['süßkartoffel', 'süsskartoffel', 'sweet potato', 'süßkartoffelpommes', 'suesskartoffel'],
    imageUrl: 'https://images.unsplash.com/photo-1604152135912-04a022e23696?w=400&h=300&fit=crop',
    label: 'Süßkartoffel Pommes',
    category: 'beilagen',
  },
  {
    id: 'real-reis',
    keywords: ['reis', 'rice', 'basmati', 'jasmin reis', 'jasminreis'],
    imageUrl: 'https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?w=400&h=300&fit=crop',
    label: 'Reis',
    category: 'beilagen',
  },
  {
    id: 'real-brot',
    keywords: ['brot', 'bread', 'baguette', 'brotkorb', 'fladenbrot', 'brötchen', 'broetchen'],
    imageUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=300&fit=crop',
    label: 'Brot',
    category: 'beilagen',
  },
  {
    id: 'real-gemüse',
    keywords: ['gemüse', 'gemuese', 'vegetables', 'grillgemüse', 'beilagengemüse'],
    imageUrl: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&h=300&fit=crop',
    label: 'Gemüse',
    category: 'beilagen',
  },

  // ============================================
  // DESSERTS - Stark erweitert
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
    keywords: ['cheesecake', 'käsekuchen', 'kasekuchen', 'new york cheesecake'],
    imageUrl: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400&h=300&fit=crop',
    label: 'Cheesecake',
    category: 'desserts',
  },
  {
    id: 'real-schokoladenkuchen',
    keywords: ['schokoladenkuchen', 'chocolate cake', 'brownie', 'schokokuchen', 'schokoladen kuchen'],
    imageUrl: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop',
    label: 'Schokoladenkuchen',
    category: 'desserts',
  },
  {
    id: 'real-eis',
    keywords: ['eis', 'ice cream', 'gelato', 'eiskugel', 'vanilleeis', 'schokoeis', 'erdbeereis'],
    imageUrl: 'https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?w=400&h=300&fit=crop',
    label: 'Eis',
    category: 'desserts',
  },
  {
    id: 'real-panna-cotta',
    keywords: ['panna cotta', 'sahne dessert', 'pannacotta'],
    imageUrl: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&h=300&fit=crop',
    label: 'Panna Cotta',
    category: 'desserts',
  },
  {
    id: 'real-creme-brulee',
    keywords: ['crème brûlée', 'creme brulee', 'karamell', 'cremebrulee'],
    imageUrl: 'https://images.unsplash.com/photo-1470124182917-cc6e71b22ecc?w=400&h=300&fit=crop',
    label: 'Crème Brûlée',
    category: 'desserts',
  },
  {
    id: 'real-mousse-chocolat',
    keywords: ['mousse au chocolat', 'schokomousse', 'chocolate mousse', 'mousse'],
    imageUrl: 'https://images.unsplash.com/photo-1541783245831-57d6fb0926d3?w=400&h=300&fit=crop',
    label: 'Mousse au Chocolat',
    category: 'desserts',
  },
  {
    id: 'real-apfelstrudel',
    keywords: ['apfelstrudel', 'strudel', 'apple strudel', 'apfel strudel'],
    imageUrl: 'https://images.unsplash.com/photo-1568571780765-9276ac8b75a2?w=400&h=300&fit=crop',
    label: 'Apfelstrudel',
    category: 'desserts',
  },
  {
    id: 'real-muffin',
    keywords: ['muffin', 'muffins', 'cupcake', 'cupcakes'],
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
    keywords: ['donut', 'doughnut', 'krapfen', 'berliner'],
    imageUrl: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=400&h=300&fit=crop',
    label: 'Donut',
    category: 'desserts',
  },
  {
    id: 'real-baklava',
    keywords: ['baklava', 'türkisches gebäck', 'griechisches gebäck', 'tuerkisches gebaeck'],
    imageUrl: 'https://images.unsplash.com/photo-1598110750624-207050c4f28c?w=400&h=300&fit=crop',
    label: 'Baklava',
    category: 'desserts',
  },
  {
    id: 'real-tarte',
    keywords: ['tarte', 'torte', 'obsttorte', 'obstkuchen', 'früchtetorte'],
    imageUrl: 'https://images.unsplash.com/photo-1519915028121-7d3463d20b13?w=400&h=300&fit=crop',
    label: 'Tarte',
    category: 'desserts',
  },
  {
    id: 'real-schwarzwaelder-kirsch',
    keywords: ['schwarzwälder kirsch', 'schwarzwaelder kirsch', 'black forest', 'kirschtorte'],
    imageUrl: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop',
    label: 'Schwarzwälder Kirschtorte',
    category: 'desserts',
  },
  {
    id: 'real-profiteroles',
    keywords: ['profiteroles', 'windbeutel', 'eclairs', 'brandteig'],
    imageUrl: 'https://images.unsplash.com/photo-1519915028121-7d3463d20b13?w=400&h=300&fit=crop',
    label: 'Profiteroles',
    category: 'desserts',
  },
  {
    id: 'real-eis-sundae',
    keywords: ['eisbecher', 'sundae', 'banana split', 'eis sundae'],
    imageUrl: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&h=300&fit=crop',
    label: 'Eisbecher',
    category: 'desserts',
  },

  // ============================================
  // GETRÄNKE - Stark erweitert
  // ============================================
  {
    id: 'real-kaffee',
    keywords: ['kaffee', 'coffee', 'espresso', 'cafe'],
    imageUrl: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&h=300&fit=crop',
    label: 'Kaffee',
    category: 'getraenke',
  },
  {
    id: 'real-cappuccino',
    keywords: ['cappuccino', 'capuccino', 'cappuchino'],
    imageUrl: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=400&h=300&fit=crop',
    label: 'Cappuccino',
    category: 'getraenke',
  },
  {
    id: 'real-latte',
    keywords: ['latte', 'cafe latte', 'latte macchiato', 'milchkaffee'],
    imageUrl: 'https://images.unsplash.com/photo-1561882468-9110e03e0f78?w=400&h=300&fit=crop',
    label: 'Latte',
    category: 'getraenke',
  },
  {
    id: 'real-tee',
    keywords: ['tee', 'tea', 'grüner tee', 'gruener tee', 'schwarzer tee'],
    imageUrl: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&h=300&fit=crop',
    label: 'Tee',
    category: 'getraenke',
  },
  {
    id: 'real-limonade',
    keywords: ['limonade', 'lemonade', 'zitrone', 'erfrischung', 'limo'],
    imageUrl: 'https://images.unsplash.com/photo-1523677011781-c91d1bbe2f9e?w=400&h=300&fit=crop',
    label: 'Limonade',
    category: 'getraenke',
  },
  {
    id: 'real-smoothie',
    keywords: ['smoothie', 'shake', 'milkshake', 'frucht shake', 'fruchtshake'],
    imageUrl: 'https://images.unsplash.com/photo-1505252585461-04db1eb84625?w=400&h=300&fit=crop',
    label: 'Smoothie',
    category: 'getraenke',
  },
  {
    id: 'real-smoothie-bowl',
    keywords: ['smoothie bowl', 'acai bowl', 'açaí bowl', 'bowl'],
    imageUrl: 'https://images.unsplash.com/photo-1590301157890-4810ed352733?w=400&h=300&fit=crop',
    label: 'Smoothie Bowl',
    category: 'getraenke',
  },
  {
    id: 'real-wein',
    keywords: ['wein', 'wine', 'rotwein', 'weißwein', 'weisswein', 'rosé', 'rose'],
    imageUrl: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=400&h=300&fit=crop',
    label: 'Wein',
    category: 'getraenke',
  },
  {
    id: 'real-bier',
    keywords: ['bier', 'beer', 'pils', 'weizen', 'craft beer', 'helles', 'pilsner'],
    imageUrl: 'https://images.unsplash.com/photo-1535958636474-b021ee887b13?w=400&h=300&fit=crop',
    label: 'Bier',
    category: 'getraenke',
  },
  {
    id: 'real-cocktail',
    keywords: ['cocktail', 'longdrink', 'drink'],
    imageUrl: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=400&h=300&fit=crop',
    label: 'Cocktail',
    category: 'getraenke',
  },
  {
    id: 'real-milkshake',
    keywords: ['milkshake', 'milch shake', 'schoko shake'],
    imageUrl: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=400&h=300&fit=crop',
    label: 'Milkshake',
    category: 'getraenke',
  },
  {
    id: 'real-chai-latte',
    keywords: ['chai latte', 'chai', 'gewürztee', 'gewuerztee'],
    imageUrl: 'https://images.unsplash.com/photo-1578899952107-9c390f1af1c7?w=400&h=300&fit=crop',
    label: 'Chai Latte',
    category: 'getraenke',
  },
  {
    id: 'real-matcha-latte',
    keywords: ['matcha', 'matcha latte', 'grüntee', 'gruentee'],
    imageUrl: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?w=400&h=300&fit=crop',
    label: 'Matcha Latte',
    category: 'getraenke',
  },
  {
    id: 'real-mojito',
    keywords: ['mojito', 'minze cocktail'],
    imageUrl: 'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=400&h=300&fit=crop',
    label: 'Mojito',
    category: 'getraenke',
  },
  {
    id: 'real-aperol-spritz',
    keywords: ['aperol', 'aperol spritz', 'spritz', 'hugo'],
    imageUrl: 'https://images.unsplash.com/photo-1560508179-b2c9a3f8e92b?w=400&h=300&fit=crop',
    label: 'Aperol Spritz',
    category: 'getraenke',
  },
  {
    id: 'real-eiskaffee',
    keywords: ['eiskaffee', 'iced coffee', 'kalter kaffee', 'eis kaffee'],
    imageUrl: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&h=300&fit=crop',
    label: 'Eiskaffee',
    category: 'getraenke',
  },
  {
    id: 'real-heisse-schokolade',
    keywords: ['heiße schokolade', 'heisse schokolade', 'hot chocolate', 'kakao'],
    imageUrl: 'https://images.unsplash.com/photo-1542990253-0d0f5be5f0ed?w=400&h=300&fit=crop',
    label: 'Heiße Schokolade',
    category: 'getraenke',
  },
  {
    id: 'real-gluehwein',
    keywords: ['glühwein', 'gluehwein', 'mulled wine', 'punsch'],
    imageUrl: 'https://images.unsplash.com/photo-1482012792084-a0c3725f289f?w=400&h=300&fit=crop',
    label: 'Glühwein',
    category: 'getraenke',
  },
  {
    id: 'real-margarita',
    keywords: ['margarita', 'tequila cocktail'],
    imageUrl: 'https://images.unsplash.com/photo-1556855810-ac404aa91e85?w=400&h=300&fit=crop',
    label: 'Margarita',
    category: 'getraenke',
  },
  {
    id: 'real-gin-tonic',
    keywords: ['gin tonic', 'gin and tonic', 'g&t'],
    imageUrl: 'https://images.unsplash.com/photo-1551751299-1b51cab2694c?w=400&h=300&fit=crop',
    label: 'Gin Tonic',
    category: 'getraenke',
  },

  // ============================================
  // MEXIKANISCH - Stark erweitert
  // ============================================
  {
    id: 'real-tacos',
    keywords: ['tacos', 'taco', 'mexikanisch', 'tortilla', 'taccos'],
    imageUrl: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400&h=300&fit=crop',
    label: 'Tacos',
    category: 'mexikanisch',
  },
  {
    id: 'real-burrito',
    keywords: ['burrito', 'burritos', 'mexikanisch', 'bohnen'],
    imageUrl: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=400&h=300&fit=crop',
    label: 'Burrito',
    category: 'mexikanisch',
  },
  {
    id: 'real-nachos',
    keywords: ['nachos', 'chips', 'guacamole', 'salsa', 'käse dip', 'nacho'],
    imageUrl: 'https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?w=400&h=300&fit=crop',
    label: 'Nachos',
    category: 'mexikanisch',
  },
  {
    id: 'real-quesadilla',
    keywords: ['quesadilla', 'quesadillas', 'käse tortilla', 'kaese tortilla', 'mexikanisch'],
    imageUrl: 'https://images.unsplash.com/photo-1618040996337-56904b7850b9?w=400&h=300&fit=crop',
    label: 'Quesadilla',
    category: 'mexikanisch',
  },
  {
    id: 'real-enchiladas',
    keywords: ['enchiladas', 'enchilada', 'mexikanische pfannkuchen'],
    imageUrl: 'https://images.unsplash.com/photo-1534352956036-cd81e27dd615?w=400&h=300&fit=crop',
    label: 'Enchiladas',
    category: 'mexikanisch',
  },
  {
    id: 'real-guacamole',
    keywords: ['guacamole', 'avocado dip', 'avocadodip'],
    imageUrl: 'https://images.unsplash.com/photo-1600335895229-6bf8c7c3f17a?w=400&h=300&fit=crop',
    label: 'Guacamole',
    category: 'mexikanisch',
  },
  {
    id: 'real-fajitas',
    keywords: ['fajitas', 'fajita', 'mexikanisch'],
    imageUrl: 'https://images.unsplash.com/photo-1615870216519-2f9fa575fa5c?w=400&h=300&fit=crop',
    label: 'Fajitas',
    category: 'mexikanisch',
  },
  {
    id: 'real-burrito-bowl',
    keywords: ['burrito bowl', 'mexikanische bowl', 'chipotle'],
    imageUrl: 'https://images.unsplash.com/photo-1543339308-43e59d6b73a6?w=400&h=300&fit=crop',
    label: 'Burrito Bowl',
    category: 'mexikanisch',
  },

  // ============================================
  // FRÜHSTÜCK - Stark erweitert
  // ============================================
  {
    id: 'real-fruehstueck',
    keywords: ['frühstück', 'fruehstueck', 'breakfast', 'brunch', 'frühstücksteller', 'fruehstuecksteller'],
    imageUrl: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=400&h=300&fit=crop',
    label: 'Frühstück',
    category: 'fruehstueck',
  },
  {
    id: 'real-eggs-benedict',
    keywords: ['eggs benedict', 'pochierte eier', 'hollandaise', 'eier benedict'],
    imageUrl: 'https://images.unsplash.com/photo-1608039829572-9b5bfcc5a973?w=400&h=300&fit=crop',
    label: 'Eggs Benedict',
    category: 'fruehstueck',
  },
  {
    id: 'real-pancakes',
    keywords: ['pancakes', 'pfannkuchen', 'american pancakes', 'eierkuchen'],
    imageUrl: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&h=300&fit=crop',
    label: 'Pancakes',
    category: 'fruehstueck',
  },
  {
    id: 'real-croissant',
    keywords: ['croissant', 'hörnchen', 'hoernchen', 'gebäck', 'gebaeck', 'französisch', 'franzoesisch'],
    imageUrl: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400&h=300&fit=crop',
    label: 'Croissant',
    category: 'fruehstueck',
  },
  {
    id: 'real-muesli',
    keywords: ['müsli', 'muesli', 'granola', 'joghurt', 'acai', 'museli'],
    imageUrl: 'https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?w=400&h=300&fit=crop',
    label: 'Müsli Bowl',
    category: 'fruehstueck',
  },
  {
    id: 'real-waffeln',
    keywords: ['waffeln', 'waffel', 'belgian waffle', 'belgische waffel', 'waffle'],
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
    keywords: ['omelette', 'omelett', 'eier', 'rührei', 'ruehrei', 'spiegelei'],
    imageUrl: 'https://images.unsplash.com/photo-1510693206972-df098062cb71?w=400&h=300&fit=crop',
    label: 'Omelette',
    category: 'fruehstueck',
  },
  {
    id: 'real-bagel',
    keywords: ['bagel', 'bagels', 'lachs bagel', 'lachsbagel'],
    imageUrl: 'https://images.unsplash.com/photo-1585837146751-a44427b54bc0?w=400&h=300&fit=crop',
    label: 'Bagel',
    category: 'fruehstueck',
  },
  {
    id: 'real-porridge',
    keywords: ['porridge', 'haferbrei', 'oatmeal', 'hafer'],
    imageUrl: 'https://images.unsplash.com/photo-1517673400267-0251440c45dc?w=400&h=300&fit=crop',
    label: 'Porridge',
    category: 'fruehstueck',
  },
  {
    id: 'real-acai-bowl',
    keywords: ['acai bowl', 'açaí bowl', 'acai', 'fruchtbowl'],
    imageUrl: 'https://images.unsplash.com/photo-1590301157890-4810ed352733?w=400&h=300&fit=crop',
    label: 'Açaí Bowl',
    category: 'fruehstueck',
  },
  {
    id: 'real-avocado-toast',
    keywords: ['avocado toast', 'avocado', 'toast', 'gesund'],
    imageUrl: 'https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?w=400&h=300&fit=crop',
    label: 'Avocado Toast',
    category: 'fruehstueck',
  },
  {
    id: 'real-shakshuka',
    keywords: ['shakshuka', 'schakschuka', 'eier in tomatensoße', 'eier in tomatensauce'],
    imageUrl: 'https://images.unsplash.com/photo-1590412200988-a436970781fa?w=400&h=300&fit=crop',
    label: 'Shakshuka',
    category: 'fruehstueck',
  },
  {
    id: 'real-english-breakfast',
    keywords: ['english breakfast', 'full english', 'englisches frühstück', 'full breakfast'],
    imageUrl: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=400&h=300&fit=crop',
    label: 'English Breakfast',
    category: 'fruehstueck',
  },

  // ============================================
  // SNACKS
  // ============================================
  {
    id: 'real-chicken-wings',
    keywords: ['chicken wings', 'wings', 'hähnchenflügel', 'haehnchenflügel', 'buffalo', 'hähnchenflügel'],
    imageUrl: 'https://images.unsplash.com/photo-1608039755401-742074f0548d?w=400&h=300&fit=crop',
    label: 'Chicken Wings',
    category: 'snacks',
  },
  {
    id: 'real-nuggets',
    keywords: ['nuggets', 'chicken nuggets', 'hühnchen nuggets', 'huehner nuggets'],
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
  {
    id: 'real-mozzarella-sticks',
    keywords: ['mozzarella sticks', 'käse sticks', 'kaese sticks', 'cheese sticks'],
    imageUrl: 'https://images.unsplash.com/photo-1531749668029-2db88e4276c7?w=400&h=300&fit=crop',
    label: 'Mozzarella Sticks',
    category: 'snacks',
  },
  {
    id: 'real-jalapeno-poppers',
    keywords: ['jalapeño poppers', 'jalapeno', 'jalapeno poppers', 'gefüllte paprika'],
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
  {
    id: 'real-pretzel',
    keywords: ['brezel', 'bretzel', 'pretzel', 'laugenbrezel', 'laugenstange'],
    imageUrl: 'https://images.unsplash.com/photo-1524438418049-ab2acb7aa48f?w=400&h=300&fit=crop',
    label: 'Brezel',
    category: 'snacks',
  },
  {
    id: 'real-hot-dog',
    keywords: ['hot dog', 'hotdog', 'würstchen im brötchen'],
    imageUrl: 'https://images.unsplash.com/photo-1612392062631-94ca6e37eab5?w=400&h=300&fit=crop',
    label: 'Hot Dog',
    category: 'snacks',
  },
  {
    id: 'real-crepes',
    keywords: ['crêpes', 'crepes', 'pfannkuchen', 'crepe', 'crêpe'],
    imageUrl: 'https://images.unsplash.com/photo-1584776296944-ab6fb57b0bcd?w=400&h=300&fit=crop',
    label: 'Crêpes',
    category: 'snacks',
  },

  // ============================================
  // GRIECHISCH
  // ============================================
  {
    id: 'real-gyros',
    keywords: ['gyros', 'pita', 'griechisch', 'tzatziki', 'gyros teller', 'gyrosteller'],
    imageUrl: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400&h=300&fit=crop',
    label: 'Gyros',
    category: 'griechisch',
  },
  {
    id: 'real-souvlaki',
    keywords: ['souvlaki', 'spiess', 'spieß', 'griechisch', 'fleischspieß', 'fleischspiess'],
    imageUrl: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=300&fit=crop',
    label: 'Souvlaki',
    category: 'griechisch',
  },
  {
    id: 'real-moussaka',
    keywords: ['moussaka', 'aubergine', 'auflauf', 'griechisch', 'musaka'],
    imageUrl: 'https://images.unsplash.com/photo-1574894709920-11b28e7367e3?w=400&h=300&fit=crop',
    label: 'Moussaka',
    category: 'griechisch',
  },
  {
    id: 'real-tzatziki',
    keywords: ['tzatziki', 'zaziki', 'joghurt dip', 'gurken dip'],
    imageUrl: 'https://images.unsplash.com/photo-1577805947697-89e18249d767?w=400&h=300&fit=crop',
    label: 'Tzatziki',
    category: 'griechisch',
  },

  // ============================================
  // SEAFOOD
  // ============================================
  {
    id: 'real-lachs',
    keywords: ['lachs', 'salmon', 'fisch', 'gegrillter lachs', 'lachsfilet'],
    imageUrl: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&h=300&fit=crop',
    label: 'Lachs',
    category: 'andere',
  },
  {
    id: 'real-garnelen',
    keywords: ['garnelen', 'shrimps', 'prawns', 'meeresfrüchte', 'meeresfruechte', 'scampi'],
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
  {
    id: 'real-fish-and-chips',
    keywords: ['fish and chips', 'fish & chips', 'backfisch', 'gebratener fisch'],
    imageUrl: 'https://images.unsplash.com/photo-1579208030886-b937da9f5c77?w=400&h=300&fit=crop',
    label: 'Fish and Chips',
    category: 'andere',
  },
  {
    id: 'real-muscheln',
    keywords: ['muscheln', 'miesmuscheln', 'mussels', 'moules'],
    imageUrl: 'https://images.unsplash.com/photo-1548943487-a2e4e43b4853?w=400&h=300&fit=crop',
    label: 'Muscheln',
    category: 'andere',
  },

  // ============================================
  // VEGAN / VEGETARISCH
  // ============================================
  {
    id: 'real-buddha-bowl',
    keywords: ['buddha bowl', 'bowl', 'vegan bowl', 'gesund', 'buddhabowl'],
    imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop',
    label: 'Buddha Bowl',
    category: 'vegan',
  },
  {
    id: 'real-hummus',
    keywords: ['hummus', 'kichererbsen dip', 'orientalisch', 'humus'],
    imageUrl: 'https://images.unsplash.com/photo-1577805947697-89e18249d767?w=400&h=300&fit=crop',
    label: 'Hummus',
    category: 'vegan',
  },
  {
    id: 'real-falafel-teller',
    keywords: ['falafel teller', 'falafel platte', 'falafel mit hummus'],
    imageUrl: 'https://images.unsplash.com/photo-1593001874117-c99c800e3eb7?w=400&h=300&fit=crop',
    label: 'Falafel Teller',
    category: 'vegan',
  },
  {
    id: 'real-tofu',
    keywords: ['tofu', 'gebratener tofu', 'tofugericht'],
    imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop',
    label: 'Tofu',
    category: 'vegan',
  },

  // ============================================
  // STEAKS & FLEISCH
  // ============================================
  {
    id: 'real-steak',
    keywords: ['steak', 'rindersteak', 'ribeye', 'entrecote', 'filet', 'rindsteak'],
    imageUrl: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?w=400&h=300&fit=crop',
    label: 'Steak',
    category: 'andere',
  },
  {
    id: 'real-spare-ribs',
    keywords: ['spare ribs', 'ribs', 'rippchen', 'bbq', 'spareribs'],
    imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=400&h=300&fit=crop',
    label: 'Spare Ribs',
    category: 'andere',
  },
  {
    id: 'real-pulled-pork',
    keywords: ['pulled pork', 'gezogenes schweinefleisch'],
    imageUrl: 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?w=400&h=300&fit=crop',
    label: 'Pulled Pork',
    category: 'andere',
  },

  // ============================================
  // INDIAN FOOD - Erweitert
  // ============================================
  {
    id: 'real-butter-chicken',
    keywords: ['butter chicken', 'murgh makhani', 'hähnchen curry', 'haehnchen curry', 'indian chicken'],
    imageUrl: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=400&h=300&fit=crop',
    label: 'Butter Chicken',
    category: 'indisch',
  },
  {
    id: 'real-tikka-masala',
    keywords: ['tikka masala', 'chicken tikka', 'masala', 'indisches curry', 'tikkamasala'],
    imageUrl: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&h=300&fit=crop',
    label: 'Tikka Masala',
    category: 'indisch',
  },
  {
    id: 'real-biryani',
    keywords: ['biryani', 'biriyani', 'indischer reis', 'gewürzreis', 'gewuerzreis'],
    imageUrl: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400&h=300&fit=crop',
    label: 'Biryani',
    category: 'indisch',
  },
  {
    id: 'real-naan',
    keywords: ['naan', 'naan brot', 'indisches brot', 'fladenbrot', 'naanbrot'],
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
    keywords: ['tandoori', 'tandoori chicken', 'tanduri', 'lehmofen', 'tandori'],
    imageUrl: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400&h=300&fit=crop',
    label: 'Tandoori Chicken',
    category: 'indisch',
  },
  {
    id: 'real-dal',
    keywords: ['dal', 'dhal', 'linsen', 'indische linsen', 'daal'],
    imageUrl: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop',
    label: 'Dal',
    category: 'indisch',
  },
  {
    id: 'real-palak-paneer',
    keywords: ['palak paneer', 'paneer', 'spinat käse', 'spinat kaese'],
    imageUrl: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&h=300&fit=crop',
    label: 'Palak Paneer',
    category: 'indisch',
  },
  {
    id: 'real-korma',
    keywords: ['korma', 'chicken korma', 'lamb korma'],
    imageUrl: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=400&h=300&fit=crop',
    label: 'Korma',
    category: 'indisch',
  },
  {
    id: 'real-vindaloo',
    keywords: ['vindaloo', 'vindalho', 'scharf indisch'],
    imageUrl: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&h=300&fit=crop',
    label: 'Vindaloo',
    category: 'indisch',
  },

  // ============================================
  // KOREAN FOOD
  // ============================================
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
    keywords: ['korean fried chicken', 'koreanisches hähnchen', 'koreanisches haehnchen', 'kfc korean'],
    imageUrl: 'https://images.unsplash.com/photo-1575932444877-5106bee2a599?w=400&h=300&fit=crop',
    label: 'Korean Fried Chicken',
    category: 'koreanisch',
  },
  {
    id: 'real-japchae',
    keywords: ['japchae', 'glasnudeln', 'koreanische nudeln'],
    imageUrl: 'https://images.unsplash.com/photo-1553163147-622ab57be1c7?w=400&h=300&fit=crop',
    label: 'Japchae',
    category: 'koreanisch',
  },

  // ============================================
  // VIETNAMESE FOOD
  // ============================================
  {
    id: 'real-banh-mi',
    keywords: ['banh mi', 'bahn mi', 'vietnamesisches sandwich', 'baguette vietnam'],
    imageUrl: 'https://images.unsplash.com/photo-1600454021293-1dd37c782d9b?w=400&h=300&fit=crop',
    label: 'Bánh Mì',
    category: 'vietnamesisch',
  },
  {
    id: 'real-bun-bo',
    keywords: ['bun bo', 'vietnamesische nudeln', 'reisnudeln', 'bun'],
    imageUrl: 'https://images.unsplash.com/photo-1576577445504-6af96477db52?w=400&h=300&fit=crop',
    label: 'Bún Bò',
    category: 'vietnamesisch',
  },
  {
    id: 'real-goi-cuon',
    keywords: ['goi cuon', 'sommerrollen', 'fresh spring rolls', 'vietnamese rolls'],
    imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=400&h=300&fit=crop',
    label: 'Gỏi Cuốn',
    category: 'vietnamesisch',
  },

  // ============================================
  // MIDDLE EASTERN / ORIENTALISCH - Erweitert
  // ============================================
  {
    id: 'real-baba-ganoush',
    keywords: ['baba ganoush', 'auberginenpüree', 'auberginenpuree', 'auberginendip', 'baba ghanoush'],
    imageUrl: 'https://images.unsplash.com/photo-1577805947697-89e18249d767?w=400&h=300&fit=crop',
    label: 'Baba Ganoush',
    category: 'orientalisch',
  },
  {
    id: 'real-tabbouleh',
    keywords: ['tabbouleh', 'tabouleh', 'petersiliensalat', 'taboule'],
    imageUrl: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400&h=300&fit=crop',
    label: 'Tabbouleh',
    category: 'orientalisch',
  },
  {
    id: 'real-shawarma',
    keywords: ['shawarma', 'schawarma', 'shwarma', 'arabisch'],
    imageUrl: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400&h=300&fit=crop',
    label: 'Shawarma',
    category: 'orientalisch',
  },
  {
    id: 'real-mezze',
    keywords: ['mezze', 'meze', 'vorspeisen platte', 'orientalische vorspeisen'],
    imageUrl: 'https://images.unsplash.com/photo-1577805947697-89e18249d767?w=400&h=300&fit=crop',
    label: 'Mezze',
    category: 'orientalisch',
  },
  {
    id: 'real-kibbeh',
    keywords: ['kibbeh', 'köfte', 'koefte', 'arabische fleischbällchen'],
    imageUrl: 'https://images.unsplash.com/photo-1529042355636-4ce3c3e0d03f?w=400&h=300&fit=crop',
    label: 'Kibbeh',
    category: 'orientalisch',
  },
  {
    id: 'real-fattoush',
    keywords: ['fattoush', 'fatusch', 'arabischer salat'],
    imageUrl: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400&h=300&fit=crop',
    label: 'Fattoush',
    category: 'orientalisch',
  },

  // ============================================
  // SANDWICHES & WRAPS
  // ============================================
  {
    id: 'real-club-sandwich',
    keywords: ['club sandwich', 'sandwich', 'toast sandwich', 'clubsandwich'],
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
    keywords: ['belegtes brötchen', 'belegtes broetchen', 'sandwich', 'brötchen', 'broetchen'],
    imageUrl: 'https://images.unsplash.com/photo-1553909489-cd47e0907980?w=400&h=300&fit=crop',
    label: 'Belegtes Brötchen',
    category: 'sandwiches',
  },
  {
    id: 'real-panini',
    keywords: ['panini', 'toast', 'gegrilltes sandwich'],
    imageUrl: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=400&h=300&fit=crop',
    label: 'Panini',
    category: 'sandwiches',
  },
  {
    id: 'real-blt',
    keywords: ['blt', 'bacon lettuce tomato', 'bacon sandwich'],
    imageUrl: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=400&h=300&fit=crop',
    label: 'BLT Sandwich',
    category: 'sandwiches',
  },
];

// ============================================
// COMMON MISSPELLINGS MAP
// ============================================
const COMMON_MISSPELLINGS: Record<string, string[]> = {
  'schnitzel': ['schnizel', 'schnitzl', 'schnitsl', 'snitzel'],
  'spaghetti': ['spagetti', 'spagheti', 'spageti', 'spaghettti'],
  'lasagne': ['lasanja', 'lasania', 'lazagne'],
  'cappuccino': ['capuccino', 'cappucino', 'capuchino', 'kapuccino'],
  'döner': ['doener', 'doner', 'döner kebap'],
  'brötchen': ['broetchen', 'brotchen', 'brötgen'],
  'würstchen': ['wuerstchen', 'würstgen', 'wurstchen'],
  'käse': ['kaese', 'kase'],
  'spätzle': ['spaetzle', 'späzle', 'spazle'],
  'currywurst': ['curiwurst', 'curry wurst', 'currywurts'],
  'gulasch': ['gulash', 'gulasc', 'goulasch'],
  'tiramisu': ['tiramisu', 'tiramissu', 'teramisu'],
  'croissant': ['croisant', 'croissont', 'kwason', 'crossant'],
  'quesadilla': ['kesadilla', 'quesadia', 'quesadila'],
  'falafel': ['felafel', 'fallaffel', 'falafl'],
  'hummus': ['humus', 'houmous', 'houmus'],
  'burger': ['burgar', 'burgr', 'börger'],
  'pommes': ['pomes', 'pomms', 'frites'],
  'caesar': ['cäsar', 'caesar', 'ceasar', 'cesear'],
  'bolognese': ['bolonese', 'bologneise', 'bolognaise'],
  'carbonara': ['karbonara', 'carbonarra', 'carbanara'],
  'margherita': ['margarita', 'margherita', 'margareta'],
  'ramen': ['rahmen', 'rammen'],
  'sushi': ['suschi', 'susi'],
  'bibimbap': ['bibimbab', 'bibimbop', 'bibimab'],
  'shawarma': ['schawarma', 'shwarma', 'schawarna'],
};

// ============================================
// GERMAN COMPOUND WORD PARTS
// ============================================
const GERMAN_COMPOUND_PARTS: Record<string, string[]> = {
  // Meat types (German first parts)
  'schweine': ['pork', 'schwein'],
  'rinder': ['beef', 'rind'],
  'hühner': ['chicken', 'huhn', 'haehnchen', 'hähnchen'],
  'kalbs': ['veal', 'kalb'],
  'lamm': ['lamb'],
  'hähnchen': ['chicken', 'huhn'],
  // Food types
  'käse': ['cheese', 'kaese'],
  'schinken': ['ham'],
  'speck': ['bacon'],
  'ei': ['egg', 'eier'],
  'kartoffel': ['potato', 'kartoffeln'],
  'nudel': ['noodle', 'pasta', 'nudeln'],
  'reis': ['rice'],
  'brot': ['bread'],
  'semmel': ['roll', 'bread'],
  'wurst': ['sausage'],
  'fleisch': ['meat'],
  'fisch': ['fish'],
  'lachs': ['salmon'],
  'thunfisch': ['tuna'],
  'gemüse': ['vegetable', 'vegetables', 'gemuese'],
  'tomaten': ['tomato', 'tomate'],
  'zwiebel': ['onion'],
  'pilz': ['mushroom', 'pilze'],
  'salat': ['salad', 'lettuce'],
  // Cooking methods
  'gebratene': ['fried', 'gebraten'],
  'gegrillte': ['grilled', 'gegrillt'],
  'panierte': ['breaded', 'paniert'],
  'gebackene': ['baked', 'gebacken'],
  // Common endings
  'suppe': ['soup'],
  'soße': ['sauce', 'sosse', 'sauce'],
  'sauce': ['sauce', 'soße'],
  'teller': ['plate', 'dish'],
  'platte': ['platter', 'plate'],
  'auflauf': ['casserole', 'gratin'],
};

/**
 * Normalize text for matching - handles umlauts and common variations
 */
function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .trim()
    // Normalize German umlauts
    .replace(/ä/g, 'ae')
    .replace(/ö/g, 'oe')
    .replace(/ü/g, 'ue')
    .replace(/ß/g, 'ss')
    // Remove special characters but keep spaces
    .replace(/[^\w\s]/g, '')
    // Normalize multiple spaces
    .replace(/\s+/g, ' ');
}

/**
 * Check if a word matches accounting for misspellings
 */
function matchWithMisspellings(word: string, target: string): boolean {
  const normalizedWord = normalizeText(word);
  const normalizedTarget = normalizeText(target);

  if (normalizedWord === normalizedTarget) return true;
  if (normalizedWord.includes(normalizedTarget)) return true;
  if (normalizedTarget.includes(normalizedWord)) return true;

  // Check known misspellings
  for (const [correct, misspellings] of Object.entries(COMMON_MISSPELLINGS)) {
    if (normalizeText(correct) === normalizedTarget || misspellings.map(normalizeText).includes(normalizedTarget)) {
      if (normalizeText(correct) === normalizedWord || misspellings.map(normalizeText).includes(normalizedWord)) {
        return true;
      }
    }
  }

  return false;
}

/**
 * Split German compound words into parts
 */
function splitCompoundWord(word: string): string[] {
  const normalized = normalizeText(word);
  const parts: string[] = [normalized];

  // Try to find compound word parts
  for (const [part, equivalents] of Object.entries(GERMAN_COMPOUND_PARTS)) {
    const normalizedPart = normalizeText(part);
    if (normalized.includes(normalizedPart)) {
      // Add the part and its equivalents
      parts.push(normalizedPart, ...equivalents.map(normalizeText));
      // Add the remaining part after removing this compound part
      const remaining = normalized.replace(normalizedPart, '').trim();
      if (remaining.length > 2) {
        parts.push(remaining);
      }
    }
  }

  return Array.from(new Set(parts)); // Remove duplicates
}

/**
 * Handle "mit" constructions (e.g., "Schnitzel mit Pommes")
 */
function splitMitConstruction(text: string): string[] {
  const normalized = normalizeText(text);
  const parts = [normalized];

  // Split by "mit" (with)
  if (normalized.includes(' mit ')) {
    const mitParts = normalized.split(' mit ');
    parts.push(...mitParts.map(p => p.trim()).filter(p => p.length > 0));
  }

  // Split by "und" (and)
  if (normalized.includes(' und ')) {
    const undParts = normalized.split(' und ');
    parts.push(...undParts.map(p => p.trim()).filter(p => p.length > 0));
  }

  // Split by comma
  if (normalized.includes(',')) {
    const commaParts = normalized.split(',');
    parts.push(...commaParts.map(p => p.trim()).filter(p => p.length > 0));
  }

  return Array.from(new Set(parts));
}

/**
 * Handle German diminutives and plurals
 */
function getDiminutiveBase(word: string): string[] {
  const normalized = normalizeText(word);
  const bases: string[] = [normalized];

  // German diminutive endings
  const diminutivePatterns = [
    { ending: 'chen', remove: 'chen' },
    { ending: 'lein', remove: 'lein' },
    { ending: 'le', remove: 'le' },
    { ending: 'li', remove: 'li' },
    { ending: 'erl', remove: 'erl' },
  ];

  for (const pattern of diminutivePatterns) {
    if (normalized.endsWith(pattern.ending)) {
      bases.push(normalized.slice(0, -pattern.remove.length));
    }
  }

  // German plural endings
  const pluralPatterns = [
    { ending: 'en', remove: 'en' },
    { ending: 'er', remove: 'er' },
    { ending: 'e', remove: 'e' },
    { ending: 's', remove: 's' },
    { ending: 'n', remove: 'n' },
  ];

  for (const pattern of pluralPatterns) {
    if (normalized.endsWith(pattern.ending) && normalized.length > pattern.remove.length + 2) {
      bases.push(normalized.slice(0, -pattern.remove.length));
    }
  }

  return Array.from(new Set(bases));
}

/**
 * Calculate similarity score between two strings
 */
function calculateSimilarity(str1: string, str2: string): number {
  const s1 = normalizeText(str1);
  const s2 = normalizeText(str2);

  if (s1 === s2) return 1;
  if (s1.includes(s2) || s2.includes(s1)) return 0.9;

  // Simple word overlap scoring
  const words1 = s1.split(' ');
  const words2 = s2.split(' ');

  let matches = 0;
  for (const w1 of words1) {
    for (const w2 of words2) {
      if (w1 === w2 || w1.includes(w2) || w2.includes(w1)) {
        matches++;
        break;
      }
    }
  }

  return matches / Math.max(words1.length, words2.length);
}

/**
 * Get a realistic food image by matching keywords
 * Enhanced algorithm with compound word handling, misspelling tolerance,
 * and German language constructs
 */
export function getRealisticFoodImage(dishName: string): RealisticFoodImage | null {
  const normalizedName = normalizeText(dishName);

  // Expand the search terms
  const searchTerms = new Set<string>();
  searchTerms.add(normalizedName);

  // Add compound word parts
  for (const part of splitCompoundWord(normalizedName)) {
    searchTerms.add(part);
  }

  // Add "mit" construction parts
  for (const part of splitMitConstruction(dishName)) {
    searchTerms.add(normalizeText(part));
    // Also add compound parts of each "mit" component
    for (const subPart of splitCompoundWord(part)) {
      searchTerms.add(subPart);
    }
  }

  // Add diminutive/plural bases
  for (const term of Array.from(searchTerms)) {
    for (const base of getDiminutiveBase(term)) {
      searchTerms.add(base);
    }
  }

  // Individual words
  const words = normalizedName.split(/\s+/);
  for (const word of words) {
    if (word.length > 2) {
      searchTerms.add(word);
      for (const part of splitCompoundWord(word)) {
        searchTerms.add(part);
      }
      for (const base of getDiminutiveBase(word)) {
        searchTerms.add(base);
      }
    }
  }

  // Score each image
  let bestMatch: RealisticFoodImage | null = null;
  let bestScore = 0;

  for (const image of REALISTIC_FOOD_LIBRARY) {
    let imageScore = 0;

    for (const keyword of image.keywords) {
      const normalizedKeyword = normalizeText(keyword);

      for (const term of Array.from(searchTerms)) {
        // Exact match
        if (term === normalizedKeyword) {
          imageScore = Math.max(imageScore, 100);
        }
        // Contains match
        else if (term.includes(normalizedKeyword) || normalizedKeyword.includes(term)) {
          imageScore = Math.max(imageScore, 80);
        }
        // Misspelling match
        else if (matchWithMisspellings(term, keyword)) {
          imageScore = Math.max(imageScore, 70);
        }
        // Similarity match
        else {
          const similarity = calculateSimilarity(term, normalizedKeyword);
          if (similarity > 0.6) {
            imageScore = Math.max(imageScore, similarity * 60);
          }
        }
      }

      // Word-level matching for multi-word keywords
      const keywordWords = normalizedKeyword.split(/\s+/);
      for (const kw of keywordWords) {
        if (kw.length > 2) {
          for (const term of Array.from(searchTerms)) {
            if (term === kw || term.includes(kw) || kw.includes(term)) {
              imageScore = Math.max(imageScore, 50);
            }
          }
        }
      }
    }

    if (imageScore > bestScore) {
      bestScore = imageScore;
      bestMatch = image;
    }
  }

  // Return match if score is above threshold
  return bestScore >= 30 ? bestMatch : null;
}

/**
 * Get all realistic images for a category
 */
export function getRealisticImagesByCategory(category: string): RealisticFoodImage[] {
  return REALISTIC_FOOD_LIBRARY.filter(img => img.category === category);
}

/**
 * Get all available categories
 */
export function getRealisticImageCategories(): string[] {
  return Array.from(new Set(REALISTIC_FOOD_LIBRARY.map(img => img.category)));
}

/**
 * Search images with fuzzy matching
 */
export function searchRealisticImages(query: string, limit: number = 10): RealisticFoodImage[] {
  const results: Array<{ image: RealisticFoodImage; score: number }> = [];

  for (const image of REALISTIC_FOOD_LIBRARY) {
    const match = getRealisticFoodImage(query);
    if (match && match.id === image.id) {
      results.push({ image, score: 100 });
    } else {
      // Partial matching
      const queryNorm = normalizeText(query);
      const labelNorm = normalizeText(image.label);

      if (labelNorm.includes(queryNorm) || queryNorm.includes(labelNorm)) {
        results.push({ image, score: 50 });
      } else {
        for (const keyword of image.keywords) {
          if (normalizeText(keyword).includes(queryNorm)) {
            results.push({ image, score: 30 });
            break;
          }
        }
      }
    }
  }

  return results
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(r => r.image);
}
