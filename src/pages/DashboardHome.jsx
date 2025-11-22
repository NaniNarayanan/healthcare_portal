import ProviderDashboard from "../components/ProviderDashboard";

import patients from "../data/patients.json";
import StepsCard from "../components/StepCard";
import ActiveTimeCard from "../components/TimeCard";
import SleepCard from "../components/SleepCard";
export default function DashboardHome() {
  const role = "provider"; //patient or provider

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
         {role === "provider" ? (
           <ProviderDashboard />
         ) : (
       <div className="space-y-6">
         <h1 className="text-2xl font-bold">Welcome, {patient.name}</h1>
   
         {/* Wellness Goals */}
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <StepsCard steps={3620} goal={6000} />
       <ActiveTimeCard mins={56} target={60} kcal={1712} dist={"1.23km"} />
        <SleepCard hours={6} mins={30} start="11:30 pm" end="06:00 am" />
   
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
       )}
       </div>
  );
}