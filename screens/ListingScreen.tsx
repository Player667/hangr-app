import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient'; // Import LinearGradient for button styling
import UserCard from '@/components/UserCard';
import { SAMPLE_USERS } from '@/constants/MockData';

const { width } = Dimensions.get('window'); // Get device width for full-width image



export default function ListingScreen({ route }) {
  const { listingData } = route.params;
  const navigation = useNavigation(); // Access navigation for the back button

  const getUserById = (listerId) => SAMPLE_USERS.find(user => user.userId === listerId);
  const user = getUserById(listingData.listerId);

  /**
   * Helper Function: Render Star Icons based on Rating
   */
  const renderStars = (rating) => {
    const maxStars = 5;
    const fullStars = Math.floor(rating); // Full stars
    const halfStar = rating % 1 >= 0.5;   // Half star if decimal >= 0.5
    const emptyStars = maxStars - fullStars - (halfStar ? 1 : 0); // Empty stars

    const starsArray = [];

    // Push Full Stars
    for (let i = 0; i < fullStars; i++) {
      starsArray.push(<Ionicons key={`full-${i}`} name="star" size={20} color="#FF6211" />);
    }

    // Push Half Star (if applicable)
    if (halfStar) {
      starsArray.push(<Ionicons key="half" name="star-half" size={20} color="#FF6211" />);
    }

    // Push Empty Stars
    for (let i = 0; i < emptyStars; i++) {
      starsArray.push(<Ionicons key={`empty-${i}`} name="star-outline" size={20} color="#FF6211" />);
    }

    return starsArray;
  };


  return (
    <View style={styles.container}>

      {/* Fixed Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back-outline" size={28} color="#fff" />
      </TouchableOpacity>

      {/* Scrollable Content */}
      <ScrollView style={styles.contentContainer} contentContainerStyle={styles.scrollContent}>
        
        {/* Full-Width Image at the Top */}
        <View style={styles.imageContainer}>
          <Image source={{ uri: listingData.imageUrl }} style={styles.image} />
        </View>

        {/* Listing Details */}
        <View style={styles.detailsContainer}>
          <Text style={styles.title}>{listingData.listing}</Text>
          <Text style={styles.category}>{listingData.category} • {listingData.size} </Text>

          {/* Star Rating Section */}
          <View style={styles.ratingContainer}>
            {renderStars(listingData.rating)} 
            <Text style={styles.ratingText}>{listingData.rating} • {listingData.ratingCount} Reviews</Text>
          </View>

          {/* User Card Section */}
          <View style={styles.listerContainer}>
            <Text style={styles.listerHeader}>Listed By</Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('UserProfileScreen', { userData: user });
              }}>
                <UserCard 
                  userId={user.userId}
                  name={user.name}
                  username={user.username}
                  profileImage={user.profileImage}
                  reviews={user.reviews}
                  userRating={user.userRating}
                  responseRate={user.responseRate}/>
                </TouchableOpacity>

          </View>

          {/* Description Section */}
          <View style={styles.descriptionContainer}>
            <Text style={styles.descriptionHeader}>Description</Text>
            <Text style={styles.descriptionText}>{listingData.description}</Text>
          </View>
        </View>
      </ScrollView>

      {/* Fixed Bottom Bar */}
      <View style={styles.bottomBar}>
        {/* Price Info */}
        <View style={styles.priceContainer}>
          <Text style={styles.priceText}>${listingData.rentalPrice} / Day</Text>
          <Text style={styles.retailPrice}>Retail: ${listingData.retailPrice}</Text>
        </View>

        {/* Request Button */}
        <TouchableOpacity style={styles.requestButton}>
            <Text style={styles.requestButtonText}>Request</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  imageContainer: {
    position: 'relative',
  },
  image: {
    width: width, // Full width of the device
    height: 550,
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 20,
    padding: 5,
    zIndex: 1,
  },
  contentContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100, // Ensure scroll content doesn't overlap with bottom bar
  },
  detailsContainer: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  category: {
    fontSize: 18,
    color: '#666',
    marginBottom: 10,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 0,
  },
  ratingText: {
    fontSize: 17,
    color: '#000',
    marginLeft: 10,
    fontWeight: '600',
  },
  listerContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
  },
  listerHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 0,
    color: '#333',
  },
  descriptionContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
  },
  descriptionHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  descriptionText: {
    fontSize: 16,
    color: '#000',
    lineHeight: 24,
    textAlign: 'left',
  },

  /* Bottom Bar Styles */
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 100,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 2,
    borderTopColor: '#E5E5E5',
    paddingBottom: 30, // To account for safe area (home indicator)
    paddingHorizontal: 30,
  },
  priceContainer: {
    flexDirection: 'column',
  },
  priceText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    paddingBottom: 5,
  },
  retailPrice: {
    fontSize: 16,
    color: '#888',
  },
  requestButton: {
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 30,
    marginRight: 15,
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: '#FF6211',
    borderRadius: 30,
    shadowColor: '#000',
    elevation: 6,
    zIndex: 5,
  },
  gradientButton: {
    paddingVertical: 12,
    paddingHorizontal: 27,
    borderRadius: 20,
  },
  requestButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
