import React from "react";
import { useContext } from "react";
import { AdminContext } from "../../Context/AdminContext";
import { useEffect } from "react";
import { assets } from "../../assets/assets";
import { AppContext } from "../../Context/AppContext";

const Allapointments = () => {
  const { aToken, getAllAppointments, appointments, cancelAppointment } =
    useContext(AdminContext);
  const { calculateAge, slotDateFormat, currency } = useContext(AppContext);

  useEffect(() => {
    if (aToken) {
      console.log("aToken found, calling getAllAppointments");
      getAllAppointments();
    } else {
      console.log("No aToken found");
    }
  }, [aToken]);

  // useEffect(()=>{
  //   console.log('Appointments updated:', appointments)
  // },[appointments])

  return (
    <div className="p-4 sm:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8 animate-fadeIn">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          All <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Appointments</span>
        </h1>
        <p className="text-gray-600">View and manage all patient appointments</p>
      </div>

      {/* Appointments Table */}
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 animate-slideUp">
        {/* Table Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4">
          <div className="hidden sm:grid grid-cols-[0.5fr_2.5fr_0.8fr_2.5fr_2.5fr_1fr_1.2fr] gap-4 text-white font-semibold">
            <p>#</p>
            <p>Patient</p>
            <p>Age</p>
            <p>Date & Time</p>
            <p>Doctor</p>
            <p>Fee</p>
            <p>Status</p>
          </div>
        </div>

        {/* Table Body */}
        <div className="max-h-[calc(100vh-300px)] overflow-y-auto">
          {appointments.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
                <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
                </svg>
              </div>
              <p className="text-gray-500 font-medium">No appointments found</p>
            </div>
          ) : (
            appointments.map((item, index) => (
              <div
                className="group px-6 py-4 border-b border-gray-100 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-200 animate-slideUp"
                style={{ animationDelay: `${index * 50}ms` }}
                key={index}
              >
                <div className="flex flex-wrap gap-4 sm:grid sm:grid-cols-[0.5fr_2.5fr_0.8fr_2.5fr_2.5fr_1fr_1.2fr] items-center">
                  {/* Index */}
                  <p className="max-sm:hidden text-gray-600 font-semibold">{index + 1}</p>

                  {/* Patient */}
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <img
                        className="w-10 h-10 rounded-full object-cover ring-2 ring-gray-100 group-hover:ring-blue-500 transition-all"
                        src={item.userData.image}
                        alt=""
                      />
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{item.userData.name}</p>
                      <p className="text-xs text-gray-500 sm:hidden">Age: {calculateAge(item.userData.dob)}</p>
                    </div>
                  </div>

                  {/* Age */}
                  <p className="max-sm:hidden text-gray-700 font-medium">{calculateAge(item.userData.dob)}</p>

                  {/* Date & Time */}
                  <div className="text-gray-700">
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                      </svg>
                      <div>
                        <p className="text-sm font-medium">{slotDateFormat(item.slotDate)}</p>
                        <p className="text-xs text-gray-500">{item.slotTime}</p>
                      </div>
                    </div>
                  </div>

                  {/* Doctor */}
                  <div className="flex items-center gap-3">
                    <img
                      className="w-10 h-10 rounded-full object-cover bg-gradient-to-br from-blue-50 to-purple-50 ring-2 ring-gray-100 group-hover:ring-purple-500 transition-all"
                      src={item.docData.image}
                      alt=""
                    />
                    <div>
                      <p className="font-semibold text-gray-900">Dr. {item.docData.name}</p>
                      <p className="text-xs text-gray-500">{item.docData.speciality}</p>
                    </div>
                  </div>

                  {/* Fee */}
                  <p className="text-gray-900 font-bold">
                    {currency}{item.amount}
                  </p>

                  {/* Status/Action */}
                  <div>
                    {item.cancelled ? (
                      <span className="inline-flex items-center gap-1 px-3 py-2 bg-red-100 text-red-700 text-xs font-bold rounded-full">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"/>
                        </svg>
                        Cancelled
                      </span>
                    ) : item.isCompleted ? (
                      <span className="inline-flex items-center gap-1 px-3 py-2 bg-green-100 text-green-700 text-xs font-bold rounded-full">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                        </svg>
                        Completed
                      </span>
                    ) : (
                      <button
                        onClick={() => cancelAppointment(item._id)}
                        className="px-3 py-2 bg-gray-100 text-gray-700 hover:bg-red-500 hover:text-white text-xs font-semibold rounded-full transition-all transform hover:scale-105 flex items-center gap-1"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
                        </svg>
                        Cancel
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out;
        }

        .animate-slideUp {
          animation: slideUp 0.6s ease-out;
          animation-fill-mode: both;
        }
      `}</style>
    </div>
  );
};

export default Allapointments;
