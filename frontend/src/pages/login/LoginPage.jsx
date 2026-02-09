//Old Code replaced by the new version below:

// import { Link } from 'react-router-dom';
// import './LoginPage.css';

// export function LoginPage() {
//     return (
//         <div className="auth-page-wrapper ">
//             <div className="card">

//                 <div className="logo">🩸</div>
//                 <h3 className="header1">Welcome Back</h3>
//                 <p className="header2">Please enter your details to login</p>

//                 <form action="/login" method="post">

//                     <div className="field">
//                         <label className="labels">Login As</label>
//                         <select className="login-input" name="role" required>
//                             <option value="donor">Donor</option>
//                             <option value="admin">Admin</option>
//                             <option value="hospital">Hospital</option>
//                         </select>
//                     </div>

//                     <div className="field">
//                         <label className="labels">Email Address</label>
//                         <input className="login-input" type="email" name="email"
//                             placeholder="name@email.com" required />
//                     </div>

//                     <div className="field">
//                         <label className="labels">Password</label>
//                         <input className="login-input" type="password" name="password"
//                             placeholder="••••••••" required />
//                     </div>

//                     <button type="submit" className="login-button">Login</button>
//                 </form>

//                 <div className="meta">
//                     <p>
//                         New donor?
//                         <Link className="register" to="/register">Register here</Link>
//                     </p>
//                     <p>
//                         <Link className="back-home" to="/">← Back to Home</Link>
//                     </p>
//                 </div>

//             </div>
//         </div>

//     );
// }


//New Code replacing the old code above:

import { Link, useNavigate } from 'react-router-dom'; 
import { useState } from 'react'; 
import './LoginPage.css';

export function LoginPage() {
    // Create states for the inputs
    const [role, setRole] = useState('donor');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); 

    // Login handler function
    const handleLogin = async (e) => {
        e.preventDefault(); // Prevents the page from refreshing

        try {
            const response = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ role, email, password })
            });

            const data = await response.json();

            if (response.ok && data.success) {
                alert(data.message);
                
                // React-based Routing
                if (data.user.role === 'admin') navigate('/admin-dashboard');
                else if (data.user.role === 'donor') navigate('/donor-dashboard');
                else if (data.user.role === 'hospital') navigate('/hospital-dashboard');
            } else {
                alert(data.message || 'Login failed');
            }
        } catch (error) {
            console.error('Error logging in:', error);
            alert('Could not connect to the server.');
        }
    };

    return (
        <div className="auth-page-wrapper ">
            <div className="card">
                <div className="logo">🩸</div>
                <h3 className="header1">Welcome Back</h3>
                <p className="header2">Please enter your details to login</p>

                {/* Update the form to use onSubmit */}
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

                    <button type="submit" className="login-button">Login</button>
                </form>

                <div className="meta">
                    <p>New donor? <Link className="register" to="/register">Register here</Link></p>
                    <p><Link className="back-home" to="/">← Back to Home</Link></p>
                </div>
            </div>
        </div>
    );
}