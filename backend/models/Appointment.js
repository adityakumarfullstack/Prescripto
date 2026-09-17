import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    doctorId: {
        type: String,
        required: true,
    },
    slotDate: {
        type: String,
        required: true,
    },
    slotTime: {
        type: String,
        required: true,
    },
    userData: {
        type: Object,
        required: true,
    },
    doctorData: {
        type: Object,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    bookingDate: {
        type: String,
        required: true,
    },
    cancelled: {
        type: Boolean,
        default: false,
    },
    payment: {
        type: Boolean,
        default: false,
    },
    isCompleted: {
        type: Boolean,
        default: false,
    },
});

const AppointmentModel = mongoose.models.Appointment || mongoose.model("Appointment", appointmentSchema);

export default AppointmentModel;