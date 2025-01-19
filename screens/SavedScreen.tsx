import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const SavedScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      {/* Title */}
      <Text style={styles.title}>Wishlists</Text>
      
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  title: {
    fontSize: 32, // Increase the font size for emphasis
    fontWeight: 'bold', // Make the text bold
    textAlign: 'center', // Center the title horizontally
    color: '#000', // Use a sharp black color for better readability
    marginBottom: 24, // Space below the title
    fontFamily: 'calibri', // Use system font to achieve a clean look
  },
  sectionContainer: {
    marginBottom: 32,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  gridItem: {
    width: '48%',
    aspectRatio: 1, // Keeps squares proportional
    marginBottom: 8,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  placeholder: {
    backgroundColor: '#ccc', // Gray placeholder color
  },
});

export default SavedScreen;
