import React, { useContext } from "react";
import { AdminContext } from "../Context/AdminContext";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";
import { DoctorContext } from "../Context/DoctorContext";

const Item = ({ to, icon, label }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `sidebar-link ${isActive ? "sidebar-link-active" : "sidebar-link-inactive"}`
    }
  >
    <img className="w-[18px] h-[18px]" src={icon} alt="" />
    <span className="hidden md:block">{label}</span>
  </NavLink>
);

const SideBar = () => {
  const { aToken } = useContext(AdminContext);
  const { dToken } = useContext(DoctorContext);

  return (
    <aside className="min-h-[calc(100vh-4rem)] w-16 md:w-60 flex-shrink-0 bg-white border-r border-slate-200 p-3">
      {aToken && (
        <div>
          <p className="hidden md:block text-[11px] font-semibold text-ink-400 uppercase tracking-wider px-3.5 mb-2 mt-2">
            Admin
          </p>
          <div className="space-y-1">
            <Item to="/admin-dashboard" icon={assets.home_icon} label="Dashboard" />
            <Item to="/all-appointments" icon={assets.appointment_icon} label="Appointments" />
            <Item to="/add-doctor" icon={assets.add_icon} label="Add doctor" />
            <Item to="/doctors-list" icon={assets.people_icon} label="Doctor list" />
          </div>
        </div>
      )}

      {dToken && (
        <div>
          <p className="hidden md:block text-[11px] font-semibold text-ink-400 uppercase tracking-wider px-3.5 mb-2 mt-2">
            Doctor
          </p>
          <div className="space-y-1">
            <Item to="/doctor-dashboard" icon={assets.home_icon} label="Dashboard" />
            <Item to="/doctor-appointments" icon={assets.appointment_icon} label="Appointments" />
            <Item to="/doctor-profile" icon={assets.people_icon} label="Profile" />
          </div>
        </div>
      )}
    </aside>
  );
};

export default SideBar;
