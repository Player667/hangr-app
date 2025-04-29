// =============================================================================
// components/UserCard.tsx – Airbnb‑style profile card (no save button)
// =============================================================================
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Colors from '@/constants/Colors';

/* -------------------------------------------------------------------------- */
interface User {
  userId: string;
  name: string;
  username: string;
  profileImage: string;
  reviews: number;
  userRating: number; // 0‑5
}
interface Props extends User {
  /** optional style override */
  style?: object;
  /** tap handler (e.g. navigate to profile) */
  onPress?: () => void;
}

const UserCard: React.FC<Props> = ({
  name,
  username,
  profileImage,
  reviews,
  userRating,
  style,
  onPress,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      style={[styles.cardContainer, style]}
      onPress={onPress}
    >
      {/* hero / avatar */}
      <View style={styles.imageContainer}>
        <Image source={{ uri: profileImage }} style={styles.avatar} />
      </View>

      {/* text content */}
      <View style={styles.textContainer}>
        <Text style={styles.nameText} numberOfLines={1}>{name}</Text>
        <Text style={styles.handleText} numberOfLines={1}>@{username}</Text>

        <View style={styles.bottomRow}>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={18} color={Colors.primary} />
            <Text style={styles.ratingText}>{userRating.toFixed(2)}</Text>
          </View>
          <Text style={styles.reviewText}>{reviews} review{reviews !== 1 ? 's' : ''}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default UserCard;

/* -------------------------------------------------------------------------- */
const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#fff',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 5,
    elevation: 2,
    marginHorizontal: 15,
    marginBottom: 20,
  },
  imageContainer: {
    alignItems: 'center',
    paddingTop: 20,
  },
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
    resizeMode: 'cover',
    backgroundColor: '#eee',
  },
  textContainer: {
    paddingHorizontal: 16,
    paddingVertical: 18,
    alignItems: 'center',
  },
  nameText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000',
  },
  handleText: {
    marginTop: 4,
    fontSize: 14,
    color: '#777',
  },
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  ratingContainer: { flexDirection: 'row', alignItems: 'center' },
  ratingText: {
    marginLeft: 4,
    fontSize: 18,
    fontWeight: '500',
    color: '#000',
  },
  reviewText: {
    marginLeft: 10,
    fontSize: 14,
    color: '#666',
  },
});
