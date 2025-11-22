import { usePatient } from "../context/PatientContext";
import StepsCard from "../components/StepCard";
import ActiveTimeCard from "../components/TimeCard";
import SleepCard from "../components/SleepCard";
import ProviderDashboard from "../components/ProviderDashboard";
export default function DashboardHome() {
  const { patient } = usePatient();

  // const patient = patients[0]; // Simulate logged-in user
  const role = "user"; //patient or provider
  return (
    <div>
         {role === "provider" ? (
           <ProviderDashboard />
         ) : (
        <div className="space-y-6">
          <h1 className="text-2xl font-bold">Welcome, {patient.name}</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <StepsCard steps={patient.goals.steps} goal={patient.goals.targetSteps} />
        <ActiveTimeCard
          mins={patient.goals.activeTime}
          target={60}
          kcal={patient.goals.calories}
          dist={patient.goals.distance}
        />
        <SleepCard
          hours={patient.goals.sleep}
          start={patient.goals.sleepStart}
          end={patient.goals.sleepEnd}
        />
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
         )};
    </div>
  );
}