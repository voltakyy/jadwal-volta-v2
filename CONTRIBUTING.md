# Panduan kontribusi

Proyek ini adalah situs statis tanpa build step. Semua kode berada di `index.html`.

## Alur kerja

1. Ubah `index.html` langsung.
2. Buka file tersebut di browser (atau jalankan server statis) untuk mengecek tampilan.
3. Uji minimal pada lebar 360 px dan 1440 px.
4. Commit dengan pesan bergaya Conventional Commits: `feat:`, `fix:`, `docs:`, `chore:`.

## Sebelum push

- Tidak ada horizontal scroll di mobile.
- Mode UTS masih aktif hanya pada 1–13 November 2026.
- Tombol ekspor ICS menghasilkan berkas yang valid.
- Tidak mengubah repositori v1 `jadwal-volta`.