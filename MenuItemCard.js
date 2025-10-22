import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function MenuItemCard({ item }) {
  return (
    <View style={styles.card}>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.course}>Course: {item.course}</Text>
      <Text style={styles.description}>{item.description}</Text>
      <Text style={styles.price}>Price: ${item.price}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 15,
    marginVertical: 10,
    backgroundColor: '#FAFAFA',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 3,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2E7D32',
  },
  course: {
    fontSize: 14,
    color: '#555',
  },
  description: {
    fontSize: 14,
    color: '#777',
    marginVertical: 5,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
});