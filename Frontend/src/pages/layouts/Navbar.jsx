import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, X } from 'lucide-react';
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

    return (
        <nav className="main-navbar">
    <div className="nav-content">
        <Link to="/" className="nav-logo">🩸 LifeLink</Link>

        {/* This form is the key—it stays in flex flow on desktop */}
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