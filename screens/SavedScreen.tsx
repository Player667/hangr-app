import React, { useState, useEffect } from 'react';
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
import { LISTING_ITEMS } from '@/constants/MockData';


const SavedScreen: React.FC = () => {
  // Initialize the savedItems array (this would come from a higher-level state or localStorage in a real app)
  const [savedItems] = useState(LISTING_ITEMS);


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
          savedItems.map((cardData, index) => (
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
