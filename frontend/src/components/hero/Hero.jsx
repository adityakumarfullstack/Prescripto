import './hero.css'
import { assets } from "../../assets/assets"


const Hero = () => {
    return (
        <div className="hero flex flex-col md:flex-row gap-5 bg-primary rounded-lg px-6 md:px-10 lg:px-20 mt-4 text-white text-center md:text-left">
            <div className="hero-left md:w-1/2 pt-20 pb-0 md:py-20 lg:py-32">
                <div className="hero-title mb-5">
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold">Book Appointment<br /> With Trusted Doctors</h1>
                </div>
                <div className="hero-description-container flex gap-2 flex-col md:flex-row items-center mb-5">
                    <div className="img-parent">
                        <img src={assets.group_profiles} className="md:w-[250px]" alt="group_profiles" />
                    </div>
                    <div className="hero-description">
                        <p className="mb-0">Simply browse through our extensive list of trusted doctors,
                            schedule your appointment hassle-free.</p>
                    </div>
                </div>
                <div className="hero-actions">
                    <a
                        href="#speciality-section"
                        className="btn-book flex items-center gap-2 text-black bg-white py-2 px-4 rounded-full w-max hover:shadow-lg transition ease-in-out duration-200 m-auto md:m-0"
                    >
                        Book Appointment
                        <img src={assets.arrow_icon} className="w-3.5" alt="arrow_icon" />
                    </a>
                </div>
            </div>
            <div className="hero-right md:w-1/2 relative ">
                <div className="hero-image md:absolute md:bottom-0 md:right-0">
                    <img src={assets.header_img} className="w-full" alt="hero_image" />
                </div>
            </div>
        </div>
    )
}

export default Hero