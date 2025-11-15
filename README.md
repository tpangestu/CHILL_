# CHILL - Netflix Clone

Sebuah aplikasi web statis clone Netflix yang dibuat dengan React.js dan Tailwind CSS v4 sebagai tugas pembelajaran.

## Teknologi yang Digunakan

- React 19.1.0
- Vite 6.3.5
- Tailwind CSS 4.1.16
- React Router DOM 7.1.1

## Fitur

### Halaman yang Tersedia

1. **Login/Register**
   - Form login dengan validasi sederhana
   - Username: `admin`
   - Password: `admin`
   - Form registrasi
   - Login dengan Google (UI only)

2. **Beranda**
   - Hero section dengan informasi film unggulan
   - Beberapa kategori film (Continue Watching, Top Rated, Trending, dll)
   - Hover effects pada movie cards
   - Modal detail film/series
   - Modal premium untuk konten berbayar

3. **Series**
   - Halaman khusus untuk series
   - Hero section dengan series unggulan
   - Kategori series yang berbeda

4. **Film**
   - Halaman khusus untuk film
   - Hero section dengan film unggulan
   - Kategori film yang berbeda

5. **Daftar Saya**
   - Grid layout untuk film/series favorit
   - Movie cards dengan hover effects

6. **Profil**
   - Informasi pengguna
   - Status berlangganan (dengan toggle demo)
   - Edit profil (UI only)
   - Daftar film favorit

7. **Subscription**
   - Pilihan paket berlangganan (Individual, Berdua, Keluarga)
   - Fitur-fitur setiap paket
   - Navigasi ke halaman pembayaran

8. **Payment**
   - Ringkasan pembayaran
   - Pilihan metode pembayaran
   - Countdown timer pembayaran
   - Detail transaksi

9. **Watch**
   - Video player dengan controls
   - Menu subtitle
   - Menu episode
   - Menu kecepatan playback

## Komponen Reusable

- `Button` - Tombol dengan berbagai variant
- `Input` - Input field dengan label
- `MovieCard` - Kartu film dengan hover effects
- `MovieRow` - Baris horizontal untuk menampilkan film
- `Navbar` - Navigation bar dengan dropdown profile
- `Footer` - Footer dengan link-link
- `Modal` - Modal container yang reusable
- `MovieDetailModal` - Modal untuk detail film/series
- `PremiumModal` - Modal untuk konten premium
- `VideoPlayer` - Player video dengan controls

## Struktur Folder

```
src/
├── components/          # Reusable components
│   ├── Button.jsx
│   ├── Input.jsx
│   ├── MovieCard.jsx
│   ├── MovieRow.jsx
│   ├── Navbar.jsx
│   ├── Footer.jsx
│   ├── Modal.jsx
│   ├── MovieDetailModal.jsx
│   ├── PremiumModal.jsx
│   └── VideoPlayer.jsx
├── pages/              # Page components
│   ├── Login.jsx
│   ├── Register.jsx
│   ├── Home.jsx
│   ├── Series.jsx
│   ├── Film.jsx
│   ├── MyList.jsx
│   ├── Profile.jsx
│   ├── Subscription.jsx
│   ├── Payment.jsx
│   └── Watch.jsx
├── layouts/            # Layout components
│   └── MainLayout.jsx
├── data/              # Data dummy
│   └── moviesData.js
├── App.jsx            # Main app with routing
└── main.jsx           # Entry point
```

## Instalasi dan Menjalankan

1. Install dependencies:
```bash
npm install
```

2. Jalankan development server:
```bash
npm run dev
```

3. Buka browser dan akses:
```
http://localhost:5173
```

## Catatan Penting

- Ini adalah aplikasi statis untuk pembelajaran, tidak semua fitur berfungsi penuh
- Data film/series menggunakan data dummy
- Gambar/poster menggunakan placeholder
- Icon menggunakan emoji sebagai pengganti
- Login hanya validasi sederhana (username: admin, password: admin)
- Tidak menggunakan database atau backend

## Prinsip yang Diterapkan

1. **Component-Based Architecture** - Semua UI dipecah menjadi komponen-komponen kecil dan reusable
2. **Props Drilling** - Data dikirim dari parent ke child component menggunakan props
3. **React Router** - Navbar sebagai RouterLayout menggunakan Outlet
4. **Responsive Design** - Menggunakan Tailwind CSS untuk responsive layout
5. **State Management** - Menggunakan useState untuk state lokal komponen

## Lisensi

Proyek ini dibuat untuk keperluan pembelajaran.
