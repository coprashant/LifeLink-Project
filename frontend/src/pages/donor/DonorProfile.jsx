export function DonorProfile( {donorInfo} ) {
    return (
        <div className="info-box">
            <p><strong>Blood Group:</strong> {donorInfo.bloodGroup || "N/A"}</p>
            <p><strong>Last Donation:</strong> {donorInfo.lastDonation || "None"}</p>
            {/* <p><strong>Eligibility:</strong> <span className={donorInfo.status === "Eligible" ? "eligible" : "not-eligible"}>{donorInfo.status}</span></p> */}
        </div>
    );
}