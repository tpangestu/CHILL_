import { useLocation, useNavigate } from 'react-router-dom';
import VideoPlayer from '../components/VideoPlayer';
import PremiumOverlay from '../components/PremiumOverlay';

const Watch = () => {
  // Mendapatkan lokasi saat ini dan data yang dikirim melalui routing
  const location = useLocation();
  // Hook untuk navigasi halaman
  const navigate = useNavigate();
  // Mengambil data film dari state routing
  const movie = location.state?.movie;
  // Memeriksa apakah film merupakan konten premium (default: false)
  const isPremium = location.state?.isPremium || false;

  // Fungsi untuk kembali ke halaman sebelumnya
  const handleBack = () => {
    navigate(-1); // Navigasi ke halaman sebelumnya
  };

  // Fungsi untuk menutup overlay premium dan kembali ke halaman sebelumnya
  const handleClosePremiumOverlay = () => {
    navigate(-1); // Kembali ke halaman sebelumnya saat overlay premium ditutup
  };

  // Jika data film tidak tersedia, tampilkan pesan error
  if (!movie) {
    return (
      <div className="bg-black min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-white text-xl mb-4">No movie data available</p>
          <button
            onClick={handleBack}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  // Render halaman pemutaran video
  return (
    <div className="relative">
      {/* Komponen pemutar video dengan props film dan fungsi kembali */}
      <VideoPlayer movie={movie} onBack={handleBack} />
      {/* Tampilkan overlay premium jika film berstatus premium */}
      {isPremium && <PremiumOverlay onClose={handleClosePremiumOverlay} />}
    </div>
  );
};

export default Watch;
