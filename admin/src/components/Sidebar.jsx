import React from 'react'
import { useContext } from 'react'
import { AdminContext } from '../context/AdminContext'
import { NavLink } from 'react-router-dom';
import { assets } from '../assets/assets';
import { DoctorContext } from '../context/DoctorContext';

const Sidebar = () => {
    const { aToken } = useContext(AdminContext);
    const { doctorToken } = useContext(DoctorContext);
    return (
        <aside className="sidebar-wrapper min-h-screen bg-white border-r border-gray-200 p-2 md:min-w-[250px] shrink-0">
            {
                aToken &&
                <div className="sidebar">
                    <div className="sidebar-inner">
                        <ul className="sidebar-menu flex flex-col gap-1 pt-1">
                            <li className="sidebar-item">
                                <NavLink to="/admin-dashboard" className={({ isActive }) => `sidebar-link flex items-center gap-2 py-2 px-3 md:px-8 md:py-3 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''}`}>
                                    <span><img src={assets.home_icon} alt="" /></span>
                                    <span className='hidden md:block'>Dashboard</span>
                                </NavLink>
                            </li>
                            <li className="sidebar-item">
                                <NavLink to="/all-appointments" className={({ isActive }) => `sidebar-link flex items-center gap-2 py-2 px-3 md:px-8 md:py-3 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''}`}>
                                    <span><img src={assets.appointment_icon} alt="" /></span>
                                    <span className='hidden md:block'>Appointments</span>
                                </NavLink>
                            </li>
                            <li className="sidebar-item">
                                <NavLink to="/add-doctor" className={({ isActive }) => `sidebar-link flex items-center gap-2 py-2 px-3 md:px-8 md:py-3 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''}`}>
                                    <span><img src={assets.add_icon} alt="" /></span>
                                    <span className='hidden md:block'>Add Doctor</span>
                                </NavLink>
                            </li>
                            <li className="sidebar-item">
                                <NavLink to="/all-doctors" className={({ isActive }) => `sidebar-link flex items-center gap-2 py-2 px-3 md:px-8 md:py-3 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''}`}>
                                    <span><img src={assets.people_icon} alt="" /></span>
                                    <span className='hidden md:block'>All Doctors</span>
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            }

            {
                doctorToken &&
                <div className="sidebar">
                    <div className="sidebar-inner">
                        <ul className="sidebar-menu flex flex-col gap-1 pt-1">
                            <li className="sidebar-item">
                                <NavLink to="/doctor-dashboard" className={({ isActive }) => `sidebar-link flex items-center gap-2 py-2 px-3 md:px-8 md:py-3 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''}`}>
                                    <span><img src={assets.home_icon} alt="" /></span>
                                    <span className='hidden md:block'>Dashboard</span>
                                </NavLink>
                            </li>
                            <li className="sidebar-item">
                                <NavLink to="/doctor-appointments" className={({ isActive }) => `sidebar-link flex items-center gap-2 py-2 px-3 md:px-8 md:py-3 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''}`}>
                                    <span><img src={assets.appointment_icon} alt="" /></span>
                                    <span className='hidden md:block'>Appointments</span>
                                </NavLink>
                            </li>
                            <li className="sidebar-item">
                                <NavLink to="/doctor-profile" className={({ isActive }) => `sidebar-link flex items-center gap-2 py-2 px-3 md:px-8 md:py-3 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''}`}>
                                    <span><img src={assets.people_icon} alt="" /></span>
                                    <span className='hidden md:block'>Profile</span>
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            }
        </aside >
    )
}

export default Sidebar