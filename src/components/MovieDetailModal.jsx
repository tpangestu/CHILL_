import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "./Modal";
import { movies, series } from "../data/moviesData";
import { Play, Plus, Volume2, VolumeX } from "lucide-react";
import MovieCard from "./MovieCard";

/**
 * Component modal untuk menampilkan detail lengkap movie/series
 * @param {boolean} isOpen - Status modal terbuka/tertutup
 * @param {Function} onClose - Handler untuk menutup modal
 * @param {Object} movie - Data lengkap movie/series yang ditampilkan
 */
const MovieDetailModal = ({ isOpen, onClose, movie }) => {
  const navigate = useNavigate();

  // State untuk toggle mute pada preview video
  const [isMuted, setIsMuted] = useState(true);

  if (!movie) {
    return null;
  }

  /**
   * Fungsi untuk mendapatkan rekomendasi movie berdasarkan genre
   * Prioritas: movie dengan genre sama, lalu random dari tipe yang sama
   * @returns {Array} Array 3 movie recommendations
   */
  const getRecommendations = () => {
    const sourceData = movie.type === "series" ? series : movies;
    // Filter out current movie
    const otherMovies = sourceData.filter((m) => m.id !== movie.id);

    // Try to find movies with same genre
    const sameGenreMovies = otherMovies.filter((m) => m.genre === movie.genre);

    let result = [];

    // If we have same genre movies, prioritize them
    if (sameGenreMovies.length > 0) {
      const shuffled = [...sameGenreMovies].sort(() => 0.5 - Math.random());
      result = shuffled;
    }

    // If we need more movies to reach 3, add random movies
    if (result.length < 3) {
      const remainingMovies = otherMovies.filter(m => !result.find(r => r.id === m.id));
      const shuffledRemaining = [...remainingMovies].sort(() => 0.5 - Math.random());
      result = [...result, ...shuffledRemaining];
    }

    // Always return exactly 3 movies
    return result.slice(0, 3);
  };

  // Generate recommendations hanya untuk film (bukan series)
  const recommendations = movie.type === "film" ? getRecommendations() : [];

  /**
   * Handler untuk tombol play - tutup modal lalu navigate ke watch page
   */
  const handlePlayClick = () => {
    onClose(); // Close modal first
    // Navigate with isPremium flag if movie is premium
    navigate('/watch', { state: { movie, isPremium: movie.isPremium } });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <div className="text-white">
        {/* Hero section dengan gambar background dan overlay gradien */}
        <div className="relative h-[45vh] md:h-[70vh] overflow-hidden">
          {/* Background image landscape atau fallback ke portrait */}
          <div className="absolute inset-0">
            {movie.imageLandscape ? (
              <img
                src={movie.imageLandscape}
                alt={movie.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-900">
                <p className="text-xl md:text-2xl">{movie.title}</p>
              </div>
            )}
          </div>

          {/* Gradien overlay untuk keterbacaan teks */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent" />

          {/* Konten overlay dengan info movie dan action buttons */}
          <div className="absolute inset-0 flex items-end">
            <div className="px-4 pb-3 md:px-10 md:pb-6 max-w-3xl w-full">
              {/* Premium Badge - Show only if movie is premium */}
              {movie.isPremium && (
                <div className="inline-flex items-center gap-1 md:gap-2 bg-yellow-500 text-black px-1.5 md:px-3 py-0.5 md:py-1.5 rounded text-[8px] md:text-xs font-bold mb-1 md:mb-2">
                  <i class="ri-star-fill"> </i>
                  PREMIUM
                </div>
              )}

              <h1 className="text-white text-lg md:text-4xl font-bold mb-1 md:mb-4 drop-shadow-2xl">
                {movie.title}
              </h1>
              <p className="text-gray-200 text-xs md:text-base mb-2 md:mb-8">
                <i class="ri-star-fill"> </i> {movie.rating} | {movie.genre} | {movie.duration}
              </p>

              {/* Tombol aksi: Play dan Add to List */}
              <div className="flex flex-wrap gap-2 md:gap-4 mb-2 md:mb-4">
                <button
                  onClick={handlePlayClick}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 md:px-6 md:py-2.5 rounded-md font-semibold text-xs md:text-base flex items-center gap-1 md:gap-2 transition-all hover:scale-105 shadow-lg"
                >
                  <Play className="w-3 h-3 md:w-5 md:h-5 fill-current" />
                  Mulai
                </button>
                <button className="bg-gray-600/80 hover:bg-gray-600 backdrop-blur-sm text-white px-3 py-1.5 md:px-8 md:py-2.5 rounded-md font-semibold text-xs md:text-base flex items-center gap-1 md:gap-2 transition-all hover:scale-105 border border-gray-500">
                  <Plus className="w-3 h-3 md:w-5 md:h-5" />
                  Daftar Saya
                </button>
                <div className="inline-flex items-center gap-2">
                  <div className="border-2 border-gray-400 text-gray-300 px-1.5 py-1 md:px-2 md:py-2 rounded-full text-[10px] md:text-sm font-bold">
                    18+
                  </div>
                </div>
              </div>
              {/* Tombol toggle volume untuk preview */}
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="absolute bottom-4 right-4 w-8 h-8 md:bottom-5 md:right-6 md:w-12 md:h-12 bg-black/60 hover:bg-black/80 backdrop-blur-sm border border-gray-600 rounded-full flex items-center justify-center text-white transition-all hover:scale-110"
                aria-label="Toggle volume"
              >
                {isMuted ? (
                  <VolumeX className="w-4 h-4 md:w-6 md:h-6" />
                ) : (
                  <Volume2 className="w-4 h-4 md:w-6 md:h-6" />
                )}
              </button>

              {/* Age Rating Badge */}
            </div>
          </div>
        </div>

        {/* Section konten detail: info movie, sinopsis, episode/rekomendasi */}
        <div className="p-4 md:p-6">
          {/* Grid info movie: Release Date, Rating, Genre, Duration */}
          <div className="grid grid-cols-2 gap-3 md:gap-4 mb-4 md:mb-6">
            <div>
              <p className="text-gray-400 text-xs md:text-sm">Tanggal Rilis</p>
              <p className="font-semibold text-sm md:text-base">{movie.releaseDate}</p>
            </div>
            <div>
              <p className="text-gray-400 text-xs md:text-sm">Rating</p>
              <p className="font-semibold text-sm md:text-base">★ {movie.rating}/10</p>
            </div>
            <div>
              <p className="text-gray-400 text-xs md:text-sm">Genre</p>
              <p className="font-semibold text-sm md:text-base">{movie.genre}</p>
            </div>
            <div>
              <p className="text-gray-400 text-xs md:text-sm">
                {movie.type === "series" ? "Episode" : "Durasi"}
              </p>
              <p className="font-semibold text-sm md:text-base">{movie.duration}</p>
            </div>
          </div>

          <div className="mb-4 md:mb-6">
            <h3 className="text-base md:text-xl font-semibold mb-2">Sinopsis</h3>
            <p className="text-gray-300 text-sm md:text-base">
              {movie.sinopsis ||
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."}
            </p>
          </div>

          {/* Daftar episode - hanya ditampilkan untuk series */}
          {movie.type === "series" && (
            <div>
              <h3 className="text-base md:text-xl font-semibold mb-3 md:mb-4">Episode</h3>
              <div className="space-y-2">
                {[1, 2, 3, 4].map((ep) => (
                  <div
                    key={ep}
                    className="flex gap-2 md:gap-4 p-2 md:p-3 bg-gray-800 rounded hover:bg-gray-700 cursor-pointer transition"
                  >
                    <div className="w-20 md:w-32 aspect-video bg-gray-700 rounded flex-shrink-0 overflow-hidden relative">
                      <img
                        src={movie.imageLandscape}
                        alt={`Episode ${ep}`}
                        className="w-full h-full object-cover"
                      />
                      {/* Premium Badge on Episode - Show only if movie is premium */}
                      {movie.isPremium && (
                        <div className="absolute top-0.5 left-0.5 md:top-1 md:left-1 bg-yellow-500 text-black text-[8px] md:text-xs font-bold px-1 md:px-2 py-0.5 rounded flex items-center gap-0.5 md:gap-1">
                         <i class="ri-star-fill"> </i>
                          PREMIUM
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-1">
                        <p className="font-semibold text-sm md:text-base">Episode {ep}</p>
                        <p className="text-xs md:text-sm text-gray-400">45m</p>
                      </div>
                      <p className="text-xs md:text-sm text-gray-400 line-clamp-2">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Sed do eiusmod tempor incididunt.
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Rekomendasi movie serupa - hanya untuk film (bukan series) */}
          {movie.type === "film" && recommendations.length > 0 && (
            <div className="mt-6 md:mt-8">
              <h3 className="text-base md:text-xl font-semibold mb-3 md:mb-4 text-center md:text-left">Rekomendasi Serupa</h3>
              <div className="flex justify-center gap-2 md:gap-4 py-4 -my-4">
                {recommendations.slice(0, 3).map((rec) => (
                  <div key={rec.id} className="flex-shrink-0 w-28 md:w-48">
                    <MovieCard
                      {...rec}
                      onClick={() => onClose()}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default MovieDetailModal;
