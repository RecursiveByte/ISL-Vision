from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import Response
from pydantic import BaseModel
import cv2
import numpy as np
from typing import Optional
import base64
from io import BytesIO
from PIL import Image

from utils.config import *
from utils.model_manager import GestureModelManager
from utils.hand_detector import HandDetector
from utils.feature_extractor import extract_hand_features
from utils.word_builder import WordBuilder

app = FastAPI(
    title="Hand Gesture Recognition API",
    description="Real-time hand gesture recognition",
    version="2.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

model_manager = None
hand_detector = None
word_builder = None


@app.on_event("startup")
async def startup_event():
    global model_manager, hand_detector, word_builder
    model_manager = GestureModelManager(MODEL_PATH, SCALER_PATH)
    hand_detector = HandDetector(
        MAX_HANDS,
        MIN_DETECTION_CONFIDENCE,
        MIN_TRACKING_CONFIDENCE
    )
    word_builder = WordBuilder(
        PREDICTION_INTERVAL,
        LETTER_ADD_INTERVAL,
        CONFIDENCE_THRESHOLD
    )


@app.on_event("shutdown")
async def shutdown_event():
    global hand_detector
    if hand_detector:
        hand_detector.close()


class ImageRequest(BaseModel):
    image: str


class PredictionResponse(BaseModel):
    success: bool
    current_letter: str
    confidence: float
    hand_count: int
    current_word: str
    time_until_next_add: float
    letter_added: Optional[str] = None
    message: Optional[str] = None


def decode_base64_image(base64_string: str) -> np.ndarray:
    if "," in base64_string:
        base64_string = base64_string.split(",")[1]
    image_bytes = base64.b64decode(base64_string)
    image = Image.open(BytesIO(image_bytes))
    return cv2.cvtColor(np.array(image), cv2.COLOR_RGB2BGR)


@app.get("/")
async def root():
    return {
        "status": "online",
        "version": "2.0.0"
    }


@app.api_route("/health", methods=["GET", "HEAD"])
async def health_check():
    models_ready = all([model_manager, hand_detector, word_builder])
    if not models_ready:
        return Response(status_code=503)
    return {
        "status": "healthy",
        "models_loaded": True
    }


@app.post("/api/predict", response_model=PredictionResponse)
async def predict_gesture(request: ImageRequest):
    try:
        frame = decode_base64_image(request.image)

        detection_result = hand_detector.detect(frame)
        features, hand_landmarks = extract_hand_features(detection_result)

        if word_builder.should_predict():
            if features is not None:
                letter, confidence = model_manager.predict(
                    features,
                    CLASS_TO_CHAR
                )
                word_builder.update_prediction(letter, confidence)
            else:
                word_builder.update_prediction("", 0.0)

        added_letter = word_builder.try_add_letter()
        state = word_builder.get_state()
        hand_count = len(hand_landmarks) if hand_landmarks else 0

        return PredictionResponse(
            success=True,
            current_letter=state.current_letter or "",
            confidence=round(state.current_confidence, 3),
            hand_count=hand_count,
            current_word=state.composed_word or "",
            time_until_next_add=round(state.time_until_next_add, 1),
            letter_added=added_letter,
            message="Prediction successful"
        )

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=str(e)
        )


@app.post("/api/word/space")
async def add_space():
    word_builder.add_space()
    return {
        "success": True,
        "current_word": word_builder.get_word()
    }


@app.post("/api/word/delete")
async def delete_last_character():
    word_builder.delete_last_character()
    return {
        "success": True,
        "current_word": word_builder.get_word()
    }


@app.post("/api/word/clear")
async def clear_word():
    old_word = word_builder.clear_word()
    return {
        "success": True,
        "previous_word": old_word,
        "current_word": ""
    }


@app.post("/api/word/reset")
async def reset_word_builder():
    word_builder.reset()
    return {
        "success": True
    }


@app.get("/api/word/get")
async def get_current_word():
    return {
        "success": True,
        "current_word": word_builder.get_word()
    }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "app:app",
        host="0.0.0.0",
        port=8000
    )
