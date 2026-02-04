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
      'doner', 'doener', 'donner', 'dönar', 'donar', 'dönner', 'donör',
      'kebab', 'kebap', 'kepap', 'kabab', 'kabob', 'kebob',
      'shawarma', 'schawarma', 'shawerma', 'schawurma',
      'gyros döner', 'türkischer döner', 'döners',
      'fleisch döner', 'kalb döner', 'lamm döner', 'hühnerdöner',
      'dönerfleisch', 'döner fleisch', 'kebabfleisch'
    ]
  },
  {
    canonical: 'dürüm',
    variants: [
      'durum', 'dürum', 'duruem', 'durüm', 'dueruem', 'dürums',
      'wrap', 'wraps', 'yufka', 'lavash', 'rolle', 'rollen',
      'döner wrap', 'türkischer wrap', 'yufka döner',
      'dürüm döner', 'döner dürüm', 'dürümrolle'
    ]
  },
  {
    canonical: 'lahmacun',
    variants: [
      'lahmajun', 'lahmajo', 'lahmaçun', 'lamacun', 'lahmadschu',
      'türkische pizza', 'arabische pizza', 'fleischfladen',
      'lahmacuns', 'armenische pizza'
    ]
  },
  {
    canonical: 'pide',
    variants: [
      'türkisches fladenbrot', 'türkische pizza', 'pides',
      'pita', 'pidé', 'türkisches boot', 'fladenbrot',
      'türkisches brot', 'pide brot'
    ]
  },
  {
    canonical: 'köfte',
    variants: [
      'koefte', 'kofte', 'köftesi', 'kofta', 'köftes', 'koftas',
      'fleischbällchen', 'hackbällchen', 'türkische frikadellen',
      'inegöl köfte', 'izgara köfte', 'köftespieß',
      'türkische buletten', 'cevapcici', 'cevapi'
    ]
  },
  {
    canonical: 'iskender',
    variants: [
      'iskender kebab', 'iskender kebap', 'alexander kebab',
      'döner mit joghurt', 'joghurt döner', 'iskender teller'
    ]
  },
  {
    canonical: 'adana',
    variants: [
      'adana kebab', 'adana kebap', 'adana spiess', 'adana spieß',
      'hackfleisch spiess', 'scharfer kebab', 'adana köfte',
      'urfa kebab', 'urfa kebap'
    ]
  },
  {
    canonical: 'börek',
    variants: [
      'borek', 'boerek', 'böreks', 'boreks', 'sigara börek',
      'su börek', 'tepsi börek', 'blätterteig türkisch',
      'börekchen', 'sigara', 'zigarrenbörek'
    ]
  },
  {
    canonical: 'gözleme',
    variants: [
      'gozleme', 'goezleme', 'gözlemes', 'türkischer pfannkuchen',
      'türkische pfannkuchen', 'yufka pfannkuchen'
    ]
  },
  {
    canonical: 'çorba',
    variants: [
      'corba', 'chorba', 'türkische suppe', 'mercimek çorba',
      'mercimek', 'linsensuppe türkisch'
    ]
  },

  // ============================================
  // POMMES FRITES (Regional variants!)
  // ============================================
  {
    canonical: 'pommes',
    variants: [
      'pommes frites', 'fritten', 'friten', 'frites', 'frittes',
      'french fries', 'fries', 'chips', 'kartoffelstäbchen',
      'pommfrit', 'pommfritz', 'pomm', 'pom', 'pomes', 'poms',
      'fritjes', 'patat', 'frietjes', 'kartoffelfritten',
      'goldene pommes', 'knusprige fritten'
    ]
  },
  {
    canonical: 'süßkartoffel pommes',
    variants: [
      'sweet potato fries', 'süsskartoffel pommes', 'süßkartoffeln',
      'süßkartoffelfritten', 'süsskartoffelpommes', 'batata pommes',
      'süßkartoffel fritten', 'sweet potato fritten'
    ]
  },

  // ============================================
  // CHICKEN / HÄHNCHEN (Many regional German variants!)
  // ============================================
  {
    canonical: 'hähnchen',
    variants: [
      'haehnchen', 'hahnchen', 'hendl', 'hendel', 'broiler',
      'chicken', 'poulet', 'pollo', 'tavuk', 'polletto',
      'grillhähnchen', 'brathähnchen', 'huhn', 'hühner',
      'hühnchen', 'huehnchen', 'geflügel', 'gefluegel',
      'brathendl', 'backhendl', 'gockel', 'göckele', 'gickel',
      'hähnchenfleisch', 'hühnerfleisch', 'hähnchenkeule',
      'chickenfilet', 'hähnchenfilet', 'hähnchenbrust'
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
  // BURGER - EXPANDED
  // ============================================
  {
    canonical: 'burger',
    variants: [
      'hamburger', 'hamburguer', 'burgers', 'beefburger', 'beef burger',
      'hackfleisch brötchen', 'bulette im brot', 'patty', 'burger classic',
      'klassischer burger', 'american burger', 'amerikanischer burger',
      'single burger', 'einfacher burger', 'rindsburger'
    ]
  },
  {
    canonical: 'cheeseburger',
    variants: [
      'cheese burger', 'cheseburger', 'cheesburger', 'cheezburger',
      'käseburger', 'kaeseburger', 'burger mit käse', 'käse burger',
      'käse-burger', 'double cheese', 'doppelt käse'
    ]
  },
  {
    canonical: 'chicken burger',
    variants: [
      'chickenburger', 'hähnchen burger', 'hähnchenburger', 'hühnchen burger',
      'crispy chicken burger', 'chicken sandwich', 'poulet burger',
      'huhn burger', 'geflügel burger'
    ]
  },
  {
    canonical: 'bacon burger',
    variants: [
      'baconburger', 'bacon cheeseburger', 'speck burger', 'speckburger',
      'burger mit bacon', 'burger mit speck', 'bbq bacon burger'
    ]
  },
  {
    canonical: 'double burger',
    variants: [
      'doubleburger', 'doppelburger', 'doppel burger', 'double patty',
      'xxl burger', 'xl burger', 'big burger', 'mega burger', 'jumbo burger'
    ]
  },
  {
    canonical: 'veggie burger',
    variants: [
      'veggieburger', 'vegetarischer burger', 'vegetarisch burger',
      'vegan burger', 'veganburger', 'gemüseburger', 'gemüse burger',
      'beyond burger', 'impossible burger', 'plant based burger',
      'pflanzlicher burger', 'fleischlos burger'
    ]
  },
  {
    canonical: 'fish burger',
    variants: [
      'fishburger', 'fisch burger', 'fischburger', 'backfisch burger',
      'fish sandwich', 'filet o fish', 'fisch sandwich'
    ]
  },
  {
    canonical: 'pulled pork burger',
    variants: [
      'pulled pork', 'pulledpork burger', 'pulled-pork burger',
      'bbq burger', 'bbq pulled pork', 'geschmortes schwein burger'
    ]
  },

  // ============================================
  // PIZZA - EXPANDED
  // ============================================
  {
    canonical: 'pizza',
    variants: [
      'piza', 'pitza', 'piizza', 'pizze', 'pizzas', 'pizzen',
      'italian pizza', 'italienische pizza', 'fladen',
      'steinofen pizza', 'holzofen pizza', 'ofenpizza'
    ]
  },
  {
    canonical: 'pizza margherita',
    variants: [
      'margherita', 'margerita', 'margaritta', 'margarita',
      'pizza margarita', 'pizza margaretha', 'pizza margerita',
      'pizza mozzarella', 'käsepizza', 'tomaten mozzarella pizza',
      'pizza mit käse', 'nur käse pizza', 'cheese pizza'
    ]
  },
  {
    canonical: 'pizza salami',
    variants: [
      'salamipizza', 'salami pizza', 'pizza mit salami',
      'pizza pepperoni', 'pepperoni pizza', 'peperoni pizza',
      'pizza diavola', 'diavola', 'scharfe pizza', 'pikante pizza'
    ]
  },
  {
    canonical: 'pizza hawaii',
    variants: [
      'hawaii pizza', 'hawaii', 'hawai pizza', 'hawaiipizza',
      'pizza ananas', 'pizza mit ananas', 'pizza schinken ananas',
      'tropical pizza', 'pizza mit schinken und ananas'
    ]
  },
  {
    canonical: 'pizza tonno',
    variants: [
      'tonno', 'thunfischpizza', 'thunfisch pizza', 'pizza thunfisch',
      'pizza tuna', 'tuna pizza', 'pizza mit thunfisch'
    ]
  },
  {
    canonical: 'pizza quattro stagioni',
    variants: [
      'quattro stagioni', '4 stagioni', 'vier jahreszeiten',
      'pizza vier jahreszeiten', 'pizza 4 stagioni'
    ]
  },
  {
    canonical: 'pizza quattro formaggi',
    variants: [
      'quattro formaggi', '4 formaggi', 'vier käse', '4 käse',
      'pizza vier käse', 'pizza 4 käse', 'vierkäsepizza',
      'käse pizza', 'pizza mit vier käse'
    ]
  },
  {
    canonical: 'pizza funghi',
    variants: [
      'funghi', 'funghi pizza', 'pilzpizza', 'pilz pizza',
      'pizza pilze', 'pizza mit pilzen', 'champignon pizza',
      'pizza mit champignons'
    ]
  },
  {
    canonical: 'pizza prosciutto',
    variants: [
      'prosciutto', 'schinken pizza', 'schinkenpizza',
      'pizza schinken', 'pizza mit schinken', 'ham pizza',
      'prosciutto e funghi'
    ]
  },
  {
    canonical: 'pizza spinaci',
    variants: [
      'spinaci', 'spinat pizza', 'spinatpizza', 'pizza spinat',
      'pizza mit spinat', 'popeye pizza', 'spinat feta pizza'
    ]
  },
  {
    canonical: 'calzone',
    variants: [
      'pizza calzone', 'calzon', 'calzzone', 'gefüllte pizza',
      'geschlossene pizza', 'teigtasche', 'pizza tasche',
      'klappizza', 'halbmondpizza'
    ]
  },

  // ============================================
  // PASTA - EXPANDED
  // ============================================
  {
    canonical: 'pasta',
    variants: [
      'nudeln', 'nudel', 'noodles', 'teigwaren', 'nudelgerichte',
      'pasta gericht', 'italian pasta', 'italienische pasta'
    ]
  },
  {
    canonical: 'spaghetti',
    variants: [
      'spagetti', 'spagheti', 'spaghetty', 'spageti', 'spghetti',
      'lange nudeln', 'spaghettis'
    ]
  },
  {
    canonical: 'spaghetti bolognese',
    variants: [
      'bolognese', 'bolo', 'bolonese', 'bolognaise', 'bolognäse',
      'spag bol', 'spaghetti mit fleischsoße', 'spaghetti fleischsauce',
      'spaghetti hackfleisch', 'spagetti bolo', 'spagetti bolognese',
      'pasta bolognese', 'nudeln bolognese', 'ragu', 'ragù'
    ]
  },
  {
    canonical: 'spaghetti carbonara',
    variants: [
      'carbonara', 'carbonarra', 'carbonera', 'carbonnara',
      'pasta carbonara', 'spagetti carbonara', 'nudeln carbonara',
      'spaghetti mit speck', 'spaghetti mit ei', 'spaghetti ei speck',
      'carbonara sauce', 'alla carbonara'
    ]
  },
  {
    canonical: 'penne arrabiata',
    variants: [
      'arrabiata', 'arrabbiata', 'arabbiata', 'arrabiatta',
      'penne arrabbiata', 'pasta arrabiata', 'nudeln arrabiata',
      'penne scharf', 'scharfe penne', 'penne pikant'
    ]
  },
  {
    canonical: 'lasagne',
    variants: [
      'lasagna', 'lasange', 'lasanja', 'lasanje', 'lasagnen',
      'nudelauflauf', 'pasta auflauf', 'italienischer auflauf',
      'lasagne bolognese', 'lasagne al forno', 'klassische lasagne'
    ]
  },
  {
    canonical: 'penne',
    variants: [
      'penne rigate', 'röhrennudeln', 'pennenudeln', 'pene',
      'pennepasta', 'penne pasta'
    ]
  },
  {
    canonical: 'tagliatelle',
    variants: [
      'tagliatele', 'tagliattelle', 'tagliatellen', 'bandnudeln',
      'fettuccine', 'fettucine', 'fettuccini'
    ]
  },
  {
    canonical: 'rigatoni',
    variants: [
      'rigatone', 'röhrchen', 'große röhren', 'röhrennudeln groß'
    ]
  },
  {
    canonical: 'tortellini',
    variants: [
      'tortelini', 'tortelloni', 'tortellini pasta', 'gefüllte nudeln',
      'tortellini mit sahne', 'tortellini panna'
    ]
  },
  {
    canonical: 'aglio e olio',
    variants: [
      'aglio olio', 'alio olio', 'aglio e olio', 'knoblauchpasta',
      'spaghetti aglio olio', 'pasta knoblauch öl'
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
  // DEUTSCHE KÜCHE (German cuisine) - EXPANDED
  // ============================================
  {
    canonical: 'schnitzel',
    variants: [
      'schnitsl', 'schnizel', 'snitzel', 'cutlet', 'escalope',
      'kotelett', 'paniertes schnitzel', 'paniertes',
      'schnitzl', 'schnitzelchen', 'schnitzeli',
      'schweineschnitzel', 'hähnchenschnitzel', 'putenschnitzel'
    ]
  },
  {
    canonical: 'wiener schnitzel',
    variants: [
      'wienerschnitzel', 'kalb schnitzel', 'kalbsschnitzel',
      'original wiener', 'wiener art', 'nach wiener art',
      'wiener schnitzel vom kalb', 'wienerschnitzl'
    ]
  },
  {
    canonical: 'jägerschnitzel',
    variants: [
      'jaegerschnitzel', 'jäger schnitzel', 'schnitzel mit pilzsoße',
      'schnitzel jäger art', 'pilzschnitzel', 'jäger art',
      'schnitzel mit champignons', 'rahm schnitzel'
    ]
  },
  {
    canonical: 'zigeunerschnitzel',
    variants: [
      'zigeuner schnitzel', 'paprikaschnitzel', 'schnitzel balkan',
      'schnitzel mit paprikasoße', 'balkan schnitzel'
    ]
  },
  {
    canonical: 'cordon bleu',
    variants: [
      'cordonbleu', 'cordon blue', 'gordon bleu', 'gordon blue',
      'schnitzel gefüllt', 'gefülltes schnitzel',
      'schnitzel mit schinken käse', 'schweinecordonbleu'
    ]
  },
  {
    canonical: 'currywurst',
    variants: [
      'curry wurst', 'curywurst', 'curiwurst', 'curyworst',
      'wurst mit curry', 'bratwurst curry', 'bratwurst mit currysoße',
      'currywurstpommes', 'currywurst mit pommes'
    ]
  },
  {
    canonical: 'bratwurst',
    variants: [
      'rostbratwurst', 'grillwurst', 'wurst', 'würstchen', 'wurstel',
      'thüringer', 'thüringer bratwurst', 'nürnberger', 'nürnberger würstchen',
      'fränkische', 'fränkische bratwurst', 'coburger', 'bockwurst',
      'weißwurst', 'weisswurst', 'knacker', 'wiener würstchen'
    ]
  },
  {
    canonical: 'käsespätzle',
    variants: [
      'kaesespaetzle', 'spätzle mit käse', 'allgäuer käsespätzle',
      'kässpätzle', 'kassspatzen', 'käsespätzl', 'käsespaetzle',
      'kaese spaetzle', 'emmentaler spätzle', 'bergkäse spätzle'
    ]
  },
  {
    canonical: 'spätzle',
    variants: [
      'spaetzle', 'schwäbische spätzle', 'eierspätzle', 'spätzli',
      'knöpfle', 'knöpfli', 'nockerl', 'nockerln', 'spätzla',
      'hausgemachte spätzle', 'hand geschabte spätzle'
    ]
  },
  {
    canonical: 'maultaschen',
    variants: [
      'schwäbische maultaschen', 'herrgottsbscheißerle', 'mauldaschen',
      'gefüllte teigtaschen', 'schwäbische ravioli', 'mauldascha',
      'maultaschensuppe', 'gebratene maultaschen'
    ]
  },
  {
    canonical: 'sauerbraten',
    variants: [
      'rheinischer sauerbraten', 'marinierter braten', 'essigbraten',
      'sauer braten', 'saure braten', 'rheinischer'
    ]
  },
  {
    canonical: 'roulade',
    variants: [
      'rinderroulade', 'rindsroulade', 'fleischroulade', 'rouladen',
      'kohlroulade', 'krautroulade', 'rinderrouladen', 'krautwickel',
      'wirsingroulade', 'kappes'
    ]
  },
  {
    canonical: 'gulasch',
    variants: [
      'gulash', 'goulasch', 'goulash', 'rindergulasch', 'schweinegulasch',
      'ungarisches gulasch', 'szegediner', 'szegediner gulasch',
      'gulaschsuppe', 'kesselgulasch', 'gulyás', 'gulyas'
    ]
  },
  {
    canonical: 'frikadelle',
    variants: [
      'frikadellen', 'bulette', 'buletten', 'fleischpflanzerl',
      'fleischküchle', 'fleischklops', 'klops', 'klopse',
      'hackfleischbällchen', 'fleischbällchen', 'hackbällchen',
      'bratklops', 'beefsteak', 'deutsches beefsteak'
    ]
  },
  {
    canonical: 'hackbraten',
    variants: [
      'falscher hase', 'fleischkäse', 'hackfleischbraten',
      'hackfleischrolle', 'fleischrolle', 'meatloaf'
    ]
  },
  {
    canonical: 'kassler',
    variants: [
      'kasseler', 'kasseler nacken', 'kassler rippchen', 'kasseler rippchen',
      'geräuchertes schweinefleisch', 'kasseler braten'
    ]
  },
  {
    canonical: 'königsberger klopse',
    variants: [
      'königsberger', 'klopse in kapernsauce', 'kapernklopse',
      'saure klopse', 'königsberger fleischbällchen'
    ]
  },
  {
    canonical: 'schweinshaxe',
    variants: [
      'haxe', 'haxn', 'grillhaxe', 'schweinehaxe', 'eisbein',
      'haxe vom grill', 'knusperhaxe', 'bayerische haxe',
      'stelze', 'schweinestelze', 'hinterhaxe'
    ]
  },
  {
    canonical: 'schweinebraten',
    variants: [
      'schweinbraten', 'schweinsbraten', 'krustenbraten',
      'bayerischer schweinebraten', 'braten vom schwein',
      'schweinebauch', 'schweinenacken', 'nackenbraten'
    ]
  },
  {
    canonical: 'rollbraten',
    variants: [
      'roll braten', 'gefüllter braten', 'gefüllter schweinebraten',
      'rollbraten gefüllt', 'rollbraten mit füllung'
    ]
  },
  {
    canonical: 'labskaus',
    variants: [
      'lapskaus', 'norddeutscher labskaus', 'hamburger labskaus',
      'matjes labskaus', 'labskovs'
    ]
  },
  {
    canonical: 'grünkohl',
    variants: [
      'gruenkohl', 'grüne kohl', 'pinkel mit grünkohl',
      'grünkohl mit pinkel', 'oldenburger grünkohl',
      'kohl und pinkel', 'braunkohl'
    ]
  },
  {
    canonical: 'himmel und erde',
    variants: [
      'himmel un ääd', 'himmel und erde mit blutwurst',
      'kartoffelpüree mit apfelmus', 'rheinisch'
    ]
  },
  {
    canonical: 'matjes',
    variants: [
      'matjeshering', 'matjesfilet', 'matjes hausfrauenart',
      'matjes mit zwiebeln', 'holländischer matjes'
    ]
  },
  {
    canonical: 'bismarckhering',
    variants: [
      'bismarck hering', 'rollmops', 'rollmöpse', 'saurer hering',
      'eingelegter hering', 'marinierter hering'
    ]
  },
  {
    canonical: 'leberkäse',
    variants: [
      'leberkaese', 'leberkäs', 'leberkas', 'fleischkäse', 'fleischkaese',
      'wurstkäse', 'bayerischer leberkäse', 'leberkässemmel',
      'leberkäsebrötchen', 'abgebräunter leberkäse'
    ]
  },
  {
    canonical: 'weißwurst',
    variants: [
      'weisswurst', 'weisswuerscht', 'weißwürstchen', 'weisswuerstchen',
      'münchner weißwurst', 'bayerische weißwurst',
      'weißwurstfrühstück', 'weisswurstfruehstueck'
    ]
  },
  {
    canonical: 'kartoffelsalat',
    variants: [
      'erdäpfelsalat', 'erdaepfelsalat', 'grumbeersalat', 'potato salad',
      'schwäbischer kartoffelsalat', 'bayerischer kartoffelsalat',
      'warmer kartoffelsalat', 'kartoffelsalat mit speck'
    ]
  },
  {
    canonical: 'sauerkraut',
    variants: [
      'kraut', 'weinkraut', 'bayrisch kraut', 'bayerisch kraut',
      'fermentierter kohl', 'sauerkohl', 'elsässer sauerkraut',
      'choucroute'
    ]
  },
  {
    canonical: 'knödel',
    variants: [
      'knoedel', 'klöße', 'kloesse', 'klosse', 'semmelknödel',
      'kartoffelknödel', 'böhmische knödel', 'serviettenknödel',
      'speckknödel', 'leberknödel', 'spinatknödel', 'knödln'
    ]
  },
  {
    canonical: 'flammkuchen',
    variants: [
      'tarte flambée', 'tarte flambee', 'elsässer flammkuchen',
      'dünner fladen', 'flammenkuchen', 'flammkuchen elsässer art',
      'flambe', 'flammekueche'
    ]
  },
  {
    canonical: 'reibekuchen',
    variants: [
      'kartoffelpuffer', 'kartoffelpfannkuchen', 'rösti', 'roesti',
      'reiberdatschi', 'dotsch', 'puffer', 'rievkooche',
      'potato pancakes', 'hash browns', 'latkes'
    ]
  },
  {
    canonical: 'pellkartoffeln',
    variants: [
      'kartoffeln mit quark', 'pellkartoffel', 'kartoffeln mit kräuterquark',
      'quetschkartoffeln', 'ofenkartoffel', 'baked potato',
      'folienkartoffel', 'gebackene kartoffel'
    ]
  },
  {
    canonical: 'bratkartoffeln',
    variants: [
      'röstkartoffeln', 'roestkartoffeln', 'gebratene kartoffeln',
      'lyonnaise kartoffeln', 'home fries', 'bauernkartoffeln'
    ]
  },
  {
    canonical: 'kartoffelpüree',
    variants: [
      'kartoffelpuree', 'kartoffelbrei', 'stampfkartoffeln', 'stampf',
      'mashed potatoes', 'kartoffelstampf', 'erdäpfelpüree'
    ]
  },
  {
    canonical: 'eiergerichte',
    variants: [
      'eier', 'spiegelei', 'spiegeleier', 'rührei', 'ruehrei',
      'omelette', 'omelett', 'strammer max', 'bauernfrühstück'
    ]
  },

  // ============================================
  // SALAD - EXPANDED
  // ============================================
  {
    canonical: 'salat',
    variants: [
      'salad', 'salade', 'insalata', 'blattsalat', 'salate',
      'salats', 'grüner salat', 'gemischter salat', 'beilagensalat',
      'bunter salat', 'salatvariationen'
    ]
  },
  {
    canonical: 'caesar salad',
    variants: [
      'cäsar salat', 'caesar salat', 'caesarsalat', 'cesarsalat',
      'ceasar salad', 'cesar salat', 'caeser salat', 'cesar',
      'römersalat', 'caesar dressing', 'chicken caesar'
    ]
  },
  {
    canonical: 'griechischer salat',
    variants: [
      'greek salad', 'bauernsalat', 'hirtensalat', 'griechisch salat',
      'choriatiki', 'feta salat', 'fetasalat', 'schafskäsesalat',
      'tomaten gurken feta', 'village salat'
    ]
  },
  {
    canonical: 'krautsalat',
    variants: [
      'coleslaw', 'colslaw', 'kohlsalat', 'weißkrautsalat',
      'rotkrautsalat', 'rotkohl salat', 'amerikanischer krautsalat'
    ]
  },
  {
    canonical: 'nudelsalat',
    variants: [
      'pasta salat', 'pastasalat', 'nudel salat', 'italienischer nudelsalat',
      'kalter nudelsalat', 'nudelsalat mit mayo'
    ]
  },
  {
    canonical: 'wurstsalat',
    variants: [
      'fleischsalat', 'bayrischer wurstsalat', 'schwäbischer wurstsalat',
      'wurst salat', 'schweizer wurstsalat', 'elsässer wurstsalat'
    ]
  },

  // ============================================
  // FALAFEL & MIDDLE EASTERN - EXPANDED
  // ============================================
  {
    canonical: 'falafel',
    variants: [
      'felafel', 'falefel', 'falaffel', 'falafl', 'falafeln',
      'kichererbsenbällchen', 'veggie balls', 'falafelkugeln',
      'falafel bällchen', 'falafel teller', 'falafel wrap'
    ]
  },
  {
    canonical: 'hummus',
    variants: [
      'humus', 'hommus', 'hoummus', 'hummous', 'houmous',
      'kichererbsenpüree', 'kichererbsendip', 'hummusdip',
      'hummus bi tahini', 'kichererbsen paste'
    ]
  },
  {
    canonical: 'shakshuka',
    variants: [
      'schakschuka', 'shakshouka', 'shakschouka', 'shaksuka',
      'eier in tomatensoße', 'israelisches frühstück',
      'türkische eier', 'menemen'
    ]
  },
  {
    canonical: 'baba ganoush',
    variants: [
      'baba ghanoush', 'baba ganousch', 'babaganoush', 'babaghanoush',
      'auberginenpüree', 'auberginendip', 'auberginen creme',
      'mutabbal', 'mutabal'
    ]
  },
  {
    canonical: 'tabbouleh',
    variants: [
      'tabouleh', 'taboule', 'tabule', 'taboulé', 'bulgursalat',
      'petersiliensalat', 'couscous salat arabisch'
    ]
  },
  {
    canonical: 'shawarma',
    variants: [
      'schawarma', 'shawerma', 'schawurma', 'shoarma', 'shwarma',
      'arabischer döner', 'libanesischer döner', 'döner arabisch'
    ]
  },
  {
    canonical: 'fattoush',
    variants: [
      'fattousch', 'fatusch', 'fattusch', 'libanesischer salat',
      'brotsalat arabisch'
    ]
  },
  {
    canonical: 'manakish',
    variants: [
      'manoush', 'manoushe', 'manaqish', 'zaatar pizza',
      'arabisches fladenbrot', 'libanesische pizza'
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
  // ASIAN FOOD - EXPANDED
  // ============================================
  {
    canonical: 'sushi',
    variants: [
      'susi', 'suschi', 'suushi', 'japanese rolls', 'sushis',
      'sushi set', 'sushi platte', 'sushiplatte', 'sushi box'
    ]
  },
  {
    canonical: 'maki',
    variants: [
      'maki roll', 'maki rolls', 'makizushi', 'makis',
      'sushi rolle', 'sushi rollen', 'inside out roll',
      'california roll', 'california maki'
    ]
  },
  {
    canonical: 'nigiri',
    variants: [
      'nigiri sushi', 'nigiris', 'hand sushi', 'nigrizushi',
      'sushi nigiri'
    ]
  },
  {
    canonical: 'ramen',
    variants: [
      'ramennudeln', 'ramen noodles', 'nudelsuppe', 'raman',
      'japanische nudelsuppe', 'tonkotsu ramen', 'miso ramen',
      'shoyu ramen', 'ramenschale'
    ]
  },
  {
    canonical: 'pho',
    variants: [
      'pho bo', 'pho ga', 'vietnamesische suppe', 'fo suppe',
      'pho suppe', 'reisnudelsuppe', 'vietnam suppe',
      'pho vietnam', 'phở'
    ]
  },
  {
    canonical: 'pad thai',
    variants: [
      'padthai', 'pad tai', 'pat thai', 'thailändische nudeln',
      'gebratene reisnudeln', 'thai nudeln', 'phad thai'
    ]
  },
  {
    canonical: 'fried rice',
    variants: [
      'gebratener reis', 'reis gebraten', 'bratreis', 'bratreis',
      'chinesischer reis', 'asia reis', 'nasi goreng', 'nasi goreg',
      'gebratene reis', 'china reis', 'asiatischer reis'
    ]
  },
  {
    canonical: 'gebratene nudeln',
    variants: [
      'fried noodles', 'chow mein', 'chow mien', 'lo mein',
      'bami goreng', 'mie goreng', 'asia nudeln', 'bratnudeln',
      'gebratene nudelns', 'wok nudeln', 'woknudeln'
    ]
  },
  {
    canonical: 'curry',
    variants: [
      'curri', 'kari', 'kerry', 'thai curry', 'indisches curry',
      'japanisches curry', 'currygericht', 'curry gericht'
    ]
  },
  {
    canonical: 'green curry',
    variants: [
      'grünes curry', 'gruenes curry', 'thai green curry',
      'gaeng keow wan', 'grünes thai curry', 'green thai curry'
    ]
  },
  {
    canonical: 'red curry',
    variants: [
      'rotes curry', 'thai red curry', 'gaeng phed', 'panang curry',
      'massaman curry', 'rotes thai curry', 'red thai curry'
    ]
  },
  {
    canonical: 'yellow curry',
    variants: [
      'gelbes curry', 'thai yellow curry', 'gaeng karee',
      'gelbes thai curry'
    ]
  },
  {
    canonical: 'dim sum',
    variants: [
      'dimsum', 'dim sums', 'chinesische teigtaschen', 'yum cha',
      'dim sum korb', 'gedämpfte teigtaschen'
    ]
  },
  {
    canonical: 'gyoza',
    variants: [
      'gyozas', 'jiaozi', 'potstickers', 'pot stickers',
      'japanische teigtaschen', 'dumplings', 'dumpling',
      'japanische maultaschen'
    ]
  },
  {
    canonical: 'spring rolls',
    variants: [
      'frühlingsrollen', 'frühlingsrolle', 'spring roll', 'springrolls',
      'sommerrollen', 'vietnamese rolls', 'vietnam rollen',
      'knusprige frühlingsrollen', 'mini frühlingsrollen'
    ]
  },
  {
    canonical: 'bao',
    variants: [
      'bao bun', 'bao buns', 'gua bao', 'steamed bun', 'steamed buns',
      'dampfbrötchen', 'gefüllte buns', 'baozi', 'mantou'
    ]
  },
  {
    canonical: 'bibimbap',
    variants: [
      'bibimbab', 'bi bim bap', 'koreanische reisschale',
      'korean rice bowl', 'dolsot bibimbap', 'koreanisch reis'
    ]
  },
  {
    canonical: 'kimchi',
    variants: [
      'kimchee', 'kim chi', 'koreanisches sauerkraut',
      'fermentierter kohl korean', 'kimchi beilage'
    ]
  },
  {
    canonical: 'bulgogi',
    variants: [
      'bul gogi', 'koreanisches bbq', 'korean bbq beef',
      'gegrilltes rindfleisch koreanisch', 'bulgogi beef'
    ]
  },
  {
    canonical: 'teriyaki',
    variants: [
      'teryaki', 'terriaki', 'teriyaki sauce', 'teriyaki chicken',
      'teriyaki hähnchen', 'teriyaki lachs', 'teriyakisauce'
    ]
  },
  {
    canonical: 'donburi',
    variants: [
      'don', 'reis schüssel', 'japanische reisschale',
      'katsudon', 'gyudon', 'oyakodon', 'tendon'
    ]
  },
  {
    canonical: 'udon',
    variants: [
      'udon nudeln', 'udonnudeln', 'dicke nudeln japan',
      'udon suppe', 'yaki udon', 'kake udon'
    ]
  },
  {
    canonical: 'soba',
    variants: [
      'soba nudeln', 'sobanudeln', 'buchweizen nudeln',
      'buchweizennudeln', 'zaru soba', 'kake soba'
    ]
  },
  {
    canonical: 'edamame',
    variants: [
      'edamamen', 'sojabohnen', 'grüne sojabohnen',
      'edamame bohnen', 'japanische sojabohnen'
    ]
  },
  {
    canonical: 'miso',
    variants: [
      'miso suppe', 'misosuppe', 'miso soup', 'misoshiru',
      'japanische suppe', 'miso paste'
    ]
  },
  {
    canonical: 'tempura',
    variants: [
      'tempra', 'tempuras', 'gemüse tempura', 'shrimp tempura',
      'garnelen tempura', 'frittiertes gemüse japan'
    ]
  },
  {
    canonical: 'katsu',
    variants: [
      'tonkatsu', 'chicken katsu', 'katsu curry', 'katsucurry',
      'paniertes schnitzel japan', 'japanisches schnitzel'
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

// ============================================
// GERMAN COMPOUND WORD COMPONENTS
// ============================================
const COMPOUND_SUFFIXES = [
  // Dish types
  'braten', 'schnitzel', 'salat', 'suppe', 'kuchen', 'brot', 'brötchen',
  'fleisch', 'steak', 'filet', 'wurst', 'würstchen', 'käse', 'soße', 'sauce',
  'burger', 'pizza', 'teller', 'bowl', 'platte', 'spieß', 'spiess',
  'auflauf', 'eintopf', 'ragout', 'gulasch', 'gericht', 'pfanne',
  'nudeln', 'pasta', 'reis', 'kartoffeln', 'pommes', 'fritten',
  'roulade', 'rouladen', 'frikadelle', 'frikadellen', 'klopse',
  // Drinks
  'schorle', 'saft', 'limonade', 'limo', 'tee', 'kaffee', 'shake', 'smoothie',
  'bier', 'wein', 'wasser', 'cola',
  // Desserts
  'torte', 'eis', 'creme', 'mousse', 'pudding', 'strudel'
];

const COMPOUND_PREFIXES = [
  // Meats
  'schweine', 'rinder', 'rinds', 'kalbs', 'lamm', 'hähnchen', 'hühner', 'huhn',
  'puten', 'enten', 'gänse', 'wild', 'hirsch', 'kaninchen',
  // Fish
  'lachs', 'thunfisch', 'forellen', 'fisch', 'garnelen', 'krabben',
  // Vegetables
  'kartoffel', 'tomate', 'tomaten', 'zwiebel', 'paprika', 'pilz', 'champignon',
  'spinat', 'brokkoli', 'blumen', 'rosenkohl', 'grünkohl', 'rotkohl', 'weißkohl',
  'kürbis', 'zucchini', 'auberginen', 'gurken', 'bohnen', 'erbsen', 'linsen',
  // Cheese
  'käse', 'mozzarella', 'feta', 'gouda', 'cheddar', 'parmesan', 'emmentaler',
  // Fruit
  'apfel', 'birnen', 'kirsch', 'erdbeer', 'himbeer', 'blaubeer', 'bananen',
  'orangen', 'zitronen', 'ananas', 'mango',
  // Other
  'rahm', 'sahne', 'butter', 'knoblauch', 'kräuter', 'curry', 'chili',
  'schokoladen', 'schoko', 'vanille', 'karamell', 'nuss', 'mandel'
];

/**
 * Split German compound words (enhanced implementation)
 * E.g., "Schweinebraten" → ["Schweinebraten", "Schweine", "braten"]
 * E.g., "Currywurst" → ["Currywurst", "Curry", "wurst"]
 * E.g., "Käsespätzle" → ["Käsespätzle", "Käse", "spätzle"]
 */
export function splitCompoundWord(word: string): string[] {
  const result: string[] = [word];
  const wordLower = word.toLowerCase();

  // Try suffix-based splitting first
  for (const suffix of COMPOUND_SUFFIXES) {
    if (wordLower.endsWith(suffix) && wordLower.length > suffix.length + 2) {
      const prefix = word.substring(0, word.length - suffix.length);
      // Remove common linking letters (s, n, e, en)
      const cleanPrefix = prefix.replace(/[sne]n?$/i, '');
      result.push(prefix, suffix);
      if (cleanPrefix !== prefix && cleanPrefix.length > 1) {
        result.push(cleanPrefix);
      }
      break;
    }
  }

  // Try prefix-based splitting
  for (const prefix of COMPOUND_PREFIXES) {
    if (wordLower.startsWith(prefix) && wordLower.length > prefix.length + 2) {
      const suffix = word.substring(prefix.length);
      // Remove common linking letters
      const cleanSuffix = suffix.replace(/^[sne]n?/i, '');
      if (!result.includes(suffix)) {
        result.push(prefix, suffix);
      }
      if (cleanSuffix !== suffix && cleanSuffix.length > 2 && !result.includes(cleanSuffix)) {
        result.push(cleanSuffix);
      }
      break;
    }
  }

  return Array.from(new Set(result));
}

/**
 * Handle German diminutives (-chen, -lein endings)
 * E.g., "Würstchen" → ["Würstchen", "Wurst"]
 * E.g., "Brötchen" → ["Brötchen", "Brot"]
 */
export function handleDiminutives(word: string): string[] {
  const result: string[] = [word];
  const wordLower = word.toLowerCase();

  // Common diminutive endings
  if (wordLower.endsWith('chen')) {
    const base = word.substring(0, word.length - 4);
    result.push(base);
    // Handle umlaut reversal (Würstchen → Wurst)
    const noUmlaut = base
      .replace(/ä/g, 'a')
      .replace(/ö/g, 'o')
      .replace(/ü/g, 'u');
    if (noUmlaut !== base) {
      result.push(noUmlaut);
    }
  } else if (wordLower.endsWith('lein')) {
    const base = word.substring(0, word.length - 4);
    result.push(base);
    const noUmlaut = base
      .replace(/ä/g, 'a')
      .replace(/ö/g, 'o')
      .replace(/ü/g, 'u');
    if (noUmlaut !== base) {
      result.push(noUmlaut);
    }
  } else if (wordLower.endsWith('erl') || wordLower.endsWith('el')) {
    // Austrian/Bavarian diminutives (Schnitzerl, Hendl)
    const base = word.substring(0, word.length - (wordLower.endsWith('erl') ? 3 : 2));
    if (base.length > 2) {
      result.push(base);
    }
  }

  return Array.from(new Set(result));
}

/**
 * Parse "mit" and "und" constructions in German dish names
 * E.g., "Döner mit Pommes" → ["Döner", "Pommes"]
 * E.g., "Schnitzel mit Pommes und Salat" → ["Schnitzel", "Pommes", "Salat"]
 * E.g., "Currywurst & Pommes" → ["Currywurst", "Pommes"]
 */
export function parseMitUndConstruction(dishName: string): string[] {
  const result: string[] = [];

  // Split by "mit", "und", "&", "+"
  const parts = dishName
    .toLowerCase()
    .split(/\s+(?:mit|und|&|\+|,)\s+/i)
    .map(p => p.trim())
    .filter(p => p.length > 0);

  for (const part of parts) {
    result.push(part);
    // Also split each part's words
    const words = part.split(/\s+/);
    if (words.length > 1) {
      result.push(...words);
    }
  }

  return Array.from(new Set(result));
}

/**
 * Handle common German plural forms
 * E.g., "Pommes" stays as "Pommes"
 * E.g., "Nudeln" → ["Nudeln", "Nudel"]
 * E.g., "Spätzle" stays (already a plural form treated as singular)
 */
export function handlePlurals(word: string): string[] {
  const result: string[] = [word];
  const wordLower = word.toLowerCase();

  // Common German plural endings
  if (wordLower.endsWith('n') && wordLower.length > 3) {
    // -en, -n endings
    result.push(word.substring(0, word.length - 1)); // Remove last n
    if (wordLower.endsWith('en')) {
      result.push(word.substring(0, word.length - 2)); // Remove -en
    }
  }
  if (wordLower.endsWith('e') && wordLower.length > 3) {
    // -e endings (e.g., Pilze → Pilz)
    result.push(word.substring(0, word.length - 1));
  }
  if (wordLower.endsWith('er') && wordLower.length > 4) {
    // -er endings (but careful not to break words like "Burger")
    const base = word.substring(0, word.length - 2);
    if (!['burg', 'burg'].includes(base.toLowerCase().slice(-4))) {
      result.push(base);
    }
  }
  if (wordLower.endsWith('s') && wordLower.length > 3) {
    // English-style plurals common in German menus
    result.push(word.substring(0, word.length - 1));
  }

  return Array.from(new Set(result));
}

/**
 * Expand search terms with synonyms (enhanced version)
 *
 * This function provides comprehensive expansion:
 * - Synonym expansion
 * - Compound word splitting (Currywurst → Curry + Wurst)
 * - Diminutive handling (Würstchen → Wurst)
 * - "mit/und" construction parsing (Döner mit Pommes → Döner, Pommes)
 * - Plural form handling (Nudeln → Nudel)
 */
export function expandWithSynonyms(searchTerm: string): string[] {
  // First remove size modifiers
  const cleanedTerm = removeSizeModifiers(searchTerm);

  // Parse "mit/und" constructions first
  const mainParts = parseMitUndConstruction(cleanedTerm);

  const allTerms: string[] = [cleanedTerm];

  // Process each part (from mit/und splitting)
  for (const part of mainParts) {
    allTerms.push(part);

    const words = part.split(' ').filter(w => w.length > 0);

    for (const word of words) {
      // Add the word itself
      allTerms.push(word);

      // Get synonyms
      const synonyms = getSynonyms(word);
      allTerms.push(...synonyms);

      // Handle compound words
      const compounds = splitCompoundWord(word);
      for (const compound of compounds) {
        allTerms.push(compound);
        const compoundSynonyms = getSynonyms(compound);
        allTerms.push(...compoundSynonyms);
      }

      // Handle diminutives
      const diminutives = handleDiminutives(word);
      for (const dim of diminutives) {
        allTerms.push(dim);
        const dimSynonyms = getSynonyms(dim);
        allTerms.push(...dimSynonyms);
      }

      // Handle plurals
      const plurals = handlePlurals(word);
      for (const plural of plurals) {
        allTerms.push(plural);
        const pluralSynonyms = getSynonyms(plural);
        allTerms.push(...pluralSynonyms);
      }
    }
  }

  // Also try the full term as-is for exact matching
  const fullTermSynonyms = getSynonyms(cleanedTerm);
  allTerms.push(...fullTermSynonyms);

  // Deduplicate and filter
  const uniqueTerms = Array.from(new Set(
    allTerms
      .map(t => t.toLowerCase().trim())
      .filter(t => t.length > 1)
  ));

  // Limit to avoid explosion (prioritize shorter terms which are usually more specific)
  return uniqueTerms.slice(0, 100);
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
