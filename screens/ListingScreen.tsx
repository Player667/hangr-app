
// =============================================================================
// screens/ListingScreen.tsx – 🎨 Minimal redesign v8 (UserCard wired correctly)
// =============================================================================
import React, { useState, useMemo } from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MapView, { Marker } from 'react-native-maps';
import { CalendarList, DateObject } from 'react-native-calendars';

import Colors from '@/constants/Colors';
import { SAMPLE_USERS } from '@/constants/MockData';
import UserCard from '@/components/UserCard';

/* -------------------------------------------------------------------------- */
const { width } = Dimensions.get('window');
const HERO_H = (width * 5) / 4;


interface Marking {
  startingDay?: boolean;
  endingDay?: boolean;
  disabled?: boolean;
  color?: string;
  textColor?: string;
}

export default function ListingScreen({ route, navigation }: any) {
  const { listingData } = route.params;

  const host = SAMPLE_USERS.find((u) => u.userId === listingData.listerId) ?? SAMPLE_USERS[0];
  const photos = listingData.images?.length ? listingData.images : [listingData.imageUrl];

  /* ---------------- hero pager ---------------- */
  const [idx, setIdx] = useState(0);
  const [saved, setSaved] = useState(false);

  /* ---------------- calendar helpers ---------------- */
  const today = new Date();
  const blocked = useMemo(() => {
    const s = new Set<string>();
    for (let i = 0; i < 25; i++) {
      const d = new Date(+today + i * 864e5);
      if (i % 5 === 0) s.add(d.toISOString().slice(0, 10));
    }
    return s;
  }, []);

  const [range, setRange] = useState<{ start?: string; end?: string }>({});

  const hasBlockedBetween = (start: string, end: string) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const dir = startDate < endDate ? 1 : -1;
    let cur = new Date(startDate);
    while (cur.toISOString().slice(0, 10) !== endDate.toISOString().slice(0, 10)) {
      cur.setDate(cur.getDate() + dir);
      const iso = cur.toISOString().slice(0, 10);
      if (blocked.has(iso)) return true;
    }
    return false;
  };

  const onDayPress = (d: DateObject) => {
    if (blocked.has(d.dateString)) return;

    if (!range.start || range.end) {
      setRange({ start: d.dateString });
    } else {
      if (hasBlockedBetween(range.start, d.dateString)) {
        setRange({});
        return;
      }
      if (d.dateString < range.start) setRange({ start: d.dateString, end: range.start });
      else setRange({ start: range.start, end: d.dateString });
    }
  };

  /* ---------------- markings ---------------- */
  const marked: Record<string, Marking> = useMemo(() => {
    const m: Record<string, Marking> = {};
    blocked.forEach((d) => {
      m[d] = { disabled: true, color: '#f3f3f3', textColor: '#bbb' };
    });

    const { start, end } = range;
    if (start && !end) {
      m[start] = { startingDay: true, endingDay: true, color: Colors.primary, textColor: '#fff' };
    } else if (start && end) {
      const startDate = new Date(start);
      const endDate = new Date(end);
      const dir = startDate < endDate ? 1 : -1;
      let cur = new Date(startDate);
      m[start] = { startingDay: true, color: Colors.primary, textColor: '#fff' };
      while (cur.toISOString().slice(0, 10) !== endDate.toISOString().slice(0, 10)) {
        cur.setDate(cur.getDate() + dir);
        const iso = cur.toISOString().slice(0, 10);
        if (iso === end) break;
        m[iso] = { color: Colors.primary + '55', textColor: '#fff' };
      }
      m[end] = { endingDay: true, color: Colors.primary, textColor: '#fff' };
    }
    return m;
  }, [blocked, range]);

  /* ---------------- derived totals ---------------- */
  const datesSet = range.start && range.end;
  const nights = datesSet ? Math.max(1, Math.round((+new Date(range.end!) - +new Date(range.start!)) / 864e5)) : 0;
  const totalPrice = nights * listingData.rentalPrice;

  /* ------------------------------------------------------------------ */
  return (
    <SafeAreaView style={styles.root} edges={['top', 'left', 'right', 'bottom']}>
      <StatusBar barStyle="dark-content" />

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconBtn}>
          <Ionicons name="chevron-back" size={20} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle} numberOfLines={1}>
          {listingData.listing}
        </Text>
        <TouchableOpacity style={styles.iconBtn} onPress={() => setSaved((p) => !p)} activeOpacity={0.7}>
          <Ionicons name={saved ? 'heart' : 'heart-outline'} size={20} color={saved ? Colors.primary : '#000'} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* HERO */}
        <View style={styles.hero}>
          <FlatList
            data={photos}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            keyExtractor={(_, i) => i.toString()}
            onMomentumScrollEnd={(e) => setIdx(Math.round(e.nativeEvent.contentOffset.x / width))}
            renderItem={({ item }) => <Image source={{ uri: item }} style={styles.heroImg} />}
          />
          <View style={styles.dotsRow} pointerEvents="none">
            {photos.map((_, i) => (
              <View key={i} style={[styles.dot, i === idx && styles.dotActive]} />
            ))}
          </View>
        </View>

        {/* BODY */}
        <View style={styles.body}>
          <Text style={styles.title}>{listingData.listing}</Text>
          <Text style={styles.meta}>{`${listingData.category} · ${listingData.size}`}</Text>

         {/* host profile card */}
          <Text style={styles.placeholder}></Text>

          <UserCard
            {...host}
            onPress={() =>
              navigation.navigate('UserProfileScreen', {
                userData: host,          // pass the whole user object
              })
            }
          />
          

          <Text style={styles.section}>Description</Text>
          <Text style={styles.description}>{listingData.description}</Text>

          <Text style={styles.section}>Availability</Text>
          <View style={styles.calendarWrap}>
            <CalendarList
              horizontal
              pagingEnabled
              pastScrollRange={0}
              futureScrollRange={11}
              markingType="period"
              markedDates={marked}
              onDayPress={onDayPress}
              style={{ width }}
              theme={{
                selectedDayBackgroundColor: Colors.primary,
                todayTextColor: Colors.primary,
                arrowColor: Colors.primary,
                monthTextColor: '#222',
                textMonthFontWeight: '700',
              }}
            />
          </View>

          <Text style={styles.section}>Pickup location</Text>
          <MapView
            style={styles.map}
            pointerEvents="none"
            initialRegion={{
              latitude: listingData.latitude ?? 37.7749,
              longitude: listingData.longitude ?? -122.4194,
              latitudeDelta: 0.05,
              longitudeDelta: 0.05,
            }}
          >
            <Marker
              coordinate={{
                latitude: listingData.latitude ?? 37.7749,
                longitude: listingData.longitude ?? -122.4194,
              }}
            />
          </MapView>
        </View>
      </ScrollView>

      {/* FOOTER */}
      <View style={styles.bottom}>
        <View>
          <Text style={styles.price}>${listingData.rentalPrice} / night</Text>
          {datesSet ? (
            <Text style={styles.dates}>{`${range.start} → ${range.end}`}</Text>
          ) : (
            <Text style={styles.dates}>Add dates for prices</Text>
          )}
          {datesSet && (
            <Text style={styles.total}>Total: ${totalPrice.toFixed(2)}</Text>
          )}
        </View>
        <TouchableOpacity
          style={[styles.reserve, !datesSet && { opacity: 0.4 }]}
          disabled={!datesSet}
          onPress={() =>
            navigation.navigate('CheckoutFlow', {
              listingData,
              startDate: range.start,
              endDate: range.end,
            })
          }
        >
          <Text style={styles.reserveTxt}>Reserve</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}


