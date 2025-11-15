/**
 * Component modal reusable dengan berbagai ukuran
 * @param {boolean} isOpen - Status modal terbuka/tertutup
 * @param {Function} onClose - Handler untuk menutup modal
 * @param {ReactNode} children - Konten di dalam modal
 * @param {string} size - Ukuran modal (sm, md, lg, xl)
 */
const Modal = ({ isOpen, onClose, children, size = 'md' }) => {
  // Jangan render apapun jika modal tertutup
  if (!isOpen) return null;

  const sizes = {
    sm: 'max-w-md',
    md: 'max-w-2xl',
    lg: 'max-w-4xl',
    xl: 'max-w-6xl',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 transition-all duration-300">
      {/* Container modal dengan ukuran dinamis */}
      <div className={`bg-gray-900 rounded-lg w-full ${sizes[size]} max-h-[90vh] overflow-y-auto relative shadow-2xl`}>
        {/* Tombol close di pojok kanan atas */}
        <button
          onClick={onClose}
          className="absolute 1 rounded-full cursor-pointer top-4 right-4 text-white text-2xl hover:text-gray-300 z-10"
        >
          <i class="ri-close-circle-fill"></i>
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
