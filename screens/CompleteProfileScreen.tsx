// CompleteProfileScreen.tsx

import React, { useRef, useState, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  ScrollView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  TextInput,
  Keyboard,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as ImagePicker from 'expo-image-picker';
import { LinearGradient } from 'expo-linear-gradient';

const SCREEN_WIDTH = Dimensions.get('window').width;

const CompleteProfileScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  // Step / page state
  const scrollRef = useRef<ScrollView>(null);
  const [currentPage, setCurrentPage] = useState(0);

  // Profile data
  const [profilePic, setProfilePic] = useState<string | null>(null);
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');

  // Validation errors
  const [errors, setErrors] = useState({
    profilePic: false,
    fullName: false,
    username: false,
  });

  // For disabling the dropdown or certain elements if keyboard is open
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const showListener = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardVisible(true);
    });
    const hideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardVisible(false);
    });

    return () => {
      showListener.remove();
      hideListener.remove();
    };
  }, []);

  // ---------- Step Indicator
  // Here we're using 2 steps, but you can adapt to 3, etc.
  const renderStepIndicator = () => {
    return (
      <View style={styles.stepIndicatorContainer}>
        <View
          style={[
            styles.stepCircle,
            { backgroundColor: currentPage === 0 ? '#FF6211' : '#E0E0E0' },
          ]}
        />
        <View style={styles.stepLine} />
        <View
          style={[
            styles.stepCircle,
            { backgroundColor: currentPage === 1 ? '#FF6211' : '#E0E0E0' },
          ]}
        />
      </View>
    );
  };

  // ---------- Pagination logic (like in AddListingScreen)
  const handleNextPage = () => {
    // Validate current page’s fields
    if (currentPage === 0) {
      // Page 1 requires a profile pic
      if (!profilePic) {
        setErrors((prev) => ({ ...prev, profilePic: true }));
        return;
      }
    } else if (currentPage === 1) {
      // Page 2 requires fullName and username
      const newErrors = {
        profilePic: errors.profilePic, // not relevant here
        fullName: !fullName.trim(),
        username: !username.trim(),
      };
      setErrors(newErrors);

      // If there's an error, don't proceed
      if (newErrors.fullName || newErrors.username) return;

      // If no errors, we're done -> navigate to main tabs
      // you could also do some final sign up logic or API calls here
      navigation.replace('MainTabs');
      return;
    }

    // If everything is valid, go to next
    const nextIndex = currentPage + 1;
    scrollRef.current?.scrollTo({ x: nextIndex * SCREEN_WIDTH, animated: true });
    setCurrentPage(nextIndex);
  };

  const handlePrevPage = () => {
    if (currentPage === 0) {
      // Go back from the first page
      navigation.goBack();
    } else {
      const prevIndex = currentPage - 1;
      scrollRef.current?.scrollTo({ x: prevIndex * SCREEN_WIDTH, animated: true });
      setCurrentPage(prevIndex);
    }
  };

  const handleMomentumScrollEnd = (e: any) => {
    const offsetX = e.nativeEvent.contentOffset.x;
    const pageIndex = Math.round(offsetX / SCREEN_WIDTH);
    setCurrentPage(pageIndex);
  };

  // ---------- Image Picker
  const pickProfileImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1], // square
      quality: 1,
    });

    if (!result.canceled) {
      const newUri = result.assets[0].uri;
      setProfilePic(newUri);
      // Clear error if it was set
      if (errors.profilePic) {
        setErrors((prev) => ({ ...prev, profilePic: false }));
      }
    }
  };

  // ---------- RENDER
  return (
    <LinearGradient colors={['#ffffff', '#f8f9fc']} style={{ flex: 1 }}>
      <SafeAreaView style={styles.safeArea}>
        {/* Header */}
        <View style={styles.headerContainer}>
          <TouchableOpacity style={styles.backButton} onPress={handlePrevPage}>
            <Ionicons name="arrow-back" size={26} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>
            {currentPage === 0 ? 'Profile Picture' : 'Username & Name'}
          </Text>
          <View style={styles.leftPlaceholder} />
        </View>

        {/* Step Indicator */}
        {renderStepIndicator()}

        {/* Horizontal pages */}
        <ScrollView
          ref={scrollRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          scrollEnabled={false}
          onMomentumScrollEnd={handleMomentumScrollEnd}
          style={{ flex: 1 }}
        >
          {/* PAGE 1: PROFILE PIC */}
          <View style={[styles.pageContainer, { width: SCREEN_WIDTH }]}>
            <View style={styles.pageContent}>
              <Text style={styles.instructionText}>Upload a Profile Picture</Text>
              <TouchableOpacity
                style={[
                  styles.profilePicContainer,
                  errors.profilePic ? styles.errorBorder : null,
                ]}
                onPress={pickProfileImage}
              >
                {profilePic ? (
                  <Image source={{ uri: profilePic }} style={styles.profilePic} />
                ) : (
                  <Ionicons name="camera-outline" size={50} color="#999" />
                )}
              </TouchableOpacity>
            </View>
            <View style={styles.bottomButtonContainer}>
              <TouchableOpacity style={styles.button} onPress={handleNextPage}>
                <Text style={styles.buttonText}>Next</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* PAGE 2: USERNAME + NAME */}
          <View style={[styles.pageContainer, { width: SCREEN_WIDTH }]}>
            <KeyboardAvoidingView
              style={{ flex: 1 }}
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
              <ScrollView
                contentContainerStyle={styles.pageContent}
                keyboardShouldPersistTaps="handled"
              >
                <Text style={styles.instructionText}>Enter Your Name & Username</Text>

                <TextInput
                  style={[
                    styles.input,
                    errors.fullName && styles.errorBorder,
                  ]}
                  placeholder="Full Name"
                  placeholderTextColor="#666"
                  value={fullName}
                  onChangeText={(text) => {
                    setFullName(text);
                    if (errors.fullName && text.trim()) {
                      setErrors((prev) => ({ ...prev, fullName: false }));
                    }
                  }}
                />

                <TextInput
                  style={[
                    styles.input,
                    errors.username && styles.errorBorder,
                  ]}
                  placeholder="Username"
                  placeholderTextColor="#666"
                  value={username}
                  onChangeText={(text) => {
                    setUsername(text);
                    if (errors.username && text.trim()) {
                      setErrors((prev) => ({ ...prev, username: false }));
                    }
                  }}
                />
              </ScrollView>

              <View style={styles.bottomButtonContainer}>
                <TouchableOpacity style={styles.button} onPress={handleNextPage}>
                  <Text style={styles.buttonText}>Finish</Text>
                </TouchableOpacity>
              </View>
            </KeyboardAvoidingView>
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default CompleteProfileScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  backButton: {
    width: 40,
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
  },
  leftPlaceholder: {
    width: 40,
  },

  stepIndicatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 12,
  },
  stepCircle: {
    width: 14,
    height: 14,
    borderRadius: 7,
  },
  stepLine: {
    width: 40,
    height: 3,
    backgroundColor: '#E0E0E0',
    marginHorizontal: 8,
    borderRadius: 2,
  },

  pageContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  pageContent: {
    flexGrow: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  instructionText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 20,
  },
  profilePicContainer: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#EEE',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    marginBottom: 30,
  },
  profilePic: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  bottomButtonContainer: {
    padding: 20,
  },
  button: {
    backgroundColor: '#FF6211',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 3,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  input: {
    width: '100%',
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 10,
    fontSize: 16,
    marginVertical: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    color: '#000',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  errorBorder: {
    borderColor: 'red',
  },
});
