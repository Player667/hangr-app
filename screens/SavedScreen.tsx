import React, { useRef } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Animated,
  FlatList,
  TouchableOpacity,
  View,
  Text,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Card from '@/components/Card';
import { LISTING_ITEMS } from '@/constants/MockData';

export type Listing = (typeof LISTING_ITEMS)[number];

/* ------------------------------------------------------------------ */
/*  Collapsible header dimensions                                      */
/* ------------------------------------------------------------------ */
const HEADER_EXPANDED = 70; // visual height *below* safe-area inset
const HEADER_COLLAPSED = 64;

const SavedScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const insets = useSafeAreaInsets(); // to respect notch / status bar

  const savedItems: Listing[] = LISTING_ITEMS.filter((i) => i.listerId !== 'user30');

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

  /* -------------- helpers -------------- */
  const renderCard = ({ item }: { item: Listing }) => (
    <Card
      data={item}
      saved={true}
      onToggleSave={() => {}}
      onPress={() => navigation.navigate('Listing', { listingData: item })}
      style={{ width: '48%' }}
    />
  );

  /* -------------- UI -------------- */
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* ===== Collapsible header ===== */}
      <Animated.View style={[styles.header, { height: headerHeight }]}>
        <View style={[styles.headerContent, { paddingTop: insets.top + 8 }]}>
          <View style={styles.headerRow}>
            <Animated.Text style={[styles.headerTitle, { fontSize: titleFontSize }]}>Saved</Animated.Text>

          </View>
          <Text style={styles.headerSubtitle}>{savedItems.length} items saved</Text>
        </View>
      </Animated.View>

      {/* ===== List / Empty state ===== */}
      {savedItems.length === 0 ? (
        <View style={[styles.noSavedContainer, { marginTop: HEADER_EXPANDED + insets.top }]}>
          <Ionicons name="bookmark-outline" size={60} color="#bbb" />
          <Text style={styles.noSavedText}>You haven't saved anything yet</Text>
        </View>
      ) : (
        <Animated.FlatList
          data={savedItems}
          keyExtractor={(item) => item.id}
          numColumns={2}
          renderItem={renderCard}
          showsVerticalScrollIndicator={false}
          columnWrapperStyle={{ justifyContent: 'space-between', paddingHorizontal: 16 }}
          contentContainerStyle={{ paddingTop: HEADER_EXPANDED + 20, paddingBottom: 40 }}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: false }
          )}
          scrollEventThrottle={16}
        />
      )}
    </SafeAreaView>
  );
};

export default SavedScreen;

/* ------------------------------------------------------------------ */
/*  styles                                                            */
/* ------------------------------------------------------------------ */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FB',
  },
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
  headerContent: {
    paddingHorizontal: 24,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: {
    fontWeight: '700',
    color: '#111',
  },
  headerSubtitle: {
    marginTop: 2,
    fontSize: 13,
    fontWeight: '500',
    color: '#666',
  },
  actionBtn: {
    padding: 4,
  },
  /* Empty state */
  noSavedContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noSavedText: {
    marginTop: 14,
    fontSize: 14,
    color: '#888',
    fontWeight: '600',
  },
});