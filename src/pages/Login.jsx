import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../components/Input";
import Button from "../components/Button";
import { getAssetPath } from "../utils/assetPath";

const Login = () => {
  const navigate = useNavigate();
  // State untuk menyimpan data form login
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  // Handler untuk perubahan input form
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handler untuk submit form login
  const handleSubmit = (e) => {
    e.preventDefault();
    // Validasi sederhana - username: admin, password: admin
    if (formData.username === "admin" && formData.password === "admin") {
      navigate("/home");
    } else {
      alert("Username atau password salah!");
    }
  };

  return (
    <div className="relative min-h-screen bg-black flex items-center justify-center p-4">
      {/* Background image layer */}
      <div className="fixed inset-0 z-0">
        {/* Gambar background kursi teater */}
        <img
          src={getAssetPath("/assets/bg-login.jpg")}
          alt=""
          className="w-full h-full object-cover"
        />
      </div>

      <div className="relative z-10 w-full max-w-md ">
        <div className="bg-gray-900/85 backdrop-blur-sm rounded-lg p-8 shadow-2xl">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4 gap-2">
              <img src={getAssetPath("/logo-white.svg")} alt="Chill logo" className="h-5 md:h-8 lg:h-10" />
              <h1 className="text-white text-3xl font-bold mb-2">CHILL</h1>
            </div>
            <p className="text-gray-100">Masuk</p>
            <p className="text-gray-500 text-sm">Selamat Datang Kembali!</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Username"
              name="username"
              placeholder="Masukkan username"
              value={formData.username}
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

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center text-gray-400">
                <input type="checkbox" className="mr-2" />
                Ingat saya
              </label>
              <a href="#" className="text-blue-500 hover:underline">
                Lupa kata sandi?
              </a>
            </div>

            <Button
              type="submit"
              variant="primary"
              className="w-full cursor-pointer "
            >
              Masuk
            </Button>

            <div className="text-center text-gray-400 text-sm">
              Belum punya akun?{" "}
              <button
                type="button"
                onClick={() => navigate("/register")}
                className="text-blue-500 hover:underline cursor-pointer"
              >
                Daftar
              </button>
            </div>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-700"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-gray-900 text-gray-400">Atau</span>
              </div>
            </div>

            <div className="space-y-2">
              <button
                type="button"
                className="w-full cursor-pointer px-4 py-2 bg-white text-black rounded hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
              >
                <span>Google</span>
              </button>
            </div>
          </form>

          <p className="text-center text-gray-500 text-xs mt-6">
            Hint: username: admin | password: admin
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
