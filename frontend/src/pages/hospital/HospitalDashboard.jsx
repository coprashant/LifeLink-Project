import { useState, useEffect } from "react";
import { apiFetch } from "../../utils/api"; // Using your existing utility
import "./HospitalDashboard.css";
import BloodRequestForm from "./BloodRequestForm";
import RequestStatusTable from "./RequestStatusTable";

export function HospitalDashboard({ user }) {
    const [requests, setRequests] = useState([]);

    const fetchRequests = async () => {
        try {
            // Updated to use your consistent apiFetch utility
            const data = await apiFetch("/hospital/requests");
            setRequests(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error("Fetch error:", error);
        }
    };

    useEffect(() => {
        fetchRequests();
    }, []);

    const createRequest = async (formData) => {
        try {
            await apiFetch("/hospital/requests", {
                method: "POST",
                body: JSON.stringify(formData)
            });
            fetchRequests(); // Refresh table
        } catch (error) {
            alert(error.message || "Failed to submit request");
        }
    };

    return (
        <div className="hospital-dashboard-wrapper">
            <main className="container dashboard-main">
                <header className="dashboard-header">
                    <h2>Hospital Dashboard</h2>
                    <p className="text-muted">Welcome, {user?.name || "City General Hospital"}</p>
                </header>

                <div className="dashboard-grid">
                    <div className="form-column">
                        <BloodRequestForm onSubmit={createRequest} />
                    </div>
                    <div className="table-column">
                        <RequestStatusTable requests={requests} />
                    </div>
                </div>
            </main>
        </div>
    );
}