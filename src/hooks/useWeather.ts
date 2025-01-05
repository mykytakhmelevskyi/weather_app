import { useState, useEffect } from 'react';
import { WeatherData, CityCache } from '../types/weather';
import { fetchWeatherByCity } from '../services/openWeatherMapApiService';
import { cacheService } from '../services/cacheService';
import { config } from '../config';

export const useWeather = () => {
  const [currentWeather, setCurrentWeather] = useState<WeatherData | null>(null);
  const [recentCities, setRecentCities] = useState<CityCache[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadInitialWeather();
  }, []);

  const loadInitialWeather = async () => {
    const cities = cacheService.load();
    setRecentCities(cities);

    // If there are cached cities, use the most recent one
    if (cities.length > 0) {
      await handleSearch(cities[0].name);
    } else {
      // If no cached cities, use a default city
      await handleSearch(config.DEFAULT_CITIES[0]);
    }
  };

  const handleSearch = async (city: string) => {
    if (!city) return;
    
    setIsLoading(true);
    setError(null);

    try {
      const weatherData = await fetchWeatherByCity(city);
      setCurrentWeather(weatherData);

      const newCity: CityCache = {
        name: weatherData.name,
        temp: weatherData.main.temp,
        icon: weatherData.weather[0].icon,
        lastUpdated: Date.now()
      };

      const updatedCities = cacheService.addCity(newCity);
      setRecentCities(updatedCities);
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
    error,
    isLoading,
    handleSearch
  };
}; 