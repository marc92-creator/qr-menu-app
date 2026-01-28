/**
 * Ghibli-Style Food Image Library
 *
 * Beautiful, warm, illustrated food images for menu items.
 * Images are auto-matched based on dish names or can be manually selected.
 */

export interface FoodImageEntry {
  id: string;
  keywords: string[];
  image: string;
  label: string;
  category: FoodCategory;
}

export type FoodCategory =
  | 'doener'
  | 'pizza'
  | 'pasta'
  | 'burger'
  | 'asiatisch'
  | 'deutsch'
  | 'salate'
  | 'beilagen'
  | 'suppen'
  | 'fruehstueck'
  | 'getraenke'
  | 'desserts'
  | 'vegan'
  | 'snacks'
  | 'andere';

export const FOOD_CATEGORIES: { id: FoodCategory; label: string; icon: string }[] = [
  { id: 'doener', label: 'Döner & Türkisch', icon: '🥙' },
  { id: 'pizza', label: 'Pizza', icon: '🍕' },
  { id: 'pasta', label: 'Pasta', icon: '🍝' },
  { id: 'burger', label: 'Burger', icon: '🍔' },
  { id: 'asiatisch', label: 'Asiatisch', icon: '🍜' },
  { id: 'deutsch', label: 'Deutsch', icon: '🥨' },
  { id: 'salate', label: 'Salate', icon: '🥗' },
  { id: 'beilagen', label: 'Beilagen', icon: '🍟' },
  { id: 'suppen', label: 'Suppen', icon: '🍲' },
  { id: 'fruehstueck', label: 'Frühstück', icon: '🥐' },
  { id: 'getraenke', label: 'Getränke', icon: '🥤' },
  { id: 'desserts', label: 'Desserts', icon: '🍰' },
  { id: 'vegan', label: 'Vegan', icon: '🌱' },
  { id: 'snacks', label: 'Snacks', icon: '🍗' },
  { id: 'andere', label: 'Andere', icon: '🍽️' },
];

/**
 * Food Image Library
 * Each entry has keywords for auto-matching and a category for browsing
 */
