import { useState } from 'react';

/**
 * Component dropdown untuk memilih genre
 * @param {Function} onGenreSelect - Callback ketika genre dipilih
 */
const GenreDropdown = ({ onGenreSelect }) => {
  // State untuk toggle dropdown
  const [isOpen, setIsOpen] = useState(false);

  // State untuk menyimpan genre yang dipilih
  const [selectedGenre, setSelectedGenre] = useState('Genre');

  // Daftar genre yang tersedia
  const genres = [
    'Aksi',
    'Anak-anak',
    'Anime',
    'Britania',
    'Drama',
    'Kejahatan',
    'KDrama',
    'Komedi',
    'Petualangan',
    'Perang',
    'Romantis',
    'Sains & Alam',
    'Sci-FI',
    'Thriller'
  ];

  /**
   * Handler ketika genre dipilih
   * Update state dan trigger callback
   * @param {string} genre - Genre yang dipilih
   */
  const handleGenreSelect = (genre) => {
    setSelectedGenre(genre);
    setIsOpen(false);
    if (onGenreSelect) {
      onGenreSelect(genre);
    }
  };

  return (
    <div className="relative">
      {/* Tombol dropdown dengan icon chevron yang rotate saat open */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-gray-800 text-white px-6 py-3 rounded-lg flex items-center gap-2 hover:bg-gray-700 transition-colors min-w-[180px] justify-between"
      >
        <span>{selectedGenre}</span>
        <svg
          className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown menu dengan grid 2 kolom */}
      {isOpen && (
        <div className="absolute top-full mt-2 bg-gray-800 rounded-lg shadow-xl overflow-hidden min-w-[320px]">
          <div className="grid grid-cols-2 gap-px bg-gray-900">
            {genres.map((genre) => (
              <button
                key={genre}
                onClick={() => handleGenreSelect(genre)}
                className="px-6 py-3 text-left text-white hover:bg-gray-700 transition-colors bg-gray-800"
              >
                {genre}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default GenreDropdown;
