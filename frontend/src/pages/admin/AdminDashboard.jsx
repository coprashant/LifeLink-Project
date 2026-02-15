import { useState, useEffect } from "react";
import { apiFetch } from "../../utils/api";
import "./AdminDashboard.css";

export function AdminDashboard() {
    const [requests, setRequests] = useState([]);

    const fetchRequests = async () => {
        try {
            // Updated to handle the nested 'data' property from backend response
            const response = await apiFetch('/admin/requests');
            const reqData = response.data || response; 
            setRequests(Array.isArray(reqData) ? reqData : []);
        } catch (err) {
            console.error("Failed to fetch requests", err);
        }
    };

    useEffect(() => {
        fetchRequests();
    }, []);

    // New handler for status updates
    const handleStatusUpdate = async (id, newStatus) => {
        try {
            await apiFetch(`/admin/requests/${id}/status`, {
                method: 'PUT',
                body: JSON.stringify({ status: newStatus })
            });
            
            // Refresh the list to show updated status tags
            fetchRequests(); 
        } catch (err) {
            alert("Update failed: " + err.message);
        }
    };

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
                                    {/* Changed from req.units to req.units_requested to match DB */}
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
                                                    className="action-btn approve"
                                                    onClick={() => handleStatusUpdate(req.request_id, 'approved')}
                                                >
                                                    Approve
                                                </button>
                                                <button 
                                                    className="action-btn reject"
                                                    onClick={() => handleStatusUpdate(req.request_id, 'rejected')}
                                                >
                                                    Reject
                                                </button>
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