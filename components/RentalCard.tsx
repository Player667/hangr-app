// components/RentalCard.tsx
import React, { useState } from "react";
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

/* ---------- props ---------- */
export interface RentalListing {
  id: string;
  imageUrl: string;
  listing: string;
  category: string;
  size: string;
  rentalPrice: number;
  rating?: number;
}

interface RentalCardProps extends RentalListing {
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

/* ---------- component ---------- */
const RentalCard: React.FC<RentalCardProps> = ({
  imageUrl,
  listing,
  category,
  size,
  rentalPrice,
  rating,
  onPress,
  style,
}) => {
  /* optional local state if you decide to like / bookmark a rental later */
  const [liked, setLiked] = useState(false);

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      style={[styles.cardWrapper, style]}
    >
      {/* ---------- image ---------- */}
      <View style={styles.imageWrapper}>
        <Image source={{ uri: imageUrl }} style={styles.image} />

        {/* bottom gradient for text legibility */}
        <LinearGradient
          colors={["transparent", "rgba(0,0,0,0.7)"]}
          style={StyleSheet.absoluteFill}
        />

        {/* calendar badge (unique to RentalCard) */}
        <View style={styles.calendarBadge}>
          <Ionicons name="calendar-outline" size={18} color="#fff" />
        </View>

        {/* OPTIONAL: heart in top-left if you ever need it
        <TouchableOpacity style={styles.heartTouch} onPress={() => setLiked(!liked)}>
          <Ionicons
            name={liked ? "heart" : "heart-outline"}
            size={20}
            color={liked ? "#FF6211" : "#fff"}
          />
        </TouchableOpacity>
        */}
      </View>

      {/* ---------- copy overlay ---------- */}
      <View style={styles.textOverlay}>
        <Text style={styles.title} numberOfLines={1}>
          {listing}
        </Text>
        <Text style={styles.subtitle} numberOfLines={1}>
          {`${category} • ${size}`}
        </Text>

        <View style={styles.bottomRow}>
          <Text style={styles.price}>${rentalPrice}/day</Text>

          {typeof rating === "number" && !Number.isNaN(rating) && (
            <View style={styles.ratingRow}>
              <Ionicons name="star" size={14} color="#FFD700" />
              <Text style={styles.ratingText}>{rating.toFixed(1)}</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default RentalCard;

/* ---------- styles ---------- */
const styles = StyleSheet.create({
  cardWrapper: {
    borderRadius: 20,
    overflow: "hidden",
    backgroundColor: "#fff",
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 5,
    elevation: 3,
  },

  /* image */
  imageWrapper: {
    aspectRatio: 3 / 4,
    backgroundColor: "#eee",
  },
  image: { ...StyleSheet.absoluteFillObject },

  /* badges */
  calendarBadge: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "rgba(0,0,0,0.45)",
    borderRadius: 16,
    padding: 6,
  },
  heartTouch: {
    position: "absolute",
    top: 10,
    left: 10,
    padding: 6,
    borderRadius: 16,
    backgroundColor: "rgba(0,0,0,0.45)",
  },

  /* overlayed text */
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
  ratingText: {
    marginLeft: 3,
    fontSize: 12,
    fontWeight: "600",
    color: "#fff",
  },
});
