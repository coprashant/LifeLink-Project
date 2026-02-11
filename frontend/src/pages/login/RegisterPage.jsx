import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
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
            const response = await axios.post(
                '/api/auth/register',
                {
                    role,
                    name,
                    email,
                    blood_group,
                    password,
                    confirm_password
                },
                {
                    withCredentials: true
                }
            );

            const data = response.data;

            if (data.success) {
                alert(data.message);
                navigate('/login');
            } else {
                alert(data.message || 'Registration failed');
            }

        } catch (error) {
            console.error('Error during registration:', error);
            alert(
                error.response?.data?.message || 
                'Could not connect to the server.'
            );
        }
    };

    return (
        <div className="auth-page-wrapper">
            <div className="card">
                <div className="logo">🩸</div>
                <h3 className="header1">Create Account</h3>
                <p className="header2">Join Lifesave as a donor</p>

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
                            <option value="admin">Admin</option>
                            <option value="hospital">Hospital</option>
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

                    <div className="field">
                        <label className="labels">Blood Group</label>
                        <select
                            className="login-input"
                            value={blood_group}
                            onChange={(e) => setBloodGroup(e.target.value)}
                            required
                        >
                            <option value="A+">A+</option>
                            <option value="A-">A-</option>
                            <option value="B+">B+</option>
                            <option value="B-">B-</option>
                            <option value="O+">O+</option>
                            <option value="O-">O-</option>
                            <option value="AB+">AB+</option>
                            <option value="AB-">AB-</option>
                        </select>
                    </div>

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
