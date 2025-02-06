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

const UserProfileScreen: React.FC<{ navigation: any, route: any }> = ({ navigation, route }) => {
  const { userData } = route.params || {};
  const [userCloset] = useState(LISTING_ITEMS);

  return (
    <SafeAreaView style={styles.container}>

      {/* -- Header -- */}
      <View style={styles.headerContainer}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={28} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile</Text>
        <TouchableOpacity style={styles.headerIconButton}>
          <Ionicons name="settings-outline" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
      >
        {/* -- Profile Info Section -- */}
        <View style={styles.profileInfoContainer}>
          {/* Avatar */}
          <View style={styles.avatarContainer}>
            <Image
              style={styles.avatar}
              source={{
                uri: userData.profileImage,
              }}
            />
          </View>

          {/* Name and Bio */}
          <Text style={styles.userName}>{userData.name}</Text>
          <Text style={styles.userBio}>{userData.bio}</Text>

          {/* Stats Row */}
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{userData.followers}</Text>
              <Text style={styles.statLabel}>Followers</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{userData.following}</Text>
              <Text style={styles.statLabel}>Following</Text>
            </View>
            <View style={styles.statItem}>
              <View style={styles.ratingRow}>
                <Ionicons name="star" size={16} color="#FF6211" />
                <Text style={styles.ratingText}>{userData.userRating}</Text>
              </View>
              <Text style={styles.statLabel}>Rating</Text>
            </View>
          </View>
        </View>

        {/* -- Divider -- */}
        <View style={styles.divider} />

        {/* -- Closet Section -- */}
        <Text style={styles.closetTitle}>My Closet</Text>
        <FlatList
        data={userCloset.filter(item => item.listerId === userData.userId)}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            style={{ width: '48%' }}
            key={index}
                      onPress={() => {
                        navigation.navigate('Listing', { listingData: item });
                      }}>
            <ClosetCard
            imageUrl={item.imageUrl}
            listing={item.listing}
            category={item.category}
            size={item.size}
            rentalPrice={item.rentalPrice}/>

          </TouchableOpacity>
  
        )}
        keyExtractor={(cardData, index) => index.toString()}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: 'space-between', paddingHorizontal: 10 }}/>

      </ScrollView>
    </SafeAreaView>
  );
};

export default UserProfileScreen;

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
  backButton: {
    padding: 8,
  },

  /* ScrollView */
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    paddingBottom: 80,
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
    marginHorizontal: 16,
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
