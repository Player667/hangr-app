// =============================================================================
// screens/CheckoutFlowScreen.tsx – polished payment + message UI
// =============================================================================
import React, { useRef, useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  TextInput,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Colors from '@/constants/Colors';

const { width } = Dimensions.get('window');

interface ListingParams {
  listingData: any;
  startDate: string;
  endDate: string;
}

const CheckoutFlowScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const { params } = useRoute<any>();
  const { listingData, startDate, endDate } = params as ListingParams;

  const scrollRef = useRef<ScrollView>(null);
  const [page, setPage] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'paypal' | 'apple'>('apple');
  const [message, setMessage] = useState('');

  /* ---------------- totals ---------------- */
  const nights = useMemo(() => {
    if (!startDate || !endDate) return 1;
    const diff = Math.abs(new Date(endDate).valueOf() - new Date(startDate).valueOf());
    return Math.max(1, Math.round(diff / 864e5));
  }, [startDate, endDate]);
  const totalPrice = listingData.rentalPrice * nights;

  /* ---------------- nav helpers ---------------- */
  const goTo = (idx: number) => {
    scrollRef.current?.scrollTo({ x: idx * width, animated: true });
    setPage(idx);
  };
  const onNext = () => {
    if (page < 2) goTo(page + 1);
    else navigation.navigate('Confirmation', { listingId: listingData.id, message });
  };

  /* ---------------- prices UI ---------------- */
  const PriceLine = () => (
    <View style={styles.priceRow}>
      <Text style={styles.priceLabel}>Total ({nights} night{nights > 1 ? 's' : ''})</Text>
      <Text style={styles.priceValue}>${totalPrice.toFixed(2)}</Text>
    </View>
  );

  /* ====================================================================== */
  return (
    <SafeAreaView style={styles.safe}>
      {/* header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.hBtn} onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={22} color="#000" />
        </TouchableOpacity>
        <Text style={styles.hTitle} numberOfLines={1}>
          {page === 0 ? 'Review and continue' : page === 1 ? 'Add a payment method' : 'Message to lender'}
        </Text>
        <View style={styles.hBtn} />
      </View>

      {/* pages */}
      <ScrollView
        horizontal
        pagingEnabled
        ref={scrollRef}
        scrollEnabled={false}
        showsHorizontalScrollIndicator={false}
      >
        {/* ----------------------------------------------------------------- */}
        {/* PAGE 1 – REVIEW                                                   */}
        {/* ----------------------------------------------------------------- */}
        <View style={[styles.page, { width }]}>          
          <View style={styles.cardBox}>
            <View style={styles.rowBetween}>
              <Image source={{ uri: listingData.imageUrl }} style={styles.thumbnail} />
              <View style={{ flex: 1, marginLeft: 12 }}>
                <Text style={styles.listingTitle} numberOfLines={2}>{listingData.listing}</Text>
                {listingData.rating && (
                  <Text style={styles.ratingRow}>
                    <Ionicons name="star" size={12} color={Colors.primary} /> {listingData.rating.toFixed(2)}
                    {listingData.reviewCount ? ` (${listingData.reviewCount})` : ''}
                  </Text>
                )}
              </View>
            </View>

            <View style={styles.separator} />

            <Text style={styles.subHeader}>Rental details</Text>
            <Text style={styles.tripText}>{startDate} – {endDate}</Text>
            <Text style={styles.tripText}>1 renter · {nights} night{nights > 1 ? 's' : ''}</Text>

            <View style={styles.separator} />
            <PriceLine />
            <View style={styles.separator} />
            <Text style={styles.freeCancel}>Free cancellation • Cancel before 24 h for refund</Text>
          </View>
        </View>

        {/* ----------------------------------------------------------------- */}
        {/* PAGE 2 – PAYMENT                                                 */}
        {/* ----------------------------------------------------------------- */}
        <View style={[styles.page, { width }]}>          
          <View style={styles.cardBox}>
            {([['paypal','PayPal'], ['card','Credit or debit card'], ['apple','Apple Pay']] as const).map(([key,label],idx,array) => (
              <TouchableOpacity
                key={key}
                style={[styles.payRow, idx !== array.length-1 && styles.rowDivider]}
                onPress={() => setPaymentMethod(key as any)}
                activeOpacity={0.8}
              >
                {/* left side icon + label */}
                <View style={styles.payLeft}>
                  {key==='paypal' && <Image source={require('@/assets/images/paypal.png')} style={styles.payLogo} />}
                  {key==='card'   && <Ionicons name="card-outline" size={24} color="#000" style={{marginRight:10}} />}
                  {key==='apple'  && <Ionicons name="logo-apple" size={24} color="#000" style={{marginRight:10}} />}
                  <Text style={styles.payLabel}>{label}</Text>
                </View>
                {/* radio */}
                <View style={[styles.radioOuter, paymentMethod===key && styles.radioOuterActive]}> 
                  {paymentMethod===key && <View style={styles.radioInner}/>}
                </View>
              </TouchableOpacity>
            ))}

            {paymentMethod === 'card' && (
              <View style={styles.cardFieldPlaceholder}>
                <Text style={{ color: '#888' }}>[Stripe CardField here]</Text>
              </View>
            )}
          </View>
        </View>

        {/* ----------------------------------------------------------------- */}
        {/* PAGE 3 – MESSAGE                                                 */}
        {/* ----------------------------------------------------------------- */}
        <View style={[styles.page, { width }]}>          
          <View style={styles.cardBox}>
            {/* informational gray box */}
            <View style={styles.infoBox}>
              <Text style={styles.infoText}>
                Let the lender know of any preferences, preferred pickup time or other details. This step is optional.
              </Text>
            </View>

            <TextInput
              style={styles.messageInput}
              placeholder="Write a message… (optional)"
              multiline
              numberOfLines={5}
              value={message}
              onChangeText={setMessage}
            />
          </View>
        </View>
      </ScrollView>

      {/* footer */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.nextBtn} onPress={onNext} activeOpacity={0.9}>
          <Text style={styles.nextTxt}>{page < 2 ? 'Next' : 'Confirm & pay'}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default CheckoutFlowScreen;

/* -------------------------------------------------------------------------- */
const BOX_RADIUS = 18;
const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#fff' },
  /* header */
  header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 12 },
  hBtn: { width: 34, alignItems: 'flex-start' },
  hTitle: { flex: 1, textAlign: 'center', fontSize: 18, fontWeight: '700', color: '#000' },
  /* page layout */
  page: { flex: 1, paddingTop: 20, paddingHorizontal: 20 },
  cardBox: { backgroundColor: '#fff', borderRadius: BOX_RADIUS, padding: 22, borderWidth: 1, borderColor: '#e7e7e7' },
  rowBetween:{flexDirection:'row',alignItems:'center'},
  separator: { height: 1, backgroundColor: '#eee', marginVertical: 18 },
  /* listing thumb */
  thumbnail: { width: 80, height: 80, borderRadius: 10, backgroundColor: '#ccc' },
  listingTitle: { fontSize: 17, fontWeight: '700', color: '#222' },
  ratingRow: { marginTop: 4, fontSize: 13, color: '#444' },
  subHeader: { fontSize: 15, fontWeight: '700', marginBottom: 6 },
  tripText: { fontSize: 14, color: '#333' },
  priceRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  priceLabel: { fontSize: 15, fontWeight: '700' },
  priceValue: { fontSize: 15, fontWeight: '700' },
  freeCancel: { fontSize: 13, color: '#666' },
  /* payment rows */
  payRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 18 },
  rowDivider:{ borderBottomWidth:1, borderBottomColor:'#eee' },
  payLeft:{ flexDirection:'row', alignItems:'center' },
  payLogo:{ width:28, height:28, resizeMode:'contain', marginRight:10 },
  payLabel: { fontSize: 15, color: '#000' },
  radioOuter:{ width:24, height:24, borderRadius:12, borderWidth:1.5, borderColor:'#888', justifyContent:'center', alignItems:'center' },
  radioOuterActive:{ borderColor:'#000' },
  radioInner:{ width:12, height:12, borderRadius:6, backgroundColor:'#000' },
  cardFieldPlaceholder:{ marginTop:20, height:50, borderWidth:1, borderColor:'#ddd', borderRadius:6, justifyContent:'center', alignItems:'center' },
  /* message */
  infoBox:{ backgroundColor:'#f6f6f7', borderRadius:12, padding:16, marginBottom:16 },
  infoText:{ fontSize:14, color:'#555', lineHeight:20 },
  messageInput:{ borderWidth:1, borderColor:'#ccc', borderRadius:12, minHeight:140, padding:16, fontSize:15, textAlignVertical:'top' },
  /* footer */
  footer:{ padding:20, borderTopWidth:1, borderTopColor:'#eee', backgroundColor:'#fff' },
  nextBtn:{ backgroundColor: '#000', borderRadius:8, paddingVertical:15, alignItems:'center' },
  nextTxt:{ color:'#fff', fontSize:17, fontWeight:'600' },
});