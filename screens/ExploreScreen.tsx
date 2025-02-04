import Card from '@/components/Card';
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

interface FilterItem {
  label: string;
  iconName: string;
}

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

const MOCK_CARDS = [
  {
    imageUrl:
      'https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    location: 'Saugerties, New York',
    subtitle: 'Featured in Architectural Digest Jan 13 – 18',
    price: '$1,014 night',
    rating: 4.88,
  },
  {
    imageUrl:
      'https://images.unsplash.com/photo-1560807707-8cc77767d783?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    location: 'Malibu, California',
    subtitle: 'Oceanfront Property Jan 20 – 25',
    price: '$2,200 night',
    rating: 4.95,
  },
  {
    imageUrl:
      'https://images.unsplash.com/photo-1491972690050-ba117db4dc09?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    location: 'Malibu, California',
    subtitle: 'Oceanfront Property Jan 01 – Feb 25',
    price: '$2,200 night',
    rating: 5.0,
  },
  {
    imageUrl:
      'https://images.unsplash.com/photo-1491972690050-ba117db4dc09?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    location: 'Malibu, California',
    subtitle: 'Oceanfront Property Jan 01 – Feb 25',
    price: '$2,200 night',
    rating: 5.0,
  },
  {
    imageUrl:
      'https://images.unsplash.com/photo-1517849845537-4d257902454a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    location: 'Saugerties, New York',
    subtitle: 'Featured in Architectural Digest Jan 13 – 18',
    price: '$1,014 night',
    rating: 4.88,
  },
  {
    imageUrl:
      'https://images.unsplash.com/photo-1560807707-8cc77767d783?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    location: 'Malibu, California',
    subtitle: 'Oceanfront Property Jan 20 – 25',
    price: '$2,200 night',
    rating: 4.95,
  },
];

const HEADER_HEIGHT = 110;

const ExploreScreen: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>('');

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Fixed Header (Search Bar + Filter Bar) */}
      <View style={styles.fixedHeaderContainer}>
        {/* Search Bar */}
        <View style={styles.searchBarContainer}>
          <Ionicons
            name="search-outline"
            size={24}
            color="#555"
            style={styles.searchIcon}
          />
          <TextInput
            placeholder="Start your search!"
            placeholderTextColor="#888"
            style={styles.searchInput}
          />
        </View>

        {/* Horizontal Filter Icons */}
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
                style={styles.filterItem}
                onPress={() => setSelectedFilter(filter.label)}
              >
                <Ionicons
                  name={filter.iconName}
                  size={24}
                  color={isSelected ? '#FF6211' : '#444'}
                  style={styles.filterIcon}
                />
                <Text
                  style={[
                    styles.filterLabel,
                    isSelected && { color: '#FF6211', fontWeight: '600' },
                  ]}
                >
                  {filter.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* Scrollable Card List */}
      <ScrollView
        style={styles.cardScrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 10 }}
      >
        <View style={{ paddingBottom: 0 }}>
          {MOCK_CARDS.map((cardData, index) => (
            <Card
              key={index}
              imageUrl={cardData.imageUrl}
              location={cardData.location}
              subtitle={cardData.subtitle}
              price={cardData.price}
              rating={cardData.rating}
              style={index === 0 ? { marginTop: 20 } : {}}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ExploreScreen;

/* --- Styles --- */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FB', // unify background
  },
  fixedHeaderContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 2,
    backgroundColor: '#F8F9FB',
    // Subtle shadow for the header
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  cardScrollView: {
    marginTop: HEADER_HEIGHT,
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 25,
    marginTop: 47,
    marginBottom: 10,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 30,
    height: 50,
    paddingHorizontal: 16,
    // Subtle shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
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
  filterScrollContainer: {
    marginTop: 5,
    marginHorizontal: 8,
    paddingBottom: 5,
  },
  filterItem: {
    width: 60,
    alignItems: 'center',
    marginHorizontal: 8,
  },
  filterIcon: {
    marginBottom: 4,
  },
  filterLabel: {
    fontSize: 11,
    color: '#444',
  },
});
