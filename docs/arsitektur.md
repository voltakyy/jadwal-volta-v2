# Arsitektur

Situs ini sengaja dibuat sebagai satu berkas `index.html` tanpa framework dan tanpa build step.

## Lapisan

- **Markup** â€” kerangka halaman dan seluruh section (agenda, jadwal, materi, silabus, kursus, tools, peta studi, konsentrasi, roadmap).
- **CSS** â€” berada di dalam elemen `<style>`, memakai variabel warna dan spasi di `:root`.
- **JavaScript** â€” berada di dalam `<script>` di akhir dokumen; menangani render jadwal, mode UTS, navigasi tab, pencarian, dan ekspor ICS.

## Data

Data jadwal, materi, dan silabus ditulis sebagai objek JavaScript di dalam berkas yang sama. Tidak ada API atau basis data, sehingga situs bisa di-host di GitHub Pages tanpa server.

## Mode UTS

Mode UTS dihitung dari tanggal perangkat. Periode aktif: 1â€“13 November 2026. Di luar periode tersebut jadwal reguler kembali normal secara otomatis.