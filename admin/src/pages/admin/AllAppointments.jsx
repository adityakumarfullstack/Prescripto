import React from 'react'
import { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { AppContext } from '../../context/AppContext'

const AllAppointments = () => {
    const { aToken, allAppointments, getAllAppointments, adminCancelAppointment } = useContext(AdminContext);

    const { currencySymbol, formatDate, calculateAge } = useContext(AppContext);

    useEffect(() => {
        if (aToken) {
            getAllAppointments();
        }
    }, [aToken]);
    return (
        <section className="all-appointments min-w-0 w-full shrink p-5">
            <div className="container">
                <div className="page-header">
                    <h2 className="page-title text-xl font-semibold text-center mb-3">All Appointments</h2>
                </div>
                <div className="all-appointments-wrapper overflow-x-auto">
                    <table className="w-full border border-gray-300 table-auto text-sm">
                        <thead className="bg-primary/10">
                            <tr className="border border-gray-300 text-center">
                                <th className="border border-none py-3">#</th>
                                <th className="border border-none py-3">Patient</th>
                                <th className="border border-none py-3">Age</th>
                                <th className="border border-none py-3">Date & Time</th>
                                <th className="border border-none py-3">Doctor</th>
                                <th className="border border-none py-3">Fees</th>
                                <th className="border border-none py-3">Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {allAppointments &&
                                allAppointments.map((item, index) => (
                                    <tr
                                        className="border border-gray-300 text-center hover:bg-gray-100 transition ease-in-out duration-200"
                                        key={item._id}
                                    >
                                        {/* Index */}
                                        <td className="border border-none py-3">
                                            {index + 1}
                                        </td>

                                        {/* Patient */}
                                        <td className="border border-none py-3">
                                            <div className="flex items-center justify-center gap-3">
                                                <img
                                                    src={item.userData.image}
                                                    alt="Patient"
                                                    className="w-10 h-10 rounded-full object-cover"
                                                />

                                                <p>
                                                    {item.userData.name}
                                                </p>
                                            </div>
                                        </td>

                                        {/* Age */}
                                        <td className="border border-none py-3">
                                            {calculateAge(item.userData.dob)}
                                        </td>

                                        {/* Date & Time */}
                                        <td className="border border-none py-3">
                                            {formatDate(item.slotDate)}, {item.slotTime}
                                        </td>

                                        {/* Doctor */}
                                        <td className="border border-none py-3">
                                            <div className="flex items-center justify-center gap-3">
                                                <img
                                                    src={item.doctorData.image}
                                                    alt="Doctor"
                                                    className="w-10 h-10 rounded-full object-cover bg-gray-200"
                                                />

                                                <p>
                                                    {item.doctorData.name}
                                                </p>
                                            </div>
                                        </td>

                                        {/* Fees */}
                                        <td className="border border-none py-3">
                                            {currencySymbol}{item.amount}
                                        </td>

                                        {/* Actions */}
                                        <td className="border border-none py-3">
                                            {/* Actions will go here */}
                                            {
                                                item.cancelled ? (
                                                    <p className='text-red-600 font-medium'>Cancelled</p>
                                                ) : (
                                                    <div className='cursor-pointer text-red-600  text-xl bg-red-600/5 rounded-full h-8 w-8 flex items-center justify-center hover:bg-red-600/90 hover:text-white transition ease-in-out duration-200 mx-auto' onClick={() => adminCancelAppointment(item._id)}><span className='-mt-1'>&times;</span></div>
                                                )
                                            }
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    )
}

export default AllAppointments