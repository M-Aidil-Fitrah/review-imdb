import { NextRequest, NextResponse } from 'next/server';
import * as tf from '@tensorflow/tfjs';

// IMDB word index - top 10000 words
let wordIndex: { [key: string]: number } | null = null;
let lstmModel: tf.LayersModel | null = null;
let rnnModel: tf.LayersModel | null = null;

const MAX_LENGTH = 500;

// Load models (hanya sekali saat cold start)
async function loadModels() {
  if (lstmModel && rnnModel && wordIndex) {
    return; // Already loaded
  }

  console.log('Loading models...');
  
  // Load models
  lstmModel = await tf.loadLayersModel('/models/tfjs_lstm/model.json');
  rnnModel = await tf.loadLayersModel('/models/tfjs_rnn/model.json');
  
  // Load IMDB word index
  const response = await fetch('https://storage.googleapis.com/tfjs-models/tfjs/sentiment_cnn_v1/metadata.json');
  const metadata = await response.json();
  wordIndex = metadata.word_index;
  
  console.log('Models loaded successfully!');
}

function preprocessText(text: string): number[] {
  if (!wordIndex) return [];
  
  // Lowercase and clean
  const cleaned = text.toLowerCase().replace(/[^a-z\s]/g, '');
  const words = cleaned.split(/\s+/);
  
  // Convert to sequence
  const sequence: number[] = [];
  for (const word of words) {
    if (wordIndex[word] !== undefined) {
      const idx = wordIndex[word];
      if (idx < 10000) {
        sequence.push(idx + 3); // Offset by 3 (PAD, START, UNK)
      }
    } else {
      sequence.push(2); // UNK token
    }
  }
  
  // Pad/truncate to MAX_LENGTH
  const padded = sequence.slice(0, MAX_LENGTH);
  while (padded.length < MAX_LENGTH) {
    padded.push(0); // PAD token
  }
  
  return padded;
}

export async function POST(request: NextRequest) {
  try {
    // Load models if not loaded
    await loadModels();
    
    if (!lstmModel || !rnnModel) {
      throw new Error('Models not loaded');
    }
    
    const body = await request.json();
    const reviewText = body.review;
    
    if (!reviewText) {
      return NextResponse.json(
        { error: 'No review text provided' },
        { status: 400 }
      );
    }
    
    // Preprocess
    const sequence = preprocessText(reviewText);
    const inputTensor = tf.tensor2d([sequence], [1, MAX_LENGTH]);
    
    // Predict with both models
    const lstmPrediction = lstmModel.predict(inputTensor) as tf.Tensor;
    const rnnPrediction = rnnModel.predict(inputTensor) as tf.Tensor;
    
    const lstmScore = (await lstmPrediction.data())[0];
    const rnnScore = (await rnnPrediction.data())[0];
    
    // Cleanup tensors
    inputTensor.dispose();
    lstmPrediction.dispose();
    rnnPrediction.dispose();
    
    // Prepare response
    const lstmSentiment = lstmScore > 0.5 ? 'Positive' : 'Negative';
    const rnnSentiment = rnnScore > 0.5 ? 'Positive' : 'Negative';
    
    return NextResponse.json({
      lstm: {
        sentiment: lstmSentiment,
        confidence: lstmScore > 0.5 ? lstmScore : 1 - lstmScore,
        score: lstmScore,
      },
      rnn: {
        sentiment: rnnSentiment,
        confidence: rnnScore > 0.5 ? rnnScore : 1 - rnnScore,
        score: rnnScore,
      },
    });
  } catch (error) {
    console.error('Prediction error:', error);
    return NextResponse.json(
      { error: 'Failed to process prediction', details: String(error) },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    status: 'ok',
    message: 'Prediction API is running',
  });
}
