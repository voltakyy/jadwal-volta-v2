# Jadwal Volta v2

Dashboard jadwal kuliah pribadi Muhammad Rizky Prasetya (NIM L200260089), Semester Gasal 2026/2027. Versi 2 menambahkan agenda UTS dan agenda rutin Mentoring AIK di atas jadwal kuliah mingguan.

## Fitur v2

- **Agenda & Ujian** — 7 sesi UTS Gasal 2026/2027 lengkap dengan tanggal, jam, ruang, nomor kursi, dan dosen.
- **Hitung mundur** — badge H-x / Besok / Hari ini / Berlangsung / Selesai untuk setiap ujian.
- **Mentoring AIK** — agenda rutin setiap Sabtu, 06.30–08.30 WIB, di Masjid Hj. Sudalmiyah Rais.
- **Tab Sabtu** — jadwal mingguan sekarang mencakup Sabtu untuk agenda mentoring.
- **Export .ics** — jadwal kuliah, UTS, dan mentoring bisa diimpor ke Google Calendar / Apple Calendar / Outlook.
- **Ringkasan hari ini** — otomatis menampilkan UTS atau mentoring saat hari itu ada agenda.

## Sumber data

- UTS: Kartu Ujian Tengah Semester Gasal 2026/2027, NIM L200260089.
- Mentoring: jadwal LPPIK UMS — setiap Sabtu, 06.30–08.30 WIB, Masjid Hj. Sudalmiyah Rais (Kampus 2).

## Menjalankan

File tunggal, tanpa build step:

```powershell
# buka langsung
start index.html

# atau lewat server lokal
python -m http.server 8080
```

Lalu buka `http://localhost:8080`.

## Struktur

```
index.html                 # seluruh aplikasi: HTML, CSS, JavaScript, data
scripts/heartbeat.mjs      # pengecekan uptime harian
status/heartbeat.json      # riwayat 30 pengecekan terakhir
status/README.md           # ringkasan status yang dibuat otomatis
README.md
```

## Deploy

Repo ini statis dan otomatis dideploy ke **GitHub Pages** lewat GitHub Actions (`.github/workflows/pages.yml`) setiap kali push ke `main`.

**Live:** https://voltakyy.github.io/jadwal-volta-v2/

## Status deploy

Workflow `.github/workflows/heartbeat.yml` mengecek situs live setiap hari pukul 19.17 WIB, lalu mencatat status HTTP, waktu respons, dan judul halaman ke [`status/heartbeat.json`](status/heartbeat.json). Ringkasannya ada di [`status/README.md`](status/README.md). Hasil pengecekan di-commit otomatis setiap hari.
