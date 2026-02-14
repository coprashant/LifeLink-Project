import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { apiFetch } from '../../utils/api'; // Import your helper
import './LoginPage.css';

export function RegisterPage() {
    const [role, setRole] = useState('donor');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [blood_group, setBloodGroup] = useState('A+');
    const [password, setPassword] = useState('');
    const [confirm_password, setConfirmPassword] = useState('');

    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();

        if (password !== confirm_password) {
            alert("Passwords do not match!");
            return;
        }

        try {
            // Use apiFetch instead of axios
            const data = await apiFetch('/auth/register', {
                method: 'POST',
                body: JSON.stringify({
                    role,
                    name,
                    email,
                    blood_group,
                    password,
                    confirm_password
                })
            });

            if (data.success) {
                alert(data.message || "Registration successful!");
                navigate('/login');
            }
        } catch (error) {
            console.error('Error during registration:', error);
            // apiFetch throws the error message from the server automatically
            alert(error.message || 'Could not connect to the server.');
        }
    };

    return (
        <div className="auth-page-wrapper">
            <div className="card">
                <div className="logo">🩸</div>
                <h3 className="header1">Create Account</h3>
                <p className="header2">Join Lifesave as a {role}</p>

                <form onSubmit={handleRegister}>
                    <div className="field">
                        <label className="labels">Register As</label>
                        <select
                            className="login-input"
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
                        <label className="labels">Full Name</label>
                        <input
                            className="login-input"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>

                    <div className="field">
                        <label className="labels">Email Address</label>
                        <input
                            className="login-input"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    {/* Show Blood Group only for Donors */}
                    {role === 'donor' && (
                        <div className="field">
                            <label className="labels">Blood Group</label>
                            <select
                                className="login-input"
                                value={blood_group}
                                onChange={(e) => setBloodGroup(e.target.value)}
                                required
                            >
                                {['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'].map(bg => (
                                    <option key={bg} value={bg}>{bg}</option>
                                ))}
                            </select>
                        </div>
                    )}

                    <div className="field">
                        <label className="labels">Password</label>
                        <input
                            className="login-input"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <div className="field">
                        <label className="labels">Confirm Password</label>
                        <input
                            className="login-input"
                            type="password"
                            value={confirm_password}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button type="submit" className="login-button">
                        Register
                    </button>
                </form>

                <div className="meta">
                    <p>
                        Already have an account?
                        <Link className="register" to="/login"> Login</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}