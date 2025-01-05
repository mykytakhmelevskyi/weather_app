import React from 'react';
import SearchBar from './SearchBar';

const Header: React.FC<{ onSearch: (city: string) => void }> = ({ onSearch }) => {
  return (
    <header className="bg-blue-500 text-white p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">Weather App</h1>
      <div className="w-1/2">
        <SearchBar onSearch={onSearch} />
      </div>
    </header>
  );
};

export default Header;