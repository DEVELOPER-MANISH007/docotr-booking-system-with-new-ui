import React, { useEffect } from 'react'
import { useContext } from 'react'
import { AdminContext } from '../../Context/AdminContext'
import { AppContext } from '../../Context/AppContext'
import { assets } from '../../assets/assets'

const StatCard = ({ icon, label, value, accent }) => (
  <div className='card p-6'>
    <div className='flex items-center justify-between mb-4'>
      <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${accent}`}>
        <img className='w-5 h-5' src={icon} alt='' />
      </div>
    </div>
    <p className='text-ink-500 text-sm font-medium mb-1'>{label}</p>
    <p className='text-3xl font-extrabold text-ink-900'>{value}</p>
  </div>
)

const Dashboard = () => {
  const { aToken, getDashData, dashData, cancelAppointment } = useContext(AdminContext)
  const { slotDateFormat } = useContext(AppContext)

  useEffect(() => {
    if (aToken) {
      getDashData()
    }
  }, [aToken, getDashData])

  return dashData && (
    <div>
      <div className='mb-8'>
        <h1 className='text-2xl sm:text-3xl font-extrabold text-ink-900 tracking-tight mb-1'>
          Dashboard
        </h1>
        <p className='text-ink-500 text-sm'>Here's what's happening with your platform today.</p>
      </div>

      {/* Stats Cards */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8'>
        <StatCard icon={assets.doctor_icon} label='Total doctors' value={dashData.Doctors} accent='bg-brand-50' />
        <StatCard icon={assets.appointments_icon} label='Appointments' value={dashData.Appointments} accent='bg-teal-50' />
        <StatCard icon={assets.patients_icon} label='Total patients' value={dashData.Patients} accent='bg-brand-50' />
      </div>

      {/* Latest Bookings */}
      <div className='card overflow-hidden'>
        <div className='px-6 py-5 border-b border-slate-100 flex items-center gap-3'>
          <img className='w-5 h-5 opacity-70' src={assets.list_icon} alt='' />
          <h2 className='text-base font-bold text-ink-900'>Latest bookings</h2>
        </div>

        <div className='divide-y divide-slate-100'>
          {dashData.latestAppointments && dashData.latestAppointments.length > 0 ? (
            dashData.latestAppointments.map((item, key) => (
              <div
                className='flex items-center px-6 py-4 hover:bg-slate-50 transition-colors duration-150'
                key={key}
              >
                <img
                  className='w-10 h-10 rounded-full object-cover'
                  src={item.docData.image}
                  alt=''
                />

                <div className='flex-1 min-w-0 ml-4'>
                  <p className='text-ink-900 font-semibold text-sm truncate'>
                    {item.docData.name}
                  </p>
                  <p className='text-ink-500 text-xs flex items-center gap-1.5 mt-0.5'>
                    <svg className='w-3.5 h-3.5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'/>
                    </svg>
                    {slotDateFormat(item.slotDate)}, {item.slotTime}
                  </p>
                </div>

                {item.cancelled ? (
                  <span className='badge-danger'>Cancelled</span>
                ) : item.isCompleted ? (
                  <span className='badge-success'>Completed</span>
                ) : (
                  <button
                    onClick={() => cancelAppointment(item._id)}
                    className='btn-danger btn-sm'
                  >
                    Cancel
                  </button>
                )}
              </div>
            ))
          ) : (
            <div className='py-16 text-center'>
              <div className='w-14 h-14 mx-auto mb-4 bg-slate-100 rounded-2xl flex items-center justify-center'>
                <svg className='w-6 h-6 text-ink-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'/>
                </svg>
              </div>
              <p className='text-ink-700 font-semibold text-sm'>No bookings yet</p>
              <p className='text-ink-400 text-xs mt-1'>New appointments will appear here</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Dashboard
