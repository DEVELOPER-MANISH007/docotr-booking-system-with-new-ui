import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../Context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'

const perks = [
  {
    title: 'Easy appointments',
    desc: 'Book with top doctors instantly',
    icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z',
  },
  {
    title: '100% secure',
    desc: 'Your data is protected end to end',
    icon: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z',
  },
  {
    title: 'Verified doctors',
    desc: '1000+ trusted healthcare professionals',
    icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z',
  },
]

const Login = () => {
  const navigate = useNavigate()
  const { backendUrl, setToken, token } = useContext(AppContext)

  const [state, setState] = useState('Sign-up')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      if (state === 'Sign-up') {
        const { data } = await axios.post(backendUrl + '/api/user/register', { name, password, email })
        if (data.success) {
          localStorage.setItem('token', data.token)
          setToken(data.token)
          toast.success('Account created successfully!')
        } else {
          toast.error(data.message)
        }
      } else {
        const { data } = await axios.post(backendUrl + '/api/user/login', { password, email })
        if (data.success) {
          localStorage.setItem('token', data.token)
          setToken(data.token)
          toast.success('Login successful!')
        } else {
          toast.error(data.message)
        }
      }
    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (token) {
      navigate('/')
    }
  }, [token, navigate])

  return (
    <div className='min-h-[calc(100vh-4rem)] flex items-center justify-center py-12'>
      <div className='max-w-5xl w-full grid grid-cols-1 lg:grid-cols-2 rounded-2xl overflow-hidden panel'>
        {/* Left - branding */}
        <div className='hidden lg:flex flex-col justify-center bg-ink-950 p-12 relative overflow-hidden'>
          <div className='absolute -top-16 -left-16 w-64 h-64 bg-brand-600/20 rounded-full blur-3xl' />
          <div className='absolute -bottom-20 -right-10 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl' />

          <div className='relative z-10 text-white'>
            <img src={assets.logo} alt="Prescripto" className="h-7 mb-10 brightness-0 invert" />
            <h2 className='text-3xl font-extrabold mb-2 tracking-tight'>Welcome to Prescripto</h2>
            <p className='text-slate-300 mb-10'>Your health, our priority.</p>

            <div className='space-y-4'>
              {perks.map((p) => (
                <div key={p.title} className='flex items-center gap-4 bg-white/5 border border-white/10 p-4 rounded-xl'>
                  <div className='w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0'>
                    <svg className='w-5 h-5 text-teal-300' fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={p.icon} />
                    </svg>
                  </div>
                  <div>
                    <p className='font-semibold text-sm'>{p.title}</p>
                    <p className='text-xs text-slate-400'>{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right - form */}
        <div className='bg-white dark:bg-ink-800 p-8 sm:p-12 flex items-center'>
          <div className='w-full max-w-sm mx-auto'>
            <div className='mb-8'>
              <h1 className='text-2xl sm:text-3xl font-extrabold text-ink-900 dark:text-white tracking-tight mb-2'>
                {state === 'Sign-up' ? 'Create account' : 'Welcome back'}
              </h1>
              <p className='text-ink-500 dark:text-slate-400 text-sm'>
                {state === 'Sign-up'
                  ? 'Sign up to book your first appointment'
                  : 'Log in to manage your appointments'}
              </p>
            </div>

            <form onSubmit={onSubmitHandler} className='space-y-5'>
              {state === 'Sign-up' && (
                <div>
                  <label className='field-label'>Full name</label>
                  <input
                    className='input'
                    type="text"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    required
                    placeholder='Jane Cooper'
                  />
                </div>
              )}

              <div>
                <label className='field-label'>Email address</label>
                <input
                  className='input'
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  required
                  placeholder='you@example.com'
                />
              </div>

              <div>
                <label className='field-label'>Password</label>
                <div className='relative'>
                  <input
                    className='input pr-11'
                    type={showPassword ? 'text' : 'password'}
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    required
                    placeholder='Enter your password'
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className='absolute inset-y-0 right-0 pr-3.5 flex items-center text-ink-400 hover:text-ink-600 dark:hover:text-slate-300'
                    tabIndex={-1}
                  >
                    {showPassword ? (
                      <svg className='w-[18px] h-[18px]' fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                      </svg>
                    ) : (
                      <svg className='w-[18px] h-[18px]' fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              <button type='submit' disabled={loading} className='btn-primary w-full btn-lg'>
                {loading ? 'Please wait…' : state === 'Sign-up' ? 'Create account' : 'Log in'}
              </button>

              <p className='text-center text-sm text-ink-500 dark:text-slate-400 pt-1'>
                {state === 'Sign-up' ? (
                  <>
                    Already have an account?{' '}
                    <button type="button" onClick={() => setState('Login')} className='text-brand-600 dark:text-brand-300 font-semibold hover:underline'>
                      Log in
                    </button>
                  </>
                ) : (
                  <>
                    Don't have an account?{' '}
                    <button type="button" onClick={() => setState('Sign-up')} className='text-brand-600 dark:text-brand-300 font-semibold hover:underline'>
                      Create one
                    </button>
                  </>
                )}
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
