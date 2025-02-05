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
import { LISTING_ITEMS } from '@/constants/MockData';

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
  { label: 'Glasses', iconName: 'glasses-outline' },
];

const HEADER_HEIGHT = 110;

const ExploreScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [mockListings] = useState(LISTING_ITEMS);
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
            placeholder="Search for your next fit..."
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
          {mockListings.map((cardData, index) => (
            <TouchableOpacity
            key={index}
            onPress={() => {
              navigation.navigate('Listing', { listingData: cardData });
            }}
          >
              <Card
                imageUrl={cardData.imageUrl}
                listing={cardData.listing}
                category={cardData.category}
                rentalPrice={cardData.rentalPrice}
                retailPrice={cardData.retailPrice}
                size={cardData.size}
                rating={cardData.rating}
                ratingCount={cardData.ratingCount}
                description={cardData.description}
                listerId={cardData.listerId}
                style={index === 0 ? { marginTop: 20 } : {}}
              />
            </TouchableOpacity>
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
    marginTop: 60, // Distance of search bar from top
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
    marginHorizontal: 9,
    paddingBottom: 5,
  },
  filterItem: {
    width: 63,
    alignItems: 'center',
    marginHorizontal: 10,
  },
  filterIcon: {
    marginBottom: 4,
  },
  filterLabel: {
    fontSize: 11,
    color: '#444',
  },
});
