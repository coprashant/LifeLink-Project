import dayjs from 'dayjs';
import "./DonationStatus.css";

export function DonationStatus({ lastDonation, daysSince , onFindCenter, hasAppointment }) {

    const isFirstTime = !lastDonation;
    const days = daysSince !== undefined ? parseInt(daysSince) : 0;
    const isEligible = isFirstTime || days >= 90;

    const formattedDate = lastDonation 
        ? dayjs(lastDonation).format("DD MMM YYYY") 
        : null;

    return (
        <div className={`status-card ${isEligible ? "eligible-bg" : "not-eligible-bg"}`}>
            <div className="status-header">
                <span className={`status-icon ${isEligible ? "icon-check" : "icon-wait"}`}>
                    {isEligible ? "✓" : "✕"}
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
                            ? `It has been ${days} days since your last donation on ${formattedDate}. Thank you for staying ready to help!`
                            : `It has been ${days} days since your last donation on ${formattedDate}. `
                        }
                    </p>
                )}
            </div>

            {!isEligible && (
                <div className="progress-container">
                <div className="progress-track">
                    <div 
                        className="progress-bar" 
                        style={{ width: `${Math.min((days / 90) * 100, 100)}%` }}
                    ></div>
                </div>
                <small>
                    <strong>{90 - days} days</strong> remaining until your next hero moment!
                </small>
                </div>
            )}

            {isEligible && (
                <div className="status-action">
                    <button 
                        className="find-center-btn"
                        disabled={hasAppointment}
                        onClick={onFindCenter}
                        title={hasAppointment ? "Cancel current appointment to book a new one" : ""}
                    >
                        {hasAppointment ? "Appointment Active" : "Find Donation Center"}
                    </button>
                </div>
            )}
        </div>
    );
}