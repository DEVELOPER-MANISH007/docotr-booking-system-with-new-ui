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

const App = () => {
  const { aToken } = useContext(AdminContext);

  return aToken ?(
    <div className="bg-[#F8F9FD]">
    <ToastContainer />
    <Navbar />
  <div className="flex items-start">
  <SideBar/> 
  <Routes>
    <Route path="/" element={<></>} />
    <Route path="/admin-dashboard" element={<Dashboard />} /> 
    <Route path="/add-doctor" element={<AddDoctor />} /> 
    <Route path="/all-appointments" element={<Allapointments />} /> 
    <Route path="/doctors-list" element={<DoctorsList />} /> 
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
