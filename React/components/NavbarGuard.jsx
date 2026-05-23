import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function NavbarGuard() {

    const navigate = useNavigate();
    const guardData = JSON.parse(localStorage.getItem("guardData"));
    const closeOffcanvas = () => {
        const offcanvasEl = document.getElementById("offcanvasGuardNavbar");

        if (offcanvasEl) {
            const bsOffcanvas =
                bootstrap.Offcanvas.getInstance(offcanvasEl);

            bsOffcanvas?.hide();
        }
    };

    const handleLogout = async () => {
        try {
            await axios.post("http://localhost:3000/guard/logout", {}, { withCredentials: true, });
            localStorage.removeItem("guardData");
            navigate("/login");
        } catch (error) {
            console.log("Logout error:", error);
        }
    };

    return (
        <>
            <header className="security-header shadow-sm" style={{ height: "170px" }}>
                <div className="navbar navbar-expand-lg navbar-light px-3">
                    {/* LEFT */}
                    <div className="d-flex align-items-center w-100 justify-content-between">

                        {/* Logo */}
                        <Link to="/guard/dashboard" className="navbar-brand d-flex align-items-center gap-2">
                            <img src="/assets/images/admin/logos.png" alt="logo" style={{ height: "80px" }} />
                        </Link>

                        {/* Mobile toggle */}
                        <button
                            className="btn d-lg-none ms-2"
                            data-bs-toggle="offcanvas"
                            data-bs-target="#offcanvasGuardNavbar"
                        >
                            <i className="bx bx-menu fs-3 text-white"></i>
                        </button>
                    </div>

                    {/* RIGHT */}
                    <div className="d-flex align-items-center gap-3 ms-auto">

                        {/* Notifications */}
                        <div className="dropdown">
                            <button
                                className="btn position-relative"
                                data-bs-toggle="dropdown"
                            >
                                <i className="fa-solid fa-bell text-white" />
                                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                    7
                                </span>
                            </button>

                            <ul className="dropdown-menu dropdown-menu-end p-2" style={{ width: "300px" }}>
                                <li className="fw-bold px-2 mb-2">Notifications</li>
                                <li><Link className="dropdown-item">New user registered</Link></li>
                                <li><Link className="dropdown-item">Order placed</Link></li>
                                <li><Link className="dropdown-item">Server updated</Link></li>
                            </ul>
                        </div>

                        {/* User */}
                        <div className="dropdown d-none d-lg-block">
                            <button
                                className="btn d-flex align-items-center gap-2 security-nav-btn"
                                data-bs-toggle="dropdown"
                            ><i className="fa-solid fa-shield-halved" />
                                {guardData?.name || "Security Guard"}
                            </button>

                            <ul className="dropdown-menu dropdown-menu-end">
                                <li>
                                    <Link className="dropdown-item" to="/guard/profile" onClick={closeOffcanvas}>
                                        Profile
                                    </Link>
                                </li>
                                <li><Link className="dropdown-item" to="/guard/change-password">Change Password</Link></li>
                                <li><hr className="dropdown-divider" /></li>
                                <li>
                                    <button className="dropdown-item text-danger" onClick={handleLogout}>
                                        Logout
                                    </button>
                                </li>
                            </ul>
                        </div>

                    </div>
                </div>

                <div className="primary-menu border-top security-menu">
                    <nav className="navbar navbar-expand-lg align-items-center">
                        <div className="offcanvas offcanvas-start guard-offcanvas" tabIndex={-1} id="offcanvasGuardNavbar" aria-labelledby="offcanvasNavbarLabel">
                            <div className="offcanvas-header border-bottom">
                                <div className="d-flex align-items-center w-100 justify-content-between">
                                    <div className="d-flex align-items-center gap-5">
                                        <Link to="/guard/dashboard" className="navbar-brand d-flex align-items-center gap-2">
                                            <img src="/assets/images/admin/logos.png" alt="logo" style={{ height: "80px" }} />

                                        </Link>
                                        <div className="dropdown ms-auto">
                                            <button
                                                className="btn d-flex align-items-center gap-2 security-nav-btn"
                                                data-bs-toggle="dropdown"
                                            ><i className="fa-solid fa-shield-halved" />
                                                {guardData?.name || "Security Guard"}
                                            </button>

                                            <ul className="dropdown-menu dropdown-menu-end">
                                                <li>
                                                    <Link className="dropdown-item" to="/guard/profile" onClick={closeOffcanvas}>
                                                        Profile
                                                    </Link>
                                                </li>
                                                <li><Link className="dropdown-item" to="/guard/change-password" onClick={closeOffcanvas}>Change Password</Link></li>
                                                <li><hr className="dropdown-divider" /></li>
                                                <li>
                                                    <button className="dropdown-item text-danger" onClick={async () => { await handleLogout(); closeOffcanvas(); }}>
                                                        Logout
                                                    </button>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="">

                                </div>
                            </div>
                            <div className="offcanvas-body">
                                <ul className="navbar-nav justify-content-center mx-auto gap-3">
                                    <li className="nav-item dropdown">
                                        <Link className="nav-link d-flex align-items-center gap-2" to="/guard/dashboard" onClick={closeOffcanvas}>
                                            Dashboard
                                        </Link>
                                    </li>
                                    <li className="nav-item dropdown">
                                        <Link className="nav-link d-flex align-items-center gap-2" to="/guard/manage-visitors" onClick={closeOffcanvas}>
                                            Manage Visitors
                                        </Link>
                                    </li>
                                    <li className="nav-item dropdown">
                                        <Link className="nav-link d-flex align-items-center gap-2" to="/guard/vehicle" onClick={closeOffcanvas}>
                                            Manage Vehicles
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </nav>
                </div>
            </header>
        </>
    )
}
export default NavbarGuard;