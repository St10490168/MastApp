import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, TextInput, Alert, ScrollView, SafeAreaView, StatusBar } from 'react-native';

interface MenuItem {
  id: string;
  name: string;
  description: string;
  course: string;
  price: string;
}

const COURSES = ['Starters', 'Mains', 'Desserts'];

const INITIAL_ITEMS: MenuItem[] = [
  { id: '1', name: 'Bruschetta', description: 'Toasted bread with tomatoes and basil', course: 'Starters', price: '129.99' },
  { id: '2', name: 'Caesar Salad', description: 'Fresh romaine with parmesan and croutons', course: 'Starters', price: '145.00' },
  { id: '3', name: 'Grilled Salmon', description: 'Atlantic salmon with lemon herbs', course: 'Mains', price: '289.99' },
  { id: '4', name: 'Beef Tenderloin', description: 'Premium cut with red wine reduction', course: 'Mains', price: '350.00' },
  { id: '5', name: 'Chocolate Cake', description: 'Warm chocolate cake with molten center', course: 'Desserts', price: '99.99' },
  { id: '6', name: 'Tiramisu', description: 'Classic Italian coffee-flavored dessert', course: 'Desserts', price: '85.00' }
];

/**
 * Calculate average price for menu items
 * Returns average price for all items or by course
 * Returns 0 if no items found
 */
const calculateAverage = (items: MenuItem[], course?: string): number => {
  const filtered = course ? items.filter(item => item.course === course) : items;
  if (!filtered.length) return 0;
  const sum = filtered.reduce((total, item) => total + Number(item.price), 0);
  return sum / filtered.length;
};

/**
 * Generate unique ID for menu items
 * Uses timestamp and random string
 */
