import React, { useContext } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { useEffect } from 'react';
import { AppContext } from '../../context/AppContext';

const DoctorAppointments = () => {
    const { doctorToken, appointments, getAppointments } = useContext(DoctorContext);
    const { calculateAge, formatDate, currencySymbol } = useContext(AppContext);

    useEffect(() => {
        if (doctorToken) {
            getAppointments();
        }
    }, [doctorToken]);

    return (
        <section className='doctor-appointments p-5 min-w-0 w-full shrink'>
            <div className="container">
                <div className="page-header">
                    <h2 className="page-title text-xl font-semibold text-center mb-3">Your Appointments</h2>
                </div>
                <div className="appointments-list-wrapper">
                    <div className="appointments-list-table overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200 text-center">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th scope="col" className="text-gray-600 font-medium">
                                        #
                                    </th>
                                    <th scope="col" className="text-gray-600 font-medium">
                                        Patient
                                    </th>
                                    <th scope="col" className="text-gray-600 font-medium">
                                        Payment
                                    </th>
                                    <th scope="col" className="text-gray-600 font-medium">
                                        Age
                                    </th>
                                    <th scope="col" className="text-gray-600 font-medium">
                                        Date & Time
                                    </th>
                                    <th scope="col" className="text-gray-600 font-medium">
                                        Fees
                                    </th>
                                    <th scope="col" className="text-gray-600 font-medium">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {appointments.map((appointment, index) => (
                                    <tr key={index} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">{index + 1}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900 flex items-center gap-2">
                                                {appointment.userData.image ? <img src={appointment.userData.image} className="w-10 h-10 rounded-full" alt="user_image" /> : null}
                                                <p>{appointment.userData.name}</p>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900 px-2 py-1 border-1 border-gray-300 rounded-full">
                                                <p>{appointment.payment ? "Online" : "Cash"}</p>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">{calculateAge(appointment.userData.dob)}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">{formatDate(appointment.slotDate)}, {appointment.slotTime}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">{currencySymbol}{appointment.amount}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900 flex items-center gap-2">
                                                <button className='cursor-pointer text-green-600  text-xl bg-green-600/5 rounded-full h-8 w-8 flex items-center justify-center hover:bg-green-600/90 hover:text-white transition ease-in-out duration-200 mx-auto' onClick={() => adminCancelAppointment(item._id)}><span className='-mt-1'>&#x2713;</span></button>
                                                <button className='cursor-pointer text-red-600  text-xl bg-red-600/5 rounded-full h-8 w-8 flex items-center justify-center hover:bg-red-600/90 hover:text-white transition ease-in-out duration-200 mx-auto' onClick={() => adminCancelAppointment(item._id)}><span className='-mt-1'>&times;</span></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <pre>
                            {
                                JSON.stringify(appointments, null, 2)
                            }
                        </pre>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default DoctorAppointments