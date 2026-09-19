import express from 'express'
import { doctorList, loginDoctor, getDoctorAppointments, markCompleted, cancelAppointment } from '../controllers/doctorController.js'
import authDoctor from '../middleware/authDoctorMiddleware.js'

const doctorRouter = express.Router()

doctorRouter.get('/list', doctorList)

doctorRouter.post('/login', loginDoctor)

doctorRouter.get('/get-my-appointments', authDoctor, getDoctorAppointments)

doctorRouter.post('/mark-completed', authDoctor, markCompleted)

doctorRouter.post('/cancel-appointment', authDoctor, cancelAppointment)

export default doctorRouter