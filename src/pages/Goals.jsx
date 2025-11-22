import { useState } from "react";
import patients from "../data/patients.json";
import WellnessLogger from "../components/WellnessLogger";

export default function Goals() {
  const [patient, setPatient] = useState(patients[0]);

  const handleLog = ({ steps, activeTime, sleep }) => {
    setPatient((prev) => ({
      ...prev,
      goals: {
        ...prev.goals,
        steps: parseInt(steps),
        activeTime: `${activeTime} / 60 mins`,
        sleep,
      },
    }));
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Wellness Goals</h1>

      {/* Input Form */}
      <WellnessLogger onSubmit={handleLog} />
    </div>
  );
}