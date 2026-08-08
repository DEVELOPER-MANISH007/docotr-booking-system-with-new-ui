import React from "react";
import { assets } from "../assets/assets";

const features = [
  {
    title: "Efficiency",
    desc: "Streamlined appointment scheduling that fits into your busy lifestyle. Book appointments in seconds, anytime, anywhere.",
    icon: "M13 10V3L4 14h7v7l9-11h-7z",
  },
  {
    title: "Convenience",
    desc: "Access to a network of trusted healthcare professionals near you, across every major speciality.",
    icon: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0zM15 11a3 3 0 11-6 0 3 3 0 016 0z",
  },
  {
    title: "Personalization",
    desc: "Clear appointment history and reminders that help you stay on top of your care, on your terms.",
    icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z",
  },
];

const About = () => {
  return (
    <div className="pb-8">
      {/* Hero */}
      <section className="pt-14 pb-10 text-center max-w-2xl mx-auto animate-fade-in-up">
        <span className="section-label mb-3">About Prescripto</span>
        <h1 className="text-4xl md:text-5xl font-extrabold text-ink-900 dark:text-white tracking-tight mb-4">
          Your trusted partner in healthcare
        </h1>
        <p className="text-ink-500 dark:text-slate-400 text-base md:text-lg">
          We connect patients with verified doctors and make scheduling care effortless.
        </p>
      </section>

      {/* Story */}
      <section className="flex flex-col lg:flex-row gap-12 items-center py-10">
        <div className="lg:w-1/2">
          <img
            className="w-full rounded-2xl border border-slate-200 dark:border-ink-700"
            src={assets.about_image}
            alt="About Prescripto"
          />
        </div>

        <div className="lg:w-1/2 space-y-5">
          <span className="section-label">Who we are</span>
          <h2 className="text-3xl font-extrabold text-ink-900 dark:text-white tracking-tight">
            Healthcare, without the friction
          </h2>
          <p className="text-ink-600 dark:text-slate-300 leading-relaxed">
            Prescripto helps you manage your healthcare needs conveniently and
            efficiently. We understand the challenges people face scheduling
            appointments and keeping track of care — so we built a platform that
            removes the friction.
          </p>
          <p className="text-ink-600 dark:text-slate-300 leading-relaxed">
            We're committed to continuously improving our platform, integrating the
            latest advancements to deliver a better experience — whether you're
            booking your first appointment or managing ongoing care.
          </p>

          <div className="grid grid-cols-3 gap-4 pt-4">
            {[
              { value: "1000+", label: "Doctors" },
              { value: "50K+", label: "Patients" },
              { value: "24/7", label: "Support" },
            ].map((s) => (
              <div key={s.label} className="card p-4 text-center">
                <div className="text-2xl font-extrabold text-ink-900 dark:text-white">{s.value}</div>
                <div className="text-xs text-ink-500 dark:text-slate-400 mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision */}
      <section className="bg-ink-950 rounded-2xl p-10 md:p-14 my-16 text-center">
        <div className="max-w-2xl mx-auto">
          <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mx-auto mb-5">
            <svg className="w-6 h-6 text-teal-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-white mb-3">Our vision</h3>
          <p className="text-slate-300 leading-relaxed">
            To create a seamless healthcare experience for every user — bridging
            the gap between patients and providers, so it's easier to access the
            care you need, when you need it.
          </p>
        </div>
      </section>

      {/* Why choose us */}
      <section className="pb-10">
        <div className="text-center mb-10 max-w-xl mx-auto">
          <h2 className="text-3xl font-extrabold text-ink-900 dark:text-white tracking-tight mb-2">Why choose us</h2>
          <p className="text-ink-500 dark:text-slate-400">A better healthcare experience, from booking to visit.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((f) => (
            <div key={f.title} className="card card-hover p-7">
              <div className="w-11 h-11 rounded-xl bg-brand-50 dark:bg-brand-500/10 flex items-center justify-center mb-5">
                <svg className="w-5 h-5 text-brand-600 dark:text-brand-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={f.icon} />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-ink-900 dark:text-white mb-2">{f.title}</h3>
              <p className="text-sm text-ink-500 dark:text-slate-400 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default About;
