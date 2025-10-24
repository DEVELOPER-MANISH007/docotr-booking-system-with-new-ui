import React, { useContext } from "react";
import Login from "./Pages/Login";
import { ToastContainer } from "react-toastify";
import { AppContext } from "./Context/AppContext";
import { AdminContext } from "./Context/AdminContext";
import Navbar from "./Components/Navbar";
import SideBar from "./Components/SideBar";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./Pages/Admin/Dashboard";
import AddDoctor from "./Pages/Admin/AddDoctor";
import Allapointments from "./Pages/Admin/Allapointments";
import DoctorsList from "./Pages/Admin/DoctorsList";
import { DoctorContext } from "./Context/DoctorContext";
import DoctorProfile from "./Pages/Doctor/DoctorProfile";
import DoctorAppointments from "./Pages/Doctor/doctorAppointments";
import DoctorDashboard from "./Pages/Doctor/DoctorDashboard";

const App = () => {
  const { aToken } = useContext(AdminContext);
  const {dToken} = useContext(DoctorContext)

  return aToken || dToken ?(
    <div className="bg-[#F8F9FD]">
    <ToastContainer />
    <Navbar />
  <div className="flex items-start">
  <SideBar/> 
  <Routes>
    {/* admin Routes */}
    <Route path="/" element={<></>} />
    <Route path="/admin-dashboard" element={<Dashboard />} /> 
    <Route path="/add-doctor" element={<AddDoctor />} /> 
    <Route path="/all-appointments" element={<Allapointments />} /> 
    <Route path="/doctors-list" element={<DoctorsList />} /> 
    {/* Doctor routes */}
    <Route path="/doctor-profile" element={<DoctorProfile />} />
    <Route path="/doctor-appointments" element={<DoctorAppointments />} />
    <Route path="/doctor-dashboard" element={<DoctorDashboard />} />

  </Routes>
  </div>
    </div>
  ):(

  <>
    <Login />
    <ToastContainer />
  </>
  )
};

export default App;
