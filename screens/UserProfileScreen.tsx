// =============================================================================
// screens/UserProfileScreen.tsx – minimalist public‑profile (uses Card)
// =============================================================================
import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Card, { Listing } from '@/components/Card';
import { LISTING_ITEMS } from '@/constants/MockData';

/* -------------------------------------------------------------------------- */
interface Props {
  navigation: any;
  route: { params: { userData: any } };
}

const UserProfileScreen: React.FC<Props> = ({ navigation, route }) => {
  const { userData } = route.params || {};
  const userListings: Listing[] = LISTING_ITEMS.filter(
    (i) => i.listerId === userData.userId
  );

  /* ---------- render single Card ---------- */
  const renderCard = ({ item }: { item: Listing }) => (
    <TouchableOpacity
      style={{ width: '48%' }}
      onPress={() => navigation.navigate('Listing', { listingData: item })}
    >
      <Card
        data={item}
        saved={false}
        onToggleSave={() => {}}
        onPress={() => navigation.navigate('Listing', { listingData: item })}
        style={{ width: '100%' }}
      />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.root}>
      {/* ===== header ===== */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={26} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{userData.name}'s Profile</Text>
        <View style={{ width: 26 }} /> {/* alignment placeholder */}
      </View>

      {/* ===== list ===== */}
      <FlatList
        data={userListings}
        keyExtractor={(item) => item.id}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={{ justifyContent: 'space-between', paddingHorizontal: 12 }}
        ListHeaderComponent={
          <>
            {/* profile block */}
            <View style={styles.profileBlock}>
              <View style={styles.avatarWrap}>
                <Image source={{ uri: userData.profileImage }} style={styles.avatar} />
              </View>
              <Text style={styles.name}>{userData.name}</Text>
              <Text style={styles.bio}>{userData.bio}</Text>

              {/* stats */}
              <View style={styles.statsRow}>
                <Stat value={userData.followers} label="Followers" />
                <Stat value={userData.following} label="Following" />
                <Stat
                  value={
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Ionicons name="star" size={14} color="#FF6211" />
                      <Text style={{ fontWeight: '700', marginLeft: 4 }}>
                        {userData.userRating}
                      </Text>
                    </View>
                  }
                  label="Rating"
                />
              </View>
            </View>

            {/* divider */}
            <View style={styles.divider} />
            <Text style={styles.sectionTitle}>Listings</Text>
          </>
        }
        renderItem={renderCard}
        ListFooterComponent={<View style={{ height: 20 }} />}
      />
    </SafeAreaView>
  );
};

export default UserProfileScreen;

/* ---------- helpers ---------- */
const Stat = ({ value, label }: { value: any; label: string }) => (
  <View style={styles.statItem}>
    {typeof value === 'function' ? value() : <Text style={styles.statVal}>{value}</Text>}
    <Text style={styles.statLbl}>{label}</Text>
  </View>
);

/* ---------- styles ---------- */
const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#F8F9FB' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
    backgroundColor: '#F8F9FB',
  },
  backBtn: { padding: 4 },
  headerTitle: { flex: 1, textAlign: 'center', fontSize: 16, fontWeight: '700', color: '#000' },

  /* profile block */
  profileBlock: { alignItems: 'center', marginTop: 24, paddingHorizontal: 16 },
  avatarWrap: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#eee',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
  },
  avatar: { width: '100%', height: '100%', resizeMode: 'cover' },
  name: { marginTop: 16, fontSize: 22, fontWeight: '700', color: '#000' },
  bio: {
    marginTop: 8,
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 20,
    paddingHorizontal: 16,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  statItem: { alignItems: 'center', flex: 1 },
  statVal: { fontSize: 18, fontWeight: '600', color: '#000' },
  statLbl: { marginTop: 4, fontSize: 14, color: '#666' },

  divider: {
    height: 1,
    width: '90%',
    backgroundColor: '#ddd',
    alignSelf: 'center',
    marginVertical: 24,
  },
  sectionTitle: { marginLeft: 16, marginBottom: 16, fontSize: 18, fontWeight: '600', color: '#333' },
});
