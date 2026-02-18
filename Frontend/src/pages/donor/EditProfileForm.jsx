import {useState, useEffect } from "react";

export function EditProfileForm({ onUpdate, initialData }) {
    const [formData, setFormData] = useState({ full_name: "", contact_no: "", address: "", blood_group: "" });

    useEffect(() => {
        if (initialData) {
            setFormData({
                full_name: initialData.full_name || "",
                contact_no: initialData.contact_no || "",
                address: initialData.address || "",
                blood_group: initialData.blood_group || "" 
            });
        }
    }, [initialData]);

    const handleSubmit = (e) => {
        e.preventDefault();   
        onUpdate(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="edit-container">
            <h3>Update Profile</h3>

            <input 
                type="text" 
                placeholder="New Name"
                value={formData.full_name}
                onChange={(e) =>
                    setFormData({ ...formData, full_name: e.target.value })
                }
            />

            <input 
                type="text" 
                placeholder="Contact No"
                value={formData.contact_no}
                onChange={(e) =>
                    setFormData({ ...formData, contact_no: e.target.value })
                }
            />

            <input 
                type="text" 
                placeholder="Address"
                value={formData.address}
                onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                }
            />

            <select 
                value={formData.blood_group}
                onChange={(e) =>
                    setFormData({ ...formData, blood_group: e.target.value })
                }
            >
                <option value="">Blood Group</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
            </select>

            <button type="submit">Save Changes</button>
        </form>
    );
}
