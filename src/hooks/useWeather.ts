import { useState, useEffect } from 'react';
import { WeatherData, CityCache } from '../types/weather';
import { weatherService } from '../services/openWeatherMapApiService';
import { cacheService } from '../services/cacheService';
import { config } from '../config';
import { useGeolocation } from './useGeolocation';

export const useWeather = () => {
  const [currentWeather, setCurrentWeather] = useState<WeatherData | null>(null);
  const [recentCities, setRecentCities] = useState<CityCache[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const geolocation = useGeolocation();

  useEffect(() => {
    loadInitialWeather();
  }, []);

  const loadInitialWeather = async () => {
    setIsLoading(true);
    
    try {
      // Load cached cities first
      const cities = cacheService.load();
      setRecentCities(cities);

      // Try to get weather by location
      const coords = await geolocation.getLocation();
      if (coords) {
        const weatherData = await weatherService.getWeatherByCoords(coords.latitude, coords.longitude);
        await updateWeatherData(weatherData);
        return;
      }
      // Fallback to cached city or default
      if (cities.length > 0) {
        await handleSearch(cities[0].name);
      } else {
        await handleSearch(config.DEFAULT_CITIES[0]);
      }
    } catch (err) {
      setError('Failed to load weather data');
    } finally {
      setIsLoading(false);
    }
  };

  const updateWeatherData = async (weatherData: WeatherData) => {
    setCurrentWeather(weatherData);
    
    const newCity: CityCache = {
      name: weatherData.name,
      temp: weatherData.main.temp,
      icon: weatherData.weather[0].icon,
      lastUpdated: Date.now()
    };

    const updatedCities = cacheService.addCity(newCity);
    setRecentCities(updatedCities);
  };

  const handleSearch = async (city: string) => {
    if (!city) return;
    
    setIsLoading(true);
    setError(null);

    try {
      const weatherData = await weatherService.getWeatherByCity(city);
      await updateWeatherData(weatherData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch weather data');
      setCurrentWeather(null);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    currentWeather,
    recentCities,
    error: error || geolocation.error,
    isLoading: isLoading || geolocation.loading,
    handleSearch
  };
}; 