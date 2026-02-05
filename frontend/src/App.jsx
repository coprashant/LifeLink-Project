import { Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/home/HomePage';
import { LoginPage } from './pages/login/LoginPage';
import { RegisterPage } from './pages/login/RegisterPage';
import { DonorPage } from './pages/donor/DonorPage';
import { DonorDashboard } from './pages/donor/DonorDashboard';
import { HospitalPage } from './pages/hospital/HospitalPage';
import { HospitalDashboard } from './pages/hospital/HospitalDashboard';
import { AdminPage } from './pages/admin/AdminPage';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import './App.css'

function App() {

  return (
    <Routes>
      <Route index element = {<HomePage />} />
      <Route path="login" element = {<LoginPage />} />
      <Route path="register" element = {<RegisterPage />} />
      <Route path="donor" element = {<DonorPage />} />
      <Route path="donor-dashboard" element = {<DonorDashboard />} />
      <Route path="hospital" element = {<HospitalPage />} />
      <Route path="hospital-dashboard" element = {<HospitalDashboard />} />
      <Route path="admin" element = {<AdminPage />} />
      <Route path="admin-dashboard" element = {<AdminDashboard />} />
    </Routes>
    
  )

}

export default App
