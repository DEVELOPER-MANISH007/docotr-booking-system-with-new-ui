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
    <div className='w-full max-w-6xl m-5'>
        <p className='mb-3 text-lg font-medium'>All Appointments</p>
        <div className='bg-white border rouneded text-sm max-h-[80vh] min-h-[50vh] overflow-y-scroll'>
          <div className='max-sm:hidden grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 py-3 px-6 border-b'>
            <p>#</p>
            <p>Patient </p>
            <p>Payment</p>
            <p>Age</p>
            <p>Date & Time</p>
            <p>Fess</p>
            <p>Action</p>
          </div>
          {
            appointments.reverse().map((items,index)=>(
              <div className='flex flex-wrap justify-between max-sm:gap-5 text-base sm:grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-100 ' key={index}>
                  <p className='max-sm:hidden'>{index+1}</p>
                  <div className='flex items-center gap-2'>
                    <img src={items.userData.image} className='w-8 rounded-full' alt="" />
                    <p >{items.userData.name}</p>
                  </div>
                  <div>
                    <p className='text-sm inline border border-primary px-2 rounded-full'>
                      {items.payment? 'Online':"CASH"}

                    </p>
                  </div>
              <p>
                {calculateAge(items.userData.dob)}
                </p>   
                <p>{slotDateFormat(items.slotDate)},{items.slotTime}</p>
                <p>{currency}{items.amount}</p>
                {
                  items.cancelled?<p className='text-red-500'>Cancelled</p>
                  :items.isCompleted?<p className='text-green-500'>Completed</p>
                  :<div className='flex'>
                  <img onClick={()=>cancelAppointment(items._id)} className='w-10 cursor-pointer'  src={assets.cancel_icon} alt="" />
                  <img onClick={()=>completeAppointment(items._id)}  className='w-10 cursor-pointer' src={assets.tick_icon} alt="" />
                </div>
                }
                
              </div>
              
            ))
          }
        </div>
    </div>
  )
}

export default DoctorAppointments