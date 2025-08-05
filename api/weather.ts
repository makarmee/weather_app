import { apiKey } from '@/constants';
import axios from 'axios';


const foreCastEndpoint = (params: any) => `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${params.city}&days=${params.days}&aqi=no&alerts=noo`
const locationsEndpoint = (params: any) => `https://api.weatherapi.com/v1/search.json?key=${apiKey}&q=${params.city}`;

const apiCall = async (endpoint: any) => {
  const options = {
    method: 'GET',
    url: endpoint,
  }
  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
}

export function fetchWeatherForecast(params: any) {
  return apiCall(foreCastEndpoint(params))
}
export function fetchLocations(params: any) {
  return apiCall(locationsEndpoint(params))
}