import dayjs from "dayjs";

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
                            <th>Urgency</th>
                            <th>Date</th>
                            <th>Status</th>
                        </tr>
                    </thead>

                    <tbody>
                        {requests?.map((req) => (
                            <tr key={req.request_id}>
                                <td>REQ-{req.request_id}</td>
                                <td><strong>{req.blood_group_needed}</strong></td>
                                <td>{req.units_requested}</td>
                                <td>
                                    <span className={`urgency-tag ${req.urgency?.toLowerCase()}`}>
                                        {req.urgency}
                                    </span>
                                </td>
                                <td>
                                    {req.request_date
                                        ? dayjs(req.request_date).format("DD MMM YYYY")
                                        : "—"}
                                </td>
                                <td>
                                    <span className={`badge badge-${req.status?.toLowerCase() || 'pending'}`}>
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