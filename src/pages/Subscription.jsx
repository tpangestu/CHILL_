import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';

const Subscription = () => {
  const navigate = useNavigate();

  const features = [
    { icon: '📱', title: 'Download Konten Pilihan' },
    { icon: '🎬', title: 'Tidak Ada Iklan' },
    { icon: '🎭', title: 'Tonton Semua Konten' },
    { icon: '⚙️', title: 'Kualitas Maksimal Sampai Dengan 4K' },
    { icon: '📺', title: 'Nonton di TV, Tablet, Mobile, dan Laptop' },
    { icon: '💬', title: 'Subtitle Untuk Konten Pilihan' },
  ];

  const plans = [
    {
      name: 'Individual',
      price: 'Rp49.990',
      duration: '/bulan',
      features: [
        'Akses di 1 Device',
        'Kualitas 720p',
        'Konten Pilihan',
        'Download konten pilihan',
      ],
      popular: false,
    },
    {
      name: 'Pro',
      price: 'Rp79.990',
      duration: '/bulan',
      features: [
        'Akses di 2 Device',
        'Kualitas 1080p',
        'Konten Pilihan',
        'Download konten pilihan',
      ],
      popular: true,
    },
    {
      name: 'Family',
      price: 'Rp159.990',
      duration: '/bulan',
      features: [
        'Akses di 7 Device',
        'Kualitas 4K',
        'Konten Pilihan',
        'Download konten pilihan',
      ],
      popular: false,
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-12">
        {/* Seksi Fitur Berlangganan */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Kenapa Harus Berlangganan?
          </h1>
          <p className="text-gray-400 mb-8">
            Tentukan paket pilihan untuk kebutuhanmu!
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-12">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl mb-2">{feature.icon}</div>
                <p className="text-sm">{feature.title}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Seksi Paket Berlangganan */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-center mb-8">Pilih Paketmu</h2>
          <p className="text-center text-gray-400 mb-8">
            Temukan paket paling sesuai kebutuhanmu!
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {plans.map((plan, index) => (
              <div
                key={index}
                className={`rounded-lg p-6 ${
                  plan.popular
                    ? 'bg-blue-600 border-2 border-blue-400'
                    : 'bg-gray-900'
                }`}
              >
                {/* Badge untuk paket paling populer */}
                {plan.popular && (
                  <div className="text-center mb-2">
                    <span className="bg-yellow-500 text-black text-xs px-3 py-1 rounded-full font-bold">
                      Paling Populer
                    </span>
                  </div>
                )}

                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <div className="text-3xl font-bold mb-1">
                    {plan.price}
                    <span className="text-base font-normal text-gray-300">
                      {plan.duration}
                    </span>
                  </div>
                </div>

                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="text-green-400">✓</span>
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  variant={plan.popular ? 'primary' : 'outline'}
                  className="w-full"
                  onClick={() => navigate('/payment', { state: { plan } })}
                >
                  Langganan
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Subscription;
