import { useState } from "react";
import { Play, Check, ChevronDown } from "lucide-react";

/**
 * Component card movie/series dengan layout landscape
 * @param {string} title - Judul film/series
 * @param {string} genre - Genre film/series
 * @param {string} duration - Durasi film atau jumlah episode
 * @param {boolean} isPremium - Status konten premium
 * @param {Function} onClick - Handler ketika card diklik
 * @param {Function} onPlayClick - Handler ketika tombol play diklik
 * @param {number} progress - Persentase progress tontonan (0-100)
 * @param {string} image - URL gambar landscape
 * @param {number} topTenRank - Ranking top 10 (jika ada)
 * @param {boolean} newEps - Status episode baru
 * @param {number} rating - Rating film (0-10)
 */
const LandscapeMovieCard = ({
  title,
  genre,
  duration,
  isPremium,
  onClick,
  onPlayClick,
  progress,
  image,
  topTenRank,
  newEps,
  rating
}) => {
  // State untuk tracking hover pada card
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`relative flex-shrink-0 cursor-pointer transition-transform duration-300 ${
        isHovered ? "absolute z-50 scale-130" : "z-10 scale-100"
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      <div className="relative transition-all duration-300 shadow-lg hover:shadow-2xl">
        {/* Container gambar dengan aspect ratio 16:9 */}
        <div className="relative overflow-hidden rounded-t-lg">
          <img
            src={image}
            alt={title}
            className="w-full aspect-[16/9] object-cover"
          />

          {/* Top 10 Badge - pojok kanan atas */}
          {topTenRank && (
            <div className="absolute top-2 right-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
              Top 10
            </div>
          )}

          {/* Premium or New Episode Badge - pojok kiri atas */}
          {isPremium && !newEps && (
            <div className="absolute top-2 left-2 bg-yellow-500 text-black text-xs px-2 py-1 rounded font-bold flex items-center gap-1">
              <i class="ri-star-fill"></i>
              Premium
            </div>
          )}

          {newEps && (
            <div className="absolute top-2 left-2 bg-blue-900 text-white text-xs font-bold px-2 py-1 rounded">
              Episode Baru
            </div>
          )}

          {/* Judul di kiri bawah */}
          <div className="absolute bottom-4 md:bottom-2 left-2 md:left-2 text-white font-semibold text-3xl md:text-xl drop-shadow-lg">
            {title}
          </div>

          {/* Rating di kanan bawah */}
          {rating && (
            <div className="absolute text-yellow-400 text-sm md:text-base bottom-4 md:bottom-2 right-2 flex items-center gap-1 bg-black/60 px-2 py-1 rounded">
             <i class="ri-star-fill"></i>
              <span className="text-white text-xl md:text-xs font-medium">{`${rating}/10`}</span>
            </div>
          )}

          <div
            className={`absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent transition-opacity duration-300 ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
          ></div>
        </div>

        {/* Panel aksi yang muncul saat hover - berisi tombol play, add to list, dll */}
        <div
          className={`absolute top-full left-0 right-0 bg-zinc-900 rounded-b-lg transition-all duration-300 overflow-hidden shadow-2xl ${
            isHovered
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-2 pointer-events-none"
          }`}
        >
          <div className="p-4 space-y-3">
            <div className="flex items-center justify-between">
              <button
                className="w-10 h-10 bg-white hover:bg-gray-200 rounded-full flex items-center justify-center transition transform hover:scale-110"
                onClick={(e) => {
                  e.stopPropagation();
                  if (onPlayClick) onPlayClick();
                }}
              >
                <Play className="w-5 h-5 text-black fill-current ml-0.5" />
              </button>
              <div className="flex space-x-2">
                <button
                  className="w-10 h-10 bg-transparent hover:bg-white/10 border-2 border-white/50 rounded-full flex items-center justify-center transition"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Check className="w-5 h-5 text-white" />
                </button>
                <button
                  className="w-10 h-10 bg-transparent hover:bg-white/10 border-2 border-white/50 rounded-full flex items-center justify-center transition"
                  onClick={(e) => e.stopPropagation()}
                >
                  <ChevronDown className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>

            {/* Progress bar untuk menampilkan sejauh mana user menonton */}
            {progress !== undefined && (
              <div className="flex items-center space-x-2">
                <div className="flex-1 h-1 bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-600 transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
                {duration && (
                  <span className="text-white text-xs">{duration}</span>
                )}
              </div>
            )}

            {genre && (
              <div className="flex flex-wrap gap-2">
                {genre.split(",").map((g, index) => (
                  <span key={index} className="text-white text-sm">
                    {g.trim()}
                    {index < genre.split(",").length - 1 ? " • " : ""}
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

export default LandscapeMovieCard;
