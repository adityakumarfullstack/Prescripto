import { useState, createContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AdminContext = createContext();

const AdminContextProvider = ({ children }) => {
    const [aToken, setAToken] = useState(localStorage.getItem('atoken') || '');
    const [doctors, setDoctors] = useState([]);
    const [allAppointments, setAllAppointments] = useState([]);

    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const getAllDoctors = async () => {
        try {
            const { data } = await axios.get(`${backendUrl}/api/admin/all-doctors`, { headers: { atoken: aToken } });
            if (data.success) {
                setDoctors(data.doctors);
                console.log(data.doctors);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
            // console.log(error);
        }
    }

    const changeAvailability = async (docId) => {
        try {
            const { data } = await axios.post(`${backendUrl}/api/admin/change-availability`, { docId }, { headers: { atoken: aToken } });
            if (data.success) {
                toast.success(data.message);
                getAllDoctors();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    const getAllAppointments = async () => {
        try {
            const { data } = await axios.get(`${backendUrl}/api/admin/all-appointments`, { headers: { atoken: aToken } });
            if (data.success) {
                setAllAppointments(data.appointments);
                console.log(data.appointments);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
            // console.log(error);
        }
    }

    const value = {
        aToken,
        setAToken,
        backendUrl,
        doctors,
        getAllDoctors,
        changeAvailability,
        allAppointments,
        getAllAppointments
    };

    return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>;
};

export default AdminContextProvider;