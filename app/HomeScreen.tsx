import { fetchLocations, fetchWeatherForecast } from "@/api/weather";
import { weatherImages } from "@/constants";
import { getData, storeData } from "@/utils/asyncStorage";
import { debounce } from "lodash";
import { useCallback, useEffect, useState } from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import {
  CalendarDaysIcon,
  MagnifyingGlassIcon,
} from "react-native-heroicons/outline";
import { MapPinIcon } from "react-native-heroicons/solid";
import * as Progress from 'react-native-progress';
import { useSafeAreaInsets } from "react-native-safe-area-context";


export default function HomeScreen() {
  const [showSearch, toggleSearch] = useState(false);
  const [locations, setLocations] = useState([]);
  const [weather,setWeather]=useState({})
  const [loading,setLoading]=useState(true)
  
  function handleLocation(loc: any) {
    console.log("Selected location:", loc);
    setLocations([])
    toggleSearch(false)
    fetchWeatherForecast({
      city:loc.name,
      days:'7',
    }).then(data=>{
      setWeather(data);
      setLoading(false)
      storeData('city',loc.name)
      // console.log('got forecast: ',data)
    })

  }
  function handleSearch(value:any) {
    if (value.length>2){
      fetchLocations({city:value}).then((data:any)=>
        setLocations(data)
    )
    }
  }

  useEffect(()=>{fetchMyWeatherData()},[])
  async function fetchMyWeatherData (){
    let myCity=await getData('city');
    let city='Herat';
    if (myCity) city=myCity;

    fetchWeatherForecast({
      city,
      days:'7'
    }).then(data=>{
      setWeather(data)
      setLoading(false)
    })
  }

  const handleTextDebounce=useCallback(debounce(handleSearch,1200),[])
  const{current,location}=weather;

  const insets = useSafeAreaInsets();

  return (
    <View className="flex-1 relative" >
      <Image
        blurRadius={70}
        source={require("@/assets/images/bg.png")}
        className="absolute w-full h-full"
      />
      {loading?(
        <View className="flex-1 flex-row justify-center items-center">
          <Progress.CircleSnail thickness={10} size={120} color='#0bb3b2'/>
        </View>
      ):(

      <SafeAreaView className="flex flex-1">
        <View style={{ height: "7%",marginTop:52 }} className="mx-4 relative z-50">
          <View
            className={`flex-row justify-end items-center ${showSearch ? "bg-white/20 rounded-full " : "transparent"}`}
            // className="flex-row justify-end items-center rounded-full bg-red-400"
          >
            {showSearch ? (
              <TextInput
                onChangeText={handleTextDebounce}
                placeholder="Search city"
                placeholderTextColor="lightgray"
                className="pl-6 h-16 pb-2 flex-1 text-base text-white"
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
            <View className="absolute w-full bg-white/70 top-16 mt-1 rounded-3xl">
              {locations.map((loc, index) => {
                return (
                  <TouchableOpacity
                    onPress={() => handleLocation(loc)}
                    key={index}
                    className={`flex-row items-center border-0 p-3 px-4 mb-1 ${index < locations.length - 1 ? "border-b" : "border-b-black/50"}`}
                  >
                    <MapPinIcon size={20} color="#000000aa" />
                    <Text className="text-black text-lg ml-2">{loc?.name}, {loc?.country}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          ) : null}
        </View>
        {/* FORECAST */}
        <View className="mx-4 flex flex-1 justify-around mb-2">
          {/* Location name */}
          <Text className="text-white text-center text-2xl font-bold">
            {location?.name},
            <Text className="text-lg font-semibold text-gray-300">
              {" "+location?.country}
            </Text>
          </Text>
          {/* Weather icon */}
          <View className="flex-row justify-center">
            <Image
              // source={require("@/assets/images/partlycloudy.png")}
              source={weatherImages[current?.condition?.text] || weatherImages['other']}
              className="w-52 h-52"
            />
          </View>
          {/* Temperature and description */}
          <View className="flex gap-2">
            <Text className="text-center font-bold text-white text-6xl ml-5">
              {current?.temp_c}&#176;
            </Text>
            <Text className="text-center text-white tracking-widest">
              {current?.condition?.text}
            </Text>
          </View>
          {/* Weather details */}
          <View className="flex-row justify-between mx-4">
            <View className="flex flex-row gap-2 item-center">
              <Image
                source={require("@/assets/icons/wind.png")}
                className="w-6 h-6"
              />
              <Text className="text-white text-base font-semibold">{current?.wind_kph}kph</Text>
            </View>
            <View className="flex flex-row gap-2 item-center">
              <Image
                source={require("@/assets/icons/drop.png")}
                className="w-6 h-6"
              />
              <Text className="text-white text-base font-semibold">{current?.humidity}%</Text>
            </View>
            <View className="flex flex-row gap-2 item-center">
              <Image
                source={require("@/assets/icons/sun.png")}
                className="w-6 h-6"
              />
              <Text className="text-white text-base font-semibold">
                {weather?.forecast?.forecastday[0]?.astro?.sunrise}
              </Text>
            </View>
          </View>
          {/* next days */}
          <View className="mb-2 flex gap-3">
            <View className="flex flex-row items-center mx-5 gap-2">
              <CalendarDaysIcon size={22} color="white" />
              <Text className="text-white text-base">Daily forecast</Text>
            </View>
            <ScrollView
              horizontal
              contentContainerStyle={{ paddingHorizontal: 15 }}
              showsHorizontalScrollIndicator={false}
            >
              {weather?.forecast?.forecastday?.map((item, index)=>{
                let date=new Date(item.date)
                let options={weekday:'long'}
                let dayName=date.toLocaleDateString('en-US', options)
                dayName=dayName.split(',')[0]
                return(
                  <View className={`flex justify-center items-center w-24 rounded-3xl py-3 gap-1 bg-white/15 ${index>5?'mr-0':'mr-4'}`} key={index}>
                    <Image
                      source={weatherImages[item?.day?.condition?.text] || weatherImages['other']}
                      className="h-11 w-11"
                    />
                    <Text className="text-white">{dayName}</Text>
                    <Text className="text-white text-xl font-semibold">
                      {item?.day?.avgtemp_c}&#176;
                    </Text>
                  </View>
                  )
                })}

            </ScrollView>
          </View>
        </View>
      </SafeAreaView>
      )}

    </View>
  );
}
