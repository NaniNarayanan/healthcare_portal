import React from "react";
import Card from "./Cards";

const SleepBar = ({ segments = ["#49d199", "#ffcd3c", "#f08aa6", "#6aa8ff"] }) => (
  <div className="flex items-center space-x-1">
    {segments.map((c, i) => (
      <div key={i} style={{ background: c }} className={`h-3 rounded-full ${i === 0 ? "w-8" : "w-4"}`} />
    ))}
  </div>
);

export default function SleepCard({ hours = 6, mins = 30, start = "11:30 pm", end = "06:00 am" }) {
  return (
    <Card
      icon={
        <svg className="w-5 h-5 text-yellow-400" viewBox="0 0 24 24" fill="currentColor">
          <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
        </svg>
      }
      title="Sleep"
      subtitle={`${start} - ${end}`}
      right={<SleepBar />}
    >
      <div className="text-2xl font-semibold text-gray-900">{hours} hrs {mins} mins</div>
    </Card>
  );
}