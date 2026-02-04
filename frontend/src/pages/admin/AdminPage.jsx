import "./AdminPage.css";

export function AdminPage() {
    return (
        <>
            <div className="admin-page-wrapper">
                <div className="admin-container">
                    <nav className="sidebar">
                        <h3 className="brand">LifeLink Admin</h3>
                        <ul className="nav-links">
                            <li><a href="/admin/dashboard">Dashboard</a></li>
                            <li><a href="/admin/inventory" className="active">Manage Inventory</a></li>
                            <li><a href="/admin/donors">Manage Donors</a></li>
                            <li><a href="/admin/requests">Hospital Requests <span className="badge badge-danger">2</span></a></li>
                            <li><a href="/logout" className="logout">Logout</a></li>
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
                                    <tr className="row-expired">
                                        <td>BAG-501</td>
                                        <td><strong>B-</strong></td>
                                        <td>Donor #420</td>
                                        <td>2023-11-25</td>
                                        <td>2023-12-30</td>
                                        <td><span className="status-text-danger">Expired</span></td>
                                        <td>
                                            <button className="btn btn-outline-danger">🗑 Trash</button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>BAG-502</td>
                                        <td><strong>A+</strong></td>
                                        <td>John Doe</td>
                                        <td>2024-01-10</td>
                                        <td>2024-02-21</td>
                                        <td><span className="badge badge-success">Available</span></td>
                                        <td>
                                            <button className="btn btn-primary">Dispatch</button>
                                            <button className="btn btn-outline-danger">🗑</button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </section>
                    </main>
                </div>

                <div id="addBagModal" className="modal-overlay">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h3>Add New Blood Bag</h3>
                            <a href="#" className="close-btn">&times;</a>
                        </div>
                        <form action="/admin/add-bag" method="POST">
                            <div className="modal-body">
                                <div className="form-group">
                                    <label>Donor ID</label>
                                    <input type="text" name="donor_id" placeholder="Scan or type ID" required />
                                </div>
                                <div className="form-group">
                                    <label>Blood Group</label>
                                    <select name="blood_group">
                                        <option>A+</option>
                                        <option>B-</option>
                                        <option>O+</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Collection Date</label>
                                    <input type="date" name="collection_date" required />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="submit" className="btn btn-primary">Save to Inventory</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}