import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { MenuItem, COURSE_OPTIONS } from '../utils/types';
import { calculateAveragePrice } from '../utils/menuUtils';
import { MenuItemCard } from '../components/MenuItemCard';

interface HomeScreenProps {
  menuItems: MenuItem[];
  onNavigateToManage: () => void;
  onNavigateToFilter: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ menuItems, onNavigateToManage, onNavigateToFilter }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Chef Christoffel Menu</Text>
      </View>
      
      <Text style={styles.title}>Complete Menu</Text>
      <Text style={styles.subtitle}>Total Items: {menuItems.length}</Text>

      <View style={styles.averageSection}>
        <Text style={styles.averageTitle}>Average Prices by Course:</Text>
        {COURSE_OPTIONS.map(course => (
          <Text key={course} style={styles.averageText}>
            {course}: R{calculateAveragePrice(menuItems, course).toFixed(2)}
          </Text>
        ))}
        <Text style={styles.averageText}>
          Overall: R{calculateAveragePrice(menuItems).toFixed(2)}
        </Text>
      </View>

      <FlatList
        data={menuItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <MenuItemCard item={item} />}
        style={styles.list}
      />

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={onNavigateToManage}>
          <Text style={styles.buttonText}>Manage Menu</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={onNavigateToFilter}>
          <Text style={styles.buttonText}>Filter Menu</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

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
  averageSection: {
    backgroundColor: '#FFFFFF',
    margin: 20,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#F4A460',
  },
  averageTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#8B4513',
    marginBottom: 8,
  },
  averageText: {
    fontSize: 16,
    color: '#D2691E',
    marginBottom: 4,
  },
  list: {
    flex: 1,
    paddingHorizontal: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
  },
  button: {
    backgroundColor: '#D2691E',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    flex: 0.45,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});