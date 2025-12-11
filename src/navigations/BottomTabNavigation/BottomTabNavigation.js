import React from 'react';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MusicNavigation } from "../stacks";
import { styles } from "./BottomTabNavigation.styles";

const Tab = createBottomTabNavigator();

export function BottomTabNavigation() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBarStyle,
        tabBarInactiveTintColor: "#646464",
        tabBarActiveTintColor: "#1DB954",
      }}
    >
      <Tab.Screen
        name="MusicTab"
        component={MusicNavigation}
        options={{
          title: "Música",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="music" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
