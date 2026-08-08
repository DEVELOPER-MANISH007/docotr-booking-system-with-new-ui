import React from "react";
import { assets } from "../assets/assets";

const Contact = () => {
  return (
    <div className="pb-8">
      <section className="pt-14 pb-10 text-center max-w-2xl mx-auto animate-fade-in-up">
        <span className="section-label mb-3">Contact</span>
        <h1 className="text-4xl md:text-5xl font-extrabold text-ink-900 dark:text-white tracking-tight mb-4">
          Get in touch
        </h1>
        <p className="text-ink-500 dark:text-slate-400 text-base md:text-lg">
          We're here to help and answer any question you might have.
        </p>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-10 py-10">
        <img
          className="w-full rounded-2xl border border-slate-200 dark:border-ink-700 h-full object-cover max-h-[420px]"
          src={assets.contact_image}
          alt="Contact Prescripto"
        />

        <div className="flex flex-col gap-5">
          <div className="card p-6 flex items-start gap-4">
            <div className="w-11 h-11 rounded-xl bg-brand-50 dark:bg-brand-500/10 flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-brand-600 dark:text-brand-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <div>
              <h3 className="font-bold text-ink-900 dark:text-white mb-1">Our office</h3>
              <p className="text-sm text-ink-600 dark:text-slate-300 leading-relaxed">
                54709 Willms Station, Suite 350
                <br />
                Washington, USA
              </p>
            </div>
          </div>

          <div className="card p-6 flex flex-col gap-5">
            <div className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-xl bg-teal-50 dark:bg-teal-500/10 flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-teal-600 dark:text-teal-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-ink-900 dark:text-white mb-1">Phone</h3>
                <p className="text-sm text-ink-600 dark:text-slate-300">(415) 555-0132</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-xl bg-teal-50 dark:bg-teal-500/10 flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-teal-600 dark:text-teal-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-ink-900 dark:text-white mb-1">Email</h3>
                <p className="text-sm text-ink-600 dark:text-slate-300">greatstackdev@gmail.com</p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl bg-ink-950 p-6 text-white flex items-start gap-4">
            <div className="w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-teal-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h3 className="font-bold mb-2">Working hours</h3>
              <div className="space-y-1 text-sm text-slate-300">
                <p>Monday – Friday: 9:00 AM – 6:00 PM</p>
                <p>Saturday: 10:00 AM – 4:00 PM</p>
                <p>Sunday: Closed</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Careers */}
      <section className="panel p-10 md:p-12 text-center mt-6">
        <div className="max-w-2xl mx-auto">
          <div className="w-14 h-14 rounded-xl bg-brand-50 dark:bg-brand-500/10 flex items-center justify-center mx-auto mb-5">
            <svg className="w-7 h-7 text-brand-600 dark:text-brand-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h2 className="text-3xl font-extrabold text-ink-900 dark:text-white tracking-tight mb-3">
            Careers at Prescripto
          </h2>
          <p className="text-ink-500 dark:text-slate-400 mb-7 leading-relaxed">
            Join our team and help us make healthcare more accessible. Explore our
            open roles and exciting opportunities.
          </p>
          <button className="btn-primary btn-lg">
            Explore jobs
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>
        </div>
      </section>
    </div>
  );
};

export default Contact;
