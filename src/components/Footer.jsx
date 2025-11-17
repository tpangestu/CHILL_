import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { getAssetPath } from '../utils/assetPath';

const Footer = () => {
  const [isGenreOpen, setIsGenreOpen] = useState(false);

  const [isHelpOpen, setIsHelpOpen] = useState(false);

  const genreLinks = [
    'Aksi', 'Anak-anak', 'Anime', 'Sci-Fi',
    'Drama', 'Fantasi Ilmiah & Fantasi', 'Kejahatan', 'KDrama',
    'Komedi', 'Petualangan', 'Perang', 'Romantis', 'Sains & Alam', 'Thriller'
  ];

  const helpLinks = [
    { name: 'FAQ', path: '#' },
    { name: 'Kontak Kami', path: '#' },
    { name: 'Privasi', path: '#' },
    { name: 'Syarat & Ketentuan', path: '#' }
  ];

  return (
    <footer className="w-full bg-black text-gray-400 py-12 px-4 md:px-8 border-t border-gray-900">
      <div className="w-full max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:justify-between md:items-start">
          <hr className='mb-8'/>
          {/* Logo CHILL */}
          <div className="mb-8 md:mb-0">
            <Link to="/home" className="flex items-start md:items-center ">
              <img src={getAssetPath("/logo-white.svg")} alt="CHILL Logo" className="h-10 md:h-40" />
              <div className="ml-2 text-white font-semibold text-4xl md:text-7xl">CHILL</div>
            </Link>

            {/* Copyright - Mobile Only */}
            <div className="mt-6 md:hidden">
              <p className="text-sm">©2025 Chill || Code By:Estu.</p>
            </div>
          </div>

          {/* Section Genre dan Bantuan */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
          {/* Genre - Dropdown di mobile, selalu terlihat di desktop */}
          <div className="border-b border-gray-800 md:border-b-0 pb-4 md:pb-0">
            <button
              onClick={() => setIsGenreOpen(!isGenreOpen)}
              className="flex items-center justify-between w-full text-white font-semibold mb-4 text-lg md:pointer-events-none"
            >
              <span>Genre</span>
              <span className="md:hidden">
                {isGenreOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
              </span>
            </button>
            <div className={`${isGenreOpen ? 'grid' : 'hidden'} md:grid grid-cols-2 gap-x-8 gap-y-2`}>
              {genreLinks.map((genre, index) => (
                <Link
                  key={index}
                  to="#"
                  className="text-sm hover:text-white transition-colors duration-200"
                >
                  {genre}
                </Link>
              ))}
            </div>
          </div>

          {/* Bantuan - Dropdown di mobile, selalu terlihat di desktop */}
          <div className="border-b border-gray-800 md:border-b-0 pb-4 md:pb-0">
            <button
              onClick={() => setIsHelpOpen(!isHelpOpen)}
              className="flex items-center justify-between w-full text-white font-semibold mb-4 text-lg md:pointer-events-none"
            >
              <span>Bantuan</span>
              <span className="md:hidden">
                {isHelpOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
              </span>
            </button>
            <ul className={`${isHelpOpen ? 'block' : 'hidden'} md:block space-y-2`}>
              {helpLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.path}
                    className="text-sm hover:text-white transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        </div>

        {/* Copyright - Desktop Only */}
        <div className="hidden md:block text-center border-t border-gray-800 pt-6 mt-8">
          <p className="text-sm">©2025 Chill || Code By:Estu.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
