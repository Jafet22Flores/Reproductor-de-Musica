import { StatusBar } from 'expo-status-bar';
import "@/global.css";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider/index";
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { HandlerNavigation } from "./src/navigations";

export default function App() {
  return (
    <NavigationContainer>
      <GluestackUIProvider mode="light">
        <View style={styles.container}>
          <HandlerNavigation />
          <StatusBar style="light" />
        </View>
      </GluestackUIProvider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    width: '100%',
    height: '100%',
  },
});