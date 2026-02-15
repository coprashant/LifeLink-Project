// Updated AdminLayout.jsx
import { NavLink, Outlet } from "react-router-dom";
import { Navbar } from "../layouts/Navbar"; // Keep this for the top bar
import "./AdminDashboard.css"; 

export function AdminLayout({ user, setUser }) {
    return (
        <div className="admin-page-structure">
            {/* The Logout button lives here inside Navbar */}
            <Navbar user={user} setUser={setUser} />
            
            <div className="admin-body-wrapper">
                <aside className="sidebar">
                    
                    <nav className="nav-menu">
                        <NavLink to="/admin/dashboard" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                            📊 Overview (Requests)
                        </NavLink>
                        <NavLink to="/admin/inventory" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                            📦 Blood Inventory
                        </NavLink>
                        <NavLink to="/admin/donors" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                            👥 Donor Management
                        </NavLink>
                    </nav>

                    {/* Sidebar Footer Removed - Logout is now only in the Top Navbar */}
                </aside>

                <main className="content">
                    <div className="fade-in">
                        <Outlet />
                    </div>
                </main>
            </div> 
        </div>
    );
}