export const FOOD_IMAGE_LIBRARY: FoodImageEntry[] = [
  // ============================================
  // DÖNER & TÜRKISCH (15+ Bilder)
  // ============================================
  {
    id: 'doener',
    keywords: ['döner', 'doner', 'kebab', 'kebap', 'fleisch im brot'],
    image: '/food-images/doener.svg',
    label: 'Döner',
    category: 'doener',
  },
  {
    id: 'dueruem',
    keywords: ['dürüm', 'durum', 'wrap', 'yufka', 'rolle'],
    image: '/food-images/dueruem.svg',
    label: 'Dürüm / Wrap',
    category: 'doener',
  },
  {
    id: 'lahmacun',
    keywords: ['lahmacun', 'türkische pizza', 'lahmajun'],
    image: '/food-images/lahmacun.svg',
    label: 'Lahmacun',
    category: 'doener',
  },
  {
    id: 'falafel',
    keywords: ['falafel', 'kichererbsen', 'vegetarisch'],
    image: '/food-images/falafel.svg',
    label: 'Falafel',
    category: 'doener',
  },
  {
    id: 'doener-teller',
    keywords: ['döner teller', 'kebap teller', 'teller mit reis'],
    image: '/food-images/doener-teller.svg',
    label: 'Döner Teller',
    category: 'doener',
  },
  {
    id: 'doener-box',
    keywords: ['döner box', 'doner box', 'box mit pommes', 'dönerbox'],
    image: '/food-images/doener-box.svg',
    label: 'Döner Box',
    category: 'doener',
  },
  {
    id: 'pide',
    keywords: ['pide', 'türkisches boot', 'türkisches brot'],
    image: '/food-images/pide.svg',
    label: 'Pide',
    category: 'doener',
  },
  {
    id: 'kebab',
    keywords: ['kebab spiess', 'spiess', 'shish'],
    image: '/food-images/kebab.svg',
    label: 'Kebab Spieß',
    category: 'doener',
  },
  {
    id: 'adana-kebab',
    keywords: ['adana', 'adana kebab', 'hackfleisch spiess'],
    image: '/food-images/adana-kebab.svg',
    label: 'Adana Kebab',
    category: 'doener',
  },
  {
    id: 'iskender',
    keywords: ['iskender', 'iskender kebab', 'mit joghurt'],
    image: '/food-images/iskender.svg',
    label: 'Iskender',
    category: 'doener',
  },
  {
    id: 'kofte',
    keywords: ['köfte', 'kofte', 'frikadelle', 'türkische frikadellen'],
    image: '/food-images/kofte.svg',
    label: 'Köfte',
    category: 'doener',
  },
  {
    id: 'borek',
    keywords: ['börek', 'borek', 'blätterteig', 'sigara'],
    image: '/food-images/borek.svg',
    label: 'Börek',
    category: 'doener',
  },
  {
    id: 'gozleme',
    keywords: ['gözleme', 'gozleme', 'türkischer pfannkuchen'],
    image: '/food-images/gozleme.svg',
    label: 'Gözleme',
    category: 'doener',
  },
  {
    id: 'mercimek-corbasi',
    keywords: ['mercimek', 'linsensuppe', 'türkische suppe', 'çorba'],
    image: '/food-images/mercimek-corbasi.svg',
    label: 'Linsensuppe',
    category: 'doener',
  },
  {
    id: 'tavuk-kebab',
    keywords: ['tavuk', 'hähnchen kebab', 'chicken kebab', 'hühnchen spiess'],
    image: '/food-images/tavuk-kebab.svg',
    label: 'Tavuk Kebab',
    category: 'doener',
  },
  {
    id: 'vegetarisch-teller',
    keywords: ['vegetarischer teller', 'gemüse teller', 'veggie teller'],
    image: '/food-images/vegetarisch-teller.svg',
    label: 'Vegetarischer Teller',
    category: 'doener',
  },

  // ============================================
  // PIZZA (10+ Bilder)
  // ============================================
  {
    id: 'pizza',
    keywords: ['pizza'],
    image: '/food-images/pizza.svg',
    label: 'Pizza',
    category: 'pizza',
  },
  {
    id: 'pizza-margherita',
    keywords: ['margherita', 'margarita', 'tomaten mozzarella'],
    image: '/food-images/pizza-margherita.svg',
    label: 'Pizza Margherita',
    category: 'pizza',
  },
  {
    id: 'pizza-salami',
    keywords: ['salami', 'pepperoni', 'peperoni'],
    image: '/food-images/pizza-salami.svg',
    label: 'Pizza Salami',
    category: 'pizza',
  },
  {
    id: 'pizza-hawaii',
    keywords: ['hawaii', 'ananas', 'schinken ananas'],
    image: '/food-images/pizza-hawaii.svg',
    label: 'Pizza Hawaii',
    category: 'pizza',
  },
  {
    id: 'pizza-vegetarisch',
    keywords: ['vegetarisch', 'gemüse pizza', 'veggie pizza'],
    image: '/food-images/pizza-vegetarisch.svg',
    label: 'Pizza Vegetarisch',
    category: 'pizza',
  },
  {
    id: 'pizza-thunfisch',
    keywords: ['thunfisch', 'tonno', 'tuna'],
    image: '/food-images/pizza-thunfisch.svg',
    label: 'Pizza Thunfisch',
    category: 'pizza',
  },
  {
    id: 'pizza-quattro-formaggi',
    keywords: ['quattro formaggi', 'vier käse', '4 käse', 'käse pizza'],
    image: '/food-images/pizza-quattro-formaggi.svg',
    label: 'Quattro Formaggi',
    category: 'pizza',
  },
  {
    id: 'pizza-diavola',
    keywords: ['diavola', 'scharf', 'peperoni scharf', 'spicy'],
    image: '/food-images/pizza-diavola.svg',
    label: 'Pizza Diavola',
    category: 'pizza',
  },
  {
    id: 'pizza-calzone',
    keywords: ['calzone', 'gefüllt', 'tasche'],
    image: '/food-images/pizza-calzone.svg',
    label: 'Calzone',
    category: 'pizza',
  },
  {
    id: 'pizza-funghi',
    keywords: ['funghi', 'pilze', 'champignon'],
    image: '/food-images/pizza-funghi.svg',
    label: 'Pizza Funghi',
    category: 'pizza',
  },
  {
    id: 'pizza-spinaci',
    keywords: ['spinaci', 'spinat', 'feta spinat'],
    image: '/food-images/pizza-spinaci.svg',
    label: 'Pizza Spinaci',
    category: 'pizza',
  },

  // ============================================
  // PASTA (10+ Bilder)
  // ============================================
  {
    id: 'pasta',
    keywords: ['pasta', 'nudeln'],
    image: '/food-images/pasta.svg',
    label: 'Pasta',
    category: 'pasta',
  },
  {
    id: 'spaghetti-bolognese',
    keywords: ['bolognese', 'bolo', 'hackfleisch sauce', 'ragù'],
    image: '/food-images/spaghetti-bolognese.svg',
    label: 'Spaghetti Bolognese',
    category: 'pasta',
  },
  {
    id: 'spaghetti-carbonara',
    keywords: ['carbonara', 'speck sahne', 'ei speck'],
    image: '/food-images/spaghetti-carbonara.svg',
    label: 'Spaghetti Carbonara',
    category: 'pasta',
  },
  {
    id: 'penne-arrabiata',
    keywords: ['arrabiata', 'arrabbiata', 'penne scharf', 'tomaten scharf'],
    image: '/food-images/penne-arrabiata.svg',
    label: 'Penne Arrabiata',
    category: 'pasta',
  },
  {
    id: 'lasagne',
    keywords: ['lasagne', 'lasagna', 'auflauf'],
    image: '/food-images/lasagne.svg',
    label: 'Lasagne',
    category: 'pasta',
  },
  {
    id: 'tortellini',
    keywords: ['tortellini', 'gefüllte pasta'],
    image: '/food-images/tortellini.svg',
    label: 'Tortellini',
    category: 'pasta',
  },
  {
    id: 'ravioli',
    keywords: ['ravioli', 'gefüllte teigtaschen'],
    image: '/food-images/ravioli.svg',
    label: 'Ravioli',
    category: 'pasta',
  },
  {
    id: 'gnocchi',
    keywords: ['gnocchi', 'kartoffelklöße', 'nocken'],
    image: '/food-images/gnocchi.svg',
    label: 'Gnocchi',
    category: 'pasta',
  },
  {
    id: 'tagliatelle',
    keywords: ['tagliatelle', 'bandnudeln', 'pilze sahne'],
    image: '/food-images/tagliatelle.svg',
    label: 'Tagliatelle',
    category: 'pasta',
  },
  {
    id: 'risotto',
    keywords: ['risotto', 'reis italienisch', 'arborio'],
    image: '/food-images/risotto.svg',
    label: 'Risotto',
    category: 'pasta',
  },
  {
    id: 'pasta-alfredo',
    keywords: ['alfredo', 'fettuccine', 'sahne sauce', 'parmesan sahne'],
    image: '/food-images/pasta-alfredo.svg',
    label: 'Pasta Alfredo',
    category: 'pasta',
  },

  // ============================================
  // BURGER (8+ Bilder)
  // ============================================
  {
    id: 'burger',
    keywords: ['burger', 'hamburger'],
    image: '/food-images/burger.svg',
    label: 'Burger',
    category: 'burger',
  },
  {
    id: 'cheeseburger',
    keywords: ['cheeseburger', 'käse burger', 'cheese'],
    image: '/food-images/cheeseburger.svg',
    label: 'Cheeseburger',
    category: 'burger',
  },
  {
    id: 'chicken-burger',
    keywords: ['chicken burger', 'hähnchen burger', 'crispy chicken'],
    image: '/food-images/chicken-burger.svg',
    label: 'Chicken Burger',
    category: 'burger',
  },
  {
    id: 'veggie-burger',
    keywords: ['veggie burger', 'vegetarisch burger', 'pflanzlich'],
    image: '/food-images/veggie-burger.svg',
    label: 'Veggie Burger',
    category: 'burger',
  },
  {
    id: 'double-burger',
    keywords: ['double', 'doppelt', 'xxl', 'big'],
    image: '/food-images/double-burger.svg',
    label: 'Double Burger',
    category: 'burger',
  },
  {
    id: 'bacon-burger',
    keywords: ['bacon', 'speck burger'],
    image: '/food-images/bacon-burger.svg',
    label: 'Bacon Burger',
    category: 'burger',
  },
  {
    id: 'fish-burger',
    keywords: ['fish burger', 'fisch burger', 'backfisch'],
    image: '/food-images/fish-burger.svg',
    label: 'Fish Burger',
    category: 'burger',
  },
  {
    id: 'pulled-pork-burger',
    keywords: ['pulled pork', 'bbq burger', 'geschmortes schwein'],
    image: '/food-images/pulled-pork-burger.svg',
    label: 'Pulled Pork Burger',
    category: 'burger',
  },
  {
    id: 'chicken',
    keywords: ['chicken', 'hähnchen', 'hühnchen', 'crispy chicken', 'nuggets'],
    image: '/food-images/chicken.svg',
    label: 'Hähnchen',
    category: 'burger',
  },

  // ============================================
  // ASIATISCH (12+ Bilder)
  // ============================================
  {
    id: 'sushi',
    keywords: ['sushi', 'nigiri', 'sashimi', 'japanisch'],
    image: '/food-images/sushi.svg',
    label: 'Sushi',
    category: 'asiatisch',
  },
  {
    id: 'sushi-maki',
    keywords: ['maki', 'rolle', 'sushi roll', 'california'],
    image: '/food-images/sushi-maki.svg',
    label: 'Maki Rolls',
    category: 'asiatisch',
  },
  {
    id: 'ramen',
    keywords: ['ramen', 'japanische suppe', 'nudelsuppe'],
    image: '/food-images/ramen.svg',
    label: 'Ramen',
    category: 'asiatisch',
  },
  {
    id: 'pho',
    keywords: ['pho', 'vietnamesisch', 'reisbandnudeln'],
    image: '/food-images/pho.svg',
    label: 'Pho',
    category: 'asiatisch',
  },
  {
    id: 'pad-thai',
    keywords: ['pad thai', 'thailändisch', 'gebratene reisnudeln'],
    image: '/food-images/pad-thai.svg',
    label: 'Pad Thai',
    category: 'asiatisch',
  },
  {
    id: 'curry-reis',
    keywords: ['curry', 'curry reis', 'japanisches curry'],
    image: '/food-images/curry-reis.svg',
    label: 'Curry Reis',
    category: 'asiatisch',
  },
  {
    id: 'gebratener-reis',
    keywords: ['gebratener reis', 'fried rice', 'reis gebraten', 'nasi goreng'],
    image: '/food-images/gebratener-reis.svg',
    label: 'Gebratener Reis',
    category: 'asiatisch',
  },
  {
    id: 'gebratene-nudeln',
    keywords: ['gebratene nudeln', 'chow mein', 'lo mein', 'bami goreng'],
    image: '/food-images/gebratene-nudeln.svg',
    label: 'Gebratene Nudeln',
    category: 'asiatisch',
  },
  {
    id: 'spring-rolls',
    keywords: ['frühlingsrolle', 'spring roll', 'sommerrolle'],
    image: '/food-images/spring-rolls.svg',
    label: 'Frühlingsrollen',
    category: 'asiatisch',
  },
  {
    id: 'dim-sum',
    keywords: ['dim sum', 'dumpling', 'teigtaschen', 'gedämpft'],
    image: '/food-images/dim-sum.svg',
    label: 'Dim Sum',
    category: 'asiatisch',
  },
  {
    id: 'bao-buns',
    keywords: ['bao', 'bao bun', 'hefekloß', 'gedämpftes brötchen'],
    image: '/food-images/bao-buns.svg',
    label: 'Bao Buns',
    category: 'asiatisch',
  },
  {
    id: 'teriyaki-bowl',
    keywords: ['teriyaki', 'bowl', 'reis schüssel', 'donburi'],
    image: '/food-images/teriyaki-bowl.svg',
    label: 'Teriyaki Bowl',
    category: 'asiatisch',
  },

  // ============================================
  // DEUTSCH / EUROPÄISCH (6+ Bilder)
  // ============================================
  {
    id: 'schnitzel',
    keywords: ['schnitzel'],
    image: '/food-images/schnitzel.svg',
    label: 'Schnitzel',
    category: 'deutsch',
  },
  {
    id: 'wiener-schnitzel',
    keywords: ['wiener schnitzel', 'kalb', 'paniert'],
    image: '/food-images/wiener-schnitzel.svg',
    label: 'Wiener Schnitzel',
    category: 'deutsch',
  },
  {
    id: 'jaeger-schnitzel',
    keywords: ['jäger schnitzel', 'jägerschnitzel', 'pilzrahm', 'champignon'],
    image: '/food-images/jaeger-schnitzel.svg',
    label: 'Jägerschnitzel',
    category: 'deutsch',
  },
  {
    id: 'currywurst',
    keywords: ['currywurst', 'wurst', 'pommes currywurst'],
    image: '/food-images/currywurst.svg',
    label: 'Currywurst',
    category: 'deutsch',
  },
  {
    id: 'bratwurst',
    keywords: ['bratwurst', 'grillwurst', 'thüringer'],
    image: '/food-images/bratwurst.svg',
    label: 'Bratwurst',
    category: 'deutsch',
  },
  {
    id: 'gulasch',
    keywords: ['gulasch', 'gulyas', 'eintopf', 'rindergulasch'],
    image: '/food-images/gulasch.svg',
    label: 'Gulasch',
    category: 'deutsch',
  },
  {
    id: 'kaesespaetzle',
    keywords: ['käsespätzle', 'kaesespaetzle', 'spätzle', 'käse nudeln'],
    image: '/food-images/kaesespaetzle.svg',
    label: 'Käsespätzle',
    category: 'deutsch',
  },

  // ============================================
  // SALATE (4+ Bilder)
  // ============================================
  {
    id: 'salat',
    keywords: ['salat', 'salad', 'gemischter salat', 'beilagensalat'],
    image: '/food-images/salat.svg',
    label: 'Salat',
    category: 'salate',
  },
  {
    id: 'caesar-salad',
    keywords: ['caesar', 'cäsar', 'caesar salad', 'römersalat'],
    image: '/food-images/caesar-salad.svg',
    label: 'Caesar Salad',
    category: 'salate',
  },
  {
    id: 'griechischer-salat',
    keywords: ['griechisch', 'greek salad', 'feta salat', 'bauernsalat'],
    image: '/food-images/griechischer-salat.svg',
    label: 'Griechischer Salat',
    category: 'salate',
  },

  // ============================================
  // BEILAGEN (8+ Bilder)
  // ============================================
  {
    id: 'pommes',
    keywords: ['pommes', 'frites', 'fritten', 'french fries'],
    image: '/food-images/pommes.svg',
    label: 'Pommes',
    category: 'beilagen',
  },
  {
    id: 'suesskartoffel-pommes',
    keywords: ['süßkartoffel', 'sweet potato', 'süßkartoffel pommes'],
    image: '/food-images/suesskartoffel-pommes.svg',
    label: 'Süßkartoffel Pommes',
    category: 'beilagen',
  },
  {
    id: 'onion-rings',
    keywords: ['onion rings', 'zwiebelringe', 'gebackene zwiebeln'],
    image: '/food-images/onion-rings.svg',
    label: 'Onion Rings',
    category: 'beilagen',
  },
  {
    id: 'reis',
    keywords: ['reis', 'rice', 'basmati', 'beilage reis'],
    image: '/food-images/reis.svg',
    label: 'Reis',
    category: 'beilagen',
  },
  {
    id: 'hummus',
    keywords: ['hummus', 'humus', 'kichererbsen dip'],
    image: '/food-images/hummus.svg',
    label: 'Hummus',
    category: 'beilagen',
  },

  // ============================================
  // SUPPEN (3+ Bilder)
  // ============================================
  {
    id: 'suppe',
    keywords: ['suppe', 'soup', 'brühe'],
    image: '/food-images/suppe.svg',
    label: 'Suppe',
    category: 'suppen',
  },
  {
    id: 'tomatensuppe',
    keywords: ['tomatensuppe', 'tomato soup', 'gazpacho'],
    image: '/food-images/tomatensuppe.svg',
    label: 'Tomatensuppe',
    category: 'suppen',
  },

  // ============================================
  // FRÜHSTÜCK (3+ Bilder)
  // ============================================
  {
    id: 'broetchen',
    keywords: ['brötchen', 'semmel', 'brot', 'sandwich'],
    image: '/food-images/broetchen.svg',
    label: 'Brötchen',
    category: 'fruehstueck',
  },
  {
    id: 'croissant',
    keywords: ['croissant', 'frühstück', 'breakfast'],
    image: '/food-images/croissant.svg',
    label: 'Croissant',
    category: 'fruehstueck',
  },

  // ============================================
  // GETRÄNKE (10+ Bilder)
  // ============================================
  {
    id: 'cola',
    keywords: ['cola', 'coca', 'pepsi'],
    image: '/food-images/cola.svg',
    label: 'Cola',
    category: 'getraenke',
  },
  {
    id: 'wasser',
    keywords: ['wasser', 'water', 'mineralwasser', 'still', 'sprudel'],
    image: '/food-images/wasser.svg',
    label: 'Wasser',
    category: 'getraenke',
  },
  {
    id: 'ayran',
    keywords: ['ayran', 'joghurt getränk', 'türkisch'],
    image: '/food-images/ayran.svg',
    label: 'Ayran',
    category: 'getraenke',
  },
  {
    id: 'fanta',
    keywords: ['fanta', 'orangenlimonade', 'orange'],
    image: '/food-images/fanta.svg',
    label: 'Fanta / Orange',
    category: 'getraenke',
  },
  {
    id: 'sprite',
    keywords: ['sprite', 'zitrone', 'limo', '7up'],
    image: '/food-images/sprite.svg',
    label: 'Sprite / Limo',
    category: 'getraenke',
  },
  {
    id: 'tee',
    keywords: ['tee', 'tea', 'çay', 'cay'],
    image: '/food-images/tee.svg',
    label: 'Tee',
    category: 'getraenke',
  },
  {
    id: 'kaffee',
    keywords: ['kaffee', 'coffee', 'espresso'],
    image: '/food-images/kaffee.svg',
    label: 'Kaffee',
    category: 'getraenke',
  },
  {
    id: 'cappuccino',
    keywords: ['cappuccino', 'cappucino', 'latte', 'milchkaffee'],
    image: '/food-images/cappuccino.svg',
    label: 'Cappuccino',
    category: 'getraenke',
  },
  {
    id: 'smoothie',
    keywords: ['smoothie', 'shake', 'frucht shake', 'milchshake'],
    image: '/food-images/smoothie.svg',
    label: 'Smoothie',
    category: 'getraenke',
  },
  // Alkoholische Getränke
  {
    id: 'bier',
    keywords: ['bier', 'beer', 'pils', 'pilsner', 'helles', 'lager'],
    image: '/food-images/bier.svg',
    label: 'Bier',
    category: 'getraenke',
  },
  {
    id: 'weizenbier',
    keywords: ['weizen', 'weizenbier', 'hefeweizen', 'weissbier', 'wheat beer'],
    image: '/food-images/weizenbier.svg',
    label: 'Weizenbier',
    category: 'getraenke',
  },
  {
    id: 'craft-beer',
    keywords: ['craft', 'craft beer', 'ipa', 'pale ale', 'stout', 'porter'],
    image: '/food-images/craft-beer.svg',
    label: 'Craft Beer',
    category: 'getraenke',
  },
  {
    id: 'rotwein',
    keywords: ['rotwein', 'red wine', 'merlot', 'cabernet', 'shiraz', 'tempranillo'],
    image: '/food-images/rotwein.svg',
    label: 'Rotwein',
    category: 'getraenke',
  },
  {
    id: 'weisswein',
    keywords: ['weißwein', 'weisswein', 'white wine', 'riesling', 'chardonnay', 'sauvignon'],
    image: '/food-images/weisswein.svg',
    label: 'Weißwein',
    category: 'getraenke',
  },
  {
    id: 'rose',
    keywords: ['rosé', 'rose', 'rosewein'],
    image: '/food-images/rose.svg',
    label: 'Rosé',
    category: 'getraenke',
  },
  {
    id: 'sekt',
    keywords: ['sekt', 'prosecco', 'champagner', 'champagne', 'schaumwein', 'sparkling'],
    image: '/food-images/sekt.svg',
    label: 'Sekt / Prosecco',
    category: 'getraenke',
  },
  {
    id: 'cocktail',
    keywords: ['cocktail', 'mixed drink', 'longdrink', 'long drink'],
    image: '/food-images/cocktail.svg',
    label: 'Cocktail',
    category: 'getraenke',
  },
  {
    id: 'mojito',
    keywords: ['mojito', 'minze cocktail', 'rum minze'],
    image: '/food-images/mojito.svg',
    label: 'Mojito',
    category: 'getraenke',
  },
  {
    id: 'margarita',
    keywords: ['margarita', 'tequila cocktail'],
    image: '/food-images/margarita.svg',
    label: 'Margarita',
    category: 'getraenke',
  },
  {
    id: 'gin-tonic',
    keywords: ['gin tonic', 'gin & tonic', 'g&t', 'gin'],
    image: '/food-images/gin-tonic.svg',
    label: 'Gin Tonic',
    category: 'getraenke',
  },
  {
    id: 'whiskey',
    keywords: ['whiskey', 'whisky', 'bourbon', 'scotch', 'jack daniels'],
    image: '/food-images/whiskey.svg',
    label: 'Whiskey',
    category: 'getraenke',
  },
  {
    id: 'aperol-spritz',
    keywords: ['aperol', 'spritz', 'aperol spritz', 'hugo'],
    image: '/food-images/aperol-spritz.svg',
    label: 'Aperol Spritz',
    category: 'getraenke',
  },
  {
    id: 'schnaps',
    keywords: ['schnaps', 'shot', 'kurzer', 'vodka', 'wodka', 'jägermeister', 'obstler'],
    image: '/food-images/schnaps.svg',
    label: 'Schnaps',
    category: 'getraenke',
  },
  {
    id: 'radler',
    keywords: ['radler', 'alster', 'bier mix', 'biermix', 'shandy'],
    image: '/food-images/radler.svg',
    label: 'Radler',
    category: 'getraenke',
  },

  // ============================================
  // DESSERTS (8+ Bilder)
  // ============================================
  {
    id: 'baklava',
    keywords: ['baklava', 'baklawa', 'türkisch süß'],
    image: '/food-images/baklava.svg',
    label: 'Baklava',
    category: 'desserts',
  },
  {
    id: 'kunefe',
    keywords: ['künefe', 'kunefe', 'kadayif', 'türkisch käse dessert'],
    image: '/food-images/kunefe.svg',
    label: 'Künefe',
    category: 'desserts',
  },
  {
    id: 'eis',
    keywords: ['eis', 'ice cream', 'gelato', 'eiskugel'],
    image: '/food-images/eis.svg',
    label: 'Eis',
    category: 'desserts',
  },
  {
    id: 'kuchen',
    keywords: ['kuchen', 'cake', 'torte'],
    image: '/food-images/kuchen.svg',
    label: 'Kuchen',
    category: 'desserts',
  },
  {
    id: 'tiramisu',
    keywords: ['tiramisu', 'mascarpone', 'italienisch dessert'],
    image: '/food-images/tiramisu.svg',
    label: 'Tiramisu',
    category: 'desserts',
  },
  {
    id: 'cheesecake',
    keywords: ['cheesecake', 'käsekuchen', 'new york'],
    image: '/food-images/cheesecake.svg',
    label: 'Cheesecake',
    category: 'desserts',
  },

  // ============================================
  // VEGAN (2+ Bilder)
  // ============================================
  {
    id: 'buddha-bowl',
    keywords: ['buddha bowl', 'bowl', 'vegan bowl', 'quinoa'],
    image: '/food-images/buddha-bowl.svg',
    label: 'Buddha Bowl',
    category: 'vegan',
  },

  // ============================================
  // SNACKS (4+ Bilder)
  // ============================================
  {
    id: 'chicken-nuggets',
    keywords: ['nuggets', 'chicken nuggets', 'hähnchen nuggets'],
    image: '/food-images/chicken-nuggets.svg',
    label: 'Chicken Nuggets',
    category: 'snacks',
  },
  {
    id: 'chicken-wings',
    keywords: ['wings', 'chicken wings', 'hot wings', 'buffalo'],
    image: '/food-images/chicken-wings.svg',
    label: 'Chicken Wings',
    category: 'snacks',
  },
  {
    id: 'nachos',
    keywords: ['nachos', 'tortilla chips', 'käse nachos', 'mexican'],
    image: '/food-images/nachos.svg',
    label: 'Nachos',
    category: 'snacks',
  },

  // ============================================
  // ANDERE
  // ============================================
  {
    id: 'default',
    keywords: [],
    image: '/food-images/default-food.svg',
    label: 'Standard',
    category: 'andere',
  },
];

