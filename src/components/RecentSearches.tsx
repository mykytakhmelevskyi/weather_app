import React from 'react';

interface RecentSearchesProps {
  cities: { name: string; temp: number; icon: string }[];
  onCityClick: (city: string) => void;
}

const RecentSearches: React.FC<RecentSearchesProps> = ({ cities, onCityClick }) => {
  return (
    <section className="w-full">
      <div className="flex justify-start mb-4">
        <h2 className="text-lg font-semibold text-gray-700">Recent Searches</h2>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {cities.map((city, index) => (
          <div
            key={index}
            className="bg-white shadow p-4 flex flex-col items-center text-center hover:bg-gray-100 cursor-pointer rounded-sm transition-colors duration-200"
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
    </section>
  );
};

export default RecentSearches;