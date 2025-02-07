import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { CardProps } from './Card';

const ClosetCard: React.FC<CardProps> = ({
  imageUrl,
  listing,
  category,
  size,
  rentalPrice,
  rating,
}) => {
  // Example like/unlike state
  const [isLiked, setIsLiked] = useState(false);

  const handleHeartPress = () => {
    setIsLiked(!isLiked);
  };

  return (
    <View style={styles.cardContainer}>
      {/* Image Section */}
      <View style={styles.imageContainer}>
        <Image source={{ uri: imageUrl }} style={styles.cardImage} />

        {/* Heart icon (top-right) */}
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

      {/* Semi-transparent overlay for text */}
      <View style={styles.textContainer}>
        <Text style={styles.listingText} numberOfLines={1}>{listing}</Text>
        <Text style={styles.categoryText}>{category} • {size}</Text>

        {/* Bottom Row with Price & Rating (if available) */}
        <View style={styles.bottomRow}>
          <Text style={styles.priceText}>
            ${rentalPrice} <Text style={styles.perDay}>/ Day</Text>
          </Text>
          {rating !== undefined && (
            <View style={styles.ratingContainer}>
              <Ionicons name="star" size={18} color="#FF6211" />
              <Text style={styles.ratingText}>{rating.toFixed(1)}</Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

export default ClosetCard;

const styles = StyleSheet.create({
  cardContainer: {
    // You can remove width/height if you want the layout to be fluid in a parent container.
    // The key is the aspectRatio in imageContainer.
    width: '100%',
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 20,

    // Shadow / Elevation
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 5,
    elevation: 3,
  },
  imageContainer: {
    // 6/4 aspect ratio => 1.5
    width: '100%',
    aspectRatio: 4 / 4,   // This controls the image area height relative to width
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    overflow: 'hidden',
  },
  cardImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover', // Ensures the image covers the area properly
  },
  heartIconContainer: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0,0,0,0.4)',
    borderRadius: 20,
    padding: 6,
  },
  textContainer: {
    // The overlay behind the text
    position: 'absolute',
    bottom: 0,
    width: '100%',
    padding: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.4)', // 0.4 opacity
  },
  listingText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 2,
  },
  categoryText: {
    fontSize: 13,
    color: '#ddd',
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 6,
  },
  priceText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
  },
  perDay: {
    fontSize: 12,
    fontWeight: '400',
    color: '#ddd',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    marginLeft: 4,
    fontSize: 14,
    color: '#fff',
    fontWeight: '500',
  },
});
