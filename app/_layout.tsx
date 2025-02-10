import React, { useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, View, LogBox } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import LandingScreen from '@/screens/LandingScreen'; // New Landing Page
import ExploreScreen from '../screens/ExploreScreen';
import SavedScreen from '../screens/SavedScreen';
import RentalScreen from '../screens/RentalScreen';
import ProfileScreen from '../screens/ProfileScreen';
import MessagesScreen from '@/screens/Messages';
import LoginScreen from '@/screens/LoginScreen';
import SignupScreen from '@/screens/SignupScreen';
import ListingScreen from '@/screens/ListingScreen';
import UserProfileScreen from '@/screens/UserProfileScreen';
import AddListingScreen from '@/screens/AddListingScreen';
import Colors from '@/constants/Colors';
import CompleteProfileScreen from '@/screens/CompleteProfileScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function Layout() {
  // Hide Warnings on App
  LogBox.ignoreAllLogs(true);


  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Bottom Tab Navigator
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
    <Stack.Navigator initialRouteName={isAuthenticated ? "MainTabs" : "Landing"}>
      {/* Landing Screen - Shown if NOT Authenticated */}
      <Stack.Screen
        name="Landing"
        component={LandingScreen}
        options={{ headerShown: false }}
      />

      {/* Auth Screens */}
      <Stack.Screen
        name="Signup"
        component={SignupScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="CompleteProfile" 
        component={CompleteProfileScreen}
        options={{ headerShown: false }}
      />

      {/* Main App Navigation - Shown After Login */}
      <Stack.Screen
        name="MainTabs"
        component={BottomTabs}
        options={{ headerShown: false }}
      />

      {/* Additional Screens */}
      <Stack.Screen
        name="Listing"
        component={ListingScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="UserProfileScreen"
        component={UserProfileScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AddListingScreen"
        component={AddListingScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

// Styles
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
