import DoctorModel from "../models/Doctor.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import AppointmentModel from "../models/Appointment.js"


const changeAvailability = async (req, res) => {
    try {
        const { docId } = req.body;

        const doctorData = await DoctorModel.findById(docId);

        if (!doctorData) {
            return res.status(404).json({
                success: false,
                message: "Doctor not found",
            });
        }

        await DoctorModel.findByIdAndUpdate(docId,{availability: !doctorData.availability});

        return res.status(200).json({
            success: true,
            message: "Availability updated successfully",
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            message: `Error: ${error.message}`,
        });
    }
};

const doctorList = async (req, res) => {
    try {
        const doctors = await DoctorModel.find({}).select(["-password",'-email']) //select all fields except password and email
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

//API to Doctor Login
const loginDoctor=async(req,res)=>{
    try {
        const { email, password } = req.body
        const doctor = await DoctorModel.findOne({email})
        if(!doctor){
            return res.status(404).json({
                success: false,
                message: "Doctor not found",
            })
        }
        const isMatch = await bcrypt.compare(password, doctor.password)
        if(isMatch){
            const token = jwt.sign({ id: doctor._id }, process.env.JWT_SECRET)
            return res.status(200).json({
                success: true,
                message: "Doctor logged in successfully",
                token,
            })
        } else {
            return res.status(400).json({
                success: false,
                message: "Invalid email or password",
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

//API to get doctor appointments data for Doctot Panel
const getDoctorAppointments = async (req, res) => {
    try {
        const { doctorId } = req;
        const appointments = await AppointmentModel.find({doctorId}).select("-password") //select all fields except password
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

//API to mark appointment as completed
const markCompleted = async (req, res) => {
    try {
        const {doctorId} = req
        const { appointmentId } = req.body;
        const appointment = await AppointmentModel.findById(appointmentId);
        if (appointment && appointment.doctorId === doctorId) {
            await AppointmentModel.findByIdAndUpdate(appointmentId, { isCompleted: true });
            return res.status(200).json({
                success: true,
                message: "Appointment completed",
            });
        } else {
            return res.status(401).json({
                success: false,
                message: "You are not authorized to mark this appointment as completed",
            });
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `Error: ${error.message}`,
        });
    }
};

//API to cancel an appointment
const cancelAppointment = async (req, res) => {
    try {
        const {doctorId} = req
        const { appointmentId } = req.body;
        const appointment = await AppointmentModel.findById(appointmentId);
        if (appointment && appointment.doctorId === doctorId) {
            await AppointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true });
            return res.status(200).json({
                success: true,
                message: "Appointment cancelled",
            });
        } else {
            return res.status(401).json({
                success: false,
                message: "You are not authorized to cancel this appointment",
            });
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `Error: ${error.message}`,
        });
    }
};

//API to get dashboard data for doctor panel
const getDoctorDashboardData = async (req, res) => {
    try {
        const {doctorId} = req
        const appointments = await AppointmentModel.find({doctorId});
        
        let totalEarnings = 0;
        appointments.map((appointment) => {
            if (appointment.isCompleted || appointment.payment) {
                totalEarnings += appointment.amount;
            }
        })

        let patients = [];
        appointments.map((appointment) => {
            if (!patients.includes(appointment.userId)) {
                patients.push(appointment.userId);
            }
        })

        const dashData={
            totalAppointments: appointments.length,
            totalPatients: patients.length,
            totalEarnings,
            latestAppointments: appointments.reverse().slice(0, 5),
        }
        return res.status(200).json({
            success: true,
            message: "Dashboard data fetched successfully",
            dashData,
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `Error: ${error.message}`,
        });
    }
}

//API to get doctor profile data
const getDoctorProfile = async (req, res) => {
    try {
        const {doctorId} = req
        const doctorData = await DoctorModel.findById(doctorId).select("-password")
        return res.status(200).json({
            success: true,
            message: "Doctor profile data fetched successfully",
            doctorData,
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `Error: ${error.message}`,
        });
    }
}

//API to update doctor profile
const updateDoctorProfile = async (req, res) => {
    try {
        const {doctorId} = req
        const {availability, address, fees} = req.body
        await DoctorModel.findByIdAndUpdate(doctorId, {availability, address, fees})
        return res.status(200).json({
            success: true,
            message: "Doctor profile updated successfully",
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `Error: ${error.message}`,
        });
    }
}

export {changeAvailability,doctorList, loginDoctor, getDoctorAppointments, markCompleted, cancelAppointment, getDoctorDashboardData, getDoctorProfile, updateDoctorProfile}