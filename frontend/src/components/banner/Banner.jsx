import { useNavigate } from "react-router-dom"
import { assets } from "../../assets/assets"

const Banner = () => {
    const navigate = useNavigate();
    return (
        <div className="banner bg-primary text-white flex rounded-lg px-6 md:px-10 lg:px-20">
            <div className="banner-left md:w-2/3 lg:w-3/4 py-10 md:py-15">
                <div className="banner-header mb-5">
                    <h2 className="banner-title text-3xl md:text-4xl lg:text-5xl font-semibold mb-3 leading-[1.6]">Book Appointment <br />With 100+ Trusted Doctors</h2>
                </div>
                <div className="btn-parent">
                    <button className="btn-book flex items-center gap-2 text-black bg-white py-2 px-6 rounded-full w-max hover:shadow-lg transition ease-in-out duration-200" onClick={() => { navigate('/login'); scrollTo(0, 0) }} >Book Now</button>
                </div>
            </div>
            <div className="banner-right md:w-1/3 lg:1/4 relative">
                <div className="banner-image absolute bottom-0 right-0">
                    <img src={assets.appointment_img} alt="banner" />
                </div>
            </div>
        </div>
    )
}

export default Banner