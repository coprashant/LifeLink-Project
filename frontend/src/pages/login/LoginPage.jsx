import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './LoginPage.css';
import axios from 'axios';

export function LoginPage() {
    // State for inputs
    const [role, setRole] = useState('donor');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    //  Auto-redirect if already logged in
    useEffect(() => {
        const isLoggedIn = localStorage.getItem('isLoggedIn');
        const savedRole = localStorage.getItem('role');

        if (isLoggedIn === 'true' && savedRole) {
            if (savedRole === 'admin') navigate('/admin-dashboard');
            else if (savedRole === 'donor') navigate('/donor-dashboard');
            else if (savedRole === 'hospital') navigate('/hospital-dashboard');
        }
    }, [navigate]);

    // Login handler
    const handleLogin = async (e) => {
        e.preventDefault(); // prevent page refresh

        try {
            const response = await axios.post(
                '/api/auth/login',
                { role, email, password },
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );

            const data = response.data;

            if (data.success) {
                alert(data.message);

                // Save login info to localStorage
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('role', data.user.role);
                localStorage.setItem('user', JSON.stringify(data.user));

                // Navigate based on role
                if (data.user.role === 'admin') navigate('/admin-dashboard');
                else if (data.user.role === 'donor') navigate('/donor-dashboard');
                else if (data.user.role === 'hospital') navigate('/hospital-dashboard');
            } else {
                alert(data.message || 'Login failed');
            }
        } catch (error) {
            console.error('Error logging in:', error);
            const errorMessage =
                error.response?.data?.message || 'Could not connect to the server.';
            alert(errorMessage);
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
                    <p>
                        New donor?{' '}
                        <Link className="register" to="/register">
                            Register here
                        </Link>
                    </p>
                    <p>
                        <Link className="back-home" to="/">
                            ← Back to Home
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
