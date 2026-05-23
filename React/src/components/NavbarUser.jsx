import { Link, useNavigate } from "react-router-dom";
import axios from "axios";


function NavbarUser() {
    const navigate = useNavigate();
    const userData = JSON.parse(localStorage.getItem("userData"));
    const closeOffcanvas = () => {
        const offcanvasEl = document.getElementById("offcanvasUserNavbar");

        if (offcanvasEl) {
            const bsOffcanvas =
                bootstrap.Offcanvas.getInstance(offcanvasEl);

            bsOffcanvas?.hide();
        }
    };
    const handleLogout = async () => {
        try {
            await axios.post("http://localhost:3000/user/logout", {}, { withCredentials: true, });
            localStorage.removeItem("userData");
            navigate("/login");
        } catch (error) {
            console.log("Logout error:", error);
            localStorage.removeItem("userData");
            navigate("/login");
        }
    };

    return (
        <header className="user-header shadow-sm">
            <div className="navbar navbar-expand-lg navbar-light px-3">

                {/* LEFT */}
                <div className="d-flex align-items-center w-100 justify-content-between">

                    {/* Logo */}
                    <Link to="/user/dashboard" className="navbar-brand d-flex align-items-center gap-2">
                        <img
                            src="/assets/images/admin/logo2.png"
                            alt="logo"
                            style={{ height: "55px" }}
                        />
                    </Link>

                    {/* Mobile Toggle */}
                    <button
                        className="btn d-lg-none ms-2"
                        data-bs-toggle="offcanvas"
                        data-bs-target="#offcanvasUserNavbar"
                    >
                        <i className="bx bx-menu fs-3 text-white"></i>
                    </button>
                </div>

                {/* RIGHT */}
                <div className="d-flex align-items-center gap-3 ms-auto">

                    {/* Notifications */}
                    <div className="dropdown">
                        <button className="btn position-relative" data-bs-toggle="dropdown">
                            <i className="fa-solid fa-bell text-white"></i>
                            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                3
                            </span>
                        </button>

                        <ul className="dropdown-menu dropdown-menu-end p-2" style={{ width: "280px" }}>
                            <li className="fw-bold px-2 mb-2">Notifications</li>
                            <li><Link className="dropdown-item">Rent Due Reminder</Link></li>
                            <li><Link className="dropdown-item">Maintenance Update</Link></li>
                            <li><Link className="dropdown-item">New Notice</Link></li>
                        </ul>
                    </div>

                    {/* User */}
                    <div className="dropdown d-none d-lg-block">
                        <button className="btn d-flex align-items-center gap-2 user-nav-btn" data-bs-toggle="dropdown">
                            <i className="fa-solid fa-user"></i>
                            {userData?.name || "User"}
                        </button>

                        <ul className="dropdown-menu dropdown-menu-end">
                            <li>
                                <Link className="dropdown-item" to="/user/profile">
                                    Profile
                                </Link>
                            </li>
                            <li>
                                <Link className="dropdown-item" to="/user/change-password">
                                    Change Password
                                </Link>
                            </li>
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

            {/* MOBILE MENU */}
            <div className="primary-menu border-top">
                <nav className="navbar navbar-expand-lg align-items-center">

                    <div className="offcanvas offcanvas-start user-offcanvas"
                        id="offcanvasUserNavbar"
                        tabIndex={-1}
                    >
                        <div className="offcanvas-header border-bottom">
                            <div className="d-flex align-items-center w-100 justify-content-between">
                                <div className="d-flex align-items-center gap-5">
                                    <Link to="/" className="navbar-brand d-flex align-items-center gap-2">
                                        <img
                                            src="/assets/images/admin/logo2.png"
                                            alt="logo"
                                            style={{ height: "55px" }}
                                        />
                                    </Link>
                                    <div className="dropdown ms-auto">
                                        <button className="btn d-flex align-items-center gap-2 user-nav-btn" data-bs-toggle="dropdown">
                                            <i className="fa-solid fa-user"></i>
                                            {userData?.name || "User"}
                                        </button>
                                        <ul className="dropdown-menu dropdown-menu-end">
                                            <li>
                                                <Link className="dropdown-item" to="/user/profile" onClick={closeOffcanvas}>
                                                    Profile
                                                </Link>
                                            </li>
                                            <li>
                                                <Link className="dropdown-item" to="/user/change-password" onClick={closeOffcanvas}>
                                                    Change Password
                                                </Link>
                                            </li>
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
                            <ul className="navbar-nav justify-content-center mx-auto gap-4 ">
                                <li className="nav-item">
                                    <Link className="nav-link user-nav-btn d-flex align-items-center gap-2" to="/user/dashboard" onClick={closeOffcanvas}>
                                        Dashboard
                                    </Link>
                                </li>

                                <li className="nav-item">
                                    <Link className="nav-link user-nav-btn" to="/user/flats" onClick={closeOffcanvas}>
                                        My Flat
                                    </Link>
                                </li>

                                <li className="nav-item">
                                    <Link className="nav-link user-nav-btn" to="/user/complaints" onClick={closeOffcanvas}>
                                        Complaints
                                    </Link>
                                </li>

                                <li className="nav-item">
                                    <Link className="nav-link user-nav-btn" to="/user/visitors" onClick={closeOffcanvas}>
                                        Visitors
                                    </Link>
                                </li>

                                <li className="nav-item">
                                    <Link className="nav-link user-nav-btn" to="/user/vehicle" onClick={closeOffcanvas}>
                                        Vehicles
                                    </Link>
                                </li>

                                <li className="nav-item">
                                    <Link className="nav-link user-nav-btn" to="/user/payments" onClick={closeOffcanvas}>
                                        Payments
                                    </Link>
                                </li>

                            </ul>
                        </div>
                    </div>

                </nav>
            </div >
        </header >
    );
}

export default NavbarUser;