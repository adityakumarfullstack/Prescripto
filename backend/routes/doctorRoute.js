import express from 'express'
import { doctorList, loginDoctor, getDoctorAppointments, markCompleted, cancelAppointment,getDoctorDashboardData, getDoctorProfile, updateDoctorProfile } from '../controllers/doctorController.js'
import authDoctor from '../middleware/authDoctorMiddleware.js'

const doctorRouter = express.Router()

doctorRouter.get('/list', doctorList)

doctorRouter.post('/login', loginDoctor)

doctorRouter.get('/get-my-appointments', authDoctor, getDoctorAppointments)

doctorRouter.post('/mark-complete', authDoctor, markCompleted)

doctorRouter.post('/cancel-appointment', authDoctor, cancelAppointment)

doctorRouter.get('/dashboard-data', authDoctor, getDoctorDashboardData)

doctorRouter.get('/get-profile', authDoctor, getDoctorProfile)

doctorRouter.post('/update-profile', authDoctor, updateDoctorProfile)

export default doctorRouter