import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { AdminContext } from '../context/AdminContext'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
    const { aToken, setAToken } = useContext(AdminContext);

    const navigate = useNavigate();

    const handleLogout = () => {
        navigate('/');
        aToken && setAToken('');
        aToken && localStorage.removeItem('atoken');
    }
    return (
        <nav className='navbar py-2 border-b border-gray-200 bg-white'>
            <div className="container">
                <div className="nav-inner flex items-center justify-between">
                    <div className="nav-logo flex items-center gap-2 text-sm">
                        <img src={assets.admin_logo} alt="logo" className="w-36 sm:w-40 cursor-pointer" />
                        <p className='font-semibold text-gray-600 border border-gray-600 py-.5 px-2.5 rounded-full'>{aToken ? 'Admin' : 'Doctor'}</p>
                    </div>
                    <div className="actions">
                        <button type="button" onClick={handleLogout} className="btn btn-primary bg-primary text-white py-2 px-4 text-sm font-semibold rounded-full border-blue-600 hover:bg-primary/90 transition ease-in-out duration-200">Logout</button>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar