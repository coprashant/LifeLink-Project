import "./DonorPage.css";

export function DonorPage() {
    return (
        <div className="donor-page-wrapper">
            <main className="container main-content">
                <div className="status-banner">
                    <h1>You are Eligible!</h1>
                    <p>You can save a life today by donating blood.</p>
                    <button className="btn btn-action">Schedule Donation Now</button>
                </div>

                <div className="dashboard-grid">
                    <div className="card">
                        <div className="card-header">Your Profile</div>
                        <div className="card-body donor-info">
                            <div className="blood-group-circle">O+</div>
                            <p className="text-muted">Universal Donor</p>
                        </div>
                    </div>

                    <div className="card history-card">
                        <div className="card-header">Donation History</div>
                        <div className="card-body">
                            <table className="history-table">
                                <thead>
                                    <tr>
                                        <th>Date</th>
                                        <th>Center</th>
                                        <th>Units</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>2023-11-15</td>
                                        <td>City Central</td>
                                        <td>1</td>
                                        <td><span className="badge badge-success">Completed</span></td>
                                    </tr>
                                    <tr>
                                        <td>2023-05-20</td>
                                        <td>Memorial Hospital</td>
                                        <td>1</td>
                                        <td><span className="badge badge-success">Completed</span></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}