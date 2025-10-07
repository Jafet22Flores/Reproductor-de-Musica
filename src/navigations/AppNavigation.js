import React from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { BottomTabNavigation } from "./BottomTabNavigation";
import { screens } from "../utils";
import { PlayerScreen } from "../screens/Music";
import { styles } from "./Styles.styles";

const Stack = createNativeStackNavigator();

export function AppNavigation() {
  return (
    <Stack.Navigator>
      {/* Pantalla base: Los tabs inferiores */}
      <Stack.Screen
        name={screens.tab.root}
        component={BottomTabNavigation}
        options={{ headerShown: false }}
      />
      
      {/* Grupo de pantallas modales */}
      <Stack.Group
        screenOptions={{ 
          presentation: "modal",           // Se abren como modal
          ...styles.modalStyles            // Usan estilos de modal
        }}
      >
        {/* PlayerScreen: Reproductor completo */}
        <Stack.Screen
          name={screens.global.playerScreen}
          component={PlayerScreen}
          options={{ headerShown: false }}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
}