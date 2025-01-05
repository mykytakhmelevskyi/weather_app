import React, { useEffect, useState } from 'react';
import { fetchWeatherByCity, fetchWeatherByCoords } from './services/openWeatherMapApiService';
import Header from './components/Header';
import WeatherCard from './components/WeatherCard';
import RecentSearches from './components/RecentSearches';
import './styles/index.css';

const App: React.FC = () => {
  const [currentWeather, setCurrentWeather] = useState<any>(null);
  const [recentCities, setRecentCities] = useState<{ name: string; temp: number; icon: string }[]>([]);

  const handleSearch = async (city: string) => {
    try {
      const weather = await fetchWeatherByCity(city);
      setCurrentWeather(weather);
      setRecentCities((prev) => [
        { name: weather.name, temp: weather.main.temp, icon: weather.weather[0].icon },
        ...prev.filter((c) => c.name !== weather.name).slice(0, 4),
      ]);
    } catch (error: any) {
      alert(error.message);
    }
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;
      const weather = await fetchWeatherByCoords(latitude, longitude);
      setCurrentWeather(weather);
    });
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Header onSearch={handleSearch} />
      <main className="p-4">
        {currentWeather && <WeatherCard weather={currentWeather} />}
        <RecentSearches cities={recentCities} onCityClick={handleSearch} />
      </main>
    </div>
  );
};

export default App;