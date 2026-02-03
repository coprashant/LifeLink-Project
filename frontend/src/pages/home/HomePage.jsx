import { Link } from 'react-router-dom';
import './HomePage.css';

export function HomePage() {
    return (
        <>

            <nav className="navbar">
                <div className="container nav-container">
                    <a className="logo" href="#">🩸 LifeLink</a>
                    <div className="nav-actions">
                        <Link  className="btn btn-outline" to="login" >Login</Link>
                        <Link className="btn btn-danger" to="register" >Register as Donor</Link>
                    </div>
                </div>
            </nav>

            <header className="hero-section">
                <div className="container hero-content">
                    <h1 className="hero-title">From Vein to Patient</h1>
                    <p className="hero-subtitle">Connecting donors, hospitals, and blood banks in real-time.</p>
                    <div className="hero-buttons">
                        <Link  className="btn btn-danger btn-lg" to="login">I Want to Donate</Link>
                        <Link  className="btn btn-primary btn-lg" to="login" >Hospital Request</Link>
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

        </>
    );

}