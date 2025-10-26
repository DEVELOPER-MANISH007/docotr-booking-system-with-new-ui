import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../Context/AdminContext'

const DoctorsList = () => {

  const {doctors,aToken,getallDoctors,changeAvailability} = useContext(AdminContext)


useEffect(()=>{
  if(aToken){
    getallDoctors()
  }
},[aToken])


  return (
    <div className='p-4 sm:p-8 max-w-7xl mx-auto'>
      {/* Header */}
      <div className='mb-8 animate-fadeIn'>
        <h1 className='text-4xl font-bold text-gray-900 mb-2'>
          All <span className='text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600'>Doctors</span>
        </h1>
        <p className='text-gray-600'>Manage your medical professionals</p>
      </div>

      {/* Doctors Grid */}
      {!doctors || doctors.length === 0 ? (
        <div className='text-center py-20 animate-slideUp'>
          <div className='w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center'>
            <svg className='w-12 h-12 text-blue-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z'/>
            </svg>
          </div>
          <h3 className='text-2xl font-bold text-gray-800 mb-2'>No Doctors Yet</h3>
          <p className='text-gray-600'>Add your first doctor to get started</p>
        </div>
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6'>
          {doctors.map((item, index) => (
            <div
              className='group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border border-gray-100 animate-slideUp'
              style={{ animationDelay: `${index * 100}ms` }}
              key={index}
            >
              {/* Availability Badge */}
              <div className='absolute top-4 right-4 z-10'>
                <div
                  className={`px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm ${
                    item.available
                      ? 'bg-green-100/80 text-green-700 border border-green-200'
                      : 'bg-red-100/80 text-red-700 border border-red-200'
                  }`}
                >
                  {item.available ? '● Available' : '● Unavailable'}
                </div>
              </div>

              {/* Doctor Image */}
              <div className='relative overflow-hidden aspect-square bg-gradient-to-br from-blue-50 to-purple-50'>
                <img
                  className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-500'
                  src={item.image}
                  alt={item.name}
                />
                <div className='absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity'></div>
              </div>

              {/* Doctor Info */}
              <div className='p-5'>
                <h3 className='text-lg font-bold text-gray-900 mb-1'>
                  Dr. {item.name}
                </h3>
                <p className='text-gray-600 text-sm mb-4'>{item.speciality}</p>

                {/* Availability Toggle */}
                <div className='flex items-center justify-between p-3 bg-gray-50 rounded-xl'>
                  <span className='text-sm font-medium text-gray-700'>Availability</span>
                  <label className='relative inline-flex items-center cursor-pointer'>
                    <input
                      type='checkbox'
                      checked={item.available}
                      onChange={() => changeAvailability(item._id)}
                      className='sr-only peer'
                    />
                    <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-blue-500 peer-checked:to-purple-600"></div>
                  </label>
                </div>

                {/* Doctor Details */}
                <div className='mt-4 space-y-2'>
                  <div className='flex items-center gap-2 text-xs text-gray-600'>
                    <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'/>
                    </svg>
                    <span className='truncate'>{item.email}</span>
                  </div>
                  {item.fees && (
                    <div className='flex items-center gap-2 text-xs text-gray-600'>
                      <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z'/>
                      </svg>
                      <span>Fee: ${item.fees}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Hover Border Effect */}
              <div className='absolute inset-0 border-2 border-transparent group-hover:border-blue-500 rounded-2xl transition-all pointer-events-none'></div>
            </div>
          ))}
        </div>
      )}

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
            transform: translateY(30px);
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

export default DoctorsList