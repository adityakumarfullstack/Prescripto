import React, { useState, useContext, useEffect } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { AppContext } from '../../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify';

const DoctorProfile = () => {
    const { doctorToken, getProfileData, profileData, setProfileData, backendUrl } = useContext(DoctorContext)
    const { currencySymbol } = useContext(AppContext);
    const [isEdit, setIsEdit] = useState(false);

    const handleEdit = () => {
        setIsEdit(true);
    }

    const handleSave = async () => {

        try {
            const updatedData = {
                address: profileData.address,
                fees: profileData.fees,
                availability: profileData.availability
            }

            const { data } = await axios.post(`${backendUrl}/api/doctor/update-profile`, updatedData, { headers: { doctortoken: doctorToken } });
            if (data.success) {
                toast.success(data.message);
                getProfileData();
                setIsEdit(false);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    useEffect(() => {
        if (doctorToken) {
            getProfileData();
        }
    }, [doctorToken]);

    return profileData && (
        <section className='doctor-profile p-5 min-w-0 w-full shrink'>
            <div className="container">
                <div className="page-header">
                    <h2 className="page-title text-xl font-semibold text-center mb-3">Your Profile</h2>
                </div>
                <div className="profile-wrapper grid grid-cols-1 lg:grid-cols-2 gap-3 md:gap-5">
                    <div className="profile-image bg-primary rounded-lg  flex items-center justify-center gap-3">
                        <div className="img-parent">
                            <img src={profileData.image} alt="profile_image" className="profile-image" />
                        </div>
                    </div>
                    <div className="profile-info bg-white p-3 md:p-5 rounded-lg border border-gray-200 flex items-center flex-col gap-2 text-center lg:text-left">
                        <h2 className="doctor-name font-semibold text-2xl">{profileData.name}</h2>
                        <div className="doctor-info -mt-1">
                            <p className="doctor-speciality text-gray-600 font-medium capitalize mb-1">{profileData.degree} - {profileData.speciality}</p>
                            <p className="doctor-experience text-sm font-medium">Experience: <span className='font-normal'>{profileData.experience}</span></p>
                        </div>
                        <div className="doctor-about">
                            <p className="doctor-about-label text-sm font-semibold">About:</p>
                            <p className="doctor-description text-sm text-gray-600">{profileData.about}</p>
                        </div>
                        <div className="doctor-fee">
                            <p className="doctor-fee-label text-sm font-semibold">Appointment Fee: <span className='font-normal'>{currencySymbol}{isEdit ? <input type="number" value={profileData.fees} onChange={(e) => setProfileData(prev => ({ ...prev, fees: e.target.value }))} /> : profileData.fees}</span></p>
                        </div>
                        <div className="doctor-address lg:flex ">
                            <p className="doctor-address-label text-sm font-semibold">Address:</p>
                            <p className="doctor-address-value text-sm">
                                {isEdit ? <input type="text" value={profileData.address.line1} onChange={(e) => setProfileData(prev => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))} /> : profileData.address.line1}
                                <br />
                                {isEdit ? <input type="text" value={profileData.address.line2} onChange={(e) => setProfileData(prev => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))} /> : profileData.address.line2}
                            </p>
                        </div>
                        <div className="doctor-availability flex items-center justify-center lg:justify-start gap-2 leading-1 mt-1 text-sm">
                            <input checked={profileData.availability} disabled={!isEdit} type="checkbox" onChange={() => isEdit && setProfileData(prev => ({ ...prev, availability: !prev.availability }))} id="" />
                            <label htmlFor="">Available</label>
                        </div>
                        <div className="doctor-edit flex items-center justify-center lg:justify-start leading-1 mt-3 ">
                            {
                                isEdit ?
                                    <button type="button" className="btn btn-primary bg-primary text-white py-2 px-4 text-sm font-semibold rounded-full border-blue-600 hover:bg-primary/90 transition ease-in-out duration-200" onClick={handleSave}>Save</button>
                                    :
                                    <button type="button" className="btn btn-primary bg-primary text-white py-2 px-4 text-sm font-semibold rounded-full border-blue-600 hover:bg-primary/90 transition ease-in-out duration-200" onClick={handleEdit}>Edit</button>

                            }
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default DoctorProfile