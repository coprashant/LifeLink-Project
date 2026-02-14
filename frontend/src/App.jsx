import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { apiFetch } from './utils/api';
import { HomePage } from './pages/home/HomePage';
import { LoginPage } from './pages/login/LoginPage';
import { RegisterPage } from './pages/login/RegisterPage';
import { DonorPage } from './pages/donor/DonorPage';
import { DonorDashboard } from './pages/donor/DonorDashboard';
// import { HospitalPage } from './pages/hospital/HospitalPage';
import { HospitalDashboard } from './pages/hospital/HospitalDashboard';
import { AdminPage } from './pages/admin/AdminPage';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const data = await apiFetch('/auth/me');
        if (data.loggedIn) {
          setUser(data.user); 
        }
      } catch (err) {
        console.log("No active session found.");
      } finally {
        setLoading(false);
      }
    };
    checkUser();
  }, []);

  if (loading) return <div>Loading...</div>;
  return (
    <Routes>
     <Route index element={<HomePage />} />
     <Route path="login" element={<LoginPage setUser={setUser} />} />
     <Route path="register" element={<RegisterPage />} />
  
      {/* Dashboards - Pass the user state as a prop */}
      <Route path="donor-dashboard" element={<DonorDashboard user={user} />} />
      <Route path="hospital-dashboard" element={<HospitalDashboard user={user} />} />
      <Route path="admin-dashboard" element={<AdminDashboard user={user} />} />
  
      {/* Landing Pages (if separate from dashboards) */}
      <Route path="donor" element={<DonorPage />} />
      <Route path="admin" element={<AdminPage />} />
    </Routes>
    
  )

}

export default App
