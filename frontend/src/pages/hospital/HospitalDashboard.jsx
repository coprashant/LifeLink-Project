import { useState, useEffect } from "react";
import axios from "axios";
import "./HospitalDashboard.css";
import BloodRequestForm from "./BloodRequestForm";
import RequestStatusTable from "./RequestStatusTable";

export function HospitalDashboard() {

    const [requests, setRequests] = useState([]);

    const fetchRequests = async () => {
        try {
            const response = await axios.get("/api/hospital/requests");
            setRequests(response.data.data);
        } catch (error) {
            if (error.response){
                alert(error.response.data.message || "Server error occured.");
            }else if (error.request){
                alert("Server error occured.");
            }
                else{
                alert("Something went wrong");
            }
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
            if (error.response){
                alert(error.response.data.message || "Server error occured.");
            }else if (error.request){
                alert("Server error occured.");
            }
                else{
                alert("Something went wrong");
            }
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
