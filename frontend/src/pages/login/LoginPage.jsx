import { Link } from 'react-router-dom';
import './LoginPage.css';

export function LoginPage() {
    return (
        <div className="auth-page-wrapper ">
            <div className="card">

                <div className="logo">🩸</div>
                <h3 className="header1">Welcome Back</h3>
                <p className="header2">Please enter your details to login</p>

                <form action="/login" method="post">

                    <div className="field">
                        <label className="labels">Login As</label>
                        <select className="login-input" name="role" required>
                            <option value="donor">Donor</option>
                            <option value="admin">Admin</option>
                            <option value="hospital">Hospital</option>
                        </select>
                    </div>

                    <div className="field">
                        <label className="labels">Email Address</label>
                        <input className="login-input" type="email" name="email"
                            placeholder="name@email.com" required />
                    </div>

                    <div className="field">
                        <label className="labels">Password</label>
                        <input className="login-input" type="password" name="password"
                            placeholder="••••••••" required />
                    </div>

                    <button type="submit" className="login-button">Login</button>
                </form>

                <div className="meta">
                    <p>
                        New donor?
                        <Link className="register" to="/register">Register here</Link>
                    </p>
                    <p>
                        <Link className="back-home" to="/">← Back to Home</Link>
                    </p>
                </div>

            </div>
        </div>

    );
}