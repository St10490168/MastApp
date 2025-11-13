import { MenuItem, CourseType } from './types';

export const calculateAverage = (items: MenuItem[], courseFilter?: string): number => {
  try {
    if (!items || !Array.isArray(items) || items.length === 0) return 0;
    
    const targetItems = courseFilter 
      ? items.filter(item => item && item.course === courseFilter) 
      : items.filter(item => item); // Filter out null/undefined items
    
    if (!targetItems.length) return 0;
    
    const validPrices = targetItems
      .map(item => {
        if (!item || !item.price) return 0;
        const price = Number(item.price);
        return isNaN(price) || price < 0 ? 0 : price;
      })
      .filter(price => price > 0);
    
    if (validPrices.length === 0) return 0;
    
    const sum = validPrices.reduce((total, price) => total + price, 0);
    return sum / validPrices.length;
  } catch (error) {
    console.warn('Error calculating average:', error);
    return 0;
  }
};

export const filterByCourse = (items: MenuItem[], course: string): MenuItem[] => {
  if (!items || items.length === 0) return [];
  return items.filter(item => item.course === course);
};

export const getCourseCount = (items: MenuItem[], course: string): number => {
  return filterByCourse(items, course).length;
};

export const getAllCourseCounts = (items: MenuItem[]): Record<string, number> => {
  if (!items || items.length === 0) return {};
  
  return items.reduce((counts, item) => {
    counts[item.course] = (counts[item.course] || 0) + 1;
    return counts;
  }, {} as Record<string, number>);
};