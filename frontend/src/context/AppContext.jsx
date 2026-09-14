import { createContext, useEffect, useState } from "react";
// import { doctors } from "../assets/assets"; We don't need this now as we are fetching from backend
import axios from "axios";
import { toast } from "react-toastify";

const AppContext = createContext();

const AppContextProvider = ({ children }) => {
    const currSymbol = "$";

    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [doctors, setDoctors] = useState([])
    const [userData, setUserData] = useState(false);

    const getAllDoctors = async () => {
        try {
            const { data } = await axios.get(`${backendUrl}/api/doctor/list`); //Here we don't need aToken as it is a public route
            if (data.success) {
                setDoctors(data.doctors);
                // console.log(data.doctors);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
            // console.log(error);
        }
    }

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        getAllDoctors();
    }, [])

    //UserLogin
    const [token, setToken] = useState('')

    const loadUserProfileData = async () => {
        try {
            const { data } = await axios.get(`${backendUrl}/api/user/get-profile`, { headers: { token: token } });
            if (data.success) {
                setUserData(data.user);
                console.log(data.user);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
            console.log(error);
        }
    }

    useEffect(() => {
        if (token) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            loadUserProfileData();
        } else {
            setUserData(false);
        }
    }, [token])

    const value = {
        doctors,
        getAllDoctors,
        currSymbol,
        token,
        setToken,
        backendUrl,
        userData,
        setUserData,
        loadUserProfileData
    }

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}

export default AppContextProvider
export { AppContext }