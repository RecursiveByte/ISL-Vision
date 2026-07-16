import {
  FiPlay,
  FiSquare,
  FiCheckCircle,
  FiAlertCircle,
} from "react-icons/fi";

const WebcamControls = ({
  isWebcamActive,
  backendStatus,
  statusMessage,
  onStart,
  onStop,
}) => {
  return (
    <>
      <button
        onClick={isWebcamActive ? onStop : onStart}
        disabled={backendStatus !== "connected"}
        className={`w-full flex items-center justify-center gap-2 py-4 rounded-xl font-semibold text-white text-lg transition-all ${
          isWebcamActive
            ? "bg-red-600 hover:bg-red-700 shadow-lg"
            : backendStatus === "connected"
            ? "bg-indigo-600 hover:bg-indigo-700 shadow-lg"
            : "bg-gray-400 cursor-not-allowed"
        }`}
      >
        {isWebcamActive ? (
          <>
            <FiSquare />
            Stop Webcam
          </>
        ) : (
          <>
            <FiPlay />
            Start Webcam
          </>
        )}
      </button>

      <div
        className={`mt-4 flex items-center justify-center gap-2 text-sm font-semibold ${
          backendStatus === "connected"
            ? "text-green-600"
            : "text-red-600"
        }`}
      >
        {backendStatus === "connected" ? (
          <FiCheckCircle />
        ) : (
          <FiAlertCircle />
        )}
        {statusMessage}
      </div>
    </>
  );
};

export default WebcamControls;