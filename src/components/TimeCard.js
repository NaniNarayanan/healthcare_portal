import React from "react";
import Card from "./Cards";

export default function ActiveTimeCard(props) {
  return (
    <Card
      icon={
        <svg className="w-5 h-5 text-pink-500" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 8v5l4 2" />
        </svg>
      }
      title="Active Time"
      subtitle={`${props.mins} / ${props.target} mins`}
      right={
        <div className="text-sm text-gray-700">
          {props.kcal} Kcal <span className="text-gray-400">|</span> {props.dist}
        </div>
      }
    >
      <div className="text-2xl font-semibold text-gray-900">{props.mins}</div>
      <div className="text-sm text-gray-400">minutes</div>
    </Card>
  );
}