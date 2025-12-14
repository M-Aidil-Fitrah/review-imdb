'use client';

import { useState } from 'react';
import { Film, Sparkles, Brain, Cpu, ArrowRight, AlertCircle } from 'lucide-react';

interface PredictionResult {
  lstm: {
    sentiment: string;
    confidence: number;
    score: number;
  };
  rnn: {
    sentiment: string;
    confidence: number;
    score: number;
  };
}

export default function Home() {
  const [review, setReview] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResult(null);

    try {
      const response = await fetch('http://localhost:5000/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ review }),
      });

      if (!response.ok) {
        throw new Error('Failed to get prediction');
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError('Failed to connect to API server. Please make sure Flask is running: python api_server.py');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center border-b border-neutral-200 dark:border-neutral-800">
        <div className="container mx-auto px-6 py-20 max-w-6xl">
          <div className="flex flex-col items-center text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-full">
              <Sparkles className="w-4 h-4 text-neutral-600 dark:text-neutral-400" />
              <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                Analisis Sentimen Bertenaga AI
              </span>
            </div>

            <h1 className="text-6xl font-semibold text-neutral-900 dark:text-neutral-50 max-w-3xl leading-tight">
              Analisis Review Film Secara Instan
            </h1>

            <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl">
              Gunakan jaringan neural LSTM dan RNN yang canggih untuk menentukan apakah sebuah review film bersifat positif atau negatif. Cepat, akurat, dan didukung oleh TensorFlow.
            </p>

            <div className="flex items-center gap-2 text-sm text-neutral-500 dark:text-neutral-500">
              <Film className="w-4 h-4" />
              <span>English reviews only</span>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-6 mt-16">
            <div className="p-6 bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800 rounded-xl">
              <div className="w-10 h-10 bg-neutral-900 dark:bg-neutral-100 rounded-lg flex items-center justify-center mb-4">
                <Brain className="w-5 h-5 text-white dark:text-neutral-900" />
              </div>
              <h3 className="text-lg font-medium text-neutral-900 dark:text-neutral-100 mb-2">
                Model LSTM
              </h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                Jaringan Long Short-Term Memory untuk memahami konteks dan dependensi jangka panjang
              </p>
            </div>

            <div className="p-6 bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800 rounded-xl">
              <div className="w-10 h-10 bg-neutral-900 dark:bg-neutral-100 rounded-lg flex items-center justify-center mb-4">
                <Cpu className="w-5 h-5 text-white dark:text-neutral-900" />
              </div>
              <h3 className="text-lg font-medium text-neutral-900 dark:text-neutral-100 mb-2">
                Model RNN
              </h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                Recurrent Neural Network untuk pengenalan pola sekuensial dan inferensi cepat
              </p>
            </div>

            <div className="p-6 bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800 rounded-xl">
              <div className="w-10 h-10 bg-neutral-900 dark:bg-neutral-100 rounded-lg flex items-center justify-center mb-4">
                <Sparkles className="w-5 h-5 text-white dark:text-neutral-900" />
              </div>
              <h3 className="text-lg font-medium text-neutral-900 dark:text-neutral-100 mb-2">
                Analisis Ganda
              </h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                Bandingkan hasil dari kedua model untuk akurasi lebih tinggi dan validasi kepercayaan
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Dataset Section */}
      <section className="bg-neutral-50 dark:bg-neutral-900/30 border-b border-neutral-200 dark:border-neutral-800">
        <div className="container mx-auto px-6 py-20 max-w-6xl">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-semibold text-neutral-900 dark:text-neutral-50 mb-4">
                Tentang Dataset
              </h2>
              <p className="text-lg text-neutral-600 dark:text-neutral-400">
                Dataset IMDB yang digunakan untuk melatih model analisis sentimen
              </p>
            </div>

            <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-8 space-y-8">
              <div>
                <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed mb-6">
                  Dataset IMDB ini berisi <span className="font-semibold text-neutral-900 dark:text-neutral-100">50.000 review film</span> yang dirancang khusus untuk pemrosesan bahasa alami dan analisis teks. Dataset ini merupakan salah satu benchmark dataset terbesar untuk klasifikasi sentimen biner.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800 rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-neutral-900 dark:bg-neutral-100 rounded-lg flex items-center justify-center">
                      <span className="text-2xl font-bold text-white dark:text-neutral-900">25K</span>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-neutral-900 dark:text-neutral-100">Data Training</h3>
                      <p className="text-xs text-neutral-600 dark:text-neutral-400">Review untuk pelatihan</p>
                    </div>
                  </div>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    25.000 review film dengan polaritas tinggi yang digunakan untuk melatih model LSTM dan RNN.
                  </p>
                </div>

                <div className="bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800 rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-neutral-900 dark:bg-neutral-100 rounded-lg flex items-center justify-center">
                      <span className="text-2xl font-bold text-white dark:text-neutral-900">25K</span>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-neutral-900 dark:text-neutral-100">Data Testing</h3>
                      <p className="text-xs text-neutral-600 dark:text-neutral-400">Review untuk evaluasi</p>
                    </div>
                  </div>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    25.000 review film yang digunakan untuk menguji dan memvalidasi akurasi model.
                  </p>
                </div>
              </div>

              <div className="border-t border-neutral-200 dark:border-neutral-800 pt-6">
                <h3 className="text-lg font-medium text-neutral-900 dark:text-neutral-100 mb-4">
                  Karakteristik Dataset
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-neutral-900 dark:bg-neutral-100 rounded-full mt-2 flex-shrink-0" />
                    <p className="text-sm text-neutral-700 dark:text-neutral-300">
                      <span className="font-medium">Klasifikasi Biner:</span> Setiap review diklasifikasikan sebagai sentimen positif atau negatif
                    </p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-neutral-900 dark:bg-neutral-100 rounded-full mt-2 flex-shrink-0" />
                    <p className="text-sm text-neutral-700 dark:text-neutral-300">
                      <span className="font-medium">Polaritas Tinggi:</span> Review dipilih dengan sentimen yang jelas dan kuat, memudahkan model untuk belajar
                    </p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-neutral-900 dark:bg-neutral-100 rounded-full mt-2 flex-shrink-0" />
                    <p className="text-sm text-neutral-700 dark:text-neutral-300">
                      <span className="font-medium">Bahasa Inggris:</span> Seluruh dataset dalam bahasa Inggris, diambil dari database IMDB
                    </p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-neutral-900 dark:bg-neutral-100 rounded-full mt-2 flex-shrink-0" />
                    <p className="text-sm text-neutral-700 dark:text-neutral-300">
                      <span className="font-medium">Distribusi Seimbang:</span> Jumlah review positif dan negatif seimbang untuk mencegah bias
                    </p>
                  </li>
                </ul>
              </div>

              <div className="bg-neutral-100 dark:bg-neutral-950/50 border border-neutral-200 dark:border-neutral-800 rounded-xl p-6">
                <h3 className="text-sm font-medium text-neutral-900 dark:text-neutral-100 mb-3">
                  Tujuan Penggunaan
                </h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  Dataset ini digunakan untuk memprediksi jumlah review positif dan negatif menggunakan algoritma klasifikasi dan deep learning. Model kami dilatih untuk mengidentifikasi pola linguistik yang mengindikasikan sentimen positif atau negatif dalam teks review.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Analysis Section */}
      <main className="container mx-auto px-6 py-16 max-w-4xl">
        <div className="space-y-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-semibold text-neutral-900 dark:text-neutral-50 mb-4">
              Coba Analisis Sekarang
            </h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-400">
              Masukkan review film Anda dan lihat hasil prediksi dari kedua model
            </p>
          </div>

          {/* Input Form */}
          <div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="review" className="block text-sm font-medium text-neutral-900 dark:text-neutral-100 mb-3">
                  Masukkan review film Anda
                </label>
                <div className="relative">
                  <textarea
                    id="review"
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    className="w-full h-48 px-4 py-3 text-neutral-900 dark:text-neutral-100 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-neutral-900 dark:focus:ring-neutral-100 focus:border-transparent resize-none transition-all placeholder:text-neutral-400 dark:placeholder:text-neutral-600"
                    placeholder="This movie was absolutely amazing! The cinematography was stunning and the story kept me engaged..."
                    required
                  />
                </div>
                <p className="mt-2 text-xs text-neutral-500 dark:text-neutral-500">
                  Minimal 10 karakter diperlukan • Review harus dalam bahasa Inggris
                </p>
              </div>

              <button
                type="submit"
                disabled={loading || !review.trim() || review.length < 10}
                className="w-full bg-neutral-900 dark:bg-neutral-100 hover:bg-neutral-800 dark:hover:bg-neutral-200 disabled:bg-neutral-300 dark:disabled:bg-neutral-700 text-white dark:text-neutral-900 font-medium py-4 px-6 rounded-xl transition-all disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 dark:border-neutral-900/30 border-t-white dark:border-t-neutral-900 rounded-full animate-spin" />
                    <span>Menganalisis...</span>
                  </>
                ) : (
                  <>
                    <span>Analisis Review</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>

            {error && (
              <div className="mt-6 p-4 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/50 rounded-xl flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-red-900 dark:text-red-400 mb-1">Kesalahan Koneksi</p>
                  <p className="text-xs text-red-700 dark:text-red-500">{error}</p>
                </div>
              </div>
            )}
          </div>

          {/* Results */}
          {result && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex items-center gap-3">
                <div className="h-px flex-1 bg-neutral-200 dark:bg-neutral-800" />
                <span className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
                  Analisis Selesai
                </span>
                <div className="h-px flex-1 bg-neutral-200 dark:bg-neutral-800" />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* LSTM Result */}
                <div className="bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800 rounded-xl p-6 space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-neutral-900 dark:bg-neutral-100 rounded-lg flex items-center justify-center">
                        <Brain className="w-5 h-5 text-white dark:text-neutral-900" />
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-neutral-900 dark:text-neutral-100">LSTM</h3>
                        <p className="text-xs text-neutral-500 dark:text-neutral-500">Long Short-Term Memory</p>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${
                      result.lstm.sentiment === 'Positive'
                        ? 'bg-green-50 dark:bg-green-950/20 text-green-700 dark:text-green-400 border-green-200 dark:border-green-900/50'
                        : 'bg-red-50 dark:bg-red-950/20 text-red-700 dark:text-red-400 border-red-200 dark:border-red-900/50'
                    }`}>
                      {result.lstm.sentiment === 'Positive' ? 'Positif' : 'Negatif'}
                    </span>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-medium text-neutral-600 dark:text-neutral-400">Kepercayaan</span>
                        <span className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                          {(result.lstm.confidence * 100).toFixed(1)}%
                        </span>
                      </div>
                      <div className="w-full bg-neutral-200 dark:bg-neutral-800 rounded-full h-2 overflow-hidden">
                        <div
                          className={`h-2 rounded-full transition-all duration-700 ${
                            result.lstm.sentiment === 'Positive'
                              ? 'bg-green-600 dark:bg-green-500'
                              : 'bg-red-600 dark:bg-red-500'
                          }`}
                          style={{ width: `${result.lstm.confidence * 100}%` }}
                        />
                      </div>
                    </div>

                    <div className="pt-3 border-t border-neutral-200 dark:border-neutral-800">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-neutral-500 dark:text-neutral-500">Skor Mentah</span>
                        <span className="text-sm font-mono text-neutral-700 dark:text-neutral-300">
                          {result.lstm.score.toFixed(4)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* RNN Result */}
                <div className="bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800 rounded-xl p-6 space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-neutral-900 dark:bg-neutral-100 rounded-lg flex items-center justify-center">
                        <Cpu className="w-5 h-5 text-white dark:text-neutral-900" />
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-neutral-900 dark:text-neutral-100">RNN</h3>
                        <p className="text-xs text-neutral-500 dark:text-neutral-500">Recurrent Neural Network</p>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${
                      result.rnn.sentiment === 'Positive'
                        ? 'bg-green-50 dark:bg-green-950/20 text-green-700 dark:text-green-400 border-green-200 dark:border-green-900/50'
                        : 'bg-red-50 dark:bg-red-950/20 text-red-700 dark:text-red-400 border-red-200 dark:border-red-900/50'
                    }`}>
                      {result.rnn.sentiment === 'Positive' ? 'Positif' : 'Negatif'}
                    </span>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-medium text-neutral-600 dark:text-neutral-400">Kepercayaan</span>
                        <span className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                          {(result.rnn.confidence * 100).toFixed(1)}%
                        </span>
                      </div>
                      <div className="w-full bg-neutral-200 dark:bg-neutral-800 rounded-full h-2 overflow-hidden">
                        <div
                          className={`h-2 rounded-full transition-all duration-700 ${
                            result.rnn.sentiment === 'Positive'
                              ? 'bg-green-600 dark:bg-green-500'
                              : 'bg-red-600 dark:bg-red-500'
                          }`}
                          style={{ width: `${result.rnn.confidence * 100}%` }}
                        />
                      </div>
                    </div>

                    <div className="pt-3 border-t border-neutral-200 dark:border-neutral-800">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-neutral-500 dark:text-neutral-500">Skor Mentah</span>
                        <span className="text-sm font-mono text-neutral-700 dark:text-neutral-300">
                          {result.rnn.score.toFixed(4)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-neutral-200 dark:border-neutral-800 mt-16">
        <div className="container mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              Didukung oleh TensorFlow • Model LSTM & RNN
            </p>
            <div className="flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-500">
              <span>Dibangun dengan Next.js & Flask</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
