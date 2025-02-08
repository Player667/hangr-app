import React, { useState, useEffect, useRef } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Animated,
  Dimensions,
  Pressable,
  PanResponder,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'; // Import LinearGradient for button styling
import Ionicons from 'react-native-vector-icons/Ionicons';
import ClosetCard from '@/components/ClosetCard';
import { LISTING_ITEMS } from '@/constants/MockData';
import { SAMPLE_USERS } from '@/constants/MockData';
import { useNavigation } from '@react-navigation/native';

const SCREEN_WIDTH = Dimensions.get('window').width;

const ProfileScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [myCloset] = useState(LISTING_ITEMS);
  const [mainUser] = useState(SAMPLE_USERS[0]);

  // Settings Bar

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuAnim = useRef(new Animated.Value(SCREEN_WIDTH)).current;

  // Open Settings Menu
  // Open Menu
  const openMenu = () => {
    setIsMenuOpen(true);
    Animated.timing(menuAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  // Close Menu
  const closeMenu = () => {
    Animated.timing(menuAnim, {
      toValue: SCREEN_WIDTH,
      duration: 300,
      useNativeDriver: true,
    }).start(() => setIsMenuOpen(false));
  };

  // Pan Responder for Swipe Gesture (Right to Left)
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) => Math.abs(gestureState.dx) > 10,
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dx > -50) {
          menuAnim.setValue(gestureState.dx);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dx > 100) {
          closeMenu();
        } else {
          openMenu();
        }
      },
    })
  ).current;

  // Log Out Function
  const handleLogout = () => {
    closeMenu();
    navigation.replace('Landing');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* -- Header -- */}
      <View style={styles.headerContainer}>
        <View style={styles.leftPlaceholder} />
        <Text style={styles.headerTitle}>Profile</Text>
        <TouchableOpacity style={styles.headerIconButton} onPress={openMenu}>
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


      {/* Settings Overlay */}
      {isMenuOpen && <Pressable style={styles.overlay} onPress={closeMenu} />}

      {/* Right-Side Sliding Menu */}
      <Animated.View
        style={[styles.menuContainer, { transform: [{ translateX: menuAnim }] }]}
        {...panResponder.panHandlers}
      >
        <Text style={styles.menuTitle}>Settings</Text>

        {/* Button 1 */}
        <TouchableOpacity style={styles.menuButton}>
          <Ionicons name="person-outline" size={22} color="#000" />
          <Text style={styles.menuButtonText}>Button 1</Text>
        </TouchableOpacity>
        <View style={styles.menuDivider} />

        {/* Button 2 */}
        <TouchableOpacity style={styles.menuButton}>
          <Ionicons name="notifications-outline" size={22} color="#000" />
          <Text style={styles.menuButtonText}>Button 2</Text>
        </TouchableOpacity>
        <View style={styles.menuDivider} />

        {/* Button 3 */}
        <TouchableOpacity style={styles.menuButton}>
          <Ionicons name="settings-outline" size={22} color="#000" />
          <Text style={styles.menuButtonText}>Button 3</Text>
        </TouchableOpacity>
        <View style={styles.menuDivider} />

        {/* Logout Button */}
        <TouchableOpacity style={styles.menuButton} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={22} color="#000" />
          <Text style={styles.menuButtonText}>Log Out</Text>
        </TouchableOpacity>
      </Animated.View>
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

  /* Settings Menu */
  menuContainer: {
    position: 'absolute',
    top: 0,
    right: -50,
    width: 350,
    height: Dimensions.get('window').height, // Full height to overlap Add Listing button
    backgroundColor: '#fff',
    paddingTop: 100,
    paddingHorizontal: 20,
    paddingRight: 70,
    shadowColor: '#000',
    shadowOffset: { width: -2, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    zIndex: 20, // Ensure it appears above everything
  },
  menuTitle: {
    fontSize: 22, // Slightly larger for better readability
    fontWeight: '700', // Bolder for emphasis
    textAlign: 'left', // Align text to left for a clean structure
    color: '#000',
    marginBottom: 25,
    paddingHorizontal: 10, // Adds slight padding to the title
  },
 
  menuButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 0,
    justifyContent: 'flex-start', // Align text/icons to the left
    marginHorizontal: 10, // Align with the menu content
  },
  menuButtonText: {
    color: '#000',
    fontSize: 18,
    fontWeight: '600', // Medium bold
    marginLeft: 10,
    letterSpacing: 0.5, // Improves spacing for readability
  },  
  menuDivider: {
    height: 1,
    backgroundColor: '#ddd', // Light gray divider
    marginVertical: 0, // Space above and below the divider
    width: '100%',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0)',
  },
});
