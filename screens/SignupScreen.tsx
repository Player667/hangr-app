import React, { useState } from 'react';
import { 
  View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Platform, Keyboard
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DropDownPicker from 'react-native-dropdown-picker';
import Colors from '@/constants/Colors';
import { useNavigation } from '@react-navigation/native';

interface Props {}

const SignupScreen: React.FC<Props> = () => {
    const navigation = useNavigation();

  const [isEmailMode, setIsEmailMode] = useState(false);

  const [countryOpen, setCountryOpen] = useState(false);
  const [countryValue, setCountryValue] = useState('+1');
  const [countryItems, setCountryItems] = useState([
    { label: 'United States (+1)', value: '+1' },
    { label: 'Canada (+1)', value: '+1-CA' },
    { label: 'United Kingdom (+44)', value: '+44' },
  ]);
  
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');

  // Format phone number
  const formatPhoneNumber = (text: string) => {
    const digits = text.replace(/\D/g, ''); // Remove non-numeric characters
    if (digits.length === 0) return ''; // Empty input
    if (digits.length <= 3) return `(${digits}`;
    if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
    if (digits.length <= 10) {
      return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
    }
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
  };

  const handlePhoneNumberChange = (text: string) => {
    setPhoneNumber(formatPhoneNumber(text));
  };

  const handleContinueWithPhone = () => {
    console.log('Continue with Phone:', countryValue, phoneNumber);
    navigation.replace('CompleteProfile');
  };

  const handleContinueWithEmail = () => {
    console.log('Continue with Email:', email);
    navigation.replace('CompleteProfile');
  };

  const handleContinueWithApple = () => {
    console.log('Continue with Apple');
  };

  const handleContinueWithGoogle = () => {
    console.log('Continue with Google');
  };

  const handleContinueWithFacebook = () => {
    console.log('Continue with Facebook');
  };

  const switchToEmailMode = () => {
    setIsEmailMode(true);
  };

  const switchToPhoneMode = () => {
    setIsEmailMode(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.modalHeader}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.closeButton}>
          <Ionicons name="close" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Register</Text>
        <View style={{ width: 0 }} /> {/* Empty space to balance the header */}
      </View>

      <View style={styles.formContainer}>
        {!isEmailMode && (
          <>
            <View style={styles.countryPickerContainer}>
              <Text style={styles.label}>Country/Region</Text>
              <View style={styles.dropdownWrapper}>
                <DropDownPicker
                  open={countryOpen}
                  value={countryValue}
                  items={countryItems}
                  setOpen={setCountryOpen}
                  setValue={setCountryValue}
                  setItems={setCountryItems}
                  style={styles.dropdown}
                  dropDownContainerStyle={styles.dropdownContainer}
                  placeholder="Select a country"
                />
              </View>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Phone number</Text>
              <TextInput
                placeholder="Phone number"
                keyboardType="phone-pad"
                value={phoneNumber}
                onChangeText={handlePhoneNumberChange}
                style={styles.textInput}
                returnKeyType="done"
                onSubmitEditing={() => Keyboard.dismiss()}
                maxLength={14}
              />
            </View>

            <Text style={styles.disclaimer}>
              We’ll call or text to confirm your number. Standard message and data rates apply.
            </Text>

            <TouchableOpacity style={styles.continueButton} onPress={handleContinueWithPhone}>
              <Text style={styles.continueButtonText}>Continue</Text>
            </TouchableOpacity>
          </>
        )}

        {isEmailMode && (
          <>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                placeholder="Email"
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
                style={styles.textInput}
                returnKeyType="done"
                onSubmitEditing={() => Keyboard.dismiss()}
              />
            </View>

            <Text style={styles.disclaimer}>
              We’ll send you a link to confirm your email.
            </Text>

            <TouchableOpacity style={styles.continueButton} onPress={handleContinueWithEmail}>
              <Text style={styles.continueButtonText}>Continue</Text>
            </TouchableOpacity>
          </>
        )}

        <View style={styles.dividerContainer}>
          <View style={styles.line} />
          <Text style={styles.orText}>or</Text>
          <View style={styles.line} />
        </View>

        {!isEmailMode && (
          <TouchableOpacity style={styles.altButton} onPress={switchToEmailMode}>
            <View style={styles.buttonContent}>
              <Ionicons name="mail-outline" size={24} style={styles.icon} />
              <Text style={styles.altButtonText}>Continue with email</Text>
            </View>
          </TouchableOpacity>
        )}

        {isEmailMode && (
          <TouchableOpacity style={styles.altButton} onPress={switchToPhoneMode}>
            <View style={styles.buttonContent}>
              <Ionicons name="call-outline" size={24} style={styles.icon} />
              <Text style={styles.altButtonText}>Continue with phone number</Text>
            </View>
          </TouchableOpacity>
        )}

        <TouchableOpacity style={styles.altButton} onPress={handleContinueWithApple}>
          <View style={styles.buttonContent}>
            <Ionicons name="logo-apple" size={24} style={styles.icon} />
            <Text style={styles.altButtonText}>Continue with Apple</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.altButton} onPress={handleContinueWithGoogle}>
          <View style={styles.buttonContent}>
            <Ionicons name="logo-google" size={24} style={styles.icon} />
            <Text style={styles.altButtonText}>Continue with Google</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.altButton} onPress={handleContinueWithFacebook}>
          <View style={styles.buttonContent}>
            <Ionicons name="logo-facebook" size={24} style={styles.icon} />
            <Text style={styles.altButtonText}>Continue with Facebook</Text>
          </View>
        </TouchableOpacity>

      </View>
    </SafeAreaView>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'android' ? 16 : 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    justifyContent: 'center',
  },
  closeButton: {
    position: 'absolute',
    left: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
    textAlign: 'center',
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginRight: 10,
  },
  formContainer: {
    marginTop: 24,
    paddingHorizontal: 16,
  },
  label: {
    fontSize: 14,
    marginBottom: 4,
    color: '#555',
    fontWeight: '500',
  },
  countryPickerContainer: {
    marginBottom: 16,
  },
  dropdownWrapper: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  dropdown: {
    borderWidth: 0,
    minHeight: 50,
  },
  dropdownContainer: {
    borderColor: '#ddd',
  },
  inputContainer: {
    marginBottom: 16,
  },
  textInput: {
    borderWidth: 1,
    borderColor: Colors.lightBlack,
    borderRadius: 8,
    height: 50,
    padding: 12,
    fontSize: 16,
  },
  disclaimer: {
    fontSize: 12,
    color: '#666',
    marginBottom: 24,
  },
  continueButton: {
    backgroundColor: Colors.primary,
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
    marginBottom: 24,
  },
  continueButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#ddd',
  },
  orText: {
    marginHorizontal: 8,
    fontSize: 14,
    color: '#555',
    fontWeight: '500',
  },
  altButton: {
    borderWidth: 1,
    borderColor: Colors.lightBlack,
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
    marginBottom: 18,
  },
  altButtonText: {
    fontSize: 16,
    fontWeight: '400',
    color: '#000',
  },
});
