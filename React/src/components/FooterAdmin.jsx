import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

function FooterAdmin() {
    const [showButton, setShowButton] = useState(false);
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 200) {
                setShowButton(true);
            } else {
                setShowButton(false);
            }
        };
        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Scroll to top
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };
    return (
        <>
            {showButton && (
                <button
                    type="button"
                    onClick={scrollToTop}
                    style={{
                        position: "fixed",
                        bottom: "20px",
                        right: "20px",
                        width: "45px",
                        height: "45px",
                        borderRadius: "50%",
                        border: "none",
                        background: "linear-gradient(90deg, #143583, #0749ff)",
                        color: "#fff",
                        cursor: "pointer",
                        zIndex: 9999,
                        boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "22px",
                        transition: "0.3s"
                    }}
                >
                    <i className="fa-solid fa-caret-up" />
                </button>
            )}
            <footer className="footer-bg py-4">
                <div className="container">

                    <div className="row align-items-center">

                        {/* BRAND */}
                        <div className="col-md-4 mb-3 mb-md-0">
                            <h5 className="text-white fw-bold mb-1">
                                Residex Admin
                            </h5>

                            <p className="text-white mb-0 small">
                                Apartment Management Admin Panel
                            </p>
                        </div>

                        {/* QUICK LINKS */}
                        <div className="col-md-4 mb-3 mb-md-0">
                            <h6 className="text-white mb-2">
                                Quick Links
                            </h6>

                            <div className="d-flex flex-column gap-1">
                                <Link
                                    to="/admin/dashboard"
                                    className="text-white text-decoration-none"
                                >
                                    Dashboard
                                </Link>

                                <Link
                                    to="/admin/manage_building"
                                    className="text-white text-decoration-none"
                                >
                                    Buildings
                                </Link>

                                <Link
                                    to="/admin/manage_flats"
                                    className="text-white text-decoration-none"
                                >
                                    Flats
                                </Link>

                                <Link
                                    to="/admin/manage_residents"
                                    className="text-white text-decoration-none"
                                >
                                    Residents
                                </Link>
                            </div>
                        </div>

                        {/* CONTACT / SUPPORT */}
                        <div className="col-md-4 text-md-end">
                            <h6 className="text-white mb-2">
                                Admin Support
                            </h6>

                            <p className="text-white mb-1">
                                📞 +91 9876543210
                            </p>

                            <p className="text-white mb-1">
                                ✉ admin@residex.com
                            </p>

                            <div className="d-flex justify-content-md-end gap-3 mt-2">
                                <i className="fa-brands fa-facebook text-white"></i>
                                <i className="fa-brands fa-instagram text-white"></i>
                                <i className="fa-brands fa-linkedin text-white"></i>
                            </div>
                        </div>

                    </div>

                    <hr className="border-light my-3" />

                    {/* BOTTOM */}
                    <div className="d-flex justify-content-between flex-wrap">

                        <p className="mb-0 text-white">
                            &copy; {new Date().getFullYear()} Residex
                        </p>

                        <p className="mb-0 text-white">
                            &reg;All rights reserved
                        </p>

                    </div>

                </div>
            </footer>
        </>
    );
}

export default FooterAdmin;