import React from 'react'
import { specialityData } from '../assets/assets'
import { Link } from 'react-router-dom'

const SpecialityMenu = () => {
  return (
    <div id='speciality' className='flex flex-col items-center gap-6 py-20 text-gray-800 dark:text-gray-200 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 transition-colors duration-300'>
      {/* Header */}
      <div className='text-center animate-fadeIn'>
        <h1 className='text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-3'>
          Find by <span className='text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600'>Speciality</span>
        </h1>
        <p className='sm:w-2/3 mx-auto text-gray-600 dark:text-gray-400 text-base'>
          Choose from our wide range of medical specialities and connect with expert doctors
        </p>
      </div>

      {/* Speciality Cards */}
      <div className='flex sm:justify-center gap-6 pt-8 w-full overflow-x-auto pb-4 px-4 scrollbar-hide'>
        {specialityData.map((item, index) => (
          <Link
            onClick={() => scrollTo(0, 0)}
            className='group flex flex-col items-center text-sm cursor-pointer flex-shrink-0 animate-slideUp'
            style={{ animationDelay: `${index * 100}ms` }}
            key={index}
            to={`/doctors/${encodeURIComponent(item.speciality)}`}
          >
            <div className='relative'>
              {/* Glow Effect */}
              <div className='absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-0 group-hover:opacity-75 transition duration-500'></div>
              
              {/* Icon Container */}
              <div className='relative w-20 h-20 sm:w-28 sm:h-28 bg-white dark:bg-gray-800 rounded-2xl shadow-lg flex items-center justify-center transform group-hover:scale-110 group-hover:-translate-y-2 transition-all duration-300 border-2 border-gray-100 dark:border-gray-700 group-hover:border-blue-500'>
                <img className='w-12 sm:w-16' src={item.image} alt={item.speciality} />
              </div>
            </div>
            
            {/* Label */}
            <p className='mt-3 font-semibold text-gray-700 dark:text-gray-300 group-hover:text-blue-600 transition-colors text-center max-w-[100px]'>
              {item.speciality}
            </p>
          </Link>
        ))}
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes slideUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out;
        }

        .animate-slideUp {
          animation: slideUp 0.6s ease-out;
          animation-fill-mode: both;
        }

        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }

        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  )
}

export default SpecialityMenu
