import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../Context/AppContext'

const TopDoctors = () => {
  const navigate = useNavigate()
  const { doctors } = useContext(AppContext)

  return (
    <div id='doctors' className='flex flex-col items-center gap-6 my-20 text-gray-900 dark:text-gray-100 px-4 md:px-10'>
      {/* Header */}
      <div className='text-center animate-fadeIn'>
        <h1 className='text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-3'>
          Top <span className='text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600'>Doctors</span> to Book
        </h1>
        <p className='text-gray-600 dark:text-gray-400 text-base max-w-2xl mx-auto'>
          Connect with highly qualified and experienced doctors trusted by thousands
        </p>
      </div>

      {/* Doctors Grid */}
      <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 py-8'>
        {doctors.slice(0, 10).map((item, index) => (
          <div
            onClick={() => {
              navigate(`/appointment/${item._id}`)
              scrollTo(0, 0)
            }}
            className='group relative bg-white dark:bg-gray-800 rounded-2xl overflow-hidden cursor-pointer shadow-md hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 animate-slideUp'
            style={{ animationDelay: `${index * 100}ms` }}
            key={index}
          >
            {/* Availability Badge */}
            <div className='absolute top-3 right-3 z-10'>
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
            <div className='relative overflow-hidden aspect-square bg-gradient-to-br from-blue-50 to-purple-50'>
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
                {item.name}
              </h3>
              <p className='text-gray-600 dark:text-gray-400 text-sm mb-3'>{item.speciality}</p>

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

      {/* View More Button */}
      <button
        onClick={() => {
          navigate('/doctors')
          scrollTo(0, 0)
        }}
        className='group mt-8 px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center gap-2'
      >
        View All Doctors
        <svg
          className='w-5 h-5 group-hover:translate-x-1 transition-transform'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
        >
          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M13 7l5 5m0 0l-5 5m5-5H6' />
        </svg>
      </button>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out;
        }

        .animate-slideUp {
          animation: slideUp 0.6s ease-out;
          animation-fill-mode: both;
        }
      `}</style>
    </div>
  )
}

export default TopDoctors
