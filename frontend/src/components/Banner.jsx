import React from 'react'
import { useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'

const Banner = () => {
  const navigate = useNavigate()
  return (
    <div className='flex bg-primary rounded-lg px-6 sm:px-10 md:px-14 lg:px-12 mt-20 md:mx-10'>
      {/* ------------------Left Side------------------ */}
      <div className='flex-1 py-8 sm:py-10 md:py-16  lg:py-24 lg:pl-5 '>
        <div className='text-xl md:text-3xl sm:text-2xl lg:text-4xl font-semibold text-white '>
          <p>Book Appointment</p>
          <p className='mt-4'>With 100+ Trusted Doctors</p>
          <button className='cursor-pointer text-gray-600 text-sm px-8 py-3 mt-6 hover:scale-105 transition-all duration-300  sm:text-base bg-white m-4 rounded-full' onClick={()=>{navigate('/login');scrollTo(0,0)}}>Create Account</button>
        </div>
      </div>
      {/* ------------------- Right Side -------------------- */}
      <div className='hidden md:block md:w-1/2 lg:w-[360px] relative'>
        <img className='w-full absolute bottom-0 right-0 max-w-md ' src={assets.appointment_img} alt="" />
      </div>
    </div>
  )
}

export default Banner
