export default function RequestStatusTable({ requests }) {

    return (
        <>
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
                        {requests.map((req) => (
                            <tr key={req.id}>
                                <td>REQ-{req.id}</td>
                                <td>{req.blood_group}</td>
                                <td>{req.units}</td>
                                <td>
                                    {req.created_at
                                        ? new Date(req.created_at).toLocaleDateString()
                                        : "—"}
                                </td>
                                <td>
                                    <span className={`badge ${
                                        req.status === "Fulfilled"
                                            ? "badge-success"
                                            : "badge-warning"
                                    }`}>
                                        {req.status || "Pending"}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>

                </table>
            </div>
        </>
    );
}
