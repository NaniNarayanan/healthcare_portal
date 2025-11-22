import { useState } from "react";
import { useLocation, Link } from "react-router-dom";

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

const navLinks = [
  { name: "Dashboard", path: "/dashboard" },
  { name: "My Profile", path: "/profile" },
  { name: "Wellness Goals", path: "/goals" },
  { name: "Messages", path: "/messages" },
  { name: "Logout", path: "/logout" },
];

  return (
    <div className="md:w-64 w-full md:h-screen bg-blue-900 text-white p-4 md:p-6 flex flex-col md:fixed md:left-0 md:top-0 z-10">
      {/* Logo + Toggle */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <img src="/healthcare.png" alt="PVG Logo" className="w-8 h-8" />
          <h2 className="text-xl font-bold">Health</h2>
        </div>
        <button
          className="md:hidden text-white"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>
      </div>

      {/* Navigation */}
      <ul className={`space-y-4 text-sm ${open ? "block" : "hidden"} md:block`}>
        {navLinks.map((link) => (
          <li key={link.name}>
            <Link
              to={link.path}
              className={`block px-2 py-1 rounded ${
                location.pathname === link.path
                  ? "bg-yellow-300 text-blue-900 font-semibold"
                  : "hover:text-blue-300"
              }`}
            >
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}