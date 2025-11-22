/* eslint-disable import/first */

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";

//Private Route
const PrivateRoute = lazy(()=>import("../routes/PrivateRoute"))

// Lazy load all route components
//const MainLayout = lazy(() => import("../templates/layout/MainLayout"));
//const DashboardLayout = lazy(() => import("../templates/layout/DashboardLayout"));

// Loading fallback component
const Loader = () => <div className="p-4 text-center">Loading...</div>;

import MainLayout from "../templates/layout/MainLayout";
import DashboardLayout from "../templates/layout/DashboardLayout";

const Home = lazy(() => import("../pages/Home"));
const HealthTopics = lazy(() => import("../pages/HealthTopics"));
const Services = lazy(() => import("../pages/Services"));
const Login = lazy(() => import("../pages/Login"));
const Dashboard = lazy(() => import("../pages/Dashboard"));

function Approutes(){
    return(
        <>
        <BrowserRouter>
            <Suspense fallback={<Loader />}>
                { /* Public Routes*/}
                <Routes>
                    <Route path="/" element={<MainLayout />}>
                        <Route index element={<Home />} /> {/* Default Home page */}
                        <Route path="services" element={<Services />} />
                        <Route path="healthtopics" element={<HealthTopics />} />
                        <Route path="login" element={<Login />} />
                     </Route>
                     <Route element={<PrivateRoute allowedRoles={["admin", "user", "provider"]} />}>
                        <Route path="dashboard" element={<DashboardLayout />}>
                            <Route index element={<Dashboard />} /> {/* Default dashboard page */}
                            {/* <Route path="profile" element={<Profile />} />
                            <Route path="settings" element={<Settings />} /> -->*/}
                        </Route>
                    </Route>
                </Routes>
            </Suspense>
        </BrowserRouter>
        </>
    )
}

export default Approutes;
