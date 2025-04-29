// =============================================================================
// screens/ProfileScreen.tsx – v7  ⭐ fixes pfp overlap with header
// =============================================================================
import React, { useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  FlatList,
  Image,
  PanResponder,
  Pressable,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as Haptics from 'expo-haptics';

import ClosetCard from '@/components/ClosetCard';
import { LISTING_ITEMS, SAMPLE_USERS } from '@/constants/MockData';
import Colors from '@/constants/Colors';

/* -------------------------------------------------------------------------- */
const { width: W, height: H } = Dimensions.get('window');
const HEADER_EXPANDED = 70;
const HEADER_COLLAPSED = 64;
const AVATAR_RADIUS = 50; // for layout math

/* -------------------------------------------------------------------------- */
export default function ProfileScreen({ navigation }: any) {
  const insets = useSafeAreaInsets();

  /* data */
  const [user] = useState(SAMPLE_USERS[0]);
  const closet = LISTING_ITEMS.filter((i) => i.listerId === 'user0');

  /* ---------- collapsible header ---------- */
  const scrollY = useRef(new Animated.Value(0)).current;
  const headerHeight = scrollY.interpolate({
    inputRange: [0, HEADER_EXPANDED - HEADER_COLLAPSED],
    outputRange: [HEADER_EXPANDED + insets.top, HEADER_COLLAPSED + insets.top],
    extrapolate: 'clamp',
  });
  const titleFont = scrollY.interpolate({
    inputRange: [0, HEADER_EXPANDED - HEADER_COLLAPSED],
    outputRange: [20, 17],
    extrapolate: 'clamp',
  });

  /* ---------- settings drawer ---------- */
  const [drawer, setDrawer] = useState(false);
  const drawerX = useRef(new Animated.Value(W)).current;
  const openDrawer = () => {
    setDrawer(true);
    Animated.spring(drawerX, { toValue: 0, useNativeDriver: true }).start();
  };
  const closeDrawer = () =>
    Animated.spring(drawerX, { toValue: W, useNativeDriver: true }).start(() => setDrawer(false));

  const pan = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, g) => Math.abs(g.dx) > 8,
      onPanResponderMove: (_, g) => g.dx > -60 && drawerX.setValue(g.dx),
      onPanResponderRelease: (_, g) => (g.dx > 90 ? closeDrawer() : openDrawer()),
    }),
  ).current;

  /* ---------- closet renderer ---------- */
  const renderCard = ({ item }: any) => (
    <ClosetCard
      imageUrl={item.imageUrl}
      listing={item.listing}
      category={item.category}
      size={item.size}
      rentalPrice={item.rentalPrice}
      style={{ width: (W - 36) / 2 }}
      onPress={() => navigation.navigate('Listing', { listingData: item })}
    />
  );

  /* ---------------------------------------------------------------------- */
  return (
    <SafeAreaView style={s.root} edges={['top']}>
      {/* ===== Collapsible header ===== */}
      <Animated.View style={[s.header, { height: headerHeight }]}>        
        <View style={[s.headerContent, { paddingTop: insets.top + 8 }]}>          
          <View style={s.headerRow}>
            <Animated.Text style={[s.headerTitle, { fontSize: titleFont }]}>Profile</Animated.Text>
            <TouchableOpacity hitSlop={8} onPress={openDrawer}>
              <Ionicons name="settings-outline" size={24} color="#000" />
            </TouchableOpacity>
          </View>
          <Text style={s.headerSub}>{closet.length} items in closet</Text>
        </View>
      </Animated.View>

      {/* ===== scrolling content ===== */}
      <Animated.FlatList
        data={closet}
        keyExtractor={(i) => i.id}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        /* extra padding ensures avatar sits wholly beneath header */
        contentContainerStyle={{ paddingTop: HEADER_EXPANDED + AVATAR_RADIUS + 34, paddingBottom: 140 }}
        columnWrapperStyle={{ justifyContent: 'space-between', paddingHorizontal: 12 }}
        renderItem={renderCard}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false },
        )}
        ListHeaderComponent={
          <>
            <View style={s.profileCard}>
              <Image source={{ uri: user.profileImage }} style={s.avatar} />
              <Text style={s.name}>{user.name}</Text>
              <Text style={s.handle}>@{user.username}</Text>

              <View style={s.statRow}>
                <Stat val={user.followers} label="Followers" />
                <Stat val={user.following} label="Following" />
                <Stat
                  val={
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Ionicons name="star" size={14} color={Colors.primary} />
                      <Text style={{ fontWeight: '700', marginLeft: 4 }}>{user.userRating.toFixed(1)}</Text>
                    </View>
                  }
                  label="Rating"
                />
              </View>

              <Text style={s.bio} numberOfLines={3}>{user.bio}</Text>
            </View>

            {/* elegant divider */}
            <View style={s.dividerBlock}>
              <View style={s.dividerLine} />
              <Text style={s.dividerText}>My Closet</Text>
              <View style={s.dividerLine} />
            </View>
          </>
        }
      />

      {/* ===== floating FAB ===== */}
      <TouchableOpacity
        style={s.fab}
        activeOpacity={0.85}
        onPress={() => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
          navigation.navigate('AddListingScreen');
        }}
      >
        <Ionicons name="add" size={28} color="#fff" />
      </TouchableOpacity>

      {/* dim overlay */}
      {drawer && <Pressable style={s.overlay} onPress={closeDrawer} />}

      {/* ===== settings drawer ===== */}
      <Animated.View style={[s.drawer, { transform: [{ translateX: drawerX }] }]} {...pan.panHandlers}>
        <Text style={s.drawerTitle}>Settings</Text>
        <DrawerBtn icon="person-outline" label="Account" />
        <DrawerBtn icon="notifications-outline" label="Notifications" />
        <DrawerBtn icon="settings-outline" label="Preferences" />
        <DrawerBtn
          icon="log-out-outline"
          label="Log out"
          onPress={() => {
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
            closeDrawer();
          }}
        />
      </Animated.View>
    </SafeAreaView>
  );
}

