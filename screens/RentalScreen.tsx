// =============================================================================
// screens/RentalScreen.tsx – grouped by start‑date sections
// =============================================================================
import React, { useState, useRef } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Animated,
  FlatList,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import RentalCard, { RentalListing } from '@/components/RentalCard';
import { LISTING_ITEMS } from '@/constants/MockData';

type Listing = RentalListing & {
  listerId: string;
  /** demo – YYYY‑MM‑DD string */
  startDate: string;
};

/* ------------------------------------------------------------------ */
/*  Collapsible header dimensions                                      */
/* ------------------------------------------------------------------ */
const HEADER_EXPANDED = 70;
const HEADER_COLLAPSED = 64;

/* ------------------------------------------------------------------ */
/*  Hard‑coded demo grouping                                           */
/* ------------------------------------------------------------------ */
// For this mock, we append a startDate to each item so we can group.
const MOCK_WITH_DATES: Listing[] = (LISTING_ITEMS as Listing[]).map((itm, idx) => ({
  ...itm,
  startDate:
    idx % 3 === 0
      ? '2025-05-10'
      : idx % 3 === 1
      ? '2025-05-18'
      : '2025-06-02',
}));

const RentalScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const [myRentals] = useState<Listing[]>(
    MOCK_WITH_DATES.filter(r => r.listerId !== 'user0'),
  );

  /* ---- group rentals by startDate ---- */
  const sections = Array.from(
    myRentals.reduce((map, item) => {
      const key = item.startDate;
      if (!map.has(key)) map.set(key, [] as Listing[]);
      map.get(key)!.push(item);
      return map;
    }, new Map<string, Listing[]>()),
  )
    .sort() // date order asc
    .map(([dateStr, items]) => ({
      title: formatHeader(dateStr),
      data: items,
    }));

  /* -------------- animation -------------- */
  const scrollY = useRef(new Animated.Value(0)).current;
  const headerHeight = scrollY.interpolate({
    inputRange: [0, HEADER_EXPANDED - HEADER_COLLAPSED],
    outputRange: [HEADER_EXPANDED + insets.top, HEADER_COLLAPSED + insets.top],
    extrapolate: 'clamp',
  });
  const titleFontSize = scrollY.interpolate({
    inputRange: [0, HEADER_EXPANDED - HEADER_COLLAPSED],
    outputRange: [20, 17],
    extrapolate: 'clamp',
  });

  /* helpers */
  const renderCard = ({ item }: { item: Listing }) => (
    <RentalCard
      imageUrl={item.imageUrl}
      listing={item.listing}
      category={item.category}
      size={item.size}
      rentalPrice={item.rentalPrice}
      rating={item.rating}
      style={{ width: '48%' }}
      onPress={() => navigation.navigate('Listing', { listingData: item })}
    />
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* ===== Collapsible header ===== */}
      <Animated.View style={[styles.header, { height: headerHeight }]}>
        <View style={[styles.headerContent, { paddingTop: insets.top + 8 }]}>
          <View style={styles.headerRow}>
            <Animated.Text style={[styles.headerTitle, { fontSize: titleFontSize }]}>Rentals</Animated.Text>
          </View>
          <Text style={styles.headerSubtitle}>{myRentals.length} items rented</Text>
        </View>
      </Animated.View>

      {/* ===== Sectioned list ===== */}
      <Animated.ScrollView
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false },
        )}
        scrollEventThrottle={16}
        contentContainerStyle={{ paddingTop: HEADER_EXPANDED + 24, paddingBottom: 80 }}
        showsVerticalScrollIndicator={false}
      >
        {sections.map(section => (
          <View key={section.title} style={styles.sectionWrapper}>
            <Text style={styles.sectionHeader}>{section.title}</Text>

            <FlatList
              data={section.data}
              keyExtractor={item => item.id}
              renderItem={renderCard}
              numColumns={2}
              scrollEnabled={false} // let outer ScrollView handle scrolling
              columnWrapperStyle={{ justifyContent: 'space-between', paddingHorizontal: 16 }}
            />
          </View>
        ))}
      </Animated.ScrollView>
    </SafeAreaView>
  );
};

export default RentalScreen;

/* ------ utils ------ */
function formatHeader(dateStr: string) {
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString(undefined, {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

/* ------------------------------------------------------------------ */
/*  styles                                                            */
/* ------------------------------------------------------------------ */
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FB' },
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
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: { fontWeight: '700', color: '#111' },
  headerSubtitle: { marginTop: 2, fontSize: 13, fontWeight: '500', color: '#666' },
  actionBtn: { padding: 4 },

  /* sections */
  sectionWrapper: { marginBottom: 32 },
  sectionHeader: {
    fontSize: 18,
    fontWeight: '700',
    marginLeft: 24,
    marginBottom: 16,
    color: '#111',
  },
});
