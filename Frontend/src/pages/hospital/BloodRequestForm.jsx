import { useState } from "react";
import "./HospitalDashboard.css";

export default function BloodRequestForm({ onSubmit }) {

    const [bloodGroup, setBloodGroup] = useState("A+");
    const [units, setUnits] = useState("");
    const [urgency, setUrgency] = useState("Normal");

    const handleSubmit = (e) => {
        e.preventDefault();

        if(!units || units < 1){
            alert("units must at least 1")
            return;
        }

        onSubmit({
            blood_group_needed: bloodGroup,
            units_requested: units,
            urgency: urgency
        });
    };

    return (
        <section className="card">
            <div className="card-header">
                <h3>🚑 Request Blood Units</h3>
            </div>
            <div className="card-body">
                <form onSubmit={handleSubmit}>
                    <div className="form-grid">
                        <div>
                            <label className="form-label">Blood Group Needed</label>
                            <select
                                className="form-select"
                                value={bloodGroup}
                                onChange={(e) => setBloodGroup(e.target.value)}
                            >
                                <option value="A+">A+</option>
                                <option value="A-">A-</option>
                                <option value="B+">B+</option>
                                <option value="B-">B-</option>
                                <option value="O+">O+</option>
                                <option value="O-">O-</option>
                                <option value="AB+">AB+</option>
                                <option value="AB-">AB-</option>
                            </select>
                        </div>

                        <div>
                            <label className="form-label">Units Required</label>
                            <input
                                type="number"
                                className="form-input"
                                min="1"
                                max="10"
                                value={units}
                                onChange={(e) => setUnits(e.target.value)}
                            />
                        </div>

                        <div>
                            <label className="form-label">Urgency</label>
                            <select
                                className="form-select"
                                value={urgency}
                                onChange={(e) => setUrgency(e.target.value)}
                            >
                                <option value="Normal">Normal</option>
                                <option value="Urgent">Urgent</option>
                                <option value="Critical">Critical</option>
                            </select>
                        </div>
                    </div>

                    <button className="btn-submit">Submit Request</button>
                </form>
            </div>
        </section>
    );
}
