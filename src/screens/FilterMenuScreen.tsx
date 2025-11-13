import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { MenuItem, COURSES } from '../utils/types';
import { filterByCourse } from '../utils/calculations';
import { MenuItemCard } from '../components/MenuItemCard';
import { theme } from '../utils/theme';
import { commonStyles } from '../utils/commonStyles';

interface FilterMenuScreenProps {
  menuItems: MenuItem[];
  onBack: () => void;
}

export const FilterMenuScreen: React.FC<FilterMenuScreenProps> = ({ menuItems, onBack }) => {
  const [activeCourse, setActiveCourse] = useState<string | null>(null);

  const displayedItems = activeCourse 
    ? filterByCourse(menuItems, activeCourse)
    : menuItems;

  return (
    <View style={commonStyles.container}>
      <View style={commonStyles.header}>
        <TouchableOpacity style={commonStyles.backButton} onPress={onBack}>
          <Text style={commonStyles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <Text style={commonStyles.headerTitle}>Filter Menu</Text>
      </View>
      
      <Text style={commonStyles.screenTitle}>Filter by Course</Text>
      
      <View style={[commonStyles.card, styles.filterCard]}>
        <Text style={styles.filterTitle}>Choose a category</Text>
        <View style={styles.filterGrid}>
          <TouchableOpacity
            style={[styles.filterChip, !activeCourse && styles.activeChip]}
            onPress={() => setActiveCourse(null)}
          >
            <Text style={[styles.chipText, !activeCourse && styles.activeChipText]}>
              All
            </Text>
            <Text style={[styles.chipCount, !activeCourse && styles.activeChipCount]}>
              {menuItems.length}
            </Text>
          </TouchableOpacity>
          
          {COURSES.map(course => {
            const courseCount = filterByCourse(menuItems, course).length;
            const isActive = activeCourse === course;
            return (
              <TouchableOpacity
                key={course}
                style={[styles.filterChip, isActive && styles.activeChip]}
                onPress={() => setActiveCourse(course)}
              >
                <Text style={[styles.chipText, isActive && styles.activeChipText]}>
                  {course}
                </Text>
                <Text style={[styles.chipCount, isActive && styles.activeChipCount]}>
                  {courseCount}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      <Text style={commonStyles.subtitle}>
        Showing {displayedItems.length} {activeCourse ? activeCourse.toLowerCase() : 'items'}
      </Text>

      <FlatList
        data={displayedItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <MenuItemCard item={item} />}
        style={commonStyles.list}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  filterCard: {
    marginBottom: theme.spacing.md,
  },
  filterTitle: {
    fontSize: theme.fontSizes.lg,
    fontWeight: 'bold',
    color: theme.colors.secondary,
    textAlign: 'center',
    marginBottom: theme.spacing.lg,
  },
  filterGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  filterChip: {
    backgroundColor: theme.colors.background,
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
    borderRadius: theme.borderRadius.xl,
    marginBottom: theme.spacing.sm,
    minWidth: '48%',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: theme.colors.border,
  },
  activeChip: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  chipText: {
    fontSize: theme.fontSizes.md,
    fontWeight: '600',
    color: theme.colors.secondary,
    marginBottom: theme.spacing.xs,
  },
  activeChipText: {
    color: theme.colors.surface,
  },
  chipCount: {
    fontSize: theme.fontSizes.lg,
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  activeChipCount: {
    color: theme.colors.surface,
  },
});