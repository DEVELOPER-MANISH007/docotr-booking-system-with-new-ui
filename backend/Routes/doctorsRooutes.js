import express from 'express'
import { changeAvailability, doctorList } from '../controllers/DoctorsControllers.js'


const doctorRouter = express.Router()

doctorRouter.get('/list',doctorList)

export default doctorRouter
