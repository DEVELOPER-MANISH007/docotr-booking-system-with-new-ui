import express from 'express'
import { registerUser } from '../controllers/userControler.js'
import { loginUser } from '../controllers/userControler.js'
import { getUserProfile } from '../controllers/userControler.js'
import { updateProfile } from '../controllers/userControler.js'
import authUser from '../middlewares/authUser.js'
import upload from '../middlewares/Multer.js'
import { bookAppointment } from '../controllers/userControler.js'
import { listAppointments } from '../controllers/userControler.js'
import { cancelAppointment } from '../controllers/userControler.js'
import { paymentRazorpay } from '../controllers/userControler.js'
import { verifyRazorpay } from '../controllers/userControler.js'
const userRouter = express.Router()

userRouter.post('/register',registerUser)
userRouter.post('/login',loginUser)
userRouter.get('/getProfile',authUser,getUserProfile)
userRouter.post('/updateProfile',upload.single('image'), authUser,updateProfile)
userRouter.post('/bookAppointment',authUser,bookAppointment)
userRouter.get('/listAppointments',authUser,listAppointments)
userRouter.post('/cancelAppointment',authUser,cancelAppointment)
userRouter.post('/paymentRazorpay',authUser,paymentRazorpay)
userRouter.post('/verifyRazorpay',authUser,verifyRazorpay)
export default userRouter