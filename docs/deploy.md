# Deploy

Situs di-deploy ke GitHub Pages melalui GitHub Actions.

- Workflow: `.github/workflows/pages.yml`
- Branch: `main`
- URL: https://voltakyy.github.io/jadwal-volta-v2/

## Verifikasi setelah deploy

1. Buka URL dengan parameter versi, misalnya `?v=<commit-sha>`, untuk melewati cache.
2. Pastikan font Archivo dan Instrument Sans termuat.
3. Cek mode UTS pada tanggal 1–13 November.
4. Cek tidak ada overflow horizontal di 360 px dan 1440 px.

## Rollback

Kembalikan commit terakhir yang sehat, lalu push ke `main`. Actions akan men-deploy ulang secara otomatis.