import { FiType } from "react-icons/fi";

const WordDisplay = ({ currentWord }) => {
  return (
    <div className="mb-5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 p-6 text-white shadow-lg">
      <div className="mb-2 flex items-center gap-2 text-indigo-100">
        <FiType />
        <span className="text-sm font-medium tracking-wide">
          CURRENT WORD
        </span>
      </div>

      <h2 className="min-h-[48px] break-all text-center text-4xl font-bold">
        {currentWord || "—"}
      </h2>
    </div>
  );
};

export default WordDisplay;