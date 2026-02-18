import dayjs from 'dayjs';
import './UpcomingAppointments.css';

export function UpcomingAppointments({ appointments, onCancel }) {
    if (!appointments || appointments.length === 0) {
        return (
            <div className="no-appointments">
                <p>No upcoming appointments found. Hurry Up and book one from our donation centres above!</p>
            </div>
        );
    }

    return (
        <div className="appointments-section">
            <h2>Upcoming Appointments</h2>
            <div className="appointments-grid">
                {appointments.map(app => (
                    <div key={app.appointment_id} className="appointment-card">
                        <div className="appointment-info">
                            <h4>{app.center_name}</h4>
                            <p>
                                📅 {dayjs(app.appointment_date).format('DD MMM YYYY')} at {app.appointment_time}
                            </p>
                            <span className="status-badge">
                                {app.status.toUpperCase()}
                            </span>
                        </div>
                        <button 
                            className="btn-cancel-appointment"
                            onClick={() => onCancel(app.appointment_id)}
                        >
                            Cancel
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}