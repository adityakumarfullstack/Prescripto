import { useContext } from "react"
import { AppContext } from "../context/AppContext"

const MyAppointments = () => {
    const { doctors } = useContext(AppContext);
    return (
        <main className="my-appointments-page py-10 md:py-20">
            <section className="my-appointments-section">
                <div className="container">
                    <div className="section-header mb-5">
                        <h2 className="page-title text-2xl md:text-3xl text-center md:text-4xl uppercase">My <span className="font-semibold">Appointments</span></h2>
                    </div>
                    <div className="my-appointments-wrapper flex flex-col gap-5">
                        {
                            doctors.slice(0, 3).map((item, index) => (
                                <div className="my-appointments-item mb-3 flex flex-col md:flex-row gap-3 text-center md:text-left md:gap-5 border border-gray-300 p-3 sm:p-5" key={index}>
                                    <div className="img-parent md:max-w-[250px]">
                                        <img src={item.image} alt={item.name} className="bg-primary/10 w-full" />
                                    </div>
                                    <div className="my-appointments-details flex-1">
                                        <h4 className="name text-lg font-semibold">{item.name}</h4>
                                        <p className="speciality text-sm">{item.speciality}</p>
                                        <h5 className="address-title font-medium text-md mt-3">Address</h5>
                                        <p className="address text-sm">{item.address.line1}</p>
                                        <p className="address text-sm">{item.address.line2}</p>
                                        <p className="mt-3"><span className="font-medium">Date & Time :</span>25 Jan 2023, 10:00 AM</p>
                                    </div>
                                    <div className="actions-parent flex flex-col gap-3">
                                        <button className="btn-reschedule bg-primary text-white border border-primary py-2 px-4 hover:bg-primary/80 hover:shadow-md transition ease-in-out duration-400">Pay Online</button>
                                        <button className="btn-cancel bg-white text-primary border border-primary py-2 px-4 hover:bg-red-600 hover:border-red-600 hover:text-white transition ease-in-out duration-400">Cancel Appointment</button>
                                    </div>
                                </div>
                            ))

                        }
                    </div>
                </div>
            </section>
        </main>
    )
}

export default MyAppointments