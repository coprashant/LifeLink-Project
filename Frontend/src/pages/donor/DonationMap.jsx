import { useEffect, useState, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { apiFetch } from '../../utils/api';
import L from 'leaflet';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import 'leaflet/dist/leaflet.css';
import "./DonationStatus.css";

let DefaultIcon = L.icon({
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

const redIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

export default function DonationMap({onBookingSuccess}) {
    const [centers, setCenters] = useState([]);
    const [selectedCenter, setSelectedCenter] = useState(null);
    const [formData, setFormData] = useState({ date: '', time: '' });

    useEffect(() => {
        const fetchCenters = async () => {
            try {
                const data = await apiFetch('/donor/centers');
                setCenters(Array.isArray(data) ? data : []);
            } catch (err) {
                console.error("Failed to load centers", err);
            }
        };
        fetchCenters();
    }, []);

    const handleBooking = async (e) => {
        e.preventDefault();
        try {
            await apiFetch('/donor/appointments', {
                method: 'POST',
                body: JSON.stringify({
                    center_id: selectedCenter.center_id,
                    appointment_date: formData.date,
                    appointment_time: formData.time
                })
            });
            alert(`Success! Appointment booked at ${selectedCenter.center_name}`);
            setSelectedCenter(null);
            onBookingSuccess();
        } catch (err) {
            alert(err.message);
        }
    };

    const displayMap = useMemo(() => (
        <MapContainer 
            center={[27.7172, 85.3240]} 
            zoom={13} 
            scrollWheelZoom={true}
            style={{ height: '100%', width: '100%', borderRadius: '8px' }}
        >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {centers.map(center => (
                <Marker 
                    key={center.center_id} 
                    position={[Number(center.location_lat), Number(center.location_lng)]} 
                    icon={redIcon}
                >
                    <Popup>
                        <div className="map-popup-content">
                            <h3 className="font-bold">{center.center_name}</h3>
                            <p className="text-xs mb-2">{center.address}</p>
                            <button onClick={() => setSelectedCenter(center)} className="map-popup-btn">
                                Book Here
                            </button>
                        </div>
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    ), [centers]);

    return (
        <div className="map-wrapper" style={{ height: '500px' }}>
            {displayMap}

            {selectedCenter && (
                <div className="booking-overlay">
                    <div className="booking-modal">
                        <h2>Book Appointment</h2>
                        <p><strong>{selectedCenter.center_name}</strong></p>
                        <form onSubmit={handleBooking}>
                            <div className="form-group">
                                <label>Date</label>
                                <input 
                                    type="date" 
                                    required 
                                    className="form-input"
                                    onChange={e => setFormData({...formData, date: e.target.value})}
                                />
                            </div>
                            <div className="form-group">
                                <label>Time</label>
                                <input 
                                    type="time" 
                                    required 
                                    className="form-input"
                                    onChange={e => setFormData({...formData, time: e.target.value})}
                                />
                            </div>
                            <div className="modal-actions">
                                <button type="submit" className="btn-confirm">Confirm</button>
                                <button type="button" onClick={() => setSelectedCenter(null)} className="btn-cancel">Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}