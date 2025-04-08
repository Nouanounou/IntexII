import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="py-4 px-6 flex justify-between items-center border-b border-zinc-800">
      <div className="text-4xl font-bold">
        <span className="text-teal-500">Cine</span>
        <span className="text-gray-300">Niche</span>
      </div>
      <button className="bg-teal-600 hover:bg-teal-700 px-4 py-2 rounded text-white transition">
        Sign In
      </button>
    </header>
  );
};

export default Header;
