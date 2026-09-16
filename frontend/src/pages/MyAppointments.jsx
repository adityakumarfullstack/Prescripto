import { useContext } from "react"
import { AppContext } from "../context/AppContext"
import { useState } from "react"
import axios from "axios"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"

const MyAppointments = () => {
    const { backendUrl, token, getAllDoctors } = useContext(AppContext);

    const [appointments, setAppointments] = useState([]);

    const navigate = useNavigate();

    const getAppointments = async () => {
        try {
            const { data } = await axios.get(`${backendUrl}/api/user/get-my-appointments`, { headers: { token: token } });
            if (data.success) {
                setAppointments(data.appointments.reverse());
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
            console.log(error);
        }
    }

    const formatAppointmentDate = (slotDate) => {
        const [day, month, year] = slotDate.split("_");

        const date = new Date(year, month - 1, day);

        return date.toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        });
    };

    const cancelAppointment = async (appointmentId) => {
        try {
            const { data } = await axios.post(`${backendUrl}/api/user/cancel-appointment`, { appointmentId }, { headers: { token: token } });
            if (data.success) {
                toast.success(data.message);
                getAppointments();
                getAllDoctors();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
            console.log(error);
        }
    }

    const initPay = (order) => {
        const options = {
            key: import.meta.env.VITE_RAZORPAY_KEY_ID,
            amount: order.amount,
            currency: order.currency,
            name: "Appointment Payment",
            description: "Appointment Payment",
            order_id: order.id,
            receipt: order.receipt,
            handler: async (response) => {
                try {
                    const { data } = await axios.post(`${backendUrl}/api/user/verify-razorpay-payment`, response, { headers: { token: token } });
                    if (data.success) {
                        toast.success(data.message);
                        getAppointments();
                        navigate("/my-appointments");
                    } else {
                        toast.error(data.message);
                    }
                } catch (error) {
                    toast.error(error.message);
                    console.log(error);
                }
            }
        }

        //Creating razorpay instance
        const rzp = new window.Razorpay(options);
        rzp.open();//Opening razorpay payment modal
    }

    const appointmentRazorpay = async (appointmentId) => {
        try {
            const { data } = await axios.post(`${backendUrl}/api/user/payment-razorpay`, { appointmentId }, { headers: { token: token } });
            if (data.success) {
                initPay(data.order);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
            console.log(error);
        }
    }

    useState(() => {
        if (token) {
            getAppointments();
        }
    }, [token])

    return (
        <main className="my-appointments-page py-10 md:py-20">
            <section className="my-appointments-section">
                <div className="container">
                    <div className="section-header mb-5">
                        <h2 className="page-title text-2xl md:text-3xl text-center md:text-4xl uppercase">My <span className="font-semibold">Appointments</span></h2>
                    </div>
                    <div className="my-appointments-wrapper flex flex-col gap-5">
                        {
                            appointments.map((item, index) => (
                                <div className="my-appointments-item mb-3 flex flex-col md:flex-row gap-3 text-center md:text-left md:gap-5 border border-gray-300 p-3 sm:p-5" key={index}>
                                    <div className="img-parent md:max-w-[250px]">
                                        <img src={item.doctorData.image} alt={item.doctorData.name} className="bg-primary/10 w-full" />
                                    </div>
                                    <div className="my-appointments-details flex-1">
                                        <h4 className="name text-lg font-semibold">{item.doctorData.name}</h4>
                                        <p className="speciality text-sm">{item.doctorData.speciality}</p>
                                        <h5 className="address-title font-medium text-md mt-3">Address</h5>
                                        <p className="address text-sm">{item.doctorData.address.line1}</p>
                                        <p className="address text-sm">{item.doctorData.address.line2}</p>
                                        <p className="mt-3">
                                            <span className="font-medium">Date & Time : </span>
                                            {formatAppointmentDate(item.slotDate)}, {item.slotTime}
                                        </p>
                                    </div>
                                    {
                                        !item.cancelled ? (
                                            <div className="actions-parent flex flex-col gap-3">
                                                {
                                                    item.payment ? (
                                                        <button disabled className="btn-paid bg-green-600/10 text-green-600 border border-green-600 py-2 px-4">Paid</button>

                                                    ) : (
                                                        <button onClick={() => { appointmentRazorpay(item._id) }} className="btn-pay bg-primary text-white border border-primary py-2 px-4 hover:bg-primary/80 hover:shadow-md transition ease-in-out duration-400">Pay Online</button>
                                                    )}
                                                <button onClick={() => { cancelAppointment(item._id) }} className="btn-cancel bg-white text-primary border border-primary py-2 px-4 hover:bg-red-600 hover:border-red-600 hover:text-white transition ease-in-out duration-400">Cancel Appointment</button>
                                            </div>
                                        ) : (
                                            <div className="actions-parent flex flex-col gap-3">
                                                <button className="btn-reschedule bg-red-600 text-white border border-red-600 py-2 px-4 hover:bg-red-600/80 hover:shadow-md transition ease-in-out duration-400">Appointment Cancelled</button>
                                            </div>
                                        )
                                    }

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