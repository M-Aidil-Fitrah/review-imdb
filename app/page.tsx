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
      <section className="border-b border-neutral-200 dark:border-neutral-800">
        <div className="container mx-auto px-6 py-20 max-w-6xl">
          <div className="flex flex-col items-center text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-full">
              <Sparkles className="w-4 h-4 text-neutral-600 dark:text-neutral-400" />
              <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                AI-Powered Sentiment Analysis
              </span>
            </div>

            <h1 className="text-6xl font-semibold text-neutral-900 dark:text-neutral-50 max-w-3xl leading-tight">
              Analyze Movie Reviews Instantly
            </h1>

            <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl">
              Use advanced LSTM and RNN neural networks to determine if a movie review is positive or negative. Fast, accurate, and powered by TensorFlow.
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
                LSTM Model
              </h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                Long Short-Term Memory network for understanding context and long-range dependencies
              </p>
            </div>

            <div className="p-6 bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800 rounded-xl">
              <div className="w-10 h-10 bg-neutral-900 dark:bg-neutral-100 rounded-lg flex items-center justify-center mb-4">
                <Cpu className="w-5 h-5 text-white dark:text-neutral-900" />
              </div>
              <h3 className="text-lg font-medium text-neutral-900 dark:text-neutral-100 mb-2">
                RNN Model
              </h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                Recurrent Neural Network for sequential pattern recognition and fast inference
              </p>
            </div>

            <div className="p-6 bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800 rounded-xl">
              <div className="w-10 h-10 bg-neutral-900 dark:bg-neutral-100 rounded-lg flex items-center justify-center mb-4">
                <Sparkles className="w-5 h-5 text-white dark:text-neutral-900" />
              </div>
              <h3 className="text-lg font-medium text-neutral-900 dark:text-neutral-100 mb-2">
                Dual Analysis
              </h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                Compare results from both models for higher accuracy and confidence validation
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Analysis Section */}
      <main className="container mx-auto px-6 py-16 max-w-4xl">
        <div className="space-y-8">
          {/* Input Form */}
          <div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="review" className="block text-sm font-medium text-neutral-900 dark:text-neutral-100 mb-3">
                  Enter your movie review
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
                  Minimum 10 characters required
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
                    <span>Analyzing...</span>
                  </>
                ) : (
                  <>
                    <span>Analyze Review</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>

            {error && (
              <div className="mt-6 p-4 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/50 rounded-xl flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-red-900 dark:text-red-400 mb-1">Connection Error</p>
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
                  Analysis Complete
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
                      {result.lstm.sentiment}
                    </span>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-medium text-neutral-600 dark:text-neutral-400">Confidence</span>
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
                        <span className="text-xs text-neutral-500 dark:text-neutral-500">Raw Score</span>
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
                      {result.rnn.sentiment}
                    </span>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-medium text-neutral-600 dark:text-neutral-400">Confidence</span>
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
                        <span className="text-xs text-neutral-500 dark:text-neutral-500">Raw Score</span>
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
              Powered by TensorFlow • LSTM & RNN Models
            </p>
            <div className="flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-500">
              <span>Built with Next.js & Flask</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
