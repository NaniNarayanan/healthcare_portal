import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardLayout from "./layouts/DashboardLayout";
import DashboardHome from "./pages/DashboardHome";
import Goals from "./pages/Goals";
import Messages from "./pages/Messages";
import Logout from "./pages/Logout";
import ProfileInformation from "./component/profileInformation";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashboardLayout />}>
          <Route path="dashboard" element={<DashboardHome />} />
          <Route path="profile" element={<ProfileInformation />} />
          <Route path="goals" element={<Goals />} />
          <Route path="messages" element={<Messages />} />
          <Route path="logout" element={<Logout />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
  
}

export default App;