import React from 'react';

interface RecentSearchesProps {
  cities: { name: string; temp: number; icon: string }[];
  onCityClick: (city: string) => void;
}

const RecentSearches: React.FC<RecentSearchesProps> = ({ cities, onCityClick }) => {
  return (
    <div className="mt-4">
      <h2 className="text-lg font-semibold mb-2">Recent Searches</h2>
      <ul className="space-y-2">
        {cities.map((city, index) => (
          <li
            key={index}
            className="flex items-center bg-white shadow rounded p-2 hover:bg-gray-50 cursor-pointer"
            onClick={() => onCityClick(city.name)}
          >
            <img
              className="w-10 h-10 mr-4"
              src={`http://openweathermap.org/img/wn/${city.icon}@2x.png`}
              alt="weather icon"
            />
            <div>
              <p className="font-medium">{city.name}</p>
              <p className="text-sm text-gray-500">{city.temp}°C</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentSearches;