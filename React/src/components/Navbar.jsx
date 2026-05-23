import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(prev => !prev);
    };

    // Add/remove class on body to trigger CSS transitions
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.classList.add("mobile-menu-visible");
        } else {
            document.body.classList.remove("mobile-menu-visible");
        }
        return () => document.body.classList.remove("mobile-menu-visible");
    }, [isMobileMenuOpen]);

    return (
        <header className="main-header header-style-two">
            <div className="header-lower">
                <div className="inner-container">
                    <div className="main-box">
                        <div className="left-box">
                            <div className="logo-box">
                                {/* logo.one = hidden on mobile, logo.two = shown on mobile */}
                                <div className="logo one">
                                    <Link to="/"><img src="/assets/images/nlogo2.png" alt="Logo" /></Link>
                                </div>
                                <div className="logo two">
                                    <Link to="/"><img src="/assets/images/nlogo2.png" alt="Logo" /></Link>
                                </div>
                            </div>
                            <div className="nav-outer justify-content-center">
                                <nav className="nav main-menu">
                                    <ul className="navigation">
                                        <li><Link to="/">Home</Link></li>
                                        <li><Link to="/about">About</Link></li>
                                        <li><Link to="/gallery">Gallery</Link></li>
                                        <li><Link to="/contact">Contact Us</Link></li>
                                    </ul>
                                </nav>
                            </div>
                        </div>

                        <div className="right-box">
                            <Link className="theme-btn btn-style-four" to="/login">
                                <span className="icon">
                                    <i className="fa-solid fa-arrow-right" />
                                    <i className="fa-solid fa-arrow-right" />
                                </span>
                                <span className="btn-title">Login</span>
                            </Link>
                            <button
                                className="mobile-nav-toggler"
                                onClick={toggleMobileMenu}
                            >
                                <span />
                                <span />
                                <span />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <div className="mobile-menu">
                <div className="menu-backdrop" onClick={toggleMobileMenu} />
                <nav className="menu-box">
                    <div className="upper-box">
                        <div className="nav-logo">
                            <Link to="/"><img src="/assets/images/nlogo2.png" alt="" /></Link>
                        </div>
                        <div className="close-btn" onClick={toggleMobileMenu}>
                            <i className="icon fa fa-times" />
                        </div>
                    </div>
                    <ul className="navigation clearfix">
                        <li><Link to="/" onClick={toggleMobileMenu}>Home</Link></li>
                        <li><Link to="/about" onClick={toggleMobileMenu}>About</Link></li>
                        <li><Link to="/gallery" onClick={toggleMobileMenu}>Gallery</Link></li>
                        <li><Link to="/contact" onClick={toggleMobileMenu}>Contact Us</Link></li>
                        <li style={{ display: "flex", justifyContent: "flex-end" }}>
                            <Link
                                to="/login"
                                onClick={toggleMobileMenu}
                                style={{
                                    display: "inline-block",
                                    width: "100%",
                                    padding: "8px 16px",
                                    background: "#4e54c8",
                                    color: "#fff",
                                    borderRadius: "6px",
                                    marginTop: "10px",
                                    textAlign: "center"
                                }}
                            >
                                Login
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}

export default Navbar;