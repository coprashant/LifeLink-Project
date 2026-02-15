import { useState, useEffect } from "react";
import { apiFetch } from "../../utils/api";

export function AdminPage({ mode }) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showAddForm, setShowAddForm] = useState(false);

    const fetchData = async () => {
        setLoading(true);
        try {
            const endpoint = mode === "inventory" ? '/admin/inventory' : '/admin/donors';
            const response = await apiFetch(endpoint);
            setData(Array.isArray(response.data) ? response.data : []);
        } catch (err) { 
            console.error(err);
            setData([]);
        } finally { setLoading(false); }
    };

    useEffect(() => { 
        setShowAddForm(false); // Close form when switching pages
        fetchData(); 
    }, [mode]);

    // SMART ACTIONS: Handles Delete and Status Updates for both modes
    const handleAction = async (id, method, body = null) => {
        const confirmMsg = method === 'DELETE' ? "Are you sure you want to delete this record?" : "Confirm update?";
        if (!window.confirm(confirmMsg)) return;

        try {
            const endpoint = mode === "inventory" ? `/admin/inventory/${id}` : `/admin/donors/${id}`;
            await apiFetch(endpoint, { 
                method, 
                ...(body && { body: JSON.stringify(body) }) 
            });
            fetchData();
        } catch (err) { alert(err.message); }
    };

    return (
        <div className="admin-view-container">
            <header className="content-header">
                <div>
                    <h2>{mode === "inventory" ? "📦 Blood Inventory" : "👥 Donor Management"}</h2>
                    <p className="text-muted">Manage your {mode} records</p>
                </div>
                <button className="btn-primary-red" onClick={() => setShowAddForm(!showAddForm)}>
                    {showAddForm ? "✕ Close" : mode === "inventory" ? "+ Add Bag" : "+ Register Donor"}
                </button>
            </header>

            {/* DYNAMIC ADD FORM */}
            {showAddForm && (
                <section className="table-container" style={{ padding: '20px', marginBottom: '20px' }}>
                    <form className="inline-add-form" onSubmit={async (e) => {
                        e.preventDefault();
                        const payload = Object.fromEntries(new FormData(e.target));
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
                                    <input className="auth-input" name="name" placeholder="Full Name" required />
                                    <select className="auth-input" name="blood_group" required>
                                        {['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'].map(bg => <option key={bg} value={bg}>{bg}</option>)}
                                    </select>
                                    <input className="auth-input" name="phone" placeholder="Phone Number" required />
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
                        ) : (
                            <tr>
                                <th>Donor ID</th>
                                <th>Name</th>
                                <th>Group</th>
                                <th>Contact</th>
                                <th>Actions</th>
                            </tr>
                        )}
                    </thead>
                    <tbody>
                        {data.map((item) => (
                            <tr key={mode === "inventory" ? item.bag_id : item.donor_id}>
                                {mode === "inventory" ? (
                                    <>
                                        <td>#{item.bag_id}</td>
                                        <td><span className="blood-badge">{item.blood_group}</span></td>
                                        <td><span className={`badge badge-${item.status === 'available' ? 'success' : 'warning'}`}>{item.status}</span></td>
                                        <td>
                                            <div style={{ display: 'flex', gap: '8px' }}>
                                                {item.status === 'available' && (
                                                    <button onClick={() => handleAction(item.bag_id, 'PUT', { status: 'used' })} className="action-btn-mini dispatch">Dispatch</button>
                                                )}
                                                <button onClick={() => handleAction(item.bag_id, 'DELETE')} className="action-btn-mini trash">🗑</button>
                                            </div>
                                        </td>
                                    </>
                                ) : (
                                    <>
                                        <td>#{item.donor_id}</td>
                                        <td><strong>{item.name}</strong></td>
                                        <td><span className="blood-badge">{item.blood_group}</span></td>
                                        <td>{item.phone || item.email}</td>
                                        <td>
                                            <button onClick={() => handleAction(item.donor_id, 'DELETE')} className="action-btn-mini trash">🗑</button>
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