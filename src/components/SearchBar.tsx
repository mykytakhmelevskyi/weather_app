import React, { useState, useEffect } from 'react';
import { fetchCitySuggestions } from '../services/openWeatherMapApiService';

interface SearchBarProps {
  onSearch: (city: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<{ name: string; state?: string; country: string }[]>([]);
  const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(null);

  const handleInputChange = (value: string) => {
    setQuery(value);
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }
    setTypingTimeout(
      setTimeout(async () => {
        if (value.length > 2) {
          try {
            const citySuggestions = await fetchCitySuggestions(value);
            setSuggestions(citySuggestions);
          } catch (error: any) {
            console.error(error.message);
          }
        } else {
          setSuggestions([]);
        }
      }, 500)
    );
  };

  const handleSearch = (city: string) => {
    setQuery('');
    setSuggestions([]);
    onSearch(city);
  };

  return (
    <div className="relative w-full sm:w-64">
      <input
        type="text"
        value={query}
        onChange={(e) => handleInputChange(e.target.value)}
        className="w-full text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500"
        placeholder="Search city..."
      />
      <ul className="absolute left-0 right-0 bg-white shadow-md mt-1 z-10">
        {suggestions.map((suggestion, index) => (
          <li
            key={index}
            className="p-2 hover:bg-gray-100 cursor-pointer"
            onClick={() => handleSearch(suggestion.name)}
          >
            {suggestion.name}, {suggestion.state ? `${suggestion.state}, ` : ''}{suggestion.country}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchBar;