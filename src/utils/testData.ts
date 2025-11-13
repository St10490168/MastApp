import { MenuItem } from './types';

// Test data to verify filtering works correctly
export const TEST_MENU_ITEMS: MenuItem[] = [
  // Starters
  { id: 'test1', name: 'Test Bruschetta', description: 'Test starter 1', course: 'Starters', price: '100.00' },
  { id: 'test2', name: 'Test Salad', description: 'Test starter 2', course: 'Starters', price: '120.00' },
  
  // Mains  
  { id: 'test3', name: 'Test Salmon', description: 'Test main 1', course: 'Mains', price: '250.00' },
  { id: 'test4', name: 'Test Beef', description: 'Test main 2', course: 'Mains', price: '300.00' },
  { id: 'test5', name: 'Test Chicken', description: 'Test main 3', course: 'Mains', price: '200.00' },
  
  // Desserts
  { id: 'test6', name: 'Test Cake', description: 'Test dessert 1', course: 'Desserts', price: '80.00' },
];

// Expected filter results
export const EXPECTED_FILTER_RESULTS = {
  all: 6,
  starters: 2,
  mains: 3, 
  desserts: 1
};