import React, { useContext, useState } from "react";

import { assets } from "../assets/assets";
import { NavLink, useNavigate } from "react-router-dom";
import { AppContext } from "../Context/AppContext";

const Navbar = () => {
  const navigate = useNavigate();
  const [showMenu, setShowmenu] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
 const{token,setToken,userData} = useContext(AppContext)
 

const logout = ()=>{
  setToken('')
  localStorage.removeItem('token')
}



  return (
    <div className="flex items-center justify-between text-sm mb-5 py-4 border-b border-b-gray-400">
      <img onClick={()=>{navigate('/')}} src={assets.logo} alt="" className="w-44 cursor-pointer" />
      <ul className="hidden md:flex items-start gap-5 font-medium">
        <NavLink to="/">
          <li className="py-1">Home</li>
          <hr className="border-none outline-none h-0.5 w-3/5 m-auto bg-primary hidden " />
        </NavLink>
        <NavLink to="/doctors">
          <li className="py-1">All Docotrs</li>
          <hr className="border-none outline-none h-0.5 w-3/5 m-auto bg-primary hidden" />
        </NavLink>
        <NavLink to="/about">
          <li className="py-1">About</li>
          <hr className="border-none outline-none h-0.5 w-3/5 m-auto bg-primary  hidden" />
        </NavLink>
        <NavLink to="/contact">
          <li className="py-1">Contact</li>
          <hr className="border-none outline-none h-0.5 w-3/5 m-auto bg-primary hidden" />
        </NavLink>
      </ul>
      <div className="flex items-center gap-4 cursor-pointer">
        {token &&userData ?(
          <div onClick={() => setShowProfileMenu(!showProfileMenu)} className="flex items-center gap-2 cursor-pointer relative">
            <img className="w-8 rounded-full " src={userData.image} alt="" />
            <img className="w-2.5 " src={assets.dropdown_icon} alt="" />
            <div className="absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20">
              <div className={`min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4 shadow-lg transition-all duration-200 ${showProfileMenu ? 'block' : 'hidden'}`}>
                <p onClick={()=>{navigate('/profile'); setShowProfileMenu(false);}} className="hover:text-black cursor-pointer">My Profile</p>
                <p onClick={()=>{navigate('/my-appointments'); setShowProfileMenu(false);}} className="hover:text-black cursor-pointer">My Appointments</p>
                <p  onClick={()=>{logout(); setShowProfileMenu(false);}} className="hover:text-black cursor-pointer">Logout</p>
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="bg-primary text-white px-8 py-3 rounded-full font-light hidden md:block"
          >
            Create Account
          </button>
        )}

        <img onClick={()=>setShowmenu(true)} className="w-6 md:hidden " src={assets.menu_icon} alt="" />
        {/* ----------------Mobile Menu----------------------- */}
        <div className={`${showMenu ? 'fixed w-full h-full' : 'h-0 w-0'} md:hidden right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all duration-300`}>
          <div className="flex items-center justify-between px-5 py-6">
            <img src={assets.logo} alt="" className="w-44" />
            <img onClick={() => setShowmenu(false)} src={assets.cross_icon} alt="" className="w-7" />
          </div>
          <ul className="flex flex-col items-center gap-4 mt-5 px-5 text-lg font-medium">
            <NavLink to="/" onClick={() => setShowmenu(false)}><p  className="px-4 py-2 rounded inline-block ">Home</p></NavLink>
            <NavLink to="/doctors" onClick={() => setShowmenu(false)} ><p  className="px-4 py-2 rounded inline-block ">All Doctors</p></NavLink>
            <NavLink to="/about" onClick={() => setShowmenu(false)} ><p  className="px-4 py-2 rounded inline-block ">About</p></NavLink>
            <NavLink to="/contact" onClick={() => setShowmenu(false)}><p  className="px-4 py-2 rounded inline-block   ">Contact</p></NavLink>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
