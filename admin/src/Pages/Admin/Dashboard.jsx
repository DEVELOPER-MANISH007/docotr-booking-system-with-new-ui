import React, { useEffect } from 'react'
import { useContext } from 'react'
import { AdminContext } from '../../Context/AdminContext'
import { AppContext } from '../../Context/AppContext'
import { assets } from '../../assets/assets'

const Dashboard = () => {
  const { aToken, getDashData, dashData, cancelAppointment } = useContext(AdminContext)
  const { slotDateFormat} = useContext(AppContext)

  useEffect(() => {
    if (aToken) {
      getDashData()
    }
  }, [aToken, getDashData])

  return dashData && (
    <div className='p-4 sm:p-8'>
      {/* Welcome Section */}
      <div className='mb-8 animate-fadeIn'>
        <h1 className='text-3xl sm:text-4xl font-bold text-gray-800 mb-2'>
          Welcome back, Admin! 👋
        </h1>
        <p className='text-gray-600'>Here's what's happening with your platform today.</p>
      </div>

      {/* Stats Cards */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8'>
        {/* Doctors Card */}
        <div className='group relative overflow-hidden bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 animate-slideUp'>
          <div className='absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500'></div>
          <div className='relative z-10'>
            <div className='flex items-center justify-between mb-4'>
              <div className='w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center group-hover:rotate-12 transition-transform duration-300'>
                <img className='w-8 h-8' src={assets.doctor_icon} alt='' />
              </div>
              <div className='text-white/80 text-sm font-medium px-3 py-1 bg-white/20 rounded-full'>
                Active
              </div>
            </div>
            <h3 className='text-white/80 text-sm font-medium mb-1'>Total Doctors</h3>
            <p className='text-4xl font-bold text-white'>{dashData.Doctors}</p>
            <div className='mt-4 flex items-center text-white/80 text-sm'>
              <svg className='w-4 h-4 mr-1' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M13 7h8m0 0v8m0-8l-8 8-4-4-6 6'/>
              </svg>
              <span>View all doctors</span>
            </div>
          </div>
        </div>

        {/* Appointments Card */}
        <div className='group relative overflow-hidden bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 animate-slideUp animation-delay-100'>
          <div className='absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500'></div>
          <div className='relative z-10'>
            <div className='flex items-center justify-between mb-4'>
              <div className='w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center group-hover:rotate-12 transition-transform duration-300'>
                <img className='w-8 h-8' src={assets.appointments_icon} alt='' />
              </div>
              <div className='text-white/80 text-sm font-medium px-3 py-1 bg-white/20 rounded-full'>
                Total
              </div>
            </div>
            <h3 className='text-white/80 text-sm font-medium mb-1'>Appointments</h3>
            <p className='text-4xl font-bold text-white'>{dashData.Appointments}</p>
            <div className='mt-4 flex items-center text-white/80 text-sm'>
              <svg className='w-4 h-4 mr-1' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2'/>
              </svg>
              <span>View all appointments</span>
            </div>
          </div>
        </div>

        {/* Patients Card */}
        <div className='group relative overflow-hidden bg-gradient-to-br from-pink-500 to-pink-600 rounded-2xl p-6 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 animate-slideUp animation-delay-200'>
          <div className='absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500'></div>
          <div className='relative z-10'>
            <div className='flex items-center justify-between mb-4'>
              <div className='w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center group-hover:rotate-12 transition-transform duration-300'>
                <img className='w-8 h-8' src={assets.patients_icon} alt='' />
              </div>
              <div className='text-white/80 text-sm font-medium px-3 py-1 bg-white/20 rounded-full'>
                Unique
              </div>
            </div>
            <h3 className='text-white/80 text-sm font-medium mb-1'>Total Patients</h3>
            <p className='text-4xl font-bold text-white'>{dashData.Patients}</p>
            <div className='mt-4 flex items-center text-white/80 text-sm'>
              <svg className='w-4 h-4 mr-1' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z'/>
              </svg>
              <span>View all patients</span>
            </div>
          </div>
        </div>
      </div>

      {/* Latest Bookings */}
      <div className='bg-white rounded-2xl shadow-lg overflow-hidden animate-slideUp animation-delay-300'>
        <div className='bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-5'>
          <div className='flex items-center gap-3'>
            <div className='w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center'>
              <img className='w-6 h-6' src={assets.list_icon} alt='' />
            </div>
            <h2 className='text-xl font-bold text-white'>Latest Bookings</h2>
          </div>
        </div>
        
        <div className='divide-y divide-gray-100'>
          {dashData.latestAppointments && dashData.latestAppointments.length > 0 ? (
            dashData.latestAppointments.map((item, key) => (
              <div
                className='flex items-center px-6 py-4 hover:bg-gray-50 transition-all duration-200 group'
                key={key}
              >
                <div className='relative'>
                  <img
                    className='w-12 h-12 rounded-full object-cover ring-2 ring-gray-100 group-hover:ring-blue-500 transition-all'
                    src={item.docData.image}
                    alt=''
                  />
                  <div className='absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white'></div>
                </div>
                
                <div className='flex-1 ml-4'>
                  <p className='text-gray-800 font-semibold group-hover:text-blue-600 transition-colors'>
                    {item.docData.name}
                  </p>
                  <p className='text-gray-500 text-sm flex items-center gap-1'>
                    <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'/>
                    </svg>
                    {slotDateFormat(item.slotDate)}, {item.slotTime}
                  </p>
                </div>

                {item.cancelled ? (
                  <span className='px-4 py-2 bg-red-100 text-red-600 text-sm font-medium rounded-full'>
                    Cancelled
                  </span>
                ) : item.isCompleted ? (
                  <span className='px-4 py-2 bg-green-100 text-green-600 text-sm font-medium rounded-full'>
                    Completed
                  </span>
                ) : (
                  <button
                    onClick={() => cancelAppointment(item._id)}
                    className='px-4 py-2 bg-gray-100 text-gray-600 hover:bg-red-100 hover:text-red-600 text-sm font-medium rounded-full transition-all duration-200 transform hover:scale-105'
                  >
                    Cancel
                  </button>
                )}
              </div>
            ))
          ) : (
            <div className='py-12 text-center'>
              <svg className='w-16 h-16 mx-auto text-gray-300 mb-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'/>
              </svg>
              <p className='text-gray-500 font-medium'>No bookings yet</p>
              <p className='text-gray-400 text-sm mt-1'>New appointments will appear here</p>
            </div>
          )}
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
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
        }

        .animation-delay-100 {
          animation-delay: 100ms;
        }

        .animation-delay-200 {
          animation-delay: 200ms;
        }

        .animation-delay-300 {
          animation-delay: 300ms;
        }
      `}</style>
    </div>
  )
}

export default Dashboard