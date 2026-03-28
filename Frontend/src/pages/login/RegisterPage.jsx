import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { apiFetch } from '../../utils/api';
import './LoginPage.css';

const EyeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
    </svg>
);

const EyeOffIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
        <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
);

const AlertIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
);

const CheckIcon = () => (
    <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12" />
    </svg>
);

const ArrowRightIcon = () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="5" y1="12" x2="19" y2="12" />
        <polyline points="12 5 19 12 12 19" />
    </svg>
);

const HomeIcon = () => (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="15 18 9 12 15 6" />
    </svg>
);

const MatchIcon = ({ match, hasValue }) => {
    if (!hasValue) return null;
    if (match) {
        return (
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#28a745" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
            </svg>
        );
    }
    return (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#dc3545" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
    );
};

const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];

export function RegisterPage() {
    const [role, setRole] = useState('donor');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [bloodGroup, setBloodGroup] = useState('A+');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isPasswordFocused, setIsPasswordFocused] = useState(false);
    const [strength, setStrength] = useState(0);
    const [checks, setChecks] = useState({ length: false, lowercase: false, special: false });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const newChecks = {
            length: password.length >= 8,
            lowercase: /[a-z]/.test(password),
            special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
        };
        setChecks(newChecks);
        const active = Object.values(newChecks).filter(Boolean).length;
        setStrength((active / 3) * 100);
    }, [password]);

    const getStrengthClass = () => {
        if (strength === 0) return '';
        if (strength <= 34) return 'fill-weak';
        if (strength <= 67) return 'fill-good';
        return 'fill-excellent';
    };

    const passwordsMatch = confirmPassword.length > 0 && password === confirmPassword;
    const passwordsMismatch = confirmPassword.length > 0 && password !== confirmPassword;

    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');

        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }
        if (strength < 100) {
            setError('Please meet all password requirements before continuing.');
            return;
        }

        setLoading(true);
        try {
            const data = await apiFetch('/auth/register', {
                method: 'POST',
                body: JSON.stringify({
                    role,
                    name,
                    email,
                    blood_group: bloodGroup,
                    password,
                    confirm_password: confirmPassword,
                }),
            });
            if (data.success) {
                navigate('/login', { state: { registered: true } });
            }
        } catch (err) {
            setError(err.message || 'Registration failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-page-wrapper">
            <div className="auth-panel-left">
                <div className="auth-brand">
                    <div className="auth-brand-dot" />
                    <span className="auth-brand-name">LifeLink</span>
                </div>
                <div className="auth-panel-tagline">
                    <h2>Be someone's <span>reason</span> to live.</h2>
                    <p>Registering takes under two minutes. Donating saves up to three lives.</p>
                </div>
                <div className="auth-stats">
                    <div className="auth-stat">
                        <span className="auth-stat-number">12k+</span>
                        <span className="auth-stat-label">Active donors</span>
                    </div>
                    <div className="auth-stat">
                        <span className="auth-stat-number">340</span>
                        <span className="auth-stat-label">Partner hospitals</span>
                    </div>
                    <div className="auth-stat">
                        <span className="auth-stat-number">98k</span>
                        <span className="auth-stat-label">Lives impacted</span>
                    </div>
                </div>
            </div>

            <div className="auth-panel-right">
                <div className="auth-card auth-card-wide">
                    <div className="auth-header">
                        <h3>Create account</h3>
                        <p>Join our life-saving community today</p>
                    </div>

                    <div className="field">
                        <label>Join as</label>
                        <div className="role-selector">
                            <button type="button" className={`role-btn ${role === 'donor' ? 'active' : ''}`} onClick={() => setRole('donor')}>Donor</button>
                            <button type="button" className={`role-btn ${role === 'hospital' ? 'active' : ''}`} onClick={() => setRole('hospital')}>Hospital</button>
                        </div>
                    </div>

                    <form className="auth-form" onSubmit={handleRegister}>
                        <div className="form-grid">

                            <div className="field">
                                <label>Full name</label>
                                <input
                                    className="auth-input"
                                    type="text"
                                    placeholder="John Doe"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </div>

                            {role === 'donor' ? (
                                <div className="field">
                                    <label>Blood group</label>
                                    <select
                                        className="auth-input"
                                        value={bloodGroup}
                                        onChange={(e) => setBloodGroup(e.target.value)}
                                    >
                                        {BLOOD_GROUPS.map((bg) => (
                                            <option key={bg} value={bg}>{bg}</option>
                                        ))}
                                    </select>
                                </div>
                            ) : <div className="field" />}

                            <div className="field field-span">
                                <label>Email address</label>
                                <input
                                    className="auth-input"
                                    type="email"
                                    placeholder="john@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="field">
                                <label>Password</label>
                                <div className="input-wrapper">
                                    <input
                                        className="auth-input"
                                        type={showPassword ? 'text' : 'password'}
                                        placeholder="••••••••"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        onFocus={() => setIsPasswordFocused(true)}
                                        onBlur={() => { if (strength === 100) setIsPasswordFocused(false); }}
                                        required
                                    />
                                    <button type="button" className="toggle-password" onClick={() => setShowPassword(!showPassword)}>
                                        {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                                    </button>
                                </div>
                            </div>

                            <div className="field" style={{ position: 'relative' }}>
                                <label>Confirm password</label>
                                <div className="input-wrapper">
                                    <input
                                        className={`auth-input ${passwordsMismatch ? 'input-error' : ''} ${passwordsMatch ? 'input-success' : ''}`}
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        placeholder="••••••••"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        required
                                    />
                                    <span className="confirm-match-icon">
                                        <MatchIcon match={passwordsMatch} hasValue={confirmPassword.length > 0} />
                                    </span>
                                    <button type="button" className="toggle-password" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                                        {showConfirmPassword ? <EyeOffIcon /> : <EyeIcon />}
                                    </button>
                                </div>
                                {passwordsMismatch && (
                                    <div className="field-error">
                                        <AlertIcon />
                                        Passwords do not match
                                    </div>
                                )}
                            </div>

                            <div className="field">
                                <div className={`strength-meter ${isPasswordFocused && strength < 100 ? 'visible' : ''}`}>
                                    <div className="progress-bar">
                                        <div
                                            className={`progress-fill ${getStrengthClass()}`}
                                            style={{ width: `${strength}%` }}
                                        />
                                    </div>
                                    <div className="password-checks">
                                        <div className={`check-item ${checks.length ? 'met' : ''}`}>
                                            <span className="check-icon">{checks.length && <CheckIcon />}</span>
                                            8+ chars
                                        </div>
                                        <div className={`check-item ${checks.lowercase ? 'met' : ''}`}>
                                            <span className="check-icon">{checks.lowercase && <CheckIcon />}</span>
                                            Lowercase
                                        </div>
                                        <div className={`check-item ${checks.special ? 'met' : ''}`}>
                                            <span className="check-icon">{checks.special && <CheckIcon />}</span>
                                            Special
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {error
                                ? <div className="toast toast-error">
                                    <AlertIcon />
                                    <span>{error}</span>
                                  </div>
                                : <div />
                            }

                        </div>

                        <button type="submit" className="auth-button" disabled={loading}>
                            {loading ? 'Creating account...' : 'Create account'}
                            {!loading && <ArrowRightIcon />}
                        </button>
                    </form>

                    <div className="auth-meta">
                        <p>Already have an account? <Link to="/login">Sign in</Link></p>
                        <Link className="back-home-link" to="/">
                            <HomeIcon />
                            Back to home
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}