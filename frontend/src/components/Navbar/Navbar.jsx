import './navbar.css'
import { assets } from '../../assets/assets'
import { Link, NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

const Navbar = () => {
    const navLinkStyles = ({ isActive }) =>
        `transition-colors ${isActive
            ? "text-primary font-semibold active"
            : "text-gray-700 hover:text-primary"
        }`;

    const navigate = useNavigate();

    const [showMenu, setShowMenu] = useState(false);
    const [token, setToken] = useState(true);

    return (
        <nav className="navbar py-4 border-b border-gray-400 text-sm">
            <div className="container">
                <div className='flex justify-between items-center'>
                    <div className="navbar-brand max-w-[200px]">
                        <img src={assets.logo} alt="logo" />
                    </div>
                    <div className="navbar-menu hidden md:flex">
                        <ul className="flex items-center gap-5 font-medium uppercase">
                            <li className="py-1">
                                <NavLink to="/" className={navLinkStyles}>
                                    Home
                                </NavLink>
                            </li>

                            <li className="py-1">
                                <NavLink to="/doctors" className={navLinkStyles}>
                                    All Doctors
                                </NavLink>
                            </li>

                            <li className="py-1">
                                <NavLink to="/about" className={navLinkStyles}>
                                    About
                                </NavLink>
                            </li>

                            <li className="py-1">
                                <NavLink to="/contact" className={navLinkStyles}>
                                    Contact
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                    <div className="navbar-action flex items-center gap-3">
                        {
                            token ?
                                <div className="flex items-center gap-3 cursor-pointer relative group">
                                    <img className="w-10 h-10 rounded-full" src={assets.profile_pic} alt="profile picture" />
                                    <img className="w-2.5 h-2.5" src={assets.dropdown_icon} alt="dropdown icon" />
                                    <div className="absolute top-10 right-0 bg-white border border-gray-200 shadow-md px-4 py-2 rounded-md hidden group-hover:block">
                                        <ul className="font-medium w-max">
                                            <li className="py-1">
                                                <Link to="/my-profile" className="hover:text-primary transition-all duration-300">
                                                    My Profile
                                                </Link>
                                            </li>
                                            <li className="py-1">
                                                <Link to="/my-appointments" className="hover:text-primary transition-all duration-300">
                                                    My Appointments
                                                </Link>
                                            </li>
                                            <li className="py-1">
                                                <button onClick={() => setToken(false)} className="hover:text-primary transition-all duration-300">Logout</button>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                : <button onClick={() => navigate('/login')} className="btn bg-primary text-white py-3 px-6 rounded-full font-semibold hidden md:block hover:bg-primary/90 transition-all duration-300">Create Account</button>
                        }

                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar