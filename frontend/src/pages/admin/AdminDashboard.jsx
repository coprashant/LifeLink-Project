import { useState } from "react";
import "./AdminDashboard.css";

export function AdminDashboard() {
    const [bloodGroups, setBloodGroups] = useState({
        "A+": 12, "A-": 5, "B+": 15, "B-": 3,
        "AB+": 7, "AB-": 2, "O+": 20, "O-": 8
    });

    return (
        <div className="admin-dashboard-wrapper">
            <div className="container">
                {/* Header */}
                <header className="main-header">
                    <h1>Admin Dashboard</h1>
                    <div className="user-info">
                        <span>Admin User</span>
                        <button className="btn-secondary">Logout</button>
                    </div>
                </header>

                {/* Blood Inventory Section */}
                <section className="section">
                    <h2>🩸 Blood Inventory</h2>
                    <div className="button-group">
                        {Object.keys(bloodGroups).map((group) => (
                            <button key={group} className="btn-secondary">
                                {group}: {bloodGroups[group]} units
                            </button>
                        ))}
                    </div>
                </section>

                {/* Requests Section */}
                <section className="section">
                    <h2>🏥 Hospital Requests</h2>
                    <div className="table-container">
                        <table>
                            <thead>
                                <tr>
                                    <th>Hospital</th>
                                    <th>Blood Group</th>
                                    <th>Units</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>City Hospital</td>
                                    <td>O+</td>
                                    <td>5</td>
                                    <td>Pending</td>
                                    <td>
                                        <button className="success-msg">Approve</button>
                                        <button className="error">Reject</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>
            </div>
        </div>
    );
}
