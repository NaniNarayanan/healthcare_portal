// src/components/WellnessLogger.jsx
import { useState } from "react";

export default function WellnessLogger({ onSubmit }) {
  const [steps, setSteps] = useState("");
  const [activeTime, setActiveTime] = useState("");
  const [sleep, setSleep] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ steps, activeTime, sleep });
    setSteps("");
    setActiveTime("");
    setSleep("");
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow space-y-4">
      <h2 className="text-lg font-semibold">Log Your Wellness</h2>

      <div>
        <label className="block text-sm font-medium">Steps</label>
        <input
          type="number"
          value={steps}
          onChange={(e) => setSteps(e.target.value)}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          placeholder="Enter steps walked"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Active Time (mins)</label>
        <input
          type="number"
          value={activeTime}
          onChange={(e) => setActiveTime(e.target.value)}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          placeholder="Enter active minutes"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Sleep Duration (hrs)</label>
        <input
          type="text"
          value={sleep}
          onChange={(e) => setSleep(e.target.value)}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          placeholder="e.g. 6 hr 30 mins"
        />
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Submit
      </button>
    </form>
  );
}