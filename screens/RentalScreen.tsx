import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { LISTING_ITEMS } from '@/constants/MockData';
import ClosetCard from '@/components/ClosetCard';

const RentalScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [myRentals] = useState(LISTING_ITEMS);
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <View style={styles.leftPlaceholder} />
        <Text style={styles.headerTitle}>My Rentals</Text>
        <TouchableOpacity style={styles.headerIconButton}>
          <Ionicons name="ellipsis-horizontal" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      {/* 2‐Column Rental Items List */}
      <FlatList
        data={myRentals}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            style={{ width: '48%' }}
            key={index}
                      onPress={() => {
                        navigation.navigate('Listing', { listingData: item });
                      }}>
            <ClosetCard
              imageUrl={item.imageUrl}
              listing={item.listing}
              category={item.category}
              size={item.size}
              rentalPrice={item.rentalPrice}/>
          </TouchableOpacity>
  
        )}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: 'space-between', paddingHorizontal: 10, paddingTop: 20 }}/>
    </SafeAreaView>
  );
};

export default RentalScreen;

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
  list: {
    flex: 1,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginHorizontal: 16,
  },
  rentalCard: {
    flex: 1,
    backgroundColor: '#FFF',
    borderRadius: 12,
    margin: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
    overflow: 'hidden',
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    aspectRatio: 3.6 / 4,
    backgroundColor: '#EEE',
  },
  rentalImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  overlayIconContainer: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0,0,0,0.4)',
    padding: 6,
    borderRadius: 16,
  },
  cardTextContainer: {
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  brandText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FF6211', // highlight brand
    marginBottom: 2,
  },
  nameText: {
    fontSize: 13,
    color: '#333',
    marginBottom: 2,
  },
  dateText: {
    fontSize: 12,
    color: '#666',
  },
});
