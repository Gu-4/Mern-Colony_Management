import { Link } from "react-router-dom";

function Footer() {
    return (
        <footer className="main-footer footer-style-one">

            {/* Widgets Section */}
            <div className="widgets-section">
                <div className="auto-container">

                    <div className="row align-items-center">

                        {/* Logo */}
                        <div className="footer-column col-lg-5">
                            <div className="footer-widget about-widget wow fadeInLeft">
                                <div className="footer-logo">
                                    <img src="/assets/images/nlogo2.png" alt="Colony Management System" />
                                </div>
                            </div>
                        </div>

                        <div className="footer-column col-lg-2"></div>

                        {/* Tagline */}
                        <div className="footer-column style-two col-lg-5">
                            <div className="footer-widget subscribe-widget wow fadeInLeft" data-wow-delay="200ms">
                                <div className="h5 text">
                                    Smart & Secure Colony Management System for Modern Communities
                                </div>
                            </div>
                        </div>

                    </div>

                    <hr className="mb-40" />

                    <div className="row">

                        {/* Contact Info */}
                        <div className="footer-column border-0 col-lg-5 col-md-4">
                            <div className="footer-widget about-widget wow fadeInLeft">
                                <div className="widget-content">

                                    <div className="contact-area">
                                        <Link className="phone" to="tel:+911234567890">+91 12345 67890</Link>
                                        <Link className="mail" to="mailto:info@colonyms.com">
                                            info@residex.com
                                        </Link>
                                    </div>

                                    <div className="social-widget mt-30">
                                        <ul className="social-icon-list1 mb-5 mb-lg-0">
                                            <li><Link to="#"><i className="fab fa-facebook-f" /></Link></li>
                                            <li><Link to="#"><i className="fab fa-twitter" /></Link></li>
                                            <li><Link to="#"><i className="fab fa-instagram" /></Link></li>
                                        </ul>
                                    </div>

                                </div>
                            </div>
                        </div>

                        <div className="footer-column border-0 col-xl-2 col-md-1"></div>

                        {/* Links */}
                        <div className="footer-column style-two border-0 col-lg-5 col-md-7">
                            <div className="row d-block d-md-flex">

                                {/* Quick Links */}
                                <div className="footer-widget links-widget col wow fadeInLeft" data-wow-delay="400ms">
                                    <div className="h5 widget-title">Quick Links</div>
                                    <div className="widget-content">
                                        <ul className="user-links">
                                            <li><Link to="/">Home</Link></li>
                                            <li><Link to="/about">About</Link></li>
                                            <li><Link to="/gallery">Gallery</Link></li>
                                            <li><Link to="/contact">Contact</Link></li>
                                        </ul>
                                    </div>
                                </div>

                                {/* Features */}
                                <div className="footer-widget style-two links-widget col wow fadeInLeft" data-wow-delay="400ms">
                                    <div className="h5 widget-title">Key Features</div>
                                    <div className="widget-content">
                                        <ul className="user-links">
                                            <li><Link to="#">Visitor Management</Link></li>
                                            <li><Link to="#">Maintenance Requests</Link></li>
                                            <li><Link to="#">Online Payments</Link></li>
                                            <li><Link to="#">Notice Board</Link></li>
                                            <li><Link to="#">Security System</Link></li>
                                        </ul>
                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>

                    {/* Bottom */}
                    <div className="footer-bottom">
                        <div className="inner-container justify-content-center justify-content-sm-between">
                            <p className="copyright-text">
                                &copy; 2026 Residex. All Rights Reserved.
                            </p>
                            <ul className="d-flex align-items-center gap-3">
                                <li><Link to="#0">Privacy Policy</Link></li>
                                <li><Link to="#0">Terms of Service</Link></li>
                            </ul>
                        </div>
                    </div>

                </div>
            </div>

        </footer>
    )
}
export default Footer;