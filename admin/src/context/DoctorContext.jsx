import { createContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const DoctorContext = createContext();

const DoctorContextProvider = ({ children }) => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [doctorToken, setDoctorToken] = useState(localStorage.getItem('doctorToken') || '');
    const [appointments, setAppointments] = useState([]);
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

    const value = {
        backendUrl,
        doctorToken,
        setDoctorToken,
        appointments,
        setAppointments,
        getAppointments
    };
    return <DoctorContext.Provider value={value}>{children}</DoctorContext.Provider>;
};

export default DoctorContextProvider;