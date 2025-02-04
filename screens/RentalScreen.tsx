import React from 'react';
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

/** Example rental data */
const MOCK_RENTALS = [
  {
    id: '1',
    imageUrl:
      'https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    brand: 'Nike',
    name: 'Air Max 2022',
    dateRange: 'Feb 10 – Feb 14, 2025',
  },
  {
    id: '2',
    imageUrl:
      'https://images.unsplash.com/photo-1566753323558-f4e0952af115?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    brand: 'Levi’s',
    name: 'Vintage Denim Jacket',
    dateRange: 'Mar 01 – Mar 05, 2025',
  },
  {
    id: '3',
    imageUrl:
      'https://images.unsplash.com/photo-1580236931351-1c71daae5d1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    brand: 'Gucci',
    name: 'Designer Sunglasses',
    dateRange: 'Mar 20 – Mar 25, 2025',
  },
  {
    id: '4',
    imageUrl:
      'https://images.unsplash.com/photo-1575713832033-4e2791afafc0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    brand: 'Adidas',
    name: 'Track Pants',
    dateRange: 'Apr 01 – Apr 04, 2025',
  },
];

/** Single card to show each rented item */
const RentalCard = ({
  imageUrl,
  brand,
  name,
  dateRange,
}: {
  imageUrl: string;
  brand: string;
  name: string;
  dateRange: string;
}) => {
  return (
    <View style={styles.rentalCard}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: imageUrl }} style={styles.rentalImage} />
        <View style={styles.overlayIconContainer}>
          <Ionicons name="calendar-outline" size={20} color="#fff" />
        </View>
      </View>
      <View style={styles.cardTextContainer}>
        <Text style={styles.brandText}>{brand}</Text>
        <Text style={styles.nameText}>{name}</Text>
        <Text style={styles.dateText}>{dateRange}</Text>
      </View>
    </View>
  );
};

const RentalScreen: React.FC = () => {
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
        style={styles.list}
        data={MOCK_RENTALS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <RentalCard
            imageUrl={item.imageUrl}
            brand={item.brand}
            name={item.name}
            dateRange={item.dateRange}
          />
        )}
        numColumns={2}
        contentContainerStyle={styles.listContentContainer}
        showsVerticalScrollIndicator={false}
      />
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
  listContentContainer: {
    paddingHorizontal: 6,
    paddingBottom: 24,
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
