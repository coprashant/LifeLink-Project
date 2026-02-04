import { useState } from "react";
import "./HospitalDashboard.css";

export function HospitalDashboard() {
    const [requests, setRequests] = useState([
        { id: 1, group: "A+", units: 5, status: "pending" },
        { id: 2, group: "O-", units: 2, status: "fulfilled" },
        { id: 3, group: "B+", units: 3, status: "partially_fulfilled" },
    ]);

    return (
        <div className="hospital-dashboard-wrapper">
            <div className="container">
                {/* Header */}
                <header className="main-header">
                    <h1>Hospital Dashboard</h1>
                    <div className="user-info">
                        <span>City General Hospital</span>
                        <button className="btn-secondary">Logout</button>
                    </div>
                </header>

                {/* Request Blood Section */}
                <section className="section">
                    <div className="section-header">
                        <h2>Request Blood</h2>
                    </div>
                    <form>
                        <div className="form-group">
                            <select>
                                <option>Select Blood Group</option>
                                <option>A+</option>
                                <option>B-</option>
                                <option>O+</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <input type="number" placeholder="Units required" min="1" />
                        </div>
                        <button type="submit">Submit Request</button>
                    </form>
                    <div className="result success-box">
                        Request submitted successfully!
                    </div>
                </section>

                {/* My Requests Section */}
                <section className="section">
                    <h2>My Requests</h2>
                    <div className="result-display">
                        <table>
                            <thead>
                                <tr>
                                    <th>Request ID</th>
                                    <th>Blood Group</th>
                                    <th>Units</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {requests.map(req => (
                                    <tr key={req.id}>
                                        <td>#{req.id}</td>
                                        <td>{req.group}</td>
                                        <td>{req.units}</td>
                                        <td>
                                            <span className={`status-${req.status}`}>
                                                {req.status.replace('_', ' ')}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>
            </div>
        </div>
    );
}