/**
 * Get automatic image based on dish name
 * Searches through keywords case-insensitive
 */
export function getAutoImage(dishName: string): string {
  const nameLower = dishName.toLowerCase();

  // Search for matching keywords
  for (const entry of FOOD_IMAGE_LIBRARY) {
    for (const keyword of entry.keywords) {
      if (nameLower.includes(keyword.toLowerCase())) {
        return entry.image;
      }
    }
  }

  // Return default image if no match found
  return '/food-images/default-food.svg';
}

/**
 * Get image entry by ID
 */
export function getImageById(id: string): FoodImageEntry | undefined {
  return FOOD_IMAGE_LIBRARY.find(entry => entry.id === id);
}

/**
 * Get all images for a category
 */
export function getImagesByCategory(category: FoodCategory): FoodImageEntry[] {
  return FOOD_IMAGE_LIBRARY.filter(entry => entry.category === category);
}

/**
 * Search images by query
 */
export function searchImages(query: string): FoodImageEntry[] {
  const queryLower = query.toLowerCase();
  return FOOD_IMAGE_LIBRARY.filter(entry =>
    entry.label.toLowerCase().includes(queryLower) ||
    entry.keywords.some(k => k.toLowerCase().includes(queryLower))
  );
}

/**
 * Image mode for menu items
 */
