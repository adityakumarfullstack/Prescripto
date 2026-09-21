import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { assets } from '../../assets/assets'
import { AppContext } from '../../context/AppContext'

const Dashboard = () => {
    const { aToken, dashboardStats, getDashboardStats, adminCancelAppointment } = useContext(AdminContext)
    const { formatDate } = useContext(AppContext)

    useEffect(() => {
        if (aToken) {
            getDashboardStats();
        }
    }, [aToken])
    return (
        <section className='dashboard p-5 w-full'>
            <div className="container">
                {
                    !dashboardStats ? (
                        <div className="w-full h-[300px] flex items-center justify-center">
                            <p>Loading...</p>
                        </div>
                    ) : (
                        <>
                            <div className="stats-wrapper grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                                <div className="stat-item bg-white p-3 md:p-5 rounded-lg border border-gray-200 flex items-center gap-3">
                                    <div className="icon-parent">
                                        <img src={assets.doctor_icon} alt="doctor_icon" className="stat-item-icon" />
                                    </div>
                                    <div className="stat-item-content">
                                        <p className="stat-item-value text-primary font-semibold text-2xl">{dashboardStats.totalDoctors}</p>
                                        <p className="stat-item-title text-sm font-semibold text-gray-500">Doctors</p>
                                    </div>
                                </div>
                                <div className="stat-item bg-white p-3 md:p-5 rounded-lg border border-gray-200 flex items-center gap-3">
                                    <div className="icon-parent">
                                        <img src={assets.appointments_icon} alt="appointment_icon" className="stat-item-icon" />
                                    </div>
                                    <div className="stat-item-content">
                                        <p className="stat-item-value text-primary font-semibold text-2xl">{dashboardStats.totalAppointments}</p>
                                        <p className="stat-item-title text-sm font-semibold text-gray-500">Appointments</p>
                                    </div>
                                </div>
                                <div className="stat-item bg-white p-3 md:p-5 rounded-lg border border-gray-200 flex items-center gap-3">
                                    <div className="icon-parent">
                                        <img src={assets.patients_icon} alt="patient_icon" className="stat-item-icon" />
                                    </div>
                                    <div className="stat-item-content">
                                        <p className="stat-item-value text-primary font-semibold text-2xl">{dashboardStats.totalPatients}</p>
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
                                        dashboardStats.latestAppointments.map((item, index) => (
                                            <div className="appointment-item bg-white border border-gray-200 rounded-lg p-3 flex items-center justify-between gap-3" key={index}>
                                                <div className="img-parent">
                                                    <img src={item.doctorData.image} alt=" doctor_image" className="appointment-item-image rounded-full w-20 h-20 bg-gray-100" />
                                                </div>
                                                <div className="appointment-item-content">
                                                    <h4 className="text-md font-semibold">{item.doctorData.name}</h4>
                                                    <p className="text-sm text-gray-500">{formatDate(item.slotDate)}, {item.slotTime}</p>
                                                </div>
                                                <div className="appointment-item-actions">
                                                    {
                                                        item.cancelled ? (
                                                            <p className='text-red-600 font-medium'>Cancelled</p>
                                                        ) : item.isCompleted ? (
                                                            <p className='text-green-600 font-medium'>Completed</p>
                                                        )
                                                            : (
                                                                <div className='cursor-pointer text-red-600  text-xl bg-red-600/5 rounded-full h-8 w-8 flex items-center justify-center hover:bg-red-600/90 hover:text-white transition ease-in-out duration-200 mx-auto' onClick={() => adminCancelAppointment(item._id)}><span className='-mt-1'>&times;</span></div>
                                                            )
                                                    }
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        </>
                    )
                }
            </div>
        </section>
    )
}

export default Dashboard