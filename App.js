import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { HandlerNavigation } from "./src/navigations";

export default function App() {
  return (
    <NavigationContainer>
      <View style={styles.container}>
        <HandlerNavigation />
        <StatusBar style="light" />
      </View>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
});