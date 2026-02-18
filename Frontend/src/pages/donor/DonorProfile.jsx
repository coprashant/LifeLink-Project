export function DonorProfile( {donorInfo} ) {
    return (
        <div className="info-box">
            <p><strong>Blood Group:</strong> {donorInfo.blood_group || "A+"}</p>
            <p><strong>Contact_no:</strong> {donorInfo.contact_no || "98887654"}</p>
            <p><strong>Address:</strong> {donorInfo.address || "Kathmandu, Nepal"}</p>
            {/* <p><strong>Last Donation:</strong> {donorInfo.lastDonation || "None"}</p> */}
            {/* <p><strong>Eligibility:</strong> <span className={donorInfo.status === "Eligible" ? "eligible" : "not-eligible"}>{donorInfo.status}</span></p> */}
        </div>
    );
}