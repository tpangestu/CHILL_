import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Edit2, User, Calendar } from 'lucide-react';
import Button from '../components/Button';
import MovieCard from '../components/MovieCard';
import MovieDetailModal from '../components/MovieDetailModal';
import { movies, series } from '../data/moviesData';

const Profile = () => {
  // Hook untuk navigasi halaman
  const navigate = useNavigate();

  // State untuk status berlangganan (true = berlangganan, false = belum berlangganan)
  const [isSubscribed, setIsSubscribed] = useState(false);
  // State untuk menyimpan data film yang dipilih
  const [selectedMovie, setSelectedMovie] = useState(null);
  // State untuk mengontrol tampilan modal detail film
  const [showDetailModal, setShowDetailModal] = useState(false);

  // Gabungkan movies dan series untuk daftar saya (6 film + 6 series)
  const myList = [...movies.slice(0, 6), ...series.slice(0, 6)];

  // Fungsi untuk menangani klik pada card film - membuka modal detail
  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
    setShowDetailModal(true);
  };

  // Fungsi untuk menangani tombol play - navigasi ke halaman watch
  const handlePlayClick = (movie) => {
    navigate('/watch', { state: { movie, isPremium: movie.isPremium } });
  };

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white pt-20">
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-8">
        {/* Toggle Demo Button - Tombol untuk mengubah status berlangganan (hanya untuk demo) */}
        <div className="text-center mt-2">
          <button
            onClick={() => setIsSubscribed(!isSubscribed)}
            className="text-xs text-gray-500 hover:text-gray-400 transition-colors"
          >
            (Toggle Ubah Status Berlangganan)
          </button>
        </div>
        <h1 className="text-3xl font-bold mb-8">Profil Saya</h1>

        <div className="grid md:grid-cols-[300px_1fr] gap-8">
          {/* Left Side - Profile - Bagian kiri berisi foto profil dan badge status member */}
          <div>
            <div className="bg-[#1a1a1a] rounded-lg p-6 text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center text-3xl font-bold">
                 <i class="ri-user-line"></i>
              </div>
              {isSubscribed ? (
                <div className="inline-flex items-center gap-2 bg-blue-600 px-4 py-2 rounded-full text-sm font-semibold mb-2">
                  <User className="w-4 h-4" />
                  Ubah Paket
                </div>
              ) : (
                <div className="inline-flex items-center gap-2 bg-gray-700 px-4 py-2 rounded-full text-sm mb-2">
                  <Calendar className="w-4 h-4" />
                  Masuk Sejak Juli 2024
                </div>
              )}
              <p className="text-sm text-gray-400 mt-2">
                {isSubscribed ? 'Member Premium' : 'Member'}
              </p>
            </div>
          </div>

          {/* Right Side - Subscription - Bagian kanan berisi status berlangganan dan form profil */}
          <div className="space-y-6">
            {/* Subscription Status Card */}
            {isSubscribed ? (
              <div className="bg-blue-900/30 border border-blue-600 rounded-lg p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="inline-block bg-blue-600 px-3 py-1 rounded text-xs font-semibold mb-2">
                      Aktif
                    </div>
                    <h3 className="text-xl font-bold mb-2">Akun Premium Individual ✓</h3>
                    <p className="text-sm text-blue-200">
                      Saat ini kamu sedang berlangganan akses akun premium
                    </p>
                    <p className="text-sm text-blue-200 mt-1">
                      Berlaku hingga 8 Juni 2025
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => navigate('/subscription')}
                  className="text-sm text-blue-300 hover:text-blue-200 underline"
                >
                  Kelola Paket Berlangganan
                </button>
              </div>
            ) : (
              <div className="bg-[#1a1a1a] rounded-lg p-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="text-3xl">⚠️</div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Saat ini anda belum berlangganan</h3>
                    <p className="text-sm text-gray-300 mb-1">
                      Dapatkan Akses tak terbatas ke Ribuan Film dan
                    </p>
                    <p className="text-sm text-gray-300">
                      Series Kesukaan Kamu!
                    </p>
                  </div>
                </div>
                <Button
                  variant="primary"
                  onClick={() => navigate('/subscription')}
                  className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-full"
                >
                  Mulai Berlangganan
                </Button>
              </div>
            )}

            {/* Profile Information Form */}
            <div className="bg-[#1a1a1a] rounded-lg p-6">
              <div className="space-y-4">
                {/* Nama Pengguna */}
                <div className="flex items-center justify-between pb-4">
                  <div className="flex-1">
                    <p className="text-sm text-gray-400 mb-1">Nama Pengguna</p>
                    <p className="font-medium">Tri Pangestu</p>
                  </div>
                  <button className="text-gray-400 hover:text-white transition-colors">
                    <Edit2 className="w-5 h-5" />
                  </button>
                </div>

                {/* Email */}
                <div className="flex items-center justify-between border-t border-gray-800 pt-4 pb-4">
                  <div className="flex-1">
                    <p className="text-sm text-gray-400 mb-1">Email</p>
                    <p className="font-medium">tpangestu28@gmail.com</p>
                  </div>
                </div>

                {/* Kata Sandi */}
                <div className="flex items-center justify-between border-t border-gray-800 pt-4">
                  <div className="flex-1">
                    <p className="text-sm text-gray-400 mb-1">Kata Sandi</p>
                    <p className="font-medium">••••••••••••</p>
                  </div>
                  <button className="text-gray-400 hover:text-white transition-colors">
                    <Edit2 className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="mt-6">
                <Button
                  variant="primary"
                  className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-md"
                >
                  Simpan
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Daftar Saya Section - Menampilkan daftar film dan series yang disimpan user */}
        <div className="my-12 ">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Daftar Saya</h2>
            <button
              onClick={() => navigate('/daftar-saya')}
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              Lihat Semua
            </button>
          </div>
          <div className="flex gap-4 overflow-x-auto overflow-y-hidden py-8 -my-8 " style={{ overflowX: 'visible' }}>
            <div className="w-6 flex-shrink-0"></div>
            {myList.map((movie) => (
              <div key={movie.id} className="flex-shrink-0 w-48">
                <MovieCard
                  {...movie}
                  onClick={() => handleMovieClick(movie)}
                  onPlayClick={() => handlePlayClick(movie)}
                />
              </div>
            ))}
            <div className="w-12 flex-shrink-0"></div>
          </div>
        </div>


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

export default Profile;
