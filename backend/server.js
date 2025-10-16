import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import adminRouter from './Routes/adminRoutes.js'
import doctorRouter from './Routes/doctorsRooutes.js'
import userRouter from './Routes/userRoutes.js'

dotenv.config()

//app config

const app = express()
const port = process.env.PORT || 4000



//Middlewares
app.use(express.json())
app.use(cors())
connectDB()
connectCloudinary()


//api endpoints

app.get('/',(req,res)=>{
    res.send('API is running')
})

app.use('/api/admin',adminRouter)
app.use('/api/doctor',doctorRouter)
app.use('/api/user',userRouter)




//listen
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
})