/* ---------- helpers ---------- */
const Stat = ({ val, label }: { val: any; label: string }) => (
  <View style={s.statChip}>
    {typeof val === 'function' ? val() : <Text style={s.statVal}>{val}</Text>}
    <Text style={s.statLbl}>{label}</Text>
  </View>
);

const DrawerBtn = ({ icon, label, onPress }: { icon: string; label: string; onPress?: () => void }) => (
  <TouchableOpacity style={s.drawerBtn} activeOpacity={0.8} onPress={onPress}>
    <Ionicons name={icon} size={22} color="#000" style={{ width: 28 }} />
    <Text style={s.drawerTxt}>{label}</Text>
    <Ionicons name="chevron-forward" size={20} color="#999" />
  </TouchableOpacity>
);

/* ---------- styles ---------- */
const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#F8F9FB' },
  /* header */
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#F8F9FB',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#e8e8e8',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 4,
    zIndex: 10,
  },
  headerContent: { paddingHorizontal: 24 },
  headerRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  headerTitle: { fontWeight: '700', color: '#111' },
  headerSub: { marginTop: 2, fontSize: 13, fontWeight: '500', color: '#666' },
  /* profile card */
  profileCard: {
    marginHorizontal: 24,
    backgroundColor: '#fff',
    borderRadius: 18,
    alignItems: 'center',
    paddingTop: AVATAR_RADIUS + 20,
    paddingBottom: 28,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 3,
  },
  avatar: {
    position: 'absolute',
    top: -AVATAR_RADIUS,
    width: AVATAR_RADIUS * 2,
    height: AVATAR_RADIUS * 2,
    borderRadius: AVATAR_RADIUS,
    borderWidth: 3,
    borderColor: '#fff',
  },
  name: { fontSize: 20, fontWeight: '700', color: '#000' },
  handle: { fontSize: 14, color: '#666', marginTop: 2 },
  statRow: { flexDirection: 'row', marginTop: 16 },
  statChip: {
    backgroundColor: '#F3F4F7',
    borderRadius: 14,
    paddingVertical: 6,
    paddingHorizontal: 14,
    marginHorizontal: 4,
    alignItems: 'center',
  },
  statVal: { fontWeight: '700', color: '#000', fontSize: 13 },
  statLbl: { fontSize: 11, color: '#666' },
  bio: {
    marginTop: 16,
    paddingHorizontal: 24,
    fontSize: 13,
    lineHeight: 19,
    color: '#444',
    textAlign: 'center',
  },
  /* elegant divider */
  dividerBlock: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 28,
    marginHorizontal: 24,
  },
  dividerLine: { flex: 1, height: StyleSheet.hairlineWidth, backgroundColor: '#ccc' },
  dividerText: { marginHorizontal: 12, fontSize: 14, fontWeight: '600', color: '#666' },
  /* FAB */
  fab: {
    position: 'absolute',
    right: 24,
    bottom: 34,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.18,
    shadowRadius: 6,
    elevation: 6, 
  },
  /* settings drawer */
  drawer: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 300,
    height: H,
    backgroundColor: '#fff',
    paddingTop: 60,
    paddingHorizontal: 24,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: -5, height: 0 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    zIndex: 20,
  },
  drawerTitle: { fontSize: 22, fontWeight: '700', marginBottom: 28 },
  drawerBtn: { flexDirection: 'row', alignItems: 'center', paddingVertical: 16},
  drawerTxt: { flex: 1, fontSize: 16, fontWeight: '500' },
  overlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.2)' },
});
