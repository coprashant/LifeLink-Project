import { useState } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { Navbar } from "../layouts/Navbar"; 
import "./AdminDashboard.css"; 

export function AdminLayout({ user, setUser }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const location = useLocation();
    
    // Filter States
    const [filterUrgency, setFilterUrgency] = useState("All");
    const [filterStatus, setFilterStatus] = useState("All");
    const [searchTerm, setSearchTerm] = useState("");

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
                        <NavLink to="/admin/dashboard" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} onClick={() => setSidebarOpen(false)}>
                            📊 Overview (Requests)
                        </NavLink>
                        <NavLink to="/admin/inventory" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} onClick={() => setSidebarOpen(false)}>
                            📦 Blood Inventory
                        </NavLink>
                        <NavLink to="/admin/donors" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} onClick={() => setSidebarOpen(false)}>
                            👥 Donor Management
                        </NavLink>
                        <NavLink to="/admin/appointments" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} onClick={() => setSidebarOpen(false)}>
                            📅 Appointments
                        </NavLink>
                    </nav>

                    {location.pathname === "/admin/dashboard" && (
                        <div className="sidebar-filters">
                            <h4>Quick Filters</h4>
                            <input 
                                type="text" 
                                placeholder="Search..." 
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <select value={filterUrgency} onChange={(e) => setFilterUrgency(e.target.value)}>
                                <option value="All">All Urgency</option>
                                <option value="Critical">Critical</option>
                                <option value="Urgent">Urgent</option>
                                <option value="Normal">Normal</option>
                            </select>
                            <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
                                <option value="All">All Status</option>
                                <option value="pending">Pending</option>
                                <option value="fulfilled">Fulfilled</option>
                            </select>
                        </div>
                    )}
                </aside>

                {sidebarOpen && <div className="sidebar-overlay" onClick={toggleSidebar}></div>}

                <main className="content">
                    <div className="fade-in">
                        <Outlet context={{ filterUrgency, filterStatus, searchTerm }} />
                    </div>
                </main>
            </div> 
        </div>
    );
}