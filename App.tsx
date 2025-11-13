import React, { useState, useCallback } from 'react';
import { MenuItem } from './src/utils/types';
import { INITIAL_MENU_ITEMS } from './src/utils/menuData';
import { HomeScreen } from './src/screens/HomeScreen';
import { ManageMenuScreen } from './src/screens/ManageMenuScreen';
import { FilterMenuScreen } from './src/screens/FilterMenuScreen';

type ScreenType = 'home' | 'manage' | 'filter';

export default function App() {
  const [items, setItems] = useState<MenuItem[]>(INITIAL_MENU_ITEMS);
  const [screen, setScreen] = useState<ScreenType>('home');

  const addItem = useCallback((newItem: MenuItem) => {
    setItems(prev => [...prev, newItem]);
  }, []);

  const removeItem = useCallback((itemId: string) => {
    setItems(prev => prev.filter(item => item.id !== itemId));
  }, []);

  const navigate = useCallback((destination: ScreenType) => {
    setScreen(destination);
  }, []);

  const screenProps = {
    menuItems: items,
    onBack: () => navigate('home')
  };

  switch (screen) {
    case 'manage':
      return <ManageMenuScreen {...screenProps} onAddItem={addItem} onRemoveItem={removeItem} />;
    case 'filter':
      return <FilterMenuScreen {...screenProps} />;
    default:
      return (
        <HomeScreen 
          menuItems={items}
          onNavigateToManage={() => navigate('manage')}
          onNavigateToFilter={() => navigate('filter')}
        />
      );
  }
}

