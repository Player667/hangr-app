import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface ClosetCardProps {
  imageUrl: string;
  brand: string;
  name: string;
  size: string;
  price: string;
}

const ClosetCard: React.FC<ClosetCardProps> = ({
  imageUrl,
  brand,
  name,
  size,
  price,
}) => {
  const [isLiked, setIsLiked] = useState(false);

  const toggleLike = () => setIsLiked((prev) => !prev);

  return (
    <View style={styles.clothesCard}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: imageUrl }} style={styles.image} />
        <TouchableOpacity style={styles.heartIconButton} onPress={toggleLike}>
          <Ionicons
            name={isLiked ? 'heart' : 'heart-outline'}
            size={22}
            color={isLiked ? '#FF6211' : '#fff'}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.brandText}>{brand}</Text>
        <Text style={styles.nameText}>{name}</Text>
        <Text style={styles.sizeText}>{size}</Text>
        <Text style={styles.priceText}>{price}</Text>
      </View>
    </View>
  );
};

export default ClosetCard;

/* --- Styles --- */
const styles = StyleSheet.create({
  clothesCard: {
    width: '48%', 
    marginBottom: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    aspectRatio: 1,
    overflow: 'hidden',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    backgroundColor: '#f0f0f0',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  heartIconButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 20,
    padding: 4,
  },
  textContainer: {
    padding: 8,
  },
  brandText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FF6211', // highlight brand in orange
  },
  nameText: {
    fontSize: 13,
    color: '#333',
    marginVertical: 2,
  },
  sizeText: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  priceText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#000',
  },
});
