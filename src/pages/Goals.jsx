import WellnessLogger from "../components/WellnessLogger";
import { usePatient } from "../context/PatientContext";

export default function Goals() {
  const { patient, setPatient } = usePatient();

  const handleLog = ({ steps, activeTime, sleep, sleepStart, sleepEnd }) => {
    setPatient((prev) => ({
      ...prev,
      goals: {
        ...prev.goals,
        steps: parseInt(steps),
        activeTime: parseInt(activeTime),
        sleep,
        sleepStart,
        sleepEnd,
      },
    }));
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Wellness Goals</h1>
      <WellnessLogger onSubmit={handleLog} />
    </div>
  );
}