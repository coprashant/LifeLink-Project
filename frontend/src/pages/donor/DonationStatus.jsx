import dayjs from 'dayjs';
import "./DonationStatus.css"; // Ensure you create this CSS file

export function DonationStatus({ lastDonation, status, daysSince }) {
    // If no lastDonation exists, they are a first-time donor
    const isFirstTime = !lastDonation;
    const isEligible = status === "Eligible";

    // Format the date nicely
    const formattedDate = lastDonation 
        ? dayjs(lastDonation).format("DD MMM YYYY") 
        : null;

    return (
        <div className={`status-card ${isEligible ? "eligible-bg" : "not-eligible-bg"}`}>
            <div className="status-header">
                <span className={`status-icon ${isEligible ? "icon-check" : "icon-wait"}`}>
                    {isEligible ? "✓" : "X"}
                </span>
                <h3>{isEligible ? "You are Eligible!" : "Not Yet Eligible"}</h3>
            </div>

            <div className="status-body">
                {isFirstTime ? (
                    <p>
                        We couldn't find any previous donation records for you. 
                        <strong> You are ready to make your first donation today!</strong>
                    </p>
                ) : (
                    <p>
                        {isEligible 
                            ? `It has been ${daysSince} days since your last donation on ${formattedDate}. Thank you for staying ready to help!`
                            : `It has been ${daysSince} days since your last donation on ${formattedDate}. You need to wait a total of 90 days between donations.`
                        }
                    </p>
                )}
            </div>

            {isEligible && (
                <div className="status-action">
                    <button className="btn-eligible">Find a Donation Center</button>
                </div>
            )}
        </div>
    );
}