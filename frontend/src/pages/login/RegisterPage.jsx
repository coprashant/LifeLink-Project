import { Link } from 'react-router-dom';
import './LoginPage.css';

export function RegisterPage() {
    return (
        <div className="auth-page-wrapper ">
            <div className="card">

                <div className="logo">🩸</div>
                <h3 className="header1">Create Account</h3>
                <p className="header2">Join Lifesave as a donor</p>

                <form action="/register" method="post">

                    
                    <div className="field">
                        <label className="labels">Register As </label>
                        <select className="login-input" name="role" required>
                            <option value="donor">Donor</option>
                            <option value="admin">Admin</option>
                            <option value="hospital">Hospital</option>
                        </select>
                    </div>

                    <div className="field">
                        <label className="labels">Full Name</label>
                        <input className="login-input" type="text" name="name" required />
                    </div>

                    <div className="field">
                        <label className="labels">Email Address</label>
                        <input className="login-input" type="email" name="email" required />
                    </div>

                    <div className="field">
                        <label className="labels">Blood Group</label>
                        <select className="login-input" name="blood_group" required>
                            <option>A+</option>
                            <option>A-</option>
                            <option>B+</option>
                            <option>B-</option>
                            <option>O+</option>
                            <option>O-</option>
                            <option>AB+</option>
                            <option>AB-</option>
                        </select>
                    </div>

                    <div className="field">
                        <label className="labels">Password</label>
                        <input className="login-input" type="password" name="password" required />
                    </div>

                    <div className="field">
                        <label className="labels">Confirm Password</label>
                        <input className="login-input" type="password" name="confirm_password" required />
                    </div>

                    <button type="submit" className="login-button">Register</button>
                </form>

                <div className="meta">
                    <p>
                        Already have an account?
                        <Link className="register" to="/login">Login</Link>
                    </p>
                </div>

            </div>
        </div>

    );
}