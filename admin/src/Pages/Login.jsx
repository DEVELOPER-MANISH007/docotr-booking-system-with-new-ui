import React, { useState, useContext } from 'react'
import { AdminContext } from '../Context/AdminContext'
import { toast } from 'react-toastify'
import axios from 'axios'
import { DoctorContext } from '../Context/DoctorContext'
import { assets } from '../assets/assets'

const Login = () => {
  const [state, setState] = useState('Admin')
  const { setAToken, backendUrl } = useContext(AdminContext)
  const { setDToken } = useContext(DoctorContext)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      if (state === 'Admin') {
        const { data } = await axios.post(backendUrl + '/api/admin/login', { email, password })
        if (data.success) {
          localStorage.setItem('aToken', data.token)
          setAToken(data.token)
          toast.success('Welcome back!')
        } else {
          toast.error(data.message)
        }
      } else {
        const { data } = await axios.post(backendUrl + '/api/doctor/login', { email, password })
        if (data.success) {
          localStorage.setItem('dToken', data.token)
          setDToken(data.token)
          toast.success('Welcome back!')
        } else {
          toast.error(data.message)
        }
      }
    } catch (error) {
      toast.error(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-slate-25 p-4'>
      <form onSubmit={onSubmitHandler} className='w-full max-w-sm'>
        <div className='panel p-8 sm:p-9'>
          <div className='mb-7'>
            <img src={assets.admin_logo} alt="Prescripto" className="h-7 mb-6" />
            <h1 className='text-2xl font-extrabold text-ink-900 tracking-tight mb-1'>
              {state} sign in
            </h1>
            <p className='text-sm text-ink-500'>Enter your credentials to access the dashboard</p>
          </div>

          {/* Toggle */}
          <div className='flex gap-1 mb-6 p-1 bg-slate-100 rounded-lg'>
            <button
              type='button'
              onClick={() => setState('Admin')}
              className={`flex-1 py-2 rounded-md text-sm font-semibold transition-all duration-200 ${
                state === 'Admin' ? 'bg-white text-ink-900 shadow-sm' : 'text-ink-500 hover:text-ink-700'
              }`}
            >
              Admin
            </button>
            <button
              type='button'
              onClick={() => setState('Doctor')}
              className={`flex-1 py-2 rounded-md text-sm font-semibold transition-all duration-200 ${
                state === 'Doctor' ? 'bg-white text-ink-900 shadow-sm' : 'text-ink-500 hover:text-ink-700'
              }`}
            >
              Doctor
            </button>
          </div>

          <div className='space-y-4'>
            <div>
              <label className='field-label'>Email address</label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className='input'
                type='email'
                placeholder='you@example.com'
                required
              />
            </div>

            <div>
              <label className='field-label'>Password</label>
              <div className='relative'>
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  className='input pr-11'
                  type={showPassword ? 'text' : 'password'}
                  placeholder='Enter your password'
                  required
                />
                <button
                  type='button'
                  onClick={() => setShowPassword(!showPassword)}
                  className='absolute inset-y-0 right-0 pr-3.5 flex items-center text-ink-400 hover:text-ink-600'
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <svg className='w-[18px] h-[18px]' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21'/>
                    </svg>
                  ) : (
                    <svg className='w-[18px] h-[18px]' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'/>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z'/>
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <button type='submit' disabled={isLoading} className='btn-primary w-full btn-lg mt-2'>
              {isLoading ? 'Signing in…' : 'Sign in'}
            </button>
          </div>

          <p className='mt-6 text-center text-xs text-ink-400 flex items-center justify-center gap-1.5'>
            <svg className='w-3.5 h-3.5' fill='currentColor' viewBox='0 0 20 20'>
              <path fillRule='evenodd' d='M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z' clipRule='evenodd'/>
            </svg>
            Secure sign in — your data is protected
          </p>
        </div>
      </form>
    </div>
  )
}

export default Login
