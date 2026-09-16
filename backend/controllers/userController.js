//For User Authentication
import validator from "validator";
import bcrypt from "bcrypt";
import UserModel from "../models/User.js";
import jwt from "jsonwebtoken"
import cloudinary from "cloudinary"
import DoctorModel from "../models/Doctor.js";
import AppointmentModel from "../models/Appointment.js";
import Razorpay from "razorpay"


//API to register a new user
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body
        
        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please fill all the fields",
            })
        }

        if (!validator.isEmail(email)) {
            return res.status(400).json({
                success: false,
                message: "Invalid email",
            })
        }

        if (password.length < 8) {
            return res.status(400).json({
                success: false,
                message: "Password must be at least 8 characters",
            })
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const user = {
            name,
            email,
            password: hashedPassword,
        }

        const newUser = new UserModel(user)
        await newUser.save()

        const UserToken = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET)
        res.status(201).json({
            success: true,
            message: "User registered successfully",
            UserToken,
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: `Error: ${error.message}`,
        })
    }
}

//API for User Login
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body

        // if (!email || !password) {
        //     return res.status(400).json({
        //         success: false,
        //         message: "Please fill all the fields",
        //     })
        // }

        // if (!validator.isEmail(email)) {
        //     return res.status(400).json({
        //         success: false,
        //         message: "Invalid email",
        //     })
        // }

        const user = await UserModel.findOne({ email })

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            })
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid password",
            })
        } else {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
            res.status(200).json({
                success: true,
                message: "User logged in successfully",
                token,
            })
        }
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: `Error: ${error.message}`,
        })
    }
}

//API to get user profile data
const getProfile = async (req, res) => {
    try {
        const { userId } = req;

        const userData = await UserModel
            .findById(userId)
            .select("-password");

        return res.status(200).json({
            success: true,
            message: "User profile data fetched successfully",
            user: userData
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            message: `Error: ${error.message}`,
        });
    }
};

// API to update user profile data
const updateProfile = async (req, rezs) => {
    try {
        const { name, phone, address, dob, gender } = req.body;
        const userId = req.userId;
        const imageFile = req.file;

        if (!name || !phone || !address || !dob || !gender) {
            return res.status(400).json({
                success: false,
                message: "Data missing",
            });
        }

        const updateData = {
            name,
            phone,
            address: JSON.parse(address),
            dob,
            gender,
        };

        // Upload new profile image if provided
        if (imageFile) {
            const imageUpload = await cloudinary.uploader.upload(
                imageFile.path
            );

            updateData.image = imageUpload.secure_url;
        }

        await UserModel.findByIdAndUpdate(
            userId,
            updateData
        );

        return res.status(200).json({
            success: true,
            message: "User profile data updated successfully",
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            message: `Error: ${error.message}`,
        });
    }
};

//API to book an appointment
const bookAppointment = async (req, res) => {
    try {
        const { doctorId, slotDate, slotTime } = req.body;

        const userId = req.userId;

        // Get doctor data
        const doctorData = await DoctorModel
            .findById(doctorId)
            .select("-password");

        if (!doctorData) {
            return res.status(404).json({
                success: false,
                message: "Doctor not found",
            });
        }

        // Get user data
        const userData = await UserModel
            .findById(userId)
            .select("-password");

        if (!userData) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        // Get booked slots
        let slots_booked = doctorData.slots_booked;

        // Check if slot is already booked
        if (slots_booked[slotDate]) {

            if (slots_booked[slotDate].includes(slotTime)) {
                return res.status(400).json({
                    success: false,
                    message: "Slot already booked",
                });
            }

            slots_booked[slotDate].push(slotTime);

        } else {
            slots_booked[slotDate] = [slotTime];
        }

        // Convert doctor document to plain object
        const doctorDataObj = doctorData.toObject();

        delete doctorDataObj.slots_booked;

        // Appointment data
        const appointmentData = {
            userId,
            doctorId,
            doctorData: doctorDataObj,
            userData,
            amount: doctorData.fees,
            slotDate,
            slotTime,
            bookingDate: Date.now(),
        };

        // Create appointment
        const newAppointment = new AppointmentModel(
            appointmentData
        );

        await newAppointment.save();

        // Update doctor's booked slots
        await DoctorModel.findByIdAndUpdate(
            doctorId,
            { slots_booked }
        );

        return res.status(200).json({
            success: true,
            message: "Appointment booked successfully",
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            message: `Error: ${error.message}`,
        });
    }
};

//API to get all appointments of a user
const getAllAppointments = async (req, res) => {
    try {
        const userId = req.userId;

        const appointments = await AppointmentModel.find({
            userId
        });

        return res.status(200).json({
            success: true,
            message: "Appointments fetched successfully",
            appointments,
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            message: `Error: ${error.message}`,
        });
    }
};

//API to cancel an appointment
const cancelAppointment = async (req, res) => {
    try {
        const userId = req.userId;
        const { appointmentId } = req.body;

        const appointmentData = await AppointmentModel.findById(appointmentId);

        //Verify user
        if (appointmentData.userId !== userId) {
            return res.status(401).json({
                success: false,
                message: "You are not authorized to cancel this appointment",
            });
        }

        await AppointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true });
        
        // Update doctor's booked slots
        const { doctorId, slotDate, slotTime } = appointmentData;

        const doctorData = await DoctorModel
            .findById(doctorId);
        
        let slots_booked = doctorData.slots_booked;

        slots_booked[slotDate] = slots_booked[slotDate].filter(slot => slot !== slotTime);

        await DoctorModel.findByIdAndUpdate(
            doctorId,
            { slots_booked }
        );

        return res.status(200).json({
            success: true,
            message: "Appointment cancelled successfully",
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: `Error: ${error.message}`,
        });
    }
}

//API to make a payment for an appointment
const razorpayInstance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
})

const paymentRazorpay = async (req, res) => {
    try {
        const { appointmentId } = req.body;
    
        const appointmentData = await AppointmentModel.findById(appointmentId);

        if(!appointmentData || appointmentData.cancelled) {
            return res.status(400).json({
                success: false,
                message: "Appointment cancelled or not found",
            });
        }

        //Creating options for razorpay payment
        const options = {
            amount: appointmentData.amount*100,
            currency: process.env.RAZORPAY_CURRENCY,
            receipt: appointmentId,
        }

        //Creating order
        const order = await razorpayInstance.orders.create(options);

        return res.status(200).json({
            success: true,
            message: "Order created successfully",
            order,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: `Error: ${error.message}`,
        });
    }
}

//Verify razorpay payment
const verifyRazorpayPayment = async (req, res) => {
    try {
        const { razorpay_order_id } = req.body;

        const orderInfo= await razorpayInstance.orders.fetch(razorpay_order_id);

        //console.log(orderInfo);
        if (orderInfo.status === 'paid') {
            await AppointmentModel.findByIdAndUpdate(orderInfo.receipt, { payment: true });
            return res.status(200).json({
                success: true,
                message: "Payment successful",
            });
        } else {
            return res.status(400).json({
                success: false,
                message: "Payment failed",
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: `Error: ${error.message}`,
        });
    }
}

export { registerUser, loginUser, getProfile, updateProfile, bookAppointment, getAllAppointments, cancelAppointment, paymentRazorpay,verifyRazorpayPayment }