import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

function FooterGuard() {
    const [showButton, setShowButton] = useState(false);
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 150) {
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
                        background: "linear-gradient(90deg, #2ca198, #00ffe1)",
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
            <footer className="guard-footer py-4">
                <div className="container">

                    <div className="row align-items-center">

                        {/* BRAND */}
                        <div className="col-md-4 mb-3 mb-md-0">
                            <h5 className="text-white fw-bold mb-1">
                                Residex Security
                            </h5>

                            <p className="guard-footer-text mb-0 small">
                                Security & Visitor Management Panel
                            </p>
                        </div>

                        {/* QUICK LINKS */}
                        <div className="col-md-4 mb-3 mb-md-0">
                            <h6 className="text-white mb-2">
                                Quick Links
                            </h6>

                            <div className="d-flex flex-column gap-1">

                                <Link
                                    to="/guard/dashboard"
                                    className="guard-footer-link text-decoration-none"
                                >
                                    Dashboard
                                </Link>

                                <Link
                                    to="/guard/manage-visitors"
                                    className="guard-footer-link text-decoration-none"
                                >
                                    Visitors
                                </Link>

                                <Link
                                    to="/guard/vehicle"
                                    className="guard-footer-link text-decoration-none"
                                >
                                    Vehicles
                                </Link>

                            </div>
                        </div>

                        {/* SUPPORT */}
                        <div className="col-md-4 text-md-end">

                            <h6 className="text-white mb-2">
                                Security Support
                            </h6>

                            <p className="guard-footer-text mb-1">
                                📞 +91 9876543210
                            </p>

                            <p className="guard-footer-text mb-1">
                                ✉ security@residex.com
                            </p>

                            <div className="d-flex justify-content-md-end gap-3 mt-2">

                                <i className="fa-brands fa-facebook guard-social-icon"></i>

                                <i className="fa-brands fa-instagram guard-social-icon"></i>

                                <i className="fa-brands fa-linkedin guard-social-icon"></i>

                            </div>
                        </div>

                    </div>

                    <hr className="guard-footer-divider my-3" />

                    {/* BOTTOM */}
                    <div className="d-flex justify-content-between flex-wrap">

                        <p className="mb-0 guard-footer-text">
                            &copy; {new Date().getFullYear()} Residex
                        </p>

                        <p className="mb-0 guard-footer-text">
                            Security Operations Panel
                        </p>

                    </div>

                </div>
            </footer>
        </>
    );
}

export default FooterGuard;