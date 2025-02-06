import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import DropDownPicker from 'react-native-dropdown-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';

const AddListingScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [image, setImage] = useState<string | null>(null);
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

  // Detect keyboard state
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

  // Image picker
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      aspect: [9, 16],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header with Back Button */}
      <View style={styles.headerContainer}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={28} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>List an Item</Text>
        <View style={{ width: 28 }} /> {/* Placeholder for alignment */}
      </View>

      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scrollView}>
          <TouchableOpacity style={styles.imageUpload} onPress={pickImage}>
            {image ? (
              <Image source={{ uri: image }} style={styles.image} />
            ) : (
              <Ionicons name="camera" size={40} color="#999" />
            )}
          </TouchableOpacity>
          <Text style={styles.label}>Add a Picture</Text>

          <TextInput
            style={styles.input}
            placeholder="Product Name"
            placeholderTextColor="#666"
            value={productName}
            onChangeText={setProductName}
          />

          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Product Description"
            placeholderTextColor="#666"
            value={description}
            onChangeText={setDescription}
            multiline
            textAlignVertical="top"
            onBlur={() => setDescription(description.trim() === '' ? '' : description)} // Clears spaces on blur
          />

          {/* Category Dropdown - Pushes Other Fields Down */}
          <View style={{ marginBottom: categoryOpen ? 150 : 0 }}>
            <DropDownPicker
              open={categoryOpen}
              value={category}
              items={[
                { label: 'Dresses', value: 'dresses' },
                { label: 'Suits', value: 'suits' },
                { label: 'Shoes', value: 'shoes' },
                { label: 'Accessories', value: 'accessories' }
              ]}
              setOpen={setCategoryOpen}
              setValue={setCategory}
              placeholder="Select Category"
              style={styles.dropdown}
              dropDownContainerStyle={styles.dropDownContainer}
              disabled={isKeyboardVisible} // Disable dropdown when keyboard is visible
              placeholderStyle={styles.dropDownPlaceholder}
            />
          </View>

          {/* Size Dropdown - Pushes Other Fields Down */}
          <View style={{ marginBottom: sizeOpen ? 190 : 0 }}>
            <DropDownPicker
              open={sizeOpen}
              value={size}
              items={[
                { label: 'XS', value: 'XS' },
                { label: 'S', value: 'S' },
                { label: 'M', value: 'M' },
                { label: 'L', value: 'L' },
                { label: 'XL', value: 'XL' }
              ]}
              setOpen={setSizeOpen}
              setValue={setSize}
              placeholder="Select Size"
              style={styles.dropdown}
              dropDownContainerStyle={styles.dropDownContainer}
              disabled={isKeyboardVisible} // Disable dropdown when keyboard is visible
              placeholderStyle={styles.dropDownPlaceholder}
            />
          </View>

          <TextInput
            style={styles.input}
            placeholder="Rental Price ($)"
            placeholderTextColor="#666"
            keyboardType="numeric"
            value={rentalPrice}
            onChangeText={(text) => {
              // Remove any non-numeric characters except decimal points
              let formattedText = text.replace(/[^0-9.]/g, '');
              setRentalPrice(formattedText ? `$${formattedText}` : '');
              }}
          />

          <TextInput
            style={styles.input}
            placeholder="Retail Price ($)"
            placeholderTextColor="#666"
            keyboardType="numeric"
            value={retailPrice}
            onChangeText={(text) => {
              let formattedText = text.replace(/[^0-9.]/g, '');
              setRetailPrice(formattedText ? `$${formattedText}` : '');
            }}
          />

        </ScrollView>
      </KeyboardAvoidingView>

      {/* LIST BUTTON FIXED AT BOTTOM */}
      <TouchableOpacity
        style={[styles.listButton]} 
        onPress={() => navigation.navigate('MainTabs', { screen: 'Profile' })}
      >
        <Text style={styles.listButtonText}>List Item</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default AddListingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FB',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FB',
    paddingHorizontal: 16,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  backButton: {
    width: 40,
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
  },
  scrollView: {
    padding: 20,
    paddingBottom: 120,
    top: 20
  },
  imageUpload: {
    width: 120,
    height: 213,
    backgroundColor: '#E5E5E5',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  label: {
    textAlign: 'center',
    fontSize: 16,
    color: '#333',
    marginTop: 10,
  },
  input: {
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 8,
    fontSize: 16,
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    color: '#000',
  },
  textArea: {
    minHeight: 90, // Bigger text box
    maxHeight: 200, // Prevents it from growing infinitely
  },
  dropdown: {
    marginTop: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
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
  listButton: {
    backgroundColor: '#FF6211',
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 40,
    left: 20,
    right: 20,
    borderRadius: 10,
  },
  listButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
});
