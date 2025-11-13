import React, { useState } from 'react';
import { MenuItem } from './src/utils/types';
import { PREDEFINED_ITEMS } from './src/utils/menuUtils';
import { HomeScreen } from './src/screens/HomeScreen';
import { ManageMenuScreen } from './src/screens/ManageMenuScreen';
import { FilterMenuScreen } from './src/screens/FilterMenuScreen';

type Screen = 'home' | 'manage' | 'filter';

export default function App() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>(PREDEFINED_ITEMS);
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');

  const handleAddItem = (item: MenuItem) => {
    setMenuItems([...menuItems, item]);
  };

  const handleRemoveItem = (id: string) => {
    setMenuItems(menuItems.filter(item => item.id !== id));
  };

  const navigateToHome = () => setCurrentScreen('home');
  const navigateToManage = () => setCurrentScreen('manage');
  const navigateToFilter = () => setCurrentScreen('filter');

  switch (currentScreen) {
    case 'manage':
      return (
        <ManageMenuScreen
          menuItems={menuItems}
          onAddItem={handleAddItem}
          onRemoveItem={handleRemoveItem}
          onBack={navigateToHome}
        />
      );
    case 'filter':
      return (
        <FilterMenuScreen
          menuItems={menuItems}
          onBack={navigateToHome}
        />
      );
    default:
      return (
        <HomeScreen
          menuItems={menuItems}
          onNavigateToManage={navigateToManage}
          onNavigateToFilter={navigateToFilter}
        />
      );
  }
}

