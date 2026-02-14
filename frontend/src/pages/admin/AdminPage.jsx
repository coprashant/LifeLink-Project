import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiFetch, handleLogout } from "../../utils/api";
import "./AdminPage.css";

export function AdminPage({ setUser }) {
    const [inventory, setInventory] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // 1. Fetch real inventory data from the backend
    const fetchInventory = async () => {
        try {
            const data = await apiFetch('/admin/inventory');
            setInventory(data);
        } catch (err) {
            console.error("Failed to fetch inventory", err);
        } finally {
            setLoading(setLoading(false));
        }
    };

    useEffect(() => {
        fetchInventory();
    }, []);

    // 2. Handle adding a new bag
    const handleAddBag = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const payload = Object.fromEntries(formData);

        try {
            await apiFetch('/admin/add-bag', {
                method: 'POST',
                body: JSON.stringify(payload)
            });
            alert("Blood bag added!");
            e.target.reset(); // Clear form
            window.location.hash = ""; // Close the CSS modal
            fetchInventory(); // Refresh the list
        } catch (err) {
            alert(err.message);
        }
    };

    return (
        <div className="admin-page-wrapper">
            <div className="admin-container">
                <nav className="sidebar">
                    <h3 className="brand">LifeLink Admin</h3>
                    <ul className="nav-links">
                        {/* Use Link instead of a tags to prevent page reloads */}
                        <li><Link to="/admin-dashboard">Dashboard</Link></li>
                        <li><Link to="/admin-inventory" className="active">Manage Inventory</Link></li>
                        <li><Link to="/admin-donors">Manage Donors</Link></li>
                        <li><Link to="/admin-requests">Hospital Requests</Link></li>
                        <li>
                            <button 
                                className="logout-btn-link" 
                                onClick={() => handleLogout(setUser, navigate)}
                            >
                                Logout
                            </button>
                        </li>
                    </ul>
                </nav>

                <main className="content">
                    <header className="content-header">
                        <h2>🩸 Blood Inventory Management</h2>
                        <a href="#addBagModal" className="btn btn-success">+ Add Blood Bag</a>
                    </header>

                    <section className="card">
                        <table className="inventory-table">
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
                                        <td>{bag.bag_id}</td>
                                        <td><strong>{bag.blood_group}</strong></td>
                                        <td>{bag.donor_name}</td>
                                        <td>{new Date(bag.collection_date).toLocaleDateString()}</td>
                                        <td>{new Date(bag.expiry_date).toLocaleDateString()}</td>
                                        <td>
                                            <span className={`badge ${bag.status === 'Available' ? 'badge-success' : 'badge-danger'}`}>
                                                {bag.status}
                                            </span>
                                        </td>
                                        <td>
                                            {bag.status === 'Available' ? (
                                                <button className="btn btn-primary">Dispatch</button>
                                            ) : (
                                                <button className="btn btn-outline-danger">🗑 Trash</button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                                {!loading && inventory.length === 0 && (
                                    <tr><td colSpan="7" style={{textAlign: 'center'}}>No blood bags in inventory.</td></tr>
                                )}
                            </tbody>
                        </table>
                    </section>
                </main>
            </div>

            {/* Modal for Adding Blood Bag */}
            <div id="addBagModal" className="modal-overlay">
                <div className="modal-content">
                    <div className="modal-header">
                        <h3>Add New Blood Bag</h3>
                        <a href="#" className="close-btn">&times;</a>
                    </div>
                    <form onSubmit={handleAddBag}>
                        <div className="modal-body">
                            <div className="form-group">
                                <label>Donor ID</label>
                                <input type="text" name="donor_id" placeholder="Enter Donor ID" required />
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
                        </div>
                        <div className="modal-footer">
                            <button type="submit" className="btn btn-primary">Save to Inventory</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}