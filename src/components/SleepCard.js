import React from "react";
import Card from "./Cards";


function parseTimeToMinutes(t) {
  if (!t || typeof t !== "string") return null;
  const m = t.trim().toLowerCase();
  const re = /^(\d{1,2})(?::(\d{2}))?\s*(am|pm)$/;
  const match = m.match(re);
  if (!match) return null;
  let hour = parseInt(match[1], 10);
  const minute = parseInt(match[2] || "0", 10);
  const period = match[3]; // am or pm
  if (hour === 12) hour = 0; // 12am -> 0, 12pm handled below
  if (period === "pm") hour += 12;
  return hour * 60 + minute;
}

// compute difference in hours/minutes, handling overnight spans
function durationBetween(startStr, endStr) {
  const start = parseTimeToMinutes(startStr);
  const end = parseTimeToMinutes(endStr);
  if (start === null || end === null) return { hours: 0, mins: 0 };
  const totalMinutes = (end - start + 24 * 60) % (24 * 60);
  // if same time treat as 24h
  const minutes = totalMinutes === 0 ? 24 * 60 : totalMinutes;
  return { hours: Math.floor(minutes / 60), mins: minutes % 60 };
}
const SleepBar = ({ segments = ["#49d199", "#ffcd3c", "#f08aa6", "#6aa8ff"] }) => (
  <div className="flex items-center space-x-1">
    {segments.map((c, i) => (
      <div key={i} style={{ background: c }} className={`h-3 rounded-full ${i === 0 ? "w-8" : "w-4"}`} />
    ))}
  </div>
);

export default function SleepCard({start, end }) {
    const computed = durationBetween(start, end);
const displayHours = computed.hours;
  const displayMins = computed.mins;
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
      <div className="text-2xl font-semibold text-gray-900">{displayHours} hrs {displayMins} mins</div>
    </Card>
  );
}