import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MenuItem } from '../utils/types';
import { getArrayStats } from '../utils/arrayHelpers';
import { theme } from '../utils/theme';

interface Props {
  items: MenuItem[];
  showDebug?: boolean;
}

export const ArrayDebugInfo: React.FC<Props> = ({ items, showDebug = false }) => {
  if (!showDebug) return null;

  const stats = getArrayStats(items);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Array Debug Info</Text>
      <Text style={styles.stat}>Total Items: {stats.total}</Text>
      <Text style={styles.stat}>Starters: {stats.starters}</Text>
      <Text style={styles.stat}>Mains: {stats.mains}</Text>
      <Text style={styles.stat}>Desserts: {stats.desserts}</Text>
      <Text style={styles.stat}>Avg Price: R{stats.averagePrice.toFixed(2)}</Text>
      <Text style={styles.ids}>
        IDs: {items.map(item => item.id.slice(-4)).join(', ')}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.background,
    padding: theme.spacing.sm,
    margin: theme.spacing.sm,
    borderRadius: theme.borderRadius.sm,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  title: {
    fontSize: theme.fontSizes.sm,
    fontWeight: 'bold',
    color: theme.colors.secondary,
    marginBottom: theme.spacing.xs,
  },
  stat: {
    fontSize: theme.fontSizes.xs,
    color: theme.colors.textMuted,
    marginBottom: 2,
  },
  ids: {
    fontSize: theme.fontSizes.xs,
    color: theme.colors.textMuted,
    marginTop: theme.spacing.xs,
  },
});