export type ImageMode = 'auto' | 'library' | 'custom' | 'none';

/**
 * Category Image Mapping
 * Maps category names to icons and images
 */
export interface CategoryImageEntry {
  keywords: string[];
  icon: string;
  image: string;
}

export const CATEGORY_IMAGES: Record<string, CategoryImageEntry> = {
  doener: { keywords: ['döner', 'doner', 'kebab', 'kebap', 'türkisch', 'wraps'], icon: '🥙', image: '/food-images/doener.svg' },
  pizza: { keywords: ['pizza'], icon: '🍕', image: '/food-images/pizza.svg' },
  pasta: { keywords: ['pasta', 'nudeln', 'spaghetti'], icon: '🍝', image: '/food-images/pasta.svg' },
  burger: { keywords: ['burger'], icon: '🍔', image: '/food-images/burger.svg' },
  asiatisch: { keywords: ['asiatisch', 'asia', 'sushi', 'chinese', 'thai', 'vietnam'], icon: '🍜', image: '/food-images/ramen.svg' },
  deutsch: { keywords: ['deutsch', 'german', 'schnitzel', 'braten'], icon: '🥨', image: '/food-images/schnitzel.svg' },
  salate: { keywords: ['salat', 'salads', 'salate'], icon: '🥗', image: '/food-images/salat.svg' },
  beilagen: { keywords: ['beilagen', 'sides', 'extras'], icon: '🍟', image: '/food-images/pommes.svg' },
  getraenke: { keywords: ['getränke', 'drinks', 'trinken'], icon: '🥤', image: '/food-images/cola.svg' },
  desserts: { keywords: ['dessert', 'süß', 'nachspeise', 'nachtisch', 'süßes'], icon: '🍰', image: '/food-images/baklava.svg' },
  fruehstueck: { keywords: ['frühstück', 'breakfast', 'morgen'], icon: '🥐', image: '/food-images/croissant.svg' },
  suppen: { keywords: ['suppe', 'soup', 'suppen'], icon: '🍲', image: '/food-images/suppe.svg' },
  vegan: { keywords: ['vegan', 'vegetarisch', 'pflanzlich'], icon: '🌱', image: '/food-images/buddha-bowl.svg' },
  snacks: { keywords: ['snack', 'snacks', 'fingerfood'], icon: '🍗', image: '/food-images/chicken-nuggets.svg' },
  hauptgerichte: { keywords: ['hauptgericht', 'main', 'gericht'], icon: '🍽️', image: '/food-images/schnitzel.svg' },
  vorspeisen: { keywords: ['vorspeise', 'starter', 'appetizer'], icon: '🥗', image: '/food-images/hummus.svg' },
  default: { keywords: [], icon: '🍽️', image: '/food-images/default-food.svg' },
};

