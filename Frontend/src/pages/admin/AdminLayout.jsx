import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { Navbar } from "../layouts/Navbar"; 
import "./AdminDashboard.css"; 

export function AdminLayout({ user, setUser }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

    return (
        <div className="admin-page-structure">
            <Navbar user={user} setUser={setUser} />
            
            <button className="mobile-toggle" onClick={toggleSidebar}>
                {sidebarOpen ? "✕" : "☰"}
            </button>

            <div className="admin-body-wrapper">
                <aside className={`sidebar ${sidebarOpen ? "open" : ""}`}>
                    <nav className="nav-menu">
                        <NavLink 
                            to="/admin/dashboard" 
                            className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
                            onClick={() => setSidebarOpen(false)}
                        >
                            📊 Overview (Requests)
                        </NavLink>
                        <NavLink 
                            to="/admin/inventory" 
                            className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
                            onClick={() => setSidebarOpen(false)}
                        >
                            📦 Blood Inventory
                        </NavLink>
                        <NavLink 
                            to="/admin/donors" 
                            className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
                            onClick={() => setSidebarOpen(false)}
                        >
                            👥 Donor Management
                        </NavLink>
                    </nav>
                </aside>

                {sidebarOpen && <div className="sidebar-overlay" onClick={toggleSidebar}></div>}

                <main className="content">
                    <div className="fade-in">
                        <Outlet />
                    </div>
                </main>
            </div> 
        </div>
    );
}