import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MenuItem } from '../utils/types';

interface MenuItemCardProps {
  item: MenuItem;
  showRemoveButton?: boolean;
  onRemove?: (id: string) => void;
}

export const MenuItemCard: React.FC<MenuItemCardProps> = ({ item, showRemoveButton, onRemove }) => (
  <View style={styles.card}>
    <Text style={styles.name}>{item.name}</Text>
    <Text style={styles.course}>Course: {item.course}</Text>
    <Text style={styles.description}>{item.description}</Text>
    <Text style={styles.price}>Price: R{item.price}</Text>
    {showRemoveButton && onRemove && (
      <TouchableOpacity style={styles.removeButton} onPress={() => onRemove(item.id)}>
        <Text style={styles.removeButtonText}>Remove</Text>
      </TouchableOpacity>
    )}
  </View>
);

const styles = StyleSheet.create({
  card: {
    padding: 18,
    marginVertical: 8,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#F4A460',
    shadowColor: '#D2691E',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#8B4513',
    marginBottom: 4,
  },
  course: {
    fontSize: 14,
    color: '#CD853F',
    fontWeight: '600',
    backgroundColor: '#FFF8DC',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
  description: {
    fontSize: 14,
    color: '#A0522D',
    marginVertical: 6,
    lineHeight: 18,
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#D2691E',
  },
  removeButton: {
    backgroundColor: '#DC143C',
    padding: 8,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 8,
  },
  removeButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
});