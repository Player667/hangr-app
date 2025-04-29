// screens/ExploreScreen.tsx
import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  StatusBar,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { SafeAreaView } from "react-native-safe-area-context";

import Card, { Listing } from "@/components/Card";
import { LISTING_ITEMS } from "@/constants/MockData";

/* ------------------------------------------------------------------ */
/*  Filters config                                                    */
/* ------------------------------------------------------------------ */
interface FilterItem {
  label: string;
  iconName: string;
}
const FILTERS: FilterItem[] = [
  { label: "T-Shirts", iconName: "shirt-outline" },
  { label: "Jeans", iconName: "briefcase-outline" },
  { label: "Sneakers", iconName: "footsteps-outline" },
  { label: "Hats", iconName: "school-outline" },
  { label: "Dresses", iconName: "rose-outline" },
  { label: "Outerwear", iconName: "cloudy-outline" },
  { label: "Backpacks", iconName: "bag-outline" },
  { label: "Watches", iconName: "watch-outline" },
  { label: "Glasses", iconName: "glasses-outline" },
];

/* ------------------------------------------------------------------ */
/*  Screen                                                            */
/* ------------------------------------------------------------------ */
const ExploreScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [selectedFilter, setSelectedFilter] = useState("");
  const [search, setSearch] = useState("");

  /* listings to show */
  const visibleItems = useMemo(
    () =>
      LISTING_ITEMS.filter(
        (i) =>
          i.listerId !== "user0" &&
          (selectedFilter ? i.category === selectedFilter : true) &&
          i.listing.toLowerCase().includes(search.toLowerCase())
      ),
    [selectedFilter, search]
  );

  /* ------------------------------------------------------------ */
  /*  header element                                              */
  /* ------------------------------------------------------------ */
  const Header = (
    <>
      {/* sticky header */}
      <View style={styles.header}>
        {/* search bar */}
        <View style={styles.searchBar}>
          <Ionicons name="search-outline" size={18} color="#666" style={{ marginRight: 6 }} />
          <TextInput
            value={search}
            onChangeText={setSearch}
            placeholder="Search for your next fit…"
            placeholderTextColor="#888"
            style={styles.searchInput}
          />
        </View>

        {/* filters row */}
        <FlatList
          data={FILTERS}
          horizontal
          keyExtractor={(i) => i.label}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterScroll}
          renderItem={({ item }) => {
            const active = selectedFilter === item.label;
            return (
              <TouchableOpacity
                onPress={() => setSelectedFilter(active ? "" : item.label)}
                style={[styles.chip, active && styles.chipActive]}
              >
                <Ionicons
                  name={item.iconName}
                  size={16}
                  color={active ? "#fff" : "#444"}
                  style={{ marginRight: 5 }}
                />
                <Text style={[styles.chipLabel, active && { color: "#fff" }]}>{item.label}</Text>
              </TouchableOpacity>
            );
          }}
        />
      </View>

      {/* spacer so cards don’t butt up against the header */}
      <View style={{ height: 15 }} />
    </>
  );

  /* ------------------------------------------------------------ */
  /*  render                                                      */
  /* ------------------------------------------------------------ */
  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <StatusBar barStyle="dark-content" />
      <FlatList
        ListHeaderComponent={Header}
        stickyHeaderIndices={[0]}          // only the top <View> sticks
        data={visibleItems}
        keyExtractor={(i) => i.id}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={{ justifyContent: "space-between", paddingHorizontal: 16 }}
        contentContainerStyle={{ paddingBottom: 30 }}
        renderItem={({ item }) => (
          <Card
            data={item as Listing}
            saved={false}            // initial state (Card keeps its own)
            onToggleSave={() => {}}  // no-op; Card handles everything locally
            onPress={() => navigation.navigate("Listing", { listingData: item })}
          />
        )}
      />
    </SafeAreaView>
  );
};

export default ExploreScreen;

/* ------------------------------------------------------------------ */
/*  styles                                                            */
/* ------------------------------------------------------------------ */
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F5F6FA" },

  /* header wrapper */
  header: {
    backgroundColor: "#F5F6FA",
    paddingTop: 10,
    paddingBottom: 6,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5E5",
  },

  /* search */
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 18,
    backgroundColor: "#fff",
    borderRadius: 24,
    height: 45,
    paddingHorizontal: 14,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  searchInput: { flex: 1, fontSize: 14, color: "#000" },

  /* filters */
  filterScroll: { paddingVertical: 8, paddingLeft: 14 },
  chip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 18,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 10,
    borderWidth: 1,
    borderColor: "#DDD",
  },
  chipActive: { backgroundColor: "#FF6211", borderColor: "#FF6211" },
  chipLabel: { fontSize: 12, color: "#444", fontWeight: "500" },
});
