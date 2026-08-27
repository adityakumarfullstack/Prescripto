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
    const [showProfileMenu, setShowProfileMenu] = useState(false);

    return (
        <nav className="navbar py-4 border-b border-gray-400 text-sm">
            <div className="container">
                <div className='flex justify-between items-center'>
                    <div className="navbar-brand max-w-[145px] lg:max-w-[200px]">
                        <img src={assets.logo} alt="logo" onClick={() => navigate('/')} />
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
                    <div className="navbar-action flex items-center gap-2 md:gap-5">
                        {
                            token ?
                                <div className="flex items-center gap-3 cursor-pointer relative">
                                    <div className="profile-icon flex items-center gap-2" onClick={() => setShowProfileMenu((prev) => !prev)}>
                                        <img className="w-10 h-10 rounded-full" src={assets.profile_pic} alt="profile picture" />
                                        <img className="w-2.5 h-2.5" src={assets.dropdown_icon} alt="dropdown icon" />
                                    </div>
                                    {showProfileMenu && (
                                        <div className="absolute top-10 right-0 z-10 bg-white border border-gray-200 shadow-md px-4 py-2 rounded-md">
                                            <ul className="font-medium w-max">
                                                <li className="py-1">
                                                    <Link onClick={() => setShowProfileMenu(false)} to="/my-profile" className="hover:text-primary transition-all duration-300">
                                                        My Profile
                                                    </Link>
                                                </li>
                                                <li className="py-1">
                                                    <Link onClick={() => setShowProfileMenu(false)} to="/my-appointments" className="hover:text-primary transition-all duration-300">
                                                        My Appointments
                                                    </Link>
                                                </li>
                                                <li className="py-1">
                                                    <button onClick={() => setToken(false)} className="hover:text-primary transition-all duration-300">Logout</button>
                                                </li>
                                            </ul>
                                        </div>
                                    )}
                                </div>
                                :
                                <button onClick={() => navigate('/login')} className="btn bg-primary text-white py-1.5 px-3 md:py-3 md:px-6 rounded-full md:font-semibold hover:bg-primary/90 transition-all duration-300">Create Account</button>
                        }
                        <div className="menu-icon md:hidden">
                            <img src={assets.menu_icon} alt="open menu icon" onClick={() => setShowMenu(true)} className="w-5 h-5 sm:w-6 sm:h-6" />
                        </div>
                        <div className={`mobile-menu fixed top-0 left-0 w-full h-full bg-white z-50 flex flex-col justify-center items-center gap-10 transition-all duration-300 ${showMenu ? 'translate-x-0' : 'translate-x-full'}`}>
                            <div className="mobile-menu-top flex items-center gap-3">
                                <img src={assets.logo} alt="logo" className="w-40" />
                                <img src={assets.cross_icon} alt="close menu icon" className="w-8 h-8" onClick={() => setShowMenu(false)} />
                            </div>
                            <ul className="mobile-menu-list flex flex-col items-center justify-center gap-5 font-medium uppercase">
                                <li className="py-1">
                                    <NavLink onClick={() => setShowMenu(false)} to="/" className={navLinkStyles}>
                                        Home
                                    </NavLink>
                                </li>

                                <li className="py-1">
                                    <NavLink onClick={() => setShowMenu(false)} to="/doctors" className={navLinkStyles}>
                                        All Doctors
                                    </NavLink>
                                </li>

                                <li className="py-1">
                                    <NavLink onClick={() => setShowMenu(false)} to="/about" className={navLinkStyles}>
                                        About
                                    </NavLink>
                                </li>

                                <li className="py-1">
                                    <NavLink onClick={() => setShowMenu(false)} to="/contact" className={navLinkStyles}>
                                        Contact
                                    </NavLink>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar