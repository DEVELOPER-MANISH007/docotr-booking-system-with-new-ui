import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import MyAppointments from './pages/MyAppointment' 
import Doctor from './pages/Doctor'
import About from './pages/About'
import Contact from './pages/Contact'
import MyProfile from './pages/MyProfile'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Appointments from './pages/Appointments'
import { ToastContainer } from 'react-toastify'



export const App = () => {
  return (
 <div className='mx-4 sm:mx-[10%]'>
  <ToastContainer/>
  <Navbar />


  
  <Routes>
  
    <Route path='/' element={<Home />} />
    <Route path='/login' element={<Login />} />
    <Route path='/my-appointments' element={<MyAppointments />} />
    <Route path='/doctors' element={<Doctor />} />
    <Route path='/doctors/:speciality' element={<Doctor />} />
    <Route path='/about' element={<About />} />
    <Route path='/contact' element={<Contact />} />
    <Route path='/profile' element={<MyProfile />} />
    <Route path='/appointment/:docId' element={<Appointments />} />
    
  

  </Routes>
  <Footer/>
 </div>
  )
}

export default App