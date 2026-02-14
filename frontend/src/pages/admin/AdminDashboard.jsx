import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { apiFetch } from "../../utils/api";
import { handleLogout } from "../../utils/api"; 
import "./AdminDashboard.css";

export function AdminDashboard({ user, setUser }) {
    const [bloodGroups, setBloodGroups] = useState({});
    const [requests, setRequests] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const data = await apiFetch('/admin/inventory-stats');
                setBloodGroups(data);
                
                const reqData = await apiFetch('/admin/pending-requests');
                setRequests(reqData);
            } catch (err) {
                console.error("Failed to fetch admin stats", err);
            }
        };
        fetchStats();
    }, []);

    return (
        <div className="admin-dashboard-wrapper">
            <div className="container">
                <header className="main-header">
                    <h1>Admin Dashboard</h1>
                    <div className="user-info">
                        <span>Welcome, {user?.role}</span>
                        <button 
                            className="btn-secondary" 
                            onClick={() => handleLogout(setUser, navigate)}
                        >
                            Logout
                        </button>
                    </div>
                </header>

                <section className="section">
                    <h2>🩸 Blood Inventory Summary</h2>
                    <div className="button-group">
                        {Object.entries(bloodGroups).map(([group, count]) => (
                            <button key={group} className="btn-secondary">
                                {group}: {count} units
                            </button>
                        ))}
                    </div>
                </section>

                <section className="section">
                    <h2>🏥 Active Hospital Requests</h2>
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
                                {requests.map(req => (
                                    <tr key={req.request_id}>
                                        <td>{req.hospital_name}</td>
                                        <td>{req.blood_group}</td>
                                        <td>{req.units}</td>
                                        <td><span className={`status-${req.status.toLowerCase()}`}>{req.status}</span></td>
                                        <td>
                                            <button className="success-msg">Approve</button>
                                            <button className="error">Reject</button>
                                        </td>
                                    </tr>
                                ))}
                                {requests.length === 0 && <tr><td colSpan="5">No pending requests</td></tr>}
                            </tbody>
                        </table>
                    </div>
                </section>
            </div>
        </div>
    );
}