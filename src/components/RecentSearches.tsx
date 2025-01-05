import React from 'react';

interface RecentSearchesProps {
  cities: { name: string; temp: number; icon: string }[];
  onCityClick: (city: string) => void;
}

const RecentSearches: React.FC<RecentSearchesProps> = ({ cities, onCityClick }) => {
  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {/* <h2 className="text-lg mb-2">Recent Searches</h2> */}
        {cities.map((city, index) => (
          <div
            key={index}
            className="bg-white shadow p-4 flex flex-col items-center text-center hover:bg-gray-50 cursor-pointer"
            onClick={() => onCityClick(city.name)}
          >
            <div className="flex justify-between items-center w-full">
              <div className="text-left">
                <h3 className="text-lg md:text-base sm:text-sm font-bold">{city.name}</h3>
                <p className="text-xl md:text-lg sm:text-sm">{Math.round(city.temp)}°</p>
              </div>
              <div className="w-16 h-16 sm:w-12 sm:h-12 flex-shrink-0">
                <img
                  className="w-full h-full object-contain"
                  src={`http://openweathermap.org/img/wn/${city.icon}@2x.png`}
                  alt="weather icon"
                />
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default RecentSearches;