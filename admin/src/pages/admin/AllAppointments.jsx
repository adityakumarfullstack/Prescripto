import React from 'react'
import { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'

const AllAppointments = () => {
    const { aToken, allAppointments, getAllAppointments } = useContext(AdminContext);

    useEffect(() => {
        if (aToken) {
            getAllAppointments();
        }
    }, [aToken]);
    return (
        <section className='all-appointments p-5 w-full'>
            <div className="container">
                <div className="page-header">
                    <h2 className="page-title text-xl font-semibold text-center mb-3">All Appointments</h2>
                </div>
                <div className="all-appointments-wrapper">
                    <table className="w-full border border-gray-300 table-auto text-sm">
                        <thead className="bg-primary/10">
                            <tr className="border border-gray-300 text-center">
                                <th className="border border-gray-300 py-3">#</th>
                                <th className="border border-gray-300 py-3">Patient</th>
                                <th className="border border-gray-300 py-3">Date</th>
                                <th className="border border-gray-300 py-3">Time</th>
                                <th className="border border-gray-300 py-3">Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {allAppointments &&
                                allAppointments.map((item, index) => (
                                    <tr
                                        className="border border-gray-300 text-center"
                                        key={item._id}
                                    >
                                        {/* Index */}
                                        <td className="border border-gray-300 py-3">
                                            {index + 1}
                                        </td>

                                        {/* Patient */}
                                        <td className="border border-gray-300 py-3">
                                            <div className="flex items-center justify-center gap-3">
                                                <img
                                                    src={item.userData.image}
                                                    alt="Patient"
                                                    className="w-10 h-10 rounded-full object-cover"
                                                />

                                                <p className="font-semibold">
                                                    {item.userData.name}
                                                </p>
                                            </div>
                                        </td>

                                        {/* Date */}
                                        <td className="border border-gray-300 py-3">
                                            {item.slotDate.replaceAll("_", "/")}
                                        </td>

                                        {/* Time */}
                                        <td className="border border-gray-300 py-3">
                                            {item.slotTime}
                                        </td>

                                        {/* Actions */}
                                        <td className="border border-gray-300 py-3">
                                            {/* Actions will go here */}
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