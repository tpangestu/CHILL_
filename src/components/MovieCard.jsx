import { useState, useEffect } from 'react';
import { Play, Check, ChevronDown, Star } from 'lucide-react';

/**
 * @param {string} title - Judul film/series
 * @param {string} genre - Genre film/series
 * @param {string} duration - Durasi film atau jumlah episode
 * @param {boolean} isPremium - Status konten premium
 * @param {Function} onClick - Handler ketika card diklik
 * @param {Function} onPlayClick - Handler ketika tombol play diklik
 * @param {string} image - URL gambar portrait
 * @param {string} imageLandscape - URL gambar landscape (untuk hover)
 * @param {number} topTenRank - Ranking top 10 (jika ada)
 * @param {boolean} newEps - Status episode baru
 */
const MovieCard = ({
  title,
  genre,
  duration,
  isPremium,
  onClick,
  onPlayClick,
  image,
  imageLandscape,
  topTenRank,
  newEps
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const [isMobile, setIsMobile] = useState(false);

 
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  /**
   * Handler mouse enter - hanya aktif di desktop
   */
  const handleMouseEnter = () => {
    if (!isMobile) {
      setIsHovered(true);
    }
  };

  /**
   * Handler mouse leave - hanya aktif di desktop
   */
  const handleMouseLeave = () => {
    if (!isMobile) {
      setIsHovered(false);
    }
  };

  return (
    <div
      className={`flex-shrink-0 cursor-pointer transition-all duration-300`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      <div className={`relative transition-all duration-300 shadow-lg hover:shadow-2xl ${
        isHovered && imageLandscape ? 'scale-140 z-[9999]' : 'scale-100 z-10'
      }`}
      style={{
        transformOrigin: 'center center',
        willChange: 'transform'
      }}
      >
        {/* Container gambar - berubah dari portrait ke landscape saat hover */}
        <div className="relative overflow-visible rounded-t-lg transition-all duration-300">
          <img
            src={isHovered && imageLandscape ? imageLandscape : image}
            alt={title}
            className={`w-full object-cover transition-all duration-300 ${
              isHovered && imageLandscape ? 'aspect-[16/9]' : 'aspect-[2/3]'
            }`}
          />

          {/* Top 10 Badge - pojok kanan atas */}
          {topTenRank && (
            <div className={`absolute top-0 right-2 md:right-4 bg-red-600 text-white text-[8px] md:text-xs font-bold px-0.5 md:px-1 py-0.5 md:py-1 rounded flex-column text-center transition-opacity duration-300 ${
              isHovered && imageLandscape ? 'opacity-0' : 'opacity-100'
            }`}>
              <p>Top</p>
              <p>10</p>
            </div>
          )}

          {/* Premium or New Episode Badge - pojok kiri atas */}
          {isPremium && !newEps && (
            <div className={`absolute top-1 left-1 md:top-2 md:left-2 bg-yellow-500 text-black text-[12px] md:text-xs px-1 md:px-2 py-0.5 md:py-1 rounded font-bold flex items-center gap-0.5 md:gap-1 transition-opacity duration-300 ${
              isHovered && imageLandscape ? 'opacity-0' : 'opacity-100'
            }`}>
               <i class="ri-star-fill"></i>
              <span className="hidden sm:inline">Premium</span>
              <span className="sm:hidden">Prem</span>
            </div>
          )}

          {newEps && (
            <div className={`absolute top-1 left-1 md:top-2 md:left-2 bg-blue-900 text-white text-[12px] md:text-xs font-bold px-1 md:px-2 py-0.5 md:py-1 rounded transition-opacity duration-300 ${
              isHovered && imageLandscape ? 'opacity-0' : 'opacity-100'
            }`}>
              <span className="hidden sm:inline">Episode Baru</span>
              <span className="sm:hidden">Eps Baru</span>
            </div>
          )}

          <div
            className={`absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent transition-opacity duration-300 ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`}
          ></div>
        </div>

        {/* Panel aksi yang muncul saat hover - berisi tombol play, add to list, dll */}
        <div
          className={`absolute top-full left-0 right-0 bg-zinc-900 rounded-b-lg transition-all duration-300 overflow-hidden shadow-2xl ${
            isHovered
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 -translate-y-2 pointer-events-none'
          }`}
        >
          <div className="p-3 space-y-2">
            <div className="flex items-center justify-between">
              <button
                className="w-9 h-9 bg-white hover:bg-gray-200 rounded-full flex items-center justify-center transition transform hover:scale-110"
                onClick={(e) => {
                  e.stopPropagation();
                  if (onPlayClick) onPlayClick();
                }}
              >
                <Play className="w-4 h-4 text-black fill-current ml-0.5" />
              </button>
              <div className="flex space-x-2">
                <button
                  className="w-9 h-9 bg-transparent hover:bg-white/10 border-2 border-white/50 rounded-full flex items-center justify-center transition"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Check className="w-4 h-4 text-white" />
                </button>
                <button
                  className="w-9 h-9 bg-transparent hover:bg-white/10 border-2 border-white/50 rounded-full flex items-center justify-center transition"
                  onClick={(e) => e.stopPropagation()}
                >
                  <ChevronDown className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>

            {duration && (
              <p className="text-white text-xs font-semibold py-2">{duration}</p>
            )}

            {genre && (
              <div className="flex flex-wrap gap-1 py-2">
                {genre.split(',').map((g, index) => (
                  <span key={index} className="text-white text-xs">
                    {g.trim()}
                    {index < genre.split(',').length - 1 ? ' • ' : ''}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;