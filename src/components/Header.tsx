import React from 'react';
import SearchBar from './SearchBar';

const Header: React.FC<{ onSearch: (city: string) => void }> = ({ onSearch }) => {
  return (
    <header className="w-full flex flex-wrap items-center justify-between mb-6 space-y-4 sm:space-y-0">
      <h1 className="text-xl">Weather App</h1>
      <SearchBar onSearch={onSearch} />
    </header>
  );
};

export default Header;