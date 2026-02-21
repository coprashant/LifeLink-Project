import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';

export function MainLayout({ user, setUser }) {
    return (
        <div className="app-wrapper">
            <Navbar user={user} setUser={setUser} />
            <main className="main-content">
                <Outlet /> 
            </main>
        </div>
    );
}