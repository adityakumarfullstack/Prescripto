import React, { useEffect } from 'react'
import { useContext } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { assets } from '../../assets/assets'
import { AppContext } from '../../context/AppContext'

const DoctorDashboard = () => {
    const { doctorToken, getDoctorDashboardData, doctorDashData, completeAppointment, cancelAppointment } = useContext(DoctorContext)
    const { currencySymbol, formatDate } = useContext(AppContext);

    useEffect(() => {
        if (doctorToken) {
            getDoctorDashboardData();
        }
    }, [doctorToken]);
    return getDoctorDashboardData && (
        <section className='doctor-dashboard p-5 min-w-0 w-full shrink'>
            <div className="container">
                <div className="page-header">
                    <h2 className="page-title text-xl font-semibold text-center mb-3">Summary</h2>
                </div>
                <div className="summary-wrapper grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-5">
                    <div className="stat-item bg-white p-3 md:p-5 rounded-lg border border-gray-200 flex items-center gap-3">
                        <div className="icon-parent">
                            <img src={assets.earning_icon} alt="earning_icon" className="stat-item-icon" />
                        </div>
                        <div className="stat-item-content">
                            <p className="stat-item-value text-primary font-semibold text-2xl">{currencySymbol}{doctorDashData.totalEarnings}</p>
                            <p className="stat-item-title text-sm font-semibold text-gray-500">Earnings</p>
                        </div>
                    </div>
                    <div className="stat-item bg-white p-3 md:p-5 rounded-lg border border-gray-200 flex items-center gap-3">
                        <div className="icon-parent">
                            <img src={assets.appointments_icon} alt="appointment_icon" className="stat-item-icon" />
                        </div>
                        <div className="stat-item-content">
                            <p className="stat-item-value text-primary font-semibold text-2xl">{doctorDashData.totalAppointments}</p>
                            <p className="stat-item-title text-sm font-semibold text-gray-500">Appointments</p>
                        </div>
                    </div>
                    <div className="stat-item bg-white p-3 md:p-5 rounded-lg border border-gray-200 flex items-center gap-3">
                        <div className="icon-parent">
                            <img src={assets.patients_icon} alt="patient_icon" className="stat-item-icon" />
                        </div>
                        <div className="stat-item-content">
                            <p className="stat-item-value text-primary font-semibold text-2xl">{doctorDashData.totalPatients}</p>
                            <p className="stat-item-title text-sm font-semibold text-gray-500">Patients</p>
                        </div>
                    </div>
                </div>
                <div className="recent-appointment-wrapper mt-5">
                    <div className="section-header mb-2">
                        <h4 className="title text-lg font-semibold mb-3 flex items-center gap-2 leading-none"><span><img src={assets.list_icon} alt=" list_icon" /></span> Latest Bookings</h4>
                    </div>
                    <div className="appointment-list-wrapper grid gap-3">
                        {
                            doctorDashData.latestAppointments?.map((item, index) => (
                                <div className="appointment-item bg-white border border-gray-200 rounded-lg p-3 flex items-center justify-between gap-3" key={index}>
                                    <div className="img-parent">
                                        <img src={item.userData.image} alt=" doctor_image" className="appointment-item-image rounded-full w-20 h-20 bg-gray-100" />
                                    </div>
                                    <div className="appointment-item-content">
                                        <h4 className="text-md font-semibold">{item.userData.name}</h4>
                                        <p className="text-sm text-gray-500">{formatDate(item.slotDate)}, {item.slotTime}</p>
                                    </div>
                                    <div className="appointment-item-actions">
                                        {
                                            item.cancelled
                                                ? <p className='text-red-600 font-medium'>Cancelled</p>
                                                : appointment.isCompleted
                                                    ? <p className='text-green-600 font-medium'>Completed</p> :
                                                    <>
                                                        <button className='cursor-pointer text-green-600  text-xl bg-green-600/5 rounded-full h-8 w-8 flex items-center justify-center border-1 border-green-600/30 hover:bg-green-600/20 hover:border-green-600-60 transition ease-in-out duration-300 mx-auto' onClick={() => completeAppointment(appointment._id)}><span className='-mt-1'>&#x2713;</span></button>
                                                        <button className='cursor-pointer text-red-600  text-xl bg-red-600/5 rounded-full h-8 w-8 flex items-center justify-center border-1 border-red-600/30 hover:bg-red-600/20 hover:border-red-600/60 transition ease-in-out duration-300 mx-auto' onClick={() => cancelAppointment(appointment._id)}><span className='-mt-1'>&times;</span></button>
                                                    </>
                                        }
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </section>
    )
}

export default DoctorDashboard