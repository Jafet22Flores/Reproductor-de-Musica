import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  RadioScreen,
  FavoritesScreen,
  SearchScreen,
} from "../../screens/Music";
import { screens } from "../../utils";
import { styles } from "../Styles.styles";

const Stack = createNativeStackNavigator();

export function MusicNavigation() {
  return (
    <Stack.Navigator
      screenOptions={{
        ...styles.stackNavigationStyles,
      }}
    >
      <Stack.Screen
        name={screens.tab.music.radioScreen}
        component={RadioScreen}
        options={{ title: "Radio" }}
      />
      <Stack.Screen
        name={screens.tab.music.favoritesScreen}
        component={FavoritesScreen}
        options={{ title: "Favoritos" }}
      />
      <Stack.Screen
        name={screens.tab.music.searchScreen}
        component={SearchScreen}
        options={{ title: "Buscar" }}
      />
    </Stack.Navigator>
  );
}