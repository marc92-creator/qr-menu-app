// Restaurant Templates for SetupWizard
// Each template includes categories and sample menu items

export interface TemplateCategory {
  name: string;
  name_en?: string;
  items: {
    name: string;
    name_en?: string;
    description?: string;
    description_en?: string;
    price: number;
    is_vegetarian?: boolean;
    is_vegan?: boolean;
    tags?: string[];
  }[];
}

export interface RestaurantTemplate {
  id: string;
  name: string;
  icon: string;
  description: string;
  categories: TemplateCategory[];
}

export const RESTAURANT_TEMPLATES: RestaurantTemplate[] = [
  {
    id: 'doener',
    name: 'Döner & Kebab',
    icon: '🥙',
    description: 'Döner, Wraps, Falafel und türkische Spezialitäten',
    categories: [
      {
        name: 'Döner & Wraps',
        name_en: 'Döner & Wraps',
        items: [
          { name: 'Döner im Brot', name_en: 'Döner in Bread', description: 'Mit frischem Salat und Soße nach Wahl', description_en: 'With fresh salad and sauce of your choice', price: 5.50, tags: ['bestseller'] },
          { name: 'Döner Teller', name_en: 'Döner Plate', description: 'Mit Reis oder Pommes und Salat', description_en: 'With rice or fries and salad', price: 9.50, tags: ['chefs_choice'] },
          { name: 'Dürüm', name_en: 'Dürüm Wrap', description: 'Döner im Wrap mit Salat und Soße', description_en: 'Döner in wrap with salad and sauce', price: 6.50 },
          { name: 'Vegetarischer Döner', name_en: 'Vegetarian Döner', description: 'Mit Falafel, Salat und Hummus', description_en: 'With falafel, salad and hummus', price: 5.50, is_vegetarian: true, is_vegan: true },
        ],
      },
      {
        name: 'Beilagen',
        name_en: 'Side Dishes',
        items: [
          { name: 'Pommes', name_en: 'French Fries', description: 'Knusprige Pommes Frites', description_en: 'Crispy french fries', price: 3.00, is_vegetarian: true, is_vegan: true },
          { name: 'Salat', name_en: 'Salad', description: 'Gemischter Salat mit Dressing', description_en: 'Mixed salad with dressing', price: 4.50, is_vegetarian: true, is_vegan: true },
          { name: 'Falafel (3 Stück)', name_en: 'Falafel (3 pieces)', description: 'Hausgemachte Falafel', description_en: 'Homemade falafel', price: 3.50, is_vegetarian: true, is_vegan: true, tags: ['homemade'] },
        ],
      },
      {
        name: 'Getränke',
        name_en: 'Beverages',
        items: [
          { name: 'Cola 0,33l', name_en: 'Cola 0.33l', price: 2.50 },
          { name: 'Ayran', name_en: 'Ayran', description: 'Türkisches Joghurtgetränk', description_en: 'Turkish yogurt drink', price: 2.00 },
          { name: 'Wasser 0,5l', name_en: 'Water 0.5l', price: 2.00 },
        ],
      },
    ],
  },
  {
    id: 'pizzeria',
    name: 'Pizzeria / Italienisch',
    icon: '🍕',
    description: 'Pizza, Pasta, Antipasti und italienische Spezialitäten',
    categories: [
      {
        name: 'Pizza',
        name_en: 'Pizza',
        items: [
          { name: 'Margherita', name_en: 'Margherita', description: 'Tomaten, Mozzarella, Basilikum', description_en: 'Tomatoes, mozzarella, basil', price: 8.50, is_vegetarian: true, tags: ['bestseller'] },
          { name: 'Salami', name_en: 'Pepperoni', description: 'Tomaten, Mozzarella, Salami', description_en: 'Tomatoes, mozzarella, pepperoni', price: 9.50 },
          { name: 'Funghi', name_en: 'Mushroom', description: 'Tomaten, Mozzarella, Champignons', description_en: 'Tomatoes, mozzarella, mushrooms', price: 9.00, is_vegetarian: true },
          { name: 'Quattro Formaggi', name_en: 'Four Cheese', description: 'Mozzarella, Gorgonzola, Parmesan, Ricotta', description_en: 'Mozzarella, gorgonzola, parmesan, ricotta', price: 11.50, is_vegetarian: true, tags: ['chefs_choice'] },
          { name: 'Prosciutto e Rucola', name_en: 'Prosciutto & Arugula', description: 'Mit Parmaschinken und frischem Rucola', description_en: 'With prosciutto and fresh arugula', price: 12.50 },
        ],
      },
      {
        name: 'Pasta',
        name_en: 'Pasta',
        items: [
          { name: 'Spaghetti Bolognese', name_en: 'Spaghetti Bolognese', description: 'Mit hausgemachter Fleischsoße', description_en: 'With homemade meat sauce', price: 9.50, tags: ['homemade'] },
          { name: 'Penne Arrabiata', name_en: 'Penne Arrabiata', description: 'Mit scharfer Tomatensoße', description_en: 'With spicy tomato sauce', price: 8.50, is_vegetarian: true, is_vegan: true },
          { name: 'Lasagne', name_en: 'Lasagna', description: 'Hausgemacht mit Béchamel', description_en: 'Homemade with béchamel', price: 11.00, tags: ['bestseller'] },
          { name: 'Spaghetti Carbonara', name_en: 'Spaghetti Carbonara', description: 'Mit Speck, Ei und Parmesan', description_en: 'With bacon, egg and parmesan', price: 10.50 },
        ],
      },
      {
        name: 'Antipasti',
        name_en: 'Starters',
        items: [
          { name: 'Bruschetta', name_en: 'Bruschetta', description: 'Geröstetes Brot mit Tomaten und Knoblauch', description_en: 'Toasted bread with tomatoes and garlic', price: 5.50, is_vegetarian: true, is_vegan: true },
          { name: 'Caprese', name_en: 'Caprese', description: 'Tomaten, Mozzarella, Basilikum', description_en: 'Tomatoes, mozzarella, basil', price: 7.50, is_vegetarian: true },
          { name: 'Antipasti Misto', name_en: 'Mixed Antipasti', description: 'Gemischte italienische Vorspeisen', description_en: 'Mixed Italian starters', price: 9.50 },
        ],
      },
      {
        name: 'Desserts',
        name_en: 'Desserts',
        items: [
          { name: 'Tiramisu', name_en: 'Tiramisu', description: 'Klassisches italienisches Dessert', description_en: 'Classic Italian dessert', price: 5.50, is_vegetarian: true },
          { name: 'Panna Cotta', name_en: 'Panna Cotta', description: 'Mit Beerensoße', description_en: 'With berry sauce', price: 5.00, is_vegetarian: true },
        ],
      },
      {
        name: 'Getränke',
        name_en: 'Beverages',
        items: [
          { name: 'Wasser 0,5l', name_en: 'Water 0.5l', price: 2.50 },
          { name: 'Cola 0,33l', name_en: 'Cola 0.33l', price: 2.50 },
          { name: 'Hauswein rot 0,2l', name_en: 'House Wine Red 0.2l', price: 4.50 },
          { name: 'Hauswein weiß 0,2l', name_en: 'House Wine White 0.2l', price: 4.50 },
        ],
      },
    ],
  },
  {
    id: 'burger',
    name: 'Burger Restaurant',
    icon: '🍔',
    description: 'Burger, Pommes, Shakes und amerikanische Klassiker',
    categories: [
      {
        name: 'Burger',
        name_en: 'Burgers',
        items: [
          { name: 'Classic Burger', name_en: 'Classic Burger', description: 'Rindfleisch, Salat, Tomate, Zwiebel, Gurke', description_en: 'Beef, lettuce, tomato, onion, pickle', price: 8.50, tags: ['bestseller'] },
          { name: 'Cheeseburger', name_en: 'Cheeseburger', description: 'Mit extra Cheddar', description_en: 'With extra cheddar', price: 9.50 },
          { name: 'Bacon Burger', name_en: 'Bacon Burger', description: 'Mit knusprigem Bacon und BBQ-Sauce', description_en: 'With crispy bacon and BBQ sauce', price: 10.50, tags: ['chefs_choice'] },
          { name: 'Veggie Burger', name_en: 'Veggie Burger', description: 'Hausgemachter Gemüse-Patty', description_en: 'Homemade veggie patty', price: 9.00, is_vegetarian: true, tags: ['healthy'] },
          { name: 'Double Smash', name_en: 'Double Smash', description: 'Zwei Smash Patties mit Käse', description_en: 'Two smash patties with cheese', price: 12.50, tags: ['new'] },
        ],
      },
      {
        name: 'Sides',
        name_en: 'Sides',
        items: [
          { name: 'Pommes', name_en: 'Fries', description: 'Knusprig & golden', description_en: 'Crispy & golden', price: 3.50, is_vegetarian: true, is_vegan: true },
          { name: 'Sweet Potato Fries', name_en: 'Sweet Potato Fries', description: 'Süßkartoffel-Pommes', description_en: 'Sweet potato fries', price: 4.50, is_vegetarian: true, is_vegan: true },
          { name: 'Onion Rings', name_en: 'Onion Rings', description: 'Im Bierteig', description_en: 'Beer battered', price: 4.00, is_vegetarian: true },
          { name: 'Coleslaw', name_en: 'Coleslaw', description: 'Hausgemachter Krautsalat', description_en: 'Homemade coleslaw', price: 2.50, is_vegetarian: true },
        ],
      },
      {
        name: 'Shakes',
        name_en: 'Shakes',
        items: [
          { name: 'Schoko Shake', name_en: 'Chocolate Shake', price: 4.50, is_vegetarian: true },
          { name: 'Vanille Shake', name_en: 'Vanilla Shake', price: 4.50, is_vegetarian: true },
          { name: 'Erdbeere Shake', name_en: 'Strawberry Shake', price: 4.50, is_vegetarian: true },
          { name: 'Oreo Shake', name_en: 'Oreo Shake', price: 5.50, is_vegetarian: true, tags: ['bestseller'] },
        ],
      },
      {
        name: 'Getränke',
        name_en: 'Beverages',
        items: [
          { name: 'Cola 0,4l', name_en: 'Cola 0.4l', price: 3.00 },
          { name: 'Fanta 0,4l', name_en: 'Fanta 0.4l', price: 3.00 },
          { name: 'Sprite 0,4l', name_en: 'Sprite 0.4l', price: 3.00 },
          { name: 'Wasser 0,5l', name_en: 'Water 0.5l', price: 2.50 },
        ],
      },
    ],
  },
  {
    id: 'asia',
    name: 'Asia Restaurant',
    icon: '🍜',
    description: 'Asiatische Küche mit Sushi, Nudeln und mehr',
    categories: [
      {
        name: 'Vorspeisen',
        name_en: 'Starters',
        items: [
          { name: 'Frühlingsrollen (4 St.)', name_en: 'Spring Rolls (4 pcs)', description: 'Knusprige vegetarische Rollen', description_en: 'Crispy vegetarian rolls', price: 4.50, is_vegetarian: true, is_vegan: true },
          { name: 'Wan Tan Suppe', name_en: 'Wonton Soup', description: 'Mit gefüllten Teigtaschen', description_en: 'With filled dumplings', price: 4.00 },
          { name: 'Edamame', name_en: 'Edamame', description: 'Mit Meersalz', description_en: 'With sea salt', price: 4.00, is_vegetarian: true, is_vegan: true, tags: ['healthy'] },
        ],
      },
      {
        name: 'Nudeln & Reis',
        name_en: 'Noodles & Rice',
        items: [
          { name: 'Gebratene Nudeln', name_en: 'Fried Noodles', description: 'Mit Gemüse und Ei', description_en: 'With vegetables and egg', price: 8.50, is_vegetarian: true },
          { name: 'Pad Thai', name_en: 'Pad Thai', description: 'Reisnudeln mit Ei und Erdnüssen', description_en: 'Rice noodles with egg and peanuts', price: 10.50, tags: ['bestseller'] },
          { name: 'Gebratener Reis', name_en: 'Fried Rice', description: 'Mit Gemüse und Ei', description_en: 'With vegetables and egg', price: 8.00, is_vegetarian: true },
          { name: 'Ramen', name_en: 'Ramen', description: 'Japanische Nudelsuppe mit Schweinefleisch', description_en: 'Japanese noodle soup with pork', price: 12.50, tags: ['chefs_choice'] },
        ],
      },
      {
        name: 'Sushi',
        name_en: 'Sushi',
        items: [
          { name: 'California Roll (8 St.)', name_en: 'California Roll (8 pcs)', description: 'Surimi, Avocado, Gurke', description_en: 'Surimi, avocado, cucumber', price: 8.50 },
          { name: 'Lachs Nigiri (2 St.)', name_en: 'Salmon Nigiri (2 pcs)', price: 4.50 },
          { name: 'Maki Mix (12 St.)', name_en: 'Maki Mix (12 pcs)', description: 'Lachs, Thunfisch, Gurke', description_en: 'Salmon, tuna, cucumber', price: 9.50, tags: ['bestseller'] },
          { name: 'Vegetarisch Platte', name_en: 'Vegetarian Plate', description: 'Avocado, Gurke, Karotte', description_en: 'Avocado, cucumber, carrot', price: 10.00, is_vegetarian: true, is_vegan: true },
        ],
      },
      {
        name: 'Getränke',
        name_en: 'Beverages',
        items: [
          { name: 'Grüner Tee', name_en: 'Green Tea', price: 2.50, is_vegetarian: true, is_vegan: true },
          { name: 'Jasmin Tee', name_en: 'Jasmine Tea', price: 2.50, is_vegetarian: true, is_vegan: true },
          { name: 'Mango Lassi', name_en: 'Mango Lassi', price: 3.50, is_vegetarian: true },
          { name: 'Wasser 0,5l', name_en: 'Water 0.5l', price: 2.50 },
        ],
      },
    ],
  },
  {
    id: 'bakery',
    name: 'Bäckerei / Café',
    icon: '🥐',
    description: 'Frühstück, Gebäck, Kuchen und Kaffee',
    categories: [
      {
        name: 'Frühstück',
        name_en: 'Breakfast',
        items: [
          { name: 'Kleines Frühstück', name_en: 'Small Breakfast', description: 'Brötchen, Butter, Marmelade, Kaffee', description_en: 'Roll, butter, jam, coffee', price: 5.50 },
          { name: 'Großes Frühstück', name_en: 'Large Breakfast', description: 'Mit Ei, Käse, Schinken', description_en: 'With egg, cheese, ham', price: 9.50, tags: ['bestseller'] },
          { name: 'Veganes Frühstück', name_en: 'Vegan Breakfast', description: 'Mit Hummus, Avocado, Gemüse', description_en: 'With hummus, avocado, vegetables', price: 8.50, is_vegetarian: true, is_vegan: true, tags: ['healthy'] },
        ],
      },
      {
        name: 'Belegte Brötchen',
        name_en: 'Sandwiches',
        items: [
          { name: 'Schinken-Käse', name_en: 'Ham & Cheese', description: 'Mit Salat und Tomate', description_en: 'With lettuce and tomato', price: 3.50 },
          { name: 'Lachs', name_en: 'Salmon', description: 'Mit Frischkäse', description_en: 'With cream cheese', price: 4.50 },
          { name: 'Vegetarisch', name_en: 'Vegetarian', description: 'Mit Hummus und gegrilltem Gemüse', description_en: 'With hummus and grilled vegetables', price: 3.50, is_vegetarian: true, is_vegan: true },
        ],
      },
      {
        name: 'Kuchen & Gebäck',
        name_en: 'Cakes & Pastries',
        items: [
          { name: 'Croissant', name_en: 'Croissant', price: 2.00, is_vegetarian: true },
          { name: 'Schoko-Croissant', name_en: 'Chocolate Croissant', price: 2.50, is_vegetarian: true, tags: ['bestseller'] },
          { name: 'Apfelkuchen', name_en: 'Apple Pie', description: 'Mit Sahne', description_en: 'With cream', price: 3.50, is_vegetarian: true },
          { name: 'Käsekuchen', name_en: 'Cheesecake', price: 3.50, is_vegetarian: true },
          { name: 'Brownie', name_en: 'Brownie', price: 2.50, is_vegetarian: true },
        ],
      },
      {
        name: 'Kaffee & Tee',
        name_en: 'Coffee & Tea',
        items: [
          { name: 'Kaffee', name_en: 'Coffee', price: 2.50, is_vegetarian: true, is_vegan: true },
          { name: 'Cappuccino', name_en: 'Cappuccino', price: 3.00, is_vegetarian: true },
          { name: 'Latte Macchiato', name_en: 'Latte Macchiato', price: 3.50, is_vegetarian: true },
          { name: 'Tee', name_en: 'Tea', price: 2.50, is_vegetarian: true, is_vegan: true },
          { name: 'Heiße Schokolade', name_en: 'Hot Chocolate', price: 3.00, is_vegetarian: true, tags: ['kids'] },
        ],
      },
    ],
  },
  {
    id: 'bar',
    name: 'Bar / Kneipe',
    icon: '🍺',
    description: 'Bier, Cocktails, Spirituosen und Snacks',
    categories: [
      {
        name: 'Bier',
        name_en: 'Beer',
        items: [
          { name: 'Pils 0,3l', name_en: 'Pilsner 0.3l', price: 3.50, is_vegetarian: true, is_vegan: true },
          { name: 'Pils 0,5l', name_en: 'Pilsner 0.5l', price: 4.50, is_vegetarian: true, is_vegan: true },
          { name: 'Weizen 0,5l', name_en: 'Wheat Beer 0.5l', price: 4.50, is_vegetarian: true, is_vegan: true },
          { name: 'Radler 0,3l', name_en: 'Radler 0.3l', price: 3.50, is_vegetarian: true, is_vegan: true },
        ],
      },
      {
        name: 'Cocktails',
        name_en: 'Cocktails',
        items: [
          { name: 'Mojito', name_en: 'Mojito', description: 'Rum, Minze, Limette, Soda', description_en: 'Rum, mint, lime, soda', price: 8.50, is_vegetarian: true, is_vegan: true, tags: ['bestseller'] },
          { name: 'Aperol Spritz', name_en: 'Aperol Spritz', description: 'Aperol, Prosecco, Soda', description_en: 'Aperol, prosecco, soda', price: 7.50, is_vegetarian: true, is_vegan: true },
          { name: 'Gin Tonic', name_en: 'Gin & Tonic', description: 'Gin, Tonic, Gurke', description_en: 'Gin, tonic, cucumber', price: 8.00, is_vegetarian: true, is_vegan: true },
          { name: 'Piña Colada', name_en: 'Piña Colada', description: 'Rum, Kokosmilch, Ananas', description_en: 'Rum, coconut milk, pineapple', price: 8.50, is_vegetarian: true, is_vegan: true },
          { name: 'Hugo', name_en: 'Hugo', description: 'Prosecco, Holunder, Minze', description_en: 'Prosecco, elderflower, mint', price: 7.00, is_vegetarian: true, is_vegan: true },
        ],
      },
      {
        name: 'Spirituosen',
        name_en: 'Spirits',
        items: [
          { name: 'Whisky', name_en: 'Whisky', description: '4cl', price: 5.00, is_vegetarian: true, is_vegan: true },
          { name: 'Wodka', name_en: 'Vodka', description: '4cl', price: 4.00, is_vegetarian: true, is_vegan: true },
          { name: 'Gin', name_en: 'Gin', description: '4cl', price: 4.50, is_vegetarian: true, is_vegan: true },
          { name: 'Rum', name_en: 'Rum', description: '4cl', price: 4.50, is_vegetarian: true, is_vegan: true },
        ],
      },
      {
        name: 'Snacks',
        name_en: 'Snacks',
        items: [
          { name: 'Nachos mit Käse', name_en: 'Nachos with Cheese', description: 'Mit Jalapeños und Dip', description_en: 'With jalapeños and dip', price: 6.50, is_vegetarian: true },
          { name: 'Chicken Wings', name_en: 'Chicken Wings', description: 'Mit BBQ-Sauce', description_en: 'With BBQ sauce', price: 7.50, tags: ['bestseller'] },
          { name: 'Pommes', name_en: 'Fries', price: 4.00, is_vegetarian: true, is_vegan: true },
          { name: 'Nüsse', name_en: 'Nuts', price: 3.00, is_vegetarian: true, is_vegan: true },
        ],
      },
      {
        name: 'Alkoholfrei',
        name_en: 'Non-Alcoholic',
        items: [
          { name: 'Cola 0,3l', name_en: 'Cola 0.3l', price: 3.00, is_vegetarian: true, is_vegan: true },
          { name: 'Wasser 0,5l', name_en: 'Water 0.5l', price: 2.50, is_vegetarian: true, is_vegan: true },
          { name: 'Alkoholfreies Bier 0,33l', name_en: 'Non-Alcoholic Beer 0.33l', price: 3.50, is_vegetarian: true, is_vegan: true },
          { name: 'Virgin Mojito', name_en: 'Virgin Mojito', description: 'Ohne Alkohol', description_en: 'Non-alcoholic', price: 5.50, is_vegetarian: true, is_vegan: true },
        ],
      },
    ],
  },
];

// Helper to get a template by ID
export function getTemplateById(id: string): RestaurantTemplate | undefined {
  return RESTAURANT_TEMPLATES.find(t => t.id === id);
}
