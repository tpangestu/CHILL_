import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  // State untuk menu profil user
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  // State untuk dropdown genre
  const [showGenreDropdown, setShowGenreDropdown] = useState(false);

  // State untuk deteksi scroll - mengubah style navbar
  const [isScrolled, setIsScrolled] = useState(false);

  // Daftar genre yang tersedia
  const genres = [
    'Aksi',
    'Anak-anak',
    'Anime',
    'Britania',
    'Drama',
    'Fantasi Ilmiah & Fantasi',
    'Kejahatan',
    'KDrama',
    'Komedi',
    'Petualangan',
    'Perang',
    'Romantis',
    'Sains & Alam',
    'Thriller'
  ];

  /**
   * Effect untuk handle scroll event
   * Navbar berubah background saat user scroll
   */
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 px-4 md:px-8 py-4 transition-all duration-300 ${
      isScrolled ? 'bg-black/95 backdrop-blur-md' : 'bg-gradient-to-b from-black/80 to-transparent'
    }`}>
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Logo CHILL */}
        <Link to="/home" className="flex items-center">
          <img src="/logo.svg" alt="CHILL Logo" className="h-8 md:h-10" />
          <div className="ml-2 text-white font-semibold text-lg md:text-2xl hidden md:block">CHILL</div>
        </Link>

        {/* Navigation links untuk mobile - horizontal scrollable */}
        <div className="flex md:hidden gap-3 text-white text-xs flex-1 ml-3 overflow-x-auto">
          <Link to="/series" className="hover:text-gray-300 transition-colors font-medium whitespace-nowrap">
            Series
          </Link>
          <Link to="/film" className="hover:text-gray-300 transition-colors font-medium whitespace-nowrap">
            Film
          </Link>
          <Link to="/daftar-saya" className="hover:text-gray-300 transition-colors font-medium whitespace-nowrap">
            Daftar Saya
          </Link>

          {/* Dropdown genre khusus mobile dengan backdrop */}
          <div className="relative z-50">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowGenreDropdown(!showGenreDropdown);
              }}
              className="hover:text-gray-300 transition-colors font-medium whitespace-nowrap flex items-center gap-1"
            >
              <span>Genre</span>
              <svg
                className={`w-3 h-3 transition-transform ${showGenreDropdown ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {showGenreDropdown && (
              <>
                {/* Backdrop */}
                <div
                  className="fixed inset-0 bg-black/50 z-40"
                  onClick={() => setShowGenreDropdown(false)}
                />
                {/* Dropdown */}
                <div className="fixed left-4 right-4 top-20 bg-gray-800 rounded-lg shadow-2xl overflow-hidden z-50">
                  <div className="grid grid-cols-2 gap-px bg-gray-900 max-h-[70vh] overflow-y-auto">
                    {genres.map((genre) => (
                      <button
                        key={genre}
                        onClick={() => setShowGenreDropdown(false)}
                        className="px-3 py-2 text-left text-white hover:bg-gray-700 transition-colors bg-gray-800 text-xs"
                      >
                        {genre}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Navigation links untuk desktop */}
        <div className="hidden md:flex gap-8 text-white text-base">
          <Link to="/series" className="hover:text-gray-300 transition-colors font-medium">
            Series
          </Link>
          <Link to="/film" className="hover:text-gray-300 transition-colors font-medium">
            Film
          </Link>
          <Link to="/daftar-saya" className="hover:text-gray-300 transition-colors font-medium">
            Daftar Saya
          </Link>
        </div>

        {/* Menu profil user dengan dropdown */}
        <div className="relative ml-2">
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className=" rounded-full flex items-center justify-center text-white font-semibold hover:scale-105 transition-transform"
          >
            <span className="text-2xl md:text-4xl ">

           <i class="ri-account-circle-fill"></i>
            </span>
          </button>

          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-52 bg-gray-900/95 backdrop-blur-sm rounded-md shadow-xl py-2 border border-gray-800">
              <Link
                to="/profile"
                className="flex items-center gap-2 px-4 py-2.5 text-white text-sm hover:bg-gray-800 transition-colors"
                onClick={() => setShowProfileMenu(false)}
              >
                <i class="ri-user-line"></i>
                Halaman Profil
              </Link>
              <Link
                to="/subscription"
                className="flex items-center gap-2 px-4 py-2.5 text-white text-sm hover:bg-gray-800 transition-colors"
                onClick={() => setShowProfileMenu(false)}
              >
               <i class="ri-star-line"></i>
                Ubah Premium
              </Link>
              <hr className="my-2 border-gray-700" />
              <Link
                to="/"
                className="flex items-center gap-2 px-4 py-2.5 text-white text-sm hover:bg-red-700 transition-colors"
                onClick={() => setShowProfileMenu(false)}
              >
                <i class="ri-login-circle-line"></i>
                Keluar
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
