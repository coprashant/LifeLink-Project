import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
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
import { MainLayout } from './pages/layouts/MainLayout';
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
    <Route element={<MainLayout user={user} setUser={setUser} />}>
          <Route index element={<HomePage />} />
          <Route path="login" element={<LoginPage setUser={setUser} />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="donor" element={<DonorPage />} />
          {/* Add donor-dashboard here if you want it to have the top Navbar */}
          <Route path="donor/dashboard" element={<DonorDashboard user={user} />} />
          <Route path="hospital/dashboard" element={<HospitalDashboard user={user} />} />
      </Route>

      {/* Admin Pages (Keep separate because of Sidebar) */}
      <Route path="admin" element={<AdminLayout setUser={setUser} />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboard user={user} />} />
          <Route path="inventory" element={<AdminPage />} />
      </Route>
  </Routes>
    
  )

}

export default App
