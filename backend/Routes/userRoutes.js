import express from 'express'
import { registerUser } from '../controllers/userControler.js'
import { loginUser } from '../controllers/userControler.js'
import { getUserProfile } from '../controllers/userControler.js'
import { updateProfile } from '../controllers/userControler.js'
import authUser from '../middlewares/authUser.js'
import upload from '../middlewares/Multer.js'

const userRouter = express.Router()

userRouter.post('/register',registerUser)
userRouter.post('/login',loginUser)
userRouter.get('/getProfile',authUser,getUserProfile)
userRouter.post('/updateProfile',upload.single('image'), authUser,updateProfile)


export default userRouter