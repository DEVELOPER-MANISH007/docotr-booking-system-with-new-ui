import React, { useEffect } from 'react'
import { DoctorContext } from '../../Context/DoctorContext'
import { useContext } from 'react'
import { AppContext } from '../../Context/AppContext'

const DoctorAppointments = () => {
  const { appointments, getAppointments, dToken, cancelAppointment, completeAppointment } = useContext(DoctorContext)
  const { calculateAge, slotDateFormat, currency } = useContext(AppContext)

  useEffect(() => {
    if (dToken) {
      getAppointments()
    }
  }, [dToken])

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-ink-900 tracking-tight mb-1">
          My appointments
        </h1>
        <p className="text-ink-500 text-sm">Manage your patient appointments</p>
      </div>

      <div className="card overflow-hidden">
        {/* Table Header */}
        <div className="hidden sm:grid grid-cols-[0.4fr_2.2fr_1fr_0.6fr_1.8fr_0.8fr_1.2fr] gap-4 px-6 py-3.5 bg-slate-50 border-b border-slate-100 text-xs font-semibold uppercase tracking-wider text-ink-400">
          <p>#</p>
          <p>Patient</p>
          <p>Payment</p>
          <p>Age</p>
          <p>Date & time</p>
          <p>Fee</p>
          <p>Actions</p>
        </div>

        <div className="max-h-[calc(100vh-320px)] overflow-y-auto divide-y divide-slate-100">
          {appointments.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-14 h-14 mx-auto mb-4 bg-slate-100 rounded-2xl flex items-center justify-center">
                <svg className="w-6 h-6 text-ink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <p className="text-ink-500 font-medium text-sm">No appointments yet</p>
            </div>
          ) : (
            [...appointments].reverse().map((items, index) => (
              <div
                className="px-6 py-4 hover:bg-slate-50 transition-colors duration-150"
                key={index}
              >
                <div className="flex flex-wrap gap-4 sm:grid sm:grid-cols-[0.4fr_2.2fr_1fr_0.6fr_1.8fr_0.8fr_1.2fr] items-center">
                  <p className="max-sm:hidden text-ink-500 text-sm font-medium">{index + 1}</p>

                  <div className="flex items-center gap-3">
                    <img src={items.userData.image} className="w-9 h-9 rounded-full object-cover" alt="" />
                    <div className="min-w-0">
                      <p className="font-semibold text-ink-900 text-sm truncate">{items.userData.name}</p>
                      <p className="text-xs text-ink-500 sm:hidden">Age: {calculateAge(items.userData.dob)}</p>
                    </div>
                  </div>

                  <div>
                    <span className={items.payment ? 'badge-success' : 'badge-warning'}>
                      {items.payment ? 'Online' : 'Cash'}
                    </span>
                  </div>

                  <p className="max-sm:hidden text-ink-600 text-sm">{calculateAge(items.userData.dob)}</p>

                  <div className="text-sm">
                    <p className="text-ink-800 font-medium">{slotDateFormat(items.slotDate)}</p>
                    <p className="text-xs text-ink-500">{items.slotTime}</p>
                  </div>

                  <p className="text-ink-900 font-bold text-sm">{currency}{items.amount}</p>

                  <div>
                    {items.cancelled ? (
                      <span className="badge-danger">Cancelled</span>
                    ) : items.isCompleted ? (
                      <span className="badge-success">Completed</span>
                    ) : (
                      <div className="flex gap-2">
                        <button
                          onClick={() => cancelAppointment(items._id)}
                          className="p-2 bg-danger-50 text-danger-500 hover:bg-danger-500/10 rounded-lg transition-colors"
                          title="Cancel"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                        <button
                          onClick={() => completeAppointment(items._id)}
                          className="p-2 bg-success-50 text-success-500 hover:bg-success-500/10 rounded-lg transition-colors"
                          title="Complete"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
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
    </div>
  )
}

export default DoctorAppointments
