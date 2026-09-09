import { createContext, useEffect, useState } from "react";
// import { doctors } from "../assets/assets"; We don't need this now as we are fetching from backend
import axios from "axios";
import { toast } from "react-toastify";

const AppContext = createContext();

const AppContextProvider = ({ children }) => {
    const currSymbol = "$";

    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [doctors, setDoctors] = useState([])

    const value = {
        doctors,
        currSymbol,
    }

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

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}

export default AppContextProvider
export { AppContext }