// src/layouts/DashboardLayout.jsx
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";

export default function DashboardLayout() {
  return (
    <div className="flex flex-col md:flex-row">
      <Sidebar />
      <div className="flex-1 md:ml-64 p-4 md:p-8 bg-gray-50 min-h-screen">
        <Outlet /> {/* This is where page-specific content will render */}
      </div>
    </div>
  );
}