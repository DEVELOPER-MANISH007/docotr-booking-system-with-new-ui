import React from "react";
import { assets } from "../assets/assets";

const Header = () => {
  return (
    <section className="relative overflow-hidden bg-ink-950 rounded-2xl mt-4">
      {/* Subtle background texture */}
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
          backgroundSize: "28px 28px",
        }}
      />
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-brand-600/20 rounded-full blur-3xl" />
      <div className="absolute -bottom-24 -left-16 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl" />

      <div className="relative flex flex-col-reverse md:flex-row items-center gap-10 md:gap-6 px-6 sm:px-10 lg:px-16 py-14 md:py-20">
        {/* Left */}
        <div className="flex-1 flex flex-col items-start gap-6 max-w-xl">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/15 text-white/90 text-xs font-semibold tracking-wide uppercase">
            Trusted healthcare, made simple
          </span>

          <h1 className="text-4xl md:text-5xl font-extrabold leading-[1.1] text-white tracking-tight">
            Find the right doctor.
            <br />
            Book with confidence.
          </h1>

          <p className="text-slate-300 text-base md:text-lg leading-relaxed">
            Prescripto connects you with verified, experienced doctors across every
            speciality — so you can schedule the right appointment in minutes, not days.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-1">
            <a href="#speciality" className="btn-accent btn-lg">
              Find a Doctor
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
            <a href="#doctors" className="btn-outline btn-lg text-white">
              Learn More
            </a>
          </div>

          {/* Trust indicators */}
          <div className="flex flex-wrap items-center gap-6 pt-6 mt-2 border-t border-white/10 w-full">
            <div className="flex items-center gap-2.5">
              <img className="w-9 drop-shadow" src={assets.group_profiles} alt="" />
              <div className="text-white/80 text-xs leading-snug">
                Trusted by
                <br />
                <span className="text-white font-semibold text-sm">10,000+ patients</span>
              </div>
            </div>
            <div className="h-8 w-px bg-white/10" />
            <div className="text-white/80 text-xs leading-snug">
              <span className="text-white font-semibold text-sm">100+</span> verified doctors
            </div>
            <div className="h-8 w-px bg-white/10 hidden sm:block" />
            <div className="text-white/80 text-xs leading-snug hidden sm:block">
              <span className="text-white font-semibold text-sm">4.8 / 5</span> average rating
            </div>
          </div>
        </div>

        {/* Right */}
        <div className="relative flex-shrink-0 w-64 sm:w-80 md:w-[380px]">
          <div className="absolute inset-4 bg-teal-400/10 rounded-3xl blur-2xl" />
          <img
            className="relative w-full rounded-2xl"
            src={assets.header_img}
            alt="Doctor ready to help"
          />
        </div>
      </div>
    </section>
  );
};

export default Header;
