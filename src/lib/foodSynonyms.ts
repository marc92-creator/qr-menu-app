/**
 * Food Synonyms, Regional Variants, Ingredients, and Cooking Methods
 * Enhanced matching system for intelligent food image assignment
 */

export interface SynonymGroup {
  canonical: string; // Main term
  variants: string[]; // All alternative names
}

/**
 * Comprehensive food synonym database
 * Includes regional dialects, spelling variants, and translations
 */
export const FOOD_SYNONYMS: SynonymGroup[] = [
  // ============================================
  // DÖNER & TURKISH
  // ============================================
  {
    canonical: 'döner',
    variants: [
      'doner', 'doener', 'donner', 'dönar', 'donar',
      'kebab', 'kebap', 'kepap', 'kabab', 'kabob',
      'shawarma', 'gyros döner', 'türkischer döner',
      'fleisch döner', 'kalb döner', 'lamm döner'
    ]
  },
  {
    canonical: 'dürüm',
    variants: [
      'durum', 'dürum', 'duruem', 'durüm',
      'wrap', 'yufka', 'lavash', 'rolle',
      'döner wrap', 'türkischer wrap', 'yufka döner'
    ]
  },
  {
    canonical: 'lahmacun',
    variants: [
      'lahmajun', 'lahmajo', 'lahmaçun',
      'türkische pizza', 'arabische pizza', 'fleischfladen'
    ]
  },
  {
    canonical: 'pide',
    variants: [
      'türkisches fladenbrot', 'türkische pizza',
      'pita', 'pidé', 'türkisches boot'
    ]
  },
  {
    canonical: 'köfte',
    variants: [
      'koefte', 'kofte', 'köftesi', 'kofta',
      'fleischbällchen', 'hackbällchen', 'türkische frikadellen',
      'inegöl köfte', 'izgara köfte'
    ]
  },
  {
    canonical: 'iskender',
    variants: [
      'iskender kebab', 'iskender kebap', 'alexander kebab',
      'döner mit joghurt', 'joghurt döner'
    ]
  },
  {
    canonical: 'adana',
    variants: [
      'adana kebab', 'adana kebap', 'adana spiess',
      'hackfleisch spiess', 'scharfer kebab'
    ]
  },

  // ============================================
  // POMMES FRITES (Regional variants!)
  // ============================================
  {
    canonical: 'pommes',
    variants: [
      'pommes frites', 'fritten', 'friten', 'frites',
      'french fries', 'chips', 'kartoffelstäbchen',
      'pommfrit', 'pommfritz', 'pomm', 'pom',
      'fritjes', 'patat'
    ]
  },
  {
    canonical: 'süßkartoffel pommes',
    variants: [
      'sweet potato fries', 'süsskartoffel pommes',
      'süßkartoffelfritten', 'süsskartoffelpommes'
    ]
  },

  // ============================================
  // CHICKEN / HÄHNCHEN
  // ============================================
  {
    canonical: 'hähnchen',
    variants: [
      'haehnchen', 'hahnchen', 'hendl', 'broiler',
      'chicken', 'poulet', 'pollo', 'tavuk',
      'grillhähnchen', 'brathähnchen', 'huhn',
      'hühnchen', 'haehnchen', 'geflügel'
    ]
  },
  {
    canonical: 'chicken wings',
    variants: [
      'wings', 'hähnchenflügel', 'hühnerflügel',
      'buffalo wings', 'hot wings', 'flügel'
    ]
  },
  {
    canonical: 'chicken nuggets',
    variants: [
      'nuggets', 'hähnchen nuggets', 'hühnchen nuggets',
      'chicken mcnuggets', 'hähnchenteile'
    ]
  },

  // ============================================
  // PFANNKUCHEN (Most regional variants!)
  // ============================================
  {
    canonical: 'pfannkuchen',
    variants: [
      'eierkuchen', 'palatschinken', 'pancakes',
      'flädle', 'plinsen', 'eierpuffer', 'crêpes',
      'fladen', 'eierpfannkuchen', 'berliner'
    ]
  },

  // ============================================
  // BRÖTCHEN (Huge regional variation!)
  // ============================================
  {
    canonical: 'brötchen',
    variants: [
      'broetchen', 'semmel', 'schrippe', 'weck',
      'rundstück', 'weckle', 'brötli', 'laabla',
      'bun', 'roll', 'kleinbrot', 'weckchen'
    ]
  },

  // ============================================
  // BURGER
  // ============================================
  {
    canonical: 'burger',
    variants: [
      'hamburger', 'beefburger', 'hackfleisch brötchen',
      'bulette im brot', 'patty'
    ]
  },
  {
    canonical: 'cheeseburger',
    variants: [
      'cheese burger', 'käseburger', 'burger mit käse',
      'käse burger'
    ]
  },
  {
    canonical: 'veggie burger',
    variants: [
      'vegetarischer burger', 'vegan burger', 'gemüseburger',
      'beyond burger', 'impossible burger', 'plant based burger'
    ]
  },

  // ============================================
  // PIZZA
  // ============================================
  {
    canonical: 'pizza',
    variants: ['piza', 'pizze', 'italian pizza', 'fladen']
  },
  {
    canonical: 'pizza margherita',
    variants: [
      'margherita', 'margerita', 'pizza margarita',
      'pizza mozzarella', 'käsepizza', 'tomaten mozzarella pizza'
    ]
  },
  {
    canonical: 'pizza salami',
    variants: [
      'salamipizza', 'pizza pepperoni', 'pepperoni pizza',
      'pizza diavola', 'scharfe pizza'
    ]
  },
  {
    canonical: 'pizza hawaii',
    variants: [
      'hawaii pizza', 'pizza ananas', 'pizza schinken ananas',
      'tropical pizza'
    ]
  },
  {
    canonical: 'calzone',
    variants: [
      'pizza calzone', 'gefüllte pizza', 'geschlossene pizza',
      'teigtasche'
    ]
  },

  // ============================================
  // PASTA
  // ============================================
  {
    canonical: 'pasta',
    variants: ['nudeln', 'noodles', 'teigwaren', 'nudelgerichte']
  },
  {
    canonical: 'spaghetti',
    variants: ['spagetti', 'spagheti', 'spaghetty', 'lange nudeln']
  },
  {
    canonical: 'spaghetti bolognese',
    variants: [
      'bolognese', 'spag bol', 'spaghetti mit fleischsoße',
      'spaghetti hackfleisch', 'spagetti bolo', 'bolo',
      'pasta bolognese', 'nudeln bolognese'
    ]
  },
  {
    canonical: 'spaghetti carbonara',
    variants: [
      'carbonara', 'pasta carbonara', 'spagetti carbonara',
      'spaghetti mit speck', 'spaghetti mit ei'
    ]
  },
  {
    canonical: 'lasagne',
    variants: [
      'lasagna', 'nudelauflauf', 'lasanja', 'lasanje'
    ]
  },
  {
    canonical: 'penne',
    variants: [
      'penne rigate', 'röhrennudeln', 'pennenudeln'
    ]
  },
  {
    canonical: 'ravioli',
    variants: [
      'gefüllte nudeln', 'teigtaschen', 'maultaschen pasta'
    ]
  },
  {
    canonical: 'gnocchi',
    variants: [
      'kartoffelklöße', 'kartoffelnudeln', 'nocci', 'njoki'
    ]
  },

  // ============================================
  // DEUTSCHE KÜCHE (German cuisine)
  // ============================================
  {
    canonical: 'schnitzel',
    variants: [
      'schnitsl', 'cutlet', 'escalope', 'kotelett',
      'paniertes schnitzel'
    ]
  },
  {
    canonical: 'wiener schnitzel',
    variants: [
      'wienerschnitzel', 'kalb schnitzel', 'kalbsschnitzel',
      'original wiener'
    ]
  },
  {
    canonical: 'jägerschnitzel',
    variants: [
      'jaegerschnitzel', 'schnitzel mit pilzsoße',
      'schnitzel jäger art', 'pilzschnitzel'
    ]
  },
  {
    canonical: 'currywurst',
    variants: [
      'curry wurst', 'curywurst', 'wurst mit curry',
      'bratwurst curry', 'bratwurst mit currysoße'
    ]
  },
  {
    canonical: 'bratwurst',
    variants: [
      'rostbratwurst', 'grillwurst', 'wurst',
      'thüringer', 'nürnberger', 'fränkische'
    ]
  },
  {
    canonical: 'käsespätzle',
    variants: [
      'kaesespaetzle', 'spätzle mit käse', 'allgäuer käsespätzle',
      'kässpätzle', 'kassspatzen'
    ]
  },
  {
    canonical: 'spätzle',
    variants: [
      'spaetzle', 'schwäbische spätzle', 'eierspätzle',
      'knöpfle', 'nockerl'
    ]
  },
  {
    canonical: 'maultaschen',
    variants: [
      'schwäbische maultaschen', 'herrgottsbscheißerle',
      'gefüllte teigtaschen', 'mauldaschen'
    ]
  },
  {
    canonical: 'sauerbraten',
    variants: [
      'rheinischer sauerbraten', 'marinierter braten',
      'essigbraten'
    ]
  },
  {
    canonical: 'roulade',
    variants: [
      'rinderroulade', 'rindsroulade', 'fleischroulade',
      'kohlroulade', 'krautroulade'
    ]
  },
  {
    canonical: 'gulasch',
    variants: [
      'gulash', 'goulasch', 'rindergulasch',
      'ungarisches gulasch', 'szegediner'
    ]
  },
  {
    canonical: 'eisbein',
    variants: [
      'schweinshaxe', 'haxe', 'haxn', 'stelze',
      'grillhaxe', 'knusprige haxe'
    ]
  },
  {
    canonical: 'leberkäse',
    variants: [
      'leberkaese', 'fleischkäse', 'leberkäs',
      'wurstkäse', 'bayerischer leberkäse'
    ]
  },
  {
    canonical: 'weißwurst',
    variants: [
      'weisswurst', 'münchner weißwurst', 'bayerische weißwurst',
      'weisswuerscht'
    ]
  },
  {
    canonical: 'kartoffelsalat',
    variants: [
      'erdäpfelsalat', 'grumbeersalat', 'potato salad',
      'schwäbischer kartoffelsalat'
    ]
  },
  {
    canonical: 'sauerkraut',
    variants: [
      'kraut', 'weinkraut', 'bayrisch kraut',
      'fermentierter kohl'
    ]
  },
  {
    canonical: 'knödel',
    variants: [
      'knoedel', 'klöße', 'kloesse', 'semmelknödel',
      'kartoffelknödel', 'böhmische knödel'
    ]
  },
  {
    canonical: 'flammkuchen',
    variants: [
      'tarte flambée', 'elsässer flammkuchen',
      'dünner fladen', 'flammenkuchen'
    ]
  },

  // ============================================
  // SALAD
  // ============================================
  {
    canonical: 'salat',
    variants: [
      'salad', 'salade', 'insalata', 'blattsalat'
    ]
  },
  {
    canonical: 'caesar salad',
    variants: [
      'cäsar salat', 'caesar salat', 'caesarsalat',
      'ceasar salad', 'cesar salat'
    ]
  },
  {
    canonical: 'griechischer salat',
    variants: [
      'greek salad', 'bauernsalat', 'hirtensalat',
      'choriatiki', 'feta salat'
    ]
  },

  // ============================================
  // FALAFEL & MIDDLE EASTERN
  // ============================================
  {
    canonical: 'falafel',
    variants: [
      'felafel', 'falefel', 'falaffel',
      'kichererbsenbällchen', 'veggie balls'
    ]
  },
  {
    canonical: 'hummus',
    variants: [
      'humus', 'hommus', 'kichererbsenpüree',
      'hummusdip', 'houmous'
    ]
  },
  {
    canonical: 'shakshuka',
    variants: [
      'schakschuka', 'shakshouka', 'eier in tomatensoße',
      'israelisches frühstück'
    ]
  },
  {
    canonical: 'baba ganoush',
    variants: [
      'baba ghanoush', 'auberginenpüree', 'auberginendip',
      'mutabbal'
    ]
  },

  // ============================================
  // DRINKS - COFFEE
  // ============================================
  {
    canonical: 'kaffee',
    variants: [
      'coffee', 'cafe', 'caffè', 'kahve',
      'filterkaffee', 'bohnenkaffee'
    ]
  },
  {
    canonical: 'espresso',
    variants: [
      'expresso', 'esspresso', 'espreso',
      'kurzer', 'schwarzer', 'ristretto'
    ]
  },
  {
    canonical: 'cappuccino',
    variants: [
      'capuccino', 'cappucino', 'capuchino',
      'milchkaffee', 'cappucchino'
    ]
  },
  {
    canonical: 'latte macchiato',
    variants: [
      'latte', 'macchiato', 'latte machiato',
      'milchkaffee', 'lattemachiato', 'caffe latte'
    ]
  },
  {
    canonical: 'flat white',
    variants: [
      'flatwhite', 'australischer kaffee'
    ]
  },
  {
    canonical: 'americano',
    variants: [
      'cafe americano', 'caffè americano',
      'verlängerter', 'kaffee schwarz'
    ]
  },

  // ============================================
  // DRINKS - TEA
  // ============================================
  {
    canonical: 'tee',
    variants: [
      'tea', 'thé', 'chai', 'çay'
    ]
  },
  {
    canonical: 'chai latte',
    variants: [
      'chai tea latte', 'gewürztee mit milch',
      'masala chai', 'chai'
    ]
  },
  {
    canonical: 'matcha',
    variants: [
      'matcha latte', 'matcha tee', 'grüntee pulver',
      'japanischer grüntee'
    ]
  },

  // ============================================
  // DRINKS - SOFT DRINKS
  // ============================================
  {
    canonical: 'cola',
    variants: [
      'coke', 'coca cola', 'pepsi', 'kolagetränk',
      'coca-cola', 'fritz-kola'
    ]
  },
  {
    canonical: 'fanta',
    variants: [
      'orange', 'orangenlimo', 'orangenlimonade',
      'orange soda', 'orangen limonade'
    ]
  },
  {
    canonical: 'sprite',
    variants: [
      'zitronenlimo', 'lemon lime', '7up', 'seven up',
      'zitronen limonade'
    ]
  },
  {
    canonical: 'wasser',
    variants: [
      'water', 'mineralwasser', 'sprudel',
      'stilles wasser', 'tafelwasser', 'selters'
    ]
  },
  {
    canonical: 'apfelschorle',
    variants: [
      'apple spritzer', 'apfelsaftschorle',
      'apfelschorl', 'schorle'
    ]
  },
  {
    canonical: 'eistee',
    variants: [
      'ice tea', 'iced tea', 'icetea',
      'kalter tee', 'nestea'
    ]
  },

  // ============================================
  // DRINKS - BEER
  // ============================================
  {
    canonical: 'bier',
    variants: [
      'beer', 'pils', 'pilsner', 'lager',
      'helles', 'export', 'cerveza', 'birra'
    ]
  },
  {
    canonical: 'weißbier',
    variants: [
      'weissbier', 'weizen', 'weizenbier',
      'hefeweizen', 'wheat beer', 'hefe'
    ]
  },
  {
    canonical: 'radler',
    variants: [
      'alsterwasser', 'shandy', 'biermischgetränk',
      'radlmaß', 'russ'
    ]
  },

  // ============================================
  // DRINKS - WINE & COCKTAILS
  // ============================================
  {
    canonical: 'wein',
    variants: [
      'wine', 'vino', 'vin'
    ]
  },
  {
    canonical: 'rotwein',
    variants: [
      'red wine', 'vino rosso', 'vin rouge',
      'tinto', 'rot'
    ]
  },
  {
    canonical: 'weißwein',
    variants: [
      'weisswein', 'white wine', 'vino bianco',
      'vin blanc', 'weiß'
    ]
  },
  {
    canonical: 'cocktail',
    variants: [
      'cocktails', 'mixed drink', 'longdrink'
    ]
  },
  {
    canonical: 'mojito',
    variants: [
      'mohito', 'virgin mojito'
    ]
  },
  {
    canonical: 'aperol spritz',
    variants: [
      'aperol', 'spritz', 'aperolspritz',
      'veneziano'
    ]
  },
  {
    canonical: 'hugo',
    variants: [
      'hugo spritz', 'holunderblüten cocktail'
    ]
  },

  // ============================================
  // ASIAN FOOD
  // ============================================
  {
    canonical: 'sushi',
    variants: ['susi', 'suschi', 'japanese rolls']
  },
  {
    canonical: 'maki',
    variants: ['maki roll', 'makizushi', 'sushi rolle']
  },
  {
    canonical: 'nigiri',
    variants: ['nigiri sushi', 'hand sushi']
  },
  {
    canonical: 'ramen',
    variants: [
      'ramennudeln', 'ramen noodles', 'nudelsuppe',
      'japanische nudelsuppe'
    ]
  },
  {
    canonical: 'pho',
    variants: [
      'pho bo', 'pho ga', 'vietnamesische suppe',
      'pho suppe', 'reisnudelsuppe'
    ]
  },
  {
    canonical: 'pad thai',
    variants: [
      'padthai', 'pad tai', 'thailändische nudeln',
      'gebratene reisnudeln'
    ]
  },
  {
    canonical: 'fried rice',
    variants: [
      'gebratener reis', 'reis gebraten', 'bratreis',
      'chinesischer reis', 'asia reis', 'nasi goreng'
    ]
  },
  {
    canonical: 'curry',
    variants: [
      'thai curry', 'indisches curry', 'japanisches curry'
    ]
  },
  {
    canonical: 'green curry',
    variants: [
      'grünes curry', 'thai green curry', 'gaeng keow wan'
    ]
  },
  {
    canonical: 'red curry',
    variants: [
      'rotes curry', 'thai red curry', 'gaeng phed'
    ]
  },
  {
    canonical: 'dim sum',
    variants: [
      'dimsum', 'chinesische teigtaschen', 'yum cha'
    ]
  },
  {
    canonical: 'gyoza',
    variants: [
      'jiaozi', 'potstickers', 'japanische teigtaschen',
      'dumplings'
    ]
  },
  {
    canonical: 'spring rolls',
    variants: [
      'frühlingsrollen', 'frühlingsrolle', 'spring roll',
      'sommerrollen', 'vietnamese rolls'
    ]
  },
  {
    canonical: 'bao',
    variants: [
      'bao bun', 'gua bao', 'steamed bun',
      'dampfbrötchen', 'gefüllte buns'
    ]
  },
  {
    canonical: 'bibimbap',
    variants: [
      'bibimbab', 'koreanische reisschale',
      'korean rice bowl'
    ]
  },
  {
    canonical: 'kimchi',
    variants: [
      'kimchee', 'koreanisches sauerkraut',
      'fermentierter kohl korean'
    ]
  },
  {
    canonical: 'bulgogi',
    variants: [
      'koreanisches bbq', 'korean bbq beef',
      'gegrilltes rindfleisch koreanisch'
    ]
  },

  // ============================================
  // INDIAN FOOD
  // ============================================
  {
    canonical: 'butter chicken',
    variants: [
      'murgh makhani', 'chicken makhani',
      'hähnchen in buttersoße'
    ]
  },
  {
    canonical: 'tikka masala',
    variants: [
      'chicken tikka masala', 'tikka',
      'masala hähnchen'
    ]
  },
  {
    canonical: 'biryani',
    variants: [
      'biriyani', 'bryani', 'indischer gewürzreis',
      'chicken biryani', 'lamb biryani'
    ]
  },
  {
    canonical: 'tandoori',
    variants: [
      'tandoori chicken', 'tanduri',
      'aus dem lehmofen', 'chicken tandoori'
    ]
  },
  {
    canonical: 'naan',
    variants: [
      'naan brot', 'nan', 'indisches fladenbrot',
      'butter naan', 'garlic naan'
    ]
  },
  {
    canonical: 'samosa',
    variants: [
      'samosas', 'indische teigtaschen',
      'gemüse samosa', 'vegetable samosa'
    ]
  },
  {
    canonical: 'dal',
    variants: [
      'dhal', 'daal', 'linsen dal',
      'indische linsen', 'dal makhani'
    ]
  },
  {
    canonical: 'paneer',
    variants: [
      'panir', 'indischer frischkäse',
      'palak paneer', 'paneer tikka'
    ]
  },
  {
    canonical: 'korma',
    variants: [
      'chicken korma', 'lamb korma',
      'milde currysoße'
    ]
  },
  {
    canonical: 'vindaloo',
    variants: [
      'vindalho', 'scharfes curry',
      'chicken vindaloo'
    ]
  },

  // ============================================
  // MEXICAN FOOD
  // ============================================
  {
    canonical: 'tacos',
    variants: [
      'taco', 'mexikanische tacos', 'soft tacos',
      'hard shell tacos'
    ]
  },
  {
    canonical: 'burrito',
    variants: [
      'burritos', 'mexikanischer wrap',
      'burrito bowl'
    ]
  },
  {
    canonical: 'quesadilla',
    variants: [
      'quesadillas', 'käse tortilla',
      'gefüllte tortilla'
    ]
  },
  {
    canonical: 'nachos',
    variants: [
      'tortilla chips', 'loaded nachos',
      'nachos überbacken'
    ]
  },
  {
    canonical: 'guacamole',
    variants: [
      'guac', 'avocado dip', 'avocadocreme'
    ]
  },
  {
    canonical: 'enchiladas',
    variants: [
      'enchilada', 'überbackene tortillas'
    ]
  },
  {
    canonical: 'fajitas',
    variants: [
      'fajita', 'tex mex fajitas'
    ]
  },
  {
    canonical: 'chili con carne',
    variants: [
      'chili', 'chilli con carne', 'con carne',
      'texmex chili'
    ]
  },

  // ============================================
  // GREEK FOOD
  // ============================================
  {
    canonical: 'gyros',
    variants: [
      'gyro', 'griechischer döner', 'schweinefleisch gyros'
    ]
  },
  {
    canonical: 'souvlaki',
    variants: [
      'souvlakia', 'griechische spieße',
      'fleischspieß griechisch'
    ]
  },
  {
    canonical: 'moussaka',
    variants: [
      'musaka', 'griechischer auflauf',
      'auberginen auflauf'
    ]
  },
  {
    canonical: 'tzatziki',
    variants: [
      'zaziki', 'tsatsiki', 'joghurt gurken dip',
      'cacik'
    ]
  },

  // ============================================
  // DESSERTS
  // ============================================
  {
    canonical: 'tiramisu',
    variants: ['tiramisù', 'tiramisu dessert', 'italienisches dessert']
  },
  {
    canonical: 'kuchen',
    variants: ['cake', 'torte', 'gebäck']
  },
  {
    canonical: 'eis',
    variants: [
      'eiscreme', 'ice cream', 'gelato', 'speiseeis',
      'kugel eis', 'softeis'
    ]
  },
  {
    canonical: 'schokolade',
    variants: [
      'schoko', 'chocolate', 'chocolat', 'cioccolato',
      'kakao', 'schocko'
    ]
  },
  {
    canonical: 'cheesecake',
    variants: [
      'käsekuchen', 'cheese cake', 'new york cheesecake',
      'kaesekuchen'
    ]
  },
  {
    canonical: 'brownie',
    variants: [
      'schoko brownie', 'chocolate brownie',
      'fudge brownie'
    ]
  },
  {
    canonical: 'panna cotta',
    variants: [
      'pannacotta', 'sahne pudding italien'
    ]
  },
  {
    canonical: 'crème brûlée',
    variants: [
      'creme brulee', 'crema catalana',
      'karamellisierte creme'
    ]
  },
  {
    canonical: 'mousse au chocolat',
    variants: [
      'schokomousse', 'chocolate mousse',
      'mousse', 'schokocreme'
    ]
  },
  {
    canonical: 'apfelstrudel',
    variants: [
      'apple strudel', 'strudel',
      'wiener apfelstrudel'
    ]
  },
  {
    canonical: 'baklava',
    variants: [
      'baklawa', 'türkisches gebäck',
      'griechisches gebäck'
    ]
  },

  // ============================================
  // BREAKFAST
  // ============================================
  {
    canonical: 'croissant',
    variants: [
      'crossaint', 'croasant', 'kruwassong',
      'hörnchen', 'buttercroissant', 'gipfeli'
    ]
  },
  {
    canonical: 'müsli',
    variants: [
      'muesli', 'musli', 'granola', 'haferflocken',
      'cereal', 'frühstücksflocken', 'bircher müsli'
    ]
  },
  {
    canonical: 'rührei',
    variants: [
      'scrambled eggs', 'gerührte eier',
      'eierspeise', 'rühr-ei'
    ]
  },
  {
    canonical: 'spiegelei',
    variants: [
      'fried egg', 'sunny side up',
      'setzei', 'ochsenauge'
    ]
  },
  {
    canonical: 'omelette',
    variants: [
      'omelett', 'omlett', 'omeletts',
      'eieromelette'
    ]
  },
  {
    canonical: 'eggs benedict',
    variants: [
      'eier benedict', 'pochierte eier',
      'eggs florentine', 'eggs royale'
    ]
  },
  {
    canonical: 'avocado toast',
    variants: [
      'avocado brot', 'avo toast',
      'avocado auf brot'
    ]
  },
  {
    canonical: 'acai bowl',
    variants: [
      'açai bowl', 'acai schale',
      'smoothie bowl', 'açaí bowl'
    ]
  },

  // ============================================
  // SOUPS
  // ============================================
  {
    canonical: 'suppe',
    variants: [
      'soup', 'soupe', 'zuppa', 'brühe'
    ]
  },
  {
    canonical: 'tomatensuppe',
    variants: [
      'tomato soup', 'tomaten suppe',
      'pomodoro suppe'
    ]
  },
  {
    canonical: 'kürbissuppe',
    variants: [
      'pumpkin soup', 'hokkaido suppe',
      'kürbis suppe', 'butternut suppe'
    ]
  },
  {
    canonical: 'hühnersuppe',
    variants: [
      'chicken soup', 'hühnerbouillon',
      'hühner suppe', 'kraft suppe'
    ]
  },
  {
    canonical: 'linsensuppe',
    variants: [
      'lentil soup', 'mercimek', 'linsen suppe',
      'dal suppe'
    ]
  },
  {
    canonical: 'minestrone',
    variants: [
      'italienische gemüsesuppe',
      'gemüse minestrone'
    ]
  },

  // ============================================
  // FISH & SEAFOOD
  // ============================================
  {
    canonical: 'lachs',
    variants: [
      'salmon', 'lachsfilet', 'räucherlachs',
      'graved lachs', 'sake'
    ]
  },
  {
    canonical: 'thunfisch',
    variants: [
      'tuna', 'tunfisch', 'thunfisch filet',
      'ahi tuna'
    ]
  },
  {
    canonical: 'garnelen',
    variants: [
      'shrimp', 'shrimps', 'prawns',
      'gambas', 'scampi', 'krevetten'
    ]
  },
  {
    canonical: 'calamari',
    variants: [
      'tintenfisch', 'squid', 'calamare',
      'fritti di calamari'
    ]
  },
  {
    canonical: 'fish and chips',
    variants: [
      'fish & chips', 'backfisch mit pommes',
      'fisch und pommes'
    ]
  },

  // ============================================
  // VEGETARIAN/VEGAN TERMS
  // ============================================
  {
    canonical: 'vegetarisch',
    variants: [
      'veggie', 'vegetarian', 'fleischlos',
      'ohne fleisch', 'meatless'
    ]
  },
  {
    canonical: 'vegan',
    variants: [
      'pflanzlich', 'plant based', 'rein pflanzlich',
      'ohne tierische produkte', 'plantbased'
    ]
  },
  {
    canonical: 'tofu',
    variants: [
      'soja tofu', 'seidentofu', 'räuchertofu',
      'bean curd'
    ]
  },
  {
    canonical: 'tempeh',
    variants: [
      'tempé', 'fermentierter soja'
    ]
  },
  {
    canonical: 'seitan',
    variants: [
      'weizenfleisch', 'weizenprotein'
    ]
  },
  {
    canonical: 'buddha bowl',
    variants: [
      'power bowl', 'veggie bowl', 'health bowl',
      'grain bowl', 'nourish bowl'
    ]
  },
];

