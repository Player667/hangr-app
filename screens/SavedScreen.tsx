import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Card from '@/components/Card';

const MOCK_SAVED_CARDS = [
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
      'https://images.unsplash.com/photo-1560807707-8cc77767d783?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    location: 'Saugerties, New York',
    subtitle: 'Featured in Architectural Digest Jan 13 – 18',
    price: '$1,014 night',
    rating: 4.88,
  },
];

const SavedScreen: React.FC = () => {
  const [savedItems] = useState(MOCK_SAVED_CARDS);

  return (
    <SafeAreaView style={styles.container}>
      {/* --- Header --- */}
      <View style={styles.headerContainer}>
        <View style={styles.leftPlaceholder} />
        <Text style={styles.headerTitle}>Saved</Text>
        <TouchableOpacity style={styles.headerIconButton}>
          <Ionicons name="search" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      {/* --- Content Area --- */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
      >
        {savedItems && savedItems.length > 0 ? (
          savedItems.map((item, index) => (
            <Card
              key={index}
              imageUrl={item.imageUrl}
              location={item.location}
              subtitle={item.subtitle}
              price={item.price}
              rating={item.rating}
            />
          ))
        ) : (
          <View style={styles.noSavedContainer}>
            <Ionicons name="bookmark-outline" size={48} color="#999" />
            <Text style={styles.noSavedText}>No saved items yet.</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default SavedScreen;

/* --- Styles --- */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FB',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FB',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  leftPlaceholder: {
    width: 24,
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '700',
    color: '#000',
  },
  headerIconButton: {
    padding: 8,
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    paddingBottom: 24,
  },
  noSavedContainer: {
    flex: 1,
    alignItems: 'center',
    marginTop: 48,
  },
  noSavedText: {
    marginTop: 12,
    fontSize: 16,
    color: '#999',
  },
});
