import express from 'express'
import {  doctorList, loginDoctor } from '../controllers/DoctorsControllers.js'
import authDoctor from '../middlewares/authDoctor.js'
import { appointmentsDoctor, markAppointmentComplete, markAppointmentCancel, doctorDashboard     } from '../controllers/DoctorsControllers.js'
import { doctorProfile, updateDoctorProfile } from '../controllers/DoctorsControllers.js'
const doctorRouter = express.Router()

doctorRouter.get('/list',doctorList)
doctorRouter.post('/login',loginDoctor)
doctorRouter.get('/appointments',authDoctor,appointmentsDoctor)
doctorRouter.post('/complete-appointment',authDoctor,markAppointmentComplete)
doctorRouter.post('/cancel-appointment',authDoctor,markAppointmentCancel)
doctorRouter.post('/dashboard',authDoctor,doctorDashboard)
doctorRouter.get('/profile',authDoctor,doctorProfile)
doctorRouter.post('/update-profile',authDoctor,updateDoctorProfile)
export default doctorRouter
