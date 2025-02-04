import Colors from '@/constants/Colors'; // If you have a colors file, otherwise replace with #FF6211
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

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
    snippet: 'Airbnb update: A request to book...',
    dateRange: '25–27 May · Santorini',
    time: 'Yesterday',
    avatarUrl: 'https://randomuser.me/api/portraits/men/85.jpg',
  },
  // ...
];

const MessagesScreen: React.FC = () => {
  const [filters, setFilters] = useState(FILTERS);

  const handleFilterPress = (id: string) => {
    setFilters((prev) =>
      prev.map((f) => ({ ...f, active: f.id === id }))
    );
  };

  const handleConversationPress = (convId: string) => {
    console.log('Pressed conversation:', convId);
  };

  const renderConversationItem = ({ item }: any) => (
    <TouchableOpacity
      style={styles.conversationItem}
      onPress={() => handleConversationPress(item.id)}
      activeOpacity={0.8}
    >
      <Image source={{ uri: item.avatarUrl }} style={styles.avatar} />
      <View style={styles.conversationDetails}>
        <View style={styles.conversationRow}>
          <View style={styles.statusContainer}>
            <View
              style={[styles.statusDot, { backgroundColor: item.statusColor }]}
            />
            <Text style={styles.statusText}>{item.status}</Text>
          </View>
          <Text style={styles.timeText}>{item.time}</Text>
        </View>
        <Text style={styles.conversationName} numberOfLines={1}>
          {item.name}
        </Text>
        <Text style={styles.conversationSnippet} numberOfLines={1}>
          {item.snippet}
        </Text>
        <Text style={styles.conversationDates}>{item.dateRange}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Top bar */}
      <View style={styles.headerContainer}>
        <View style={styles.leftPlaceholder} />
        <Text style={styles.headerTitle}>Messages</Text>
        <TouchableOpacity style={styles.headerIconButton}>
          <Ionicons name="search" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      {/* (Optional) Filter chips row */}
      {/* <ScrollView horizontal ...> ... </ScrollView> */}

      {/* Conversation list */}
      <FlatList
        data={CONVERSATIONS}
        keyExtractor={(item) => item.id}
        renderItem={renderConversationItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
      />
    </SafeAreaView>
  );
};

export default MessagesScreen;

/* --- Styles --- */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FB', // unify
  },
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
  listContainer: {
    paddingHorizontal: 12,
  },
  conversationItem: {
    flexDirection: 'row',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  conversationDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  conversationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  statusText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  timeText: {
    fontSize: 13,
    color: '#999',
  },
  conversationName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#000',
    marginBottom: 2,
  },
  conversationSnippet: {
    fontSize: 13,
    color: '#666',
    marginBottom: 2,
  },
  conversationDates: {
    fontSize: 12,
    color: '#999',
  },
});
