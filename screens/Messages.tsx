// screens/MessagesScreen.tsx – with collapsible header
import React, { useRef, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Animated,
  FlatList,
  TouchableOpacity,
  View,
  Text,
  Image,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Colors from '@/constants/Colors';   // or just hard-code “#FF6211”

/* ------------------------------------------------------------------ */
/*  mock data                                                          */
/* ------------------------------------------------------------------ */
const FILTERS = [
  { id: 'hosting', label: 'Hosting', active: true },
  { id: 'unread', label: 'Unread', active: false },
  { id: 'tripstage', label: 'Trip stage', active: false },
  { id: 'list', label: 'List', active: false },
];

const CONVERSATIONS = [
  {
    id: '1',
    status: 'Currently hosting',
    statusColor: '#27AE60',
    name: 'Lisa, Wendy, Jean',
    snippet: 'Jean: Yes, that worked—thanks!',
    dateRange: '1–12 May · Santorini',
    time: '9:32 am',
    avatarUrl: 'https://randomuser.me/api/portraits/women/65.jpg',
  },
  {
    id: '2',
    status: 'Trip requested',
    statusColor: '#EB5757',
    name: 'Edward',
    snippet: 'Airbnb update: A request to book…',
    dateRange: '25–27 May · Santorini',
    time: 'Yesterday',
    avatarUrl: 'https://randomuser.me/api/portraits/men/85.jpg',
  },
];

/* ------------------------------------------------------------------ */
/*  collapsible-header constants                                       */
/* ------------------------------------------------------------------ */
const HEADER_EXPANDED = 70;      // visible height *below* safe-area inset
const HEADER_COLLAPSED = 64;

const MessagesScreen: React.FC = () => {
  const insets = useSafeAreaInsets();

  /* ---------- animation ---------- */
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

  /* ---------- helpers ---------- */
  const renderConversation = ({ item }: any) => (
    <TouchableOpacity style={styles.conversationItem} activeOpacity={0.85}>
      <Image source={{ uri: item.avatarUrl }} style={styles.avatar} />
      <View style={styles.convDetails}>
        <View style={styles.firstRow}>
          <View style={styles.statusWrap}>
            <View style={[styles.statusDot, { backgroundColor: item.statusColor }]} />
            <Text style={styles.statusTxt}>{item.status}</Text>
          </View>
          <Text style={styles.timeTxt}>{item.time}</Text>
        </View>
        <Text style={styles.nameTxt} numberOfLines={1}>
          {item.name}
        </Text>
        <Text style={styles.snippetTxt} numberOfLines={1}>
          {item.snippet}
        </Text>
        <Text style={styles.dateTxt}>{item.dateRange}</Text>
      </View>
    </TouchableOpacity>
  );

  /* ---------- UI ---------- */
  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      {/* Collapsible header */}
      <Animated.View style={[styles.header, { height: headerHeight }]}>
        <View style={[styles.headerContent, { paddingTop: insets.top + 8 }]}>
          <View style={styles.headerRow}>
            <Animated.Text style={[styles.headerTitle, { fontSize: titleFontSize }]}>
              Messages
            </Animated.Text>
          </View>
          <Text style={styles.subtitle}>{CONVERSATIONS.length} conversations</Text>
        </View>
      </Animated.View>

      {/* List */}
      <Animated.FlatList
        data={CONVERSATIONS}
        keyExtractor={(item) => item.id}
        renderItem={renderConversation}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: HEADER_EXPANDED + 10,
          paddingBottom: 40,
          paddingHorizontal: 12,
        }}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false },
        )}
        scrollEventThrottle={16}
      />
    </SafeAreaView>
  );
};

export default MessagesScreen;

/* ------------------------------------------------------------------ */
/*  styles                                                            */
/* ------------------------------------------------------------------ */
const styles = StyleSheet.create({
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
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: { fontWeight: '700', color: '#111' },
  subtitle: { marginTop: 2, fontSize: 13, fontWeight: '500', color: '#666' },
  actionBtn: { padding: 4 },

  /* conversation cell */
  conversationItem: { flexDirection: 'row', paddingVertical: 14, borderBottomColor: '#EFEFEF', borderBottomWidth: 1 },
  avatar: { width: 48, height: 48, borderRadius: 24, marginRight: 12 },
  convDetails: { flex: 1 },
  firstRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  statusWrap: { flexDirection: 'row', alignItems: 'center' },
  statusDot: { width: 8, height: 8, borderRadius: 4, marginRight: 6 },
  statusTxt: { fontSize: 14, fontWeight: '600', color: '#333' },
  timeTxt: { fontSize: 13, color: '#999' },
  nameTxt: { fontSize: 15, fontWeight: '600', color: '#000', marginBottom: 2 },
  snippetTxt: { fontSize: 13, color: '#666', marginBottom: 2 },
  dateTxt: { fontSize: 12, color: '#999' },
});

