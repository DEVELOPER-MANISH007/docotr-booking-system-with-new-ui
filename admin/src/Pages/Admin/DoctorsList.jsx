import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../Context/AdminContext'

const DoctorsList = () => {
  const { doctors, aToken, getallDoctors, changeAvailability } = useContext(AdminContext)

  useEffect(() => {
    if (aToken) {
      getallDoctors()
    }
  }, [aToken])

  return (
    <div>
      <div className='mb-8'>
        <h1 className='text-2xl sm:text-3xl font-extrabold text-ink-900 tracking-tight mb-1'>All doctors</h1>
        <p className='text-ink-500 text-sm'>Manage your medical professionals</p>
      </div>

      {!doctors || doctors.length === 0 ? (
        <div className='text-center py-20'>
          <div className='w-16 h-16 mx-auto mb-5 bg-slate-100 rounded-2xl flex items-center justify-center'>
            <svg className='w-7 h-7 text-ink-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' />
            </svg>
          </div>
          <h3 className='text-lg font-bold text-ink-900 mb-1'>No doctors yet</h3>
          <p className='text-sm text-ink-500'>Add your first doctor to get started</p>
        </div>
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5'>
          {doctors.map((item, index) => (
            <div
              className='card card-hover overflow-hidden'
              key={index}
            >
              <div className='relative aspect-square bg-slate-100'>
                <img
                  className='w-full h-full object-cover object-top'
                  src={item.image}
                  alt={item.name}
                />
                <div className='absolute top-3 right-3'>
                  <span className={`badge ${item.available ? 'badge-success' : 'badge-neutral'} bg-white/95 shadow-sm`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${item.available ? 'bg-success-500' : 'bg-slate-400'}`} />
                    {item.available ? 'Available' : 'Unavailable'}
                  </span>
                </div>
              </div>

              <div className='p-4'>
                <h3 className='font-bold text-ink-900 text-[15px] truncate'>Dr. {item.name}</h3>
                <p className='text-ink-500 text-sm mb-4'>{item.speciality}</p>

                <div className='flex items-center justify-between p-2.5 bg-slate-50 rounded-lg mb-3'>
                  <span className='text-xs font-medium text-ink-600'>Availability</span>
                  <label className='relative inline-flex items-center cursor-pointer'>
                    <input
                      type='checkbox'
                      checked={item.available}
                      onChange={() => changeAvailability(item._id)}
                      className='sr-only peer'
                    />
                    <div className="w-10 h-6 bg-slate-300 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-600"></div>
                  </label>
                </div>

                <div className='space-y-1.5'>
                  <div className='flex items-center gap-2 text-xs text-ink-500'>
                    <svg className='w-3.5 h-3.5 flex-shrink-0' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' />
                    </svg>
                    <span className='truncate'>{item.email}</span>
                  </div>
                  {item.fees && (
                    <div className='flex items-center gap-2 text-xs text-ink-500'>
                      <svg className='w-3.5 h-3.5 flex-shrink-0' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z' />
                      </svg>
                      <span>Fee: ${item.fees}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default DoctorsList
