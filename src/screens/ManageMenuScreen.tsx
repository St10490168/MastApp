import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, TextInput, Alert, ScrollView } from 'react-native';
import { MenuItem, COURSES } from '../utils/types';
import { MenuItemCard } from '../components/MenuItemCard';
import { theme } from '../utils/theme';
import { commonStyles } from '../utils/commonStyles';

interface ManageMenuScreenProps {
  menuItems: MenuItem[];
  onAddItem: (item: MenuItem) => void;
  onRemoveItem: (id: string) => void;
  onBack: () => void;
}

export const ManageMenuScreen: React.FC<ManageMenuScreenProps> = ({ 
  menuItems, 
  onAddItem, 
  onRemoveItem, 
  onBack 
}) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('Starters');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [price, setPrice] = useState('');

  const handleAddItem = () => {
    if (!name || !description || !price) {
      Alert.alert('Error', 'Please fill out all fields.');
      return;
    }

    const newItem: MenuItem = {
      id: Date.now().toString(),
      name,
      description,
      course: selectedCourse,
      price,
    };

    onAddItem(newItem);
    setName('');
    setDescription('');
    setSelectedCourse('Starters');
    setIsDropdownOpen(false);
    setPrice('');
    setShowAddForm(false);
  };

  if (showAddForm) {
    return (
      <ScrollView style={commonStyles.container}>
        <View style={commonStyles.header}>
          <TouchableOpacity style={commonStyles.backButton} onPress={() => setShowAddForm(false)}>
            <Text style={commonStyles.backButtonText}>← Cancel</Text>
          </TouchableOpacity>
          <Text style={commonStyles.headerTitle}>Add Menu Item</Text>
        </View>
        
        <View style={[commonStyles.card, styles.formCard]}>
          <Text style={styles.formTitle}>New Dish Details</Text>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Dish Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter dish name"
              value={name}
              onChangeText={setName}
              placeholderTextColor={theme.colors.textMuted}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Description</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Enter description"
              value={description}
              onChangeText={setDescription}
              multiline
              numberOfLines={3}
              placeholderTextColor={theme.colors.textMuted}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Course</Text>
            <TouchableOpacity 
              style={styles.dropdown}
              onPress={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <Text style={styles.dropdownText}>{selectedCourse}</Text>
              <Text style={styles.dropdownArrow}>▼</Text>
            </TouchableOpacity>
            
            {isDropdownOpen && (
              <View style={styles.dropdownList}>
                {COURSES.map((courseOption) => (
                  <TouchableOpacity
                    key={courseOption}
                    style={styles.dropdownItem}
                    onPress={() => {
                      setSelectedCourse(courseOption);
                      setIsDropdownOpen(false);
                    }}
                  >
                    <Text style={styles.dropdownItemText}>{courseOption}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Price (R)</Text>
            <TextInput
              style={styles.input}
              placeholder="0.00"
              value={price}
              onChangeText={setPrice}
              keyboardType="decimal-pad"
              placeholderTextColor={theme.colors.textMuted}
            />
          </View>

          <TouchableOpacity style={commonStyles.primaryButton} onPress={handleAddItem}>
            <Text style={commonStyles.primaryButtonText}>Add to Menu</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }

  return (
    <View style={commonStyles.container}>
      <View style={commonStyles.header}>
        <TouchableOpacity style={commonStyles.backButton} onPress={onBack}>
          <Text style={commonStyles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <Text style={commonStyles.headerTitle}>Manage Menu</Text>
      </View>
      
      <Text style={commonStyles.screenTitle}>Menu Items</Text>
      <Text style={commonStyles.subtitle}>{menuItems.length} items • Tap remove to delete</Text>

      <FlatList
        data={menuItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <MenuItemCard 
            item={item} 
            canRemove
            onRemove={onRemoveItem}
          />
        )}
        style={commonStyles.list}
        showsVerticalScrollIndicator={false}
      />

      <TouchableOpacity
        style={commonStyles.primaryButton}
        onPress={() => setShowAddForm(true)}
      >
        <Text style={commonStyles.primaryButtonText}>+ Add New Item</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  formCard: {
    marginTop: theme.spacing.lg,
  },
  formTitle: {
    fontSize: theme.fontSizes.xl,
    fontWeight: 'bold',
    color: theme.colors.secondary,
    textAlign: 'center',
    marginBottom: theme.spacing.xl,
  },
  inputGroup: {
    marginBottom: theme.spacing.lg,
  },
  label: {
    fontSize: theme.fontSizes.md,
    fontWeight: '600',
    color: theme.colors.secondary,
    marginBottom: theme.spacing.sm,
  },
  input: {
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    backgroundColor: theme.colors.surface,
    fontSize: theme.fontSizes.md,
    color: theme.colors.text,
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  dropdown: {
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    backgroundColor: theme.colors.surface,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dropdownText: {
    fontSize: theme.fontSizes.md,
    color: theme.colors.text,
  },
  dropdownArrow: {
    fontSize: theme.fontSizes.sm,
    color: theme.colors.textMuted,
  },
  dropdownList: {
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.borderRadius.md,
    backgroundColor: theme.colors.surface,
    marginTop: theme.spacing.xs,
    ...theme.shadows.sm,
  },
  dropdownItem: {
    padding: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  dropdownItemText: {
    fontSize: theme.fontSizes.md,
    color: theme.colors.text,
  },
});