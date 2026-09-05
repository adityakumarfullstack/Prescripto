import React from 'react'
import { useContext } from 'react'
import { AdminContext } from '../context/AdminContext'
import { NavLink } from 'react-router-dom';
import { assets } from '../assets/assets';

const Sidebar = () => {
    const { aToken } = useContext(AdminContext);
    return (
        <aside className="sidebar-wrapper min-h-screen bg-white border-r border-gray-200 p-2 min-w-[250px]">
            {
                aToken &&
                <div className="sidebar">
                    <div className="sidebar-inner">
                        <ul className="sidebar-menu">
                            <li className="sidebar-item">
                                <NavLink to="/admin-dashboard" className={({ isActive }) => `sidebar-link flex items-center gap-2 py-2 px-5 md:px-8 md:py-3 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''}`}>
                                    <span><img src={assets.home_icon} alt="" /></span>
                                    Dashboard
                                </NavLink>
                            </li>
                            <li className="sidebar-item">
                                <NavLink to="/all-appointments" className={({ isActive }) => `sidebar-link flex items-center gap-2 py-2 px-5 md:px-8 md:py-3 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''}`}>
                                    <span><img src={assets.appointment_icon} alt="" /></span>
                                    Appointments
                                </NavLink>
                            </li>
                            <li className="sidebar-item">
                                <NavLink to="/add-doctor" className={({ isActive }) => `sidebar-link flex items-center gap-2 py-2 px-5 md:px-8 md:py-3 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''}`}>
                                    <span><img src={assets.add_icon} alt="" /></span>
                                    Add Doctor
                                </NavLink>
                            </li>
                            <li className="sidebar-item">
                                <NavLink to="/doctor-list" className={({ isActive }) => `sidebar-link flex items-center gap-2 py-2 px-5 md:px-8 md:py-3 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''}`}>
                                    <span><img src={assets.people_icon} alt="" /></span>
                                    Doctors
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