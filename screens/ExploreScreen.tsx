// ExploreScreen.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';

// A filter item interface:
interface FilterItem {
  label: string;
  iconName: string; // Ionicons name, e.g., "shirt-outline", "bag-outline", etc.
}

// Filter data:
const FILTERS: FilterItem[] = [
  { label: 'T-Shirts', iconName: 'shirt-outline' },
  { label: 'Jeans', iconName: 'briefcase-outline' },
  { label: 'Sneakers', iconName: 'footsteps-outline' },
  { label: 'Hats', iconName: 'school-outline' },
  { label: 'Dresses', iconName: 'rose-outline' },
  { label: 'Outerwear', iconName: 'cloudy-outline' },
  { label: 'Backpacks', iconName: 'bag-outline' },
  { label: 'Watches', iconName: 'watch-outline' },
  { label: 'Sunglasses', iconName: 'glasses-outline' },
];

const ExploreScreen: React.FC = () => {
  // Keep track of which filter is selected
  const [selectedFilter, setSelectedFilter] = useState<string>('');

  return (
    <SafeAreaView style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchBarContainer}>
        <Ionicons
          name="search-outline"
          size={24} 
          color="#555"
          style={styles.searchIcon}
        />
        <TextInput
          placeholder="Start your search"
          placeholderTextColor="#888"
          style={styles.searchInput}
        />
      </View>

      {/* Horizontal Filter/Icons */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filterScrollContainer}
      >
        {FILTERS.map((filter, idx) => {
          const isSelected = selectedFilter === filter.label;
          return (
            <TouchableOpacity
              key={idx}
              style={[styles.filterItem]}
              onPress={() => setSelectedFilter(filter.label)}
            >
              <Ionicons
                name={filter.iconName}
                size={24} // match the bottom-nav icon size
                color={isSelected ? '#FF6211' : '#000'}
                style={styles.filterIcon}
              />
              <Text
                style={[styles.filterLabel, isSelected && styles.filterLabelSelected]}
              >
                {filter.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
};

export default ExploreScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  // Search Bar styles
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 8,

    // More "Airbnb-like" styling:
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 30,
    height: 50,
    paddingHorizontal: 16,

    // Subtle shadow:
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#000',
    fontWeight: '500',
  },

  // Filter row styles
  filterScrollContainer: {
    marginHorizontal: 8,
    paddingVertical: 8,
  },
  filterItem: {
    width: 70,
    alignItems: 'center',
    marginHorizontal: 8,
  },
  filterIcon: {
    marginBottom: 4,
  },
  filterLabel: {
    fontSize: 12,
    color: '#333',
  },
  filterLabelSelected: {
    color: '#FF6211',
  },
});
