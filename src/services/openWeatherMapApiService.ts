import axios from 'axios';

const API_KEY = process.env.OPENWEATHERMAP_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';
const GEO_URL = 'http://api.openweathermap.org/geo/1.0/direct';

export const fetchWeatherByCity = async (city: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/weather`, {
      params: {
        q: city,
        appid: API_KEY,
        units: 'metric',
      },
    });
    return response.data;
  } catch (error: any) {
    throw new Error('City not found');
  }
};

export const fetchWeatherByCityId = async (id: number) => {
  try {
    const response = await axios.get(`${BASE_URL}/weather`, {
      params: {
        id,
        appid: API_KEY,
        units: 'metric',
      },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.message || 'City not found');
  }
};

export const fetchWeatherByCoords = async (lat: number, lon: number) => {
  try {
    const response = await axios.get(`${BASE_URL}/weather`, {
      params: {
        lat,
        lon,
        appid: API_KEY,
        units: 'metric',
      },
    });
    return response.data;
  } catch (error: any) {
    throw new Error('Error fetching weather data');
  }
};

export const fetchCitySuggestions = async (query: string) => {
  try {
    const response = await axios.get(GEO_URL, {
      params: {
        q: query,
        limit: 5,
        appid: API_KEY,
      },
    });
    return response.data;
  } catch (error: any) {
    throw new Error('Error fetching city suggestions');
  }
};