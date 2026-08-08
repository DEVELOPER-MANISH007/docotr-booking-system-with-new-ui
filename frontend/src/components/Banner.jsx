import React from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";

const Banner = () => {
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden bg-ink-900 rounded-2xl my-16 md:my-20">
      <div className="absolute -top-20 right-0 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-24 -left-10 w-72 h-72 bg-brand-600/20 rounded-full blur-3xl" />

      <div className="relative flex flex-col md:flex-row items-center gap-8 px-6 sm:px-10 md:px-14 py-12 md:py-16">
        <div className="flex-1 max-w-lg">
          <h2 className="text-2xl md:text-3xl font-extrabold text-white leading-tight mb-3">
            Ready to book your next appointment?
          </h2>
          <p className="text-slate-300 text-sm md:text-base mb-7">
            Create a free account and get access to same-week appointments with
            our full network of trusted doctors.
          </p>
          <div className="flex flex-wrap gap-3">
            <button
              className="btn-accent btn-lg"
              onClick={() => { navigate("/login"); scrollTo(0, 0); }}
            >
              Create account
            </button>
            <button
              className="btn-outline btn-lg text-white"
              onClick={() => { navigate("/doctors"); scrollTo(0, 0); }}
            >
              Browse doctors
            </button>
          </div>
        </div>

        <div className="hidden md:block flex-shrink-0 w-72 lg:w-80">
          <img className="w-full" src={assets.appointment_img} alt="Book an appointment" />
        </div>
      </div>
    </section>
  );
};

export default Banner;
