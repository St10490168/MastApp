import { MenuItem } from './types';

export const calculateAveragePrice = (items: MenuItem[], course?: string): number => {
  const filteredItems = course ? items.filter(item => item.course === course) : items;
  if (filteredItems.length === 0) return 0;
  
  const total = filteredItems.reduce((sum, item) => sum + parseFloat(item.price), 0);
  return total / filteredItems.length;
};

export const getItemsByCourse = (items: MenuItem[], course: string): MenuItem[] => {
  return items.filter(item => item.course === course);
};

export const PREDEFINED_ITEMS: MenuItem[] = [
  { id: '1', name: 'Bruschetta', description: 'Toasted bread with tomatoes and basil', course: 'Starters', price: '129.99' },
  { id: '2', name: 'Caesar Salad', description: 'Fresh romaine with parmesan and croutons', course: 'Starters', price: '145.00' },
  { id: '3', name: 'Grilled Salmon', description: 'Atlantic salmon with lemon herbs', course: 'Mains', price: '289.99' },
  { id: '4', name: 'Beef Tenderloin', description: 'Premium cut with red wine reduction', course: 'Mains', price: '350.00' },
  { id: '5', name: 'Chocolate Lava Cake', description: 'Warm chocolate cake with molten center', course: 'Desserts', price: '99.99' },
  { id: '6', name: 'Tiramisu', description: 'Classic Italian coffee-flavored dessert', course: 'Desserts', price: '85.00' }
];