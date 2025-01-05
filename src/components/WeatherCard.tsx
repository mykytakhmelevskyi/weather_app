import React from 'react';

interface WeatherCardProps {
  weather: {
    name: string;
    main: { temp: number };
    weather: { description: string; icon: string }[];
  };
}

const WeatherCard: React.FC<WeatherCardProps> = ({ weather }) => {
  return (
    <div className="relative flex flex-col items-center mb-8 text-center">
      <div className="w-full h-64 sm:h-48 md:h-72 lg:h-96 relative">
        <img
          className="w-full h-full object-contain"
          src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`}
          alt={weather.weather[0].description}
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <p className="text-xl md:text-lg sm:text-base text-gray-800">{weather.name}</p>
          <h2 className="text-6xl text-gray-800">{Math.round(weather.main.temp)}°</h2>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;