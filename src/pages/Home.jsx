import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, Info, Volume2, VolumeX } from 'lucide-react';
import MovieRow from '../components/MovieRow';
import MovieDetailModal from '../components/MovieDetailModal';
import { movies, series, continueWatching, topRated, newRelease } from '../data/moviesData';

const Home = () => {
  const navigate = useNavigate();
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  // Handler saat film diklik untuk menampilkan detail
  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
    setShowDetailModal(true);
  };

  // Handler untuk memutar film dari card
  const handlePlayClick = (movie) => {
    navigate('/watch', { state: { movie, isPremium: movie.isPremium } });
  };

  // Handler untuk memutar film dari hero section
  const handleHeroPlayClick = (movie) => {
    navigate('/watch', { state: { movie, isPremium: movie.isPremium } });
  };

  // Komponen untuk Hero Section (banner utama)
  const HeroSection = ({ movie }) => {
    if (!movie) return null;

    return (
      <div className="relative h-[50vh] md:h-[90vh] w-full overflow-hidden mb-32 md:mb-64">
        {/* Gambar Background Hero */}
        <div className="absolute inset-0">
          <img
            src={movie.imageLandscape}
            alt={movie.title}
            className="w-full h-full object-cover"
            style={{ objectPosition: 'center' }}
          />
        </div>

        {/* Overlay Gradient Gelap untuk keterbacaan teks */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent" />

        {/* Konten Hero Section */}
        <div className="absolute inset-0 flex items-center">
          <div className="absolute px-6 md:px-12 lg:px-24 max-w-3xl w-full pt-12 md:pt-20 bottom-10">
            <h1 className="text-white text-2xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 drop-shadow-2xl">
              {movie.title}
            </h1>

            <div className="flex items-center gap-3 mb-4">
              <span className="text-yellow-400 text-sm md:text-base">★ {movie.rating}</span>
              <span className="text-gray-300 text-sm md:text-base">{movie.genre}</span>
              <span className="text-gray-300 text-sm md:text-base">{movie.duration}</span>
            </div>

            {/* Sinopsis film */}
            {movie.sinopsis && (
              <p className="text-gray-200 text-sm md:text-base mb-4 md:mb-6 line-clamp-3 drop-shadow-lg">
                {movie.sinopsis}
              </p>
            )}

            {/* Tombol Aksi */}
            <div className="flex flex-wrap gap-3 md:gap-4">
              <button
                onClick={() => handleHeroPlayClick(movie)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-2 md:px-8 py-2 md:py-3 rounded-md font-semibold text-[8px] md:text-base flex items-center gap-2 transition-all hover:scale-105 shadow-lg"
              >
                <Play className="w-4 md:w-5 h-3 md:h-5 fill-current" />
                Mulai
              </button>
              <button
                onClick={() => handleMovieClick(movie)}
                className="bg-gray-600/80 hover:bg-gray-600 backdrop-blur-sm text-white px-4 md:px-8 py-2 md:py-3 rounded-md font-semibold text-[8px] md:text-base flex items-center gap-2 transition-all hover:scale-105 border border-gray-500"
              >
                <Info className="w-5 h-5" />
                Selengkapnya
              </button>
            </div>
          </div>
        </div>

        {/* Tombol Toggle Volume */}
        <button
          onClick={() => setIsMuted(!isMuted)}
          className="absolute bottom-10 right-6 w-10 h-10 md:w-12 md:h-12 bg-black/60 hover:bg-black/80 backdrop-blur-sm border border-gray-600 rounded-full flex items-center justify-center text-white transition-all hover:scale-110"
          aria-label="Toggle volume"
        >
          {isMuted ? (
            <VolumeX className="w-5 h-5 md:w-6 md:h-6" />
          ) : (
            <Volume2 className="w-5 h-5 md:w-6 md:h-6" />
          )}
        </button>
      </div>
    );
  };

  // Menentukan film hero dari data series
  const heroMovie = series.find(m => m.title === 'Demon Slayer') || series[0];

  return (
    <div className="min-h-screen bg-black pb-12">
      {/* Seksi Hero Banner */}
      <HeroSection movie={heroMovie} />

      {/* Baris-baris Film */}
      <div className="relative z-10">
        <MovieRow
          title="Melanjutkan Tonton Film"
          movies={continueWatching}
          onMovieClick={handleMovieClick}
          onPlayClick={handlePlayClick}
          layout="landscape"
        />
        <MovieRow
          title="Top Rating Film dan Series Hari ini"
          movies={topRated}
          onMovieClick={handleMovieClick}
          onPlayClick={handlePlayClick}
        />
        <MovieRow
          title="Film Trending"
          movies={movies}
          onMovieClick={handleMovieClick}
          onPlayClick={handlePlayClick}
        />
        <MovieRow
          title="Rilis Baru"
          movies={newRelease}
          onMovieClick={handleMovieClick}
          onPlayClick={handlePlayClick}
        />
      </div>

      {/* Modal Detail Film */}
      <MovieDetailModal
        isOpen={showDetailModal}
        onClose={() => setShowDetailModal(false)}
        movie={selectedMovie}
      />
    </div>
  );
};

export default Home;