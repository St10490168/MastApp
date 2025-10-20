import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, TextInput, Alert } from 'react-native';

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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Christoffel's Menu</Text>
      
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
        
        <Text style={styles.label}>Select Course:</Text>
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

      <FlatList
        data={menuItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.menuItem}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemCourse}>{item.course}</Text>
            <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
          </View>
        )}
      />
    </View>
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
    marginBottom: 30,
    color: '#2c3e50',
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
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
    color: '#2c3e50',
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
  menuItem: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
    flex: 2,
  },
  itemCourse: {
    fontSize: 14,
    color: '#7f8c8d',
    flex: 1,
    textAlign: 'center',
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#27ae60',
  },
});