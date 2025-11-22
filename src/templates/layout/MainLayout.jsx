import { Outlet } from 'react-router-dom';
import MainHeader from '../main/Header';

export function MainLayout() {
    return (
        <div>
            <MainHeader />
            <main class="max-w-4xl mx-auto mt-10 p-4">
                <Outlet />  {/* nested routes render here */}
            </main>
        </div>
    );
}

export default MainLayout;