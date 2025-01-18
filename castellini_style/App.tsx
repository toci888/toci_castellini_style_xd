import { Stack } from "expo-router"; // Obsługa stack navigacji
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar style="auto" />
      <Stack />
    </SafeAreaProvider>
  );
}
