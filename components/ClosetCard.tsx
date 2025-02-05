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
}) => {

  return (
    <View style={styles.clothesCard}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: imageUrl }} style={styles.image} />
        <TouchableOpacity style={styles.overlayIconContainer}>
          <Ionicons name="calendar-outline" size={20} color="#fff"/>
        </TouchableOpacity>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.listingText}
        numberOfLines={1}
        ellipsizeMode="tail">{listing}</Text>
        <Text style={styles.categoryText}>{category}</Text>
        <Text style={styles.sizeText}>{size}</Text>
        <Text style={styles.priceText}>${rentalPrice} / Day</Text>
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
  overlayIconContainer: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0,0,0,0.4)',
    padding: 6,
    borderRadius: 16,
  },
  textContainer: {
    padding: 8,
  },
  listingText: {
    fontSize: 17,
    fontWeight: '600',
    color: '#333',
  },
  categoryText: {
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
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
  },
});
