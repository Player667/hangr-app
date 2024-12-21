import React, { useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, View } from 'react-native';
import { Redirect } from 'expo-router';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

import ExploreScreen from '../screens/ExploreScreen';
import CommunityScreen from '../screens/CommunityScreen';
import ClosetScreen from '../screens/ClosetScreen';
import RentalScreen from '../screens/RentalScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ChatScreen from '../screens/ChatScreen';
import LoginScreen from '@/screens/LoginScreen';
import SignupScreen from '@/screens/SignupScreen';


type TabParamList = {
  Explore: undefined;
  Community: undefined;
  YourCloset: undefined;
  Rentals: undefined;
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
        headerShown: true,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: '#FF6211',
        tabBarInactiveTintColor: '#95a5a6',
        tabBarLabelStyle: styles.tabLabel,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          // Map route names to icon names
          if (route.name === 'Explore') {
            iconName = focused ? 'search' : 'search-outline';
          } else if (route.name === 'Community') {
            iconName = focused ? 'people' : 'people-outline';
          } else if (route.name === 'Your Closet') {
            iconName = focused ? 'hanger' : 'hanger';
          } else if (route.name === 'Rentals') {
            iconName = focused ? 'cart' : 'cart-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return (
            <View style={styles.tabIconContainer}>
              {focused && <View style={styles.indicator} />}
              {route.name === 'Your Closet' ? (
                <MaterialCommunityIcons name={iconName} size={size} color={color} />
              ) : (
                <Ionicons name={iconName} size={size} color={color} />
              )}
            </View>
          );
        },
      })}
    >
      <Tab.Screen name="Explore" component={ExploreScreen} />
      <Tab.Screen name="Community" component={CommunityScreen} />
      <Tab.Screen name="Your Closet" component={ClosetScreen} />
      <Tab.Screen name="Rentals" component={RentalScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  content: {
    flex: 1,
  },
  tabBar: {
    backgroundColor: '#ffffff',
    borderTopWidth: 3,
    borderTopColor: '#dcdcdc',
    height: 100,
    paddingBottom: 5,
    paddingTop: 0,
  },
  tabLabel: {
    fontSize: 10,
    fontWeight: '600',
    paddingTop: 3,
  },
  tabIconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  indicator: {
    position: 'absolute',
    top: -10, // Position above the icon
    width: 80, // Adjust width as needed
    height: 3, // Indicator thickness
    backgroundColor: '#FF6211', // Active color
    borderRadius: 1.5, // Rounded edges
  },
});