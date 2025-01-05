import React from 'react';
import { WeatherData } from '../types/weather';

interface WeatherCardProps {
  weather?: WeatherData;
  isLoading?: boolean;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ weather, isLoading }) => {
  return (
    <div className="relative flex flex-col items-center mb-8 text-center">
      <div className={`flex flex-col items-center mb-8 text-center ${isLoading ? 'animate-pulse' : ''}`}>
        {/* Weather Image/Skeleton */}
        <div className="w-32 h-32 sm:w-24 sm:h-24 mb-4">
          {isLoading ? (
            <div className="w-full h-full bg-gray-300 rounded-full" />
          ) : (
            <img
              className="w-full h-full object-contain"
              src={`http://openweathermap.org/img/wn/${weather?.weather[0].icon}@4x.png`}
              alt="Weather icon"
            />
          )}
        </div>

        {/* Temperature */}
        <div className="h-12 w-24">
          {isLoading ? (
            <div className="h-16 w-24 bg-gray-300 rounded mb-2" />
          ) : (
            <h2 className="text-6xl md:text-4xl sm:text-3xl font-bold">
              {Math.round(weather?.main.temp ?? 0)}°
            </h2>
          )}
        </div>

        {/* City Name */}
        <div className="h-6 w-32">
          {isLoading ? (
            <div className="h-6 w-32 bg-gray-300 rounded" />
          ) : (
            <p className="text-xl md:text-lg sm:text-base">
              {weather?.name}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;