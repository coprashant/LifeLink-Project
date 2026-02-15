import {useState} from "react";

export function EditProfileForm({ onUpdate }) {
    const [formData, setFormData] = useState({ name: "", bloodGroup: "" });

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
                value={formData.name}
                onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                }
            />

            <input 
                type="text" 
                placeholder="Blood Group"
                value={formData.bloodGroup}
                onChange={(e) =>
                    setFormData({ ...formData, bloodGroup: e.target.value })
                }
            />

            <button type="submit">Save Changes</button>
        </form>
    );
}