const generateId = () => `item_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

const MenuCard = ({ item, canRemove, onRemove }: { item: MenuItem; canRemove?: boolean; onRemove?: (id: string) => void }) => {
  /**
   * Delete menu item with confirmation
   * Shows dialog to prevent accidents
   */
  const handleRemove = () => {
    Alert.alert(
      'Remove Item',
      `Remove "${item.name}" from menu?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Remove', style: 'destructive', onPress: () => onRemove?.(item.id) }
      ]
    );
  };

  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.itemName}>{item.name}</Text>
        <View style={styles.courseTag}>
          <Text style={styles.courseText}>{item.course}</Text>
        </View>
      </View>
      <Text style={styles.description}>{item.description}</Text>
      <View style={styles.cardFooter}>
        <Text style={styles.price}>R{item.price}</Text>
        {canRemove && (
          <TouchableOpacity style={styles.removeBtn} onPress={handleRemove}>
            <Text style={styles.removeBtnText}>Remove</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const HomeScreen = ({ items, onManage, onFilter }: { items: MenuItem[]; onManage: () => void; onFilter: () => void }) => (
  <SafeAreaView style={styles.container}>
    <StatusBar barStyle="light-content" backgroundColor="#D2691E" />
    <View style={styles.header}>
      <Text style={styles.headerTitle}>Chef Christoffel Menu</Text>
    </View>
    
    <ScrollView style={styles.content}>
      <Text style={styles.title}>Complete Menu ({items.length} items)</Text>
      
      <View style={styles.priceCard}>
        <Text style={styles.sectionTitle}>Average Prices by Course</Text>
        <View style={styles.priceGrid}>
          {COURSES.map(course => (
            <View key={course} style={styles.priceItem}>
              <Text style={styles.courseLabel}>{course}</Text>
              <Text style={styles.priceValue}>R{calculateAverage(items, course).toFixed(2)}</Text>
            </View>
          ))}
        </View>
        <View style={styles.totalPrice}>
          <Text style={styles.totalLabel}>Overall Average</Text>
          <Text style={styles.totalValue}>R{calculateAverage(items).toFixed(2)}</Text>
        </View>
      </View>

      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <MenuCard item={item} />}
        scrollEnabled={false}
      />
    </ScrollView>

    <View style={styles.buttonRow}>
      <TouchableOpacity style={styles.button} onPress={onManage}>
        <Text style={styles.buttonText}>Manage Menu</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={onFilter}>
        <Text style={styles.buttonText}>Filter Menu</Text>
      </TouchableOpacity>
    </View>
  </SafeAreaView>
);

const ManageScreen = ({ items, onAdd, onRemove, onBack }: { items: MenuItem[]; onAdd: (item: MenuItem) => void; onRemove: (id: string) => void; onBack: () => void }) => {
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [course, setCourse] = useState('Starters');
  const [price, setPrice] = useState('');

  /**
   * Add new menu item with validation
   * Checks all fields are filled and price is valid
   * Resets form and shows success message
   */
  const handleAdd = () => {
    // Check all fields are filled
    if (!name.trim() || !description.trim() || !price.trim()) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }
    
    // Check price is a valid number
    const priceNum = Number(price.replace(/[^0-9.]/g, ''));
    if (isNaN(priceNum) || priceNum <= 0) {
      Alert.alert('Error', 'Please enter a valid price');
      return;
    }

    // Create new menu item
    onAdd({
      id: generateId(),
      name: name.trim(),
      description: description.trim(),
      course,
      price: priceNum.toFixed(2)
    });

    // Reset form and show success
    setName('');
    setDescription('');
    setPrice('');
    setShowForm(false);
    Alert.alert('Success', 'Item added to menu!');
  };

  if (showForm) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#D2691E" />
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => setShowForm(false)}>
            <Text style={styles.backBtn}>← Cancel</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Add Menu Item</Text>
        </View>
        
        <ScrollView style={styles.form}>
          <Text style={styles.formTitle}>New Dish Details</Text>
          
          <Text style={styles.label}>Dish Name</Text>
          <TextInput 
            style={styles.input} 
            value={name} 
            onChangeText={setName} 
            placeholder="Enter dish name"
            placeholderTextColor="#999"
          />
          
          <Text style={styles.label}>Description</Text>
          <TextInput 
            style={[styles.input, styles.textArea]} 
            value={description} 
            onChangeText={setDescription} 
            placeholder="Enter description"
            placeholderTextColor="#999"
            multiline
            numberOfLines={3}
          />
          
          <Text style={styles.label}>Course</Text>
          <View style={styles.courseButtons}>
            {COURSES.map(c => (
              <TouchableOpacity 
                key={c} 
                style={[styles.courseBtn, course === c && styles.activeCourseBtn]} 
                onPress={() => setCourse(c)}
              >
                <Text style={[styles.courseBtnText, course === c && styles.activeBtnText]}>{c}</Text>
              </TouchableOpacity>
            ))}
          </View>
          
          <Text style={styles.label}>Price (R)</Text>
          <TextInput 
            style={styles.input} 
            value={price} 
            onChangeText={setPrice} 
            placeholder="0.00"
            placeholderTextColor="#999"
            keyboardType="decimal-pad"
          />
          
          <TouchableOpacity style={styles.addBtn} onPress={handleAdd}>
            <Text style={styles.addBtnText}>Add to Menu</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#D2691E" />
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Text style={styles.backBtn}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Manage Menu</Text>
      </View>
      
      <Text style={styles.title}>Menu Items ({items.length})</Text>
      
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <MenuCard item={item} canRemove onRemove={onRemove} />}
        style={styles.list}
      />
      
      <TouchableOpacity style={styles.addBtn} onPress={() => setShowForm(true)}>
        <Text style={styles.addBtnText}>+ Add New Item</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const FilterScreen = ({ items, onBack }: { items: MenuItem[]; onBack: () => void }) => {
  const [filter, setFilter] = useState<string | null>(null);
  const filtered = filter ? items.filter(item => item.course === filter) : items;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#D2691E" />
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Text style={styles.backBtn}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Filter Menu</Text>
      </View>
      
      <Text style={styles.title}>Filter by Course</Text>
      
      <View style={styles.filterCard}>
        <Text style={styles.filterTitle}>Choose a category</Text>
        <View style={styles.filterButtons}>
          <TouchableOpacity 
            style={[styles.filterBtn, !filter && styles.activeFilter]} 
            onPress={() => setFilter(null)}
          >
            <Text style={[styles.filterText, !filter && styles.activeFilterText]}>All</Text>
            <Text style={[styles.filterCount, !filter && styles.activeFilterText]}>({items.length})</Text>
          </TouchableOpacity>
          {COURSES.map(course => {
            const count = items.filter(item => item.course === course).length;
            return (
              <TouchableOpacity 
                key={course} 
                style={[styles.filterBtn, filter === course && styles.activeFilter]} 
                onPress={() => setFilter(course)}
              >
                <Text style={[styles.filterText, filter === course && styles.activeFilterText]}>{course}</Text>
                <Text style={[styles.filterCount, filter === course && styles.activeFilterText]}>({count})</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
      
      <Text style={styles.subtitle}>Showing {filtered.length} items</Text>
      
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <MenuCard item={item} />}
        style={styles.list}
      />
    </SafeAreaView>
  );
};

/**
 * Main App Component
 * Manages menu items and screen navigation
 */
export default function App() {
  // State: Menu items stored in React state (CRUD - Read)
  const [items, setItems] = useState<MenuItem[]>(INITIAL_ITEMS);
  const [screen, setScreen] = useState<'home' | 'manage' | 'filter'>('home');

  /**
   * Add item to menu
   * Updates state array
   */
  const addItem = useCallback((item: MenuItem) => {
    setItems(prev => [...prev, item]);
  }, []);

  /**
   * Remove item from menu
   * Filters out item by ID
   */
  const removeItem = useCallback((id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
  }, []);

  switch (screen) {
    case 'manage':
      return <ManageScreen items={items} onAdd={addItem} onRemove={removeItem} onBack={() => setScreen('home')} />;
    case 'filter':
      return <FilterScreen items={items} onBack={() => setScreen('home')} />;
    default:
      return <HomeScreen items={items} onManage={() => setScreen('manage')} onFilter={() => setScreen('filter')} />;
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF8F0' },
  header: { backgroundColor: '#D2691E', paddingHorizontal: 20, paddingVertical: 15, flexDirection: 'row', alignItems: 'center' },
  headerTitle: { color: '#FFF', fontSize: 20, fontWeight: 'bold', flex: 1, textAlign: 'center' },
  backButton: { position: 'absolute', left: 20, zIndex: 1 },
  backBtn: { color: '#FFF', fontSize: 16, fontWeight: 'bold' },
  content: { flex: 1 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#8B4513', textAlign: 'center', marginVertical: 20 },
  subtitle: { fontSize: 16, color: '#A0522D', textAlign: 'center', marginBottom: 20 },
  
  priceCard: { backgroundColor: '#FFF', margin: 20, padding: 16, borderRadius: 12, elevation: 2, shadowOpacity: 0.1, shadowRadius: 4 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#8B4513', textAlign: 'center', marginBottom: 16 },
  priceGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginBottom: 16 },
  priceItem: { width: '48%', backgroundColor: '#FFF8F0', padding: 12, borderRadius: 8, alignItems: 'center', marginBottom: 8 },
  courseLabel: { fontSize: 14, color: '#A0522D', marginBottom: 4, fontWeight: '500' },
  priceValue: { fontSize: 16, fontWeight: 'bold', color: '#D2691E' },
  totalPrice: { backgroundColor: '#D2691E', padding: 12, borderRadius: 8, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  totalLabel: { color: '#FFF', fontSize: 16, fontWeight: '600' },
  totalValue: { color: '#FFF', fontSize: 18, fontWeight: 'bold' },
  
  card: { backgroundColor: '#FFF', marginHorizontal: 20, marginVertical: 8, padding: 16, borderRadius: 12, elevation: 2, shadowOpacity: 0.1, shadowRadius: 4 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 },
  itemName: { fontSize: 18, fontWeight: 'bold', color: '#8B4513', flex: 1, marginRight: 8 },
  courseTag: { backgroundColor: '#F4A460', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4 },
  courseText: { fontSize: 12, fontWeight: '600', color: '#8B4513', textTransform: 'uppercase' },
  description: { fontSize: 14, color: '#A0522D', marginBottom: 12, lineHeight: 20 },
  cardFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  price: { fontSize: 16, fontWeight: 'bold', color: '#D2691E' },
  removeBtn: { backgroundColor: '#F44336', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 6 },
  removeBtnText: { color: '#FFF', fontSize: 14, fontWeight: '600' },
  
  buttonRow: { flexDirection: 'row', justifyContent: 'space-between', padding: 20 },
  button: { backgroundColor: '#D2691E', padding: 16, borderRadius: 12, flex: 0.48, alignItems: 'center' },
  buttonText: { color: '#FFF', fontSize: 16, fontWeight: 'bold' },
  
  form: { flex: 1, padding: 20 },
  formTitle: { fontSize: 20, fontWeight: 'bold', color: '#8B4513', textAlign: 'center', marginBottom: 24 },
  label: { fontSize: 16, fontWeight: '600', color: '#8B4513', marginBottom: 8, marginTop: 16 },
  input: { borderWidth: 1, borderColor: '#E0E0E0', padding: 12, borderRadius: 8, backgroundColor: '#FFF', fontSize: 16, color: '#333' },
  textArea: { height: 80, textAlignVertical: 'top' },
  courseButtons: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 },
  courseBtn: { backgroundColor: '#FFF', padding: 12, borderRadius: 8, borderWidth: 1, borderColor: '#E0E0E0', flex: 0.3, alignItems: 'center' },
  activeCourseBtn: { backgroundColor: '#D2691E', borderColor: '#D2691E' },
  courseBtnText: { color: '#8B4513', fontWeight: '600' },
  activeBtnText: { color: '#FFF' },
  addBtn: { backgroundColor: '#D2691E', padding: 16, borderRadius: 12, alignItems: 'center', marginTop: 24, marginHorizontal: 20 },
  addBtnText: { color: '#FFF', fontSize: 16, fontWeight: 'bold' },
  
  filterCard: { backgroundColor: '#FFF', margin: 20, padding: 16, borderRadius: 12, elevation: 2, shadowOpacity: 0.1, shadowRadius: 4 },
  filterTitle: { fontSize: 18, fontWeight: 'bold', color: '#8B4513', textAlign: 'center', marginBottom: 16 },
  filterButtons: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  filterBtn: { backgroundColor: '#FFF8F0', padding: 12, borderRadius: 20, marginBottom: 8, minWidth: '48%', alignItems: 'center', borderWidth: 2, borderColor: '#E0E0E0' },
  activeFilter: { backgroundColor: '#D2691E', borderColor: '#D2691E' },
  filterText: { color: '#8B4513', fontWeight: '600', marginBottom: 4 },
  filterCount: { color: '#D2691E', fontWeight: 'bold', fontSize: 16 },
  activeFilterText: { color: '#FFF' },
  
  list: { flex: 1 },
});

