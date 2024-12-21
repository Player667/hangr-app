import React from 'react';
import { 
  View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Platform, Keyboard
} from 'react-native';
import Colors from '@/constants/Colors';

const ChatScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to the Chat Screen!</Text>
    </View>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff', // Add a white background color
  },
  text: {
    color: '#000000', // Ensure text is black
    fontSize: 40, // Optional: Adjust font size for better visibility
  },
});
