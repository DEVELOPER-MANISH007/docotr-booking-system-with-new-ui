import React, { useContext } from 'react'
import { AppContext } from '../Context/AppContext'
import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const StatusBadge = ({ item }) => {
  if (item.cancelled) return <span className="badge-danger">Cancelled</span>
  if (item.isCompleted) return <span className="badge-success">Completed</span>
  if (item.payment) return <span className="badge-brand">Paid</span>
  return <span className="badge-warning">Pending</span>
}

const MyAppointment = () => {
  const { backendUrl, token, getDoctorsData } = useContext(AppContext)
  const [appointments, setAppointments] = useState([])
  const [loading, setLoading] = useState(true)
  const months = [" ", 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  const navigate = useNavigate()

  const slotDateFormat = (slotDate) => {
    const dateArry = slotDate.split('_')
    return dateArry[0] + " " + months[Number(dateArry[1])] + " " + dateArry[2]
  }

  const getUserAppointments = async () => {
    setLoading(true)
    try {
      const { data } = await axios.get(backendUrl + '/api/user/listAppointments', { headers: { 'Authorization': `Bearer ${token}` } })
      if (data.success) {
        setAppointments(data.appointments.reverse())
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error.message)
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(backendUrl + '/api/user/cancelAppointment', { appointmentId }, { headers: { 'Authorization': `Bearer ${token}` } })
      if (data.success) {
        toast.success(data.message)
        getUserAppointments()
        getDoctorsData()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  const initPay = (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY,
      amount: order.amount,
      currency: 'INR',
      name: 'Doctor Appointment',
      description: 'Payment for your appointment',
      receipt: order.receipt,
      order_id: order.id,
      handler: async (response) => {
        try {
          const { data } = await axios.post(backendUrl + '/api/user/verifyRazorpay', response, { headers: { 'Authorization': `Bearer ${token}` } })
          if (data.success) {
            getUserAppointments()
            navigate('/my-appointments')
          }
        } catch (error) {
          console.log(error)
          toast.error(error.message)
        }
      }
    }

    const rzp = new window.Razorpay(options)
    rzp.open()
  }

  const appointmentRazorpay = async (appointmentId) => {
    const { data } = await axios.post(backendUrl + '/api/user/paymentRazorpay', { appointmentId }, { headers: { 'Authorization': `Bearer ${token}` } })
    if (data.success) {
      initPay(data.order)
    }
  }

  useEffect(() => {
    if (token) {
      getUserAppointments()
    }
  }, [token])

  return (
    <div className='py-10'>
      <div className='mb-8'>
        <h1 className='text-3xl font-extrabold text-ink-900 dark:text-white tracking-tight mb-1'>My appointments</h1>
        <p className='text-ink-500 dark:text-slate-400 text-sm'>Manage and track all your medical appointments</p>
      </div>

      {loading ? (
        <div className='space-y-4'>
          {[1, 2].map((i) => (
            <div key={i} className='card h-40 animate-pulse bg-slate-100 dark:bg-ink-700' />
          ))}
        </div>
      ) : appointments.length === 0 ? (
        <div className='text-center py-24'>
          <div className='w-16 h-16 mx-auto mb-5 bg-slate-100 dark:bg-ink-800 rounded-2xl flex items-center justify-center'>
            <svg className='w-7 h-7 text-ink-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2' />
            </svg>
          </div>
          <h3 className='text-lg font-bold text-ink-900 dark:text-white mb-1'>No appointments yet</h3>
          <p className='text-sm text-ink-500 dark:text-slate-400 mb-6'>Book your first appointment with one of our trusted doctors.</p>
          <button onClick={() => navigate('/doctors')} className='btn-primary'>
            Browse doctors
          </button>
        </div>
      ) : (
        <div className='space-y-4'>
          {appointments.map((item, index) => (
            <div className='card overflow-hidden' key={index}>
              <div className='flex flex-col sm:flex-row'>
                <div className='sm:w-40 relative flex-shrink-0 bg-slate-100 dark:bg-ink-700'>
                  <img
                    className='w-full h-40 sm:h-full object-cover object-top'
                    src={item.docData.image}
                    alt={item.docData.name}
                  />
                  <div className='absolute top-3 right-3'>
                    <StatusBadge item={item} />
                  </div>
                </div>

                <div className='flex-1 p-6'>
                  <div className='flex flex-col md:flex-row md:justify-between md:items-start gap-4'>
                    <div className='flex-1'>
                      <h3 className='text-lg font-bold text-ink-900 dark:text-white mb-0.5'>
                        Dr. {item.docData.name}
                      </h3>
                      <p className='text-brand-600 dark:text-brand-300 text-sm font-medium mb-4'>{item.docData.speciality}</p>

                      <div className='mb-4'>
                        <p className='text-ink-700 dark:text-slate-300 text-sm font-semibold mb-1 flex items-center gap-1.5'>
                          <svg className='w-4 h-4 text-ink-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z' />
                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M15 11a3 3 0 11-6 0 3 3 0 016 0z' />
                          </svg>
                          Address
                        </p>
                        <p className='text-ink-500 dark:text-slate-400 text-sm pl-6'>{item.docData.address.line1}</p>
                        <p className='text-ink-500 dark:text-slate-400 text-sm pl-6'>{item.docData.address.line2}</p>
                      </div>

                      <div className='inline-flex items-center gap-2.5 bg-slate-50 dark:bg-ink-900 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-ink-600'>
                        <svg className='w-4 h-4 text-brand-600 dark:text-brand-300' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' />
                        </svg>
                        <div>
                          <p className='text-[11px] text-ink-500 dark:text-slate-400'>Date & time</p>
                          <p className='font-semibold text-sm text-ink-900 dark:text-white'>{slotDateFormat(item.slotDate)} · {item.slotTime}</p>
                        </div>
                      </div>
                    </div>

                    {!item.cancelled && !item.payment && !item.isCompleted && (
                      <div className='flex sm:flex-col gap-2.5 sm:min-w-[160px]'>
                        <button onClick={() => appointmentRazorpay(item._id)} className='btn-primary btn-sm flex-1 sm:flex-none justify-center'>
                          Pay online
                        </button>
                        <button onClick={() => cancelAppointment(item._id)} className='btn-danger btn-sm flex-1 sm:flex-none justify-center'>
                          Cancel
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyAppointment;
