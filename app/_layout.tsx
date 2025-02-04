import React, { useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, View } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

import ExploreScreen from '../screens/ExploreScreen';
import SavedScreen from '../screens/SavedScreen';
import ClosetScreen from '../screens/ClosetScreen';
import RentalScreen from '../screens/RentalScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ChatScreen from '../screens/ChatScreen';
import LoginScreen from '@/screens/LoginScreen';
import Colors from '@/constants/Colors';
import MessagesScreen from '@/screens/Messages';

type TabParamList = {
  Explore: undefined;
  Saved: undefined;
  Rentals: undefined;
  Messages: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

export default function Layout() {
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  if (!isAuthenticated) {
    return <LoginScreen />;
  }

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: '#FF6211',
        tabBarInactiveTintColor: Colors.lightBlack,
        tabBarLabelStyle: styles.tabLabel,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          switch (route.name) {
            case 'Explore':
              iconName = focused ? 'search' : 'search-outline';
              break;
            case 'Saved':
              iconName = focused ? 'heart' : 'heart-outline';
              break;
            case 'Rentals':
              iconName = focused ? 'cart' : 'cart-outline';
              break;
            case 'Messages':
              iconName = focused ? 'chatbubble' : 'chatbubble-outline';
              break;
            case 'Profile':
              iconName = focused ? 'person' : 'person-outline';
              break;
          }

          return (
            <View style={styles.tabIconContainer}>
              {focused && <View style={styles.indicator} />}
              <Ionicons name={iconName} size={size} color={color} />
            </View>
          );
        },
      })}
    >
      <Tab.Screen name="Explore" component={ExploreScreen} />
      <Tab.Screen name="Saved" component={SavedScreen} />
      <Tab.Screen name="Rentals" component={RentalScreen} />
      <Tab.Screen name="Messages" component={MessagesScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 0,
    margin: 0,
  },
  content: {
    flex: 1,
  },
  tabBar: {
    backgroundColor: '#ffffff',
    borderTopWidth: 3,
    borderTopColor: '#dcdcdc',
    height: 83,
    paddingBottom: 5,
  },
  tabLabel: {
    fontSize: 10,
    fontWeight: '600',
    color: Colors.lightBlack,
    paddingTop: 3,
  },
  tabIconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  indicator: {
    position: 'absolute',
    top: -10,
    width: 80,
    height: 3,
    backgroundColor: '#FF6211',
    borderRadius: 1.5,
  },
});
