import { useState } from "react";
import {
  Image,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { MagnifyingGlassIcon } from "react-native-heroicons/outline";
import { MapPinIcon } from "react-native-heroicons/solid";

export default function HomeScreen() {
  const [showSearch, toggleSearch] = useState(false);
  const [locations, setLocations] = useState([1, 2, 3]);

  function handleLocation(loc: string) {
    console.log("Selected Location:", loc);
  }

  return (
    <View className="flex-1 relative">
      <Image
        blurRadius={70}
        source={require("@/assets/images/bg.png")}
        className="absolute w-full h-full"
      />
      <SafeAreaView className="flex flex-1">
        <View style={{ height: "7%" }} className="mx-4 relative z-50">
          <View
            className={`flex-row justify-end items-center rounded-full ${showSearch ? "bg-white/20 rounded-full" : "transparent rounded-full"}`}
            // className="flex-row justify-end items-center rounded-full bg-red-400"
          >
            {showSearch ? (
              <TextInput
                placeholder="Search city"
                placeholderTextColor="lightgray"
                className="pl-6 h-10 pb-1 flex-1 text-base text-white"
              />
            ) : null}
            <TouchableOpacity
              onPress={() => toggleSearch(!showSearch)}
              className="bg-white/30 rounded-full p-3 m-1"
            >
              <MagnifyingGlassIcon size={25} color="white" />
            </TouchableOpacity>
          </View>
          {locations.length > 0 && showSearch ? (
            <View className="absolute w-full bg-gray-300 top-16 rounded-3xl">
              {locations.map((loc, index) => {
                return (
                  <TouchableOpacity
                    onPress={() => handleLocation(loc.toString())}
                    key={index}
                    className={`flex-row items-center border-0 p-3 px-4 mb-1 ${index < 2 ? "border-b-2" : "border-b-gray-200"}`}
                  >
                    <MapPinIcon size={20} color="gray" />
                    <Text className="text-black text-lg ml-2">Herat, AFG</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          ) : null}
        </View>
      </SafeAreaView>
    </View>
  );
}
