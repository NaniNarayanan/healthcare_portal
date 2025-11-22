import React from "react";
import Card from "./Cards";

export default function ActiveTimeCard({ mins = 0, target = 60, kcal = "0", dist = "0 km" }) {
  // Ensure numeric values
  const minutes = parseInt(mins, 10) || 0;
  const goal = parseInt(target, 10) || 60;

  // Calculate progress percentage
  const pct = Math.min(100, Math.round((minutes / goal) * 100));

  return (
    <Card
      icon={
        <svg className="w-5 h-5 text-pink-500" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 8v5l4 2" />
        </svg>
      }
      title="Active Time"
      subtitle={`${minutes} / ${goal} mins`}
      right={
        <div className="text-sm text-gray-700">
          {kcal} Kcal <span className="text-gray-400">|</span> {dist}
        </div>
      }
    >
      {/* Progress bar */}
      <div
        className="relative h-10 bg-gray-100 rounded-full overflow-hidden border border-gray-200"
        role="progressbar"
        aria-valuenow={pct}
        aria-valuemin="0"
        aria-valuemax="100"
      >
        <div
          className="absolute left-0 top-0 bottom-0 bg-pink-400 transition-all duration-500 ease-out"
          style={{ width: `${pct}%` }}
        />
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <span
            className={`text-sm font-semibold select-none ${
              pct > 15 ? "text-white" : "text-gray-700"
            }`}
          >
            {pct}% ({minutes} mins)
          </span>
        </div>
      </div>
    </Card>
  );
}