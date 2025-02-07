import React, { useRef } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Animated,     // <-- Important
  Dimensions
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { SAMPLE_USERS } from '@/constants/MockData';
import UserCard from '@/components/UserCard';

const { width } = Dimensions.get('window');

// You can tweak these for your desired effect
const HEADER_MAX_HEIGHT = 550;  // The max height of the image
const HEADER_MIN_HEIGHT = 100;  // The height when collapsed
const SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

export default function ListingScreen({ route }) {
  const { listingData } = route.params;
  const navigation = useNavigation();

  // This finds your user info; adjust if needed
  const getUserById = (listerId) =>
    SAMPLE_USERS.find((user) => user.userId === listerId);
  const user = getUserById(listingData.listerId);

  // Animated value to track scroll
  const scrollY = useRef(new Animated.Value(0)).current;

  /**
   * Helper Function: Render Star Icons based on Rating
   */
  const renderStars = (rating) => {
    const maxStars = 5;
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = maxStars - fullStars - (halfStar ? 1 : 0);

    const starsArray = [];

    // Full Stars
    for (let i = 0; i < fullStars; i++) {
      starsArray.push(<Ionicons key={`full-${i}`} name="star" size={20} color="#FF6211" />);
    }
    // Half Star
    if (halfStar) {
      starsArray.push(<Ionicons key="half" name="star-half" size={20} color="#FF6211" />);
    }
    // Empty Stars
    for (let i = 0; i < emptyStars; i++) {
      starsArray.push(<Ionicons key={`empty-${i}`} name="star-outline" size={20} color="#FF6211" />);
    }

    return starsArray;
  };

  /**
   * Interpolate the scrollY to control the header's height
   */
  const headerHeight = scrollY.interpolate({
    inputRange: [0, SCROLL_DISTANCE],
    outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
    extrapolate: 'clamp',
  });

  /**
   * Optionally, for a parallax effect, you can move the image slightly
   * This will slide the image up a bit as you scroll
   */
  const imageTranslate = scrollY.interpolate({
    inputRange: [0, SCROLL_DISTANCE],
    outputRange: [0, 0], // Move image up by 50px
    extrapolate: 'clamp',
  });

  return (
    <View style={styles.container}>
      {/* Back Button (floats on top) */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back-outline" size={28} color="#fff" />
      </TouchableOpacity>

      * Collapsing Image Header (Animated)
      <Animated.View style={[styles.header, { height: headerHeight }]}>
        <Animated.Image
          source={{ uri: listingData.imageUrl }}
          style={[
            styles.headerImage,
            {
              transform: [{ translateY: imageTranslate }],
            },
          ]}
        />
      </Animated.View>

      {/* The content that scrolls */}
      <Animated.ScrollView
        style={styles.scrollViewContent}
        contentContainerStyle={{ paddingTop: HEADER_MAX_HEIGHT }}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
      >
        {/* Listing Details */}
        <View style={styles.detailsContainer}>
          <Text style={styles.title}>{listingData.listing}</Text>
          <Text style={styles.category}>
            {listingData.category} • {listingData.size}
          </Text>

          {/* Rating */}
          <View style={styles.ratingContainer}>
            {renderStars(listingData.rating)}
            <Text style={styles.ratingText}>
              {listingData.rating} • {listingData.ratingCount} Reviews
            </Text>
          </View>

          <View style={styles.divider} />

          {/* Listed By */}
          <View style={styles.listerContainer}>
            <Text style={styles.listerHeader}>Listed By</Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('UserProfileScreen', { userData: user });
              }}
            >
              <UserCard
                userId={user.userId}
                name={user.name}
                username={user.username}
                profileImage={user.profileImage}
                reviews={user.reviews}
                userRating={user.userRating}
                responseRate={user.responseRate}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.divider} />

          {/* Description */}
          <View style={styles.descriptionContainer}>
            <Text style={styles.descriptionHeader}>Description</Text>
            <Text style={styles.descriptionText}>{listingData.description}</Text>
          </View>
        </View>
      </Animated.ScrollView>

      {/* Bottom Bar (Price + Request Button) */}
      <View style={styles.bottomBar}>
        <View style={styles.priceContainer}>
          <Text style={styles.priceText}>${listingData.rentalPrice} / Day</Text>
          <Text style={styles.retailPrice}>Retail: ${listingData.retailPrice}</Text>
        </View>
        <TouchableOpacity style={styles.requestButton}>
          <Text style={styles.requestButtonText}>Request</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

/* -- STYLES -- */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  /* The collapsible header container */
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    overflow: 'hidden', 
    zIndex: 0, // Ensure it's behind the back button but above scroll
  },
  headerImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 20,
    padding: 5,
    zIndex: 3, // Above the header
  },
  scrollViewContent: {
    flex: 1,
  },
  detailsContainer: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 20,
    // Additional spacing if needed
    minHeight: 550, // So there's enough scrolling content
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    marginBottom: 8,
    color: '#333',
  },
  category: {
    fontSize: 16,
    fontWeight: '500',
    color: '#666',
    marginBottom: 10,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 16,
    color: '#000',
    marginLeft: 10,
    fontWeight: '600',
  },
  divider: {
    height: 1,
    backgroundColor: '#E5E5E5',
    marginVertical: 15,
  },
  listerContainer: {
    paddingVertical: 8,
  },
  listerHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  descriptionContainer: {
    paddingVertical: 8,
    paddingBottom: 100,
    zIndex: 2,
  },
  descriptionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  descriptionText: {
    fontSize: 15,
    color: '#000',
    lineHeight: 22,
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
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopWidth: 2,
    borderTopColor: '#E5E5E5',
    paddingBottom: 30, // For home indicator
    paddingHorizontal: 30,
    zIndex: 5,
  },
  priceContainer: {
    flexDirection: 'column',
  },
  priceText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    paddingBottom: 5,
  },
  retailPrice: {
    fontSize: 15,
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
  },
  requestButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
});
