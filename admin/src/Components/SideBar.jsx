import React, { useContext } from "react";
import { AdminContext } from "../Context/AdminContext";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";
import { DoctorContext } from "../Context/DoctorContext";

const SideBar = () => {
  const { aToken } = useContext(AdminContext);
  const { dToken } = useContext(DoctorContext);
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white border-r border-gray-200 shadow-xl">
      {/* Admin Menu */}
      {aToken && (
        <div className="p-4">
          <div className="mb-6 mt-4">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider px-4 mb-3">
              Admin Menu
            </h3>
          </div>
          
          <ul className="space-y-2">
            <NavLink
              to="/admin-dashboard"
              className={({ isActive }) =>
                `group flex items-center gap-4 py-3.5 px-4 rounded-xl cursor-pointer transition-all duration-300 ${
                  isActive
                    ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg transform scale-105"
                    : "text-gray-700 hover:bg-gray-100 hover:translate-x-1"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all ${
                    isActive ? "bg-white/20" : "bg-gray-200 group-hover:bg-blue-100"
                  }`}>
                    <img className="w-5 h-5" src={assets.home_icon} alt="" />
                  </div>
                  <span className="font-semibold hidden md:block">Dashboard</span>
                  {isActive && (
                    <div className="ml-auto w-2 h-2 bg-white rounded-full animate-pulse"></div>
                  )}
                </>
              )}
            </NavLink>

            <NavLink
              to="/all-appointments"
              className={({ isActive }) =>
                `group flex items-center gap-4 py-3.5 px-4 rounded-xl cursor-pointer transition-all duration-300 ${
                  isActive
                    ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg transform scale-105"
                    : "text-gray-700 hover:bg-gray-100 hover:translate-x-1"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all ${
                    isActive ? "bg-white/20" : "bg-gray-200 group-hover:bg-purple-100"
                  }`}>
                    <img className="w-5 h-5" src={assets.appointment_icon} alt="" />
                  </div>
                  <span className="font-semibold hidden md:block">Appointments</span>
                  {isActive && (
                    <div className="ml-auto w-2 h-2 bg-white rounded-full animate-pulse"></div>
                  )}
                </>
              )}
            </NavLink>

            <NavLink
              to="/add-doctor"
              className={({ isActive }) =>
                `group flex items-center gap-4 py-3.5 px-4 rounded-xl cursor-pointer transition-all duration-300 ${
                  isActive
                    ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg transform scale-105"
                    : "text-gray-700 hover:bg-gray-100 hover:translate-x-1"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all ${
                    isActive ? "bg-white/20" : "bg-gray-200 group-hover:bg-green-100"
                  }`}>
                    <img className="w-5 h-5" src={assets.add_icon} alt="" />
                  </div>
                  <span className="font-semibold hidden md:block">Add Doctor</span>
                  {isActive && (
                    <div className="ml-auto w-2 h-2 bg-white rounded-full animate-pulse"></div>
                  )}
                </>
              )}
            </NavLink>

            <NavLink
              to="/doctors-list"
              className={({ isActive }) =>
                `group flex items-center gap-4 py-3.5 px-4 rounded-xl cursor-pointer transition-all duration-300 ${
                  isActive
                    ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg transform scale-105"
                    : "text-gray-700 hover:bg-gray-100 hover:translate-x-1"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all ${
                    isActive ? "bg-white/20" : "bg-gray-200 group-hover:bg-pink-100"
                  }`}>
                    <img className="w-5 h-5" src={assets.people_icon} alt="" />
                  </div>
                  <span className="font-semibold hidden md:block">Doctor List</span>
                  {isActive && (
                    <div className="ml-auto w-2 h-2 bg-white rounded-full animate-pulse"></div>
                  )}
                </>
              )}
            </NavLink>
          </ul>
        </div>
      )}

      {/* Doctor Menu */}
      {dToken && (
        <div className="p-4">
          <div className="mb-6 mt-4">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider px-4 mb-3">
              Doctor Menu
            </h3>
          </div>
          
          <ul className="space-y-2">
            <NavLink
              to="/doctor-dashboard"
              className={({ isActive }) =>
                `group flex items-center gap-4 py-3.5 px-4 rounded-xl cursor-pointer transition-all duration-300 ${
                  isActive
                    ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg transform scale-105"
                    : "text-gray-700 hover:bg-gray-100 hover:translate-x-1"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all ${
                    isActive ? "bg-white/20" : "bg-gray-200 group-hover:bg-green-100"
                  }`}>
                    <img className="w-5 h-5" src={assets.home_icon} alt="" />
                  </div>
                  <span className="font-semibold hidden md:block">Dashboard</span>
                  {isActive && (
                    <div className="ml-auto w-2 h-2 bg-white rounded-full animate-pulse"></div>
                  )}
                </>
              )}
            </NavLink>

            <NavLink
              to="/doctor-appointments"
              className={({ isActive }) =>
                `group flex items-center gap-4 py-3.5 px-4 rounded-xl cursor-pointer transition-all duration-300 ${
                  isActive
                    ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg transform scale-105"
                    : "text-gray-700 hover:bg-gray-100 hover:translate-x-1"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all ${
                    isActive ? "bg-white/20" : "bg-gray-200 group-hover:bg-blue-100"
                  }`}>
                    <img className="w-5 h-5" src={assets.appointment_icon} alt="" />
                  </div>
                  <span className="font-semibold hidden md:block">Appointments</span>
                  {isActive && (
                    <div className="ml-auto w-2 h-2 bg-white rounded-full animate-pulse"></div>
                  )}
                </>
              )}
            </NavLink>

            <NavLink
              to="/doctor-profile"
              className={({ isActive }) =>
                `group flex items-center gap-4 py-3.5 px-4 rounded-xl cursor-pointer transition-all duration-300 ${
                  isActive
                    ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg transform scale-105"
                    : "text-gray-700 hover:bg-gray-100 hover:translate-x-1"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all ${
                    isActive ? "bg-white/20" : "bg-gray-200 group-hover:bg-purple-100"
                  }`}>
                    <img className="w-5 h-5" src={assets.people_icon} alt="" />
                  </div>
                  <span className="font-semibold hidden md:block">Profile</span>
                  {isActive && (
                    <div className="ml-auto w-2 h-2 bg-white rounded-full animate-pulse"></div>
                  )}
                </>
              )}
            </NavLink>
          </ul>
        </div>
      )}
    </div>
  );
};

export default SideBar;
