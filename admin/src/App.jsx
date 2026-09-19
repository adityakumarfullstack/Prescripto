import React, { useContext } from 'react'
import Login from './pages/Login'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AdminContext } from './context/AdminContext';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './pages/admin/Dashboard';
import AllAppointments from './pages/admin/AllAppointments';
import AddDoctor from './pages/admin/AddDoctor';
import DoctorList from './pages/admin/DoctorList';
import { DoctorContext } from './context/DoctorContext';
import DoctorDashboard from './pages/doctor/DoctorDashboard';
import DoctorAppointments from './pages/doctor/DoctorAppointments';
import DoctorProfile from './pages/doctor/DoctorProfile';

const App = () => {
  const { aToken } = useContext(AdminContext)
  const { doctorToken } = useContext(DoctorContext)
  return aToken || doctorToken ? (
    <main className="bg-[#F8F9FD]">
      <ToastContainer />
      <Navbar />
      <div className="flex">
        <Sidebar />
        <Routes>
          {/* Admin Routes */}
          <Route path="/" element={<></>} />
          <Route path="/admin-dashboard" element={<Dashboard />} />
          <Route path="/all-appointments" element={<AllAppointments />} />
          <Route path="/add-doctor" element={<AddDoctor />} />
          <Route path="/all-doctors" element={<DoctorList />} />

          {/* Doctor Routes */}
          <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
          <Route path="/doctor-appointments" element={<DoctorAppointments />} />
          <Route path="/doctor-profile" element={<DoctorProfile />} />
        </Routes>
      </div>
    </main>
  ) : (
    <main>
      <Login />
      <ToastContainer />
    </main>
  )
}

export default App