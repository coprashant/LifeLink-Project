import { useState, useEffect } from "react";
import axios from 'axios';
import { DonorHeader } from "./DonorHeader";
import { DonorProfile } from "./DonorProfile";
import { EditProfileForm } from "./EditProfileForm";
import { DonationHistory } from "./DonationHistory";
import { DonationStatus } from "./DonationStatus";
import "./DonorDashboard.css";

export function DonorDashboard() {
    const [donorInfo, setDonorInfo] = useState({
        full_name: "",
        blood_group: "",
        lastDonation: null,
        status: "",
        daysSince: 0,
        history: []
    });

    const fetchRequests = async () => {
        try {
            const response = await axios.get("/api/donor/profile", {
                withCredentials: true
            });
            console.log("History Check:", response.data.history);
            setDonorInfo(response.data);
        } catch (error) {
            if (error.response) {
                alert(error.response.data.message || "Server error occured.");
            } else if (error.request) {
                alert("Server error occured.");
            } else {
                alert("Something went wrong");
            }
        }
    };

    useEffect(() => {
        fetchRequests();
    }, []);

    const updateProfile = async (data) => {
        try {
            await axios.put("/api/donor/profile", data, {
                withCredentials: true
            });
            fetchRequests();
        } catch (error) {
            alert(error.response?.data?.message || "Something went wrong");
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
                            lastDonation={donorInfo.lastDonation} 
                            daysSince={donorInfo.daysSince}
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