// ============================================
// COOKING METHODS - for context-aware matching
// ============================================
export const COOKING_METHODS: Record<string, string[]> = {
  'gegrillt': ['grill', 'grilled', 'bbq', 'vom grill', 'holzkohle', 'charcoal'],
  'gebraten': ['braten', 'fried', 'pan fried', 'angebraten', 'sautiert', 'sauteed'],
  'frittiert': ['frittiert', 'deep fried', 'ausgebacken', 'knusprig', 'crispy'],
  'gebacken': ['gebacken', 'baked', 'aus dem ofen', 'überbacken', 'gratiniert'],
  'gekocht': ['gekocht', 'boiled', 'gesotten', 'gedämpft', 'steamed'],
  'roh': ['roh', 'raw', 'tartare', 'carpaccio', 'sashimi'],
  'mariniert': ['mariniert', 'marinated', 'eingelegt', 'gebeizt'],
  'geräuchert': ['geräuchert', 'smoked', 'rauch', 'smoky'],
  'geschmort': ['geschmort', 'braised', 'slow cooked', 'langsam gegart'],
};

// ============================================
// SIZE MODIFIERS - to be ignored in matching
// ============================================
export const SIZE_MODIFIERS: string[] = [
  'klein', 'small', 'mini', 'junior',
  'mittel', 'medium', 'normal', 'regular',
  'groß', 'gross', 'large', 'big', 'maxi', 'xl', 'xxl', 'jumbo',
  'extra', 'doppelt', 'double', 'triple',
  'portion', 'halbe', 'half', 'ganze', 'whole',
  '0,2l', '0,3l', '0,4l', '0,5l', '1l'
];

