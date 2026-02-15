import { useState, useEffect } from "react";
import { apiFetch } from "../../utils/api";
import "./AdminDashboard.css";

export function AdminDashboard() {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchRequests = async () => {
        try {
            // Updated to use the data property from your backend response
            const response = await apiFetch('/admin/requests');
            setRequests(Array.isArray(response) ? response : response.data || []);
        } catch (err) {
            console.error("Failed to fetch requests", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRequests();
    }, []);

    const handleAction = async (requestId, status) => {
        if (!window.confirm(`Are you sure you want to ${status} this request?`)) return;
        try {
            await apiFetch(`/admin/requests/${requestId}`, {
                method: 'PUT',
                body: JSON.stringify({ status })
            });
            fetchRequests(); // Refresh list
        } catch (err) {
            alert("Update failed: " + err.message);
        }
    };

    return (
        <div className="admin-dashboard-view">
            <header className="content-header">
                <div>
                    <h2>Incoming Hospital Requests</h2>
                    <p className="text-muted">Review and allocate blood units to hospitals</p>
                </div>
            </header>

            <div className="table-container">
                <table className="status-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Hospital</th>
                            <th>Group</th>
                            <th>Units</th>
                            <th>Urgency</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {requests.length > 0 ? (
                            requests.map((req) => (
                                <tr key={req.request_id}>
                                    <td>#{req.request_id}</td>
                                    <td>
                                        <div className="hospital-info">
                                            <strong>{req.hospital_name}</strong>
                                            <span className="location-text">{req.location}</span>
                                        </div>
                                    </td>
                                    <td><span className="blood-badge">{req.blood_group_needed}</span></td>
                                    <td>{req.units_requested}</td>
                                    <td>
                                        <span className={`urgency-tag ${req.urgency?.toLowerCase()}`}>
                                            {req.urgency}
                                        </span>
                                    </td>
                                    <td>
                                        <span className={`badge badge-${req.status === 'fulfilled' ? 'success' : 'warning'}`}>
                                            {req.status}
                                        </span>
                                    </td>
                                    <td>
                                        {req.status === 'pending' && (
                                            <div className="action-btns">
                                                <button 
                                                    onClick={() => handleAction(req.request_id, 'fulfilled')}
                                                    className="action-btn-mini dispatch"
                                                >Approve</button>
                                                <button 
                                                    onClick={() => handleAction(req.request_id, 'cancelled')}
                                                    className="action-btn-mini trash"
                                                >Reject</button>
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7" className="no-data">
                                    {loading ? "Loading requests..." : "No pending hospital requests."}
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}