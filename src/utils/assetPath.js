/**
 * Helper function untuk mendapatkan path asset yang benar
 * di development dan production (GitHub Pages)
 */
export const getAssetPath = (path) => {
  // Pastikan path dimulai dengan /
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;

  // Di production (GitHub Pages), tambahkan base path
  // import.meta.env.BASE_URL sudah diset dari vite.config.js
  return `${import.meta.env.BASE_URL}${normalizedPath}`.replace(/\/\//g, '/');
};