// ============================================
// MAIN INGREDIENTS - for ingredient-based matching
// ============================================
export const MAIN_INGREDIENTS: Record<string, string[]> = {
  // Proteins
  'hähnchen': ['chicken', 'huhn', 'hühnchen', 'geflügel', 'hendl', 'poulet', 'tavuk'],
  'rind': ['beef', 'rindfleisch', 'steak', 'entrecote', 'ribeye', 'filet'],
  'schwein': ['pork', 'schweinefleisch', 'schweinebraten', 'schnitzel'],
  'lamm': ['lamb', 'lammfleisch', 'lammkeule', 'lammkotelette'],
  'lachs': ['salmon', 'lachsfilet', 'räucherlachs'],
  'thunfisch': ['tuna', 'tunfisch', 'ahi'],
  'garnelen': ['shrimp', 'prawns', 'gambas', 'scampi'],
  'tofu': ['soja', 'bean curd'],

  // Vegetables
  'tomate': ['tomato', 'pomodoro', 'tomaten'],
  'pilze': ['mushroom', 'champignon', 'pfifferling', 'steinpilz', 'funghi'],
  'spinat': ['spinach', 'blattspinat'],
  'paprika': ['pepper', 'bell pepper', 'peperoni'],
  'zwiebel': ['onion', 'zwiebeln', 'schalotte'],
  'knoblauch': ['garlic', 'aglio', 'ajo'],
  'avocado': ['avo', 'guacamole'],
  'aubergine': ['eggplant', 'melanzane'],
  'zucchini': ['courgette', 'zuchini'],
  'kürbis': ['pumpkin', 'butternut', 'hokkaido'],

  // Cheese
  'mozzarella': ['mozarella', 'büffelmozzarella'],
  'parmesan': ['parmigiano', 'grana'],
  'feta': ['schafskäse', 'hirtenkäse'],
  'cheddar': ['chedar'],
  'gouda': ['edamer'],

  // Carbs
  'reis': ['rice', 'basmati', 'jasmin'],
  'nudeln': ['pasta', 'noodles', 'spaghetti', 'penne'],
  'kartoffel': ['potato', 'pommes', 'erdäpfel'],
  'brot': ['bread', 'toast', 'brötchen'],
};

