import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { MenuItem, COURSES } from '../utils/types';
import { filterByCourse, getCourseCount } from '../utils/calculations';
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

  const handleCourseSelect = (course: string | null) => {
    setActiveCourse(course);
  };

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Text style={styles.emptyTitle}>No items found</Text>
      <Text style={styles.emptyText}>
        {activeCourse 
          ? `No ${activeCourse.toLowerCase()} available in the menu`
          : 'No menu items available'
        }
      </Text>
      <TouchableOpacity 
        style={styles.resetButton} 
        onPress={() => handleCourseSelect(null)}
      >
        <Text style={styles.resetButtonText}>Show All Items</Text>
      </TouchableOpacity>
    </View>
  );

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
            onPress={() => handleCourseSelect(null)}
          >
            <Text style={[styles.chipText, !activeCourse && styles.activeChipText]}>
              All
            </Text>
            <Text style={[styles.chipCount, !activeCourse && styles.activeChipCount]}>
              {menuItems.length}
            </Text>
          </TouchableOpacity>
          
          {COURSES.map(course => {
            const courseCount = getCourseCount(menuItems, course);
            const isActive = activeCourse === course;
            return (
              <TouchableOpacity
                key={course}
                style={[
                  styles.filterChip, 
                  isActive && styles.activeChip,
                  courseCount === 0 && styles.disabledChip
                ]}
                onPress={() => courseCount > 0 && handleCourseSelect(course)}
                disabled={courseCount === 0}
              >
                <Text style={[
                  styles.chipText, 
                  isActive && styles.activeChipText,
                  courseCount === 0 && styles.disabledChipText
                ]}>
                  {course}
                </Text>
                <Text style={[
                  styles.chipCount, 
                  isActive && styles.activeChipCount,
                  courseCount === 0 && styles.disabledChipCount
                ]}>
                  {courseCount}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      <Text style={commonStyles.subtitle}>
        {displayedItems.length > 0 
          ? `Showing ${displayedItems.length} ${activeCourse ? activeCourse.toLowerCase() : 'items'}`
          : 'No items match your filter'
        }
      </Text>

      {displayedItems.length > 0 ? (
        <FlatList
          data={displayedItems}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <MenuItemCard item={item} />}
          style={commonStyles.list}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        renderEmptyState()
      )}
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
  disabledChip: {
    backgroundColor: theme.colors.border,
    borderColor: theme.colors.border,
    opacity: 0.5,
  },
  disabledChipText: {
    color: theme.colors.textMuted,
  },
  disabledChipCount: {
    color: theme.colors.textMuted,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.xl,
  },
  emptyTitle: {
    fontSize: theme.fontSizes.xl,
    fontWeight: 'bold',
    color: theme.colors.secondary,
    marginBottom: theme.spacing.sm,
  },
  emptyText: {
    fontSize: theme.fontSizes.md,
    color: theme.colors.textMuted,
    textAlign: 'center',
    marginBottom: theme.spacing.xl,
    lineHeight: 22,
  },
  resetButton: {
    backgroundColor: theme.colors.primary,
    paddingHorizontal: theme.spacing.xl,
    paddingVertical: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
  },
  resetButtonText: {
    color: theme.colors.surface,
    fontSize: theme.fontSizes.md,
    fontWeight: '600',
  },
});