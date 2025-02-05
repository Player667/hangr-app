import React, { useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import ExploreScreen from '../screens/ExploreScreen';
import SavedScreen from '../screens/SavedScreen';
import RentalScreen from '../screens/RentalScreen';
import ProfileScreen from '../screens/ProfileScreen';
import MessagesScreen from '@/screens/Messages';
import LoginScreen from '@/screens/LoginScreen';
import ListingScreen from '@/screens/ListingScreen'; // Example of a non-tab screen
import Colors from '@/constants/Colors';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function Layout() {
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  if (!isAuthenticated) {
    return <LoginScreen />;
  }

  const BottomTabs = () => (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: '#FF6211',
        tabBarInactiveTintColor: Colors.lightBlack,
        tabBarLabelStyle: styles.tabLabel,
        tabBarIcon: ({ focused, color, size }) => {
          const icons = {
            Explore: focused ? 'search' : 'search-outline',
            Saved: focused ? 'heart' : 'heart-outline',
            Rentals: focused ? 'cart' : 'cart-outline',
            Messages: focused ? 'chatbubble' : 'chatbubble-outline',
            Profile: focused ? 'person' : 'person-outline',
          };
          return (
            <View style={styles.tabIconContainer}>
              {focused && <View style={styles.indicator} />}
              <Ionicons name={icons[route.name]} size={size} color={color} />
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

  return (
    <Stack.Navigator>
      {/* The BottomTabs navigator is the main structure */}
      <Stack.Screen
        name="MainTabs"
        component={BottomTabs}
        options={{ headerShown: false }}
      />

      {/* Add other screens that are NOT in the bottom tabs here */}
      <Stack.Screen
        name="Listing"
        component={ListingScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
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
