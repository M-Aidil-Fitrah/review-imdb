'use client';

import { useState } from 'react';

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
      setError('Failed to analyze review. Make sure the Python API server is running (python api_server.py)');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
            IMDB Review Sentiment Analyzer
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Analyze movie reviews using LSTM and RNN models
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            ⚠️ English reviews only
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="review" className="block text-lg font-semibold text-gray-700 dark:text-gray-200 mb-3">
                Enter Your Movie Review
              </label>
              <textarea
                id="review"
                value={review}
                onChange={(e) => setReview(e.target.value)}
                className="w-full h-48 px-4 py-3 text-gray-700 dark:text-gray-200 bg-gray-50 dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:border-indigo-500 dark:focus:border-indigo-400 resize-none transition-colors"
                placeholder="Type your movie review here... (e.g., 'This movie was absolutely amazing! The acting was superb and the story kept me engaged throughout.')"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading || !review.trim()}
              className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] disabled:hover:scale-100 disabled:cursor-not-allowed shadow-lg"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Analyzing...
                </span>
              ) : (
                'Analyze Review'
              )}
            </button>
          </form>

          {error && (
            <div className="mt-6 p-4 bg-red-100 dark:bg-red-900/30 border-2 border-red-400 dark:border-red-600 rounded-xl">
              <p className="text-red-700 dark:text-red-400 font-medium">{error}</p>
            </div>
          )}
        </div>

        {result && (
          <div className="grid md:grid-cols-2 gap-6">
            {/* LSTM Result */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border-t-4 border-purple-500">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mr-4">
                  <span className="text-2xl">🧠</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">LSTM Model</h2>
              </div>
              
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Sentiment</p>
                  <div className={`inline-block px-6 py-3 rounded-full text-xl font-bold ${
                    result.lstm.sentiment === 'Positive'
                      ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                      : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                  }`}>
                    {result.lstm.sentiment === 'Positive' ? '😊 Positive' : '😞 Negative'}
                  </div>
                </div>
                
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Confidence</p>
                  <div className="flex items-center">
                    <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-4 overflow-hidden">
                      <div
                        className={`h-full transition-all duration-500 ${
                          result.lstm.sentiment === 'Positive' ? 'bg-green-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${result.lstm.confidence * 100}%` }}
                      ></div>
                    </div>
                    <span className="ml-4 text-lg font-semibold text-gray-900 dark:text-white">
                      {(result.lstm.confidence * 100).toFixed(1)}%
                    </span>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Raw Score</p>
                  <p className="text-lg font-mono text-gray-900 dark:text-white">{result.lstm.score.toFixed(4)}</p>
                </div>
              </div>
            </div>

            {/* RNN Result */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border-t-4 border-blue-500">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mr-4">
                  <span className="text-2xl">🔮</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">RNN Model</h2>
              </div>
              
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Sentiment</p>
                  <div className={`inline-block px-6 py-3 rounded-full text-xl font-bold ${
                    result.rnn.sentiment === 'Positive'
                      ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                      : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                  }`}>
                    {result.rnn.sentiment === 'Positive' ? '😊 Positive' : '😞 Negative'}
                  </div>
                </div>
                
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Confidence</p>
                  <div className="flex items-center">
                    <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-4 overflow-hidden">
                      <div
                        className={`h-full transition-all duration-500 ${
                          result.rnn.sentiment === 'Positive' ? 'bg-green-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${result.rnn.confidence * 100}%` }}
                      ></div>
                    </div>
                    <span className="ml-4 text-lg font-semibold text-gray-900 dark:text-white">
                      {(result.rnn.confidence * 100).toFixed(1)}%
                    </span>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Raw Score</p>
                  <p className="text-lg font-mono text-gray-900 dark:text-white">{result.rnn.score.toFixed(4)}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="mt-12 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Powered by TensorFlow • LSTM & RNN Models
          </p>
        </div>
      </main>
    </div>
  );
}
