import AsyncStorage from '@react-native-async-storage/async-storage';


export async function storeData(key,value){
    try{
        await AsyncStorage.setItem(key,value);
    }catch(error){
        console.log('Error storing value: ',error)
    }
};
export async function getData(key){
    try{
        const value  = await AsyncStorage.getItem(key);
        return value
    }catch(error){
        console.log('Error getting value: ',error)
    }
};