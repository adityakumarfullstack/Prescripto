import { createContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const DoctorContext = createContext();

const DoctorContextProvider = ({ children }) => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [doctorToken, setDoctorToken] = useState(localStorage.getItem('doctorToken') || '');
    const [appointments, setAppointments] = useState([]);
    const [doctorDashData, setDoctorDashData] = useState(false);
    const [profileData, setProfileData] = useState(false);

    const getAppointments = async () => {
        try {
            // console.log("doctorToken:", doctorToken);
            const { data } = await axios.get(`${backendUrl}/api/doctor/get-my-appointments`, {
                headers: {
                    doctortoken: doctorToken
                }
            });
            if (data.success) {
                setAppointments(data.appointments.reverse());
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
            // console.log(error);
        }
    }

    const completeAppointment = async (appointmentId) => {
        try {
            const { data } = await axios.post(`${backendUrl}/api/doctor/mark-complete`, { appointmentId }, {
                headers: {
                    doctortoken: doctorToken
                }
            });
            if (data.success) {
                toast.success(data.message);
                getAppointments();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
            console.log(error);
        }
    }

    const cancelAppointment = async (appointmentId) => {
        try {
            const { data } = await axios.post(`${backendUrl}/api/doctor/cancel-appointment`, { appointmentId }, {
                headers: {
                    doctortoken: doctorToken
                }
            });
            if (data.success) {
                toast.success(data.message);
                getAppointments();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
            console.log(error);
        }
    }

    const getDoctorDashboardData = async () => {
        try {
            const { data } = await axios.get(`${backendUrl}/api/doctor/dashboard-data`, {
                headers: {
                    doctortoken: doctorToken
                }
            });
            if (data.success) {
                setDoctorDashData(data.dashData);
                console.log(data.dashData);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
            console.log(error);
        }
    }

    const getProfileData = async () => {
        try {
            const { data } = await axios.get(`${backendUrl}/api/doctor/get-profile`, {
                headers: {
                    doctortoken: doctorToken
                }
            });
            if (data.success) {
                setProfileData(data.doctorData);
                console.log(data.doctorData);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
            console.log(error);
        }
    }

    const value = {
        backendUrl,
        doctorToken,
        setDoctorToken,
        appointments,
        setAppointments,
        getAppointments,
        completeAppointment,
        cancelAppointment,
        getDoctorDashboardData,
        doctorDashData,
        getProfileData,
        profileData,
        setProfileData
    };
    return <DoctorContext.Provider value={value}>{children}</DoctorContext.Provider>;
};

export default DoctorContextProvider;