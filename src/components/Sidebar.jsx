export default function Sidebar() {
  return (
    <div className="w-64 h-screen bg-blue-900 text-white p-6">
      <h2 className="text-xl font-bold mb-6">Health</h2>
      <ul className="space-y-4">
        <li>Dashboard</li>
        <li>My Profile</li>
        <li>Wellness Goals</li>
        <li>Messages</li>
        <li>Logout</li>
      </ul>
    </div>
  );
}