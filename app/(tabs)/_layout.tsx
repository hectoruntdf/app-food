import React from 'react';
import { Tabs } from 'expo-router';
import {Ionicons} from '@expo/vector-icons';

export default function RootLayout() {
 
  return (
    <Tabs screenOptions={{headerShown: false }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'HOME',
          // Texto verde oscuro cuando está activo
          tabBarActiveTintColor: '#166534', 
          tabBarIcon: ({ color, size, focused }) => (
            
            <Ionicons
              name={focused ? 'home' : 'home-outline'}
              size={size}
              color={color}
            />  
          ),
        }}
      />
      
      <Tabs.Screen
        name="search"
        options={{
          title: "SEARCH",
          headerTitle: "SEARCH",
          tabBarLabel: "SEARCH",
          tabBarActiveTintColor: '#166534',
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? 'search' : 'search-outline'}
              size={size}
              color={color}
            />
          ),
        }}
      />
      
      <Tabs.Screen
        name="favorites"
        options={{
          title: 'FAVORITES',
          headerTitle: 'FAVORITES',
          tabBarLabel: 'FAVORITES',
          tabBarActiveTintColor: '#166534',
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? 'heart' : 'heart-outline'}
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}