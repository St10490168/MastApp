import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { MenuItem, COURSE_OPTIONS } from '../utils/types';
import { getItemsByCourse } from '../utils/menuUtils';
import { MenuItemCard } from '../components/MenuItemCard';

interface FilterMenuScreenProps {
  menuItems: MenuItem[];
  onBack: () => void;
}

export const FilterMenuScreen: React.FC<FilterMenuScreenProps> = ({ menuItems, onBack }) => {
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);

  const filteredItems = selectedCourse 
    ? getItemsByCourse(menuItems, selectedCourse)
    : menuItems;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Filter Menu</Text>
      </View>
      
      <Text style={styles.title}>Filter by Course</Text>
      
      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={[styles.filterButton, !selectedCourse && styles.activeFilter]}
          onPress={() => setSelectedCourse(null)}
        >
          <Text style={[styles.filterText, !selectedCourse && styles.activeFilterText]}>
            All ({menuItems.length})
          </Text>
        </TouchableOpacity>
        
        {COURSE_OPTIONS.map(course => {
          const courseItems = getItemsByCourse(menuItems, course);
          return (
            <TouchableOpacity
              key={course}
              style={[styles.filterButton, selectedCourse === course && styles.activeFilter]}
              onPress={() => setSelectedCourse(course)}
            >
              <Text style={[styles.filterText, selectedCourse === course && styles.activeFilterText]}>
                {course} ({courseItems.length})
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <Text style={styles.subtitle}>
        {selectedCourse ? `${selectedCourse} (${filteredItems.length})` : `All Items (${filteredItems.length})`}
      </Text>

      <FlatList
        data={filteredItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <MenuItemCard item={item} />}
        style={styles.list}
      />
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
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
  },
  backButton: {
    position: 'absolute',
    left: 20,
    top: 50,
    padding: 10,
  },
  backButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#8B4513',
    marginBottom: 20,
    textAlign: 'center',
    marginTop: 20,
  },
  filterContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  filterButton: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    margin: 4,
    borderWidth: 2,
    borderColor: '#F4A460',
  },
  activeFilter: {
    backgroundColor: '#D2691E',
    borderColor: '#D2691E',
  },
  filterText: {
    color: '#8B4513',
    fontWeight: '600',
  },
  activeFilterText: {
    color: '#FFFFFF',
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
});