import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import RelatedDoctors from "../components/realtedDoctors/RelatedDoctors";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Appointment = () => {
    const { docId } = useParams();
    const { doctors, currSymbol, backendUrl, token, getAllDoctors } = useContext(AppContext);
    const [doctorInfo, setDoctorInfo] = useState(null);
    const [doctorSlots, setDoctorSlots] = useState([]);
    const [slotIndex, setSlotIndex] = useState(0);
    const [slotTime, setSlotTime] = useState('');

    const navigate = useNavigate();

    const weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];


    const fetchDocInfo = () => {
        const docInfo = doctors.find(doc => doc._id === docId)
        setDoctorInfo(docInfo);
        console.log(doctorInfo);
    }

    const getAvailableSlots = () => {

        setDoctorSlots([]);

        const today = new Date();

        const allSlots = [];

        for (let index = 0; index < 7; index++) {

            const timeSlots = [];

            const currentDate = new Date(today);
            currentDate.setDate(
                today.getDate() + index
            );

            const endTime = new Date(currentDate);
            endTime.setHours(21, 0, 0, 0);

            if (index === 0) {

                let currentHour = currentDate.getHours();
                let currentMinutes = currentDate.getMinutes();

                if (currentHour < 10) {

                    currentDate.setHours(10, 0, 0, 0);

                } else if (currentMinutes <= 30) {

                    currentDate.setHours(
                        currentHour,
                        30,
                        0,
                        0
                    );

                } else {

                    currentDate.setHours(
                        currentHour + 1,
                        0,
                        0,
                        0
                    );
                }

            } else {

                currentDate.setHours(10, 0, 0, 0);
            }

            while (currentDate < endTime) {

                const formattedTime =
                    currentDate.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit"
                    });

                const day = currentDate.getDate();
                const month = currentDate.getMonth() + 1;
                const year = currentDate.getFullYear();

                const slotDate =
                    `${day}_${month}_${year}`;

                const bookedSlots =
                    doctorInfo?.slots_booked?.[slotDate] || [];

                const isBooked = bookedSlots.includes(formattedTime);

                timeSlots.push({
                    datetime: new Date(currentDate),
                    time: formattedTime,
                    isBooked
                });

                currentDate.setMinutes(
                    currentDate.getMinutes() + 30
                );
            }

            allSlots.push(timeSlots);
        }


        console.log("Generated Slots:", allSlots);

        setDoctorSlots(allSlots);
    };

    const bookAppointment = async () => {
        if (!token) {
            toast.warn("Please login to book an appointment");
            return navigate('/login');
        }

        if (!doctorInfo?.availability) {
            toast.error("This doctor is currently unavailable");
            return;
        }

        if (!slotTime) {
            toast.warn("Please select a time slot");
            return;
        }

        try {
            const date = doctorSlots[slotIndex][0].datetime;
            let day = date.getDate();
            let month = date.getMonth() + 1;//Months start from 0 to 11 so we have to add 1
            let year = date.getFullYear();

            const slotDate = `${day}_${month}_${year}`;

            const { data } = await axios.post(`${backendUrl}/api/user/book-appointment`, { doctorId: docId, slotDate, slotTime }, { headers: { token: token } });
            if (data.success) {
                toast.success(data.message);
                getAllDoctors();
                navigate('/my-appointments');
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    useEffect(() => {
        fetchDocInfo()
    }, [doctors, docId])

    useEffect(() => {
        if (doctorInfo) {
            getAvailableSlots();
        }
    }, [doctorInfo]);

    useEffect(() => {
        console.log(doctorSlots);
    }, [doctorSlots])


    return (
        <section className="doctor-appointment-page pt-10 md:pt-15">
            {
                doctorInfo ?
                    (
                        <div className="container">
                            <div className="flex flex-col sm:flex-row gap-3 sm:gap-5">
                                <div className="doctor-appointment-left sm:w-1/3">
                                    <div className="img-parent bg-primary rounded-lg">
                                        <img src={doctorInfo.image} alt="Doctor Image" className="mx-auto" />
                                    </div>
                                </div>
                                <div className="doctor-appointment-right sm:w-2/3">
                                    <div className="doctor-info-parent border border-gray-400 rounded-lg p-4 md:p-6">
                                        <div className="doctor-name-parent flex gap-3 items-center mb-2">
                                            <h2 className="doctor-name text-2xl sm:text-3xl font-medium">{doctorInfo.name} </h2>
                                            <div className="icon-parent">
                                                <img src={assets.verified_icon} alt="icon" className="w-5" />
                                            </div>
                                        </div>
                                        <div className="doctor-edu-parent text-gray-600 flex gap-3 items-center">
                                            <p>{doctorInfo.degree} - {doctorInfo.speciality}</p>
                                            <button className="border border-gray-600 rounded-full px-2 py-0.5 text-sm">{doctorInfo.experience}</button>
                                        </div>
                                        <div className="doctor-about-parent">
                                            <h4 className="flex gap-2 items-center mb-1 mt-3 font-medium text-lg">About <span className="icon-parent"><img src={assets.info_icon} alt="icon" className="w-4" /></span></h4>
                                            <p className="text-gray-600">{doctorInfo.about}</p>
                                        </div>
                                        <div className="doctor-fee-parent mt-3">
                                            <p className="text-lg">Appointment Fee : <span>{currSymbol}{doctorInfo.fees}</span></p>
                                        </div>
                                    </div>

                                    <div className="booking-slots-parent">
                                        <h4 className="mb-2 mt-3 font-medium text-lg">Booking Slots</h4>
                                        <div className="booking-slot-items-parent flex gap-3 flex-wrap">
                                            {
                                                doctorSlots.length && doctorSlots.map((item, index) => (
                                                    <div className={`booking-slot-item-day min-w-[60px] text-center text-gray-600 py-4 px-2 rounded-full cursor-pointer border border-gray-600 ${slotIndex === index ? 'bg-primary text-white border-primary' : ''}`} onClick={() => setSlotIndex(index)} key={index}>
                                                        <p className="uppercase">{item[0] && weekday[item[0].datetime.getDay()]}</p>
                                                        <p>{item[0] && item[0].datetime.getDate()}</p>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                        <div className="booking-slot-time-parent flex gap-3 flex-wrap mt-4">
                                            {
                                                doctorSlots.length && doctorSlots[slotIndex].map((item, index) => (
                                                    <div
                                                        className={`px-5 py-1 rounded-full border text-gray-500
                                                            ${item.isBooked
                                                                ? 'bg-gray-200 border-gray-300 text-gray-400 cursor-not-allowed'
                                                                : 'border-gray-400 cursor-pointer hover:border-primary'
                                                            }
                                                            ${item.time === slotTime && !item.isBooked
                                                                ? 'bg-primary border-primary text-white'
                                                                : ''
                                                            }`}
                                                        onClick={() => {
                                                            if (!item.isBooked) {
                                                                setSlotTime(item.time);
                                                            }
                                                        }}
                                                        key={index}
                                                    >
                                                        <p>{item.time}</p>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                        <div className="appointment-btn-parent mt-5">
                                            <button onClick={bookAppointment} className="bg-primary px-6 py-3 rounded-full border border-primary text-white hover:bg-white hover:text-primary transition duration-300 ease-in-out">Book an Appointment</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="related-doctors-wrapper mb-10">
                                <RelatedDoctors doctorId={docId} speciality={doctorInfo.speciality} />
                            </div>
                        </div >
                    )
                    : (
                        <div className="container text-center">
                            <h2>Doctor not found!</h2>
                        </div>
                    )
            }
        </section >
    )
}

export default Appointment