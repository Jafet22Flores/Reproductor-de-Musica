import React from 'react';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MusicNavigation, SettingsNavigation } from "../stacks";
import { screens } from "../../utils";
import { styles } from "./BottomTabNavigation.styles";

const Tab = createBottomTabNavigator();

export function BottomTabNavigation() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,                           // Oculta el header del tab
        tabBarStyle: styles.tabBarStyle,              // Aplica estilos personalizados
        tabBarInactiveTintColor: "#646464",           // Color de tabs inactivos (gris)
        tabBarActiveTintColor: "#0891b2",             // Color de tab activo (cyan)
        tabBarIcon: ({ color, size }) => screenIcon(route, color, size),  // Función para iconos
      })}
    >
      {/* Tab 1: Música */}
      <Tab.Screen
        name={screens.tab.music.root}
        component={MusicNavigation}
        options={{ title: "Música" }}
      />
      
      {/* Tab 2: Ajustes */}
      <Tab.Screen
        name={screens.tab.settings.root}
        component={SettingsNavigation}
        options={{ title: "Ajustes" }}
      />
    </Tab.Navigator>
  );
}

// Función que determina qué icono mostrar según la ruta
function screenIcon(route, color, size) {
  let iconName;

  if (route.name === screens.tab.music.root) {
    iconName = "music";              // Icono de nota musical
  }
  if (route.name === screens.tab.settings.root) {
    iconName = "cog-outline";        // Icono de engranaje
  }

  return (
    <MaterialCommunityIcons
      name={iconName}
      color={color}
      size={size}
    />
  );
}