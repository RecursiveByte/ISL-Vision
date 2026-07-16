import React, { useEffect } from "react";
import VideoCanvas from "./components/VideoCanvas";
import StatusPanel from "./components/StatusPanel";
import WordDisplay from "./components/WordDisplay";
import WordControls from "./components/WordControls";
import WebcamControls from "./components/WebcamControls";
import ColorLegend from "./components/ColorLegend";
import { useWebcam } from "./hooks/useWebcam";
import { useWordBuilder } from "./hooks/useWordBuilder";
import { useBackendConnection } from "./hooks/useBackendConnection";

const API_URL = import.meta.env.VITE_API_URL;

function App() {
  const { backendStatus, statusMessage, checkBackendConnection } =
    useBackendConnection(API_URL);

  const {
    isWebcamActive,
    videoRef,
    canvasRef,
    currentLetter,
    confidence,
    handCount,
    startWebcam,
    stopWebcam,
  } = useWebcam(API_URL, backendStatus);

  const { currentWord, countdown, clearWord, deleteLastLetter, addSpace } =
    useWordBuilder(isWebcamActive, currentLetter);

  useEffect(() => {
    checkBackendConnection();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center p-5">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-4xl w-full">
        <h1 className="text-3xl font-bold text-center mb-6">ISL-Vision</h1>

        <p className="text-center text-lg text-gray-800 mb-6">
          Indian Sign Language Recognition
        </p>

        <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-center">
          <span className="font-semibold text-yellow-800">NOTE:</span>{" "}
          <span className="text-gray-700">
            The backend service is hosted on a free-tier platform, and the
            monthly quota has been exhausted. Please refer to the video for
            a complete demonstration.{" "}
            <a
              href="https://drive.google.com/file/d/1k4N6jS6IoAgttnMXV56T0Qaln_2IgUar/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 font-medium underline hover:text-blue-800"
            >
              Watch Demo
            </a>
          </span>
        </div>

        <VideoCanvas
          videoRef={videoRef}
          canvasRef={canvasRef}
          isWebcamActive={isWebcamActive}
        />

        <StatusPanel
          currentLetter={currentLetter}
          confidence={confidence}
          handCount={handCount}
          countdown={countdown}
        />

        <WordDisplay currentWord={currentWord} />

        <WordControls
          isWebcamActive={isWebcamActive}
          currentWord={currentWord}
          onAddSpace={addSpace}
          onDeleteLetter={deleteLastLetter}
          onClearWord={clearWord}
        />

        <WebcamControls
          isWebcamActive={isWebcamActive}
          backendStatus={backendStatus}
          statusMessage={statusMessage}
          onStart={startWebcam}
          onStop={stopWebcam}
        />

        <ColorLegend />
      </div>
    </div>
  );
}

export default App;