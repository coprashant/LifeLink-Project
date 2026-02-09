//Old Code replaced by the new version below:

// import { Link } from 'react-router-dom';
// import './LoginPage.css';

// export function RegisterPage() {
//     return (
//         <div className="auth-page-wrapper ">
//             <div className="card">

//                 <div className="logo">🩸</div>
//                 <h3 className="header1">Create Account</h3>
//                 <p className="header2">Join Lifesave as a donor</p>

//                 <form action="/register" method="post">

//                     <div className="field">
//                         <label className="labels">Full Name</label>
//                         <input className="login-input" type="text" name="name" required />
//                     </div>

//                     <div className="field">
//                         <label className="labels">Email Address</label>
//                         <input className="login-input" type="email" name="email" required />
//                     </div>

//                     <div className="field">
//                         <label className="labels">Blood Group</label>
//                         <select className="login-input" name="blood_group" required>
//                             <option>A+</option>
//                             <option>A-</option>
//                             <option>B+</option>
//                             <option>B-</option>
//                             <option>O+</option>
//                             <option>O-</option>
//                             <option>AB+</option>
//                             <option>AB-</option>
//                         </select>
//                     </div>

//                     <div className="field">
//                         <label className="labels">Password</label>
//                         <input className="login-input" type="password" name="password" required />
//                     </div>

//                     <div className="field">
//                         <label className="labels">Confirm Password</label>
//                         <input className="login-input" type="password" name="confirm_password" required />
//                     </div>

//                     <button type="submit" className="login-button">Register</button>
//                 </form>

//                 <div className="meta">
//                     <p>
//                         Already have an account?
//                         <Link className="register" to="/login">Login</Link>
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

export function RegisterPage() {
    // Create states for all registration fields
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [blood_group, setBloodGroup] = useState('A+');
    const [password, setPassword] = useState('');
    const [confirm_password, setConfirmPassword] = useState('');
    
    const navigate = useNavigate(); 

    // Registration handler function
    const handleRegister = async (e) => {
        e.preventDefault(); 

        // Client-side check: do passwords match?
        if (password !== confirm_password) {
            alert("Passwords do not match!");
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ 
                    name, 
                    email, 
                    blood_group, 
                    password, 
                    confirm_password 
                })
            });

            const data = await response.json();

            if (response.ok && data.success) {
                alert(data.message);
                navigate('/login'); 
            } else {
                alert(data.message || 'Registration failed');
            }
        } catch (error) {
            console.error('Error during registration:', error);
            alert('Could not connect to the server.');
        }
    };

    return (
        <div className="auth-page-wrapper ">
            <div className="card">
                <div className="logo">🩸</div>
                <h3 className="header1">Create Account</h3>
                <p className="header2">Join Lifesave as a donor</p>

                {/* Use onSubmit instead of action/method */}
                <form onSubmit={handleRegister}>

                    
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