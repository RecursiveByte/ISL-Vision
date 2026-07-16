import {
  FiDelete,
  FiTrash2,
  FiCornerDownRight,
} from "react-icons/fi";

const WordControls = ({
  isWebcamActive,
  currentWord,
  onAddSpace,
  onDeleteLetter,
  onClearWord,
}) => {
  return (
    <div className="grid grid-cols-3 gap-3 mb-5">
      <button
        onClick={onAddSpace}
        disabled={!isWebcamActive}
        className="flex items-center justify-center gap-2 py-3 rounded-xl bg-blue-500 hover:bg-blue-600 text-white font-semibold transition disabled:bg-gray-300"
      >
        <FiCornerDownRight />
        Space
      </button>

      <button
        onClick={onDeleteLetter}
        disabled={!isWebcamActive || currentWord.length === 0}
        className="flex items-center justify-center gap-2 py-3 rounded-xl bg-yellow-500 hover:bg-yellow-600 text-white font-semibold transition disabled:bg-gray-300"
      >
        <FiDelete />
        Delete
      </button>

      <button
        onClick={onClearWord}
        disabled={!isWebcamActive}
        className="flex items-center justify-center gap-2 py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-semibold transition disabled:bg-gray-300"
      >
        <FiTrash2 />
        Clear
      </button>
    </div>
  );
};

export default WordControls;