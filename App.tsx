import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, TextInput, Alert, ScrollView } from 'react-native';

interface MenuItem {
  id: string;
  name: string;
  course: string;
  price: number;
}

const COURSES = ['Starters', 'Mains', 'Desserts'];

export default function App() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [itemName, setItemName] = useState('');
  const [itemPrice, setItemPrice] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('');

  const addMenuItem = () => {
    if (!itemName || !itemPrice || !selectedCourse) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }

    const newItem: MenuItem = {
      id: Date.now().toString(),
      name: itemName,
      course: selectedCourse,
      price: parseFloat(itemPrice)
    };

    setMenuItems([...menuItems, newItem]);
    setItemName('');
    setItemPrice('');
    setSelectedCourse('');
  };

  const groupedMenu = COURSES.map(course => ({
    course,
    items: menuItems.filter((item: MenuItem) => item.course === course)
  }));

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Christoffel's Menu</Text>
      <Text style={styles.totalItems}>Total Items: {menuItems.length}</Text>
      
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Item Name"
          value={itemName}
          onChangeText={setItemName}
        />
        
        <TextInput
          style={styles.input}
          placeholder="Price"
          value={itemPrice}
          onChangeText={setItemPrice}
          keyboardType="numeric"
        />
        
        <View style={styles.courseButtons}>
          {COURSES.map((course) => (
            <TouchableOpacity
              key={course}
              style={[
                styles.courseButton,
                selectedCourse === course && styles.selectedCourse
              ]}
              onPress={() => setSelectedCourse(course)}
            >
              <Text style={[
                styles.courseText,
                selectedCourse === course && styles.selectedText
              ]}>
                {course}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        
        <TouchableOpacity style={styles.addButton} onPress={addMenuItem}>
          <Text style={styles.addButtonText}>Add to Menu</Text>
        </TouchableOpacity>
      </View>
      
      {groupedMenu.map((section) => (
        <View key={section.course} style={styles.courseSection}>
          <Text style={styles.courseTitle}>{section.course}</Text>
          {section.items.map((menuItem: MenuItem) => (
            <View key={menuItem.id} style={styles.menuItem}>
              <Text style={styles.itemName}>{menuItem.name}</Text>
              <Text style={styles.itemPrice}>${menuItem.price.toFixed(2)}</Text>
            </View>
          ))}
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#2c3e50',
  },
  totalItems: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: '#7f8c8d',
    fontWeight: '600',
  },
  form: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
    fontSize: 16,
  },
  courseButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  courseButton: {
    flex: 1,
    padding: 12,
    borderWidth: 2,
    borderColor: '#3498db',
    borderRadius: 8,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  selectedCourse: {
    backgroundColor: '#3498db',
  },
  courseText: {
    color: '#3498db',
    fontWeight: '600',
  },
  selectedText: {
    color: 'white',
  },
  addButton: {
    backgroundColor: '#27ae60',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  courseSection: {
    backgroundColor: 'white',
    marginBottom: 15,
    borderRadius: 10,
    padding: 15,
  },
  courseTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 10,
    borderBottomWidth: 2,
    borderBottomColor: '#3498db',
    paddingBottom: 5,
  },
  menuItem: {
    backgroundColor: '#f8f9fa',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#27ae60',
  },
});