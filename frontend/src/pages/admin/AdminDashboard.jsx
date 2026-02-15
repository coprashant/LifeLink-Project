import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { apiFetch, handleLogout } from "../../utils/api";
import "./AdminDashboard.css";

export function AdminDashboard({ user, setUser }) {
    const [requests, setRequests] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                // Ensure this endpoint matches your Backend/src/routes/adminRoutes.js
                const reqData = await apiFetch('/admin/requests');
                setRequests(Array.isArray(reqData) ? reqData : []);
            } catch (err) {
                console.error("Failed to fetch requests", err);
            }
        };
        fetchRequests();
    }, []);

    return (
    <>
            <header className="content-header">
                <h2>Admin Dashboard</h2>
                <button className="btn-primary-red">+ Add New</button>
            </header>

             <div className="table-card">
                <table className="admin-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Hospital</th>
                                <th>Blood Group</th>
                                <th>Units</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {requests.length > 0 ? (
                                requests.map((req) => (
                                    <tr key={req.request_id}>
                                        <td>#{req.request_id}</td>
                                        <td>{req.hospital_name}</td>
                                        <td><strong>{req.blood_group}</strong></td>
                                        <td>{req.units}</td>
                                        <td>
                                            <span className={`status-tag ${req.status?.toLowerCase()}`}>
                                                {req.status}
                                            </span>
                                        </td>
                                        <td className="table-actions">
                                            <button className="action-btn approve">Approve</button>
                                            <button className="action-btn reject">Reject</button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="no-data">No pending requests found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
         </>
    );
}