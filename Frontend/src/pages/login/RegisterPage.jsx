import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { apiFetch } from '../../utils/api'; 
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
            alert(error.message || 'Could not connect to the server.');
        }
    };

   return (
        <div className="auth-page-wrapper">
            <div className="auth-card">
                <div className="auth-header">
                    <h3>Create Account</h3>
                    <p>Start saving lives as a {role}</p>
                </div>

                <form className="auth-form" onSubmit={handleRegister}>
                    <div className="field">
                        <label>Join As</label>
                        <select className="auth-input" value={role} onChange={(e) => setRole(e.target.value)}>
                            <option value="donor">Donor</option>
                            <option value="hospital">Hospital</option>
                        </select>
                    </div>

                    <div className="field">
                        <label>Full Name</label>
                        <input className="auth-input" type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                    </div>

                    <div className="field">
                        <label>Email Address</label>
                        <input className="auth-input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>

                    {role === 'donor' && (
                        <div className="field">
                            <label>Blood Group</label>
                            <select className="auth-input" value={blood_group} onChange={(e) => setBloodGroup(e.target.value)}>
                                {['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'].map(bg => (
                                    <option key={bg} value={bg}>{bg}</option>
                                ))}
                            </select>
                        </div>
                    )}

                    <div className="field">
                        <label>Password</label>
                        <input className="auth-input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </div>

                    <div className="field">
                        <label>Confirm Password</label>
                        <input className="auth-input" type="password" value={confirm_password} onChange={(e) => setConfirmPassword(e.target.value)} required />
                    </div>

                    <button type="submit" className="auth-button">Register Now</button>
                </form>

                <div className="auth-meta">
                    <p>Already have an account? <Link to="/login">Login</Link></p>
                </div>
            </div>
        </div>
    );
}