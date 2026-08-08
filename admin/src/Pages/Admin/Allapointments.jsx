import React from "react";
import { useContext } from "react";
import { AdminContext } from "../../Context/AdminContext";
import { useEffect } from "react";
import { AppContext } from "../../Context/AppContext";

const StatusPill = ({ item, onCancel }) => {
  if (item.cancelled) return <span className="badge-danger">Cancelled</span>
  if (item.isCompleted) return <span className="badge-success">Completed</span>
  return (
    <button onClick={onCancel} className="btn-danger btn-sm">
      Cancel
    </button>
  )
}

const Allapointments = () => {
  const { aToken, getAllAppointments, appointments, cancelAppointment } =
    useContext(AdminContext);
  const { calculateAge, slotDateFormat, currency } = useContext(AppContext);

  useEffect(() => {
    if (aToken) {
      getAllAppointments();
    }
  }, [aToken]);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-ink-900 tracking-tight mb-1">
          All appointments
        </h1>
        <p className="text-ink-500 text-sm">View and manage all patient appointments</p>
      </div>

      <div className="card overflow-hidden">
        {/* Table Header */}
        <div className="hidden sm:grid grid-cols-[0.4fr_2.2fr_0.6fr_2fr_2.2fr_0.8fr_1fr] gap-4 px-6 py-3.5 bg-slate-50 border-b border-slate-100 text-xs font-semibold uppercase tracking-wider text-ink-400">
          <p>#</p>
          <p>Patient</p>
          <p>Age</p>
          <p>Date & time</p>
          <p>Doctor</p>
          <p>Fee</p>
          <p>Status</p>
        </div>

        <div className="max-h-[calc(100vh-320px)] overflow-y-auto divide-y divide-slate-100">
          {appointments.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-14 h-14 mx-auto mb-4 bg-slate-100 rounded-2xl flex items-center justify-center">
                <svg className="w-6 h-6 text-ink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <p className="text-ink-500 font-medium text-sm">No appointments found</p>
            </div>
          ) : (
            appointments.map((item, index) => (
              <div
                className="px-6 py-4 hover:bg-slate-50 transition-colors duration-150"
                key={index}
              >
                <div className="flex flex-wrap gap-4 sm:grid sm:grid-cols-[0.4fr_2.2fr_0.6fr_2fr_2.2fr_0.8fr_1fr] items-center">
                  <p className="max-sm:hidden text-ink-500 text-sm font-medium">{index + 1}</p>

                  <div className="flex items-center gap-3">
                    <img className="w-9 h-9 rounded-full object-cover" src={item.userData.image} alt="" />
                    <div className="min-w-0">
                      <p className="font-semibold text-ink-900 text-sm truncate">{item.userData.name}</p>
                      <p className="text-xs text-ink-500 sm:hidden">Age: {calculateAge(item.userData.dob)}</p>
                    </div>
                  </div>

                  <p className="max-sm:hidden text-ink-600 text-sm">{calculateAge(item.userData.dob)}</p>

                  <div className="text-sm">
                    <p className="text-ink-800 font-medium">{slotDateFormat(item.slotDate)}</p>
                    <p className="text-xs text-ink-500">{item.slotTime}</p>
                  </div>

                  <div className="flex items-center gap-3 min-w-0">
                    <img className="w-9 h-9 rounded-full object-cover bg-slate-100" src={item.docData.image} alt="" />
                    <div className="min-w-0">
                      <p className="font-semibold text-ink-900 text-sm truncate">Dr. {item.docData.name}</p>
                      <p className="text-xs text-ink-500 truncate">{item.docData.speciality}</p>
                    </div>
                  </div>

                  <p className="text-ink-900 font-bold text-sm">{currency}{item.amount}</p>

                  <div>
                    <StatusPill item={item} onCancel={() => cancelAppointment(item._id)} />
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Allapointments;
