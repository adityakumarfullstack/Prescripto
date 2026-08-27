import { useContext, useState } from "react";
import { useParams } from "react-router-dom"
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";



const Doctors = () => {
    const [showFilterMenu, setShowFilterMenu] = useState(false);
    const { speciality } = useParams();
    const { doctors } = useContext(AppContext)
    /* const [filterDoc, setFilterDoc] = useState([]);
    const applyFilterDoc = () => {
        if (speciality) {
            setFilterDoc(doctors.filter((item) => item.speciality === speciality));
        } else {
            setFilterDoc(doctors);
        }
    }

    useEffect(() => {
        applyFilterDoc();
    }, [speciality, doctors]) */

    const navigate = useNavigate();

    // Better Approach
    const filterDoc = speciality
        ? doctors.filter(item => item.speciality === speciality)
        : doctors;

    return (
        <section className="all-doctors-page pt-10 md:pt-15">
            <div className="container">
                <div className="section-header text-center">
                    <h2 className="title text-2xl font-medium mb-3">Browse through the doctors specialist.</h2>
                </div>
                <div className="all-doctors-list-wrapper mt-5 flex flex-col sm:flex-row gap-3 sm:gap-5">
                    <div className="filter-btn-parent w-full sm:hidden">
                        <button className="filter-btn bg-primary text-white py-2 px-8 rounded-md hover:bg-primary/80 transition-all duration-300 ease-in-out" onClick={() => setShowFilterMenu(!showFilterMenu)}>Filter</button>
                    </div>
                    <div className={`all-doctors-list-tabs text-center sm:text-left ${showFilterMenu ? "block" : "hidden"} sm:block`}>
                        <ul className="flex flex-col gap-3 text-gray-600">
                            <li className={`px-2 py-1 sm:px-4 sm:py-2  border border-gray-600 rounded-sm cursor-pointer hover:text-black hover:border-primary hover:bg-primary/10 transition-all duration-300 ease-in-out ${speciality === "General physician" ? "text-black border-primary bg-primary/10" : ""}`} onClick={() => speciality === "General physician" ? navigate('/doctors') : navigate('/doctors/General physician')}>
                                <p>General physician</p>
                            </li>
                            <li className={`px-2 py-1 sm:px-4 sm:py-2  border border-gray-600 rounded-sm cursor-pointer hover:text-black hover:border-primary hover:bg-primary/10 transition-all duration-300 ease-in-out ${speciality === "Gynecologist" ? "text-black border-primary bg-primary/10" : ""}`} onClick={() => speciality === "Gynecologist" ? navigate('/doctors') : navigate('/doctors/Gynecologist')}>
                                <p>Gynecologist</p>
                            </li>
                            <li className={`px-2 py-1 sm:px-4 sm:py-2  border border-gray-600 rounded-sm cursor-pointer hover:text-black hover:border-primary hover:bg-primary/10 transition-all duration-300 ease-in-out ${speciality === "Dermatologist" ? "text-black border-primary bg-primary/10" : ""}`} onClick={() => speciality === "Dermatologist" ? navigate('/doctors') : navigate('/doctors/Dermatologist')}>
                                <p>Dermatologist</p>
                            </li>
                            <li className={`px-2 py-1 sm:px-4 sm:py-2  border border-gray-600 rounded-sm cursor-pointer hover:text-black hover:border-primary hover:bg-primary/10 transition-all duration-300 ease-in-out ${speciality === "Pediatricians" ? "text-black border-primary bg-primary/10" : ""}`} onClick={() => speciality === "Pediatricians" ? navigate('/doctors') : navigate('/doctors/Pediatricians')}>
                                <p>Pediatricians</p>
                            </li>
                            <li className={`px-2 py-1 sm:px-4 sm:py-2  border border-gray-600 rounded-sm cursor-pointer hover:text-black hover:border-primary hover:bg-primary/10 transition-all duration-300 ease-in-out ${speciality === "Neurologist" ? "text-black border-primary bg-primary/10" : ""}`} onClick={() => speciality === "Neurologist" ? navigate('/doctors') : navigate('/doctors/Neurologist')}>
                                <p>Neurologist</p>
                            </li>
                            <li className={`px-2 py-1 sm:px-4 sm:py-2  border border-gray-600 rounded-sm cursor-pointer hover:text-black hover:border-primary hover:bg-primary/10 transition-all duration-300 ease-in-out ${speciality === "Gastroenterologist" ? "text-black border-primary bg-primary/10" : ""}`} onClick={() => speciality === "Gastroenterologis" ? navigate('/doctors') : navigate('/doctors/Gastroenterologist')}>
                                <p>Gastroenterologist</p>
                            </li>
                        </ul>
                    </div>
                    <div className="all-doctors-list grid sm:grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-5">
                        {
                            filterDoc.map((item, index) => (
                                <div className="top-doctors-item border border-gray-300 rounded-lg hover:border-primary hover:translate-y-[-3px] hover:shadow-lg transition ease-in-out duration-400 cursor-pointer text-center" key={index} onClick={() => navigate(`/appointment/${item._id}`)}>
                                    <div className="img-parent mb-4 bg-primary/10">
                                        <img src={item.image} alt="top-doctors" />
                                    </div>
                                    <div className="availability mb-2">
                                        <p className="text-green-600 w-max mx-auto bg-green-600/10 px-3 rounded-full border border-green-600 flex items-center gap-1"><span className="w-2 h-2 inline-block rounded-full bg-green-500"></span> Available</p>
                                    </div>
                                    <div className="top-doctors-name mb-4">
                                        <h4 className="font-medium text-lg">{item.name}</h4>
                                        <p className="text-gray-500">{item.speciality}</p>
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Doctors