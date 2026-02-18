import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { handleLogout } from '../../utils/api';
import './Navbar.css';

export function Navbar({ user, setUser }) {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearch = (e) => {
        e.preventDefault();
        if (!searchTerm.trim()) return;
        console.log("Searching for:", searchTerm);
    };

    const getDashboardPath = () => {
        if (!user) return "/";
        switch (user.role) {
            case 'admin': return "/admin/dashboard";
            case 'donor': return "/donor/dashboard";
            case 'hospital': return "/hospital/dashboard";
            default: return "/";
        }
    };

    return (
        <nav className="main-navbar">
            <div className="nav-content">
                <Link to="/" className="nav-logo">🩸 LifeLink</Link>

                <form className="nav-search" onSubmit={handleSearch}>
                    <input
                        type="text"
                        placeholder="Search blood groups..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button type="submit" className="search-icon-btn">🔍</button>
                </form>

                <div className="nav-links">
                    {user ? (
                        <>
                            {/* <Link to={getDashboardPath()} className="btn-link">Dashboard</Link> */}
                            <span className="user-welcome">
                                {(user?.name || user?.username || user?.role || "User").split(' ')[0]}
                            </span>
                            <button
                                className="btn-outline-sm"
                                onClick={() => handleLogout(setUser, navigate)}
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link className="btn-link" to="/login">Login</Link>
                            <Link className="btn-danger-sm" to="/register">Register</Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}