/**
 * Find all synonyms for a given term
 */
export function getSynonyms(term: string): string[] {
  const normalizedTerm = term.toLowerCase().trim();

  for (const group of FOOD_SYNONYMS) {
    // Check if term matches canonical or any variant
    if (
      group.canonical.toLowerCase() === normalizedTerm ||
      group.variants.some(v => v.toLowerCase() === normalizedTerm)
    ) {
      // Return all terms (canonical + variants)
      return [group.canonical, ...group.variants];
    }
  }

  return [term]; // No synonyms found, return original
}

/**
 * Check if two terms are synonyms
 */
export function areSynonyms(term1: string, term2: string): boolean {
  const synonyms1 = getSynonyms(term1);
  const synonyms2 = getSynonyms(term2);

  // Check if there's any overlap
  return synonyms1.some(s1 =>
    synonyms2.some(s2 => s1.toLowerCase() === s2.toLowerCase())
  );
}

/**
 * Remove size modifiers from a dish name
 */
export function removeSizeModifiers(dishName: string): string {
  let result = dishName.toLowerCase();
  for (const modifier of SIZE_MODIFIERS) {
    // Remove modifier with optional surrounding whitespace
    result = result.replace(new RegExp(`\\b${modifier}\\b`, 'gi'), '').trim();
  }
  // Clean up multiple spaces
  return result.replace(/\s+/g, ' ').trim();
}

