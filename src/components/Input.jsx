import { useState } from 'react';

/**
 * @param {string} label - Label untuk input field
 * @param {string} type - Tipe input (text, password, email, dll)
 * @param {string} placeholder - Placeholder text
 * @param {string} value - Nilai input
 * @param {Function} onChange - Handler ketika nilai berubah
 * @param {string} name - Nama input untuk form
 */
const Input = ({ label, type = 'text', placeholder, value, onChange, name }) => {
  // State untuk toggle show/hide password
  const [showPassword, setShowPassword] = useState(false);

  // Cek apakah ini field password
  const isPasswordField = type === 'password';

  // Tentukan tipe input berdasarkan toggle show password
  const inputType = isPasswordField && showPassword ? 'text' : type;

  return (
    <div className="flex flex-col gap-2">
      {/* Label input jika ada */}
      {label && <label className="text-sm text-gray-300">{label}</label>}
      <div className="relative">
        <input
          type={inputType}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
        />
        {/* Tombol toggle show/hide password - hanya muncul untuk field password */}
        {isPasswordField && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300 transition-colors"
            aria-label={showPassword ? 'Sembunyikan kata sandi' : 'Tampilkan kata sandi'}
          >
            {showPassword ? (
             <i class="ri-eye-off-line"></i>
            ) : (
              <i class="ri-eye-line"></i>
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default Input;
