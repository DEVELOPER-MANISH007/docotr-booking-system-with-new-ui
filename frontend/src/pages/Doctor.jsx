import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../Context/AppContext'
import DoctorCard from '../components/DoctorCard'

const specialties = [
  'General physician',
  'Gynecologist',
  'Dermatologist',
  'Pediatricians',
  'Neurologist',
  'Gastroenterologist',
]

const Doctor = () => {
  const [filterDoc, setFilterDoc] = useState([])
  const navigate = useNavigate()
  const [showFilter, setShowFilter] = useState(false)
  const { speciality } = useParams()
  const { doctors } = useContext(AppContext)

  const applyFilter = () => {
    if (speciality) {
      setFilterDoc(doctors.filter((doc) => doc.speciality === speciality))
    } else {
      setFilterDoc(doctors)
    }
  }

  useEffect(() => {
    applyFilter()
  }, [doctors, speciality])

  return (
    <div className='py-10'>
      <div className='mb-8'>
        <h1 className='text-3xl md:text-4xl font-extrabold text-ink-900 dark:text-white tracking-tight mb-2'>
          {speciality || 'Find your doctor'}
        </h1>
        <p className='text-ink-500 dark:text-slate-400'>
          {filterDoc.length} {filterDoc.length === 1 ? 'doctor' : 'doctors'} available
        </p>
      </div>

      <div className='flex flex-col lg:flex-row gap-8'>
        {/* Mobile filter toggle */}
        <button
          className='lg:hidden btn-secondary w-full justify-center'
          onClick={() => setShowFilter((prev) => !prev)}
        >
          <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z' />
          </svg>
          {showFilter ? 'Hide filters' : 'Show filters'}
        </button>

        {/* Filters sidebar */}
        <aside className={`${showFilter ? 'flex' : 'hidden lg:flex'} flex-col gap-1.5 lg:w-56 flex-shrink-0`}>
          <p className='text-xs font-semibold uppercase tracking-wider text-ink-400 dark:text-slate-500 mb-2 px-1'>
            Speciality
          </p>
          <button
            onClick={() => navigate('/doctors')}
            className={`text-left px-3.5 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              !speciality
                ? 'bg-ink-900 dark:bg-brand-600 text-white'
                : 'text-ink-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-ink-800'
            }`}
          >
            All doctors
          </button>
          {specialties.map((spec) => (
            <button
              key={spec}
              onClick={() => (speciality === spec ? navigate('/doctors') : navigate(`/doctors/${spec}`))}
              className={`text-left px-3.5 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                speciality === spec
                  ? 'bg-ink-900 dark:bg-brand-600 text-white'
                  : 'text-ink-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-ink-800'
              }`}
            >
              {spec}
            </button>
          ))}
        </aside>

        {/* Grid */}
        <div className='flex-1'>
          {filterDoc.length === 0 ? (
            <div className='text-center py-24'>
              <div className='w-16 h-16 mx-auto mb-5 bg-slate-100 dark:bg-ink-800 rounded-2xl flex items-center justify-center'>
                <svg className='w-7 h-7 text-ink-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' />
                </svg>
              </div>
              <h3 className='text-lg font-bold text-ink-900 dark:text-white mb-1'>No doctors found</h3>
              <p className='text-sm text-ink-500 dark:text-slate-400'>Try a different speciality filter.</p>
            </div>
          ) : (
            <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5'>
              {filterDoc.map((item, index) => (
                <DoctorCard doctor={item} index={index} key={item._id || index} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Doctor
