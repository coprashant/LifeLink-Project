import dayjs from 'dayjs';
import './DonationHistory.css';

export function DonationHistory({ donorHistory }) {
    return (
        <div className="card">
            <div className="card-header">Donation History</div>
            <div className="card-body">
                {donorHistory && donorHistory.length > 0 ? (
                    <table className="history-table">
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Center</th>
                                <th>Units</th>
                            </tr>
                        </thead>
                        <tbody>
                            {donorHistory.map((item, index) => (
                                <tr key={item.donation_id || index}>
                                    <td>
                                        {item.created_at
                                            ? dayjs(item.created_at).format("DD MMM YYYY")
                                            : "—"}
                                    </td>
                                    <td>{item.center || "Main Center"}</td>
                                    <td>{item.units}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <div className="no-history">
                        <p>No donation records found yet. Start your journey today!</p>
                    </div>
                )}
            </div>
        </div>
    );
}