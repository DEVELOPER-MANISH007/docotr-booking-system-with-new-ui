import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../Context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'


const Login = () => {

  const navigate = useNavigate()
  
  const {backendUrl, setToken, token} = useContext(AppContext)

  const [state, setState] = useState('Sign-up')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const onSubmitHandler = async(e) => {
  e.preventDefault()
 try {
      if(state === 'Sign-up'){
        const {data} = await axios.post(backendUrl+'/api/user/register', {name, password, email})
    if(data.success){
          localStorage.setItem('token', data.token)
      setToken(data.token)
          toast.success('Account created successfully!')
        } else {
      toast.error(data.message)
    }
      } else {
        const {data} = await axios.post(backendUrl+'/api/user/login', {password, email})
    if(data.success){
          localStorage.setItem('token', data.token)
      setToken(data.token)
          toast.success('Login successful!')
        } else {
      toast.error(data.message)
    }
  }
 } catch (error) {
  toast.error(error.message)
    }
 }
 
  useEffect(() => {
if(token){
  navigate('/')
}
  }, [token, navigate]) 

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300'>
      <div className='max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-0'>
        {/* Left Side - Decorative Section */}
        <div className='hidden lg:flex flex-col justify-center items-center bg-gradient-to-br from-blue-600 via-blue-500 to-green-500 rounded-l-3xl p-12 relative overflow-hidden'>
          {/* Background Decorations */}
          <div className="absolute top-0 left-0 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-blob"></div>
          <div className="absolute bottom-0 right-0 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
          
          <div className='relative z-10 text-white text-center'>
            <div className='mb-8'>
              <div className='w-24 h-24 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6 animate-float'>
                <svg className='w-12 h-12' fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <h2 className='text-4xl font-bold mb-4'>Welcome to Prescripto</h2>
              <p className='text-xl text-blue-100 mb-8'>Your Health, Our Priority</p>
            </div>

            <div className='space-y-6'>
              <div className='flex items-center gap-4 backdrop-blur-sm bg-white/10 p-4 rounded-xl border border-white/20'>
                <div className='w-12 h-12 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0'>
                  <svg className='w-6 h-6' fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                  </svg>
                </div>
                <div className='text-left'>
                  <p className='font-semibold'>Easy Appointments</p>
                  <p className='text-sm text-blue-100'>Book with top doctors instantly</p>
                </div>
              </div>

              <div className='flex items-center gap-4 backdrop-blur-sm bg-white/10 p-4 rounded-xl border border-white/20'>
                <div className='w-12 h-12 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0'>
                  <svg className='w-6 h-6' fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                  </svg>
                </div>
                <div className='text-left'>
                  <p className='font-semibold'>100% Secure</p>
                  <p className='text-sm text-blue-100'>Your data is safe with us</p>
                </div>
              </div>

              <div className='flex items-center gap-4 backdrop-blur-sm bg-white/10 p-4 rounded-xl border border-white/20'>
                <div className='w-12 h-12 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0'>
                  <svg className='w-6 h-6' fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
                  </svg>
                </div>
                <div className='text-left'>
                  <p className='font-semibold'>Expert Doctors</p>
                  <p className='text-sm text-blue-100'>1000+ verified professionals</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Form Section */}
        <div className='bg-white dark:bg-gray-800 rounded-3xl lg:rounded-l-none lg:rounded-r-3xl shadow-2xl p-8 sm:p-12 animate-slideIn transition-colors duration-300'>
          <div className='max-w-md mx-auto'>
            {/* Header */}
            <div className='text-center mb-8'>
              <h1 className='text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-3'>
                {state === 'Sign-up' ? (
                  <>Create <span className='text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-600'>Account</span></>
                ) : (
                  <>Welcome <span className='text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-600'>Back</span></>
                )}
              </h1>
              <p className='text-gray-600 dark:text-gray-400 text-lg'>
                {state === 'Sign-up' 
                  ? 'Sign up to book your first appointment' 
                  : 'Login to manage your appointments'}
              </p>
            </div>

            {/* Form */}
            <form onSubmit={onSubmitHandler} className='space-y-6'>
              {/* Name Field (Sign-up only) */}
              {state === 'Sign-up' && (
                <div className='animate-fadeIn'>
                  <label className='block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2'>
                    Full Name
                  </label>
                  <div className='relative'>
                    <div className='absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none'>
                      <svg className='w-5 h-5 text-gray-400 dark:text-gray-500' fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                      </svg>
                    </div>
                    <input 
                      className='w-full pl-12 pr-4 py-3 border-2 border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-xl focus:border-blue-500 focus:outline-none transition-colors text-base'
                      type="text"
                      onChange={(e) => setName(e.target.value)} 
                      value={name} 
                      required 
                      placeholder='Enter your full name' 
                    />
                  </div>
                </div>
              )}

              {/* Email Field */}
              <div>
                <label className='block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2'>
                  Email Address
                </label>
                <div className='relative'>
                  <div className='absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none'>
                    <svg className='w-5 h-5 text-gray-400 dark:text-gray-500' fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                    </svg>
                  </div>
                  <input 
                    className='w-full pl-12 pr-4 py-3 border-2 border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-xl focus:border-blue-500 focus:outline-none transition-colors text-base' 
                    type="email"
                    onChange={(e) => setEmail(e.target.value)} 
                    value={email} 
                    required 
                    placeholder='your.email@example.com' 
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label className='block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2'>
                  Password
                </label>
                <div className='relative'>
                  <div className='absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none'>
                    <svg className='w-5 h-5 text-gray-400 dark:text-gray-500' fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                    </svg>
                  </div>
                  <input 
                    className='w-full pl-12 pr-12 py-3 border-2 border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-xl focus:border-blue-500 focus:outline-none transition-colors text-base' 
                    type={showPassword ? "text" : "password"}
                    onChange={(e) => setPassword(e.target.value)} 
                    value={password} 
                    required 
                    placeholder='Enter your password' 
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className='absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300'
                  >
                    {showPassword ? (
                      <svg className='w-5 h-5' fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"/>
                      </svg>
                    ) : (
                      <svg className='w-5 h-5' fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button 
                type='submit' 
                className='w-full py-4 bg-gradient-to-r from-blue-500 to-green-500 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all text-lg flex items-center justify-center gap-2'
              >
                {state === 'Sign-up' ? (
                  <>
                    <svg className='w-5 h-5' fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"/>
                    </svg>
                    Create Account
                  </>
                ) : (
                  <>
                    <svg className='w-5 h-5' fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"/>
                    </svg>
                    Login
                  </>
                )}
              </button>

              {/* Toggle State */}
              <div className='text-center pt-4'>
                {state === "Sign-up" ? (
                  <p className='text-gray-600'>
                    Already have an account?{' '}
                    <button 
                      type="button"
                      onClick={() => setState('Login')}  
                      className='text-blue-600 font-semibold hover:text-green-600 transition-colors'
                    >
                      Login here
                    </button>
                  </p>
                ) : (
                  <p className='text-gray-600'>
                    Don't have an account?{' '}
                    <button 
                      type="button"
                      onClick={() => setState('Sign-up')} 
                      className='text-blue-600 font-semibold hover:text-green-600 transition-colors'
                    >
                      Create one now
                    </button>
                  </p>
                )}
              </div>
            </form>
          </div>
      </div>
      </div>

      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        @keyframes blob {
          0%, 100% {
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
          animation: slideIn 0.6s ease-out;
        }

        .animate-fadeIn {
          animation: fadeIn 0.4s ease-out;
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

export default Login
