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
import { AdminLayout } from './pages/admin/AdminLayout';
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

    {/* Private Dashboards */}
    <Route path="donor/dashboard" element={<DonorDashboard user={user} />} />
    <Route path="hospital/dashboard" element={<HospitalDashboard user={user} />} />
    
    {/* REMOVE the old admin-dashboard line and use this grouped structure: */}
    <Route path="admin" element={<AdminLayout setUser={setUser} />}>
        <Route index element={<AdminDashboard user={user} />} /> {/* Matches /admin */}
        <Route path="dashboard" element={<AdminDashboard user={user} />} /> {/* Matches /admin/dashboard */}
        <Route path="inventory" element={<AdminPage />} />
    </Route>

    <Route path="donor" element={<DonorPage />} />
  </Routes>
    
  )

}

export default App
