import React, { useContext, useState, useEffect } from "react";
import { assets } from "../assets/assets";
import { NavLink, useNavigate } from "react-router-dom";
import { AppContext } from "../Context/AppContext";
import { ThemeContext } from "../Context/ThemeContext";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/doctors", label: "Find a Doctor" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

// Points to the admin/doctor panel app (a separate Vite app in /admin).
// Set VITE_ADMIN_URL in your .env once you deploy the redesigned admin app;
// defaults to the local admin dev server (npm run dev inside /admin) for now.
const adminPanelUrl = import.meta.env.VITE_ADMIN_URL || "http://https://docotr-booking-system-with-new-ui-5.vercel.app/:5174";

const Navbar = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { token, setToken, userData } = useContext(AppContext);
  const { theme, toggleTheme } = useContext(ThemeContext);

  const logout = () => {
    setToken("");
    localStorage.removeItem("token");
    setShowProfileMenu(false);
    navigate("/login");
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 -mx-4 sm:-mx-[10%] px-4 sm:px-[10%] transition-all duration-300 ${
        scrolled
          ? "bg-white/90 dark:bg-ink-950/90 backdrop-blur-md border-b border-slate-200 dark:border-ink-700 shadow-sm"
          : "bg-white/60 dark:bg-ink-950/60 backdrop-blur-sm border-b border-transparent"
      }`}
    >
      <div className="container-app flex items-center justify-between h-16">
        {/* Logo */}
        <img
          onClick={() => navigate("/")}
          src={assets.logo}
          alt="Prescripto"
          className="h-7 sm:h-8 cursor-pointer dark:brightness-0 dark:invert"
        />

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              className={({ isActive }) =>
                `px-3.5 py-2 rounded-md text-sm font-medium transition-colors duration-150 ${
                  isActive
                    ? "text-ink-900 dark:text-white bg-slate-100 dark:bg-ink-800"
                    : "text-ink-600 dark:text-slate-400 hover:text-ink-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-ink-800/60"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-md text-ink-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-ink-800 transition-colors"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            ) : (
              <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </button>

          <a
            href={adminPanelUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex btn-ghost btn-sm"
          >
            Admin / Doctor login
          </a>

          {token && userData ? (
            <div className="relative">
              <button
                onClick={() => setShowProfileMenu((v) => !v)}
                className="flex items-center gap-2 pl-1 pr-2 py-1 rounded-full border border-slate-200 dark:border-ink-700 hover:border-slate-300 dark:hover:border-ink-600 transition-colors"
              >
                <img className="w-8 h-8 rounded-full object-cover" src={userData.image} alt={userData.name} />
                <svg className={`hidden sm:block w-3.5 h-3.5 text-ink-400 transition-transform ${showProfileMenu ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {showProfileMenu && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setShowProfileMenu(false)} />
                  <div className="absolute right-0 mt-2 w-60 panel overflow-hidden z-20 animate-slide-down">
                    <div className="p-4 border-b border-slate-100 dark:border-ink-700">
                      <p className="font-semibold text-sm text-ink-900 dark:text-white truncate">{userData.name}</p>
                      <p className="text-xs text-ink-500 dark:text-slate-400 truncate">{userData.email}</p>
                    </div>
                    <div className="p-1.5">
                      <button
                        onClick={() => { navigate("/profile"); setShowProfileMenu(false); }}
                        className="w-full flex items-center gap-2.5 px-3 py-2.5 text-sm text-ink-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-ink-700 rounded-lg transition-colors"
                      >
                        My Profile
                      </button>
                      <button
                        onClick={() => { navigate("/my-appointments"); setShowProfileMenu(false); }}
                        className="w-full flex items-center gap-2.5 px-3 py-2.5 text-sm text-ink-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-ink-700 rounded-lg transition-colors"
                      >
                        My Appointments
                      </button>
                      <hr className="my-1.5 border-slate-100 dark:border-ink-700" />
                      <button
                        onClick={logout}
                        className="w-full flex items-center gap-2.5 px-3 py-2.5 text-sm text-danger-500 hover:bg-danger-50 dark:hover:bg-danger-500/10 rounded-lg transition-colors"
                      >
                        Log out
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          ) : (
            <button onClick={() => navigate("/login")} className="btn-primary btn-sm">
              Sign in
            </button>
          )}

          <button
            onClick={() => setShowMenu(true)}
            className="md:hidden p-2 rounded-md text-ink-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-ink-800"
            aria-label="Open menu"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 bg-ink-950/40 z-50 transition-opacity duration-300 md:hidden ${
          showMenu ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setShowMenu(false)}
      >
        <div
          className={`fixed right-0 top-0 bottom-0 w-[85%] max-w-xs bg-white dark:bg-ink-900 shadow-2xl transition-transform duration-300 flex flex-col ${
            showMenu ? "translate-x-0" : "translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between p-5 border-b border-slate-100 dark:border-ink-700">
            <img src={assets.logo} alt="Prescripto" className="h-7 dark:brightness-0 dark:invert" />
            <button onClick={() => setShowMenu(false)} className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-ink-800">
              <svg className="w-5 h-5 text-ink-600 dark:text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {token && userData && (
            <div className="p-5 border-b border-slate-100 dark:border-ink-700 flex items-center gap-3">
              <img className="w-11 h-11 rounded-full object-cover" src={userData.image} alt={userData.name} />
              <div className="min-w-0">
                <p className="font-semibold text-sm text-ink-900 dark:text-white truncate">{userData.name}</p>
                <p className="text-xs text-ink-500 dark:text-slate-400 truncate">{userData.email}</p>
              </div>
            </div>
          )}

          <nav className="p-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === "/"}
                onClick={() => setShowMenu(false)}
                className={({ isActive }) =>
                  `px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-slate-100 dark:bg-ink-800 text-ink-900 dark:text-white"
                      : "text-ink-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-ink-800"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
            <a
              href={adminPanelUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setShowMenu(false)}
              className="px-4 py-3 rounded-lg text-sm font-medium text-ink-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-ink-800"
            >
              Admin / Doctor login
            </a>
          </nav>

          <div className="mt-auto p-4 border-t border-slate-100 dark:border-ink-700">
            {!token ? (
              <button
                onClick={() => { navigate("/login"); setShowMenu(false); }}
                className="btn-primary w-full"
              >
                Sign in
              </button>
            ) : (
              <button onClick={logout} className="btn-danger w-full">
                Log out
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
