import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, TextInput, Alert, ScrollView } from 'react-native';

interface MenuItem {
  id: string;
  name: string;
  description: string;
  course: string;
  price: string;
}

const PREDEFINED_ITEMS: MenuItem[] = [
  { id: '1', name: 'Bruschetta', description: 'Toasted bread with tomatoes and basil', course: 'Starters', price: '129.99' },
  { id: '2', name: 'Caesar Salad', description: 'Fresh romaine with parmesan and croutons', course: 'Starters', price: '145.00' },
  { id: '3', name: 'Grilled Salmon', description: 'Atlantic salmon with lemon herbs', course: 'Mains', price: '289.99' },
  { id: '4', name: 'Beef Tenderloin', description: 'Premium cut with red wine reduction', course: 'Mains', price: '350.00' },
  { id: '5', name: 'Chocolate Lava Cake', description: 'Warm chocolate cake with molten center', course: 'Desserts', price: '99.99' },
  { id: '6', name: 'Tiramisu', description: 'Classic Italian coffee-flavored dessert', course: 'Desserts', price: '85.00' }
];

const MenuItemCard = ({ item }: { item: MenuItem }) => (
  <View style={styles.card}>
    <Text style={styles.name}>{item.name}</Text>
    <Text style={styles.course}>Course: {item.course}</Text>
    <Text style={styles.description}>{item.description}</Text>
    <Text style={styles.price}>Price: R{item.price}</Text>
  </View>
);

export default function App() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>(PREDEFINED_ITEMS);
  const [showAddForm, setShowAddForm] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [course, setCourse] = useState('Starters');
  const [showDropdown, setShowDropdown] = useState(false);
  
  const courseOptions = ['Starters', 'Mains', 'Desserts'];
  const [price, setPrice] = useState('');

  const handleAddItem = () => {
    if (!name || !description || !price) {
      Alert.alert('Error', 'Please fill out all fields.');
      return;
    }

    const newItem: MenuItem = {
      id: Date.now().toString(),
      name,
      description,
      course,
      price,
    };

    setMenuItems([...menuItems, newItem]);
    setName('');
    setDescription('');
    setCourse('Starters');
    setShowDropdown(false);
    setPrice('');
    setShowAddForm(false);
  };

  if (showAddForm) {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Add Menu Item</Text>
        </View>
        
        <View style={styles.formContainer}>
          <Text style={styles.label}>Dish Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter dish name"
            value={name}
            onChangeText={setName}
          />

          <Text style={styles.label}>Description</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter description"
            value={description}
            onChangeText={setDescription}
            multiline
          />

          <Text style={styles.label}>Course</Text>
          <TouchableOpacity 
            style={styles.dropdown}
            onPress={() => setShowDropdown(!showDropdown)}
          >
            <Text style={styles.dropdownText}>{course || 'Select Course'}</Text>
            <Text style={styles.dropdownArrow}>▼</Text>
          </TouchableOpacity>
          
          {showDropdown && (
            <View style={styles.dropdownList}>
              {courseOptions.map((option) => (
                <TouchableOpacity
                  key={option}
                  style={styles.dropdownItem}
                  onPress={() => {
                    setCourse(option);
                    setShowDropdown(false);
                  }}
                >
                  <Text style={styles.dropdownItemText}>{option}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}

          <Text style={styles.label}>Price</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter price"
            value={price}
            onChangeText={setPrice}
            keyboardType="numeric"
          />

          <TouchableOpacity style={styles.addButton} onPress={handleAddItem}>
            <Text style={styles.addButtonText}>Add Item</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.cancelButton} onPress={() => setShowAddForm(false)}>
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Chef Christoffel Menu</Text>
      </View>
      
      <Text style={styles.title}>Prepared Menu</Text>
      <Text style={styles.subtitle}>Total Items: {menuItems.length}</Text>

      <FlatList
        data={menuItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <MenuItemCard item={item} />}
        style={styles.list}
      />

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setShowAddForm(true)}
      >
        <Text style={styles.addButtonText}>+ Add Menu Item</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF8F0',
  },
  header: {
    backgroundColor: '#D2691E',
    padding: 20,
    paddingTop: 50,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#8B4513',
    marginBottom: 10,
    textAlign: 'center',
    marginTop: 20,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
    color: '#A0522D',
    textAlign: 'center',
    fontWeight: '600',
  },
  list: {
    flex: 1,
    paddingHorizontal: 20,
  },
  card: {
    padding: 18,
    marginVertical: 8,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#F4A460',
    shadowColor: '#D2691E',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#8B4513',
    marginBottom: 4,
  },
  course: {
    fontSize: 14,
    color: '#CD853F',
    fontWeight: '600',
    backgroundColor: '#FFF8DC',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
  description: {
    fontSize: 14,
    color: '#A0522D',
    marginVertical: 6,
    lineHeight: 18,
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#D2691E',
  },
  addButton: {
    backgroundColor: '#D2691E',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    margin: 20,
    shadowColor: '#8B4513',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  formContainer: {
    padding: 24,
    backgroundColor: '#FFFFFF',
    margin: 20,
    borderRadius: 16,
    shadowColor: '#D2691E',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#8B4513',
    fontWeight: '600',
  },
  input: {
    borderWidth: 2,
    borderColor: '#F4A460',
    padding: 12,
    marginBottom: 16,
    borderRadius: 8,
    backgroundColor: '#FFF8F0',
    fontSize: 16,
  },
  cancelButton: {
    backgroundColor: '#DEB887',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 12,
  },
  cancelButtonText: {
    color: '#8B4513',
    fontSize: 16,
    fontWeight: 'bold',
  },
  dropdown: {
    borderWidth: 2,
    borderColor: '#F4A460',
    padding: 12,
    marginBottom: 16,
    borderRadius: 8,
    backgroundColor: '#FFF8F0',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dropdownText: {
    fontSize: 16,
    color: '#8B4513',
  },
  dropdownArrow: {
    fontSize: 12,
    color: '#8B4513',
  },
  dropdownList: {
    borderWidth: 2,
    borderColor: '#F4A460',
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    marginBottom: 16,
    marginTop: -16,
  },
  dropdownItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F4A460',
  },
  dropdownItemText: {
    fontSize: 16,
    color: '#8B4513',
  },
});