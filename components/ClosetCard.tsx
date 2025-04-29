// =============================================================================
// components/ClosetCard.tsx – matches explore-card aesthetic, no heart icon
// =============================================================================
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';
import Colors from '@/constants/Colors';

export interface ClosetCardProps {
  imageUrl: string;
  listing: string;
  category: string;
  size: string;
  rentalPrice?: number;
  rating?: number;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

const ClosetCard: React.FC<ClosetCardProps> = ({
  imageUrl,
  listing,
  category,
  size,
  rentalPrice,
  rating,
  onPress,
  style,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      style={[styles.cardWrapper, style]}
    >
      <View style={styles.imageWrapper}>
        <Image source={{ uri: imageUrl }} style={styles.image} />
        {/* bottom fade */}
        <LinearGradient colors={["transparent", "rgba(0,0,0,0.7)"]} style={StyleSheet.absoluteFill} />

        {/* bottom copy */}
        <View style={styles.textOverlay}>
          <Text style={styles.title} numberOfLines={1}>{listing}</Text>
          <Text style={styles.subtitle} numberOfLines={1}>{category} • {size}</Text>
          <View style={styles.bottomRow}>
            {typeof rentalPrice === 'number' && (
              <Text style={styles.price}>${rentalPrice}<Text style={styles.perDay}>/day</Text></Text>
            )}
            {typeof rating === 'number' && !isNaN(rating) && (
              <View style={styles.ratingRow}>
                <Ionicons name="star" size={14} color={Colors.primary} />
                <Text style={styles.ratingText}>{rating.toFixed(1)}</Text>
              </View>
            )}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ClosetCard;

/* -------------------------------------------------------------------------- */
const styles = StyleSheet.create({
  cardWrapper: { width: '100%', marginBottom: 20 },
  imageWrapper: {
    aspectRatio: 3 / 4,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: '#eee',
  },
  image: { ...StyleSheet.absoluteFillObject },
  textOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  title: { fontSize: 15, fontWeight: '700', color: '#fff' },
  subtitle: { fontSize: 12, color: '#fff', marginTop: 2 },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 6,
  },
  price: { fontSize: 13, fontWeight: '600', color: '#fff' },
  perDay: { fontSize: 12, fontWeight: '400', color: '#ddd' },
  ratingRow: { flexDirection: 'row', alignItems: 'center' },
  ratingText: { marginLeft: 3, fontSize: 12, fontWeight: '600', color: '#fff' },
});