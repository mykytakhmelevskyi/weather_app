import axios, { AxiosInstance } from 'axios';
import { WeatherData, CityGeoResponse } from '../types/weather';
import { config } from '../config';

class OpenWeatherMapService {
  private weatherApi: AxiosInstance;
  private geoApi: AxiosInstance;

  constructor() {
    // Weather API instance
    this.weatherApi = axios.create({
      baseURL: config.WEATHER_API.BASE_URL,
      params: {
        appid: config.WEATHER_API.KEY,
        units: config.WEATHER_API.UNITS,
      },
    });

    // Geo API instance
    this.geoApi = axios.create({
      baseURL: config.WEATHER_API.GEO_URL,
      params: {
        appid: config.WEATHER_API.KEY,
        limit: 5,
      },
    });
  }

  async getWeatherByCity(city: string): Promise<WeatherData> {
    try {
      const response = await this.weatherApi.get<WeatherData>('/weather', {
        params: { q: city }
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        throw new Error('City not found');
      }
      throw new Error('Failed to fetch weather data');
    }
  }

  async getWeatherByCoords(lat: number, lon: number): Promise<WeatherData> {
    try {
      const response = await this.weatherApi.get<WeatherData>('/weather', {
        params: { lat, lon }
      });
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch weather data for your location');
    }
  }

  async getCitySuggestions(query: string): Promise<CityGeoResponse[]> {
    try {
      const response = await this.geoApi.get<CityGeoResponse[]>('', {
        params: { q: query }
      });
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch city suggestions');
    }
  }

  // Helper method to format error messages
  private formatErrorMessage(error: unknown): string {
    if (axios.isAxiosError(error)) {
      return error.response?.data?.message || error.message;
    }
    return error instanceof Error ? error.message : 'An unknown error occurred';
  }
}

// Export singleton instance
export const weatherService = new OpenWeatherMapService();

// Export type for testing purposes
export type { OpenWeatherMapService };