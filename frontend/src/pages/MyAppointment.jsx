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
    <div>
      <p className='pb-3 mt-12 font-medium text-zinc-700 border-bottom'>My Appointments</p>
      <div>
      {appointments.map((item,index)=>(
        <div className='grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b' key={index}>
          <div>
            <img className='w-32 bg-indigo-50' src={item.docData.image} alt="" />
          </div>
          <div className='flex-1 text-sm text-zinc-600'>
            <p className='text-neutral-800 font-semibold'>{item.docData.name}</p>
            <p>{item.docData.speciality}</p>
            <p className='text-zinc-700 font-medium mt-1'>Address:</p>
            <p className='text-xs'>{item.docData.address.line1}</p>
            <p className='text-xs'>{item.docData.address.line2}</p>
              <p className='text-sm mt-1'><span className='text-sm text-neutral-700 font-medium '>Date & Time:</span> {slotDateFormat(item.slotDate)} |  {item.slotTime}</p>
          </div>
          <div></div>
          <div className='flex flex-col justify-end gap-5'>
          {!item.cancelled && !item.payment && !item.isCompleted && <button onClick={()=>appointmentRazorpay(item._id)}  className=' px-2 rounded-lg text-sm text-stone-500 text-center sm:min-w-48 py-2 border hover:bg-primary hover:text-white transition-all duration-300 ' >Pay Online</button>}
          {!item.cancelled && item.payment && <button className=' px-2 rounded-lg text-sm text-green-500 text-center sm:min-w-48 py-2 border border-green-500 cursor-default' >Paid</button>}
          {!item.cancelled && item.isCompleted && !item.payment && <button className=' px-2 rounded-lg text-sm text-blue-500 text-center sm:min-w-48 py-2 border border-blue-500 cursor-default' >Completed</button>}
          {!item.cancelled && !item.isCompleted && <button onClick={()=>cancelAppointment(item._id)} className=' px-2 rounded-lg text-sm text-stone-500 text-center sm:min-w-48 py-2 border hover:bg-red-600 hover:text-white transition-all duration-300 ' >Cancel Appointment</button>}
          {item.cancelled && <button  className=' px-2 rounded-lg text-sm text-red-500 text-center sm:min-w-48 py-2 border border-red-500 cursor-default' >Appointment Cancelled</button>}
          </div>
        </div>
      ))}
    </div>
    </div>
  );
}

export default MyAppointment;
