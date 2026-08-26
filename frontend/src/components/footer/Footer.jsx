import { assets } from "../../assets/assets"
import { Link } from "react-router-dom"

export const Footer = () => {
    return (
        <footer className="footer pt-10 md:pt-20">
            <div className="container">
                <div className="footer-top md:grid md:grid-cols-[3fr_1fr_1fr] lg:grid-cols-[2fr_1fr_1fr] gap-5">
                    <div className="left">
                        <div className="footer-logo mb-3">
                            <img src={assets.logo} alt="Logo" />
                        </div>
                        <div className="footer-description">
                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                        </div>
                    </div>
                    <div className="center">
                        <div className="footer-title">
                            <h4 className="font-semibold uppercase text-lg mb-2">Company</h4>
                        </div>

                        <div className="footer-menu">
                            <ul>
                                <li>
                                    <Link to="/">Home</Link>
                                </li>
                                <li>
                                    <Link to="/about">About Us</Link>
                                </li>
                                <li>
                                    <Link to="/privacy-policy">Privacy Policy</Link>
                                </li>
                                <li>
                                    <Link to="/contact">Contact</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="right">
                        <div className="footer-title">
                            <h4 className="font-semibold uppercase text-lg mb-2">Get In Touch</h4>
                        </div>

                        <div className="footer-menu">
                            <ul>
                                <li>
                                    <a href="tel:+0000000000">+0-000-000-000</a>
                                </li>
                                <li>
                                    <a href="mailto:prescripto@example.com">
                                        prescripto@example.com
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="footer-bottom mt-5 py-5 border-t border-gray-400">
                    <div className="copyright text-center">
                        <p>Copyright &copy; {new Date().getFullYear()} Prescripto. All rights reserved.</p>
                    </div>
                </div>
            </div>
        </footer>
    )
}
