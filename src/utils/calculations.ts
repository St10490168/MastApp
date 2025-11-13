import { MenuItem } from './types';

export const calculateAverage = (items: MenuItem[], courseFilter?: string): number => {
  const targetItems = courseFilter ? items.filter(item => item.course === courseFilter) : items;
  if (!targetItems.length) return 0;
  
  const sum = targetItems.reduce((total, item) => total + Number(item.price), 0);
  return sum / targetItems.length;
};

export const filterByCourse = (items: MenuItem[], course: string): MenuItem[] => 
  items.filter(item => item.course === course);