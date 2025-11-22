import { useState, useEffect } from "react";

// Alert component with dismiss option
function Alert({ type = "info", message, onClose }) {
  const styles = {
    success: "bg-green-100 border-green-300 text-green-800",
    error: "bg-red-100 border-red-300 text-red-800",
    info: "bg-blue-100 border-blue-300 text-blue-800",
  }[type];

  return (
    <div className={`flex items-center justify-between border rounded-md p-3 ${styles}`}>
      <span className="text-sm font-medium">{message}</span>
      <button
        type="button"
        onClick={() => onClose()}
        className="text-xs font-semibold underline hover:text-gray-700"
      >
        ×
      </button>
    </div>
  );
}

export default function WellnessLogger({ onSubmit }) {
  const [steps, setSteps] = useState("");
  const [activeTime, setActiveTime] = useState("");
  const [sleepStart, setSleepStart] = useState("");
  const [sleepEnd, setSleepEnd] = useState("");
  const [alert, setAlert] = useState(null);

  // Auto-hide alerts after 4 seconds
  useEffect(() => {
    if (!alert) return;
    const timer = setTimeout(() => setAlert(null), 4000);
    return () => clearTimeout(timer);
  }, [alert]);

  const calculateDuration = (start, end) => {
    try {
      const startDate = new Date(`1970-01-01T${start}`);
      const endDate = new Date(`1970-01-01T${end}`);
      if (endDate < startDate) {
        // handle overnight sleep (e.g., 11:00 PM to 06:00 AM)
        endDate.setDate(endDate.getDate() + 1);
      }
      const diffMs = endDate - startDate;
      const hours = Math.floor(diffMs / (1000 * 60 * 60));
      const mins = Math.floor((diffMs / (1000 * 60)) % 60);
      return `${hours} hr ${mins} mins`;
    } catch {
      return null;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setAlert(null);

    // Validation
    if (!steps || !activeTime || !sleepStart || !sleepEnd) {
      setAlert({ type: "error", message: "All fields are required." });
      return;
    }

    if (isNaN(steps) || steps < 0 || steps > 50000) {
      setAlert({ type: "error", message: "Steps must be between 0 and 50,000." });
      return;
    }

    if (isNaN(activeTime) || activeTime < 0 || activeTime > 300) {
      setAlert({ type: "error", message: "Active time must be between 0 and 300 minutes." });
      return;
    }

    const duration = calculateDuration(sleepStart, sleepEnd);
    if (!duration) {
      setAlert({ type: "error", message: "Invalid sleep times. Please use HH:MM format." });
      return;
    }

    // Submit
    onSubmit({ steps, activeTime, sleep: duration, sleepStart, sleepEnd });
    setSteps("");
    setActiveTime("");
    setSleepStart("");
    setSleepEnd("");
    setAlert({ type: "success", message: "Wellness data logged successfully." });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow-md space-y-5"
    >
      <h2 className="text-xl font-semibold text-gray-800">Log Your Wellness</h2>

      {alert && (
        <Alert
          type={alert.type}
          message={alert.message}
          onClose={() => setAlert(null)}
        />
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Steps */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Steps</label>
          <input
            type="number"
            value={steps}
            onChange={(e) => setSteps(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter steps walked"
          />
          <p className="text-xs text-gray-500 mt-1">Typical: 0 – 20,000</p>
        </div>

        {/* Active Time */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Active Time (mins)</label>
          <input
            type="number"
            value={activeTime}
            onChange={(e) => setActiveTime(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter active minutes"
          />
          <p className="text-xs text-gray-500 mt-1">Typical: 0 – 120</p>
        </div>
      </div>

      {/* Sleep Start & End */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Sleep Start</label>
          <input
            type="time"
            value={sleepStart}
            onChange={(e) => setSleepStart(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Sleep End</label>
          <input
            type="time"
            value={sleepEnd}
            onChange={(e) => setSleepEnd(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          type="submit"
          className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition-colors shadow-sm"
        >
          Submit
        </button>
        <span className="text-xs text-gray-500">
          Keep inputs realistic for better insights.
        </span>
      </div>
    </form>
  );
}