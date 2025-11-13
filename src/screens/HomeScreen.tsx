import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { MenuItem, COURSES } from '../utils/types';
import { calculateAverage } from '../utils/calculations';
import { MenuItemCard } from '../components/MenuItemCard';
import { ArrayDebugInfo } from '../components/ArrayDebugInfo';
import { theme } from '../utils/theme';
import { commonStyles } from '../utils/commonStyles';

interface HomeScreenProps {
  menuItems: MenuItem[];
  onNavigateToManage: () => void;
  onNavigateToFilter: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ menuItems, onNavigateToManage, onNavigateToFilter }) => {
  const safeMenuItems = Array.isArray(menuItems) ? menuItems : [];
  
  const renderAveragePrice = (items: MenuItem[], course?: string) => {
    try {
      const avg = calculateAverage(items, course);
      return isNaN(avg) ? '0.00' : avg.toFixed(2);
    } catch (error) {
      console.warn('Error rendering average price:', error);
      return '0.00';
    }
  };
  
  return (
    <View style={commonStyles.container}>
      <View style={commonStyles.header}>
        <Text style={commonStyles.headerTitle}>Chef Christoffel Menu</Text>
      </View>
      
      <Text style={commonStyles.screenTitle}>Complete Menu</Text>
      <Text style={commonStyles.subtitle}>Total Items: {safeMenuItems.length}</Text>
      
      <ArrayDebugInfo items={safeMenuItems} showDebug={typeof __DEV__ !== 'undefined' && __DEV__} />

      <View style={[commonStyles.card, styles.priceCard]}>
        <Text style={styles.sectionTitle}>Average Prices by Course</Text>
        <View style={styles.priceGrid}>
          {COURSES.map(course => (
            <View key={course} style={styles.priceItem}>
              <Text style={styles.courseLabel}>{course}</Text>
              <Text style={styles.priceValue}>R{renderAveragePrice(safeMenuItems, course)}</Text>
            </View>
          ))}
        </View>
        <View style={styles.totalPrice}>
          <Text style={styles.totalLabel}>Overall Average</Text>
          <Text style={styles.totalValue}>R{renderAveragePrice(safeMenuItems)}</Text>
        </View>
      </View>

      <FlatList
        data={safeMenuItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <MenuItemCard item={item} />}
        style={commonStyles.list}
        showsVerticalScrollIndicator={false}
      />

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[commonStyles.primaryButton, styles.actionButton]} onPress={onNavigateToManage}>
          <Text style={commonStyles.primaryButtonText}>Manage Menu</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[commonStyles.primaryButton, styles.actionButton]} onPress={onNavigateToFilter}>
          <Text style={commonStyles.primaryButtonText}>Filter Menu</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  priceCard: {
    marginBottom: theme.spacing.md,
  },
  sectionTitle: {
    fontSize: theme.fontSizes.lg,
    fontWeight: 'bold',
    color: theme.colors.secondary,
    marginBottom: theme.spacing.md,
    textAlign: 'center',
  },
  priceGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.md,
  },
  priceItem: {
    width: '48%',
    backgroundColor: theme.colors.background,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    marginBottom: theme.spacing.sm,
    alignItems: 'center',
  },
  courseLabel: {
    fontSize: theme.fontSizes.sm,
    color: theme.colors.textSecondary,
    fontWeight: '500',
    marginBottom: theme.spacing.xs,
  },
  priceValue: {
    fontSize: theme.fontSizes.lg,
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  totalPrice: {
    backgroundColor: theme.colors.primary,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalLabel: {
    fontSize: theme.fontSizes.md,
    fontWeight: '600',
    color: theme.colors.surface,
  },
  totalValue: {
    fontSize: theme.fontSizes.xl,
    fontWeight: 'bold',
    color: theme.colors.surface,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing.lg,
    paddingBottom: theme.spacing.lg,
  },
  actionButton: {
    flex: 0.48,
    margin: 0,
  },
});