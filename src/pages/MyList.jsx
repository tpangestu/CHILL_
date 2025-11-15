import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MovieCard from '../components/MovieCard';
import MovieDetailModal from '../components/MovieDetailModal';
import { movies, series } from '../data/moviesData';

const MyList = () => {
  const navigate = useNavigate();
  // State untuk menyimpan film yang dipilih
  const [selectedMovie, setSelectedMovie] = useState(null);
  // State untuk menampilkan/menyembunyikan modal detail
  const [showDetailModal, setShowDetailModal] = useState(false);

  // Daftar film favorit (gabungan movies dan series)
  const myList = [...movies.slice(0, 6), ...series.slice(0, 6)];

  // Handler untuk menampilkan detail film
  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
    setShowDetailModal(true);
  };

  // Handler untuk memutar film
  const handlePlayClick = (movie) => {
    navigate('/watch', { state: { movie, isPremium: movie.isPremium } });
  };

  return (
    <div className="min-h-screen bg-black text-white pt-10 md:pt-20 px-5 md:px-20">
      <div className="px-4 md:px-8 py-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-8">Daftar Saya</h1>

        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {myList.map((movie) => (
            <MovieCard
              key={movie.id}
              {...movie}
              onClick={() => handleMovieClick(movie)}
              onPlayClick={() => handlePlayClick(movie)}
            />
          ))}
        </div>
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

export default MyList;
