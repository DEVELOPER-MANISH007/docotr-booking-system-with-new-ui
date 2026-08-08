import React from "react";
import { specialityData } from "../assets/assets";
import { Link } from "react-router-dom";

const SpecialityMenu = () => {
  return (
    <section id="speciality" className="py-16 md:py-20">
      <div className="text-center mb-10 max-w-xl mx-auto">
        <span className="section-label mb-2">Specialities</span>
        <h2 className="text-3xl md:text-[2.25rem] font-extrabold text-ink-900 dark:text-white tracking-tight mb-2">
          Find by speciality
        </h2>
        <p className="text-ink-500 dark:text-slate-400 text-sm md:text-base">
          Browse our network of specialists and book directly with the right expert.
        </p>
      </div>

      <div className="flex sm:justify-center gap-4 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-hide">
        {specialityData.map((item, index) => (
          <Link
            onClick={() => scrollTo(0, 0)}
            className="group flex flex-col items-center gap-3 flex-shrink-0 w-24 sm:w-28"
            key={index}
            to={`/doctors/${encodeURIComponent(item.speciality)}`}
          >
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white dark:bg-ink-800 border border-slate-200 dark:border-ink-600 flex items-center justify-center transition-all duration-200 group-hover:border-brand-400 group-hover:shadow-card-hover group-hover:-translate-y-1">
              <img className="w-9 sm:w-11" src={item.image} alt={item.speciality} />
            </div>
            <p className="text-xs sm:text-sm font-medium text-ink-600 dark:text-slate-300 text-center group-hover:text-brand-600 dark:group-hover:text-brand-300 transition-colors">
              {item.speciality}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default SpecialityMenu;
