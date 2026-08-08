import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../Context/AppContext";
import DoctorCard from "./DoctorCard";

const TopDoctors = () => {
  const navigate = useNavigate();
  const { doctors } = useContext(AppContext);

  return (
    <section id="doctors" className="py-16 md:py-20">
      <div className="text-center mb-10 max-w-xl mx-auto">
        <span className="section-label mb-2">Top rated</span>
        <h2 className="text-3xl md:text-[2.25rem] font-extrabold text-ink-900 dark:text-white tracking-tight mb-2">
          Doctors to book
        </h2>
        <p className="text-ink-500 dark:text-slate-400 text-sm md:text-base">
          Highly rated, verified professionals ready to see you.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-5">
        {doctors.slice(0, 10).map((item, index) => (
          <DoctorCard doctor={item} index={index} key={item._id || index} />
        ))}
      </div>

      <div className="flex justify-center mt-10">
        <button
          onClick={() => {
            navigate("/doctors");
            scrollTo(0, 0);
          }}
          className="btn-secondary"
        >
          View all doctors
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </button>
      </div>
    </section>
  );
};

export default TopDoctors;
