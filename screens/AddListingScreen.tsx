import React, { useState, useRef, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
  KeyboardAvoidingView,
  Keyboard,
  Platform
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import DropDownPicker from 'react-native-dropdown-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient'; // For a subtle gradient background

// Import your ClosetCard to preview the listing
import ClosetCard from '@/components/ClosetCard'; 
// Adjust the import path as necessary

const SCREEN_WIDTH = Dimensions.get('window').width;

const AddListingScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  // Images state (up to 6)
  const [images, setImages] = useState<string[]>([]);

  // Listing details
  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [size, setSize] = useState('');
  const [rentalPrice, setRentalPrice] = useState('');
  const [retailPrice, setRetailPrice] = useState('');

  // Dropdown states
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [sizeOpen, setSizeOpen] = useState(false);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  // Horizontal paging
  const scrollRef = useRef<ScrollView>(null);
  const [currentPage, setCurrentPage] = useState(0);

  // Validation error states
  const [errors, setErrors] = useState({
    images: false,
    productName: false,
    description: false,
    category: false,
    size: false,
    rentalPrice: false,
    retailPrice: false,
  });

  // Listen for keyboard show/hide to close dropdowns
  useEffect(() => {
    const showListener = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardVisible(true);
      setCategoryOpen(false);
      setSizeOpen(false);
    });
    const hideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardVisible(false);
    });

    return () => {
      showListener.remove();
      hideListener.remove();
    };
  }, []);

  // Image picker (for the next slot only)
  const pickImage = async () => {
    if (images.length >= 6) return; // limit to 6

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      aspect: [9, 16],
      quality: 1,
    });

    if (!result.canceled) {
      const newUri = result.assets[0].uri;
      setImages((prev) => [...prev, newUri]);

      // Clear any previous "no images" error
      if (errors.images) {
        setErrors((prev) => ({ ...prev, images: false }));
      }
    }
  };

  // Validate all required fields on Page 2
  const validatePage2 = () => {
    const newErrors = {
      images: errors.images, // We don't re-check images here, that's for page 1
      productName: !productName.trim(),
      description: !description.trim(),
      category: !category,
      size: !size,
      rentalPrice: !rentalPrice.trim(),
      retailPrice: !retailPrice.trim(),
    };

    setErrors(newErrors);

    // Return true if no errors
    return !Object.values(newErrors).some((err) => err === true);
  };

  // Switch pages
  const handleNextPage = () => {
    if (currentPage === 0) {
      // Validate Page 1: at least 1 image
      if (images.length === 0) {
        setErrors((prev) => ({ ...prev, images: true }));
        return;
      }
    } else if (currentPage === 1) {
      // Validate Page 2
      if (!validatePage2()) {
        return;
      }
    }

    // If validation passes, move on
    const nextIndex = currentPage + 1;
    scrollRef.current?.scrollTo({ x: nextIndex * SCREEN_WIDTH, animated: true });
    setCurrentPage(nextIndex);
  };

  // Go back or close
  const handlePrevPage = () => {
    if (currentPage === 0) {
      navigation.goBack();
    } else {
      const prevIndex = currentPage - 1;
      scrollRef.current?.scrollTo({ x: prevIndex * SCREEN_WIDTH, animated: true });
      setCurrentPage(prevIndex);
    }
  };

  // Track scroll to update page indicator
  const handleMomentumScrollEnd = (e: any) => {
    const offsetX = e.nativeEvent.contentOffset.x;
    const pageIndex = Math.round(offsetX / SCREEN_WIDTH);
    setCurrentPage(pageIndex);
  };

  // Final submission
  const handleListItem = () => {
    // TODO: handle uploading data, etc.
    navigation.navigate('MainTabs', { screen: 'Profile' });
  };

  // We'll show 6 squares at once, and only let the user add images in order
  const imageSlots = [0, 1, 2, 3, 4, 5];

  return (
    <LinearGradient
      colors={['#ffffff', '#f8f9fc']} // subtle gradient
      style={{ flex: 1 }}
    >
      <SafeAreaView style={styles.safeArea}>
        {/* Header */}
        <View style={styles.headerContainer}>
          <TouchableOpacity style={styles.backButton} onPress={handlePrevPage}>
            <Ionicons name="arrow-back" size={26} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>
            {currentPage === 0
              ? 'Add Images'
              : currentPage === 1
              ? 'Item Details'
              : 'Preview'}
          </Text>
          <View style={styles.leftPlaceholder} />
        </View>

        {/* Step Indicator (3 circles) */}
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
          <View style={styles.stepLine} />
          <View
            style={[
              styles.stepCircle,
              { backgroundColor: currentPage === 2 ? '#FF6211' : '#E0E0E0' },
            ]}
          />
        </View>

        {/* HORIZONTAL PAGES */}
        <ScrollView
          ref={scrollRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          scrollEnabled={false}
          onMomentumScrollEnd={handleMomentumScrollEnd}
          style={{ flex: 1 }}
        >
          {/* ---------- PAGE 1: IMAGES ---------- */}
          <View style={[styles.horizontalPageContainer, { width: SCREEN_WIDTH }]}>
            <View style={{ flex: 1 }}>
              <ScrollView contentContainerStyle={styles.pageContent}>
                <Text style={styles.pageSubtitle}>Upload up to 6 Images</Text>

                {/* All 6 squares at once */}
                <View style={styles.imagesContainer}>
                  {imageSlots.map((idx) => {
                    if (images[idx]) {
                      // If this slot already has an image
                      return (
                        <View style={styles.imageWrapper} key={idx}>
                          <Image
                            source={{ uri: images[idx] }}
                            style={styles.uploadedImage}
                          />
                        </View>
                      );
                    } else if (idx === images.length) {
                      // This slot is the "next" slot => clickable add button
                      return (
                        <TouchableOpacity
                          key={idx}
                          style={[
                            styles.addImageBox,
                            errors.images && images.length === 0 && idx === 0
                              ? styles.errorBorder
                              : null,
                          ]}
                          onPress={pickImage}
                        >
                          <Ionicons name="add-circle-outline" size={42} color="#aaa" />
                        </TouchableOpacity>
                      );
                    } else {
                      // idx > images.length => locked/disabled placeholder
                      return (
                        <View style={[styles.lockedBox]} key={idx}>
                          <Ionicons
                            Ionicons name="add-circle-outline" size={42} 
                            color="#bbb"
                            style={{ opacity: 0.6 }}
                          />
                        </View>
                      );
                    }
                  })}
                </View>
              </ScrollView>
            </View>

            {/* Next button at the bottom */}
            <View style={styles.bottomButtonContainer}>
              <TouchableOpacity style={styles.button} onPress={handleNextPage}>
                <Text style={styles.buttonText}>Next</Text>
              </TouchableOpacity>
            </View>
          </View>

        {/* ---------- PAGE 2: DETAILS ---------- */}
        <View style={[styles.horizontalPageContainer, { width: SCREEN_WIDTH }]}>
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <ScrollView
            contentContainerStyle={styles.pageContent}
            showsVerticalScrollIndicator={false}
            >
            <TextInput
                style={[
                styles.input,
                errors.productName && styles.errorBorder,
                ]}
                placeholder="Product Name"
                placeholderTextColor="#666"
                value={productName}
                onChangeText={(text) => {
                setProductName(text);
                if (errors.productName && text.trim()) {
                    setErrors((prev) => ({ ...prev, productName: false }));
                }
                }}
            />

            <TextInput
                style={[
                styles.input,
                styles.textArea,
                errors.description && styles.errorBorder,
                ]}
                placeholder="Product Description"
                placeholderTextColor="#666"
                value={description}
                onChangeText={(text) => {
                setDescription(text);
                if (errors.description && text.trim()) {
                    setErrors((prev) => ({ ...prev, description: false }));
                }
                }}
                multiline
                textAlignVertical="top"
            />

            {/* Category */}
            <View
                style={[
                styles.dropdownWrapper,
                categoryOpen ? { zIndex: 2000 } : { zIndex: 1 },
                ]}
            >
                <DropDownPicker
                open={categoryOpen}
                value={category}
                items={[
                    { label: 'Dresses', value: 'dresses' },
                    { label: 'Suits', value: 'suits' },
                    { label: 'Shoes', value: 'shoes' },
                    { label: 'Accessories', value: 'accessories' },
                ]}
                setOpen={setCategoryOpen}
                setValue={(val) => {
                    setCategory(val);
                    if (errors.category && val) {
                    setErrors((prev) => ({ ...prev, category: false }));
                    }
                }}
                placeholder="Select Category"
                style={[
                    styles.dropdown,
                    errors.category && styles.errorBorder,
                ]}
                dropDownContainerStyle={styles.dropDownContainer}
                placeholderStyle={styles.dropDownPlaceholder}
                zIndex={2000}           // Ensure higher zIndex
                zIndexInverse={1000}
                disabled={isKeyboardVisible}
                />
            </View>

            {/* Size */}
            <View
                style={[
                styles.dropdownWrapper,
                sizeOpen ? { zIndex: 2000 } : { zIndex: 1 },
                ]}
            >
                <DropDownPicker
                open={sizeOpen}
                value={size}
                items={[
                    { label: 'XS', value: 'XS' },
                    { label: 'S', value: 'S' },
                    { label: 'M', value: 'M' },
                    { label: 'L', value: 'L' },
                    { label: 'XL', value: 'XL' },
                ]}
                setOpen={setSizeOpen}
                setValue={(val) => {
                    setSize(val);
                    if (errors.size && val) {
                    setErrors((prev) => ({ ...prev, size: false }));
                    }
                }}
                placeholder="Select Size"
                style={[styles.dropdown, errors.size && styles.errorBorder]}
                dropDownContainerStyle={styles.dropDownContainer}
                placeholderStyle={styles.dropDownPlaceholder}
                zIndex={2000}
                zIndexInverse={1000}
                disabled={isKeyboardVisible}
                />
            </View>

            {/* Rental Price */}
            <TextInput
                style={[
                styles.input,
                errors.rentalPrice && styles.errorBorder,
                ]}
                placeholder="Rental Price ($)"
                placeholderTextColor="#666"
                keyboardType="numeric"
                value={rentalPrice}
                returnKeyType="done"
                onSubmitEditing={() => Keyboard.dismiss()}
                onChangeText={(text) => {
                const formatted = text.replace(/[^0-9.]/g, '');
                const value = formatted ? `$${formatted}` : '';
                setRentalPrice(value);
                if (errors.rentalPrice && value.trim()) {
                    setErrors((prev) => ({ ...prev, rentalPrice: false }));
                }
                }}
            />

            {/* Retail Price */}
            <TextInput
                style={[
                styles.input,
                errors.retailPrice && styles.errorBorder,
                ]}
                placeholder="Retail Price ($)"
                placeholderTextColor="#666"
                keyboardType="numeric"
                value={retailPrice}
                returnKeyType="done"
                onSubmitEditing={() => Keyboard.dismiss()}
                onChangeText={(text) => {
                const formatted = text.replace(/[^0-9.]/g, '');
                const value = formatted ? `$${formatted}` : '';
                setRetailPrice(value);
                if (errors.retailPrice && value.trim()) {
                    setErrors((prev) => ({ ...prev, retailPrice: false }));
                }
                }}
            />
            </ScrollView>

            <View style={styles.bottomButtonContainer}>
            <TouchableOpacity style={styles.button} onPress={handleNextPage}>
                <Text style={styles.buttonText}>Next</Text>
            </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
        </View>


          {/* ---------- PAGE 3: PREVIEW ---------- */}
          <View style={[styles.horizontalPageContainer, { width: SCREEN_WIDTH }]}>
            <View style={{ flex: 1 }}>
              <ScrollView contentContainerStyle={styles.pageContent}>
                <Text style={styles.pageSubtitle}>Preview Your Listing</Text>

                <View style={{ marginTop: 20 }}>
                  <ClosetCard
                    imageUrl={images[0] || 'https://via.placeholder.com/400x400?text=No+Image'}
                    listing={productName || 'Untitled Listing'}
                    category={category || 'Uncategorized'}
                    size={size || '—'}
                    rentalPrice={parseFloat(rentalPrice.replace(/\D/g, '')) || 0}
                    rating={0}
                  />
                </View>
              </ScrollView>
            </View>
            <View style={styles.bottomButtonContainer}>
              <TouchableOpacity style={styles.button} onPress={handleListItem}>
                <Text style={styles.buttonText}>List Item</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default AddListingScreen;

/* ---------- STYLES ---------- */
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  /* Header */
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
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

  /* Step Indicator */
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

  /* Pages */
  horizontalPageContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  pageContent: {
    padding: 20,
  },
  pageSubtitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },

  /* Bottom Button */
  bottomButtonContainer: {
    padding: 20,
  },
  button: {
    backgroundColor: '#000',
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

  /* IMAGES PAGE */
  imagesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    paddingHorizontal: 10,
    gap: 10,
  },
  dropdownWrapper: {
    marginBottom: 12,
    position: 'relative',
  },
  imageWrapper: {
    height: '30%',
    width: '30%',
    aspectRatio: 1,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 10,
    backgroundColor: '#E5E5E5',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 4,
    elevation: 2,
  },
  uploadedImage: {
    width: '100%',
    aspectRatio: 1,
    height: '100%',
    resizeMode: 'cover',
  },
  addImageBox: {
    height: '30%',
    width: '30%',
    aspectRatio: 1,
    borderRadius: 12,
    marginBottom: 20,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
    // borderWidth: 2,
    // borderColor: 'transparent',
    borderWidth: 1,
    borderColor: '#ccc',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 4,
    elevation: 2,
  },
  lockedBox: {
    height: '30%',
    width: '30%',
    aspectRatio: 1,
    borderRadius: 12,
    marginBottom: 10,
    backgroundColor: '#DDD',
    justifyContent: 'center',
    alignItems: 'center',
    // Maybe a subtle border or different color to signify locked
    borderWidth: 1,
    borderColor: '#ccc',
  },
  errorBorder: {
    borderColor: 'red',
  },

  /* DETAILS PAGE */
  input: {
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 10,
    fontSize: 16,
    marginTop: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    color: '#000',
    // Subtle shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  textArea: {
    minHeight: 90,
    maxHeight: 200,
  },
  dropdown: {
    marginTop: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
    // Subtle shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  dropDownContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderTopWidth: 0,
    marginTop: 0,
  },
  dropDownPlaceholder: {
    fontSize: 16,
    color: '#666',
  },
});

