import validator from "validator"
import bcrypt from "bcrypt"
import { v2 as cloudinary } from 'cloudinary'
import DoctorModel from "../models/Doctor.js"
import jwt from "jsonwebtoken"
import AppointmentModel from "../models/Appointment.js"
import UserModel from "../models/User.js"


//API for Adding Doctors

const addDoctor = async (req, res) => {
    try {
        const {
            doctorName,
            doctorEmail,
            doctorPassword,
            doctorExperience,
            doctorSpeciality,
            doctorQualification,
            doctorFee,
            doctorAddress,
            doctorAbout
        } = req.body;

        const imageFile = req.file;

        //validation
        if (
            !doctorName ||
            !doctorEmail ||
            !doctorPassword ||
            !doctorExperience ||
            !doctorSpeciality ||
            !doctorQualification ||
            !doctorFee ||
            !doctorAddress ||
            !doctorAbout ||
            !imageFile
        ) {
            return res.status(400).json({
                success: false,
                message: "Please fill all the fields",
            });
        }

        //validate email
        if (!validator.isEmail(doctorEmail)) {
            return res.status(400).json({
                success: false,
                message: "Please enter a valid email",
            });
        }

        //validate strong password
        if (doctorPassword.length < 8) {
            return res.status(400).json({
                success: false,
                message: "Password must be at least 8 characters",
            });
        }

        //hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(doctorPassword, salt);

        //upload image on cloudinary
        const uploadImage = await cloudinary.uploader.upload(
            imageFile.path,
            { resource_type: "image" }
        );
        const imageUrl = uploadImage.secure_url;

        //create doctor
        const doctorData = {
            name: doctorName,
            email: doctorEmail,
            password: hashedPassword,
            speciality: doctorSpeciality,
            degree: doctorQualification,
            experience: doctorExperience,
            about: doctorAbout,
            fees: doctorFee,
            address: JSON.parse(doctorAddress),
            image: imageUrl,
            date: Date.now(),
        };

        const newDoctor = new DoctorModel(doctorData);

        await newDoctor.save();

        return res.status(201).json({
            success: true,
            message: "Doctor added successfully",
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            message: `Error: ${error.message}`,
        });
    }
};

//API for Admin Login
const loginAdmin=(req,res)=>{
    try {
        const {email,password}=req.body
        if(email === process.env.ADMIN_EMAIL || password === process.env.ADMIN_PASSWORD){
            const token = jwt.sign(email + password, process.env.JWT_SECRET)
            return res.status(200).json({
                success: true,
                message: "Admin logged in successfully",
                token,
            })
        } else {
            return res.status(400).json({
                success: false,
                message: "Invalid email or password",
            })
        }
        
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `Error: ${error.message}`,
        })
    }
}

//API to get all doctors for admin
const allDoctors=async(req,res)=>{
    try {
        const doctors=await DoctorModel.find({}).select("-password") //select all fields except password
        return res.status(200).json({
            success: true,
            message: "Doctors fetched successfully",
            doctors,
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `Error: ${error.message}`,
        })
    }
}

//API to get all appointments for admin
const appointmentsAdmin=async(req,res)=>{
    try {
        const appointments=await AppointmentModel.find({}).select("-password") //select all fields except password
        return res.status(200).json({
            success: true,
            message: "Appointments fetched successfully",
            appointments,
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `Error: ${error.message}`,
        })
    }
}

//API to cancel an appointment
const adminCancelAppointment = async (req, res) => {
    try {
        const { appointmentId } = req.body;

        const appointmentData = await AppointmentModel.findById(appointmentId);

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

//API to get dashboard stats for admin panel
const dashboardStats=async(req,res)=>{
    try {
        const doctors=await DoctorModel.find({}).select("-password") //select all fields except password
        const appointments=await AppointmentModel.find({}).select("-password") //select all fields except password
        const users = await UserModel.find({}).select("-password") //select all fields except password
        
        const dashData={
            totalDoctors: doctors.length,
            totalAppointments: appointments.length,
            totalPatients: users.length,
            latestAppointments: appointments.reverse().slice(0, 5),
        }

        return res.status(200).json({
            success: true,
            message: "Dashboard stats fetched successfully",
            dashData,
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `Error: ${error.message}`,
        })
    }
}


export {addDoctor, loginAdmin, allDoctors, appointmentsAdmin,adminCancelAppointment, dashboardStats}