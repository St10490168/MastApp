import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MenuItemCard from '../components/MenuItemCard';

interface MenuItem {
  id: string;
  name: string;
  description: string;
  course: string;
  price: string;
}

const PREDEFINED_ITEMS: MenuItem[] = [
  { id: '1', name: 'Bruschetta', description: 'Toasted bread with tomatoes and basil', course: 'Starters', price: '12.99' },
  { id: '2', name: 'Caesar Salad', description: 'Fresh romaine with parmesan and croutons', course: 'Starters', price: '14.50' },
  { id: '3', name: 'Grilled Salmon', description: 'Atlantic salmon with lemon herbs', course: 'Mains', price: '28.99' },
  { id: '4', name: 'Beef Tenderloin', description: 'Premium cut with red wine reduction', course: 'Mains', price: '35.00' },
  { id: '5', name: 'Chocolate Lava Cake', description: 'Warm chocolate cake with molten center', course: 'Desserts', price: '9.99' },
  { id: '6', name: 'Tiramisu', description: 'Classic Italian coffee-flavored dessert', course: 'Desserts', price: '8.50' }
];

const HomeScreen = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>(PREDEFINED_ITEMS);
  const navigation = useNavigation();

  const addMenuItem = (newItem: MenuItem) => {
    setMenuItems((prevItems) => [...prevItems, newItem]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Prepared Menu</Text>
      <Text style={styles.subtitle}>Total Items: {menuItems.length}</Text>

      <FlatList
        data={menuItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <MenuItemCard item={item} />}
        ListEmptyComponent={<Text style={styles.emptyText}>No menu items added yet.</Text>}
      />

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('AddMenuItem', { addMenuItem })}
      >
        <Text style={styles.addButtonText}>+ Add Menu Item</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
    color: '#555',
  },
  emptyText: {
    fontSize: 16,
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: 20,
    color: '#888',
  },
  addButton: {
    backgroundColor: '#2E7D32',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default HomeScreen;