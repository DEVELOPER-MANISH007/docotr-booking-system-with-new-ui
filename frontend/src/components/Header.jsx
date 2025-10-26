import React from "react";
import { assets } from "../assets/assets";

const Header = () => {
  return (
    <div className="relative flex flex-col md:flex-row flex-wrap bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500 dark:from-blue-800 dark:via-purple-800 dark:to-pink-700 rounded-3xl px-6 md:px-10 lg:px-16 overflow-hidden shadow-2xl transition-colors duration-300">
      {/* Animated Background Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-blob"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-blob animation-delay-2000"></div>

      {/* Left Side */}
      <div className="relative z-10 md:w-1/2 flex flex-col items-start justify-center gap-6 py-12 md:py-20 lg:py-24 animate-slideIn">
        <div className="inline-block">
          <span className="px-4 py-2 bg-white/20 backdrop-blur-sm text-white text-sm font-semibold rounded-full border border-white/30">
            ✨ Your Health, Our Priority
          </span>
        </div>

        <h1 className="text-4xl md:text-5xl lg:text-6xl text-white font-bold leading-tight">
          Book Appointments
          <br />
          <span className="text-yellow-300">with Trusted Doctors</span>
        </h1>

        <div className="flex flex-col md:flex-row items-start md:items-center gap-4 text-white">
          <div className="flex -space-x-3">
            <img className="w-32 drop-shadow-xl" src={assets.group_profiles} alt="" />
          </div>
          <div className="backdrop-blur-sm bg-white/10 p-4 rounded-xl border border-white/20">
            <p className="text-white/90 text-sm md:text-base">
              Browse through our extensive list of{" "}
              <span className="font-semibold text-yellow-300">trusted doctors</span>
              <br className="hidden md:block" />
              and schedule your appointment hassle-free!
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-4 mt-4">
          <a
            className="group flex items-center gap-3 bg-white hover:bg-yellow-300 rounded-full px-8 py-4 text-gray-700 font-semibold text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
            href="#speciality"
          >
            Book Appointment
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
            </svg>
          </a>

          <a
            className="group flex items-center gap-3 backdrop-blur-sm bg-white/20 hover:bg-white/30 border-2 border-white rounded-full px-8 py-4 text-white font-semibold text-lg shadow-xl transform hover:scale-105 transition-all duration-300"
            href="#doctors"
          >
            View Doctors
          </a>
        </div>

        {/* Stats */}
        <div className="flex flex-wrap gap-6 mt-6">
          <div className="flex items-center gap-3 backdrop-blur-sm bg-white/10 px-6 py-3 rounded-full border border-white/20">
            <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold">✓</span>
            </div>
            <div>
              <p className="text-2xl font-bold text-white">100+</p>
              <p className="text-white/80 text-xs">Verified Doctors</p>
            </div>
          </div>

          <div className="flex items-center gap-3 backdrop-blur-sm bg-white/10 px-6 py-3 rounded-full border border-white/20">
            <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center">
              <span className="text-white font-bold">★</span>
            </div>
            <div>
              <p className="text-2xl font-bold text-white">4.8</p>
              <p className="text-white/80 text-xs">Average Rating</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className="relative z-10 md:w-1/2 flex items-end justify-center md:justify-end animate-float">
        <img
          className="w-full max-w-lg md:absolute bottom-0 right-0 drop-shadow-2xl"
          src={assets.header_img}
          alt="Doctor"
        />
      </div>
    </div>
  );
};

export default Header;
