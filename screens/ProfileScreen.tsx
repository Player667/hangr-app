import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  FlatList,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'; // Import LinearGradient for button styling
import Ionicons from 'react-native-vector-icons/Ionicons';
import ClosetCard from '@/components/ClosetCard';
import { LISTING_ITEMS } from '@/constants/MockData';
import { SAMPLE_USERS } from '@/constants/MockData';

const ProfileScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [myCloset] = useState(LISTING_ITEMS);
  const [mainUser] = useState(SAMPLE_USERS[0]);

  return (
    <SafeAreaView style={styles.container}>
      {/* -- Header -- */}
      <View style={styles.headerContainer}>
        <View style={styles.leftPlaceholder} />
        <Text style={styles.headerTitle}>Profile</Text>
        <TouchableOpacity style={styles.headerIconButton}>
          <Ionicons name="settings-outline" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Use FlatList for the Entire Screen */}
      <FlatList
        data={myCloset.filter(item => item.listerId === 'user0')}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: 'space-between', paddingHorizontal: 10 }}
        contentContainerStyle={{ paddingBottom: 80 }} 
        ListHeaderComponent={(
          <>
            {/* -- Profile Info Section -- */}
            <View style={styles.profileInfoContainer}>
              {/* Avatar */}
              <View style={styles.avatarContainer}>
                <Image style={styles.avatar} source={{ uri: mainUser.profileImage }} />
              </View>

              {/* Name and Bio */}
              <Text style={styles.userName}>{mainUser.name}</Text>
              <Text style={styles.userHandle}>{mainUser.username}</Text>
              <Text style={styles.userBio}>{mainUser.bio}</Text>

              {/* Stats Row */}
              <View style={styles.statsContainer}>
                <View style={styles.statItem}>
                  <Text style={styles.statNumber}>{mainUser.followers}</Text>
                  <Text style={styles.statLabel}>Followers</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statNumber}>{mainUser.following}</Text>
                  <Text style={styles.statLabel}>Following</Text>
                </View>
                <View style={styles.statItem}>
                  <View style={styles.ratingRow}>
                    <Ionicons name="star" size={16} color="#FF6211" />
                    <Text style={styles.ratingText}>{mainUser.userRating}</Text>
                  </View>
                  <Text style={styles.statLabel}>Rating</Text>
                </View>
              </View>
            </View>

            {/* -- Divider -- */}
            <View style={styles.divider} />

            {/* -- Closet Section Title -- */}
            <Text style={styles.closetTitle}>My Closet</Text>
          </>
        )}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            style={{ width: '48%' }}
            key={index}
            onPress={() => navigation.navigate('Listing', { listingData: item })}>
            <ClosetCard
              imageUrl={item.imageUrl}
              listing={item.listing}
              category={item.category}
              size={item.size}
              rentalPrice={item.rentalPrice}
            />
          </TouchableOpacity>
        )}
      />

      {/* -- Floating "Add Listing" Button -- */}
      <TouchableOpacity
        style={styles.addListingButton}
        onPress={() => navigation.navigate('AddListingScreen')}
      >
        <Ionicons name="add-circle-outline" size={24} color="#fff" style={{ marginRight: 8 }} />
        <Text style={styles.addListingText}>Add Listing</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default ProfileScreen;

/* --- Styles --- */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FB',
  },
  /* Header */
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FB',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  leftPlaceholder: {
    width: 24,
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '700',
    color: '#000',
  },
  headerIconButton: {
    padding: 8,
  },



  /* Profile Info */
  profileInfoContainer: {
    alignItems: 'center',
    marginTop: 24,
    paddingHorizontal: 16,
  },
  avatarContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    overflow: 'hidden',
    backgroundColor: '#eee',
    // Unified shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
  },
  avatar: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  userName: {
    marginTop: 16,
    fontSize: 22,
    fontWeight: '700',
    color: '#000',
  },
  userHandle: {
    marginTop: 3,
    fontSize: 17,
    color: '#666',
  },
  userBio: {
    marginTop: 8,
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 20,
    paddingHorizontal: 16,
  },

  /* Stats */
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: 16,
    // Subtle shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statNumber: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  statLabel: {
    marginTop: 4,
    fontSize: 14,
    color: '#666',
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    marginLeft: 4,
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
  },

  /* Divider */
  divider: {
    height: 1,
    width: '90%',
    backgroundColor: '#ddd',
    alignSelf: 'center',
    marginVertical: 24,
  },

  /* Closet Title */
  closetTitle: {
    marginBottom: 16,
    marginLeft: 16,
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginHorizontal: 0,
  },

  /* Floating Button */
  addListingButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 20,
    position: 'absolute',
    justifyContent: 'center',
    bottom: 30,
    alignSelf: 'center', 
    backgroundColor: '#FF6211',
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 6,
    zIndex: 5,
  },
  gradientButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  addListingText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 20,
  },
});
