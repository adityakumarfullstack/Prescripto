import express from 'express'
import { registerUser, loginUser, getProfile, updateProfile, bookAppointment, getAllAppointments, cancelAppointment, paymentRazorpay,verifyRazorpayPayment } from '../controllers/userController.js'
import authUser from '../middleware/authUserMiddleware.js'
import { upload } from '../middleware/multerMiddleware.js'

const userRouter = express.Router()

userRouter.post('/register', registerUser)

userRouter.post('/login', loginUser)

userRouter.get('/get-profile', authUser, getProfile)

userRouter.post('/update-profile', upload.single('image'),authUser, updateProfile)

userRouter.post('/book-appointment', authUser, bookAppointment)

userRouter.get('/get-my-appointments', authUser, getAllAppointments)

userRouter.post('/cancel-appointment', authUser, cancelAppointment)

userRouter.post('/payment-razorpay', authUser, paymentRazorpay)

userRouter.post('/verify-razorpay-payment', authUser, verifyRazorpayPayment)

export default userRouter