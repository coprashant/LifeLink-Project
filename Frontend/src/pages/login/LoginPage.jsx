import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { apiFetch } from '../../utils/api';
import './LoginPage.css';

const EyeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
    </svg>
);

const EyeOffIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
        <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
);

const AlertIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
);

const ArrowRightIcon = () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="5" y1="12" x2="19" y2="12" />
        <polyline points="12 5 19 12 12 19" />
    </svg>
);

const HomeIcon = () => (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="15 18 9 12 15 6" />
    </svg>
);

export function LoginPage({ setUser }) {
    const [role, setRole] = useState('donor');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            const data = await apiFetch('/auth/login', {
                method: 'POST',
                body: JSON.stringify({ role, email, password })
            });
            if (data.success) {
                setUser(data.user);
                if (data.user.role === 'admin') navigate('/admin/dashboard');
                else if (data.user.role === 'donor') navigate('/donor/dashboard');
                else if (data.user.role === 'hospital') navigate('/hospital/dashboard');
            }
        } catch (err) {
            setError(err.message || 'Invalid email or password. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-page-wrapper">
            <div className="auth-panel-left">
                <div className="auth-brand">
                    <div className="auth-brand-dot" />
                    <span className="auth-brand-name">LifeLink</span>
                </div>
                <div className="auth-panel-tagline">
                    <h2>Every drop<br />saves a <span>life.</span></h2>
                    <p>Connect donors with hospitals in real time. Join a network built around one mission.</p>
                </div>
                <div className="auth-stats">
                    <div className="auth-stat">
                        <span className="auth-stat-number">12k+</span>
                        <span className="auth-stat-label">Active donors</span>
                    </div>
                    <div className="auth-stat">
                        <span className="auth-stat-number">340</span>
                        <span className="auth-stat-label">Partner hospitals</span>
                    </div>
                    <div className="auth-stat">
                        <span className="auth-stat-number">98k</span>
                        <span className="auth-stat-label">Lives impacted</span>
                    </div>
                </div>
            </div>

            <div className="auth-panel-right">
                <div className="auth-card">
                    <div className="auth-header">
                        <h3>Welcome back</h3>
                        <p>Sign in to continue to your account</p>
                    </div>

                    {error && (
                        <div className="toast toast-error">
                            <AlertIcon />
                            <span>{error}</span>
                        </div>
                    )}

                    <div className="field">
                        <label>Sign in as</label>
                        <div className="role-selector">
                            <button type="button" className={`role-btn ${role === 'donor' ? 'active' : ''}`} onClick={() => setRole('donor')}>Donor</button>
                            <button type="button" className={`role-btn ${role === 'hospital' ? 'active' : ''}`} onClick={() => setRole('hospital')}>Hospital</button>
                            <button type="button" className={`role-btn ${role === 'admin' ? 'active' : ''}`} onClick={() => setRole('admin')}>Admin</button>
                        </div>
                    </div>

                    <form className="auth-form" onSubmit={handleLogin}>
                        <div className="field">
                            <label>Email address</label>
                            <input
                                className="auth-input"
                                type="email"
                                placeholder="name@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div className="field">
                            <label>Password</label>
                            <div className="input-wrapper">
                                <input
                                    className="auth-input"
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <button type="button" className="toggle-password" onClick={() => setShowPassword(!showPassword)}>
                                    {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                                </button>
                            </div>
                        </div>

                        <button type="submit" className="auth-button" disabled={loading}>
                            {loading ? 'Signing in...' : 'Sign in'}
                            {!loading && <ArrowRightIcon />}
                        </button>
                    </form>

                    <div className="auth-meta">
                        <p>New here? <Link to="/register">Create an account</Link></p>
                        <Link className="back-home-link" to="/">
                            <HomeIcon />
                            Back to home
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}