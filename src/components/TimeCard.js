import React from "react";
import Card from "./Cards";

export default function ActiveTimeCard({ mins = 56, target = 60, kcal = 1712, dist = "1.23km" }) {
  return (
    <Card
      icon={
        <svg className="w-5 h-5 text-pink-500" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 8v5l4 2" />
        </svg>
      }
      title="Active Time"
      subtitle={`${mins} / ${target} mins`}
      right={
        <div className="text-sm text-gray-700">
          {kcal} Kcal <span className="text-gray-400">|</span> {dist}
        </div>
      }
    >
      <div className="text-2xl font-semibold text-gray-900">{mins}</div>
      <div className="text-sm text-gray-400">minutes</div>
    </Card>
  );
}