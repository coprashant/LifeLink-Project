import { useState, useEffect } from "react";
import { apiFetch } from "../../utils/api";
import { useNavigate } from 'react-router-dom';
import "./AdminDashboard.css";

export function AdminDashboard() {
    const [requests, setRequests] = useState([]);
    const navigate = useNavigate();

    const fetchRequests = async () => {
        try {
            const reqData = await apiFetch('/admin/requests');
            // Controller returns result.rows directly
            setRequests(Array.isArray(reqData) ? reqData : []);
        } catch (err) {
            console.error("Failed to fetch requests", err);
        }
    };

    useEffect(() => {
        fetchRequests();
    }, []);

    const handleStatusUpdate = async (id, newStatus) => {
        try {
            await apiFetch(`/admin/requests/${id}/status`, {
                method: 'PUT',
                body: JSON.stringify({ status: newStatus })
            });
            fetchRequests(); // Refresh list
        } catch (err) {
            alert("Failed to update status: " + err.message);
        }
    };

    return (
        <>
            <header className="content-header">
                <div>
                    <h2>Incoming Hospital Requests</h2>
                    <p className="text-muted">Review and allocate blood units to hospitals</p>
                </div>
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
                                    <td><strong>{req.blood_group_needed}</strong></td>
                                    <td>{req.units_requested}</td>
                                    <td>
                                        <span className={`status-tag ${req.status?.toLowerCase()}`}>
                                            {req.status}
                                        </span>
                                    </td>
                                    <td className="table-actions">
                                        {req.status === 'pending' && (
                                            <>
                                                <button 
                                                    onClick={() => handleStatusUpdate(req.request_id, 'fulfilled')} 
                                                    className="action-btn-approve"
                                                >Approve</button>
                                                <button 
                                                    onClick={() => handleStatusUpdate(req.request_id, 'cancelled')} 
                                                    className="action-btn-reject"
                                                >Reject</button>
                                            </>
                                        )}
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