import { useContext } from "react";
import { useNavigate } from "react-router-dom"
import { AppContext } from "../../context/AppContext";

const TopDoctors = () => {
    const navigate = useNavigate();
    const { doctors } = useContext(AppContext)

    return (
        <div className="top-doctors text-center py-10 md:py-15">
            <div className="section-header mb-5 md:w-1/2 mx-auto">
                <h2 className="title text-3xl font-semibold mb-3">Top Doctors to Book</h2>
                <p className="description">Simply browse through our extensive list of trusted doctors.</p>
            </div>
            <div className="top-doctors-list grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-5 items-center">
                {
                    doctors.slice(0, 8).map((item, index) => (
                        <div className="top-doctors-item border border-gray-300 rounded-lg hover:border-primary hover:translate-y-[-3px] hover:shadow-lg transition ease-in-out duration-400 cursor-pointer" key={index} onClick={() => navigate(`/doctors/${item._id}`)}>
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
                    ))
                }
            </div>
            <div className="btn-parent m-5">
                <button className="btn-view-all bg-primary text-white border border-primary py-2 px-6 rounded-full text-shadow-lg hover:bg-white/10 hover:text-primary transition ease-in-out duration-400" onClick={() => { navigate(`/doctors`); scrollTo(0, 0) }}>View All</button>
            </div>
        </div >
    )
}

export default TopDoctors