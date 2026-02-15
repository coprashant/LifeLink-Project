import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { handleLogout } from "../../utils/api";
import "./AdminDashboard.css"; // Use one CSS file for the layout

export function AdminLayout({ setUser }) {
    const navigate = useNavigate();

    return (
        <div className="admin-body-wrapper">
            <aside className="sidebar">
                <div className="sidebar-logo">
                    <span className="logo-text">LifeLink</span>
                </div>
                <nav className="nav-menu">
                    <NavLink to="/admin/dashboard" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                        Dashboard
                    </NavLink>
                    <NavLink to="/admin/inventory" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                        Inventory
                    </NavLink>
                </nav>
                <div className="sidebar-footer">
                    <button onClick={() => handleLogout(setUser, navigate)} className="logout-btn">
                        Logout
                    </button>
                </div>
            </aside>

            <main className="content">
                {/* This Outlet is the "hole" where AdminDashboard or AdminPage will appear */}
                <Outlet />
            </main>
        </div>
    );
}