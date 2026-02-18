import { useState, useEffect } from "react";
import axios from 'axios';
import { DonorHeader } from "./DonorHeader";
import { DonorProfile } from "./DonorProfile";
import { EditProfileForm } from "./EditProfileForm";
import { DonationHistory } from "./DonationHistory";
import { DonationStatus } from "./DonationStatus";
import { UpcomingAppointments } from "./UpcomingAppointments";
import DonationMap from "./DonationMap"; 
import "./DonorDashboard.css";

export function DonorDashboard() {
    const [showMap, setShowMap] = useState(false);
    const [appointments, setAppointments] = useState([]);

    const [donorInfo, setDonorInfo] = useState({
        full_name: "",
        blood_group: "",
        lastDonation: null,
        status: "",
        daysSince: 0,
        history: []
    });

const fetchDashboardData = async () => {
        try {
            const [profileRes, appointRes] = await Promise.all([
                axios.get("/api/donor/profile", { withCredentials: true }),
                axios.get("/api/donor/appointments", { withCredentials: true })
            ]);
            setDonorInfo(profileRes.data);
            setAppointments(appointRes.data);
        } catch (error) {
            console.error("Dashboard fetch error", error);
        }
    };

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const updateProfile = async (data) => {
        try {
            await axios.put("/api/donor/profile", data, { withCredentials: true });
            fetchDashboardData();
        } catch (error) {
            alert("Update failed");
        }
    };

    const cancelAppointment = async (id) => {
        if (!window.confirm("Cancel this appointment?")) return;
        try {
            await axios.delete(`/api/donor/appointments/${id}`, { withCredentials: true });
            fetchDashboardData();
        } catch (error) {
            alert("Cancellation failed");
        }
    };

    if (!donorInfo.full_name) {
        return <div className="loading">Loading Dashboard...</div>;
    }

    return (
        <div className="donor-dashboard-wrapper">
            <div className="container">
                <DonorHeader full_name={donorInfo.full_name} />

                <div className="dashboard-grid">
                    <div className="left-column">
                        <DonationStatus
                            status={donorInfo.status}
                            lastDonation={donorInfo.lastDonation} 
                            daysSince={donorInfo.daysSince}
                            hasAppointment={appointments.length > 0}
                            onFindCenter={() => setShowMap(true)}
                        />

                        {showMap && (
                            <div className="map-container-wrapper">
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                                    <h3>Select a Donation Center</h3>
                                    <button 
                                        onClick={() => setShowMap(false)} 
                                        className="btn-cancel" 
                                        style={{ padding: '5px 15px', width: 'auto' }}
                                    >
                                        ✕ Close Map
                                    </button>
                                </div>
                                <DonationMap onBookingSuccess={() => {
                                    fetchDashboardData(); 
                                    setShowMap(false);    
        }} />
                            </div>
                        )}
                        
                        <UpcomingAppointments 
                            appointments={appointments} 
                            onCancel={cancelAppointment} 
                        />
                        <DonationHistory donorHistory={donorInfo.history} />
                    </div>

                    <div className="right-column">
                        <section className="section">
                            <h2>My Profile</h2>
                            <DonorProfile donorInfo={donorInfo} />
                            <EditProfileForm onUpdate={updateProfile} initialData={donorInfo} />
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
}