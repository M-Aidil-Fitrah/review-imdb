# IMDB Review Sentiment Analyzer

Website untuk menganalisis sentimen review film IMDB menggunakan model LSTM dan RNN.

## Cara Menjalankan Aplikasi

### Opsi 1: Menggunakan Script Otomatis

**Untuk Windows CMD:**
```bash
start.bat
```

Script ini akan otomatis membuka 2 terminal:
- Terminal 1: Flask API Server (port 5000)
- Terminal 2: Next.js Web Server (port 3000)

### Opsi 2: Manual

**Terminal 1 - Jalankan Flask API:**
```bash
python api_server.py
```

**Terminal 2 - Jalankan Next.js:**
```bash
npm run dev
```

## Cara Menggunakan Website

1. Buka browser dan akses: `http://localhost:3000`
2. Masukkan review film dalam **Bahasa Inggris** di kolom textarea
3. Klik tombol **"Analyze Review"**
4. Tunggu beberapa detik
5. Hasil akan muncul menampilkan:
   - **LSTM Model**: Sentimen + Confidence score
   - **RNN Model**: Sentimen + Confidence score

## Contoh Review

### ✅ Positive Review:
```
This movie was absolutely amazing! The cinematography was stunning, the acting was superb, and the story kept me engaged from start to finish. I highly recommend it to everyone. One of the best films I've seen this year!
```

### ❌ Negative Review:
```
This was a complete waste of time. The plot made no sense, the acting was terrible, and I couldn't wait for it to end. I would not recommend this movie to anyone. Very disappointing experience.
```

## Troubleshooting

### ❌ Error: "Failed to analyze review..."
**Solusi:**
- Pastikan Flask API sudah berjalan di terminal 1
- Cek apakah ada error di terminal Flask
- Pastikan port 5000 tidak digunakan aplikasi lain

### ❌ Models tidak bisa diload
**Solusi:**
- Pastikan file `model_lstm.h5` dan `model_rnn.h5` ada di folder `public/models/`
- Install ulang Python dependencies: `pip install -r requirements.txt`

### ❌ Port sudah digunakan
**Solusi:**
- Matikan aplikasi yang menggunakan port 5000 atau 3000
- Atau ganti port di `api_server.py` (Flask) dan update di `app/page.tsx` (Next.js)

## Struktur Hasil

### Sentimen
- **Positive** 😊: Review bernada positif
- **Negative** 😞: Review bernada negatif

### Confidence
Tingkat keyakinan model (0-100%):
- **> 90%**: Sangat yakin
- **70-90%**: Cukup yakin
- **50-70%**: Kurang yakin
- **< 50%**: Tidak yakin (akan menjadi sentimen berlawanan)

### Raw Score
Nilai asli dari model (0.0 - 1.0):
- **> 0.5**: Positive
- **< 0.5**: Negative

## Tips

1. Review lebih panjang = hasil lebih akurat
2. Gunakan bahasa Inggris yang baik dan benar
3. Hindari typo dan grammar yang buruk
4. Maksimal 500 kata per review

## Tech Stack
- Frontend: Next.js + React + TailwindCSS
- Backend: Python Flask
- ML: TensorFlow/Keras (LSTM & RNN)
