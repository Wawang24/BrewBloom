export type Drink = {
  id: string;
  name: string;
  notes: string;
  price: number;
  emoji: string;
  tint: string;
};

export const SIZES = [
  { label: 'Small', extra: 0 },
  { label: 'Medium', extra: 20 },
  { label: 'Large', extra: 40 },
];

export const MENU: Drink[] = [
  { id: 'c1', name: 'Bloom Latte', notes: 'Espresso, steamed milk, dried rose petal', price: 165, emoji: '🌸', tint: '#FBE3E8' },
  { id: 'c2', name: 'Cold Brew', notes: 'Steeped for 18 hours, served over ice', price: 150, emoji: '🧊', tint: '#DDEBE4' },
  { id: 'c3', name: 'Flat White', notes: 'Double ristretto with silky milk', price: 140, emoji: '☕', tint: '#EFE0D6' },
  { id: 'c4', name: 'Spanish Latte', notes: 'Condensed milk and double espresso', price: 155, emoji: '🥛', tint: '#F6E7CF' },
  { id: 'c5', name: 'Jasmine Tea', notes: 'Light green tea with jasmine flowers', price: 120, emoji: '🌼', tint: '#F8F0C6' },
  { id: 'c6', name: 'Ube Croissant', notes: 'Buttery pastry with ube cream', price: 135, emoji: '🥐', tint: '#E6DCF2' },
];

export const findDrink = (id?: string) => MENU.find((drink) => drink.id === id);