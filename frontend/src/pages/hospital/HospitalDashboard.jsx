import "./HospitalDashboard.css";
export function HospitalDashboard() {
    return (
        <div className="hospital-page-wrapper">
            <nav className="navbar">
                <div className="container nav-content">
                    <span className="navbar-brand">🏥 City General Hospital</span>
                    <a href="/logout" className="btn-outline">Logout</a>
                </div>
            </nav>

            <main className="container">
                <section className="card">
                    <div className="card-header">
                        <h3>🚑 Request Blood Units</h3>
                    </div>
                    <div className="card-body">
                        <form>
                            <div className="form-grid">
                                <div>
                                    <label className="form-label">Blood Group Needed</label>
                                    <select className="form-select">
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
                                <div>
                                    <label className="form-label">Units Required</label>
                                    <input type="number" className="form-input" min="1" max="10" />
                                </div>
                                {/* <div>
                                    <label className="form-label">Urgency</label>
                                    <div className="radio-group">
                                        <input type="radio" name="urgency" id="normal" defaultChecked />
                                        <label htmlFor="normal" className="radio-label label-success">Normal</label>

                                        <input type="radio" name="urgency" id="critical" />
                                        <label htmlFor="critical" className="radio-label label-danger">Critical</label>
                                    </div>
                                </div> */}
                            </div>
                            <button className="btn-submit">Submit Request</button>
                        </form>
                    </div>
                </section>

                <h3 className="section-title">Request Status</h3>
                <div className="table-container">
                    <table className="status-table">
                        <thead>
                            <tr>
                                <th>Request ID</th>
                                <th>Blood Group</th>
                                <th>Units</th>
                                <th>Date</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>REQ-10023</td>
                                <td>B+</td>
                                <td>2</td>
                                <td>2024-03-15</td>
                                <td><span className="badge badge-warning">Pending</span></td>
                            </tr>
                            <tr>
                                <td>REQ-10020</td>
                                <td>O-</td>
                                <td>5</td>
                                <td>2024-03-10</td>
                                <td><span className="badge badge-success">Fulfilled</span></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    );
}
