import { createContext } from "react";

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
    const currencySymbol = "$";

    const formatDate = (dateString) => {
        const [day, month, year] = dateString.split("_");
        const date = new Date(year, month - 1, day);

        return date.toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric"
        });
    }

    const calculateAge = (dateString) => {
        const today = new Date();
        const birthDate = new Date(dateString);
        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    }

    const value = { currencySymbol, formatDate, calculateAge };
    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;