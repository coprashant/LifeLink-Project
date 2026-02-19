import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, X, LayoutDashboard } from 'lucide-react';
import { handleLogout } from '../../utils/api';
import './Navbar.css';

export function Navbar({ user, setUser }) {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState("");
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    const handleSearch = (e) => {
        e.preventDefault();
        if (!searchTerm.trim()) return;
        setIsSearchOpen(false);
    };

    const getDashboardPath = () => {
        if (user?.role === 'admin') return '/admin/dashboard';
        if (user?.role === 'hospital') return '/hospital/dashboard';
        return '/'; 
    };

    return (
        <nav className="main-navbar">
    <div className="nav-content">
        <Link to="/" className="nav-logo">🩸 LifeLink</Link>

        <form className={`nav-search ${isSearchOpen ? 'active' : ''}`} onSubmit={handleSearch}>
            <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button type="button" className="mobile-close-btn" onClick={() => setIsSearchOpen(false)}>
                <X size={20} />
            </button>
            <button type="submit" className="search-submit-btn">
                <Search size={18} />
            </button>
        </form>

        <div className={`nav-links ${isSearchOpen ? 'search-active' : ''}`}>
            <button className="mobile-search-trigger" onClick={() => setIsSearchOpen(true)}>
                <Search size={22} />
            </button>
            
            {user ? (
                <>
                    <Link to={getDashboardPath()} className="btn-dashboard-link">
                            <LayoutDashboard size={18} />
                            <span>Dashboard</span>
                    </Link>
                    <span className="user-welcome">{(user?.name || "User").split(' ')[0]}</span>
                    <button className="btn-outline-sm" onClick={() => handleLogout(setUser, navigate)}>Logout</button>
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