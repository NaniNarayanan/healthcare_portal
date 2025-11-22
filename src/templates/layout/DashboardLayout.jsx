import { Outlet } from 'react-router-dom';
//import DashboardSidebar from '../dashboard/Sidebar';

export function DashboardLayout() {
    return (
        <div className="flex min-h-screen">
            <section className="flex-1 p-6">
                <Outlet />  {/* dashboard nested routes render here */}
            </section>
        </div>
    );
}

export default DashboardLayout;