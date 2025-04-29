// components/Card.tsx – now with local save state
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { LinearGradient } from "expo-linear-gradient";

/* ---------- props & types ---------- */
export interface Listing {
  id: string;
  imageUrl: string;
  listing: string;
  category: string;
  size: string;
  rentalPrice: number;
  rating: number;
}

interface CardProps {
  data: Listing;
  saved: boolean;              // value received from parent at mount
  onToggleSave: () => void;    // parent callback (still fired)
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
}

/* ---------- component ---------- */
const Card: React.FC<CardProps> = ({
  data,
  saved,
  onToggleSave,
  onPress,
  style,
}) => {
  /* keep a mirror of “saved” locally so every card re-renders in isolation */
  const [isSaved, setIsSaved] = useState(saved);

  /* if parent changes the prop later, sync it */
  useEffect(() => setIsSaved(saved), [saved]);

  const handleHeart = () => {
    setIsSaved((prev) => !prev); // instant visual feedback
    onToggleSave();             // let parent know (if it cares)
  };

  return (
    <TouchableOpacity activeOpacity={0.9} onPress={onPress} style={[styles.cardWrapper, style]}>
      <View style={styles.imageWrapper}>
        <Image source={{ uri: data.imageUrl }} style={styles.image} />

        {/* fade at bottom */}
        <LinearGradient colors={["transparent", "rgba(0,0,0,0.7)"]} style={StyleSheet.absoluteFill} />

        {/* heart */}
        <TouchableOpacity style={styles.heartTouch} onPress={handleHeart} hitSlop={8}>
          <Ionicons
            name={isSaved ? "heart" : "heart-outline"}
            size={22}
            color={isSaved ? "#FF6211" : "#fff"}
          />
        </TouchableOpacity>

        {/* bottom copy */}
        <View style={styles.textOverlay}>
          <Text style={styles.title} numberOfLines={1}>
            {data.listing}
          </Text>
          <Text style={styles.subtitle} numberOfLines={1}>
            {`${data.category} • ${data.size}`}
          </Text>
          <View style={styles.bottomRow}>
            <Text style={styles.price}>${data.rentalPrice}/day</Text>
            <View style={styles.ratingRow}>
              <Ionicons name="star" size={14} color="#FFD700" />
              <Text style={styles.ratingText}>{data.rating.toFixed(1)}</Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Card;

/* ---------- styles ---------- */
const styles = StyleSheet.create({
  cardWrapper: { width: "48%", marginBottom: 20 },
  imageWrapper: {
    aspectRatio: 3 / 4,
    borderRadius: 20,
    overflow: "hidden",
    backgroundColor: "#eee",
  },
  image: { ...StyleSheet.absoluteFillObject },
  heartTouch: { position: "absolute", top: 10, right: 10, zIndex: 2 },
  textOverlay: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  title: { fontSize: 15, fontWeight: "700", color: "#fff" },
  subtitle: { fontSize: 12, color: "#fff", marginTop: 2 },
  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 6,
  },
  price: { fontSize: 13, fontWeight: "600", color: "#fff" },
  ratingRow: { flexDirection: "row", alignItems: "center" },
  ratingText: { marginLeft: 3, fontSize: 12, fontWeight: "600", color: "#fff" },
});
