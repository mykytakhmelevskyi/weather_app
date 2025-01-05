import axios from 'axios';
import { config } from '../config';
import { WeatherData, CityGeoResponse } from '../types/weather';

export const fetchWeatherByCity = async (city: string): Promise<WeatherData> => {
  try {
    const response = await axios.get<WeatherData>(`${config.WEATHER_API.BASE_URL}/weather`, {
      params: {
        q: city,
        appid: config.WEATHER_API.KEY,
        units: config.WEATHER_API.UNITS,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('City not found');
  }
};

export const fetchWeatherByCityId = async (id: number) => {
  try {
    const response = await axios.get(`${config.WEATHER_API.BASE_URL}/weather`, {
      params: {
        id,
        appid: config.WEATHER_API.KEY,
        units: config.WEATHER_API.UNITS,
      },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.message || 'City not found');
  }
};

export const fetchWeatherByCoords = async (lat: number, lon: number) => {
  try {
    const response = await axios.get(`${config.WEATHER_API.BASE_URL}/weather`, {
      params: {
        lat,
        lon,
        appid: config.WEATHER_API.KEY,
        units: config.WEATHER_API.UNITS,
      },
    });
    return response.data;
  } catch (error: any) {
    throw new Error('Error fetching weather data');
  }
};

export const fetchCitySuggestions = async (query: string): Promise<CityGeoResponse[]> => {
  try {
    const response = await axios.get(config.WEATHER_API.GEO_URL, {
      params: {
        q: query,
        limit: 5,
        appid: config.WEATHER_API.KEY,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Error fetching city suggestions');
  }
};