import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../components/Input";
import Button from "../components/Button";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  // Handler untuk perubahan input form
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handler untuk submit form registrasi
  const handleSubmit = (e) => {
    e.preventDefault();
    // Navigasi ke halaman login setelah registrasi
    navigate("/");
  };

  return (
    <div className="relative min-h-screen bg-black flex items-center justify-center p-4">
      {/* Background image layer */}
      <div className="fixed inset-0 z-0">
        {/* Gambar background untuk halaman registrasi */}
        <img
          src="/assets/bg-daftar.jpg"
          alt=""
          className="w-full h-full object-cover"
        />
      </div>

      <div className="relative z-10 w-full max-w-md">
        <div className="bg-gray-900/85 backdrop-blur-sm rounded-lg p-8 shadow-2xl">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4 gap-2">
            <img src="/logo-white.svg" alt="Chill logo" className="h-5 md:h-8 lg:h-10" />
            <h1 className="text-white text-3xl font-bold mb-2">CHILL</h1>

            </div>
            <p className="text-gray-100">Daftar</p>
            <p className="text-gray-500 text-sm">Selamat Datang!</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Username"
              name="name"
              placeholder="Masukkan username"
              value={formData.name}
              onChange={handleChange}
            />

            <Input
              label="Email"
              name="email"
              type="email"
              placeholder="Masukkan email"
              value={formData.email}
              onChange={handleChange}
            />

            <Input
              label="Kata Sandi"
              name="password"
              type="password"
              placeholder="Masukkan kata sandi"
              value={formData.password}
              onChange={handleChange}
            />

            <Input
              label="Konfirmasi Kata Sandi"
              name="confirmPassword"
              type="password"
              placeholder="Masukkan kata sandi"
            />

            <div className="text-xs text-gray-400">
              Sudah punya akun?{" "}
              <button
                type="button"
                onClick={() => navigate("/")}
                className="text-blue-500 hover:underline cursor-pointer"
              >
                Masuk
              </button>
            </div>

            <Button
              type="submit"
              variant="primary"
              className="w-full cursor-pointer"
            >
              Daftar
            </Button>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-700"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-gray-900 text-gray-400">
                  Atau daftar dengan Google
                </span>
              </div>
            </div>

            <button
              type="button"
              className="w-full cursor-pointer px-4 py-2 bg-white text-black rounded hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
            >
              <span>Google</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
