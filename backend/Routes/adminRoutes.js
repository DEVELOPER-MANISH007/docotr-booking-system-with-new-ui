import express from 'express'
import { addDoctor,adminLogin } from '../controllers/adminContollers.js'
import upload from '../middlewares/Multer.js'
import authAdmin from '../middlewares/Authadmin.js'
import { allDoctors,appointmentsAdmin,cancelAppointment } from '../controllers/adminContollers.js'
import { changeAvailability } from '../controllers/DoctorsControllers.js'
import { adminDashboard } from '../controllers/adminContollers.js'

const adminRouter = express.Router()

adminRouter.post('/add-doctor',authAdmin,upload.single('image'),addDoctor)
adminRouter.post('/login',adminLogin)
adminRouter.post('/all-doctors',authAdmin,allDoctors)
adminRouter.post('/change-availability',authAdmin,changeAvailability)
adminRouter.post('/appointments',authAdmin,appointmentsAdmin)
adminRouter.post('/cancel-appointment',authAdmin,cancelAppointment)
adminRouter.get('/dashboard',authAdmin,adminDashboard)
export default adminRouter