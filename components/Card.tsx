import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
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
  style?: object;  
}

const Card: React.FC<CardProps> = ({
  imageUrl,
  listing,
  category,
  size,
  rentalPrice,
  retailPrice,
  rating,
  ratingCount,
  description,
  listerId,
  style,
}) => {
  // Manage saved items using state
  const [isLiked, setIsLiked] = useState(false);

  const handleHeartPress = () => {
    setIsLiked(!isLiked);

    if (!isLiked) {
      // Like Functionality
      
    } else {
      
    }
  };

  return (
    <View style={[styles.cardContainer, style]}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: imageUrl }} style={styles.cardImage} />
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
      </View>

      {/* Text Content */}
      <View style={styles.textContainer}>
        <Text style={styles.listingText}>{listing}</Text>
        <Text style={styles.categoryText}>{category}</Text>
        <View style={styles.bottomRow}>
          <Text style={styles.priceText}>${rentalPrice} / Day</Text>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={18} color="#FF6211" />
            <Text style={styles.ratingText}>{rating.toFixed(2)}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Card;


/* --- Styles --- */
const styles = StyleSheet.create({
  cardContainer: {
    marginTop: 10,
    marginHorizontal: 15,
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 5,
    elevation: 2,
  },
  imageContainer: {
    position: 'relative',
    alignItems: 'center',
  },
  cardImage: {
    width: '100%',
    height: 275,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    resizeMode: 'cover',
  },
  heartIconContainer: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: 'rgba(0,0,0,0.35)',
    borderRadius: 20,
    padding: 6,
  },
  textContainer: {
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  listingText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#000',
  },
  categoryText: {
    fontSize: 16,
    color: '#666',
    marginTop: 2,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 7,
  },
  priceText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    marginLeft: 4,
    fontSize: 16,
    color: '#000',
    fontWeight: '400',
  },
});
