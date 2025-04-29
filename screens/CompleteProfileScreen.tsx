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
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  ActivityIndicator,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MapView, { Marker, MapPressEvent, Region } from 'react-native-maps';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import { LinearGradient } from 'expo-linear-gradient';
import Colors from '@/constants/Colors';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const INITIAL_REGION: Region = {
  latitude: 37.78825,
  longitude: -122.4324,
  latitudeDelta: 0.03,
  longitudeDelta: 0.03,
};

const CompleteProfileScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const scrollRef = useRef<ScrollView>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [profilePic, setProfilePic] = useState<string | null>(null);
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [addressCoords, setAddressCoords] = useState<{ latitude: number; longitude: number } | null>(null);
  const [locationLoading, setLocationLoading] = useState(false);
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

  const [errors, setErrors] = useState({ profilePic: false, fullName: false, username: false, address: false });

  /* ------------- keyboard listeners ------------- */
  useEffect(() => {
    const show = Keyboard.addListener('keyboardDidShow', () => setIsKeyboardVisible(true));
    const hide = Keyboard.addListener('keyboardDidHide', () => setIsKeyboardVisible(false));
    return () => {
      show.remove();
      hide.remove();
    };
  }, []);

  /* ---------------- helpers ---------------- */
  const openImagePicker = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ImagePicker.MediaTypeOptions.Images, allowsEditing: true, aspect: [1, 1], quality: 0.9 });
    if (!result.canceled) {
      setProfilePic(result.assets[0].uri);
      if (errors.profilePic) setErrors((p) => ({ ...p, profilePic: false }));
    }
  };

  const requestCurrentLocation = async () => {
    setLocationLoading(true);
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') return;
      const loc = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High });
      setAddressCoords({ latitude: loc.coords.latitude, longitude: loc.coords.longitude });
      if (errors.address) setErrors((p) => ({ ...p, address: false }));
    } finally {
      setLocationLoading(false);
    }
  };

  const onMapPress = (e: MapPressEvent) => {
    const { latitude, longitude } = e.nativeEvent.coordinate;
    setAddressCoords({ latitude, longitude });
    if (errors.address) setErrors((p) => ({ ...p, address: false }));
  };

  const goToPage = (idx: number) => {
    scrollRef.current?.scrollTo({ x: idx * SCREEN_WIDTH, animated: true });
    setCurrentPage(idx);
  };

  const validateAndProceed = () => {
    if (currentPage === 0) {
      if (!profilePic) {
        setErrors((p) => ({ ...p, profilePic: true }));
        return;
      }
      goToPage(1);
      return;
    }
    const newErr = { profilePic: false, fullName: !fullName.trim(), username: !username.trim(), address: addressCoords === null };
    setErrors(newErr);
    if (newErr.fullName || newErr.username || newErr.address) return;
    navigation.replace('MainTabs');
  };

  /* ---------------- render ---------------- */
  return (
    <LinearGradient colors={['#ffffff', '#F5F7FF']} style={{ flex: 1 }}>
      <SafeAreaView style={styles.safeArea}>
        {/* header */}
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={() => (currentPage === 0 ? navigation.goBack() : goToPage(currentPage - 1))} style={styles.headerIconBtn}>
            <Ionicons name="arrow-back" size={26} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{currentPage === 0 ? '' : ''}</Text>
          <View style={styles.headerIconBtn} />
        </View>

        {/* steps */}
        <View style={styles.stepContainer}>{[0, 1].map((i) => (<View key={i} style={styles.stepWrapper}><View style={[styles.stepCircle, { backgroundColor: currentPage === i ? Colors.primary : '#E0E0E0' }]} />{i === 0 && <View style={styles.stepLine} />}</View>))}</View>

        {/* pages */}
        <ScrollView horizontal pagingEnabled ref={scrollRef} showsHorizontalScrollIndicator={false} scrollEnabled={false} onMomentumScrollEnd={(e) => setCurrentPage(Math.round(e.nativeEvent.contentOffset.x / SCREEN_WIDTH))} style={{ flex: 1 }}>
          {/* page 1 */}
          <View style={[styles.page, { width: SCREEN_WIDTH }]}>
            <View style={styles.pageContent}>
              <Text style={styles.sectionTitle}>Upload a profile photo</Text>
              <TouchableOpacity style={[styles.profilePicWrapper, errors.profilePic && styles.errorBorder]} activeOpacity={0.8} onPress={openImagePicker}>
                {profilePic ? <Image source={{ uri: profilePic }} style={styles.profilePic} /> : <Ionicons name="camera-outline" size={48} color="#999" />}
              </TouchableOpacity>
              <Text style={styles.helperText}>This photo helps renters know who they'll meet.</Text>
            </View>
            <TouchableOpacity style={styles.primaryBtn} onPress={validateAndProceed}><Text style={styles.primaryBtnText}>Next</Text></TouchableOpacity>
          </View>

          {/* page 2 */}
          <View style={[styles.page, { width: SCREEN_WIDTH }]}>
            <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
              <ScrollView contentContainerStyle={styles.pageContent} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
                <Text style={styles.sectionTitle}>Tell us about you</Text>

                {/* full name */}
                <View style={styles.inputContainer}><Text style={styles.label}>Full Name</Text><TextInput style={[styles.textInput, errors.fullName && styles.errorBorder]} placeholder="John Doe" placeholderTextColor="#777" value={fullName} onChangeText={(t) => { setFullName(t); if (errors.fullName) setErrors((p) => ({ ...p, fullName: false })); }} returnKeyType="next" /></View>

                {/* username */}
                <View style={styles.inputContainer}><Text style={styles.label}>Username</Text><TextInput style={[styles.textInput, errors.username && styles.errorBorder]} placeholder="@johndoe" placeholderTextColor="#777" autoCapitalize="none" value={username} onChangeText={(t) => { setUsername(t); if (errors.username) setErrors((p) => ({ ...p, username: false })); }} /></View>

                {/* map */}
                <Text style={[styles.label, { marginTop: 6 }]}>Pickup address *</Text>
                <View style={[styles.mapWrapper, errors.address && styles.errorBorder]}>
                  <MapView style={styles.map} initialRegion={INITIAL_REGION} onPress={onMapPress} region={addressCoords ? { ...addressCoords, latitudeDelta: 0.01, longitudeDelta: 0.01 } : undefined}>
                    {addressCoords && <Marker coordinate={addressCoords} draggable onDragEnd={onMapPress} />}
                  </MapView>
                  {locationLoading && <View style={styles.loadingOverlay}><ActivityIndicator size="large" color={Colors.primary} /></View>}
                  {!addressCoords && !locationLoading && (
                    <View style={styles.tapHintBox}><Ionicons name="pin" size={18} color={Colors.primary} style={{ marginRight: 6 }} /><Text style={styles.tapHintText}>Tap to drop a pin</Text></View>
                  )}
                </View>
                <TouchableOpacity style={styles.locationBtn} onPress={requestCurrentLocation}>{locationLoading ? <ActivityIndicator size="small" color="#fff" /> : (<><Ionicons name="locate" size={18} color="#fff" style={{ marginRight: 6 }} /><Text style={styles.locationBtnText}>Use my current location</Text></>)}</TouchableOpacity>

                <Text style={[styles.helperTextCenter, { marginBottom: 28 }]}>This location will be visible to renters as the pickup spot for your listings. Only an approximate pin (not your exact address) is shown for privacy.</Text>
              </ScrollView>
            </KeyboardAvoidingView>
            <TouchableOpacity style={[styles.primaryBtn, { marginTop: 8 }]} onPress={validateAndProceed}><Text style={styles.primaryBtnText}>Finish</Text></TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default CompleteProfileScreen;

/* ------------------ STYLES ------------------ */
const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  headerContainer: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingBottom: 14, paddingTop: 6 },
  headerIconBtn: { width: 40, alignItems: 'flex-start' },
  headerTitle: { flex: 1, textAlign: 'center', fontSize: 18, fontWeight: '700', color: '#000' },
  stepContainer: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginVertical: 8 },
  stepWrapper: { flexDirection: 'row', alignItems: 'center' },
  stepCircle: { width: 14, height: 14, borderRadius: 7 },
  stepLine: { width: 50, height: 3, backgroundColor: '#E0E0E0', marginHorizontal: 8, borderRadius: 2 },
  page: { flex: 1, paddingBottom: 20, justifyContent: 'space-between' },
  pageContent: { flexGrow: 1, paddingHorizontal: 24, alignItems: 'center', paddingTop: 30 },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: '#000', marginBottom: 22 },
  helperText: { marginTop: 14, fontSize: 13, color: '#666', textAlign: 'center' },
  helperTextCenter: { marginTop: 14, fontSize: 13, color: '#666', textAlign: 'center', paddingHorizontal: 6 },
  profilePicWrapper: { width: 180, height: 180, borderRadius: 90, backgroundColor: '#EFEFEF', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' },
  profilePic: { width: '100%', height: '100%' },
  inputContainer: { width: '100%', marginBottom: 16 },
  label: { fontSize: 11, marginBottom: 4, color: '#555', fontWeight: '500' },
  textInput: { borderWidth: 1, borderColor: Colors.lightBlack, borderRadius: 8, height: 50, padding: 12, fontSize: 16, color: '#000', backgroundColor: '#fff' },
  mapWrapper: { width: '100%', height: SCREEN_HEIGHT * 0.28, borderRadius: 12, overflow: 'hidden', backgroundColor: '#EEE' },
  map: { width: '100%', height: '100%' },
  tapHintBox: { position: 'absolute', top: '45%', alignSelf: 'center', flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.9)', paddingVertical: 6, paddingHorizontal: 12, borderRadius: 24 },
  tapHintText: { fontSize: 13, color: Colors.primary, fontWeight: '600' },
  loadingOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(255,255,255,0.6)', alignItems: 'center', justifyContent: 'center' },
  locationBtn: { flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-start', marginTop: 12, backgroundColor: '#000', borderRadius: 22, paddingVertical: 8, paddingHorizontal: 14 },
  locationBtnText: { color: '#FFF', fontWeight: '600', fontSize: 14 },
  primaryBtn: { marginHorizontal: 24, backgroundColor: '#000', borderRadius: 10, paddingVertical: 15, alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.12, shadowRadius: 6, elevation: 3 },
  primaryBtnText: { color: '#FFF', fontSize: 16, fontWeight: '700' },
  errorBorder: { borderColor: 'red' },
});
