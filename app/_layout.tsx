import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import "react-native-reanimated";
import HomeScreen from "./HomeScreen";
import "./global.css";

export default function RootLayout() {
  // const [loaded] = useFonts({
  //   SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  // });

  // if (!loaded) {
  //   // Async font loading only occurs in development.
  //   return null;
  // }


  return (
    // <SafeAreaView className="flex-1 bg-transparent">
    <View className="flex-1">
      <StatusBar style="light" translucent/>
      <HomeScreen/>
    </View>
    // {/* </SafeAreaView> */}
  );
}
