import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface CardProps {
  imageUrl: string;
  location: string;
  subtitle: string;    // e.g. "Featured in Architectural Digest Jan 13 – 18"
  price: string;       // e.g. "$1,014 night"
  rating: number;      // e.g. 4.88
  style?: object;      // Optional style prop
}

const Card: React.FC<CardProps> = ({
  imageUrl,
  location,
  subtitle,
  price,
  rating,
  style,
}) => {
  // State to manage the heart icon's filled (liked) or outlined (not liked) state
  const [isLiked, setIsLiked] = useState(false);

  // Function to handle the heart icon press
  const handleHeartPress = () => {
    setIsLiked(!isLiked);
  };

  return (
    <View style={[styles.cardContainer, style]}>
      {/* Card Image + Heart Icon */}
      <View style={styles.imageContainer}>
        <Image source={{ uri: imageUrl }} style={styles.cardImage} />
        <TouchableOpacity
          style={styles.heartIconContainer}
          onPress={handleHeartPress}
        >
          <Ionicons
            name={isLiked ? 'heart' : 'heart-outline'}
            size={20}
            color={isLiked ? '#FF6211' : '#fff'} // Change color based on isLiked state
          />
        </TouchableOpacity>
      </View>

      {/* Text Content */}
      <View style={styles.textContainer}>
        <Text style={styles.locationText}>{location}</Text>
        <Text style={styles.subtitleText}>{subtitle}</Text>
        <View style={styles.bottomRow}>
          <View>
            <Text style={styles.priceText}>{price}</Text>
          </View>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={14} color="#000" />
            <Text style={styles.ratingText}>{rating.toFixed(2)}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({
  cardContainer: {
    marginTop: 5,
    marginHorizontal: 16,
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 3,
  },
  imageContainer: {
    position: 'relative',
    alignItems: 'center',
  },
  cardImage: {
    width: '100%',
    height: 275,   // Fixed height for the container
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    resizeMode: 'cover', // Fill the box while keeping the image central
    alignSelf: 'center',
  },
  heartIconContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 20,
    padding: 6,
  },
  textContainer: {
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  locationText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  subtitleText: {
    fontSize: 14,
    color: '#666',
    marginTop: 10,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
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
    fontSize: 14,
    color: '#000',
    fontWeight: '500',
  },
});
