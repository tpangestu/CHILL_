/**
 * Component button reusable dengan berbagai varian
 * @param {ReactNode} children - Konten di dalam button
 * @param {string} variant - Varian style button (primary, secondary, outline, danger)
 * @param {string} className - Class CSS tambahan
 * @param {Function} onClick - Handler ketika button diklik
 * @param {string} type - Tipe button (button, submit, reset)
 */
const Button = ({ children, variant = 'primary', className = '', onClick, type = 'button' }) => {
  // Style dasar yang berlaku untuk semua button
  const baseStyles = 'px-6 py-2 rounded font-medium transition-all duration-200';

  // Varian-varian style button yang tersedia
  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 border-2',
    secondary: 'bg-gray-600 text-white hover:bg-gray-700',
    outline: 'border-2 border-white text-white hover:bg-white hover:text-black',
    danger: 'bg-red-600 text-white hover:bg-red-700',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
