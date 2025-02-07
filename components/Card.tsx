import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  StyleProp,
  ViewStyle
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Define the Listing type
interface Listing {
  imageUrl: string;
  listing: string;
  category: string;
  size: string;
  rentalPrice: number;
  retailPrice: number;
  rating: number;
  ratingCount: number;
  description: string;
  listerId: string;
}

export interface CardProps extends Listing {
  style?: StyleProp<ViewStyle>;
}

const Card: React.FC<CardProps> = ({
  imageUrl,
  listing,
  category,
  size,
  rentalPrice,
  rating,
  ratingCount,
  style,
}) => {
  // Manage saved items using state
  const [isLiked, setIsLiked] = useState(false);

  const handleHeartPress = () => {
    setIsLiked(!isLiked);
    if (!isLiked) {
      // Like functionality
    } else {
      // Unlike functionality
    }
  };

  return (
    <View style={[styles.cardContainer, style]}>
      {/* Image Section */}
      <Image source={{ uri: imageUrl }} style={styles.cardImage} />

      {/* Heart Icon on top-right */}
      <TouchableOpacity
        style={styles.heartIconContainer}
        onPress={handleHeartPress}
      >
        <Ionicons
          name={isLiked ? 'heart' : 'heart-outline'}
          size={20}
          color={isLiked ? '#FF6211' : '#fff'}
        />
      </TouchableOpacity>

      {/* Transparent overlay for text content */}
      <View style={styles.overlay}>
        <Text style={styles.listingText} numberOfLines={1}>
          {listing}
        </Text>
        <Text style={styles.categoryText}>
          {category} • {size}
        </Text>

        <View style={styles.bottomRow}>
          <Text style={styles.priceText}>
            ${rentalPrice} <Text style={styles.perDay}>/ Day</Text>
          </Text>

          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={18} color="#FF6211" />
            <Text style={styles.ratingText}>{rating.toFixed(1)}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({
  cardContainer: {
    marginTop: 10,
    marginHorizontal: 15,
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 16,
    overflow: 'hidden',

    // Shadow / Elevation
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 5,
    elevation: 2,
  },
  cardImage: {
    width: '100%',
    aspectRatio: 4 / 4, // Maintain a consistent aspect ratio
    resizeMode: 'cover',
  },
  heartIconContainer: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: 'rgba(0,0,0,0.35)',
    borderRadius: 20,
    padding: 6,
    zIndex: 2, // Ensure the heart icon is above the overlay
  },
  overlay: {
    // Position the overlay absolutely on top of the image
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,

    // Semi-transparent background
    backgroundColor: 'rgba(0, 0, 0, 0.4)',

    // Place content at the bottom
    justifyContent: 'flex-end',
    padding: 14,
  },
  listingText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 3,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '400',
    color: '#fff',
    marginBottom: 8,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  perDay: {
    fontSize: 14,
    fontWeight: '500',
    color: '#fff',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    marginLeft: 4,
    fontSize: 16,
    color: '#fff',
    fontWeight: '500',
  },
});
