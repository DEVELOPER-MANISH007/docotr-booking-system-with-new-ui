import React, { useContext, useState, useEffect } from "react";

import { assets } from "../assets/assets";
import { NavLink, useNavigate } from "react-router-dom";
import { AppContext } from "../Context/AppContext";
import { ThemeContext } from "../Context/ThemeContext";

const Navbar = () => {
  const navigate = useNavigate();
  const [showMenu, setShowmenu] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { token, setToken, userData } = useContext(AppContext);
  const { theme, toggleTheme } = useContext(ThemeContext);

  const logout = () => {
    setToken('');
    localStorage.removeItem('token');
  };

  // Scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-white/95 dark:bg-gray-800/95 backdrop-blur-md shadow-lg py-3' 
        : 'bg-white dark:bg-gray-800 py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            <img 
              onClick={() => navigate('/')} 
              src={assets.logo} 
              alt="Prescripto" 
              className="w-40 sm:w-44 cursor-pointer transform hover:scale-105 transition-transform" 
            />
          </div>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center gap-2">
            <NavLink to="/" className={({ isActive }) => 
              `px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                isActive 
                  ? 'bg-gradient-to-r from-blue-500 to-green-500 text-white shadow-lg' 
                  : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`
            }>
              Home
            </NavLink>
            <NavLink to="/doctors" className={({ isActive }) => 
              `px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                isActive 
                  ? 'bg-gradient-to-r from-blue-500 to-green-500 text-white shadow-lg' 
                  : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`
            }>
              All Doctors
            </NavLink>
            <NavLink to="/about" className={({ isActive }) => 
              `px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                isActive 
                  ? 'bg-gradient-to-r from-blue-500 to-green-500 text-white shadow-lg' 
                  : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`
            }>
              About
            </NavLink>
            <NavLink to="/contact" className={({ isActive }) => 
              `px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                isActive 
                  ? 'bg-gradient-to-r from-blue-500 to-green-500 text-white shadow-lg' 
                  : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`
            }>
              Contact
            </NavLink>
            
            {/* Admin Login Button */}
            <a
              href="https://docotr-booking-system-with-new-ui-5.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-xl font-medium transition-all duration-300 bg-purple-600 hover:bg-purple-700 text-white shadow-md hover:shadow-lg flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
              </svg>
              Admin
            </a>
          </ul>

          {/* Right Side - Theme Toggle & Profile/Login */}
          <div className="flex items-center gap-4">
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-xl bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-300 group"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <svg className="w-5 h-5 text-yellow-500 group-hover:rotate-180 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/>
                </svg>
              ) : (
                <svg className="w-5 h-5 text-gray-700 group-hover:rotate-[360deg] transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/>
                </svg>
              )}
            </button>

            {token && userData ? (
              <div className="relative">
                <button
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="flex items-center gap-2 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300"
                >
                  <img 
                    className="w-10 h-10 rounded-full border-2 border-blue-500 object-cover" 
                    src={userData.image} 
                    alt={userData.name} 
                  />
                  <svg 
                    className={`w-4 h-4 text-gray-600 transition-transform duration-300 ${showProfileMenu ? 'rotate-180' : ''}`}
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/>
                  </svg>
                </button>

                {/* Dropdown Menu */}
                {showProfileMenu && (
                  <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-700 overflow-hidden animate-slideDown">
                    <div className="p-4 bg-gradient-to-r from-blue-500 to-green-500 text-white">
                      <p className="font-semibold">{userData.name}</p>
                      <p className="text-sm text-blue-100">{userData.email}</p>
                    </div>
                    <div className="p-2">
                      <button
                        onClick={() => {
                          navigate('/profile');
                          setShowProfileMenu(false);
                        }}
                        className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-gray-700 rounded-xl transition-all"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                        </svg>
                        My Profile
                      </button>
                      <button
                        onClick={() => {
                          navigate('/my-appointments');
                          setShowProfileMenu(false);
                        }}
                        className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 dark:text-gray-200 hover:bg-green-50 dark:hover:bg-gray-700 rounded-xl transition-all"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                        </svg>
                        My Appointments
                      </button>
                      <hr className="my-2 dark:border-gray-700" />
                      <button
                        onClick={() => {
                          logout();
                          setShowProfileMenu(false);
                        }}
                        className="w-full flex items-center gap-3 px-4 py-3 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-gray-700 rounded-xl transition-all"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
                        </svg>
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => navigate("/login")}
                className="hidden md:flex items-center gap-2 bg-gradient-to-r from-blue-500 to-green-500 text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"/>
                </svg>
                Create Account
              </button>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setShowmenu(true)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all"
            >
              <svg className="w-6 h-6 text-gray-700 dark:text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 bg-black/50 z-50 transition-opacity duration-300 md:hidden ${
        showMenu ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`} onClick={() => setShowmenu(false)}>
        <div className={`fixed right-0 top-0 bottom-0 w-80 bg-white dark:bg-gray-800 shadow-2xl transition-transform duration-300 ${
          showMenu ? 'translate-x-0' : 'translate-x-full'
        }`} onClick={(e) => e.stopPropagation()}>
          {/* Mobile Menu Header */}
          <div className="flex items-center justify-between p-6 bg-gradient-to-r from-blue-500 to-green-500">
            <img src={assets.logo} alt="Prescripto" className="w-40" />
            <button
              onClick={() => setShowmenu(false)}
              className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-all"
            >
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>

          {/* User Info (if logged in) */}
          {token && userData && (
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-3">
                <img 
                  className="w-12 h-12 rounded-full border-2 border-blue-500 object-cover" 
                  src={userData.image} 
                  alt={userData.name} 
                />
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">{userData.name}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{userData.email}</p>
                </div>
              </div>
            </div>
          )}

          {/* Mobile Navigation Links */}
          <nav className="p-6">
            <ul className="flex flex-col gap-2">
              <NavLink to="/" onClick={() => setShowmenu(false)}>
                {({ isActive }) => (
                  <li className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${
                    isActive 
                      ? 'bg-gradient-to-r from-blue-500 to-green-500 text-white' 
                      : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
                    </svg>
                    Home
                  </li>
                )}
              </NavLink>
              <NavLink to="/doctors" onClick={() => setShowmenu(false)}>
                {({ isActive }) => (
                  <li className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${
                    isActive 
                      ? 'bg-gradient-to-r from-blue-500 to-green-500 text-white' 
                      : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
                    </svg>
                    All Doctors
                  </li>
                )}
              </NavLink>
              <NavLink to="/about" onClick={() => setShowmenu(false)}>
                {({ isActive }) => (
                  <li className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${
                    isActive 
                      ? 'bg-gradient-to-r from-blue-500 to-green-500 text-white' 
                      : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    About
                  </li>
                )}
              </NavLink>
              <NavLink to="/contact" onClick={() => setShowmenu(false)}>
                {({ isActive }) => (
                  <li className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${
                    isActive 
                      ? 'bg-gradient-to-r from-blue-500 to-green-500 text-white' 
                      : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                    </svg>
                    Contact
                  </li>
                )}
              </NavLink>
              
              {/* Admin Login - Mobile */}
              <a
                href="https://docotr-booking-system-with-new-ui-5.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setShowmenu(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all bg-purple-600 text-white hover:bg-purple-700"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
                Admin Panel
              </a>
            </ul>

            {/* Mobile Login/Logout Button */}
            {!token ? (
              <button
                onClick={() => {
                  navigate('/login');
                  setShowmenu(false);
                }}
                className="w-full mt-6 flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-green-500 text-white px-6 py-3 rounded-xl font-semibold shadow-lg"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"/>
                </svg>
                Create Account
              </button>
            ) : (
              <button
                onClick={() => {
                  logout();
                  setShowmenu(false);
                }}
                className="w-full mt-6 flex items-center justify-center gap-2 bg-red-500 text-white px-6 py-3 rounded-xl font-semibold shadow-lg"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
                </svg>
                Logout
              </button>
            )}
          </nav>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
