import React, { useEffect } from 'react'
import { DoctorContext } from '../../Context/DoctorContext'
import { useContext } from 'react'
import { toast } from 'react-toastify'
import { AppContext } from '../../Context/AppContext'
import { assets } from '../../assets/assets'

const DoctorAppointments = () => {
  const {appointments,getAppointments,dToken,cancelAppointment,completeAppointment} = useContext(DoctorContext)
  const {calculateAge,slotDateFormat,currency} = useContext(AppContext)




  useEffect(()=>{
    if(dToken){
      getAppointments()
    }
  },[dToken])

  return (
    <div className="p-4 sm:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8 animate-fadeIn">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          My <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600">Appointments</span>
        </h1>
        <p className="text-gray-600">Manage your patient appointments</p>
      </div>

      {/* Appointments Table */}
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 animate-slideUp">
        {/* Table Header */}
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 px-6 py-4">
          <div className="hidden sm:grid grid-cols-[0.5fr_2.5fr_1fr_0.8fr_2fr_1fr_1.5fr] gap-4 text-white font-semibold">
            <p>#</p>
            <p>Patient</p>
            <p>Payment</p>
            <p>Age</p>
            <p>Date & Time</p>
            <p>Fee</p>
            <p>Actions</p>
          </div>
        </div>

        {/* Table Body */}
        <div className="max-h-[calc(100vh-300px)] overflow-y-auto">
          {appointments.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full flex items-center justify-center">
                <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
                </svg>
              </div>
              <p className="text-gray-500 font-medium">No appointments yet</p>
            </div>
          ) : (
            [...appointments].reverse().map((items, index) => (
              <div
                className="group px-6 py-4 border-b border-gray-100 hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50 transition-all duration-200 animate-slideUp"
                style={{ animationDelay: `${index * 50}ms` }}
                key={index}
              >
                <div className="flex flex-wrap gap-4 sm:grid sm:grid-cols-[0.5fr_2.5fr_1fr_0.8fr_2fr_1fr_1.5fr] items-center">
                  {/* Index */}
                  <p className="max-sm:hidden text-gray-600 font-semibold">{index + 1}</p>

                  {/* Patient */}
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <img
                        src={items.userData.image}
                        className="w-10 h-10 rounded-full object-cover ring-2 ring-gray-100 group-hover:ring-green-500 transition-all"
                        alt=""
                      />
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-blue-500 rounded-full border-2 border-white"></div>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{items.userData.name}</p>
                      <p className="text-xs text-gray-500 sm:hidden">Age: {calculateAge(items.userData.dob)}</p>
                    </div>
                  </div>

                  {/* Payment Method */}
                  <div>
                    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${
                      items.payment 
                        ? 'bg-green-100 text-green-700 border border-green-300' 
                        : 'bg-yellow-100 text-yellow-700 border border-yellow-300'
                    }`}>
                      {items.payment ? (
                        <>
                          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z"/>
                            <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd"/>
                          </svg>
                          Online
                        </>
                      ) : (
                        <>
                          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
                          </svg>
                          Cash
                        </>
                      )}
                    </span>
                  </div>

                  {/* Age */}
                  <p className="max-sm:hidden text-gray-700 font-medium">{calculateAge(items.userData.dob)}</p>

                  {/* Date & Time */}
                  <div className="text-gray-700">
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                      </svg>
                      <div>
                        <p className="text-sm font-medium">{slotDateFormat(items.slotDate)}</p>
                        <p className="text-xs text-gray-500">{items.slotTime}</p>
                      </div>
                    </div>
                  </div>

                  {/* Fee */}
                  <p className="text-gray-900 font-bold">
                    {currency}{items.amount}
                  </p>

                  {/* Actions */}
                  <div>
                    {items.cancelled ? (
                      <span className="inline-flex items-center gap-1 px-3 py-2 bg-red-100 text-red-700 text-xs font-bold rounded-full">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"/>
                        </svg>
                        Cancelled
                      </span>
                    ) : items.isCompleted ? (
                      <span className="inline-flex items-center gap-1 px-3 py-2 bg-green-100 text-green-700 text-xs font-bold rounded-full">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                        </svg>
                        Completed
                      </span>
                    ) : (
                      <div className="flex gap-2">
                        <button
                          onClick={() => cancelAppointment(items._id)}
                          className="p-2 bg-red-100 text-red-600 hover:bg-red-500 hover:text-white rounded-lg transition-all transform hover:scale-110"
                          title="Cancel"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
                          </svg>
                        </button>
                        <button
                          onClick={() => completeAppointment(items._id)}
                          className="p-2 bg-green-100 text-green-600 hover:bg-green-500 hover:text-white rounded-lg transition-all transform hover:scale-110"
                          title="Complete"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
                          </svg>
                        </button>
                      </div>
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
  )
}

export default DoctorAppointments