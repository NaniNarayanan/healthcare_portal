import React from "react";
import Card from "./Cards";

// Converts "23:00" or "07:30" to minutes since midnight
function parseTimeToMinutes(t) {
  if (!t || typeof t !== "string") return null;
  const [hourStr, minStr] = t.split(":");
  const hour = parseInt(hourStr, 10);
  const minute = parseInt(minStr || "0", 10);
  if (isNaN(hour) || isNaN(minute)) return null;
  return hour * 60 + minute;
}

// Computes duration between start and end, handling overnight spans
function durationBetween(startStr, endStr) {
  const start = parseTimeToMinutes(startStr);
  const end = parseTimeToMinutes(endStr);
  if (start === null || end === null) return { hours: 0, mins: 0 };
  const totalMinutes = (end - start + 1440) % 1440;
  const minutes = totalMinutes === 0 ? 1440 : totalMinutes;
  return { hours: Math.floor(minutes / 60), mins: minutes % 60 };
}

const SleepBar = ({ segments = ["#49d199", "#ffcd3c", "#f08aa6", "#6aa8ff"] }) => (
  <div className="flex items-center space-x-1">
    {segments.map((c, i) => (
      <div
        key={i}
        style={{ background: c }}
        className={`h-3 rounded-full ${i === 0 ? "w-8" : "w-4"}`}
      />
    ))}
  </div>
);

export default function SleepCard({ start, end, goal = 8 }) {
  const { hours, mins } = durationBetween(start, end);
  const totalHours = hours + mins / 60;
  const pct = Math.min(100, Math.round((totalHours / goal) * 100));

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
      <div
        className="relative h-10 bg-gray-100 rounded-full overflow-hidden border border-gray-200"
        role="progressbar"
        aria-valuenow={pct}
        aria-valuemin="0"
        aria-valuemax="100"
      >
        <div
          className="absolute left-0 top-0 bottom-0 bg-blue-400 transition-all duration-500 ease-out"
          style={{ width: `${pct}%` }}
        />
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <span
            className={`text-sm font-semibold select-none ${
              pct > 15 ? "text-white" : "text-gray-700"
            }`}
          >
            {hours} hrs {mins} mins ({pct}% of goal)
          </span>
        </div>
      </div>
    </Card>
  );
}