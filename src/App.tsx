import React from 'react';
import Header from './components/Header';
import WeatherCard from './components/WeatherCard';
import RecentSearches from './components/RecentSearches';
import { useWeather } from './hooks/useWeather';

const App: React.FC = () => {
  const { currentWeather, recentCities, error, isLoading, handleSearch } = useWeather();

  return (
    <div className="container bg-gray-400 mx-auto px-4 py-8 max-w-4xl min-h-[400px] rounded-sm shadow-sm">
      <Header onSearch={handleSearch} />
      
      {error && (
        <div className="text-red-500 text-center mb-4">{error}</div>
      )}

      <WeatherCard 
        weather={currentWeather ?? undefined}
        isLoading={isLoading}
      />

      {recentCities.length > 0 && (
        <RecentSearches
          cities={recentCities}
          onCityClick={handleSearch}
        />
      )}
    </div>
  );
};

export default App;