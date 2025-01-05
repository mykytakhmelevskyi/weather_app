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
    <div className="bg-white shadow-md rounded-lg p-4 text-center">
      <h2 className="text-2xl font-semibold mb-2">{weather.name}</h2>
      <p className="text-xl mb-2">{weather.main.temp}°C</p>
      <p className="text-gray-600 capitalize">{weather.weather[0].description}</p>
      <img
        className="mx-auto mt-2"
        src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
        alt={weather.weather[0].description}
      />
    </div>
  );
};

export default WeatherCard;