/* -------------------------------------------------------------------------- */
const styles = StyleSheet.create({
  root:{flex:1,backgroundColor:'#fff'},
  placeholder: {padding: 10},
  header:{marginTop:0,backgroundColor:'#fff',borderBottomWidth:1,borderBottomColor:'#eee',flexDirection:'row',alignItems:'center',justifyContent:'space-between',paddingHorizontal:14,paddingVertical:12},
  headerTitle:{flex:1,textAlign:'center',fontSize:16,fontWeight:'600',marginHorizontal:8},
  iconBtn:{padding:6},
  hero:{width,height:HERO_H,backgroundColor:'#000'},
  heroImg:{width,height:HERO_H,resizeMode:'cover'},
  dotsRow:{position:'absolute',bottom:12,alignSelf:'center',flexDirection:'row',gap:5},
  dot:{width:5,height:5,borderRadius:2.5,backgroundColor:'rgba(255,255,255,0.4)'},
  dotActive:{backgroundColor:'#fff'},
  body:{paddingHorizontal:20,paddingTop:22,paddingBottom:110},
  title:{fontSize:20,fontWeight:'700',color:'#222'},
  meta:{marginTop:4,fontSize:15,color:'#666'},
  section:{marginTop:28,marginBottom:10,fontSize:16,fontWeight:'700',color:'#222'},
  description:{fontSize:15,lineHeight:22,color:'#333'},
  calendarWrap:{marginTop:6,marginHorizontal:-20},
  map:{width:'100%',height:220,borderRadius:14,marginTop:10},
  bottom:{position:'absolute',left:0,right:0,bottom:0,paddingHorizontal:24,paddingVertical:24, borderTopWidth:1,borderTopColor:'#eee',backgroundColor:'#fff',flexDirection:'row',justifyContent:'space-between',alignItems:'center'},
  price:{fontSize:16,fontWeight:'700'},
  dates:{fontSize:12,color:Colors.primary,marginTop:2, marginBottom:10},
  reserve:{backgroundColor:'#000',borderRadius:12,paddingVertical:12,paddingHorizontal:40, marginBottom: 10},
  reserveTxt:{color:'#fff',fontSize:15,fontWeight:'700'},
});