/**
 * Extract cooking method from dish name
 */
export function extractCookingMethod(dishName: string): string | null {
  const nameLower = dishName.toLowerCase();

  for (const [method, variants] of Object.entries(COOKING_METHODS)) {
    if (variants.some(v => nameLower.includes(v))) {
      return method;
    }
  }

  return null;
}

/**
 * Extract main ingredient from dish name
 */
export function extractMainIngredient(dishName: string): string | null {
  const nameLower = dishName.toLowerCase();

  for (const [ingredient, variants] of Object.entries(MAIN_INGREDIENTS)) {
    if (nameLower.includes(ingredient) || variants.some(v => nameLower.includes(v))) {
      return ingredient;
    }
  }

  return null;
}

/**
 * Split German compound words (basic implementation)
 * E.g., "Schweinebraten" → ["Schweine", "braten"]
 */
export function splitCompoundWord(word: string): string[] {
  const result: string[] = [word];

  // Common German word endings that indicate compound words
  const suffixes = [
    'braten', 'schnitzel', 'salat', 'suppe', 'kuchen', 'brot',
    'fleisch', 'steak', 'filet', 'wurst', 'käse', 'soße', 'sauce',
    'burger', 'pizza', 'teller', 'bowl', 'platte', 'spieß'
  ];

  const wordLower = word.toLowerCase();

  for (const suffix of suffixes) {
    if (wordLower.endsWith(suffix) && wordLower.length > suffix.length + 2) {
      const prefix = word.substring(0, word.length - suffix.length);
      result.push(prefix, suffix);
      break;
    }
  }

  return result;
}

