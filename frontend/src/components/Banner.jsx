import React from 'react'
import { useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'

const Banner = () => {
  const navigate = useNavigate()
  return (
    <div className='relative flex overflow-hidden bg-gradient-to-br from-indigo-600 via-blue-600 to-cyan-500 dark:from-indigo-800 dark:via-blue-800 dark:to-cyan-700 rounded-3xl px-6 sm:px-10 md:px-14 lg:px-16 mt-20 mx-4 md:mx-10 shadow-2xl transition-colors duration-300'>
      {/* Animated Background Elements */}
      <div className='absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-blob'></div>
      <div className='absolute bottom-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-blob animation-delay-2000'></div>

      {/* Left Side */}
      <div className='relative z-10 flex-1 py-12 sm:py-16 md:py-20 lg:py-28'>
        <div className='max-w-xl animate-slideIn'>
          {/* Badge */}
          <div className='inline-block mb-6'>
            <span className='px-4 py-2 bg-white/20 backdrop-blur-sm text-white text-sm font-semibold rounded-full border border-white/30'>
              🌟 Join Thousands of Happy Patients
            </span>
          </div>

          {/* Heading */}
          <h2 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6'>
            Book Appointment
            <br />
            <span className='text-yellow-300'>With 100+ Trusted Doctors</span>
          </h2>

          {/* Description */}
          <p className='text-white/90 text-lg mb-8 max-w-md'>
            Get instant access to qualified healthcare professionals. Your health journey starts here!
          </p>

          {/* Buttons */}
          <div className='flex flex-wrap gap-4'>
            <button
              className='group px-8 py-4 bg-white hover:bg-yellow-300 text-gray-800 font-bold rounded-full shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center gap-2'
              onClick={() => {
                navigate('/login')
                scrollTo(0, 0)
              }}
            >
              Create Account
              <svg
                className='w-5 h-5 group-hover:translate-x-1 transition-transform'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M13 7l5 5m0 0l-5 5m5-5H6' />
              </svg>
            </button>

            <button
              className='px-8 py-4 backdrop-blur-sm bg-white/20 hover:bg-white/30 border-2 border-white text-white font-bold rounded-full shadow-xl transform hover:scale-105 transition-all duration-300'
              onClick={() => {
                navigate('/doctors')
                scrollTo(0, 0)
              }}
            >
              Browse Doctors
            </button>
          </div>

          {/* Features */}
          <div className='flex flex-wrap gap-6 mt-10'>
            <div className='flex items-center gap-2 text-white'>
              <div className='w-8 h-8 bg-green-500 rounded-full flex items-center justify-center'>
                <svg className='w-5 h-5' fill='currentColor' viewBox='0 0 20 20'>
                  <path fillRule='evenodd' d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z' clipRule='evenodd' />
                </svg>
              </div>
              <span className='font-semibold'>24/7 Support</span>
            </div>

            <div className='flex items-center gap-2 text-white'>
              <div className='w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center'>
                <svg className='w-5 h-5' fill='currentColor' viewBox='0 0 20 20'>
                  <path fillRule='evenodd' d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z' clipRule='evenodd' />
                </svg>
              </div>
              <span className='font-semibold'>Instant Booking</span>
            </div>

            <div className='flex items-center gap-2 text-white'>
              <div className='w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center'>
                <svg className='w-5 h-5' fill='currentColor' viewBox='0 0 20 20'>
                  <path fillRule='evenodd' d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z' clipRule='evenodd' />
                </svg>
              </div>
              <span className='font-semibold'>Verified Doctors</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Image */}
      <div className='relative z-10 hidden md:flex md:w-1/2 lg:w-[400px] items-end justify-end animate-float'>
        <img
          className='w-full max-w-md drop-shadow-2xl'
          src={assets.appointment_img}
          alt='Doctor'
        />
      </div>

      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        @keyframes blob {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }

        .animate-slideIn {
          animation: slideIn 0.8s ease-out;
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animate-blob {
          animation: blob 7s infinite;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </div>
  )
}

export default Banner
