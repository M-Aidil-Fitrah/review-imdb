from flask import Flask, request, jsonify
from flask_cors import CORS
import tensorflow as tf
import numpy as np
import re
from tensorflow.keras.preprocessing.sequence import pad_sequences
from tensorflow.keras.datasets import imdb

app = Flask(__name__)
CORS(app)

# Load models
lstm_model = None
rnn_model = None

# IMDB word index
word_index = None
max_length = 500  # sesuaikan dengan max_length yang digunakan saat training

def load_models():
    global lstm_model, rnn_model, word_index
    try:
        lstm_model = tf.keras.models.load_model('public/models/model_lstm.h5')
        rnn_model = tf.keras.models.load_model('public/models/model_rnn.h5')
        
        # Load IMDB word index
        word_to_id = imdb.get_word_index()
        word_to_id = {k: (v + 3) for k, v in word_to_id.items()}
        word_to_id["<PAD>"] = 0
        word_to_id["<START>"] = 1
        word_to_id["<UNK>"] = 2
        word_to_id["<UNUSED>"] = 3
        word_index = word_to_id
        
        print("Models loaded successfully!")
    except Exception as e:
        print(f"Error loading models: {e}")

def preprocess_text(text):
    """Preprocess text untuk prediksi"""
    # Lowercase dan remove special characters
    text = text.lower()
    text = re.sub(r'[^a-zA-Z\s]', '', text)
    
    # Convert text to sequence
    words = text.split()
    sequence = []
    for word in words:
        if word in word_index:
            if word_index[word] < 10000:  # Hanya gunakan top 10000 words
                sequence.append(word_index[word])
        else:
            sequence.append(2)  # <UNK> token
    
    # Pad sequence
    padded = pad_sequences([sequence], maxlen=max_length, padding='post', truncating='post')
    return padded

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.json
        review_text = data.get('review', '')
        
        if not review_text:
            return jsonify({'error': 'No review text provided'}), 400
        
        # Preprocess
        processed = preprocess_text(review_text)
        
        # Predict with both models
        lstm_pred = lstm_model.predict(processed, verbose=0)[0][0]
        rnn_pred = rnn_model.predict(processed, verbose=0)[0][0]
        
        # Convert to sentiment
        lstm_sentiment = "Positive" if lstm_pred > 0.5 else "Negative"
        rnn_sentiment = "Positive" if rnn_pred > 0.5 else "Negative"
        
        return jsonify({
            'lstm': {
                'sentiment': lstm_sentiment,
                'confidence': float(lstm_pred) if lstm_pred > 0.5 else float(1 - lstm_pred),
                'score': float(lstm_pred)
            },
            'rnn': {
                'sentiment': rnn_sentiment,
                'confidence': float(rnn_pred) if rnn_pred > 0.5 else float(1 - rnn_pred),
                'score': float(rnn_pred)
            }
        })
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/health', methods=['GET'])
def health():
    return jsonify({'status': 'ok', 'models_loaded': lstm_model is not None and rnn_model is not None})

if __name__ == '__main__':
    load_models()
    app.run(host='0.0.0.0', port=5000, debug=True)
