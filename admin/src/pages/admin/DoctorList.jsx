import React, { useContext } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { useEffect } from 'react'

const DoctorList = () => {
    const { doctors, getAllDoctors, aToken, changeAvailability } = useContext(AdminContext)

    useEffect(() => {
        if (aToken) {
            getAllDoctors();
        }
    }, [aToken])
    return (
        <section className='doctor-list-section p-5 w-full'>
            <div className="container">
                <div className="page-header">
                    <h2 className="page-title text-xl font-semibold text-center mb-3">All Doctors</h2>
                </div>
                <div className="doctor-list-wrapper grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-5">
                    {
                        doctors.map((item, index) => (
                            <div className="doctor-list-item border border-gray-300 rounded-lg hover:border-primary hover:translate-y-[-3px] hover:shadow-lg transition ease-in-out duration-400 cursor-pointer text-center" key={index}>
                                <div className="img-parent mb-4 bg-primary/10">
                                    <img src={item.image} alt="top-doctors" />
                                </div>
                                <div className="availability mb-2">
                                    <p className={`w-max mx-auto px-3 rounded-full border flex items-center gap-1 ${item.availability ? 'bg-green-600/10 border-green-600 text-green-600' : 'bg-red-600/10 border-red-600 text-red-600'}`}>
                                        <input type="checkbox" onChange={() => changeAvailability(item._id)} checked={item.availability} className='accent-green-600' />
                                        {item.availability ? 'Available' : 'Unavailable'}
                                    </p>
                                </div>
                                <div className="top-doctors-name mb-4">
                                    <h4 className="font-medium text-lg">{item.name}</h4>
                                    <p className="text-gray-500">{item.speciality}</p>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </section>
    )
}

export default DoctorList