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
    <div className='sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200'>
      <div className='flex justify-between items-center px-4 sm:px-8 h-16'>
        <div className='flex items-center gap-3'>
          <img className='h-6 sm:h-7 cursor-pointer' src={assets.admin_logo} alt='' onClick={() => navigate('/')} />
          <span className='hidden sm:inline-flex badge-brand'>
            {aToken ? 'Admin' : 'Doctor'}
          </span>
        </div>

        <button onClick={handleLogout} className='btn-secondary btn-sm'>
          <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1' />
          </svg>
          <span className='hidden sm:inline'>Log out</span>
        </button>
      </div>
    </div>
  )
}

export default Navbar
