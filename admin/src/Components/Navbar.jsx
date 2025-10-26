import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { AdminContext } from '../Context/AdminContext'
import { DoctorContext } from '../Context/DoctorContext'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
  const { aToken, setAToken } = useContext(AdminContext)
  const { dToken, setDToken } = useContext(DoctorContext)
  const navigate = useNavigate()

  const handleLogout = () => {
    navigate('/')
    if (aToken) {
      setAToken('')
      localStorage.removeItem('aToken')
    }
    if (dToken) {
      setDToken('')
      localStorage.removeItem('dToken')
    }
  }

  return (
    <div className='sticky top-0 z-50 backdrop-blur-xl bg-white/80 border-b border-gray-200 shadow-sm animate-slideDown'>
      <div className='flex justify-between items-center px-4 sm:px-10 py-4'>
        {/* Logo Section */}
        <div className='flex items-center gap-3'>
          <div className='relative group'>
            <div className='absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-300'></div>
            <img className='relative w-36 cursor-pointer transform group-hover:scale-105 transition-all' src={assets.admin_logo} alt='' />
          </div>
          <div className='hidden sm:flex items-center gap-2'>
            <span className='px-4 py-1.5 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs font-semibold rounded-full shadow-md transform hover:scale-105 transition-all'>
              {aToken ? '👨‍💼 Admin' : '👨‍⚕️ Doctor'}
            </span>
          </div>
        </div>

        {/* Right Section */}
        <div className='flex items-center gap-4'>
          {/* User Badge Mobile */}
          <div className='sm:hidden'>
            <span className='px-3 py-1.5 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs font-semibold rounded-full'>
              {aToken ? '👨‍💼' : '👨‍⚕️'}
            </span>
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className='group relative px-6 py-2.5 bg-gradient-to-r from-red-500 to-pink-600 text-white font-semibold rounded-full overflow-hidden transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl'
          >
            <span className='relative z-10 flex items-center gap-2'>
              <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1' />
              </svg>
              <span className='hidden sm:inline'>Logout</span>
            </span>
            <div className='absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left'></div>
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideDown {
          from {
            transform: translateY(-100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        .animate-slideDown {
          animation: slideDown 0.4s ease-out;
        }
      `}</style>
    </div>
  )
}

export default Navbar
