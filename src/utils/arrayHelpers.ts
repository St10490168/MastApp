import { MenuItem } from './types';

export const validateMenuItem = (item: MenuItem): boolean => {
  return !!(
    item.id &&
    item.name.trim() &&
    item.description.trim() &&
    item.course &&
    item.price &&
    !isNaN(Number(item.price)) &&
    Number(item.price) > 0
  );
};

export const generateUniqueId = (): string => {
  return `item_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

export const findItemById = (items: MenuItem[], id: string): MenuItem | undefined => {
  return items.find(item => item.id === id);
};

export const removeItemById = (items: MenuItem[], id: string): MenuItem[] => {
  return items.filter(item => item.id !== id);
};

export const addItemToArray = (items: MenuItem[], newItem: MenuItem): MenuItem[] => {
  if (!validateMenuItem(newItem)) {
    throw new Error('Invalid menu item data');
  }
  
  // Check for duplicate IDs
  if (findItemById(items, newItem.id)) {
    throw new Error('Item with this ID already exists');
  }
  
  return [...items, newItem];
};

export const getArrayStats = (items: MenuItem[]) => {
  return {
    total: items.length,
    starters: items.filter(item => item.course === 'Starters').length,
    mains: items.filter(item => item.course === 'Mains').length,
    desserts: items.filter(item => item.course === 'Desserts').length,
    averagePrice: items.length > 0 
      ? items.reduce((sum, item) => sum + Number(item.price), 0) / items.length 
      : 0
  };
};