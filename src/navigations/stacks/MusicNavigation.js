import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SearchScreen } from "../../screens/Music";

const Stack = createNativeStackNavigator();

export function MusicNavigation() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#000' },
        headerTintColor: '#fff',
        contentStyle: { backgroundColor: '#000' },
      }}
    >
      <Stack.Screen
        name="SearchScreen"
        component={SearchScreen}
        options={{ title: "Buscar Música" }}
      />
    </Stack.Navigator>
  );
}