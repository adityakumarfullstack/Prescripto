import { Link } from "react-router-dom"
import { specialityData } from "../../assets/assets"


const Speciality = () => {
    return (
        <div className="speciality text-center pt-10 md:pt-15">
            <div className="section-header mb-8 md:w-1/2 mx-auto">
                <h2 className="title text-3xl font-semibold mb-3">Find By Speciality</h2>
                <p className="description">Simply browse through our extensive list of trusted doctors, schedule your appointment hassle-free.</p>
            </div>
            <div className="speciality-list flex flex-wrap justify-center gap-4 lg:gap-5 w-full">
                {
                    specialityData.map((item, index) => (
                        <div className="speciality-item max-w-[100px] lg:max-w-[120px] hover:translate-y-[-10px] transition ease-in-out duration-400" key={index}>
                            <Link onClick={() => scrollTo(0, 0)} to={`/doctors/${item.speciality}`} className="speciality-link">
                                <img src={item.image} alt={item.speciality} className="speciality-image mb-3" />
                                <p className="speciality-name text-xs">{item.speciality}</p>
                            </Link>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Speciality