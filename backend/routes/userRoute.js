import express from 'express'
import { registerUser, loginUser, getProfile, updateProfile, bookAppointment, getAllAppointments } from '../controllers/userController.js'
import authUser from '../middleware/authUserMiddleware.js'
import { upload } from '../middleware/multerMiddleware.js'

const userRouter = express.Router()

userRouter.post('/register', registerUser)

userRouter.post('/login', loginUser)

userRouter.get('/get-profile', authUser, getProfile)

userRouter.post('/update-profile', upload.single('image'),authUser, updateProfile)

userRouter.post('/book-appointment', authUser, bookAppointment)

userRouter.get('/get-my-appointments', authUser, getAllAppointments)

export default userRouter