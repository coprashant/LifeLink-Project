import { useState } from "react";
import "./DonorDashboard.css";

export function DonorDashboard() {
    const [donorInfo, setDonorInfo] = useState({
        name: "John Doe",
        bloodGroup: "O+",
        lastDonation: "2023-10-15",
        status: "Eligible"
    });

    return (
        <div className="donor-dashboard-wrapper">
            <div className="container">
                <header>
                    <h1>Donor Dashboard</h1>
                    <div className="user-info">
                        <p>Welcome, {donorInfo.name}</p>
                        <button className="btn-secondary">Logout</button>
                    </div>
                </header>

                <section className="section">
                    <h2>My Profile</h2>
                    <div className="info-box">
                        <p><strong>Blood Group:</strong> {donorInfo.bloodGroup}</p>
                        <p><strong>Last Donation:</strong> {donorInfo.lastDonation}</p>
                        <p><strong>Eligibility:</strong> <span className={donorInfo.status === "Eligible" ? "eligible" : "not-eligible"}>{donorInfo.status}</span></p>
                    </div>
                    <div className="edit-container">
                        <input type="text" placeholder="Update Name" />
                        <button>Save Changes</button>
                    </div>
                </section>

                <section className="section">
                    <h2>Donation Center</h2>
                    <p>Find a center near you to schedule your next donation.</p>
                    <div className="button-group">
                        <button>Find Centers</button>
                        <button className="btn-secondary">View History</button>
                    </div>
                    <div className="result">
                        <p className="success-msg">Center found: City Hospital</p>
                    </div>
                </section>
            </div>
        </div>
    );
}
