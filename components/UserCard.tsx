import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Define the User type
interface User {
  userId: string;   
  name: string;
  username: string;
  profileImage: string;
  reviews: number;
  userRating: number;
  responseRate: number;
}

interface UserProps extends User {
  style?: object; 
}

const UserCard: React.FC<UserProps> = ({
  userId,
  name,
  username,
  profileImage,
  reviews,
  userRating,
  responseRate,
  style,
}) => {

  return (
    <View style={styles.cardContainer}>
      {/* Profile Section */}
      <View style={styles.profileSection}>
        <Image source={{ uri: profileImage }} style={styles.profileImage} />
        <Text style={styles.userName}>{name}</Text>
        <Text style={styles.userHandle}>{username}</Text>
      </View>

      {/* Separator */}
      <View style={styles.separator} />

      {/* Stats Section */}
      <View style={styles.statsSection}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{reviews}</Text>
          <Text style={styles.statLabel}>Reviews</Text>
        </View>

        <View style={styles.statItem}>
          <View style={styles.ratingContainer}>
            <Text style={styles.statValue}>{userRating.toFixed(1)}</Text>
            <Ionicons name="star" size={16} color="#000" style={styles.starIcon} />
          </View>
          <Text style={styles.statLabel}>Rating</Text>
        </View>

        <View style={styles.statItem}>
          <Text style={styles.statValue}>{responseRate}%</Text>
          <Text style={styles.statLabel}>Response Rate</Text>
        </View>
      </View>
    </View>
  );
};

export default UserCard;


/* --- Styles --- */
const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5, // For Android shadow
    marginTop: 15,
    marginBottom: 17,
    marginHorizontal: 20,
  },
  profileSection: {
    alignItems: 'center',
    marginRight: 20,
  },
  profileImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginBottom: 10,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  userHandle: {
    fontSize: 14,
    color: '#aaa',
  },
  separator: {
    width: 2,
    height: '100%',
    backgroundColor: '#E5E5E5',
    marginHorizontal: 12,
  },
  statsSection: {
    flex: 1,
    justifyContent: 'space-between',
  },
  statItem: {
    marginBottom: 10,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  starIcon: {
    marginLeft: 4,
  },
});
