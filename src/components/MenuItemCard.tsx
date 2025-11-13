import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { MenuItem } from '../utils/types';
import { theme } from '../utils/theme';
import { commonStyles } from '../utils/commonStyles';

interface Props {
  item: MenuItem;
  canRemove?: boolean;
  onRemove?: (id: string) => void;
}

export const MenuItemCard: React.FC<Props> = ({ item, canRemove, onRemove }) => {
  const handleRemove = () => {
    if (!onRemove) return;
    
    Alert.alert(
      'Remove Item',
      `Are you sure you want to remove "${item.name}" from the menu?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Remove', 
          style: 'destructive',
          onPress: () => onRemove(item.id)
        }
      ]
    );
  };

  return (
  <View style={[commonStyles.card, styles.menuCard]}>
    <View style={styles.header}>
      <Text style={styles.name}>{item.name}</Text>
      <View style={styles.courseTag}>
        <Text style={styles.courseText}>{item.course}</Text>
      </View>
    </View>
    <Text style={styles.description}>{item.description}</Text>
    <View style={styles.footer}>
      <Text style={styles.price}>R{item.price}</Text>
      {canRemove && onRemove && (
        <TouchableOpacity style={styles.removeButton} onPress={handleRemove}>
          <Text style={styles.removeButtonText}>Remove</Text>
        </TouchableOpacity>
      )}
    </View>
  </View>
  );
};

const styles = StyleSheet.create({
  menuCard: {
    marginVertical: theme.spacing.sm,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: theme.spacing.sm,
  },
  name: {
    fontSize: theme.fontSizes.xl,
    fontWeight: 'bold',
    color: theme.colors.secondary,
    flex: 1,
    marginRight: theme.spacing.sm,
  },
  courseTag: {
    backgroundColor: theme.colors.accent,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.sm,
  },
  courseText: {
    fontSize: theme.fontSizes.xs,
    fontWeight: '600',
    color: theme.colors.secondary,
    textTransform: 'uppercase',
  },
  description: {
    fontSize: theme.fontSizes.sm,
    color: theme.colors.textMuted,
    lineHeight: 20,
    marginBottom: theme.spacing.md,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    fontSize: theme.fontSizes.lg,
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  removeButton: {
    backgroundColor: theme.colors.error,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.sm,
  },
  removeButtonText: {
    color: theme.colors.surface,
    fontSize: theme.fontSizes.sm,
    fontWeight: '600',
  },
});