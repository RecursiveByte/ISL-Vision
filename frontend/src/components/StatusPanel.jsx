import { FiType, FiTarget, FiActivity, FiClock } from "react-icons/fi";

const StatusPanel = ({ currentLetter, confidence, handCount, countdown }) => {
  const stats = [
    {
      icon: <FiType className="text-indigo-600 text-2xl" />,
      label: "Letter",
      value: currentLetter,
      size: "text-2xl",
    },
    {
      icon: <FiTarget className="text-green-600 text-2xl" />,
      label: "Confidence",
      value: `${(confidence * 100).toFixed(0)}%`,
      size: "text-xl",
    },
    {
      icon: <FiActivity className="text-purple-600 text-2xl" />,
      label: "Hands",
      value: handCount,
      size: "text-xl",
    },
    {
      icon: <FiClock className="text-orange-500 text-2xl" />,
      label: "Next Letter",
      value: `${countdown.toFixed(1)}s`,
      size: "text-xl",
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 mb-5">
      {stats.map(({ icon, label, value, size }) => (
        <div
          key={label}
          className="flex items-center gap-3 rounded-xl border border-gray-200 bg-gray-50 p-4"
        >
          {icon}
          <div>
            <p className="text-xs uppercase tracking-wide text-gray-500">
              {label}
            </p>
            <h2 className={`${size} font-bold text-gray-800`}>{value}</h2>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatusPanel;
