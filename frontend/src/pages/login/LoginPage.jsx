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
            <div className="card">
                <div className="logo">🩸</div>
                <h3 className="header1">Welcome Back</h3>
                <p className="header2">Please enter your details to login</p>

                <form onSubmit={handleLogin}>
                    <div className="field">
                        <label className="labels">Login As</label>
                        <select
                            className="login-input"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            required
                        >
                            <option value="donor">Donor</option>
                            <option value="admin">Admin</option>
                            <option value="hospital">Hospital</option>
                        </select>
                    </div>

                    <div className="field">
                        <label className="labels">Email Address</label>
                        <input
                            className="login-input"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="name@email.com"
                            required
                        />
                    </div>

                    <div className="field">
                        <label className="labels">Password</label>
                        <input
                            className="login-input"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            required
                        />
                    </div>

                    <button type="submit" className="login-button">
                        Login
                    </button>
                </form>

                <div className="meta">
                    <p>New donor? <Link className="register" to="/register">Register here</Link></p>
                    <p><Link className="back-home" to="/">← Back to Home</Link></p>
                </div>
            </div>
        </div>
    );
}
