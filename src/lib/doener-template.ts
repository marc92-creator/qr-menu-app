export interface TemplateCategory {
  name: string;
  items: {
    name: string;
    description?: string;
    price: number;
  }[];
}

export const doenerTemplate: TemplateCategory[] = [
  {
    name: 'Döner',
    items: [
      { name: 'Döner im Brot', description: 'Mit frischem Salat und Soße', price: 5.50 },
      { name: 'Döner Teller', description: 'Mit Reis oder Pommes und Salat', price: 7.50 },
      { name: 'Vegetarischer Döner', description: 'Mit Falafel, Salat und Soße', price: 5.00 },
    ],
  },
  {
    name: 'Beilagen',
    items: [
      { name: 'Pommes', description: 'Knusprige Pommes Frites', price: 3.00 },
      { name: 'Salat', description: 'Gemischter Salat mit Dressing', price: 4.50 },
      { name: 'Ayran', description: 'Traditionelles Joghurtgetränk', price: 2.00 },
    ],
  },
  {
    name: 'Getränke',
    items: [
      { name: 'Cola 0,33l', price: 2.50 },
      { name: 'Wasser 0,5l', price: 2.00 },
    ],
  },
];
