import { useState } from 'react';

const mockGenres = [
  'Action',
  'Drama',
  'Comedy',
  'Horror',
  'Sci-Fi',
  'Thriller',
];

// CSS for hiding scrollbars
const scrollbarHideStyles = {
  msOverflowStyle: 'none', // IE and Edge
  scrollbarWidth: 'none', // Firefox
};

interface NavbarProps {
  selectedGenre: string;
  setSelectedGenre: (genre: string) => void;
}

export default function Navbar({
  selectedGenre,
  setSelectedGenre,
}: NavbarProps) {
  return (
    <div className="border-b border-zinc-800 mb-6">
      <nav
        className="flex space-x-8 overflow-x-auto pb-2"
        style={scrollbarHideStyles}
      >
        <style jsx>{`
          nav::-webkit-scrollbar {
            display: none;
          }
        `}</style>
        {mockGenres.map((genre) => (
          <button
            key={genre}
            className={`px-4 py-2 text-sm font-medium whitespace-nowrap ${
              selectedGenre === genre
                ? 'border-b-2 border-teal-500 text-teal-500'
                : 'text-gray-400 hover:text-gray-200'
            }`}
            onClick={() => setSelectedGenre(genre)}
          >
            {genre}
          </button>
        ))}
      </nav>
    </div>
  );
}
