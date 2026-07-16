# 🤟 ISL-Vision

Real-time Indian Sign Language to text converter using computer vision and deep learning.

![React](https://img.shields.io/badge/React-19.2.0-61DAFB?logo=react)
![Python](https://img.shields.io/badge/Python-3.10-3776AB?logo=python)
![TailwindCSS](https://img.shields.io/badge/Tailwind-3.4.17-38B2AC?logo=tailwind-css)

---

## Demo

**ISL-Vision** – [Live Demo](https://isl-vision.onrender.com)

---

## What It Does

ISL-Vision is a real-time Indian Sign Language (ISL) recognition system that takes hand gestures as input and predicts the corresponding English alphabets using a Feed Forward Neural Network (FFNN) trained on MediaPipe hand landmark features for multi-class alphabet classification, achieving **99% accuracy**.

---

## Tech Stack

### Frontend

- React 19 + Vite
- Tailwind CSS
- MediaPipe Hands (CDN)
- Axios

### Backend

- FastAPI
- TensorFlow / Keras
- OpenCV
- MediaPipe
- NumPy
- Pandas
- Scikit-learn

### Model

- Trained in Google Colab
- Feed Forward Neural Network (FFNN)
- MediaPipe hand landmark feature extraction
- StandardScaler normalization

---

## How It Works

1. **Webcam** captures live video frames.
2. **MediaPipe Hands** detects 21 hand landmarks for every detected hand.
3. **Frontend** visualizes the landmarks and periodically sends captured frames to the backend.
4. **Backend** extracts landmark-based features and preprocesses them using a StandardScaler.
5. **Feed Forward Neural Network (FFNN)** predicts the corresponding English alphabet.
6. **Word Builder** automatically constructs words from predictions while allowing manual editing through space, delete, and clear controls.

### Configuration (`constants.js`)

```javascript
PREDICTION_INTERVAL = 1000;   // Backend request interval (ms)
LETTER_ADD_INTERVAL = 5000;   // Auto-add interval (ms)

MEDIAPIPE_CONFIG = {
  maxNumHands: 2,
  modelComplexity: 1,
  minDetectionConfidence: 0.3,
  minTrackingConfidence: 0.3,
};
```

---

## API Endpoints

### `GET /health`

Checks backend health.

### `POST /api/predict`

Accepts a Base64 encoded frame and returns the prediction.

### Response

```json
{
  "predicted_letter": "A",
  "confidence": 0.94,
  "hand_count": 1
}
```

---

## Model Details

- **Model:** Feed Forward Neural Network (FFNN)
- **Framework:** TensorFlow / Keras
- **Training Environment:** Google Colab
- **Input Features:** 21 MediaPipe hand landmarks (x, y, z coordinates) from up to two hands
- **Feature Size:** 126 features
- **Task:** Multi-class English alphabet classification
- **Preprocessing:** StandardScaler normalization
- **Accuracy:** **99%**
- **Saved Model Format:** `.keras`

---

## Dataset

The model was trained using the **Indian Sign Language Hand Landmarks Dataset**, which contains MediaPipe hand landmark coordinates for English alphabet gestures.

**Dataset:** https://www.kaggle.com/datasets/eraakash/indian-sign-language-hand-landmarks-dataset


### Training Notebook

The complete model training pipeline, including data preprocessing, feature engineering, model training, evaluation, and model export, is available in the Google Colab notebook below.

**Google Colab:** https://colab.research.google.com/drive/1_xbdp57p-9eelgWQwOS5kMYQYJwwBHE7#scrollTo=axllfw22nkhG

---

## Key Features

- Real-time Indian Sign Language alphabet recognition
- MediaPipe-based hand landmark detection
- Feed Forward Neural Network (FFNN) inference
- Dual-hand support
- Confidence score for every prediction
- Responsive modern UI

---

## License

MIT License

---

## Author

**RecursiveByte** – https://github.com/RecursiveByte