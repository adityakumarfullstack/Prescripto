import { useContext, useEffect, useState } from "react"
import { AppContext } from "../../context/AppContext"
import { useNavigate } from "react-router-dom";

const RelatedDoctors = ({ doctorId, speciality }) => {
    const { doctors } = useContext(AppContext);
    const [relDoctor, setRelDoctor] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        if (doctors.length > 0 && speciality) {
            const doctorsData = doctors.filter((docItem) => docItem.speciality === speciality && docItem._id !== doctorId)
            setRelDoctor(doctorsData)
        }
    }, [doctorId, speciality, doctors])

    return (
        <section className="related-doctors-section mt-5">
            <div className="container">
                <div className="related-doctors-list grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-3 lg:gap-5 items-center">
                    {
                        relDoctor.slice(0, 4).map((item, index) => (
                            <div className="related-doctors-item text-center border border-gray-300 rounded-lg hover:border-primary hover:translate-y-[-3px] hover:shadow-lg transition ease-in-out duration-400 cursor-pointer" key={index} onClick={() => { navigate(`/appointment/${item._id}`); scrollTo(0, 0) }}>
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
            </div>
        </section>
    )
}

export default RelatedDoctors