# 🤟 ISL-Vision

Real-time Indian Sign Language to text converter using computer vision and deep learning.

![React](https://img.shields.io/badge/React-19.2.0-61DAFB?logo=react)
![Python](https://img.shields.io/badge/Python-3.10-3776AB?logo=python)
![TailwindCSS](https://img.shields.io/badge/Tailwind-3.4.17-38B2AC?logo=tailwind-css)

---
## Demo
**ISL-Vision** [Live demo](https://isl-vision.onrender.com)


## What It Does

Captures hand gestures via webcam, detects 21 hand landmarks using MediaPipe, and predicts ISL letters using a trained DNN model. Auto-builds words from detected letters with manual editing controls.

---

## Tech Stack

**Frontend:**
- React 19.2 + Vite 5.4
- Tailwind CSS 3.4
- MediaPipe Hands (CDN)
- Axios

**Backend:**
- Fast api
- TensorFlow/Keras (DNN model)
- OpenCV + MediaPipe
- Pandas,NumPy,scikit-learn ...

**Model:**
- Trained in Google Colab using TensorFlow
- Deep Neural Network architecture
- Hand landmark feature extraction
- StandardScaler normalization

---

## Project Structure

```
AI_ML/
├── backend/
│   ├── app.py                          # FAST API server
│   ├── main.py                         # Alternative entry
│   ├── requirements.txt
│   ├── runtime.txt
│   ├── basic/
│   │   ├── gesture.py                  # Gesture recognition logic
│   │   └── sign.py                     # Sign language processing
│   ├── models/
│   │   ├── hand_landmark_dnn.keras     # Trained DNN model
│   │   └── scaler.pkl                  # Feature scaler
│   ├── static/
│   │   ├── index.html                  # Demo page
│   │   ├── script.js
│   │   └── style.css
│   └── utils/
│       ├── config.py                   # Configuration
│       ├── feature_extractor.py        # Extract hand features
│       ├── hand_detector.py            # MediaPipe detector
│       ├── model_manager.py            # Model loading
│       ├── visualization.py            # Drawing utilities
│       └── word_builder.py             # Word building logic
│
└── frontend/
    ├── package.json
    ├── vite.config.js
    ├── tailwind.config.js
    ├── postcss.config.js
    ├── index.html
    ├── public/
    │   └── vite.svg
    └── src/
        ├── main.jsx                    # Entry point
        ├── App.jsx                     # Main component
        ├── index.css                   # Global styles
        ├── components/
        │   ├── VideoCanvas.jsx         # Webcam + canvas overlay
        │   ├── StatusPanel.jsx         # Connection/prediction status
        │   ├── WordDisplay.jsx         # Current word display
        │   ├── WordControls.jsx        # Space/delete/clear buttons
        │   ├── WebcamControls.jsx      # Start/stop webcam
        │   ├── ColorLegend.jsx         # Landmark color guide
        │   └── index.js                # Component exports
        ├── hooks/
        │   ├── useWebcam.js            # Webcam + API logic
        │   ├── useMediaPipe.js         # Hand detection
        │   ├── useWordBuilder.js       # Word building state
        │   └── useBackendConnection.js # Health check
        ├── utils/
        │   └── handDrawing.js          # Canvas drawing (21 landmarks)
        └── config/
            └── constants.js            # API URL, intervals, MediaPipe config
```


## How It Works

1. **Webcam** → Captures video (1280x720)
2. **MediaPipe** → Detects 21 hand landmarks per hand
3. **Frontend** → Draws landmarks on canvas, sends frame to backend every 1s
4. **Backend** → Extracts features, runs through DNN model
5. **Prediction** → Returns ISL letter + confidence score
6. **Word Building** → Auto-adds letter every 5s, manual controls available

**Configuration** (`constants.js`):
```javascript
PREDICTION_INTERVAL = 1000   // Backend call frequency (ms)
LETTER_ADD_INTERVAL = 5000   // Auto-add frequency (ms)
MEDIAPIPE_CONFIG = {
  maxNumHands: 2,
  modelComplexity: 1,
  minDetectionConfidence: 0.3,
  minTrackingConfidence: 0.3
}
```

---

## API Endpoints

- `GET /health` - Backend health check
- `POST /api/predict` - Send frame (base64 JPEG), get prediction

**Response:**
```json
{
  "predicted_letter": "A",
  "confidence": 0.94,
  "hand_count": 1
}
```

---

## Model Details

- **Architecture:** Deep Neural Network (DNN)
- **Training:** Google Colab with TensorFlow/Keras
- **Input:** 21 hand landmarks (x, y, z) × 2 hands = 126 features
- **Output:** ISL letter classification
- **Preprocessing:** StandardScaler normalization
- **Format:** Keras (.keras) + pickle (.pkl)

---

## Key Features

- Real-time hand tracking (30+ FPS)
- Dual hand support
- Color-coded landmark visualization
- Auto word building with countdown
- Manual editing (space, delete, clear)
- Confidence scoring
- Responsive UI

---

## License

MIT License

---

## Author

**RecursiveByte** - [GitHub](https://github.com/RecursiveByte)
