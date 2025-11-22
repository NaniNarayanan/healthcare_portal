import Sidebar from "../components/Sidebar";
import DashboardPanel from "../components/DashboardPanel";

export default function Dashboard() {
  return (
    <div className="flex">
      <Sidebar />
      <DashboardPanel />
    </div>
  );
}