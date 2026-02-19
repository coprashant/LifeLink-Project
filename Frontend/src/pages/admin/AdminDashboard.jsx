import { useState, useEffect } from "react";
import { apiFetch } from "../../utils/api";
import { useOutletContext } from "react-router-dom";
import dayjs from "dayjs";
import "./AdminDashboard.css";

export function AdminDashboard() {
    const [requests, setRequests] = useState([]);
    const { filterUrgency, filterStatus, searchTerm } = useOutletContext();

    const fetchRequests = async () => {
        try {
            const reqData = await apiFetch('/admin/requests');
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
            fetchRequests();
        } catch (err) {
            alert("Action Denied: " + err.message);
        }
    };

    const filteredRequests = requests
        .filter(req => {
            const matchesUrgency = filterUrgency === "All" || req.urgency === filterUrgency;
            const matchesStatus = filterStatus === "All" || req.status === filterStatus;
            const matchesSearch = req.hospital_name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                                req.blood_group_needed.toLowerCase().includes(searchTerm.toLowerCase());
            return matchesUrgency && matchesStatus && matchesSearch;
        })
        .sort((a, b) => {
            const priority = { 'Critical': 3, 'Urgent': 2, 'Normal': 1 };
            return priority[b.urgency] - priority[a.urgency];
        });

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
                            <th>Urgency</th>
                            <th>Date</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredRequests.length > 0 ? (
                            filteredRequests.map((req) => (
                                <tr key={req.request_id}>
                                    <td>#{req.request_id}</td>
                                    <td>{req.hospital_name}</td>
                                    <td><strong>{req.blood_group_needed}</strong></td>
                                    <td>{req.units_requested}</td>
                                    <td>
                                        <span className={`urgency-tag ${req.urgency?.toLowerCase()}`}>
                                            {req.urgency}
                                        </span>
                                    </td>
                                    <td>{dayjs(req.request_date).format("DD MMM HH:mm")}</td>
                                    <td>
                                        <span className={`status-tag ${req.status?.toLowerCase()}`}>
                                            {req.status}
                                        </span>
                                    </td>
                                    <td className="table-actions">
                                        {req.status === 'pending' && (
                                            <>
                                                <button onClick={() => handleStatusUpdate(req.request_id, 'fulfilled')} className="action-btn-approve">Approve</button>
                                                <button onClick={() => handleStatusUpdate(req.request_id, 'cancelled')} className="action-btn-reject">Reject</button>
                                            </>
                                        )}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="8" className="no-data">No requests matching the selected filters.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </>
    );
}