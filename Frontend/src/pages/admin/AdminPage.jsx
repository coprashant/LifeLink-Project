import { useState, useEffect } from "react";
import { apiFetch } from "../../utils/api";

export function AdminPage({ mode }) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showAddForm, setShowAddForm] = useState(false);

    const fetchData = async () => {
        setLoading(true);
        try {
            const endpoint = `/admin/${mode}`;
            const result = await apiFetch(endpoint);
            setData(Array.isArray(result.data) ? result.data : result);
        } catch (err) {
            console.error(`Failed to fetch ${mode}`, err);
            setData([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { 
        setShowAddForm(false);
        fetchData(); 
    }, [mode]);

    const handleAction = async (id, method, body = null) => {
        const confirmMsg = method === 'DELETE' ? "Are you sure?" : "Confirm update?";
        if (!window.confirm(confirmMsg)) return;

        try {
            const endpoint = `/admin/${mode}/${id}`;
            await apiFetch(endpoint, { 
                method, 
                ...(body && { body: JSON.stringify(body) }) 
            });
            fetchData();
        } catch (err) { alert(err.message); }
    };

    const getTitle = () => {
        if (mode === "inventory") return "📦 Blood Inventory";
        if (mode === "donors") return "👥 Donor Management";
        return "📅 Appointment Schedule";
    };

    return (
        <div className="admin-view-container">
            <header className="content-header">
                <div>
                    <h2>{getTitle()}</h2>
                    <p className="text-muted">Manage your {mode} records</p>
                </div>
                <button className="btn-primary-red" onClick={() => setShowAddForm(!showAddForm)}>
                    {showAddForm ? "✕ Close" : mode === "inventory" ? "+ Add Bag" : "+ Register Donor"}
                </button>
            </header>

            {showAddForm && (
                <section className="table-container" style={{ padding: '20px', marginBottom: '20px' }}>
                    <form className="inline-add-form" onSubmit={async (e) => {
                        e.preventDefault();
                        const formData = new FormData(e.target);
                        const payload = Object.fromEntries(formData);
                        try {
                            const endpoint = mode === "inventory" ? '/admin/inventory' : '/admin/donors';
                            await apiFetch(endpoint, { method: 'POST', body: JSON.stringify(payload) });
                            setShowAddForm(false);
                            fetchData();
                        } catch (err) { alert(err.message); }
                    }}>
                        <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
                            {mode === "inventory" ? (
                                <>
                                    <input className="auth-input" name="donor_id" type="number" placeholder="Donor ID" required />
                                    <select className="auth-input" name="blood_group" required>
                                        {['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'].map(bg => <option key={bg} value={bg}>{bg}</option>)}
                                    </select>
                                </>
                            ) : (
                                <>
                                    {/* Inputs use name attributes that match your schema expectations */}
                                    <input className="auth-input" name="full_name" placeholder="Full Name" required />
                                    <select className="auth-input" name="blood_group" required>
                                        {['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'].map(bg => <option key={bg} value={bg}>{bg}</option>)}
                                    </select>
                                    <input className="auth-input" name="contact_no" placeholder="Contact Number" required />
                                </>
                            )}
                            <button type="submit" className="btn-primary-red">Save Record</button>
                        </div>
                    </form>
                </section>
            )}

            <div className="table-container">
                <table className="admin-table">
                    <thead>
                        {mode === "inventory" ? (
                            <tr>
                                <th>Bag ID</th>
                                <th>Group</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        ) : mode === "donors" ?(
                            <tr>
                                <th>Donor ID</th>
                                <th>Name</th>
                                <th>Group</th>
                                <th>Contact</th>
                                <th>Actions</th>
                            </tr>
                        ) : (
                            <tr><th>Appointment ID</th><th>Donor</th><th>Date</th><th>Time</th><th>Status</th><th>Actions</th></tr>
                        )}
                    </thead>
                    <tbody>
                        {data.map((item) => (
                            <tr key={item.bag_id || item.donor_id || item.appointment_id}>
                                {mode === "inventory" ? (
                                    <>
                                        <td>#{item.bag_id}</td>
                                        <td><span className="blood-badge">{item.blood_group}</span></td>
                                        <td><span className={`badge badge-${item.status}`}>{item.status}</span></td>
                                        <td>
                                            <div style={{ display: 'flex', gap: '8px' }}>
                                                {item.status === 'available' && (
                                                    <button onClick={() => handleAction(item.bag_id, 'PUT', { status: 'used' })} className="action-btn-mini dispatch">Dispatch</button>
                                                )}
                                                <button onClick={() => handleAction(item.bag_id, 'DELETE')} className="action-btn-mini trash">🗑</button>
                                            </div>
                                        </td>
                                    </>
                                ) : mode === "donors" ? (
                                    <>
                                        <td>#{item.donor_id}</td>
                                        {/* Updated to match your Donors table: full_name and contact_no */}
                                        <td><strong>{item.full_name}</strong></td>
                                        <td><span className="blood-badge">{item.blood_group}</span></td>
                                        <td>{item.contact_no}</td>
                                        <td>
                                            <button onClick={() => handleAction(item.donor_id, 'DELETE')} className="action-btn-mini trash">🗑</button>
                                        </td>
                                    </>
                                    ) : (
                                    <>
                                        <td>#{item.appointment_id}</td>
                                        <td>{item.donor_name}</td>
                                        <td>{new Date(item.appointment_date).toLocaleDateString()}</td>
                                        <td>{item.appointment_time}</td>
                                        <td>
                                            <span className={`status-pill ${item.status?.toLowerCase()}`}>
                                                {item.status}
                                            </span>
                                        </td>
                                        <td>
                                            <div style={{ display: 'flex', gap: '8px' }}>
                                                {item.status === 'scheduled' && (
                                                    <button onClick={() => handleAction(item.appointment_id, 'PUT', { status: 'completed' })} className="action-btn-mini dispatch">Confirm</button>
                                                )}
                                                <button onClick={() => handleAction(item.appointment_id, 'DELETE')} className="action-btn-mini trash">🗑</button>
                                            </div>
                                        </td>
                                    </>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}