import React from "react";
import { useNavigate } from "react-router-dom";

const DoctorCard = ({ doctor, index = 0 }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => {
        navigate(`/appointment/${doctor._id}`);
        scrollTo(0, 0);
      }}
      className="group card card-hover cursor-pointer overflow-hidden animate-fade-in-up"
      style={{ animationDelay: `${Math.min(index, 8) * 60}ms` }}
    >
      <div className="relative aspect-[4/3] bg-slate-100 dark:bg-ink-700 overflow-hidden">
        <img
          className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.04]"
          src={doctor.image}
          alt={doctor.name}
        />
        <div className="absolute top-3 left-3">
          <span
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold backdrop-blur-sm ${
              doctor.available
                ? "bg-success-50/90 text-success-500"
                : "bg-slate-100/90 text-ink-500"
            }`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${doctor.available ? "bg-success-500" : "bg-slate-400"}`} />
            {doctor.available ? "Available" : "Unavailable"}
          </span>
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-start gap-1.5">
          <h3 className="font-semibold text-ink-900 dark:text-white text-[15px] leading-snug truncate">
            Dr. {doctor.name}
          </h3>
          <svg className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 text-brand-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
        </div>
        <p className="text-ink-500 dark:text-slate-400 text-sm mt-0.5">{doctor.speciality}</p>

        <button className="mt-3 w-full btn-secondary btn-sm justify-center opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200">
          Book appointment
        </button>
      </div>
    </div>
  );
};

export default DoctorCard;
