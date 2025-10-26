import React from "react";
import { assets } from "../assets/assets";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-blue-500 to-green-500 text-white py-20">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-6xl mx-auto px-4 text-center animate-fadeIn">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            About <span className="text-yellow-300">Prescripto</span>
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
            Your trusted partner in healthcare management
          </p>
          <div className="mt-8 flex justify-center gap-2">
            <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-white rounded-full animate-bounce delay-100"></div>
            <div className="w-2 h-2 bg-white rounded-full animate-bounce delay-200"></div>
          </div>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex flex-col lg:flex-row gap-12 items-center mb-20">
          {/* Image Side */}
          <div className="lg:w-1/2 animate-slideLeft">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-green-400 rounded-3xl transform rotate-3"></div>
              <img
                className="relative w-full rounded-3xl shadow-2xl transform hover:scale-105 transition-transform duration-500"
                src={assets.about_image}
                alt="About Prescripto"
              />
            </div>
          </div>

          {/* Text Side */}
          <div className="lg:w-1/2 space-y-6 animate-slideRight">
            <div className="inline-block px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full font-semibold text-sm mb-4">
              WHO WE ARE
            </div>
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-600">Prescripto</span>
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              Welcome to Prescripto, your trusted partner in managing your
              healthcare needs conveniently and efficiently. At Prescripto, we
              understand the challenges individuals face when it comes to
              scheduling doctor appointments and managing their health records.
            </p>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              Prescripto is committed to excellence in healthcare technology. We
              continuously strive to enhance our platform, integrating the latest
              advancements to improve user experience and deliver superior
              service. Whether you're booking your first appointment or managing
              ongoing care, Prescripto is here to support you every step of the
              way.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8">
              <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-xl shadow-lg transition-colors duration-300">
                <div className="text-3xl font-bold text-blue-600">1000+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Doctors</div>
              </div>
              <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-xl shadow-lg transition-colors duration-300">
                <div className="text-3xl font-bold text-green-600">50K+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Patients</div>
              </div>
              <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-xl shadow-lg transition-colors duration-300">
                <div className="text-3xl font-bold text-purple-600">24/7</div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Support</div>
              </div>
            </div>
          </div>
        </div>

        {/* Vision Section */}
        <div className="bg-gradient-to-br from-blue-600 to-green-600 rounded-3xl p-12 text-white mb-20 shadow-2xl animate-fadeUp">
          <div className="max-w-3xl mx-auto text-center">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
              </svg>
            </div>
            <h3 className="text-3xl font-bold mb-4">Our Vision</h3>
            <p className="text-xl text-blue-100 leading-relaxed">
              Our vision at Prescripto is to create a seamless healthcare
              experience for every user. We aim to bridge the gap between patients
              and healthcare providers, making it easier for you to access the
              care you need, when you need it.
            </p>
          </div>
        </div>

        {/* Why Choose Us Section */}
        <div className="text-center mb-12 animate-fadeIn">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Why <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-600">Choose Us</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">We provide the best healthcare experience</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {/* Efficiency Card */}
          <div className="group bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 dark:border-gray-700 animate-scaleIn">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Efficiency</h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              Streamlined appointment scheduling that fits into your busy lifestyle. Book appointments in seconds, anytime, anywhere.
            </p>
          </div>

          {/* Convenience Card */}
          <div className="group bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 dark:border-gray-700 animate-scaleIn delay-100">
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Convenience</h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              Access to a network of trusted healthcare professionals in your area. Find the right doctor for your needs.
            </p>
          </div>

          {/* Personalization Card */}
          <div className="group bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 dark:border-gray-700 animate-scaleIn delay-200">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Personalization</h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              Tailored recommendations and reminders to help you stay on top of your health. Your health, your way.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
