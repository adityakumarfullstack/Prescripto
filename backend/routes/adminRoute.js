import express from 'express'
import { addDoctor,loginAdmin,allDoctors,appointmentsAdmin, adminCancelAppointment } from '../controllers/adminController.js'
import { upload } from '../middleware/multerMiddleware.js'
import authAdmin from '../middleware/authAdminMiddleware.js'
import { changeAvailability } from '../controllers/doctorController.js'

const adminRouter = express.Router()

adminRouter.post('/add-doctor',authAdmin, upload.single('doctorImage'), addDoctor)

adminRouter.post('/login', loginAdmin)

adminRouter.get('/all-doctors', authAdmin, allDoctors)

adminRouter.post('/change-availability', authAdmin, changeAvailability)

adminRouter.get('/all-appointments', authAdmin, appointmentsAdmin)

adminRouter.post('/cancel-appointment', authAdmin, adminCancelAppointment)

export default adminRouter