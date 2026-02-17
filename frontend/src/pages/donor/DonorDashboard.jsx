import { useState, useEffect } from "react";
import axios from 'axios';
import { DonorHeader } from "./DonorHeader";
import { DonorProfile } from "./DonorProfile";
import { EditProfileForm } from "./EditProfileForm";
import { DonationHistory } from "./DonationHistory";
import "./DonorDashboard.css";

export function DonorDashboard() {
    const [donorInfo, setDonorInfo] = useState({
        name: "",
        bloodGroup: "",
        lastDonation: "",
        history:[]
    });

    const fetchRequests = async () =>{
        try{
            const response = await axios.get("/api/donor/profile", {
                withCredentials: true
            });
            setDonorInfo(response.data);
        }catch (error){
            if (error.response){
                alert(error.response.data.message || "Server error occured.");
            }else if(error.request){
                alert("Server error occured.");
            }else{
                alert("Something went wrong");
            }
        }
    };

    useEffect(() =>{
        fetchRequests();
    }, []);

    const updateProfile = async (data) =>{
        try{
            await axios.put("/api/donor/profile", data, {
                withCredentials: true
            });
            fetchRequests();
        } catch(error){
            if(error.response){
                alert(error.response.data.message || "Server error occured.");
            }else if (error.request){
                alert("Server error occured. ");
            } else{
                alert("Something went wrong");
            }
        }
    };

    return (
        <div className="donor-dashboard-wrapper">
            <div className="container">
                <DonorHeader name={donorInfo.name} />
                <section className="section">
                    <h2>My Profile</h2>
                    <DonorProfile donorInfo={donorInfo} />
                    <EditProfileForm onUpdate={updateProfile} />
                </section>
               <DonationHistory donorHistory={donorInfo.history} />
            </div>
        </div>
    );
}