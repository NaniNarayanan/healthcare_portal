import React from "react";
import Card from "./Cards";

const Sparkline = ({ values = [1, 2, 3, 2, 4, 3, 2] }) => (
  <div className="flex items-end gap-1 h-6">
    {values.map((v, i) => (
      <div
        key={i}
        className={`w-1.5 rounded-sm ${i === values.length - 5 ? "bg-yellow-500" : "bg-gray-300"}`}
        style={{ height: `${6 + v * 6}px` }}
        aria-hidden
      />
    ))}
  </div>
);

export default function StepsCard(props) {
  const pct = Math.min(100, Math.round((props.steps / props.goal) * 100));
  return (
    <Card
      icon={
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M6 13c-.5-2 1-4 3-4s3 2 3 4-1 3-3 3-3-1-3-3z" />
          <path d="M4 8c0-1 1-2 2-2s2 1 2 2-1 2-2 2-2-1-2-2z" opacity="0.9" />
        </svg>
      }
      title="Steps"
      subtitle={`${props.steps.toLocaleString()} / ${props.goal} steps`}
      right={
        <div className="text-xs text-gray-400">
         
          <Sparkline values={props.sparkline} />
        </div>
      }
    >
      <div
        className="relative h-10 bg-gray-100 rounded-full overflow-hidden border border-gray-200"
        role="progressbar"
        aria-valuenow={pct}
        aria-valuemin="0"
        aria-valuemax="100"
      >
        <div className="absolute left-0 top-0 bottom-0 bg-pink-400 transition-all" style={{ width: `${pct}%` }} />
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <span className="text-sm font-semibold text-white select-none">{pct}%</span>
        </div>
      </div>
    </Card>
  );
}