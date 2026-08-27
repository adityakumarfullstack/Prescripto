import { useState } from "react";
import { assets } from "../assets/assets";

const MyProfile = () => {
    const [userData, setUserData] = useState({
        name: 'Edward Vincent',
        image: assets.profile_pic,
        email: 'example@gmail.com',
        phone: '1234567890',
        address: {
            line1: '37th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        },
        gender: 'male',
        dob: '2000-01-01',
    })
    const [isEdit, setIsEdit] = useState(false)

    return (
        <main className="my-profile-page py-10 md:py-20">
            <section className="my-profile-section max-w-[600px] mx-auto">
                <div className="container">
                    <div className="section-header mb-5">
                        <h2 className="page-title text-3xl text-center md:text-4xl uppercase">My <span className="font-semibold">Profile</span></h2>
                    </div>
                    <div className="my-profile flex flex-col md:flex-row gap-3">
                        <div className="my-profile-left md:w-1/2">
                            <div className="img-parent">
                                <img src={userData.image} alt="Profile Image" />
                            </div>
                        </div>
                        <div className="my-profile-right md:w-1/2">
                            <div className="my-profile-details text-[15px]">
                                <div className="username-parent mb-2">
                                    <h5 className="text-xl font-semibold">Name</h5>
                                    {
                                        isEdit ?
                                            <input type="text" value={userData.name} onChange={(e) => setUserData((prev) => ({ ...prev, name: e.target.value }))} className='py-1 border-none outline-none text-primary  cursor-pointer' />
                                            :
                                            <p className='py-1'>{userData.name}</p>
                                    }
                                </div>
                                <div className="email-parent mb-2">
                                    <h5 className="text-xl font-semibold">Email</h5>
                                    {
                                        isEdit ?
                                            <input type="text" value={userData.email} onChange={(e) => setUserData((prev) => ({ ...prev, email: e.target.value }))} className='py-1 border-none outline-none text-primary  cursor-pointer' />
                                            :
                                            <p className='py-1'>{userData.email}</p>
                                    }
                                </div>
                                <div className="phone-parent mb-2">
                                    <h5 className="text-xl font-semibold">Phone</h5>
                                    {
                                        isEdit ?
                                            <input type="text" value={userData.phone} onChange={(e) => setUserData((prev) => ({ ...prev, phone: e.target.value }))} className='py-1 border-none outline-none text-primary  cursor-pointer' />
                                            :
                                            <p className='py-1'>{userData.phone}</p>
                                    }
                                </div>
                                <div className="address-parent mb-2">
                                    <h5 className="text-xl font-semibold">Address</h5>
                                    {
                                        isEdit ?
                                            <input type="text" value={userData.address.line1} onChange={(e) => setUserData((prev) => ({ ...prev, address: { line1: e.target.value } }))} className='py-1 border-none outline-none text-primary  cursor-pointer' />
                                            :
                                            <p className='py-1'>{userData.address.line1}</p>
                                    }
                                    {
                                        isEdit ?
                                            <input type="text" value={userData.address.line2} onChange={(e) => setUserData((prev) => ({ ...prev, address: { line2: e.target.value } }))} className='py-1 border-none outline-none text-primary  cursor-pointer' />
                                            :
                                            <p className='py-1'>{userData.address.line2}</p>
                                    }
                                </div>
                                <div className="gender-parent mb-2">
                                    <h5 className="text-xl font-semibold">Gender</h5>
                                    {
                                        isEdit ?
                                            <select value={userData.gender} onChange={(e) => setUserData((prev) => ({ ...prev, gender: e.target.value }))} className='py-1 border-none outline-none text-primary  cursor-pointer'>
                                                <option value="male">Male</option>
                                                <option value="female">Female</option>
                                            </select>
                                            :
                                            <p className="capitalize py-1">{userData.gender}</p>
                                    }
                                </div>
                                <div className="dob-parent mb-2">
                                    <h5 className="text-xl font-semibold">Date of Birth</h5>
                                    {
                                        isEdit ?
                                            //Default Date format is YYYY-MM-DD
                                            <input type="date" value={userData.dob} onChange={(e) => setUserData((prev) => ({ ...prev, dob: e.target.value }))} className='py-2 border-none outline-none text-primary  cursor-pointer' />
                                            :
                                            <p className='py-1'>{userData.dob}</p>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="btn-parent mt-4 flex justify-center">
                        {
                            isEdit ?
                                <button className="btn border border-primary text-primary bg-white py-2 px-6 rounded-full hover:bg-primary hover:text-white transition ease-in-out duration-300" onClick={() => setIsEdit(false)}>Save Changes</button>
                                :
                                <button className="btn border border-primary text-primary bg-white py-2 px-6 rounded-full hover:bg-primary hover:text-white transition ease-in-out duration-300" onClick={() => setIsEdit(true)}>Edit Profile</button>
                        }
                    </div>
                </div>
            </section>
        </main>
    )
}

export default MyProfile