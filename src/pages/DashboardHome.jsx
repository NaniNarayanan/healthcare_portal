import { usePatient } from "../context/PatientContext";
import StepsCard from "../components/StepCard";
import ActiveTimeCard from "../components/TimeCard";
import SleepCard from "../components/SleepCard";

export default function DashboardHome() {
  const { patient } = usePatient();

  return (
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
    </div>
  );
}