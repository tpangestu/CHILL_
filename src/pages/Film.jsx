import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MovieRow from '../components/MovieRow';
import MovieDetailModal from '../components/MovieDetailModal';
import GenreDropdown from '../components/GenreDropdown';
import { movies, topRated, continueWatching, newRelease } from '../data/moviesData';
import { Play, Info, Volume2, VolumeX } from 'lucide-react';

const Film = () => {
  const navigate = useNavigate();

  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  const heroMovie = movies[0] || movies.find(m => m.title === "Don't Look Up");

  // Fungsi untuk menangani klik pada card film - membuka modal detail
  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
    setShowDetailModal(true);
  };

  // Fungsi untuk menangani tombol play pada card film - navigasi ke halaman watch
  const handlePlayClick = (movie) => {
    navigate('/watch', { state: { movie, isPremium: movie.isPremium } });
  };

  // Fungsi untuk menangani tombol play di hero section - navigasi ke halaman watch
  const handleHeroPlayClick = () => {
    navigate('/watch', { state: { movie: heroMovie, isPremium: heroMovie.isPremium } });
  };

  // Fungsi untuk menangani pemilihan genre dari dropdown
  const handleGenreSelect = (genre) => {
    console.log('Selected genre:', genre);
    // TODO: Filter movies by selected genre
  };

  return (
   <div className="min-h-screen bg-black pb-12">
      {/* Hero Section - Bagian utama yang menampilkan film unggulan dengan background besar */}
      <div className="relative h-[50vh] md:h-[90vh] w-full overflow-hidden mb-32 md:mb-64">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src={heroMovie.imageLandscape}
            alt={heroMovie.title}
            className="w-full h-full object-cover"
            style={{ objectPosition: 'center' }}
          />
        </div>
         {/* Dark Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent" />

        {/* Genre Dropdown - Dropdown untuk filter berdasarkan genre (hanya tampil di desktop) */}
        <div className="hidden md:block absolute top-8 left-6 z-20">
          <GenreDropdown onGenreSelect={handleGenreSelect} />
        </div>

        <div className="absolute inset-0 flex items-center">
          <div className="absolute px-6 md:px-12 lg:px-24 max-w-3xl w-full pt-12 md:pt-20 bottom-10">
            <h1 className="text-white text-2xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 drop-shadow-2xl">
              {heroMovie.title}
            </h1>

            <div className="flex items-center gap-3 mb-4">
              <span className="text-yellow-400 text-sm md:text-base"><i class="ri-star-fill"> </i>{heroMovie.rating}</span>
              <span className="text-gray-300 text-sm md:text-base">{heroMovie.genre}</span>
              <span className="text-gray-300 text-sm md:text-base">{heroMovie.duration}</span>
            </div>

             {/* Sinopsis */}
            {heroMovie.sinopsis && (
              <p className="text-gray-200 text-sm md:text-base mb-4 md:mb-6 line-clamp-3 drop-shadow-lg">
                {heroMovie.sinopsis}
              </p>
            )}

           {/* Action Buttons - Tombol Mulai (play) dan Selengkapnya (info) */}
            <div className="flex flex-wrap gap-3 md:gap-4 ">
              <button
                onClick={handleHeroPlayClick}
                className="bg-blue-600 hover:bg-blue-700 text-white px-2 md:px-8 py-2 md:py-3 rounded-md font-semibold text-[10px] md:text-base flex items-center gap-2 transition-all hover:scale-105 shadow-l"
              >
                <Play className="w-5 h-5 fill-current" />
                Mulai
              </button>
              <button
                onClick={() => handleMovieClick(heroMovie)}
                className="bg-gray-600/80 hover:bg-gray-600 backdrop-blur-sm text-white px-4 md:px-8 py-2 md:py-3 rounded-md font-semibold text-[10px] md:text-base flex items-center gap-2 transition-all hover:scale-105 border border-gray-500"
              >
                <Info className="w-5 h-5" />
                Selengkapnya
              </button>
            </div>

          </div>
        </div>
        {/* Volume Toggle - Tombol untuk mute/unmute audio di hero section */}
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

      {/* Film Rows - Deretan film yang dikelompokkan berdasarkan kategori */}
      <div className="relative z-10">
        <MovieRow
          title="Melanjutkan Tonton Film"
          movies={continueWatching}
          onMovieClick={handleMovieClick}
          onPlayClick={handlePlayClick}
          layout="landscape"
        />
        <MovieRow
          title="Film Pencapaian Chill"
          movies={movies}
          onMovieClick={handleMovieClick}
          onPlayClick={handlePlayClick}
        />
        <MovieRow
          title="Top Rating Film Hari Ini"
          movies={topRated.filter((m)=> m.type ==="film")}
          onMovieClick={handleMovieClick}
          onPlayClick={handlePlayClick}
        />
        <MovieRow
          title="Film Trending"
          movies={movies.slice().reverse()}
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

      {/* Modals - Modal untuk menampilkan detail film yang dipilih */}
      <MovieDetailModal
        isOpen={showDetailModal}
        onClose={() => setShowDetailModal(false)}
        movie={selectedMovie}
      />
    </div>
  );
};

export default Film;
