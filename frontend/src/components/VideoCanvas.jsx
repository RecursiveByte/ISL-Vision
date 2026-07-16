import { FiCamera } from "react-icons/fi";

const VideoCanvas = ({ videoRef, canvasRef, isWebcamActive }) => {
  return (
    <div
      className="relative overflow-hidden rounded-2xl bg-black mb-6"
      style={{ height: "480px" }}
    >
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transform: "scaleX(-1)",
          display: isWebcamActive ? "block" : "none",
        }}
      />

      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          display: isWebcamActive ? "block" : "none",
        }}
      />

      {!isWebcamActive && (
        <div className="flex h-full flex-col items-center justify-center text-gray-300">
          <FiCamera size={60} />
          <p className="mt-4 text-lg font-medium">
            Start Webcam to Begin Recognition
          </p>
        </div>
      )}
    </div>
  );
};

export default VideoCanvas;
