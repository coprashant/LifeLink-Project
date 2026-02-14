import { useState, useEffect } from "react";
import { apiFetch } from "../../utils/api";
import "./AdminPage.css";

export function AdminPage() {
    const [inventory, setInventory] = useState([]);
    const [loading, setLoading] = useState(true);
    // 1. State to toggle form visibility
    const [showAddForm, setShowAddForm] = useState(false);

    const fetchInventory = async () => {
        try {
            const data = await apiFetch('/admin/inventory');
            setInventory(Array.isArray(data) ? data : []);
        } catch (err) {
            console.error("Failed to fetch inventory", err);
            setInventory([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchInventory();
    }, []);

    const handleAddBag = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const payload = Object.fromEntries(formData);

        try {
            // Updated to match your backend route
            await apiFetch('/admin/inventory', {
                method: 'POST',
                body: JSON.stringify(payload)
            });
            alert("Blood bag added!");
            e.target.reset(); 
            setShowAddForm(false); // Hide form after success
            fetchInventory(); 
        } catch (err) {
            alert(err.message);
        }
    };

    return (
        <>
            <header className="content-header">
                <h2>🩸 Blood Inventory Management</h2>
                {/* 2. Toggle button text and state */}
                <button 
                    className="btn-primary-red" 
                    onClick={() => setShowAddForm(!showAddForm)}
                >
                    {showAddForm ? "✕ Close Form" : "+ Add Blood Bag"}
                </button>
            </header>

            {/* 3. Conditional Form Rendering */}
            {showAddForm && (
                <section className="table-card form-section-animate">
                    <form onSubmit={handleAddBag} className="inline-add-form">
                        <div className="form-row">
                            <div className="form-group">
                                <label>Donor ID</label>
                                <input type="text" name="donor_id" placeholder="Enter ID" required />
                            </div>
                            <div className="form-group">
                                <label>Blood Group</label>
                                <select name="blood_group" required>
                                    <option value="A+">A+</option>
                                    <option value="A-">A-</option>
                                    <option value="B+">B+</option>
                                    <option value="B-">B-</option>
                                    <option value="O+">O+</option>
                                    <option value="O-">O-</option>
                                    <option value="AB+">AB+</option>
                                    <option value="AB-">AB-</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Collection Date</label>
                                <input type="date" name="collection_date" defaultValue={new Date().toISOString().split('T')[0]} required />
                            </div>
                            <div className="form-actions">
                                <button type="submit" className="btn-primary-red">Save Bag</button>
                            </div>
                        </div>
                    </form>
                </section>
            )}

            <section className="table-card">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>Bag ID</th>
                            <th>Group</th>
                            <th>Donor</th>
                            <th>Collected</th>
                            <th>Expires</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {inventory.map((bag) => (
                            <tr key={bag.bag_id} className={bag.status === 'Expired' ? 'row-expired' : ''}>
                                <td>#{bag.bag_id}</td>
                                <td><strong>{bag.blood_group}</strong></td>
                                <td>{bag.donor_name}</td>
                                <td>{new Date(bag.collection_date).toLocaleDateString()}</td>
                                <td>{new Date(bag.expiry_date).toLocaleDateString()}</td>
                                <td>
                                    <span className={`status-tag ${bag.status?.toLowerCase()}`}>
                                        {bag.status}
                                    </span>
                                </td>
                                <td className="table-actions">
                                    {bag.status === 'Available' ? (
                                        <button className="action-btn approve">Dispatch</button>
                                    ) : (
                                        <button className="action-btn reject">🗑 Trash</button>
                                    )}
                                </td>
                            </tr>
                        ))}
                        {!loading && inventory.length === 0 && (
                            <tr><td colSpan="7" className="no-data">No blood bags in inventory.</td></tr>
                        )}
                    </tbody>
                </table>
            </section>
        </>
    );
}