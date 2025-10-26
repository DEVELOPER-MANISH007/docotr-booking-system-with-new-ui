import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../Context/AppContext'

const Doctor = () => {
  const [filterDoc,setFilterDoc] = useState([])
  const navigate = useNavigate()
const [showFilter,setShowFilter] = useState(false)
  const {speciality} =useParams()
  const {doctors} = useContext(AppContext)


const applyFilter =()=>{
  if(speciality){
    setFilterDoc(doctors.filter(doc=>doc.speciality===speciality))
  }else{
    setFilterDoc(doctors)
  }
}

useEffect(()=>{
  applyFilter()
},[doctors,speciality])

  const specialties = [
    'General physician',
    'Gynecologist',
    'Dermatologist',
    'Pediatricians',
    'Neurologist',
    'Gastroenterologist'
  ];

  return (
    <div className='max-w-7xl mx-auto px-4 py-12'>
      {/* Header */}
      <div className='mb-10 animate-fadeIn'>
        <h1 className='text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-3'>
          Find Your <span className='text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600'>Doctor</span>
        </h1>
        <p className='text-gray-600 dark:text-gray-300 text-lg'>Browse through our extensive list of specialist doctors</p>
      </div>

      <div className='flex flex-col lg:flex-row gap-8'>
        {/* Mobile Filter Button */}
        <button
          className={`lg:hidden w-full py-3 px-6 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
            showFilter
              ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
              : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border-2 border-gray-200 dark:border-gray-700 hover:border-blue-500'
          }`}
          onClick={() => setShowFilter(prev => !prev)}
        >
          <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z'/>
          </svg>
          {showFilter ? 'Hide Filters' : 'Show Filters'}
        </button>

        {/* Filters Sidebar */}
        <div className={`${showFilter ? 'flex' : 'hidden lg:flex'} flex-col gap-4 lg:w-64 animate-slideIn`}>
          <div className='bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-100 dark:border-gray-700 transition-colors duration-300'>
            <h3 className='text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2'>
              <svg className='w-6 h-6 text-blue-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10'/>
              </svg>
              Specialities
            </h3>
            <div className='space-y-2'>
              {/* All Doctors Option */}
              <button
                onClick={() => navigate('/doctors')}
                className={`w-full text-left px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                  !speciality
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg transform scale-105'
                    : 'bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 hover:translate-x-1'
                }`}
              >
                All Doctors
              </button>

              {/* Specialty Filters */}
              {specialties.map((spec, index) => (
                <button
                  key={index}
                  onClick={() => speciality === spec ? navigate('/doctors') : navigate(`/doctors/${spec}`)}
                  className={`w-full text-left px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                    speciality === spec
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg transform scale-105'
                      : 'bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 hover:translate-x-1'
                  }`}
                >
                  {spec}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Doctors Grid */}
        <div className='flex-1'>
          {filterDoc.length === 0 ? (
            <div className='text-center py-20 animate-slideUp'>
              <div className='w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 rounded-full flex items-center justify-center'>
                <svg className='w-12 h-12 text-blue-600 dark:text-blue-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'/>
                </svg>
              </div>
              <h3 className='text-2xl font-bold text-gray-800 dark:text-white mb-2'>No Doctors Found</h3>
              <p className='text-gray-600 dark:text-gray-400'>Try adjusting your filters</p>
            </div>
          ) : (
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
              {filterDoc.map((item, index) => (
                <div
                  onClick={() => { navigate(`/appointment/${item._id}`); scrollTo(0,0) }}
                  className='group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden cursor-pointer shadow-md hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border border-gray-100 dark:border-gray-700 animate-slideUp'
                  style={{ animationDelay: `${index * 100}ms` }}
                  key={index}
                >
                  {/* Availability Badge */}
                  <div className='absolute top-4 right-4 z-10'>
                    <div
                      className={`px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm ${
                        item.available
                          ? 'bg-green-100/80 text-green-700 border border-green-200'
                          : 'bg-red-100/80 text-red-700 border border-red-200'
                      }`}
                    >
                      {item.available ? '● Available' : '● Unavailable'}
                    </div>
                  </div>

                  {/* Doctor Image */}
                  <div className='relative overflow-hidden aspect-square bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-700 dark:to-gray-800'>
                    <img
                      className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-500'
                      src={item.image}
                      alt={item.name}
                    />
                    <div className='absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity'></div>
                  </div>

                  {/* Doctor Info */}
                  <div className='p-5'>
                    <h3 className='text-lg font-bold text-gray-900 dark:text-white mb-1 group-hover:text-blue-600 transition-colors'>
                      Dr. {item.name}
                    </h3>
                    <p className='text-gray-600 dark:text-gray-300 text-sm mb-3'>{item.speciality}</p>

                    {/* Book Now Button */}
                    <button className='w-full py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300'>
                      Book Appointment
                    </button>
                  </div>

                  {/* Hover Border Effect */}
                  <div className='absolute inset-0 border-2 border-transparent group-hover:border-blue-500 rounded-2xl transition-all pointer-events-none'></div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Doctor
