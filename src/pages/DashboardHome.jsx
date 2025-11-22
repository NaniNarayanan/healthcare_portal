export default function DashboardHome() {
  const patient = {
    name: "David",
    goals: {
      steps: 3620,
      targetSteps: 6000,
      activeTime: "56 / 60 mins",
      calories: "1712 Kcal",
      distance: "1.23 km",
      sleep: "6 hr 30 mins",
      sleepTime: "11:30 pm – 06:00 am",
    },
    reminder: "Annual blood test on 23rd Jan 2025",
    tip: "Stay hydrated! Aim to drink at least 8 glasses of water per day.",
  };

  const progressPercent = Math.round((patient.goals.steps / patient.goals.targetSteps) * 100);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Welcome, {patient.name}</h1>

      {/* Wellness Goals */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Steps */}
        <div className="bg-white p-4 rounded shadow">
          <h2 className="font-semibold mb-2">Steps</h2>
          <p>{patient.goals.steps} / {patient.goals.targetSteps} steps</p>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
            <div
              className="bg-blue-600 h-2 rounded-full"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
          <p className="text-sm mt-1">{progressPercent}%</p>
        </div>

        {/* Active Time */}
        <div className="bg-white p-4 rounded shadow">
          <h2 className="font-semibold mb-2">Active Time</h2>
          <p>{patient.goals.activeTime}</p>
          <p className="text-sm text-gray-600">{patient.goals.calories} | {patient.goals.distance}</p>
        </div>

        {/* Sleep */}
        <div className="bg-white p-4 rounded shadow">
          <h2 className="font-semibold mb-2">Sleep</h2>
          <p>{patient.goals.sleep}</p>
          <p className="text-sm text-gray-600">{patient.goals.sleepTime}</p>
        </div>
      </div>

      {/* Preventive Care Reminder */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="font-semibold mb-2">Preventive Care Reminder</h2>
        <p>Upcoming: {patient.reminder}</p>
      </div>

      {/* Health Tip */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="font-semibold mb-2">Health Tip of the Day</h2>
        <p>{patient.tip}</p>
      </div>
    </div>
  );
}