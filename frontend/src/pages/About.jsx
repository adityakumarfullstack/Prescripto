import { assets } from "../assets/assets"


const About = () => {
    return (
        <main className="about-page py-10 md:py-20">
            <section className="about-section">
                <div className="container">
                    <div className="section-header mb-5">
                        <h2 className="page-title text-3xl text-center md:text-4xl uppercase">About <span className="font-semibold">Us</span></h2>
                    </div>
                    <div className="page-content flex flex-col md:flex-row gap-5">
                        <div className="page-left md:w-1/2">
                            <div className="img-parent">
                                <img src={assets.about_image} alt="About Image" className="w-full mx-auto" />
                            </div>
                        </div>
                        <div className="page-right md:w-1/2">
                            <div className="page-description">
                                <p className="mb-3">Welcome to Prescripto, your trusted partner in managing your healthcare needs conveniently and efficiently. At Prescripto, we understand the challenges individuals face when it comes to scheduling doctor appointments and managing their health records.</p>
                                <p className="mb-3">Prescripto is committed to excellence in healthcare technology. We continuously strive to enhance our platform, integrating the latest advancements to improve user experience and deliver superior service. Whether you're booking your first appointment or managing ongoing care, Prescripto is here to support you every step of the way.</p>
                                <h5 className="font-semibold mb-3">Our Vision</h5>
                                <p>Our vision at Prescripto is to create a seamless healthcare experience for every user. We aim to bridge the gap between patients and healthcare providers, making it easier for you to access the care you need, when you need it.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="why-us-section pt-10">
                <div className="container">
                    <div className="section-header mb-5">
                        <h2 className="page-title text-3xl uppercase">Why <span className="font-semibold">Choose Us</span></h2>
                    </div>
                    <div className="why-us-list flex flex-col md:flex-row gap-0">
                        <div className="why-us-item flex items-center p-5 md:p-10 border border-gray-300 hover:border-primary hover:bg-primary hover:text-white transition ease-in-out duration-400">
                            <div className="why-us-description">
                                <h3 className="font-semibold text-lg mb-2">EFFICIENCY:</h3>
                                <p>Streamlined appointment scheduling that fits into your busy lifestyle.</p>
                            </div>
                        </div>
                        <div className="why-us-item flex items-center p-5 md:p-10 border border-gray-300 hover:border-primary hover:bg-primary hover:text-white transition ease-in-out duration-400">
                            <div className="why-us-description">
                                <h3 className="font-semibold text-lg mb-2">CONVENIENCE:</h3>
                                <p>Access to a network of trusted healthcare professionals in your area.</p>
                            </div>
                        </div>
                        <div className="why-us-item flex items-center p-5 md:p-10 border border-gray-300 hover:border-primary hover:bg-primary hover:text-white transition ease-in-out duration-400">
                            <div className="why-us-description">
                                <h3 className="font-semibold text-lg mb-2">PERSONALIZATION:</h3>
                                <p>Tailored recommendations and reminders to help you stay on top of your health.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default About