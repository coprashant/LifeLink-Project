import { Link } from 'react-router-dom';
import { Facebook, Instagram, Linkedin, X } from 'lucide-react';
import './HomePage.css';

export function HomePage() {
    return (
        <>
            <header className="hero-section">
                <div className="container hero-content">
                    <h1 className="hero-title">From Vein to Patient</h1>
                    <p className="hero-subtitle">
                        Connecting donors, hospitals, and blood banks in real-time.
                    </p>
                    <div className="hero-buttons">
                        <Link className="btn btn-danger btn-lg" to="login">
                            I Want to Donate
                        </Link>
                        <Link className="btn btn-primary btn-lg" to="login">
                            Hospital Request
                        </Link>
                    </div>
                </div>
            </header>

            <section className="stats-section">
                <div className="container">
                    <div className="stat-grid">
                        <div className="stat-card">
                            <h2 className="stat-number">150+</h2>
                            <p className="stat-label">Registered Donors</p>
                        </div>
                        <div className="stat-card">
                            <h2 className="stat-number">45+</h2>
                            <p className="stat-label">Units Available Today</p>
                        </div>
                        <div className="stat-card">
                            <h2 className="stat-number">300+</h2>
                            <p className="stat-label">Lives Impacted</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* HOW IT WORKS */}
            <section className="info-section">
                <div className="container">
                    <h2 className="section-title">How It Works</h2>
                    <div className="info-grid">
                        <div className="info-card">
                            <h3>1. Register</h3>
                            <p>Create your profile as a donor or hospital.</p>
                        </div>
                        <div className="info-card">
                            <h3>2. Connect</h3>
                            <p>Link with nearby hospitals and blood banks.</p>
                        </div>
                        <div className="info-card">
                            <h3>3. Save Lives</h3>
                            <p>Coordinate safe and verified donations.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* FEATURES */}
            <section className="features-section">
                <div className="container">
                    <h2 className="section-title">Why Use Our Platform?</h2>
                    <div className="features-grid">
                        <div className="feature-card">
                            <h3>Real-Time Matching</h3>
                            <p>Immediate donor-hospital connections.</p>
                        </div>
                        <div className="feature-card">
                            <h3>Secure & Verified</h3>
                            <p>All users are authenticated and trusted.</p>
                        </div>
                        <div className="feature-card">
                            <h3>Easy Dashboard</h3>
                            <p>Track requests and availability seamlessly.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA SECTION */}
<section className="cta-section">
    <div className="container">
        <div className="cta-glass-card">
            <div className="cta-text">
                <h2>Be the Reason Someone Survives Today</h2>
                <p>Join a community of thousands dedicated to ensuring no medical emergency goes unanswered due to blood shortage.</p>
            </div>
            <div className="cta-actions">
                <Link className="btn btn-white" to="register">Register as Donor</Link>
                <Link className="btn btn-outline-white" to="register">Hospital Partnership</Link>
            </div>
        </div>
    </div>
</section>

{/* FOOTER */}
<footer className="footer">
    <div className="container footer-content">
        <div className="footer-brand">
            <h3 className="brand-logo">🩸 LifeLink</h3>
            <p>Revolutionizing blood donation by connecting donors and hospitals through real-time technology.</p>
            <div className="social-links">
    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
        <Facebook size={20} />
    </a>
    <a href="https://x.com" target="_blank" rel="noopener noreferrer" aria-label="X">
        <X size={20} />
    </a>
    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
        <Instagram size={20} />
    </a>
    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
        <Linkedin size={20} />
    </a>
</div>
        </div>

        <div className="footer-links">
            <h4>Platform</h4>
            <ul>
                <li><Link to="/">How it Works</Link></li>
                <li><Link to="/donor-map">Blood Map</Link></li>
                <li><Link to="/eligibility">Eligibility</Link></li>
            </ul>
        </div>

        <div className="footer-links">
            <h4>Support</h4>
            <ul>
                <li><Link to="/contact">Contact Us</Link></li>
                <li><Link to="/faq">FAQs</Link></li>
                <li><Link to="/privacy">Privacy Policy</Link></li>
            </ul>
        </div>

        <div className="footer-contact">
            <h4>Get in Touch</h4>
            <p>Kathmandu, Nepal</p>
            <p>support@lifelink.com</p>
            <p>+977 123456789</p>
        </div>
    </div>

    <div className="footer-bottom">
        <div className="container">
            <p>© {new Date().getFullYear()} LifeLink. Built for impact.</p>
        </div>
    </div>
</footer>
        </>
    );
}
