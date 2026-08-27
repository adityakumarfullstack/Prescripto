import { assets } from "../assets/assets"

const Contact = () => {
    return (
        <main className="contact-page py-10 md:py-20">
            <section className="contact-info-section">
                <div className="container">
                    <div className="section-header mb-5">
                        <h2 className="page-title text-3xl text-center md:text-4xl uppercase">Contact <span className="font-semibold">Us</span></h2>
                    </div>
                    <div className="contact-info flex flex-col md:flex-row gap-5">
                        <div className="contact-info-left md:w-1/2">
                            <div className="img-parent">
                                <img src={assets.contact_image} alt="Contact Image" />
                            </div>
                        </div>
                        <div className="contact-info-right text-center md:text-left  md:w-1/2">
                            <div className="contact-info-item mb-3">
                                <h5 className="text-xl font-semibold mb-2">Our Address</h5>
                                <p className="">123 Main Street, City, Country</p>
                            </div>
                            <div className="contact-info-item mb-3">
                                <h5 className="text-xl font-semibold mb-2">Phone Number</h5>
                                <p className="">+1 (123) 456-7890</p>
                            </div>
                            <div className="contact-info-item mb-3">
                                <h5 className="text-xl font-semibold mb-2">Email Address</h5>
                                <p className="">prescripto@example.com</p>
                            </div>
                            <div className="contact-info-item mb-3">
                                <h5 className="text-xl font-semibold mb-2">Opening Hours</h5>
                                <p className="">Monday to Friday: 10:00 AM to 9:00 PM</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default Contact