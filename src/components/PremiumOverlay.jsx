import { Star, Download, Zap, Check, Tv, Subtitles, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

/**
 * Component overlay yang muncul ketika user mencoba akses konten premium
 * Menampilkan benefit premium dan tombol untuk upgrade
 * @param {Function} onClose - Handler untuk menutup overlay
 */
const PremiumOverlay = ({ onClose }) => {
  const navigate = useNavigate();

  /**
   * Handler untuk navigasi ke halaman subscription
   */
  const handlePremiumClick = () => {
    navigate('/subscription');
  };
  return (
    <div className="absolute inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center">
      {/* Tombol close di pojok kanan atas */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 w-10 h-10 bg-black/60 hover:bg-black/80 backdrop-blur-sm border border-gray-600 rounded-full flex items-center justify-center text-white transition-all hover:scale-110 z-10"
        aria-label="Close"
      >
        <X className="w-6 h-6" />
      </button>

      <div className="max-w-xl w-full mx-4 text-white text-center">
        {/* Icon bintang premium */}
        <div className="flex justify-center mb-4">
          <div className="bg-yellow-500 text-black p-4 rounded-full">
            <Star className="w-8 h-8 fill-current" />
          </div>
        </div>

        {/* Title */}
        <h2 className="text-2xl md:text-3xl font-bold mb-2">
          Layanan Premium⭐
        </h2>
        <p className="text-gray-300 mb-5 text-sm md:text-base">
          Tingkatkan paket anda untuk dapat menonton video ini.
        </p>

        {/* Daftar benefit premium dalam grid 2 kolom */}
        <div className="bg-gray-900/80 backdrop-blur-sm rounded-xl p-4 md:p-5 mb-5">
          <h3 className="text-lg md:text-xl font-bold mb-4">Kenapa Harus Berlangganan?</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-left">
            <div className="flex items-start gap-2">
              <div className="bg-blue-600 p-1.5 rounded-lg flex-shrink-0">
                <Download className="w-4 h-4" />
              </div>
              <div>
                <p className="font-semibold text-sm md:text-base">Download Konten Pilihan</p>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <div className="bg-blue-600 p-1.5 rounded-lg flex-shrink-0">
                <Zap className="w-4 h-4" />
              </div>
              <div>
                <p className="font-semibold text-sm md:text-base">Tidak Ada Iklan</p>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <div className="bg-blue-600 p-1.5 rounded-lg flex-shrink-0">
                <Check className="w-4 h-4" />
              </div>
              <div>
                <p className="font-semibold text-sm md:text-base">Tonton Semua Konten</p>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <div className="bg-blue-600 p-1.5 rounded-lg flex-shrink-0">
                <span className="text-sm font-bold">4K</span>
              </div>
              <div>
                <p className="font-semibold text-sm md:text-base">
                  Kualitas Maksimal Sampai Dengan 4K
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <div className="bg-blue-600 p-1.5 rounded-lg flex-shrink-0">
                <Tv className="w-4 h-4" />
              </div>
              <div>
                <p className="font-semibold text-sm md:text-base">
                  Tonton di TV, Tablet, Mobile, dan Laptop
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <div className="bg-blue-600 p-1.5 rounded-lg flex-shrink-0">
                <Subtitles className="w-4 h-4" />
              </div>
              <div>
                <p className="font-semibold text-sm md:text-base">Subtitle Untuk Konten Pilihan</p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={handlePremiumClick}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-bold text-base md:text-lg transition-all hover:scale-105 shadow-xl w-full md:w-auto"
        >
          Ubah Jadi Premium
        </button>
      </div>
    </div>
  );
};

export default PremiumOverlay;
