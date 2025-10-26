import React, { useContext } from 'react'
import { AppContext } from '../Context/AppContext'
import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'




const MyAppointment = () => {
  const {backendUrl,token,getDoctorsData}   = useContext(AppContext)
const [appointments,setAppointments] = useState([])
const months = [" ",'January','February','March','April','May','June','July','August','September','October','November','December']
const navigate = useNavigate()
const slotDateFormat = (slotDate)=>{
const dateArry  = slotDate.split('_')
return dateArry[0]+ " "+months[Number(dateArry[1])]+" "+dateArry[2]
}


const getUserAppointments = async()=>{

try {
  const {data} = await axios.get(backendUrl+'/api/user/listAppointments',{headers:{'Authorization':`Bearer ${token}`}})
  if(data.success){
    setAppointments(data.appointments.reverse())
  }else{
    toast.error(data.message)
  }
  } catch (error) {
    console.log(error.message)
    toast.error(error.message)
  }
}

const cancelAppointment = async(appointmentId)=>{
try {
    console.log(appointmentId)
    const {data} = await axios.post(backendUrl+'/api/user/cancelAppointment',{appointmentId},{headers:{'Authorization':`Bearer ${token}`}})
    if(data.success){
      toast.success(data.message)
      getUserAppointments()
      getDoctorsData()
    }else{
      toast.error(data.message)
    }
} catch (error) {
  console.log(error)
  toast.error(error.message)
}

}


const initPay = (order)=>{
const options = 
{
  key: import.meta.env.VITE_RAZORPAY_KEY,
  amount: order.amount,
  currency: 'INR',
  name: 'Doctor Appointment',
  description: 'Payment for your appointment',
  receipt: order.receipt ,
  order_id: order.id,
  handler:async(response)=>{
console.log(response)
try {
  const {data} = await axios.post(backendUrl+'/api/user/verifyRazorpay',response,{headers:{'Authorization':`Bearer ${token}`}})
  if(data.success){
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
const appointmentRazorpay = async(appointmentId)=>{

  const {data} = await axios.post(backendUrl+'/api/user/paymentRazorpay',{appointmentId},{headers:{'Authorization':`Bearer ${token}`}})
  if(data.success){
   initPay(data.order)
  }
}

useEffect(()=>{
  if(token){
    getUserAppointments()
  }
},[token])

  return (
    <div className='max-w-6xl mx-auto px-4 py-12'>
      {/* Header */}
      <div className='mb-10 animate-fadeIn'>
        <h1 className='text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-3'>
          My <span className='text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600'>Appointments</span>
        </h1>
        <p className='text-gray-600 dark:text-gray-300'>Manage and track all your medical appointments</p>
          </div>

      {/* Appointments List */}
      {appointments.length === 0 ? (
        <div className='text-center py-20 animate-slideUp'>
          <div className='w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 rounded-full flex items-center justify-center'>
            <svg className='w-12 h-12 text-blue-600 dark:text-blue-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2' />
            </svg>
          </div>
          <h3 className='text-2xl font-bold text-gray-800 dark:text-white mb-2'>No Appointments Yet</h3>
          <p className='text-gray-600 dark:text-gray-300 mb-6'>Book your first appointment with our trusted doctors</p>
          <button
            onClick={() => navigate('/doctors')}
            className='px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all'
          >
            Browse Doctors
          </button>
        </div>
      ) : (
        <div className='space-y-6'>
          {appointments.map((item, index) => (
            <div
              className='group bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700 animate-slideUp'
              style={{ animationDelay: `${index * 100}ms` }}
              key={index}
            >
              <div className='flex flex-col md:flex-row'>
                {/* Doctor Image */}
                <div className='md:w-48 relative overflow-hidden bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-700 dark:to-gray-800'>
                  <img
                    className='w-full h-48 md:h-full object-cover group-hover:scale-110 transition-transform duration-500'
                    src={item.docData.image}
                    alt={item.docData.name}
                  />
                  {/* Status Badge on Image */}
                  <div className='absolute top-4 right-4'>
                    {item.cancelled ? (
                      <span className='px-3 py-1 bg-red-500 text-white text-xs font-bold rounded-full'>Cancelled</span>
                    ) : item.isCompleted ? (
                      <span className='px-3 py-1 bg-green-500 text-white text-xs font-bold rounded-full'>Completed</span>
                    ) : item.payment ? (
                      <span className='px-3 py-1 bg-blue-500 text-white text-xs font-bold rounded-full'>Paid</span>
                    ) : (
                      <span className='px-3 py-1 bg-yellow-500 text-white text-xs font-bold rounded-full'>Pending</span>
                    )}
                  </div>
                </div>

                {/* Appointment Details */}
                <div className='flex-1 p-6'>
                  <div className='flex flex-col md:flex-row md:justify-between md:items-start gap-4'>
                    <div className='flex-1'>
                      <h3 className='text-2xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors'>
                        Dr. {item.docData.name}
                      </h3>
                      <p className='text-blue-600 dark:text-blue-400 font-semibold mb-4'>{item.docData.speciality}</p>

                      {/* Address */}
                      <div className='mb-4'>
                        <p className='text-gray-700 dark:text-gray-300 font-semibold mb-1 flex items-center gap-2'>
                          <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z' />
                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M15 11a3 3 0 11-6 0 3 3 0 016 0z' />
                          </svg>
                          Address:
                        </p>
                        <p className='text-gray-600 dark:text-gray-400 text-sm pl-7'>{item.docData.address.line1}</p>
                        <p className='text-gray-600 dark:text-gray-400 text-sm pl-7'>{item.docData.address.line2}</p>
                      </div>

                      {/* Date & Time */}
                      <div className='flex items-center gap-2 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 px-4 py-3 rounded-xl'>
                        <svg className='w-5 h-5 text-blue-600 dark:text-blue-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' />
                        </svg>
                        <div>
                          <p className='text-gray-600 dark:text-gray-400 text-xs'>Appointment Date & Time</p>
                          <p className='font-bold text-gray-900 dark:text-white'>{slotDateFormat(item.slotDate)} | {item.slotTime}</p>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className='flex md:flex-col gap-3 md:min-w-[200px]'>
                      {!item.cancelled && !item.payment && !item.isCompleted && (
                        <>
                          <button
                            onClick={() => appointmentRazorpay(item._id)}
                            className='flex-1 md:flex-none px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all flex items-center justify-center gap-2'
                          >
                            <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z' />
                            </svg>
                            Pay Online
                          </button>
                          <button
                            onClick={() => cancelAppointment(item._id)}
                            className='flex-1 md:flex-none px-6 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 font-semibold rounded-xl hover:bg-red-500 hover:text-white transform hover:scale-105 transition-all flex items-center justify-center gap-2'
                          >
                            <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M6 18L18 6M6 6l12 12' />
                            </svg>
                            Cancel
                          </button>
                        </>
                      )}

                      {!item.cancelled && item.payment && (
                        <div className='flex-1 md:flex-none px-6 py-3 bg-green-100 text-green-700 font-bold rounded-xl border-2 border-green-500 flex items-center justify-center gap-2'>
                          <svg className='w-5 h-5' fill='currentColor' viewBox='0 0 20 20'>
                            <path fillRule='evenodd' d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z' clipRule='evenodd' />
                          </svg>
                          Paid
                        </div>
                      )}

                      {!item.cancelled && item.isCompleted && !item.payment && (
                        <div className='flex-1 md:flex-none px-6 py-3 bg-blue-100 text-blue-700 font-bold rounded-xl border-2 border-blue-500 flex items-center justify-center gap-2'>
                          <svg className='w-5 h-5' fill='currentColor' viewBox='0 0 20 20'>
                            <path fillRule='evenodd' d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z' clipRule='evenodd' />
                          </svg>
                          Completed
                        </div>
                      )}

                      {item.cancelled && (
                        <div className='flex-1 md:flex-none px-6 py-3 bg-red-100 text-red-700 font-bold rounded-xl border-2 border-red-500 flex items-center justify-center gap-2'>
                          <svg className='w-5 h-5' fill='currentColor' viewBox='0 0 20 20'>
                            <path fillRule='evenodd' d='M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z' clipRule='evenodd' />
                          </svg>
                          Cancelled
                        </div>
                      )}
                    </div>
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
