import { useState, useEffect } from "react";
import axios from "axios";
import "./HospitalDashboard.css";
import BloodRequestForm from "./BloodRequestForm";
import RequestStatusTable from "./RequestStatusTable";

export function HospitalDashboard() {

    const [requests, setRequests] = useState([]);

    const fetchRequests = async () => {
        try {
            const res = await axios.get("/api/hospital/requests");
            setRequests(res.data.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchRequests();
    }, []);

    const createRequest = async (data) => {
        try {
            await axios.post("/api/hospital/requests", data);
            fetchRequests();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="hospital-page-wrapper">
            <nav className="navbar">
                <div className="container nav-content">
                    <span className="navbar-brand">🏥 City General Hospital</span>
                    <a href="/logout" className="btn-outline">Logout</a>
                </div>
            </nav>

            <main className="container">
                <BloodRequestForm onSubmit={createRequest} />
                <RequestStatusTable requests={requests} />
            </main>
        </div>
    );
}
