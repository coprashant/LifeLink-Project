import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { apiFetch } from '../../utils/api'; // Import your helper
import './LoginPage.css';

// Accept setUser as a prop from App.jsx
export function LoginPage({ setUser }) { 
    const [role, setRole] = useState('donor');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

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
        } catch (error) {
            console.error('Login error:', error);
            alert(error.message || 'Login failed');
        }
    };

    return (
        <div className="auth-page-wrapper">
            <div className="auth-card">
                <div className="auth-header">
                    <h3>Welcome Back</h3>
                    <p>Enter your details to access your account</p>
                </div>

                <form className="auth-form" onSubmit={handleLogin}>
                    <div className="field">
                        <label>Login As</label>
                        <select
                            className="auth-input"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            required
                        >
                            <option value="donor">Donor</option>
                            <option value="hospital">Hospital</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>

                    <div className="field">
                        <label>Email Address</label>
                        <input
                            className="auth-input"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="name@company.com"
                            required
                        />
                    </div>

                    <div className="field">
                        <label>Password</label>
                        <input
                            className="auth-input"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            required
                        />
                    </div>

                    <button type="submit" className="auth-button">
                        Sign In
                    </button>
                </form>

                <div className="auth-meta">
                    <p>New here? <Link to="/register">Create an account</Link></p>
                    <Link className="back-home-link" to="/">← Back to Home</Link>
                </div>
            </div>
        </div>
    );
}