/**
 * Get category icon and image based on category name
 */
export function getCategoryImage(categoryName: string): { icon: string; image: string } {
  const nameLower = categoryName.toLowerCase();

  for (const [, entry] of Object.entries(CATEGORY_IMAGES)) {
    for (const keyword of entry.keywords) {
      if (nameLower.includes(keyword.toLowerCase())) {
        return { icon: entry.icon, image: entry.image };
      }
    }
  }

  return { icon: CATEGORY_IMAGES.default.icon, image: CATEGORY_IMAGES.default.image };
}

/**
 * Get the actual image URL for a menu item
 */
export function getItemImageUrl(
  item: {
    name: string;
    image_url?: string | null;
    image_library_key?: string | null;
    image_mode?: ImageMode;
  },
  autoImagesEnabled: boolean = true
): string | null {
  const mode = item.image_mode || 'auto';

  // If restaurant has disabled auto images, only show custom images
  if (!autoImagesEnabled && mode !== 'custom') {
    return null;
  }

  switch (mode) {
    case 'none':
      return null;
    case 'custom':
      return item.image_url || null;
    case 'library':
      if (item.image_library_key) {
        const entry = getImageById(item.image_library_key);
        return entry?.image || null;
      }
      return null;
    case 'auto':
    default:
      return getAutoImage(item.name);
  }
}
