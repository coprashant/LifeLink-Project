import dayjs from 'dayjs';
export function DonationHistory({ donorHistory }) {
    return (
        <div className="card">
            <div className="card-header">Donation History</div>
            <div className="card-body">
                <table className="history-table">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Center</th>
                            <th>Units</th>
                            {/* <th>Status</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {donorHistory?.map((item, index) => (
                            <tr key={index}>
                                <td>
                                    {item.created_at
                                        ? dayjs(item.created_at).format("DD MMM YYYY")
                                        : "—"}
                                </td>
                                <td>{item.center || "Patan"}</td>
                                <td>{item.units}</td>
                                {/* <td><span className="badge badge-success">Completed</span></td> */}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}