/**
 * Expand search terms with synonyms
 */
export function expandWithSynonyms(searchTerm: string): string[] {
  // First remove size modifiers
  const cleanedTerm = removeSizeModifiers(searchTerm);
  const words = cleanedTerm.split(' ');
  const expandedSets: string[][] = [];

  // Get synonyms for each word
  for (const word of words) {
    const synonyms = getSynonyms(word);

    // Also try compound word splitting
    const compounds = splitCompoundWord(word);
    if (compounds.length > 1) {
      for (const part of compounds) {
        const partSynonyms = getSynonyms(part);
        synonyms.push(...partSynonyms);
      }
    }

    expandedSets.push(Array.from(new Set(synonyms)));
  }

  // If only one word, return all synonyms
  if (expandedSets.length === 1) {
    return expandedSets[0];
  }

  // For multi-word terms, create combinations
  const combinations: string[] = [];

  function generateCombinations(index: number, current: string[]) {
    if (index === expandedSets.length) {
      combinations.push(current.join(' '));
      return;
    }

    for (const synonym of expandedSets[index]) {
      generateCombinations(index + 1, [...current, synonym]);
    }
  }

  generateCombinations(0, []);

  // Limit combinations to avoid explosion
  return combinations.slice(0, 50);
}

/**
 * Enhanced synonym matching with ingredient awareness
 */
export function getEnhancedMatches(dishName: string): {
  synonyms: string[];
  mainIngredient: string | null;
  cookingMethod: string | null;
  cleanedName: string;
} {
  const cleanedName = removeSizeModifiers(dishName);
  const synonyms = expandWithSynonyms(cleanedName);
  const mainIngredient = extractMainIngredient(cleanedName);
  const cookingMethod = extractCookingMethod(cleanedName);

  return {
    synonyms,
    mainIngredient,
    cookingMethod,
    cleanedName
  };
}
