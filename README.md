# README: Ramadan Countdown & Prayer Time Website

## Deskripsi
Website ini dibuat untuk menyambut bulan Ramadan dengan fitur-fitur interaktif seperti:
1. Menu navigasi responsif dengan toggle.
2. Timer hitung mundur menuju akhir Ramadan.
3. Animasi elemen saat scroll.
4. Counter statistik dinamis.
5. Jadwal waktu sholat harian.
6. Inspirasi harian untuk motivasi selama Ramadan.

---

## Fitur Utama
### 1. Menu Navigasi Mobile
- Tombol hamburger untuk membuka menu pada tampilan mobile.
- Overlay untuk menutup menu saat area luar diklik.
- Disable scroll saat menu aktif.

### 2. Timer Hitung Mundur Ramadan
- Hitung mundur menuju tanggal 30 Maret 2025 pukul 23:59.
- Menampilkan hari, jam, menit, dan detik secara real-time.
- Mengganti pesan menjadi "Selamat Hari Raya Idul Fitri!" saat timer habis.

### 3. Animasi Scroll
- Elemen-elemen dengan kelas seperti `slide-in-left`, `slide-in-right`, `fade-in`, dan `zoom-in` akan muncul saat masuk viewport.

### 4. Counter Statistik
- Menampilkan jumlah pengguna, grup, dan proyek dengan animasi perhitungan.
- Angka bertambah secara bertahap saat elemen terlihat di layar.

### 5. Jadwal Waktu Sholat
- Waktu sholat harian untuk wilayah Jakarta (dengan contoh data statis).
- Menampilkan waktu sholat berikutnya dan hitungan mundur.
- Fitur otomatis memperbarui waktu sholat setiap hari.

### 6. Inspirasi Harian
- Kutipan motivasi Islami yang ditampilkan secara acak setiap hari.
- Dapat diperbarui dengan menambahkan kutipan baru di array `inspirations`.

---

## Struktur Folder
```
|-- ai.jpg                 (JPG File)
|-- background.jpg         (JPG File)
|-- index.html             (HTML Source File)
|-- logo.jpg               (JPG File)
|-- README.md              (Markdown Source File)
|-- script.js              (JavaScript Source File)
|-- style.css              (CSS Source File)
|-- styling.css            (CSS Source File)
```

---

## Cara Penggunaan
1. Tambahkan elemen HTML dengan id berikut:
   - `days`, `hours`, `minutes`, `seconds` untuk countdown.
   - `users-count`, `groups-count`, `projects-count` untuk statistik.
2. Tambahkan kelas animasi pada elemen yang ingin dianimasikan (`slide-in-left`, `slide-in-right`, `fade-in`, `zoom-in`).
3. Letakkan elemen dengan kelas `.hero-container` untuk tempat menampilkan waktu sholat.
4. Panggil fungsi `getPrayerTimes()` saat halaman dimuat untuk menampilkan jadwal sholat.
5. Inspirasi harian otomatis diacak setiap reload halaman.

---

## Teknologi yang Digunakan
- HTML
- CSS
- JavaScript (ES6)

---

## Instruksi Tambahan
- Untuk mendapatkan jadwal sholat secara dinamis, bisa diintegrasikan dengan API waktu sholat seperti [Aladhan API](https://aladhan.com/).
- Tambahkan gaya dan ikon sesuai kebutuhan agar lebih menarik.
