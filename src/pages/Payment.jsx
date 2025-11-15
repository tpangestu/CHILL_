import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Input from '../components/Input';
import Button from '../components/Button';

const Payment = () => {
  const location = useLocation();
  // Mengambil data paket dari state routing, dengan default paket Individual
  const plan = location.state?.plan || { name: 'Individual', price: 'Rp49.990' };

  // State untuk menampung waktu tersisa countdown pembayaran
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 14,
    seconds: 59,
  });
  const [paymentMethod, setPaymentMethod] = useState('bca');
  const [showTimer, setShowTimer] = useState(false);
  const [virtualAccount, setVirtualAccount] = useState('');

  // Fungsi untuk generate nomor Virtual Account saat pembayaran dimulai
  const generateVirtualAccount = () => {
    const randomNumber = Math.floor(Math.random() * 1000000000000).toString().padStart(12, '0');
    return `8001${randomNumber}`;
  };

  // Fungsi untuk mengekstrak angka dari string harga
  const getPriceNumber = (priceString) => {
    // Menghapus "Rp" dan karakter non-digit, kemudian konversi ke number
    return parseInt(priceString.replace(/[^\d]/g, ''));
  };

  // Menghitung total harga dengan biaya admin
  const planPrice = getPriceNumber(plan.price);
  const adminFee = 3000;
  const totalPrice = planPrice + adminFee;

  // Fungsi untuk format angka menjadi format Rupiah
  const formatRupiah = (number) => {
    return `Rp${number.toLocaleString('id-ID')}`;
  };

  // Effect untuk menjalankan countdown timer pembayaran
  useEffect(() => {
    if (!showTimer) return;

    // Set interval untuk update timer setiap 1 detik
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    // Cleanup interval saat component unmount
    return () => clearInterval(timer);
  }, [showTimer]);

  // Handler untuk memproses pembayaran
  const handlePayment = () => {
    setShowTimer(true);
    const vaNumber = generateVirtualAccount();
    setVirtualAccount(vaNumber);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-5xl mx-auto px-4 md:px-8 py-12">
        <h1 className="text-3xl font-bold mb-8">Ringkasan Pembayaran</h1>

        {/* Tampilkan countdown timer jika pembayaran sudah dimulai */}
        {showTimer && (
          <div className="bg-gray-900 rounded-lg p-6 mb-6 text-center">
            <p className="text-sm text-gray-400 mb-2">Lakukan Pembayaran Sebelum</p>
            <div className="text-4xl font-bold">
              {String(timeLeft.hours).padStart(2, '0')} :{' '}
              {String(timeLeft.minutes).padStart(2, '0')} :{' '}
              {String(timeLeft.seconds).padStart(2, '0')}
            </div>
            <div className="text-sm text-gray-400 mt-1">
              Jam : Menit : Detik
            </div>
          </div>
        )}

        <div className="grid md:grid-cols-3 gap-6">
          {/* Detail Pembayaran */}
          <div className="md:col-span-2 space-y-6">
            {/* Informasi Paket */}
            <div className="bg-blue-600 rounded-lg p-6">
              <h2 className="text-xl font-bold mb-4">{plan.name}</h2>
              <ul className="space-y-2 text-sm">
                {plan.features?.map((feature, index) => (
                  <li key={index}>✓ {feature}</li>
                )) || (
                  <>
                    <li>✓ Tidak ada iklan</li>
                    <li>✓ Kualitas 720p</li>
                    <li>✓ Download konten pilihan</li>
                  </>
                )}
              </ul>
            </div>

            {/* Metode Pembayaran */}
            <div className="bg-gray-900 rounded-lg p-6">
              <h3 className="font-bold mb-4">Metode Pembayaran</h3>

              <div className="space-y-3">
                <label className="flex items-center gap-3 p-3 bg-gray-800 rounded cursor-pointer hover:bg-gray-700">
                  <input
                    type="radio"
                    name="payment"
                    value="kartu"
                    checked={paymentMethod === 'kartu'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-4 h-4"
                  />
                  <div className="flex items-center gap-2">
                    <span>💳</span>
                    <span>Kartu Debit/Kredit</span>
                  </div>
                </label>

                <label className="flex items-center gap-3 p-3 bg-gray-800 rounded cursor-pointer hover:bg-gray-700">
                  <input
                    type="radio"
                    name="payment"
                    value="bca"
                    checked={paymentMethod === 'bca'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-4 h-4"
                  />
                  <div className="flex items-center gap-2">
                    <span>🏦</span>
                    <span>BCA Virtual Account</span>
                  </div>
                </label>
              </div>

              {/* Tampilkan detail pembayaran jika timer aktif dan metode BCA dipilih */}
              {showTimer && paymentMethod === 'bca' && (
                <div className="mt-6 p-4 bg-gray-800 rounded">
                  <h4 className="font-semibold mb-4">Transfer Pembayaran</h4>

                  {/* Nomor Virtual Account */}
                  <div className="mb-6 p-4 bg-gray-700 rounded-lg border-2 border-blue-500">
                    <p className="text-xs text-gray-400 mb-2">Nomor Virtual Account BCA</p>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold tracking-wider">{virtualAccount}</span>
                      <Button
                        variant="outline"
                        onClick={() => {
                          navigator.clipboard.writeText(virtualAccount);
                          alert('Nomor VA berhasil disalin!');
                        }}
                      >
                        Salin
                      </Button>
                    </div>
                  </div>

                  <p className="text-sm text-gray-400 mb-2">
                    Kode Voucher
                  </p>
                  <div className="flex items-center gap-2 mb-4">
                    <Input
                      value="VOUCHER-CIHUY"
                      className="flex-1"
                      readOnly
                    />
                    <Button variant="outline">Gunakan</Button>
                  </div>

                  <div className="border-t border-gray-700 pt-4">
                    <h4 className="font-semibold mb-2">Ringkasan Transaksi</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Paket Premium {plan.name}</span>
                        <span>{formatRupiah(planPrice)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Biaya Admin</span>
                        <span>{formatRupiah(adminFee)}</span>
                      </div>
                      <div className="flex justify-between font-bold text-lg border-t border-gray-700 pt-2">
                        <span>Total Pembayaran</span>
                        <span>{formatRupiah(totalPrice)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-gray-700 rounded">
                    <h4 className="font-semibold mb-2">Tata Cara Pembayaran</h4>
                    <ol className="list-decimal list-inside space-y-1 text-sm text-gray-300">
                      <li>Buka aplikasi BCA Mobile Banking atau melalui ATM</li>
                      <li>Pilih menu "Transfer" atau "Pembayaran"</li>
                      <li>Pilih opsi "Virtual Account"</li>
                      <li>Masukkan nomor Virtual Account yang tertera di atas</li>
                      <li>Pastikan jumlah pembayaran sesuai dengan total yang tertera</li>
                      <li>Ikuti instruksi untuk menyelesaikan transaksi</li>
                    </ol>
                  </div>
                </div>
              )}
            </div>

            {/* Tombol bayar hanya muncul jika timer belum aktif */}
            {!showTimer && (
              <Button
                variant="primary"
                className="w-full"
                onClick={handlePayment}
              >
                Bayar
              </Button>
            )}
          </div>

          {/* Ringkasan Transaksi Sidebar */}
          <div className="md:col-span-1">
            <div className="bg-gray-900 rounded-lg p-6 sticky top-20">
              <h3 className="font-bold mb-4">Ringkasan Transaksi</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Paket Berlangganan</span>
                  <span className="font-semibold">{plan.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Paket Premium {plan.name}</span>
                  <span>{formatRupiah(planPrice)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Biaya Admin</span>
                  <span>{formatRupiah(adminFee)}</span>
                </div>
                <div className="border-t border-gray-700 pt-3">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total Pembayaran</span>
                    <span>{formatRupiah(totalPrice)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
