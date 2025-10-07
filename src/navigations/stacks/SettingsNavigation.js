import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SettingsScreen, StorageScreen } from "../../screens/Settings";
import { screens } from "../../utils";
import { styles } from "../Styles.styles";

const Stack = createNativeStackNavigator();

export function SettingsNavigation() {
  return (
    <Stack.Navigator screenOptions={{ ...styles.stackNavigationStyles }}>
      <Stack.Screen
        name={screens.tab.settings.settingsScreen}
        component={SettingsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={screens.tab.settings.storageScreen}
        component={StorageScreen}
        options={{
          title: "Almacenamiento",
          presentation: "modal",
        }}
      />
    </Stack.Navigator>
  );
}