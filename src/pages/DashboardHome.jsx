import ProviderDashboard from "../components/ProviderDashboard";

export default function DashboardHome() {
  const role = "provider";

   const patient = {
    name: "David",
    goals: {
      steps: 3620,
      targetSteps: 6000,
      activeTime: "56 / 60 mins",
      calories: "1712 Kcal",
      distance: "1.23 km",
      sleep: "6 hr 30 mins",
      sleepTime: "11:30 pm - 06:00 am",
    },
    reminder: "Annual blood test on 23rd Jan 2025",
    tip: "Stay hydrated! Aim to drink at least 8 glasses of water per day.",
  };

  return (
    <div>
     <div>
      {role === "provider" ? (
        <ProviderDashboard />
      ) : (
             
        <div className="md:ml-64 p-4 md:p-8 bg-gray-50 min-h-screen">
          <h1 className="text-2xl font-bold mb-4">Welcome, {patient.name}</h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            <div className="bg-white p-4 rounded shadow">
              <h2 className="font-semibold mb-2">Steps</h2>
              <p>{patient.goals.steps} / {patient.goals.targetSteps} steps</p>
              <p>{Math.round((patient.goals.steps / patient.goals.targetSteps) * 100)}%</p>
            </div>

            <div className="bg-white p-4 rounded shadow">
              <h2 className="font-semibold mb-2">Active Time</h2>
              <p>{patient.goals.activeTime}</p>
              <p>{patient.goals.calories} | {patient.goals.distance}</p>
            </div>

            <div className="bg-white p-4 rounded shadow">
              <h2 className="font-semibold mb-2">Sleep</h2>
              <p>{patient.goals.sleep}</p>
              <p>{patient.goals.sleepTime}</p>
            </div>
          </div>

          <div className="bg-white p-4 rounded shadow mb-4">
            <h2 className="font-semibold mb-2">Preventive Care Reminder</h2>
            <p>Upcoming: {patient.reminder}</p>
          </div>

          <div className="bg-white p-4 rounded shadow">
            <h2 className="font-semibold mb-2">Health Tip of the Day</h2>
            <p>{patient.tip}</p>
          </div>
        </div>

      )}
    </div>
    
    </div>
  );
}